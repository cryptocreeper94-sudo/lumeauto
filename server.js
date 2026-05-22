import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { db } from './server/db/index.js';
import { waitlist } from './server/db/schema.js';
import { eq } from 'drizzle-orm';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || 'https://lumeauto.tech';
const FIRESTORE_PROJECT = 'darkwave-auth';

app.use(cors());

// ─── Stripe Webhook (raw body needed) ───────────────────────────────────────
// This must come BEFORE express.json() middleware
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = (await import('stripe')).default;
  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  // Verify webhook signature if secret is configured
  if (webhookSecret) {
    const sig = req.headers['stripe-signature'];
    try {
      event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('[Webhook] ❌ Signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    // Dev mode — parse raw body
    event = JSON.parse(req.body.toString());
    console.warn('[Webhook] ⚠️ No STRIPE_WEBHOOK_SECRET — skipping signature verification');
  }

  // Handle checkout completion (one-time purchase)
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const metadata = session.metadata || {};

    console.log(`[Webhook] ✅ Payment completed: ${customerEmail} — ${metadata.product}`);

    if ((metadata.product === 'lumescan-pro' || metadata.product === 'lumescan-outright') && customerEmail) {
      try {
        const isLifetime = metadata.product === 'lumescan-outright';
        const code = generateRedemptionCode();
        await writeFirestoreEntitlement(customerEmail, code, metadata.tier || 'Standard', isLifetime);
        await sendPurchaseEmail(customerEmail, code, isLifetime);
        console.log(`[Webhook] ✅ Pro license activated for ${customerEmail} — code: ${code} (${isLifetime ? 'Lifetime' : 'Subscription'})`);

        // ── Create recurring subscription for non-lifetime purchases ──
        if (!isLifetime && metadata.monthly_rate_cents) {
          try {
            const monthlyCents = parseInt(metadata.monthly_rate_cents, 10);
            const customerId = session.customer; // Stripe customer ID from checkout

            if (customerId && monthlyCents > 0) {
              // Create a Stripe Price for the monthly service (or reuse if exists)
              const monthlyPrice = await stripeClient.prices.create({
                currency: 'usd',
                unit_amount: monthlyCents,
                recurring: { interval: 'month' },
                product_data: {
                  name: `Lume Scan Pro — ${metadata.tier || 'Standard'} Monthly Service`,
                  metadata: { tier: metadata.tier || 'Standard' },
                },
              });

              // Create the subscription — first payment is immediate
              const subscription = await stripeClient.subscriptions.create({
                customer: customerId,
                items: [{ price: monthlyPrice.id }],
                metadata: {
                  email: customerEmail,
                  tier: metadata.tier || 'Standard',
                  product: 'lumescan-monthly-service',
                },
                // Trial for the remainder of the current month (first month free since they just paid)
                trial_period_days: 30,
              });

              // Store subscription ID in Firestore entitlement
              await patchFirestoreDoc(`entitlements/${encodeURIComponent(customerEmail.toLowerCase())}`, {
                subscription_id: { stringValue: subscription.id },
                subscription_active: { booleanValue: true },
                monthly_rate_cents: { integerValue: String(monthlyCents) },
                subscription_tier: { stringValue: metadata.tier || 'Standard' },
              });

              console.log(`[Webhook] ✅ Subscription ${subscription.id} created for ${customerEmail} at $${(monthlyCents/100).toFixed(2)}/mo (30-day trial)`);
            }
          } catch (subErr) {
            console.error(`[Webhook] ⚠️ Subscription creation failed for ${customerEmail}:`, subErr.message);
            // Non-fatal — the license is still activated, subscription can be set up manually
          }
        }
      } catch (err) {
        console.error('[Webhook] ❌ Post-purchase processing failed:', err);
      }
    }
  }

  // Handle subscription lifecycle
  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.paused') {
    const subscription = event.data.object;
    const customerEmail = subscription.metadata?.email;
    if (customerEmail) {
      try {
        await patchFirestoreDoc(`entitlements/${encodeURIComponent(customerEmail.toLowerCase())}`, {
          subscription_active: { booleanValue: false },
          subscription_ended_at: { timestampValue: new Date().toISOString() },
        });
        console.log(`[Webhook] 🔴 Subscription ended for ${customerEmail}`);
      } catch (err) {
        console.error('[Webhook] ❌ Subscription cancellation processing failed:', err);
      }
    }
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object;
    const customerEmail = invoice.customer_email;
    if (customerEmail && invoice.subscription) {
      try {
        await patchFirestoreDoc(`entitlements/${encodeURIComponent(customerEmail.toLowerCase())}`, {
          subscription_active: { booleanValue: true },
          last_payment_at: { timestampValue: new Date().toISOString() },
        });
        console.log(`[Webhook] ✅ Invoice paid — subscription active for ${customerEmail}`);
      } catch (err) {
        console.error('[Webhook] ❌ Invoice processing failed:', err);
      }
    }
  }

  res.json({ received: true });
});

// Now apply JSON parser for all other routes
app.use(express.json());

