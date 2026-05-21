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

  // Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;
    const metadata = session.metadata || {};

    console.log(`[Webhook] ✅ Payment completed: ${customerEmail} — ${metadata.product}`);

    if (metadata.product === 'lumescan-pro' && customerEmail) {
      try {
        // 1. Generate unique redemption code
        const code = generateRedemptionCode();

        // 2. Write entitlement to Firestore (direct REST API)
        await writeFirestoreEntitlement(customerEmail, code);

        // 3. Send confirmation email with code + download link
        await sendPurchaseEmail(customerEmail, code);

        console.log(`[Webhook] ✅ Pro license activated for ${customerEmail} — code: ${code}`);
      } catch (err) {
        console.error('[Webhook] ❌ Post-purchase processing failed:', err);
        // Don't return error to Stripe — payment succeeded, we'll fix manually
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

// 3-tier launch pricing — reads claimed count from Firestore
const LAUNCH_TIERS = [
  { name: 'Founders',      cap: 100, cents: 999  },  // $9.99
  { name: 'Early Adopter',  cap: 500, cents: 1999 },  // $19.99
  { name: 'Standard',       cap: Infinity, cents: 3999 }, // $39.99
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
  res.json({
    tier: tier.name,
    price: tier.cents / 100,
    claimed,
    remaining: tier.cap === Infinity ? null : (tier.cap - claimed + (tier === LAUNCH_TIERS[0] ? 0 : LAUNCH_TIERS.slice(0, LAUNCH_TIERS.indexOf(tier)).reduce((a, t) => a + t.cap, 0))),
  });
});

app.post('/api/checkout-kit', async (req, res) => {
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const claimed = await getClaimedCount();
    const tier = getTierFromCount(claimed);
    console.log(`[Lume-Auto] 💰 Checkout at ${tier.name} tier: $${(tier.cents / 100).toFixed(2)} (${claimed} claimed)`);

    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      // NO shipping — software-only purchase
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Lume Scan Pro License — ${tier.name} Pricing`,
            description: 'Full 42-signal OBD-II diagnostic engine. Fuel coaching, predictive maintenance, driver scoring. One-time purchase — no subscription.',
          },
          unit_amount: tier.cents,
        },
        quantity: 1,
      }],
      success_url: `${SITE_URL}/order?success=true`,
      cancel_url: `${SITE_URL}/order?cancelled=true`,
      metadata: {
        type: 'lumescan',
        product: 'lumescan-pro',
        includes_software_license: 'true',
        tier: tier.name,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Pro license checkout error:', err);
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
async function writeFirestoreEntitlement(email, code) {
  const docPath = `entitlements/${encodeURIComponent(email.toLowerCase())}`;
  const url = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT}/databases/(default)/documents/${docPath}`;

  const body = {
    fields: {
      lumescan_purchased: { booleanValue: true },
      tier: { stringValue: 'pro' },
      redemption_code: { stringValue: code },
      purchased_at: { timestampValue: new Date().toISOString() },
      email: { stringValue: email.toLowerCase() },
    },
  };

  // Try PATCH (update), if 404 create new
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firestore write failed: ${res.status} — ${errText}`);
  }

  console.log(`[Firestore] ✅ Entitlement written for ${email}`);
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
async function sendPurchaseEmail(email, code) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.log(`[Email] ⚠️ No RESEND_API_KEY — would have sent to ${email}:`);
    console.log(`[Email]   Code: ${code}`);
    console.log(`[Email]   Download: ${SITE_URL}/download`);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Lume Scan <noreply@lumescan.tech>',
      to: [email],
      subject: '🔧 Your Lume Scan Pro License is Ready',
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:500px;margin:0 auto;padding:40px 20px;color:#f0f4f8;background:#06080e;">
          <h1 style="color:#10b981;font-size:24px;margin-bottom:8px;">Lume Scan Pro</h1>
          <p style="color:#94a3b8;font-size:14px;margin-bottom:24px;">Your license is active. Here's everything you need:</p>

          <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
            <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Your Redemption Code</p>
            <p style="font-size:28px;font-weight:800;color:#10b981;font-family:monospace;letter-spacing:4px;">${code}</p>
          </div>

          <h3 style="color:#f0f4f8;font-size:16px;margin-bottom:12px;">Get Started:</h3>
          <ol style="color:#94a3b8;font-size:14px;line-height:2;">
            <li>Download the app: <a href="${SITE_URL}/download" style="color:#06b6d4;">lumescan.tech/download</a></li>
            <li>Create your account or sign in</li>
            <li>Go to Settings → Redeem Code</li>
            <li>Enter your code: <strong style="color:#10b981;">${code}</strong></li>
          </ol>

          <div style="background:rgba(6,182,212,0.06);border:1px solid rgba(6,182,212,0.15);border-radius:12px;padding:16px;margin-top:24px;">
            <p style="color:#06b6d4;font-size:12px;font-weight:700;margin-bottom:4px;">NEED AN ADAPTER?</p>
            <p style="color:#94a3b8;font-size:13px;line-height:1.5;">Lume Scan works with any ELM327 BLE adapter ($15-$30 on Amazon). Search "ELM327 BLE OBD2" — any 4.0+ model works.</p>
          </div>

          <p style="color:#475569;font-size:11px;margin-top:32px;text-align:center;">
            DarkWave Studios LLC / Lume42 Labs<br>
            support@lumescan.tech
          </p>
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
