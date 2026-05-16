import { motion } from 'framer-motion';
import { useState } from 'react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const screens = [
  { src: '/assets/images/app_dashboard.png', title: 'Live Dashboard', shortTitle: 'Dash', desc: 'Real-time MPG recovery, RPM, speed, driver score, and organism throughput at a glance. The control surface for the entire deterministic runtime.' },
  { src: '/assets/images/app_diagnostic.png', title: 'Diagnostic Scan', shortTitle: 'Scan', desc: 'Full OBD-II readiness monitors, active DTCs with severity classification, and live sensor data — all parsed through the governance organism.' },
  { src: '/assets/images/app_organism.png', title: 'Organism Governance', shortTitle: 'Org', desc: 'The 42-node organism visualized in real-time. Watch cross-validation consensus, drift correction, and self-healing happen autonomously.' },
  { src: '/assets/images/app_certificate.png', title: 'Condition Certificate', shortTitle: 'Cert', desc: 'Cryptographically signed, replay-verifiable vehicle condition reports. Arbitration-grade evidence generated in 45 seconds.' },
];

const features: Record<number, string[]> = {
  0: ['Live RPM, MPH, MPG telemetry', 'Driver performance scoring', 'Organism throughput monitoring', 'Dead-battery and cold-start detection', '60% of condition report auto-generated', 'One-tap full report generation'],
  1: ['8 readiness monitors — pass/fail', 'DTC codes with severity classification', 'Catalyst efficiency + O2 sensor health', 'Fuel trims, battery voltage, engine hours', 'Pending fault detection before lane', 'Auto-generated reconditioning flags'],
  2: ['42-node visualization in real-time', '4-layer concentric topology', 'Drift detection + auto-correction', 'Self-healing runtime monitoring', 'Consensus percentage tracking'],
  3: ['SHA-256 cryptographic hash', 'Per-system health percentages', 'Deterministic replay for arbitration', 'Tamper-proof custody chain record', 'Publicly verifiable without login'],
};

export default function AppShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(56,189,248,0.03) 0%, var(--bg-dark) 100%)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Application</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>LUME-Auto in Action</h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
            Four primary interfaces. Every screen is a window into the deterministic organism — not a static dashboard, but a live view of a self-governing runtime.
          </p>
        </div>

        {/* Tab selector — short labels on mobile */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
          {screens.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{
                flex: 1, padding: '12px 6px', fontWeight: 600,
                background: active === i ? 'rgba(56,189,248,0.1)' : 'transparent',
                color: active === i ? 'var(--accent-cyan)' : 'var(--text-dim)',
                border: 'none', borderBottom: active === i ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.3s',
                letterSpacing: '0.03em', textTransform: 'uppercase',
              }}
            >
              <span className="app-tab-full" style={{ fontSize: '0.78rem' }}>{s.title}</span>
              <span className="app-tab-short" style={{ fontSize: '0.7rem', display: 'none' }}>{s.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Screen display — stacks on mobile, image full width */}
        <motion.div {...f}>
          {/* Image — centered, full width on mobile */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={screens[active].src}
              alt={screens[active].title}
              style={{
                maxWidth: '380px', width: '100%', borderRadius: '16px',
                border: '1px solid rgba(56,189,248,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(56,189,248,0.08)',
              }}
            />
          </div>

          {/* Description + features below */}
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}
            style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>{screens[active].title}</h3>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{screens[active].desc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', textAlign: 'left' }}>
              {features[active].map((item, i) => (
                <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(56,189,248,0.3)' }}>{item}</div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .app-tab-full { display: none !important; }
          .app-tab-short { display: inline !important; }
        }
      `}</style>
    </section>
  );
}
