# Lume Auto — lumeauto.tech

The order, authentication, and download portal for **Lume Scan Pro**. Also hosts the Cox Vehicle Intelligence whitepaper and engineering brief.

## What It Does

- Stripe-powered checkout with dynamic 3-tier pricing (Founders → Early Adopter → Standard)
- Firebase Authentication (Google SSO)
- Firestore entitlement management with license code provisioning
- Mode 05 (IMMO Key Management) and Mode 06 (Remote Start) marketing & purchase flow
- Branded purchase confirmation emails via Resend
- APK download portal — [Latest APK](https://expo.dev/artifacts/eas/swv6JsxEjzQkSbDjyBJN8e.apk)
- Trust Layer Ledger (TLL) verification integration

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express.js (`server.js`)
- **Payments**: Stripe Checkout
- **Auth**: Firebase Auth
- **Database**: Firestore (`darkwave-auth`)
- **Email**: Resend API
- **Hosting**: Render (web service)

## Local Development

```bash
npm install
npm run dev          # Frontend (Vite)
node server.js       # Backend (Express)
```

Requires `.env` with Stripe, Firebase, and Resend credentials.

## Deployment

Pushes to `main` auto-deploy to Render → `lumeauto.tech`

## Related

- [lumescan.tech](https://lumescan.tech) — Product landing page
- [lume42.com](https://lume42.com) — Lume42 Labs parent site

## Legal

© 2026 DarkWave Studios LLC / Lume42 Labs  
US Provisional Patent 64/032,339