// ─── API: SMS Waitlist Opt-In ───────────────────────────────────────────────
app.post('/api/opt-in', async (req, res) => {
  const { phone, consent } = req.body;

  if (!consent) {
    return res.status(400).json({ error: 'Explicit TCPA consent is required.' });
  }
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Invalid phone number.' });
  }

  const cleanPhone = phone.replace(/\D/g, '');

  try {
    // Check for duplicate
    const existing = await db.select().from(waitlist).where(eq(waitlist.phone, cleanPhone));
    if (existing.length > 0) {
      return res.status(409).json({ error: 'This number is already on the waitlist.' });
    }

    await db.insert(waitlist).values({
      phone: cleanPhone,
      consent: true,
      status: 'pending',
    });

    console.log(`[Lume-Auto] ✅ Waitlist opt-in secured: ${cleanPhone}`);
    res.status(200).json({ success: true, message: 'Successfully joined the Lume-Auto waitlist.' });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Opt-in error:', err);
    res.status(500).json({ error: 'Internal server error. Please try again.' });
  }
});

// ─── API: Stripe Checkout Session (Fleet Subscriptions) ─────────────────────
app.post('/api/checkout', async (req, res) => {
  const { tier } = req.body; // 'family' | 'commercial' | 'premium'

  const PRICE_MAP = {
    premium: process.env.STRIPE_PRICE_PREMIUM,
    family: process.env.STRIPE_PRICE_FAMILY,
    commercial: process.env.STRIPE_PRICE_COMMERCIAL,
  };

  const priceId = PRICE_MAP[tier];
  if (!priceId) {
    return res.status(400).json({ error: 'Invalid subscription tier.' });
  }

  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${SITE_URL}/waitlist?success=true`,
      cancel_url: `${SITE_URL}/fleet?cancelled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Stripe error:', err);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

// 3-tier launch pricing — software purchase + monthly service
const LAUNCH_TIERS = [
  { name: 'Founders',      cap: 100, purchaseCents: 999,   monthlyCents: 199  },  // $9.99 + $1.99/mo
  { name: 'Early Adopter',  cap: 500, purchaseCents: 1999,  monthlyCents: 249  },  // $19.99 + $2.49/mo
  { name: 'Standard',       cap: Infinity, purchaseCents: 3999, monthlyCents: 499 }, // $39.99 + $4.99/mo
];

// Cached entitlement count — refreshes every 60s
let _claimedCache = { count: 0, ts: 0 };
const CACHE_TTL = 60_000; // 60 seconds

async function getClaimedCount() {
  if (Date.now() - _claimedCache.ts < CACHE_TTL) return _claimedCache.count;

  try {
    // Firestore REST aggregation query — count entitlements where lumescan_purchased == true
    const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents:runAggregationQuery`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredAggregationQuery: {
          structuredQuery: {
            from: [{ collectionId: 'entitlements' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'lumescan_purchased' },
                op: 'EQUAL',
                value: { booleanValue: true },
              },
            },
          },
          aggregations: [{ alias: 'count', count: {} }],
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const count = parseInt(data[0]?.result?.aggregateFields?.count?.integerValue || '0', 10);
      _claimedCache = { count, ts: Date.now() };
      console.log(`[Tier] 📊 Firestore entitlement count: ${count}`);
      return count;
    }
    console.warn('[Tier] ⚠️ Aggregation query failed, falling back to cached:', _claimedCache.count);
    return _claimedCache.count;
  } catch (err) {
    console.warn('[Tier] ⚠️ Firestore count error:', err.message);
    return _claimedCache.count;
  }
}

function getTierFromCount(claimed) {
  let acc = 0;
  for (const t of LAUNCH_TIERS) {
    if (claimed < acc + t.cap) return t;
    acc += t.cap;
  }
  return LAUNCH_TIERS[LAUNCH_TIERS.length - 1];
}

// Expose current tier info for the frontend
app.get('/api/tier', async (req, res) => {
  const claimed = await getClaimedCount();
  const tier = getTierFromCount(claimed);
  const tierIdx = LAUNCH_TIERS.indexOf(tier);
  const prevCap = LAUNCH_TIERS.slice(0, tierIdx).reduce((a, t) => a + t.cap, 0);
  res.json({
    tier: tier.name,
    price: tier.purchaseCents / 100,
    monthly: tier.monthlyCents / 100,
    claimed,
    remaining: tier.cap === Infinity ? null : (tier.cap + prevCap - claimed),
    keyManagement: {
      firmwareUnlock: 199,
      perKey: 8.99,
      unlimitedBundle: 54.99,
    },
    allTiers: LAUNCH_TIERS.map(t => ({
      name: t.name,
      purchase: t.purchaseCents / 100,
      monthly: t.monthlyCents / 100,
      cap: t.cap === Infinity ? null : t.cap,
    })),
    firstYearValue: 2880,
  });
});

app.post('/api/checkout-kit', async (req, res) => {
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const claimed = await getClaimedCount();
    const tier = getTierFromCount(claimed);
    console.log(`[Lume-Auto] 💰 Checkout at ${tier.name} tier: $${(tier.purchaseCents / 100).toFixed(2)} + $${(tier.monthlyCents / 100).toFixed(2)}/mo (${claimed} claimed)`);

    // Create a checkout session with software purchase as the initial payment
    // The subscription will be set up separately after purchase confirmation
    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Lume Scan Pro — ${tier.name} Software License`,
              description: `One-time software purchase. Includes monthly Pro service at $${(tier.monthlyCents / 100).toFixed(2)}/mo (${tier.name} rate, locked for life). Cancel service anytime — software is yours to keep.`,
            },
            unit_amount: tier.purchaseCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/order?success=true`,
      cancel_url: `${SITE_URL}/order?cancelled=true`,
      metadata: {
        type: 'lumescan',
        product: 'lumescan-pro',
        includes_software_license: 'true',
        tier: tier.name,
        monthly_rate_cents: String(tier.monthlyCents),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Pro license checkout error:', err);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

// Own Outright — $249 lifetime, no monthly
app.post('/api/checkout-outright', async (req, res) => {
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Lume Scan Pro — Own Outright (Lifetime License)',
            description: 'Lifetime access to all Pro features, updates, and priority support. No monthly fee. No recurring charges. Ever.',
          },
          unit_amount: 24900, // $249.00
        },
        quantity: 1,
      }],
      success_url: `${SITE_URL}/order?success=true`,
      cancel_url: `${SITE_URL}/order?cancelled=true`,
      metadata: {
        type: 'lumescan',
        product: 'lumescan-outright',
        includes_software_license: 'true',
        tier: 'Lifetime',
        lifetime: 'true',
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Own Outright checkout error:', err);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

// ─── API: Verify Redemption Code ────────────────────────────────────────────
app.post('/api/redeem', async (req, res) => {
  const { code, email } = req.body;

  if (!code || !email) {
    return res.status(400).json({ error: 'Code and email are required.' });
  }

  try {
    // Check if code exists in Firestore
    const codeDoc = await getFirestoreDoc(`redemption_codes/${code.toUpperCase()}`);

    if (!codeDoc) {
      return res.status(404).json({ error: 'Invalid redemption code.' });
    }

    if (codeDoc.fields?.redeemed?.booleanValue === true) {
      return res.status(409).json({ error: 'This code has already been redeemed.' });
    }

    // Mark code as redeemed
    await patchFirestoreDoc(`redemption_codes/${code.toUpperCase()}`, {
      redeemed: { booleanValue: true },
      redeemed_by: { stringValue: email.toLowerCase() },
      redeemed_at: { timestampValue: new Date().toISOString() },
    });

    // Activate Pro entitlement for this email
    await writeFirestoreEntitlement(email.toLowerCase(), code.toUpperCase());

    console.log(`[Redeem] ✅ Code ${code} redeemed by ${email}`);
    res.status(200).json({ success: true, message: 'Pro license activated!' });
  } catch (err) {
    console.error('[Redeem] ❌ Error:', err);
    res.status(500).json({ error: 'Redemption failed. Please try again.' });
  }
});

// ─── API: App Version (Auto-Update Check) ──────────────────────────────────
// Mobile app calls this on launch to check for new versions
const APP_VERSION = {
  version: '1.0.0',
  build: 1,
  apk_url: 'https://lumeauto.tech/download/apk',
  changelog: 'Initial release — 42-signal diagnostic engine, fuel coaching, predictive maintenance, driver scoring.',
  min_version: '1.0.0',
};

// ─── API: Stripe Customer Portal (Self-Service Cancel/Manage) ───────────────
// Users can manage billing, update payment method, and cancel — zero friction
app.post('/api/billing-portal', async (req, res) => {
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email required' });

    // Find customer by email
    const customers = await stripeClient.customers.list({ email: email.toLowerCase(), limit: 1 });
    if (customers.data.length === 0) {
      return res.status(404).json({ error: 'No subscription found for this email. If you purchased recently, please allow a few minutes for processing.' });
    }

    const customer = customers.data[0];

    // Create a portal session
    const portalSession = await stripeClient.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${SITE_URL}/account?returned=true`,
    });

    console.log(`[Portal] 🔗 Billing portal opened for ${email}`);
    res.json({ url: portalSession.url });
  } catch (err) {
    console.error('[Portal] ❌ Error:', err);
    res.status(500).json({ error: 'Could not open billing portal. Please try again.' });
  }
});

