import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Privacy Policy</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Last updated: May 21, 2026</p>
        
        <div className="panel mt-8 flex flex-col gap-6">
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Data Collection</h2>
            <p className="text-muted">We collect telemetry data transmitted from your vehicle's OBD-II port solely for the purpose of providing efficiency scoring, maintenance alerts, and app functionality. We do not sell your personal driving data to third parties. Vehicle diagnostic data is processed locally on your device; only anonymized, aggregated performance metrics may be transmitted to our servers for service improvement.</p>
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Billing & Payment Data</h2>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}>All payment processing is handled by <strong style={{ color: 'var(--text-main)' }}>Stripe, Inc.</strong>, a PCI-DSS Level 1 certified payment processor. We do not store, process, or have access to your full credit card number, CVV, or bank account details.</p>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>What we store:</strong> Your email address, purchase tier, subscription status, and Stripe customer ID — sufficient to manage your account and provide support.</p>
            <p className="text-muted"><strong style={{ color: 'var(--text-main)' }}>Recurring charges:</strong> If you have an active monthly subscription, Stripe will charge your payment method on file at the beginning of each billing cycle. You will receive an email receipt for each charge. You may update or remove your payment method at any time through your Stripe customer portal or by contacting support@lumescan.tech.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Account Data</h2>
            <p className="text-muted">When you purchase Lume Scan Pro, we create a customer record containing your email address, subscription tier, license status, and purchase date. This data is used exclusively for license validation, subscription management, and customer support. We do not share this data with advertisers or data brokers.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. SMS Communications</h2>
            <p className="text-muted">By providing your phone number and opting in, you consent to receive SMS communications. We securely store your phone number using enterprise-grade encryption. We do not share or sell your phone number to third-party marketers. You may opt-out at any time by replying STOP.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>5. Third-Party Integrations</h2>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}>We utilize strict, compliant third-party infrastructure to process your requests:</p>
            <p className="text-muted" style={{ marginBottom: '0.25rem' }}>• <strong style={{ color: 'var(--text-main)' }}>Stripe</strong> — Payment processing and subscription management (PCI-DSS L1)</p>
            <p className="text-muted" style={{ marginBottom: '0.25rem' }}>• <strong style={{ color: 'var(--text-main)' }}>Firebase</strong> — Authentication and license validation</p>
            <p className="text-muted" style={{ marginBottom: '0.25rem' }}>• <strong style={{ color: 'var(--text-main)' }}>Twilio</strong> — SMS communications (opted-in only)</p>
            <p className="text-muted">• <strong style={{ color: 'var(--text-main)' }}>Amazon Associates</strong> — Affiliate product links (tag: garagebot-20). Clicking affiliate links to Amazon or eBay is subject to those platforms' respective privacy policies.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>6. Data Retention & Deletion</h2>
            <p className="text-muted">We retain customer records for the duration of your subscription or license, plus 12 months after cancellation for support and refund purposes. You may request complete deletion of your data at any time by emailing support@lumescan.tech. We will comply with deletion requests within 30 days.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>7. Children's Privacy</h2>
            <p className="text-muted">Lume Scan is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn that we have collected such data, we will delete it promptly.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>8. Contact</h2>
            <p className="text-muted">For privacy inquiries or data deletion requests: <strong style={{ color: 'var(--text-main)' }}>support@lumescan.tech</strong></p>
            <p className="text-muted" style={{ marginTop: '0.5rem' }}>DarkWave Studios LLC — <a href="https://lume42.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>Lume42 Labs</a></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
