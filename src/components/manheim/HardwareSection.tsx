import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Server, Cable, Radio, HardDrive, Lock } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function HardwareSection() {
  return (
    <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Section Header */}
        <motion.div {...f} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Edge Hardware</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>Dual-Dongle Coexistence.</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            LumeScan is designed to work <strong>alongside</strong> your existing Cox2M cellular telematics — not instead of it.
            No hardware replacement. No infrastructure changes. No modification to Cox servers or data pipelines.
          </p>
        </motion.div>

        {/* Three-column layout */}
        <style>{`
          .hw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
          @media (max-width: 900px) { .hw-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="hw-grid">

          {/* Column 1: Today — Commodity BLE */}
          <motion.div {...f} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(6,182,212,0.2)', background: 'rgba(6,182,212,0.02)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Radio size={18} color="var(--accent-cyan)" />
                </div>
                <div>
                  <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Deploy Today</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Commodity BLE Adapter</div>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
                Any standard BLE OBD-II adapter can run the full LumeScan 42-signal diagnostic suite today. The software is the differentiator — the diagnostic intelligence, the deterministic runtime, the cryptographic audit trail. All of that runs on the phone, not the dongle.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {['Works with any BLE 4.2+ OBD-II dongle', 'Full 42-signal capture on day one', 'Compatible with iOS and Android', 'Zero capital investment to evaluate'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={14} color="var(--accent-cyan)" /><span style={{ fontSize: '0.8rem' }}>{t}</span></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Coexistence — The Splitter */}
          <motion.div {...f} transition={{ delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.02)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cable size={18} color="var(--accent-emerald)" />
                </div>
                <div>
                  <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Zero Disruption</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>OBD-II Coexistence</div>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
                Cox2M is the <strong>Vehicle Layer</strong> — long-term cellular asset tracking, GPS pings, and compliance. LumeScan is the <strong>Operational Layer</strong> — real-time diagnostics, workflow-driven scanning, and condition reporting. A passive OBD-II Y-splitter lets both coexist on the same vehicle port with zero interference.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Cox2M stays plugged in — untouched',
                  'LumeScan connects via passive splitter',
                  'CAN bus arbitration handled by protocol',
                  'No modification to Cox infrastructure',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={14} color="var(--accent-emerald)" /><span style={{ fontSize: '0.8rem' }}>{t}</span></div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 3: Roadmap — Purpose-Built Dongle */}
          <motion.div {...f} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(251,146,60,0.2)', background: 'rgba(251,146,60,0.02)', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(251,146,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HardDrive size={18} color="#fb923c" />
                </div>
                <div>
                  <div style={{ color: '#fb923c', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Roadmap</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>The LumeScan Endpoint</div>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
                The production architecture calls for a purpose-built BLE 5.0 diagnostic endpoint with onboard flash storage for <strong>vehicle-carried mode</strong> — continuous life-cycle logging while the vehicle sits on the lot, even when no technician is present. The dongle captures cold starts, battery curves, DTCs, and CAN anomalies autonomously.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  { icon: <Zap size={14}/>, t: 'BLE 5.0 — 32MB sync in under 2 minutes' },
                  { icon: <Lock size={14}/>, t: 'AES-256-GCM encryption at rest' },
                  { icon: <Shield size={14}/>, t: 'Read-only firmware — never writes to the ECU' },
                  { icon: <Server size={14}/>, t: 'Fleet identity + OTA firmware governance' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fb923c' }}>{item.icon}<span style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{item.t}</span></div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Architecture Layers Table */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', marginTop: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Architectural Layers</h3>
          <table className="data-table">
            <thead><tr><th>Layer</th><th>Device</th><th>Function</th></tr></thead>
            <tbody>
              <tr><td style={{ color: 'var(--text-muted)' }}>Vehicle Layer</td><td>Cox2M Cellular Dongle</td><td>Long-term asset tracking, GPS, compliance</td></tr>
              <tr><td style={{ color: 'var(--accent-cyan)' }}>Operational Layer</td><td>LumeScan Dongle (BLE)</td><td>Real-time diagnostics, workflow scans, organism scoring</td></tr>
              <tr><td style={{ color: 'var(--accent-emerald)' }}>Coexistence Layer</td><td>Passive OBD-II Splitter</td><td>Enables simultaneous operation — no arbitration, no modification</td></tr>
              <tr><td style={{ color: '#fb923c' }}>Life-Cycle Layer</td><td>LumeScan Onboard Storage</td><td>Autonomous diagnostic logging between technician visits</td></tr>
            </tbody>
          </table>
          <p className="text-dim" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
            No need to replace or modify 500,000+ installed cellular dongles. LumeScan becomes the operational OS instrumentation layer that Cox2M was never designed to be.
          </p>
        </motion.div>

        {/* Read-only constraint callout */}
        <motion.div {...f} style={{ maxWidth: '700px', margin: '2rem auto 0', padding: '1.25rem 1.5rem', borderRadius: '12px', background: 'rgba(16,185,129,0.03)', border: '1px solid rgba(16,185,129,0.15)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Shield size={20} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.35rem' }}>Read-Only by Design</p>
            <p className="text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.7, margin: 0 }}>
              The LumeScan dongle <strong>never writes to the vehicle ECU</strong> under any condition. No reprogramming, no calibration changes, no firmware alteration. This constraint is enforced at the firmware level — not the application layer — making ECU write commands architecturally impossible in standard operating modes.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