// ─── API: Account Status Check ──────────────────────────────────────────────
app.post('/api/account/status', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const doc = await getFirestoreDoc(`entitlements/${encodeURIComponent(email.toLowerCase())}`);
    if (!doc) {
      return res.status(404).json({ error: 'No account found for this email.' });
    }

    const fields = doc.fields || {};
    const devices = fields.active_devices?.arrayValue?.values?.map(v => JSON.parse(v.stringValue)) || [];

    res.json({
      email: email.toLowerCase(),
      tier: fields.pricing_tier?.stringValue || 'Unknown',
      license_type: fields.license_type?.stringValue || 'subscription',
      subscription_active: fields.subscription_active?.booleanValue ?? false,
      purchased_at: fields.purchased_at?.timestampValue || null,
      last_payment_at: fields.last_payment_at?.timestampValue || null,
      device_limit: MAX_DEVICES,
      active_devices: devices.length,
    });
  } catch (err) {
    console.error('[Account] ❌ Error:', err);
    res.status(500).json({ error: 'Could not retrieve account status.' });
  }
});

// ─── Device Activation — 3 devices per license ─────────────────────────────
// The app calls this on launch with a device fingerprint.
// If the device is already registered → pass through.
// If under the limit → register and allow.
// If at the limit → reject with a clear message.
const MAX_DEVICES = 1;

