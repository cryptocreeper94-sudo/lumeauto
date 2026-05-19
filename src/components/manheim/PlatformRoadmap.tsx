import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, Truck, Zap, Fingerprint, Search, Users, ClipboardList } from 'lucide-react';

const PHASES = [
  {
    phase: 'Pilot Ready',
    color: '#10b981',
    border: 'rgba(16,185,129,0.2)',
    glow: 'rgba(16,185,129,0.06)',
    apps: [
      { icon: <Search size={20} />, name: 'LumeScan', desc: 'Connects directly to a vehicle\'s OBD-II port and runs a full diagnostic scan in 45 seconds — reading and clearing trouble codes, capturing freeze-frame data, and producing a deterministic condition certificate anchored to the ledger. Replaces subjective visual inspections with verifiable, reproducible results.' },
      { icon: <ClipboardList size={20} />, name: 'Lot Ops Pro', desc: 'The comprehensive operational platform for lot-level activity. Role-based modules cover the full spectrum of daily operations — vehicle intake, driver assignments, lane routing, and custody transfers. Includes built-in Safety & Compliance (incident reporting, hazard logging, OSHA workflows, speed violation tracking), Employee Portal (digital bulletin board, first responder contacts, recognition, pre-shift safety topics), and Fleet Management (van inspection, equipment checkout, EV charging). Every event is ledger-anchored on the CAL.' },
    ],
  },
  {
    phase: 'In Development',
    color: '#38bdf8',
    border: 'rgba(56,189,248,0.2)',
    glow: 'rgba(56,189,248,0.06)',
    apps: [
      { icon: <Wrench size={20} />, name: 'Recon OS', desc: 'Manages the full reconditioning lifecycle — from initial work-order generation (auto-populated by LumeScan diagnostics) through vendor assignment, parts procurement, task completion, and final sign-off. Every recon step is verified and ledger-anchored, eliminating the "he said, she said" between facilities and vendors.' },
      { icon: <ShieldCheck size={20} />, name: 'Safety OS', desc: 'Enterprise-wide safety compliance for every Cox subsidiary — not just the lot. Lot Ops Pro\'s built-in safety module covers auction facility operations; Safety OS extends that to Autotrader, Kelley Blue Book, Dealertrack, vAuto, Xtime, and corporate offices. Incident reporting, near-miss logging, training certification tracking, OSHA-aligned workflows, and cross-division compliance dashboards — all sealed on the CAL.' },
    ],
  },
  {
    phase: 'Planned',
    color: '#a78bfa',
    border: 'rgba(167,139,250,0.2)',
    glow: 'rgba(167,139,250,0.06)',
    apps: [
      { icon: <Truck size={20} />, name: 'Fleet OS', desc: 'Enterprise-wide fleet and asset management — maintenance scheduling, service history tracking, asset utilization analytics, and fleet health monitoring across all Cox subsidiaries. Extends the LumeScan diagnostic pipeline beyond auction inventory to operational vehicles, transport equipment, and facility assets.' },
      { icon: <Fingerprint size={20} />, name: 'Identity OS', desc: 'Enterprise identity, permissions, and role governance. Bridges internal authentication (Okta, Azure AD) with VET\'s external verification system, providing a single identity framework across all COP applications with ledger-anchored access control.' },
      { icon: <Search size={20} />, name: 'CAL Explorer', desc: 'A full-featured ledger analytics application — block inspection, validator health, operational audit trails, and cross-system event tracing. Gives compliance teams and operations leadership direct visibility into every recorded event across the enterprise.' },
      { icon: <Zap size={20} />, name: 'Meridian Energy', desc: 'Wireless energy routing and management for lot infrastructure. Overhead anchor nodes deliver metered power to EV charging stations, lighting, and operational equipment. Every watt is tracked, timestamped, and ledger-verified — the same deterministic trust applied to energy that the CAL applies to vehicle records.' },
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
