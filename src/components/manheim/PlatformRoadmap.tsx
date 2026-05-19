import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, Truck, Zap, Fingerprint, Search } from 'lucide-react';

const PHASES = [
  {
    phase: 'Pilot Ready',
    color: '#10b981',
    border: 'rgba(16,185,129,0.2)',
    glow: 'rgba(16,185,129,0.06)',
    apps: [
      { icon: <Search size={20} />, name: 'LumeScan', desc: 'OBD-II diagnostics — 45-second deterministic vehicle scans with condition certificates.' },
      { icon: <Wrench size={20} />, name: 'Lot Ops Pro', desc: 'Real-time lot operations — driver routing, intake workflows, custody tracking.' },
    ],
  },
  {
    phase: 'In Development',
    color: '#38bdf8',
    border: 'rgba(56,189,248,0.2)',
    glow: 'rgba(56,189,248,0.06)',
    apps: [
      { icon: <Wrench size={20} />, name: 'Recon OS', desc: 'Reconditioning lifecycle — vendor coordination, parts tracking, verified recon steps.' },
      { icon: <ShieldCheck size={20} />, name: 'Safety OS', desc: 'Compliance and incident management — hazard logging, training verification, safety protocols.' },
    ],
  },
  {
    phase: 'Planned',
    color: '#a78bfa',
    border: 'rgba(167,139,250,0.2)',
    glow: 'rgba(167,139,250,0.06)',
    apps: [
      { icon: <Truck size={20} />, name: 'Fleet OS', desc: 'Internal fleet management — maintenance schedules, asset utilization, fleet health monitoring.' },
      { icon: <Fingerprint size={20} />, name: 'Identity OS', desc: 'Enterprise identity and permissions — role governance, access control, Trust Layer integration.' },
      { icon: <Search size={20} />, name: 'CAL Explorer', desc: 'Full ledger analytics — block inspection, audit trails, cross-system event tracing.' },
      { icon: <Zap size={20} />, name: 'Meridian Energy', desc: 'Wireless energy routing — EV charging, lot infrastructure power, metered energy distribution.' },
    ],
  },
];

export default function PlatformRoadmap() {
  return (
    <section style={{ padding: '5rem 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', padding: '6px 14px',
              background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)',
              borderRadius: '20px', fontSize: '0.75rem', color: '#a78bfa',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              Platform Roadmap
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', lineHeight: 1.1 }}>
              Native COP Applications
            </h2>
            <p className="text-muted" style={{ maxWidth: '620px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              Every app runs natively inside the COP operating environment, writes to the Cox Automotive Ledger, and inherits Lume-V governance. The platform grows — the architecture doesn't change.
            </p>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {PHASES.map((phase, pi) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pi * 0.1 }}
            >
              {/* Phase label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '0.75rem',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: phase.color,
                  boxShadow: `0 0 8px ${phase.color}`,
                }} />
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700, color: phase.color,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {phase.phase}
                </span>
              </div>

              {/* App cards grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '12px',
              }}>
                {phase.apps.map(app => (
                  <div key={app.name} style={{
                    background: phase.glow,
                    border: `1px solid ${phase.border}`,
                    borderRadius: '14px',
                    padding: '18px 20px',
                    transition: 'all 0.25s ease',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      marginBottom: '8px',
                    }}>
                      <div style={{ color: phase.color, opacity: 0.8 }}>{app.icon}</div>
                      <span style={{
                        fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)',
                      }}>
                        {app.name}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '0.8rem', color: 'var(--text-dim)',
                      lineHeight: 1.6, margin: 0,
                    }}>
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