app.post('/api/device/activate', async (req, res) => {
  try {
    const { email, deviceId, deviceName } = req.body;
    if (!email || !deviceId) {
      return res.status(400).json({ error: 'Email and deviceId are required.' });
    }

    const docPath = `entitlements/${encodeURIComponent(email.toLowerCase())}`;
    const doc = await getFirestoreDoc(docPath);

    if (!doc) {
      return res.status(404).json({ error: 'No license found for this email.', activated: false });
    }

    const fields = doc.fields || {};
    if (!fields.lumescan_purchased?.booleanValue) {
      return res.status(403).json({ error: 'No active Pro license.', activated: false });
    }

    // Parse existing devices array
    const existingDevices = fields.active_devices?.arrayValue?.values?.map(v => JSON.parse(v.stringValue)) || [];

    // Check if this device is already registered
    const alreadyRegistered = existingDevices.find(d => d.id === deviceId);
    if (alreadyRegistered) {
      // Update last_seen timestamp
      const updatedDevices = existingDevices.map(d =>
        d.id === deviceId ? { ...d, last_seen: new Date().toISOString() } : d
      );
      await patchFirestoreDoc(docPath, {
        active_devices: {
          arrayValue: {
            values: updatedDevices.map(d => ({ stringValue: JSON.stringify(d) })),
          },
        },
      });
      console.log(`[Device] ✅ Known device ${deviceId.slice(0, 8)}... for ${email}`);
      return res.json({ activated: true, device_count: existingDevices.length, device_limit: MAX_DEVICES });
    }

    // New device — enforce limit
    if (existingDevices.length >= MAX_DEVICES) {
      console.log(`[Device] 🚫 Device limit reached for ${email} (${existingDevices.length}/${MAX_DEVICES})`);
      return res.status(403).json({
        error: `This license is already active on another device. You can deactivate your current device in Settings, or purchase an additional license at lumeauto.tech/order.`,
        activated: false,
        device_count: existingDevices.length,
        device_limit: MAX_DEVICES,
        active_devices: existingDevices.map(d => ({
          name: d.name || 'Unknown device',
          activated_at: d.activated_at,
          last_seen: d.last_seen,
        })),
      });
    }

    // Register new device
    const newDevice = {
      id: deviceId,
      name: deviceName || 'Unknown device',
      activated_at: new Date().toISOString(),
      last_seen: new Date().toISOString(),
    };
    const updatedDevices = [...existingDevices, newDevice];

    await patchFirestoreDoc(docPath, {
      active_devices: {
        arrayValue: {
          values: updatedDevices.map(d => ({ stringValue: JSON.stringify(d) })),
        },
      },
    });

    console.log(`[Device] ✅ New device ${deviceId.slice(0, 8)}... registered for ${email} (${updatedDevices.length}/${MAX_DEVICES})`);
    res.json({ activated: true, device_count: updatedDevices.length, device_limit: MAX_DEVICES });
  } catch (err) {
    console.error('[Device] ❌ Activation error:', err);
    res.status(500).json({ error: 'Device activation failed.', activated: false });
  }
});

// ─── Device Deactivation — swap devices ─────────────────────────────────────
app.post('/api/device/deactivate', async (req, res) => {
  try {
    const { email, deviceId } = req.body;
    if (!email || !deviceId) {
      return res.status(400).json({ error: 'Email and deviceId are required.' });
    }

    const docPath = `entitlements/${encodeURIComponent(email.toLowerCase())}`;
    const doc = await getFirestoreDoc(docPath);
    if (!doc) {
      return res.status(404).json({ error: 'No license found.' });
    }

    const existingDevices = doc.fields?.active_devices?.arrayValue?.values?.map(v => JSON.parse(v.stringValue)) || [];
    const filtered = existingDevices.filter(d => d.id !== deviceId);

    if (filtered.length === existingDevices.length) {
      return res.status(404).json({ error: 'Device not found on this license.' });
    }

    await patchFirestoreDoc(docPath, {
      active_devices: {
        arrayValue: {
          values: filtered.map(d => ({ stringValue: JSON.stringify(d) })),
        },
      },
    });

    console.log(`[Device] 🗑️ Device ${deviceId.slice(0, 8)}... deactivated for ${email} (${filtered.length}/${MAX_DEVICES} remaining)`);
    res.json({ success: true, device_count: filtered.length, device_limit: MAX_DEVICES });
  } catch (err) {
    console.error('[Device] ❌ Deactivation error:', err);
    res.status(500).json({ error: 'Device deactivation failed.' });
  }
});

app.get('/api/version', (req, res) => {
  res.json(APP_VERSION);
});

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MODE 05: KEY MANAGEMENT APIs ───────────────────────────────────────────
// LUME Mode 05 Key Management Firmware Extension v2.0
// State disclaimer, key event records, license validation
// ═══════════════════════════════════════════════════════════════════════════════

