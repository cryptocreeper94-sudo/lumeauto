import { motion } from 'framer-motion';

export default function Fleet() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
          Commercial & Enterprise
        </div>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Fleet Operators</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>
          Multi-vehicle dashboard, fleet-wide efficiency analytics, maintenance coordination, and driver behavior scoring.
        </p>

        <div className="panel mt-8">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tier 2 — Fleet</h2>
          <p className="text-cyan font-mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>$29.99/vehicle/month</p>
          <p className="text-muted">Target: SMB fleets, rental companies, courier services.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Multi-vehicle dashboard</li>
            <li style={{ marginBottom: '0.5rem' }}>Fleet-wide efficiency analytics</li>
            <li style={{ marginBottom: '0.5rem' }}>Maintenance coordination</li>
            <li>Driver behavior scoring (FS10)</li>
          </ul>
        </div>

        <div className="panel mt-4">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Tier 3 — Enterprise</h2>
          <p className="text-cyan font-mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Custom Pricing</p>
          <p className="text-muted">Target: Municipal fleets, logistics operators, government vehicles.</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            <li style={{ marginBottom: '0.5rem' }}>Custom integration</li>
            <li style={{ marginBottom: '0.5rem' }}>SLA</li>
            <li>Compliance reporting</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
