import { motion } from 'framer-motion';
import { Terminal, Database, Wifi, Lock, Cpu, Layers, GitBranch, Radio, Eye, Fingerprint, FileCode, Gauge } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function TechDeepDive() {
  return (
    <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(56,189,248,0.02) 100%)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Technical Specification</p>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Under the Hood</h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Every subsystem, protocol, and governance layer documented for engineering review.
          </p>
        </div>

        {/* OBD-II Protocol Stack */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', marginBottom: '1.5rem', borderColor: 'rgba(16,185,129,0.2)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={20} color="var(--accent-emerald)" /> OBD-II Protocol Implementation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Protocol Layer</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {['SAE J1979 standard request/response', 'ELM327 AT command set (full)', 'ISO 15765-4 CAN frame parsing', 'Mode 01: Real-time sensor data', 'Mode 03: Confirmed DTCs', 'Mode 09: VIN + calibration IDs'].map((t, i) => (
                  <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1rem', borderLeft: '2px solid rgba(16,185,129,0.2)' }}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Governance Nodes</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {['42 monitored PIDs per scan cycle', '100 Hz polling rate (10ms intervals)', 'Voltage deviation detection: ±0.02V', 'Timing anomaly threshold: 3ms drift', 'Cross-validation: 4-node consensus', 'Catalytic efficiency: bank-paired ΔT'].map((t, i) => (
                  <li key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '1rem', borderLeft: '2px solid rgba(16,185,129,0.2)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Subsystems grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {[
            { icon: <Cpu size={18}/>, title: 'ESP32-S3 Dongle Firmware', items: ['Dual-core Xtensa LX7 @ 240MHz', 'WiFi 802.11 b/g/n + BT Classic + BLE 5.0', 'Passive CAN bus sniffing (MCP2515 + TJA1050)', 'On-device anomaly pre-filter', 'Secure Gateway bypass (Ghost Mode)', 'OTA firmware updates via BLE', '$13 BOM — no legacy ELM327 limitations'], color: 'var(--accent-cyan)' },
            { icon: <Lock size={18}/>, title: 'Trust Layer & Cryptography', items: ['SHA-256 scan fingerprinting', 'Deterministic replay verification', 'Immutable condition certificates', 'Timestamp-locked audit chain', 'Arbitration-grade evidence standard', 'Zero-knowledge proof readiness (Lume native)'], color: '#a78bfa' },
            { icon: <Database size={18}/>, title: 'Data Architecture', items: ['PostgreSQL 15 — ACID compliant', 'Prisma ORM with typed schema', 'Multi-tenant isolation per facility', 'Row-level security policies', '12-hour shift persistence', 'Full audit trail — every move, scan, message'], color: 'var(--accent-emerald)' },
            { icon: <Wifi size={18}/>, title: 'Communication Stack', items: ['WebSocket real-time channels', '2-second polling for messaging', 'Push notification fallback', 'Offline-capable PWA architecture', 'Service worker background sync', 'Supervisor → driver toast system'], color: '#fb923c' },
            { icon: <Eye size={18}/>, title: 'Computer Vision Pipeline', items: ['Camera-based OCR ticket scanning', 'Three input methods (camera / manual / voice)', 'Stock number extraction + validation', 'Group code → lane routing lookup', 'Works offline — no external API', 'Sub-second recognition latency'], color: 'var(--accent-cyan)' },
            { icon: <Radio size={18}/>, title: 'Voice Intelligence', items: ['GPT-5 bidirectional voice engine', '15+ hands-free commands', 'Speech pattern learning per driver', 'Noise cancellation for lot environments', 'Wake word activation', 'Contextual command disambiguation'], color: '#a78bfa' },
            { icon: <Gauge size={18}/>, title: 'Performance Engine', items: ['Moves-per-hour real-time tracking', '4.5 MPH quota monitoring', 'Automated bonus estimation', 'Daily / weekly / monthly aggregation', 'Speed tier alerts: 15 / 17 / 22 MPH', 'GPS accuracy: ±3 meter precision'], color: 'var(--accent-emerald)' },
            { icon: <GitBranch size={18}/>, title: 'Organism Architecture', items: ['4-layer governance topology', '42 nodes per organism instance', 'Cross-validation consensus protocol', 'Self-healing drift correction', 'Deterministic state transitions', 'Formal safety envelope verification'], color: '#fb923c' },
            { icon: <Fingerprint size={18}/>, title: 'Condition Certificate', items: ['Structured JSON output per vehicle', 'DTC severity classification (Critical/Warning/Info)', 'Readiness monitor status mapping', 'Freeze frame data capture', 'Cryptographic hash of full scan state', 'Replay-verifiable to bit-level'], color: 'var(--accent-cyan)' },
          ].map((sys, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.05 }} className="panel" style={{ padding: '1.5rem', borderColor: `${sys.color}18` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ color: sys.color }}>{sys.icon}</div>
                <h4 style={{ fontSize: '0.95rem' }}>{sys.title}</h4>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {sys.items.map((item, j) => (
                  <li key={j} style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '0.75rem', borderLeft: `2px solid ${sys.color}30` }}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* API surface */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', marginTop: '1.5rem', borderColor: 'rgba(56,189,248,0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={18} color="var(--accent-cyan)" /> API Surface & Integration Points
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { method: 'POST', endpoint: '/api/scan/initiate', desc: 'Start OBD-II scan session' },
              { method: 'GET', endpoint: '/api/vehicle/:vin/health', desc: 'Retrieve condition certificate' },
              { method: 'POST', endpoint: '/api/moves/log', desc: 'Record vehicle move event' },
              { method: 'WS', endpoint: '/ws/supervisor', desc: 'Real-time supervisor channel' },
              { method: 'GET', endpoint: '/api/fleet/population', desc: 'Fleet-wide health dashboard' },
              { method: 'POST', endpoint: '/api/scan/replay', desc: 'Deterministic scan replay' },
            ].map((api, i) => (
              <div key={i} style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700,
                    background: api.method === 'POST' ? 'rgba(16,185,129,0.15)' : api.method === 'WS' ? 'rgba(167,139,250,0.15)' : 'rgba(56,189,248,0.15)',
                    color: api.method === 'POST' ? 'var(--accent-emerald)' : api.method === 'WS' ? '#a78bfa' : 'var(--accent-cyan)',
                  }}>{api.method}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-main)' }}>{api.endpoint}</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{api.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