// 15 states with locksmith licensing requirements
const REGULATED_STATES = {
  CA: { enforcement_level: 'HIGH',     licensing_body: 'Bureau of Security and Investigative Services', url: 'https://www.bsis.ca.gov/' },
  TX: { enforcement_level: 'HIGH',     licensing_body: 'Texas DPS Private Security Bureau',             url: 'https://www.dps.texas.gov/rsd/psb/' },
  NJ: { enforcement_level: 'HIGH',     licensing_body: 'New Jersey State Police',                       url: 'https://www.njsp.org/' },
  NC: { enforcement_level: 'HIGH',     licensing_body: 'NC Locksmith Licensing Board',                  url: 'https://www.ncdoi.gov/' },
  TN: { enforcement_level: 'HIGH',     licensing_body: 'TN Dept. of Commerce & Insurance',             url: 'https://www.tn.gov/commerce.html' },
  VA: { enforcement_level: 'HIGH',     licensing_body: 'VA Department of Criminal Justice Services',   url: 'https://www.dcjs.virginia.gov/' },
  IL: { enforcement_level: 'MODERATE', licensing_body: 'IL Dept. of Financial & Professional Regulation', url: 'https://idfpr.illinois.gov/' },
  CT: { enforcement_level: 'MODERATE', licensing_body: 'CT Dept. of Consumer Protection',              url: 'https://portal.ct.gov/dcp' },
  NE: { enforcement_level: 'MODERATE', licensing_body: 'NE Secretary of State',                        url: 'https://sos.nebraska.gov/' },
  OK: { enforcement_level: 'MODERATE', licensing_body: 'OK Department of Labor',                       url: 'https://oklahoma.gov/labor.html' },
  MD: { enforcement_level: 'LOW',      licensing_body: 'MD Dept. of Labor',                            url: 'https://www.dllr.state.md.us/' },
  LA: { enforcement_level: 'LOW',      licensing_body: 'LA State Fire Marshal',                        url: 'https://www.lasfm.org/' },
  OR: { enforcement_level: 'LOW',      licensing_body: 'OR Construction Contractors Board',            url: 'https://www.oregon.gov/ccb/' },
  AL: { enforcement_level: 'LOW',      licensing_body: 'AL Electronic Security Board',                 url: 'https://aesbl.alabama.gov/' },
  NV: { enforcement_level: 'LOW',      licensing_body: 'NV Private Investigators Licensing Board',     url: 'https://pilb.nv.gov/' },
};

const STATE_NAMES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',CT:'Connecticut',
  DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
  KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',
  MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',
  NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',
  OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',
  TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',
  WI:'Wisconsin',WY:'Wyoming',DC:'District of Columbia',
};

// GET /api/key-management/state-disclaimer?state=XX
// Returns whether a state disclaimer is required for Mode 05 key programming
app.get('/api/key-management/state-disclaimer', (req, res) => {
  const state = (req.query.state || '').toUpperCase().trim();

  if (!state || !STATE_NAMES[state]) {
    return res.status(400).json({ error: 'Valid US state code required (e.g., CA, TX, FL).' });
  }

  const regulated = REGULATED_STATES[state];
  if (!regulated) {
    // Unregulated state — no disclaimer needed
    return res.json({
      state,
      state_name: STATE_NAMES[state],
      disclaimer_required: false,
      enforcement_level: 'NONE',
      licensing_body: null,
      notes: 'No state-level locksmith licensing requirement.',
      disclaimer_text: null,
    });
  }

  // Regulated state — disclaimer required
  const stateName = STATE_NAMES[state];
  res.json({
    state,
    state_name: stateName,
    disclaimer_required: true,
    enforcement_level: regulated.enforcement_level,
    licensing_body: regulated.licensing_body,
    licensing_body_url: regulated.url,
    notes: `${stateName} requires locksmith licensing for key programming activities.`,
    disclaimer_text: `${stateName} requires a locksmith license for some key programming activities. LUME is a professional diagnostic tool. You are responsible for complying with your state's licensing requirements.`,
  });
});

// GET /api/key-management/regulated-states
// Admin/dashboard endpoint — full list of all 15 regulated states
app.get('/api/key-management/regulated-states', (_req, res) => {
  const states = Object.entries(REGULATED_STATES).map(([code, data]) => ({
    state: code,
    state_name: STATE_NAMES[code],
    ...data,
  }));
  res.json({
    total: states.length,
    states,
    high: states.filter(s => s.enforcement_level === 'HIGH'),
    moderate: states.filter(s => s.enforcement_level === 'MODERATE'),
    low: states.filter(s => s.enforcement_level === 'LOW'),
  });
});

