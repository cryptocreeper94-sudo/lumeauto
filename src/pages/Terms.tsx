import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Terms of Service</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Last updated: May 2026</p>
        
        <div className="panel mt-8 flex flex-col gap-6">
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
            <p className="text-muted">By accessing or using the Lume-Auto application, hardware adapter, or associated services (collectively, the "Services"), you agree to be bound by these Terms. If you do not agree, do not use the Services.</p>
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Use of Services</h2>
            <p className="text-muted">Lume-Auto provides vehicle telemetry, diagnostic insights, and behavioral governance guidance. The Services are intended solely for informational and educational purposes. You are solely responsible for operating your vehicle safely and in compliance with all traffic laws.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. Limitation of Liability</h2>
            <p className="text-muted">Lume-Auto does not modify, write to, or alter your Engine Control Unit (ECU). The hardware dongle is strictly a read-only diagnostic device. Under no circumstances shall Lume-Auto, its directors, employees, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from vehicle malfunction, accidents, or warranty voids.</p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. SMS and Communications</h2>
            <p className="text-muted">If you opt-in to our SMS waitlist or alerts, you agree to receive text messages from Lume-Auto at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to cancel.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
