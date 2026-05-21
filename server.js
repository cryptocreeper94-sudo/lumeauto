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
  apk_url: 'https://firebasestorage.googleapis.com/v0/b/darkwave-auth.firebasestorage.app/o/downloads%2Flumescan-pro.apk?alt=media',
  changelog: 'Initial release — 42-signal diagnostic engine, fuel coaching, predictive maintenance, driver scoring.',
  min_version: '1.0.0',
};

app.get('/api/version', (req, res) => {
  res.json(APP_VERSION);
});

// ─── API: Health Check ──────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'operational', service: 'lume-auto', version: '2.0.0' });
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
              Welcome to the Lume Scan Pro family. You just got a professional-grade diagnostic engine for <strong style="color:#f0f4f8;">$${price}</strong>${isLifetime ? '' : ` + $${monthly}/mo`} — the kind of tool that costs $200+ anywhere else.
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
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Passive fuel coaching (saves $180–$320/yr)</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Predictive maintenance alerts</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ Driver efficiency scoring</td></tr>
                <tr><td style="padding:4px 0;color:#94a3b8;font-size:13px;">✅ DTC translation + Amazon part links</td></tr>
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
