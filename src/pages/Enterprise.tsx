import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Layers, Radio } from 'lucide-react';

export default function Enterprise() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* Hero */}
      <section style={{ padding: '5rem 0 4rem', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(165deg, rgba(16,185,129,0.06) 0%, var(--bg-dark) 50%)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '850px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              Enterprise Platform · 3 Products · 1 Runtime
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              One Platform. <span className="text-gradient">Every Vehicle Touchpoint.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Condition scanning at intake. Lot operations and driver management. Arbitration defense by data replay. All on a single deterministic runtime. All sharing one data layer. All auditable to the sensor level.
            </p>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>No other platform offers this integration.</strong> Lume Ops Recon + Lume-Auto + Lume Build = a unified vehicle intelligence layer purpose-built for wholesale automotive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Three Products */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>The Platform</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Three capabilities. One deterministic runtime. 2,358 test cases. Zero AI in the critical path.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                badge: 'Independently Designed',
                title: 'Lume Ops Recon',
                subtitle: 'Lot Operations',
                icon: <MapPin size={28} />,
                features: ['Autonomous OCR ticket scanning', 'GPS routing with compass guidance', 'Live driver performance tracking (MPH quota)', 'Speed monitoring (15/17/22 MPH tiers)', 'Real-time supervisor ↔ driver messaging', 'Role-based dashboards (4 roles)', 'Safety incident reporting with photo', 'Weather radar with tornado alerts'],
                stat: '$0', statLabel: 'Hardware cost (BYOD)',
                color: 'var(--accent-emerald)',
              },
              {
                badge: 'Production · lumeauto.tech',
                title: 'Lume-Auto',
                subtitle: 'Vehicle Intelligence',
                icon: <Radio size={28} />,
                features: ['42-node OBD-II telemetry governance', 'WiFi adapter → condition report in 45 sec', 'Arbitration defense via scan log replay', 'Battery health flagging at intake (SL3/SL8)', 'Pending fault detection pre-lane', 'Lane readiness scoring', 'Population health dashboards', 'Driver behavior scoring (FS10)'],
                stat: '42', statLabel: 'Governance nodes per vehicle',
                color: 'var(--accent-cyan)',
              },
              {
                badge: 'Self-Healing Runtime',
                title: 'Lume Build',
                subtitle: 'Platform Extension',
                icon: <Layers size={28} />,
                features: ['Deterministic .lume compilation', 'Self-healing organism state correction', 'Native language for custom workflows', 'New organisms deployable in hours', 'Reproducible build outputs', '8 production organisms / 336 nodes', 'Client-specific capability extension', 'Published on Zenodo'],
                stat: '8', statLabel: 'Production organisms',
                color: '#a78bfa',
              }
            ].map((product, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="panel flex flex-col" style={{ padding: '2rem', borderColor: `${product.color}33` }}>
                <div style={{ fontSize: '0.7rem', color: product.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>{product.badge}</div>
                <div style={{ color: product.color, marginBottom: '1rem' }}>{product.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{product.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{product.subtitle}</p>
                <ul className="flex flex-col gap-2" style={{ listStyle: 'none', flex: 1 }}>
                  {product.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
                      <CheckCircle size={12} color={product.color} style={{ flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: product.color, fontFamily: 'var(--font-mono)' }}>{product.stat}</div>
                  <div className="text-dim" style={{ fontSize: '0.75rem' }}>{product.statLabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Story — The Unified Lifecycle */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Unified Vehicle Lifecycle</h2>
            <p className="text-muted">What happens when both products run on the same lot.</p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { step: '01', title: 'Vehicle Arrives', product: 'Lume-Auto', desc: '45-second OBD-II scan at intake. Condition report generated. Battery health flagged. Pending faults identified. Lane readiness scored.', color: 'var(--accent-cyan)' },
              { step: '02', title: 'Routing & Assignment', product: 'Ops Recon', desc: 'Receives vehicle health data from Lume-Auto. Routes vehicle to correct lane or reconditioning. Driver assigned via GPS. Move tracked in real-time.', color: 'var(--accent-emerald)' },
              { step: '03', title: 'Lot Residence', product: 'Both', desc: 'Lume-Auto monitors for battery drain and fault emergence. Ops Recon tracks lot position, move history, and time-on-lot.', color: '#a78bfa' },
              { step: '04', title: 'Pre-Sale', product: 'Lume-Auto', desc: 'Updated condition report generated for listing. Lane assignment confirmed. All data flows to the sale record.', color: 'var(--accent-cyan)' },
              { step: '05', title: 'Arbitration Defense', product: 'Lume-Auto', desc: 'Dispute? Pull the intake scan log. Deterministic replay: same inputs → same condition report. Resolved by data, not opinion.', color: 'var(--accent-emerald)' },
              { step: '06', title: 'Transport', product: 'Both', desc: 'Lume-Auto flags drivetrain health unsuitable for transport. Ops Recon assigns transport driver and tracks via GPS.', color: 'var(--accent-cyan)' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="panel flex gap-4" style={{ padding: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.06)', fontFamily: 'var(--font-mono)', minWidth: '36px' }}>{item.step}</div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1.05rem' }}>{item.title}</h4>
                    <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', background: `${item.color}15`, color: item.color, fontWeight: 600 }}>{item.product}</span>
                  </div>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lume Dongle — Proprietary Hardware */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: '20px', fontSize: '0.7rem', color: '#fb923c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Phase 2 · In Development
            </div>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>The Lume Dongle</h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Every OBD-II adapter on the market uses a 2005-era chip with a single radio — WiFi or Bluetooth, never both. I'm building a smart endpoint that does all three on a $13 BOM.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="panel" style={{ padding: '2rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fb923c' }}>Hardware</h4>
              <div className="flex flex-col gap-2">
                {[
                  { part: 'ESP32-S3', desc: 'WiFi + BT Classic + BLE on one chip', cost: '~$3' },
                  { part: 'MCP2515 + TJA1050', desc: 'CAN bus controller + transceiver', cost: '~$2' },
                  { part: 'OBD-II Connector', desc: 'Standard 16-pin (every car since 1996)', cost: '~$3' },
                  { part: 'Custom PCB', desc: 'Lume-branded board + firmware', cost: '~$5' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: '#fb923c', fontFamily: 'var(--font-mono)', fontWeight: 600, minWidth: '40px' }}>{item.cost}</span>
                    <span className="text-muted">{item.part} — {item.desc}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3" style={{ fontSize: '0.95rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: '40px' }}>$13</span>
                  <span style={{ fontWeight: 600 }}>Total BOM → <span style={{ color: 'var(--accent-cyan)' }}>$39–$49 retail</span></span>
                </div>
              </div>
            </div>

            <div className="panel" style={{ padding: '2rem' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#fb923c' }}>vs. Generic Adapters</h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Connectivity', generic: 'WiFi OR Bluetooth', lume: 'All three — user\'s choice' },
                  { label: 'Protocol', generic: 'J1979 Polling', lume: 'Passive CAN Sniffing (Instant)' },
                  { label: 'Intelligence', generic: 'Dumb pipe', lume: 'On-device governance' },
                  { label: 'Firmware', generic: 'Burned at factory', lume: 'OTA updates via WiFi' },
                  { label: 'Fleet tracking', generic: 'Not possible', lume: 'Unique device ID + registry' },
                  { label: 'Edge processing', generic: 'None', lume: 'Anomaly detection on-chip' },
                ].map((item, i) => (
                  <div key={i} style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    <div className="flex gap-2">
                      <span className="text-muted" style={{ textDecoration: 'line-through', opacity: 0.5 }}>{item.generic}</span>
                      <span>→</span>
                      <span style={{ color: 'var(--accent-emerald)' }}>{item.lume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: '1.5rem', background: 'rgba(251,146,60,0.03)', borderColor: 'rgba(251,146,60,0.15)' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#fb923c' }}>What This Means for Manheim</h4>
            <div className="flex flex-col gap-2">
              {[
                'One device per intake station — connects to any phone, any platform, any protocol.',
                'Zero discovery time — drops into Listen-Only mode to sniff raw CAN broadcasts. Connects instantly and bypasses modern Secure Gateways.',
                'On-device fault detection starts the moment the vehicle powers on — before the app connects.',
                'Fleet-level device management: track which adapter is at which station, push firmware OTA.',
                'Tamper-evident scan logs: condition data signed on-device with unique key. Cryptographic arbitration defense.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
                  <CheckCircle size={14} color="#fb923c" style={{ flexShrink: 0, marginTop: '3px' }} /> {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-dim" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem' }}>
            When you own the firmware, the runtime, the governance engine, and the operations platform — you own the full stack from silicon to organism.
          </p>
        </div>
      </section>

      {/* Why Deterministic */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Why Deterministic Matters for Auction</h2>
          <div className="panel" style={{ padding: '2rem' }}>
            <table className="data-table">
              <thead><tr><th>AI-Based Systems</th><th>Lume Deterministic Runtime</th></tr></thead>
              <tbody>
                <tr><td>Probabilistic outputs vary per run</td><td style={{ color: 'var(--accent-emerald)' }}>Same inputs → same outputs, always</td></tr>
                <tr><td>Hallucination risk in edge cases</td><td style={{ color: 'var(--accent-emerald)' }}>No inference, no hallucination surface</td></tr>
                <tr><td>Audit trail: "the model decided"</td><td style={{ color: 'var(--accent-emerald)' }}>Audit trail: sensor → decision chain</td></tr>
                <tr><td>Requires retraining as data shifts</td><td style={{ color: 'var(--accent-emerald)' }}>Self-healing: detects & corrects own drift</td></tr>
                <tr><td>Black box scoring</td><td style={{ color: 'var(--accent-emerald)' }}>Every score → specific input + timestamp</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-dim" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
            When a $2,500 arbitration dispute hinges on a condition report, "the AI thought" is not an acceptable answer.
          </p>
        </div>
      </section>

      {/* Production Deployment */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="text-emerald" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Production Ready</p>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Deployment Strategy</h2>
            <p className="text-muted">Standard integration path for multi-lane facilities</p>
          </div>

          <div className="panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>Deployment Schedule</h3>
            <table className="data-table">
              <thead><tr><th>Week</th><th>Activity</th></tr></thead>
              <tbody>
                <tr><td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Week 1</td><td>Lume-Auto at intake stations. Condition reports alongside existing process.</td></tr>
                <tr><td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Week 2</td><td>Lume Ops Recon deployed to 5–10 drivers. Parallel with existing systems.</td></tr>
                <tr><td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Week 3</td><td>Integration: health data feeds routing decisions. Unified dashboard live.</td></tr>
                <tr><td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Week 4</td><td>Full data collection. ROI report preparation. Enterprise discussion.</td></tr>
              </tbody>
            </table>
          </div>

          <div className="panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>Success Metrics</h3>
            <table className="data-table">
              <thead><tr><th>Metric</th><th>Target</th></tr></thead>
              <tbody>
                <tr><td>Condition report automation rate</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>≥50%</td></tr>
                <tr><td>Arbitration events traceable to scan</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>≥70%</td></tr>
                <tr><td>Inspector hours freed per day</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>62.5 hrs</td></tr>
                <tr><td>Driver MPH improvement</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>≥15%</td></tr>
                <tr><td>Dashboard daily active use</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>By week 2</td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
              Zero infrastructure investment. Standard hardware. Deployable in 30 days.
            </p>
            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
              The system is built. The architecture is documented. Everything above is production-ready and verifiable.
            </p>
            <p className="text-dim" style={{ fontSize: '0.8rem', marginTop: '1.5rem' }}>DarkWave Studios LLC / Lume42 Labs · 6 U.S. Provisional Patents Pending</p>
          </div>
        </div>
      </section>
    </div>
  );
}
