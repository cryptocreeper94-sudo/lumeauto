import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Privacy Policy</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Last updated: May 2026</p>
        
        <div className="panel mt-8 flex flex-col gap-6">
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Data Collection</h2>
            <p className="text-muted">We collect telemetry data transmitted from your vehicle's OBD-II port solely for the purpose of providing efficiency scoring, maintenance alerts, and app functionality. We do not sell your personal driving data to third parties.</p>
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. SMS Communications</h2>
            <p className="text-muted">By providing your phone number and opting in, you consent to receive SMS communications. We securely store your phone number using enterprise-grade encryption. We do not share or sell your phone number to third-party marketers. You may opt-out at any time by replying STOP.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Third-Party Integrations</h2>
            <p className="text-muted">We utilize strict, compliant third-party infrastructure (such as Twilio for communications and Stripe for billing) to process your requests. These entities are bound by their respective stringent privacy and security protocols.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
