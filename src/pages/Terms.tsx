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
            <p className="text-muted">Lume-Auto is primarily a diagnostic read tool that retrieves data from your vehicle's Engine Control Unit (ECU). The platform also includes a DTC clearing function (OBD-II Mode 04) that sends a standard reset command to the ECU to clear stored trouble codes and the Malfunction Indicator Lamp. This is the same function performed by any standard OBD-II scan tool and does not alter engine calibration, firmware, or operating parameters. Use of the code-clearing function is at your sole discretion and responsibility. Under no circumstances shall Lume-Auto, DarkWave Studios LLC, its directors, employees, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from vehicle malfunction, accidents, warranty disputes, or emissions inspection outcomes.</p>
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