// POST /api/key-management/event
// Accepts a key programming event record and routes to CAL or TLL
app.post('/api/key-management/event', async (req, res) => {
  try {
    const {
      vin, dongle_id, user_id, context, ledger_target, event,
      oem_identifier, transponder_type, chip_data_hash,
      security_level, reason_code, session_duration_ms, result,
      failure_nrc, key_slot_index, firmware_version,
    } = req.body;

    // Validate required fields
    const missing = [];
    if (!vin || vin.length !== 17) missing.push('vin (17 chars)');
    if (!dongle_id) missing.push('dongle_id');
    if (!user_id) missing.push('user_id');
    if (!ledger_target || !['CAL', 'TLL'].includes(ledger_target)) missing.push('ledger_target (CAL|TLL)');
    if (!event) missing.push('event');
    if (!result) missing.push('result');
    if (security_level === 'C' && !reason_code) missing.push('reason_code (required for Level C)');

    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    const record = {
      record_type: 'key_programming_event',
      timestamp: new Date().toISOString(),
      event,
      vin: vin.toUpperCase(),
      dongle_id,
      user_id,
      context: context || (ledger_target === 'CAL' ? 'ENTERPRISE' : 'CONSUMER'),
      ledger_target,
      oem_identifier: oem_identifier || null,
      key_slot_index: key_slot_index ?? null,
      transponder_type: transponder_type || null,
      chip_data_hash: chip_data_hash || null,
      security_level: security_level || 'B',
      reason_code: reason_code || null,
      session_duration_ms: session_duration_ms || 0,
      result,
      failure_nrc: failure_nrc || null,
      firmware_version: firmware_version || null,
      cal_anchor_hash: null,
      tll_anchor_hash: null,
    };

    // Store in Firestore
    const docPath = `key_events/${encodeURIComponent(vin)}__${Date.now()}`;
    await setFirestoreDoc(docPath, record);
    console.log(`[Mode05] 🔑 Key event recorded: ${event} for VIN ${vin.slice(-6)} → ${ledger_target}`);

    // Route to ledger
    let anchor_hash = null;
    try {
      const crypto = await import('crypto');
      const serialized = JSON.stringify(record, Object.keys(record).sort());
      anchor_hash = crypto.createHash('sha256').update(serialized).digest('hex');
      record[ledger_target === 'CAL' ? 'cal_anchor_hash' : 'tll_anchor_hash'] = anchor_hash;

      // Update Firestore with anchor hash
      await setFirestoreDoc(docPath, record);
    } catch (hashErr) {
      console.error('[Mode05] Hash computation failed:', hashErr);
    }

    res.json({
      status: 'recorded',
      record_type: 'key_programming_event',
      vin_last6: vin.slice(-6),
      event,
      result,
      ledger_target,
      anchor_hash,
      verification_url: ledger_target === 'TLL' && anchor_hash
        ? `https://trust-layer.onrender.com/verify/${anchor_hash}`
        : null,
      receipt: {
        vehicle: `${vin.slice(-6)}`,
        event: event === 'key_registered' ? 'New key registered' : event === 'key_deleted' ? 'Key removed' : event,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: anchor_hash ? `${ledger_target}-VERIFIED ✓` : `HASH COMPUTED · PENDING ${ledger_target} SEAL`,
        receipt_id: anchor_hash ? anchor_hash.slice(0, 12) : null,
      },
    });
  } catch (err) {
    console.error('[Mode05] ❌ Key event error:', err);
    res.status(500).json({ error: 'Failed to record key programming event.' });
  }
});

// GET /api/key-management/license/:dongleId
// Validates dongle license tier for Mode 05 access
app.get('/api/key-management/license/:dongleId', async (req, res) => {
  try {
    const { dongleId } = req.params;
    if (!dongleId) return res.status(400).json({ error: 'Dongle ID required.' });

    const doc = await getFirestoreDoc(`dongle_licenses/${encodeURIComponent(dongleId)}`);

    if (!doc) {
      // No license record — default to Tier 1 (diagnostics only)
      return res.json({
        dongle_id: dongleId,
        tier: 1,
        tier_name: 'Diagnostics',
        mode_05_enabled: false,
        modes: ['01', '02', '03', '04', '07', '09'],
        message: 'Upgrade to Tier 2 to unlock Key Management (Mode 05).',
      });
    }

    const fields = doc.fields || {};
    const tier = parseInt(fields.tier?.integerValue || '1', 10);

    res.json({
      dongle_id: dongleId,
      tier,
      tier_name: tier >= 3 ? 'Enterprise' : tier >= 2 ? 'Key Management' : 'Diagnostics',
      mode_05_enabled: tier >= 2,
      modes: tier >= 2
        ? ['01', '02', '03', '04', '05', '07', '09']
        : ['01', '02', '03', '04', '07', '09'],
      ledger_target: tier >= 3 ? 'CAL' : (tier >= 2 ? 'TLL' : null),
      license_valid_until: fields.valid_until?.timestampValue || null,
    });
  } catch (err) {
    console.error('[Mode05] ❌ License check error:', err);
    res.status(500).json({ error: 'License validation failed.' });
  }
});

// GET /api/key-management/history/:vin
// Returns key programming history for a VIN (consumer: their own VINs only)
app.get('/api/key-management/history/:vin', async (req, res) => {
  try {
    const { vin } = req.params;
    if (!vin || vin.length !== 17) {
      return res.status(400).json({ error: 'Valid 17-character VIN required.' });
    }

    // Query Firestore for key events matching this VIN
    // Using structured query against the key_events collection
    const queryUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/(default)/documents:runQuery`;
    const queryBody = {
      structuredQuery: {
        from: [{ collectionId: 'key_events' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'vin' },
            op: 'EQUAL',
            value: { stringValue: vin.toUpperCase() },
          },
        },
        orderBy: [{ field: { fieldPath: 'timestamp' }, direction: 'DESCENDING' }],
        limit: 50,
      },
    };

    const queryRes = await fetch(queryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryBody),
    });

    const results = await queryRes.json();
    const events = (Array.isArray(results) ? results : [])
      .filter(r => r.document)
      .map(r => {
        const f = r.document.fields || {};
        return {
          event: f.event?.stringValue,
          timestamp: f.timestamp?.stringValue,
          result: f.result?.stringValue,
          ledger_target: f.ledger_target?.stringValue,
          anchor_hash: f.tll_anchor_hash?.stringValue || f.cal_anchor_hash?.stringValue || null,
          oem_identifier: f.oem_identifier?.stringValue || null,
          transponder_type: f.transponder_type?.stringValue || null,
        };
      });

    res.json({
      vin: vin.toUpperCase(),
      vin_last6: vin.slice(-6),
      total_events: events.length,
      events,
    });
  } catch (err) {
    console.error('[Mode05] ❌ History error:', err);
    res.status(500).json({ error: 'Failed to retrieve key history.' });
  }
});

// ─── API: Health Check ──────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'operational', service: 'lume-auto', version: '2.0.0' });
});

// ─── APK Download Proxy ─────────────────────────────────────────────────────
// Proxies the APK download through our server to bypass Firebase Storage rules.
// Users hit /download/apk → server fetches from Firebase → pipes to browser as .apk download
app.get('/download/apk', async (req, res) => {
  const APK_FIREBASE_URL = process.env.APK_DOWNLOAD_URL ||
    'https://firebasestorage.googleapis.com/v0/b/darkwave-auth.firebasestorage.app/o/downloads%2FLume_Auto_Scanner.apk?alt=media';

  try {
    console.log('[Download] 📱 APK download requested');
    const upstream = await fetch(APK_FIREBASE_URL);

    if (!upstream.ok) {
      console.error(`[Download] ❌ Firebase returned ${upstream.status}`);
      return res.status(502).json({ error: 'APK file is temporarily unavailable. Please try again later.' });
    }

    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="LumeScan-Pro.apk"');
    if (upstream.headers.get('content-length')) {
      res.setHeader('Content-Length', upstream.headers.get('content-length'));
    }

    // Pipe the binary stream directly to the response
    const reader = upstream.body.getReader();
    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) { res.end(); return; }
        res.write(Buffer.from(value));
      }
    };
    await pump();
  } catch (err) {
    console.error('[Download] ❌ APK proxy error:', err);
    res.status(500).json({ error: 'Download failed. Please try again.' });
  }
});

// ─── Serve Vite static build ────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Lume Scan] 🚀 Web service running on port ${PORT}`);
});


// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generate a unique 12-character redemption code.
 * Format: LUME-XXXX-XXXX (uppercase alphanumeric)
 */
function generateRedemptionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I/O/0/1 to avoid confusion
  const seg1 = Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join('');
  const seg2 = Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join('');
  return `LUME-${seg1}-${seg2}`;
}

/**
 * Write Pro entitlement to Firestore via REST API.
 * Sets lumescan_purchased: true for the given email.
 */
async function writeFirestoreEntitlement(email, code, tierName = 'Founders', isLifetime = false) {
  const docPath = `entitlements/${encodeURIComponent(email.toLowerCase())}`;
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${docPath}`;

  const body = {
    fields: {
      lumescan_purchased: { booleanValue: true },
      tier: { stringValue: 'pro' },
      pricing_tier: { stringValue: tierName },
      redemption_code: { stringValue: code },
      purchased_at: { timestampValue: new Date().toISOString() },
      email: { stringValue: email.toLowerCase() },
      license_type: { stringValue: isLifetime ? 'lifetime' : 'subscription' },
      subscription_active: { booleanValue: true },
    },
  };

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore write failed: ${res.status} — ${errText}`);
  }

  console.log(`[Firestore] ✅ Entitlement written for ${email} (${isLifetime ? 'Lifetime' : tierName + ' subscription'})`);
}

/**
 * Write a redemption code document to Firestore.
 */
async function writeRedemptionCode(code, email) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/redemption_codes/${code}`;

  const body = {
    fields: {
      code: { stringValue: code },
      created_for: { stringValue: email },
      created_at: { timestampValue: new Date().toISOString() },
      redeemed: { booleanValue: false },
    },
  };

  await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

/**
 * Get a Firestore document via REST API.
 */
async function getFirestoreDoc(docPath) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${docPath}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore read failed: ${res.status}`);
  return res.json();
}

/**
 * Patch (update) a Firestore document via REST API.
 */
async function patchFirestoreDoc(docPath, fields) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${docPath}`;
  const body = { fields };
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Firestore patch failed: ${res.status}`);
}

/**
 * Send purchase confirmation email with redemption code.
 * Uses Resend API (or falls back to console log in dev).
 */
