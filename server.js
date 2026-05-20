import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db/index.js';
import { waitlist } from './server/db/schema.js';
import { eq } from 'drizzle-orm';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
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

// ─── API: Stripe Checkout Session ───────────────────────────────────────────
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
      success_url: `${process.env.SITE_URL || 'https://lumeauto.tech'}/waitlist?success=true`,
      cancel_url: `${process.env.SITE_URL || 'https://lumeauto.tech'}/fleet?cancelled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Stripe error:', err);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

// ─── API: Kit Order (One-Time Purchase) ─────────────────────────────────────
app.post('/api/checkout-kit', async (req, res) => {
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Lume-Auto Diagnostic Kit',
            description: 'Professional OBD-II WiFi adapter + Lume-Auto software license. App download code emailed instantly.',
            images: [`${process.env.SITE_URL || 'https://lumeauto.tech'}/dongle_product.png`],
          },
          unit_amount: 2999, // $29.99
        },
        quantity: 1,
      }],
      success_url: `${process.env.SITE_URL || 'https://lumeauto.tech'}/order?success=true`,
      cancel_url: `${process.env.SITE_URL || 'https://lumeauto.tech'}/order?cancelled=true`,
      metadata: {
        type: 'lumescan',
        product: 'lume-auto-kit',
        includes_software_license: 'true',
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Lume-Auto] ❌ Kit checkout error:', err);
    res.status(500).json({ error: 'Payment initialization failed.' });
  }
});

// ─── API: Health Check ──────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'operational', service: 'lume-auto', version: '1.0.0' });
});

// ─── Serve Vite static build ────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Lume-Auto] 🚀 Web service running on port ${PORT}`);
});