async function sendPurchaseEmail(email, code, isLifetime = false) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log(`[Email] ⚠️ No RESEND_API_KEY — would have sent to ${email}:`);
    console.log(`[Email]   Code: ${code}`);
    console.log(`[Email]   Download: ${SITE_URL}/download`);
    return;
  }

  const claimed = await getClaimedCount();
  const tier = getTierFromCount(claimed);
  const tierLabel = tier.name;
  const price = (tier.purchaseCents / 100).toFixed(2);
  const monthly = (tier.monthlyCents / 100).toFixed(2);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Lume Scan <noreply@lumescan.tech>',
      to: [email],
      subject: '🔥 Welcome to Lume Scan Pro — You\'re In',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#06080e;color:#f0f4f8;">

          <!-- Hero Banner -->
          <div style="position:relative;overflow:hidden;">
            <img src="https://lumescan.tech/img/email-hero.png" alt="Lume Scan Pro" style="width:100%;display:block;height:auto;" />
          </div>

          <div style="padding:32px 28px 40px;">

            <!-- Welcome -->
            <h1 style="color:#10b981;font-size:28px;margin:0 0 6px;font-weight:800;">You're in. 🎉</h1>
            <p style="color:#94a3b8;font-size:15px;margin:0 0 24px;line-height:1.6;">
              Welcome to the Lume Scan Pro family. You just unlocked <strong style="color:#f0f4f8;">$3,700+ in professional diagnostic capability</strong> for <strong style="color:#f0f4f8;">$${price}</strong>${isLifetime ? '' : ` + $${monthly}/mo`}. The math does itself.
            </p>

            <!-- Tier Badge -->
            <div style="display:inline-block;padding:6px 14px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:16px;font-size:12px;color:#fbbf24;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:24px;">
              🔥 ${tierLabel} Member #${claimed}
            </div>

            <!-- Redemption Code -->
            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.06));border:2px solid rgba(16,185,129,0.25);border-radius:16px;padding:28px;text-align:center;margin-bottom:28px;">
              <p style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 10px;font-weight:600;">Your Pro License Code</p>
              <p style="font-size:32px;font-weight:900;color:#10b981;font-family:'Courier New',monospace;letter-spacing:6px;margin:0 0 8px;">${code}</p>
              <p style="color:#475569;font-size:11px;margin:0;">Keep this safe — it's your permanent Pro license key</p>
            </div>

            <!-- Setup Steps -->
            <h3 style="color:#f0f4f8;font-size:16px;margin:0 0 16px;font-weight:700;">⚡ Get scanning in 2 minutes:</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td style="padding:12px 14px;background:rgba(6,182,212,0.04);border:1px solid rgba(6,182,212,0.1);border-radius:10px 10px 0 0;">
                  <span style="color:#06b6d4;font-weight:800;font-size:14px;">1.</span>
                  <span style="color:#f0f4f8;font-size:14px;margin-left:8px;font-weight:600;">Download the app</span>
                  <br><a href="https://lumescan.tech/download" style="color:#06b6d4;font-size:13px;margin-left:22px;">lumescan.tech/download →</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 14px;background:rgba(6,182,212,0.03);border-left:1px solid rgba(6,182,212,0.1);border-right:1px solid rgba(6,182,212,0.1);">
                  <span style="color:#06b6d4;font-weight:800;font-size:14px;">2.</span>
                  <span style="color:#f0f4f8;font-size:14px;margin-left:8px;font-weight:600;">Create your account</span>
                  <br><span style="color:#94a3b8;font-size:13px;margin-left:22px;">Takes 10 seconds</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 14px;background:rgba(6,182,212,0.02);border-left:1px solid rgba(6,182,212,0.1);border-right:1px solid rgba(6,182,212,0.1);">
                  <span style="color:#06b6d4;font-weight:800;font-size:14px;">3.</span>
                  <span style="color:#f0f4f8;font-size:14px;margin-left:8px;font-weight:600;">Settings → Redeem Code</span>
                  <br><span style="color:#94a3b8;font-size:13px;margin-left:22px;">Enter: <strong style="color:#10b981;">${code}</strong></span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 14px;background:rgba(16,185,129,0.04);border:1px solid rgba(16,185,129,0.15);border-radius:0 0 10px 10px;">
                  <span style="color:#10b981;font-weight:800;font-size:14px;">4.</span>
                  <span style="color:#f0f4f8;font-size:14px;margin-left:8px;font-weight:600;">Plug in any BLE adapter & drive</span>
                  <br><span style="color:#94a3b8;font-size:13px;margin-left:22px;">42 signals. 100ms. You're live.</span>
                </td>
              </tr>
            </table>

            <!-- What You Just Unlocked -->
            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin-bottom:28px;">
              <h4 style="color:#f0f4f8;font-size:14px;margin:0 0 12px;">What you just unlocked:</h4>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Full 42-signal diagnostic engine</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ $2,880+ first-year value (fuel coaching + skipped shop visits + preventive catches)</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Predictive maintenance alerts</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Driver efficiency scoring</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ DTC translation + Amazon part links</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Mode 05 key management eligible ($199 unlock when ready)</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ ${isLifetime ? 'All future updates — forever. No monthly fee.' : `All updates included with your $${monthly}/mo service`}</td></tr>
              </table>
            </div>

            <!-- Adapter CTA -->
            <div style="background:rgba(255,153,0,0.06);border:1px solid rgba(255,153,0,0.15);border-radius:12px;padding:16px;margin-bottom:28px;text-align:center;">
              <p style="color:#ff9900;font-size:12px;font-weight:700;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Need an adapter?</p>
              <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 12px;">Any ELM327 BLE adapter works. $15–$25 on Amazon.</p>
              <a href="https://www.amazon.com/s?k=ELM327+BLE+OBD2+adapter&i=automotive&tag=garagebot-20" style="display:inline-block;padding:10px 24px;background:rgba(255,153,0,0.1);border:1px solid rgba(255,153,0,0.3);border-radius:8px;color:#ff9900;font-weight:700;font-size:13px;text-decoration:none;">Shop Adapters on Amazon →</a>
            </div>

            <!-- The Handshake -->
            <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-bottom:24px;">
              <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin:0;">
                <strong style="color:#f0f4f8;">One last thing.</strong> You got ${tierLabel} pricing because we believe in this product — and we need people who believe in it too. If Lume Scan earns it, the best way to support us is an honest review. We're a small indie lab in Tennessee, and every review helps us reach the next person. 🤝
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align:center;border-top:1px solid rgba(255,255,255,0.04);padding-top:20px;">
              <p style="color:#475569;font-size:11px;margin:0 0 4px;">
                DarkWave Studios LLC / <a href="https://lume42.com" style="color:#475569;">Lume42 Labs</a>
              </p>
              <p style="color:#334155;font-size:10px;margin:0 0 4px;">
                🇺🇸 Gladeville, Tennessee · US Patent Pending 64/032,339
              </p>
              <p style="color:#334155;font-size:10px;margin:0;">
                Questions? Reply to this email or contact support@lumescan.tech
              </p>
            </div>

          </div>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`[Email] ❌ Failed to send to ${email}:`, err);
  } else {
    console.log(`[Email] ✅ Purchase confirmation sent to ${email}`);
  }
}
