import { motion } from 'framer-motion';
import { Terminal, Database, Wifi, Lock, Cpu, GitBranch, Radio, Eye, Fingerprint, FileCode, Gauge, Wrench, ChevronLeft, ChevronRight, Hexagon, ShieldCheck } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const SUBSYSTEMS = [
  { icon: <Cpu size={18}/>, title: 'ESP32-S3 Dongle Firmware', items: ['Dual-core Xtensa LX7 @ 240MHz', 'WiFi 802.11 b/g/n + BT Classic + BLE 5.0', 'Passive CAN bus sniffing (MCP2515 + TJA1050)', 'On-device anomaly pre-filter', 'Secure Gateway bypass (Ghost Mode)', 'OTA firmware updates via BLE', '$13 BOM — no legacy ELM327 limitations'], color: 'var(--accent-cyan)' },
  { icon: <Lock size={18}/>, title: 'Enterprise Trust Chain (CAL)', items: ['Proof-of-Authority cryptographic ledger', 'Deterministic consensus — no mining, no gas fees', 'Each facility operates as a validator node', 'Condition certificates anchored immutably on-ledger', 'Cryptographic replay verification for arbitration', 'Purpose-built for closed-loop enterprise networks'], color: '#a78bfa' },
  { icon: <Database size={18}/>, title: 'Data Architecture', items: ['PostgreSQL 15 — ACID compliant', 'Prisma ORM with typed schema', 'Multi-tenant isolation per facility', 'Row-level security policies', '12-hour shift persistence', 'Full audit trail — every move, scan, message'], color: 'var(--accent-emerald)' },
  { icon: <Wifi size={18}/>, title: 'Communication Stack', items: ['WebSocket real-time channels', '2-second polling for messaging', 'Push notification fallback', 'Offline-capable PWA architecture', 'Service worker background sync', 'Supervisor → driver toast system'], color: '#fb923c' },
  { icon: <Eye size={18}/>, title: 'Computer Vision Pipeline', items: ['Camera-based OCR ticket scanning', 'Three input methods (camera / manual / voice)', 'Stock number extraction + validation', 'Group code → lane routing lookup', 'Works offline — no external API', 'Sub-second recognition latency'], color: 'var(--accent-cyan)' },
  { icon: <Radio size={18}/>, title: 'Voice Intelligence (Optional)', items: ['LLM-agnostic bidirectional voice engine', '15+ hands-free commands', 'All output governed by LUME-V wrapper', 'Speech pattern learning per driver', 'Noise cancellation for lot environments', 'Can be disabled per-facility'], color: '#a78bfa' },
  { icon: <Gauge size={18}/>, title: 'Performance Engine', items: ['Moves-per-hour real-time tracking', '4.5 MPH quota monitoring', 'Automated bonus estimation', 'Daily / weekly / monthly aggregation', 'Speed tier alerts: 15 / 17 / 22 MPH', 'GPS accuracy: ±3 meter precision'], color: 'var(--accent-emerald)' },
  { icon: <GitBranch size={18}/>, title: 'LumeScan Architecture', items: ['4-layer governance topology', '42 nodes per mesh instance', 'Cross-validation consensus protocol', 'Self-healing drift correction', 'Deterministic state transitions', 'Formal safety envelope verification'], color: '#fb923c' },
  { icon: <Fingerprint size={18}/>, title: 'Condition Certificate', items: ['Structured JSON output per vehicle', 'DTC severity classification (Critical/Warning/Info)', 'Readiness monitor status mapping', 'Freeze frame data capture', 'Cryptographic hash of full scan state', 'Replay-verifiable to bit-level'], color: 'var(--accent-cyan)' },
  { icon: <Wrench size={18}/>, title: 'Lume-V Verification Wrapper', items: ['Production-ready verification layer', 'Wraps any existing system or API', 'No source code modification required', 'Injects deterministic audit trail', 'Incremental adoption — system by system', 'Published: DOI 10.5281/zenodo.19645097'], color: '#fb923c' },
  { icon: <FileCode size={18}/>, title: 'TrustShield Certification', items: ['AI agent output attestation', 'On-chain verification anchoring', 'Cross-system integrity validation', 'Zero-trust architecture enforcement', 'Deterministic audit trail for every subsystem', 'Enterprise-grade security certification layer'], color: '#a78bfa' },
  { icon: <Terminal size={18}/>, title: 'Deterministic Runtime', items: ['Purpose-built Lume native runtime', 'No garbage collection pauses', 'Formal verification of state transitions', 'Reproducible output on identical input', 'Edge-native — full execution on-device', 'Zero cloud dependency in critical path'], color: 'var(--accent-emerald)' },
  { icon: <ShieldCheck size={18}/>, title: 'Verified Enterprise Trust (VET)', items: ['Public commercial verification ledger', 'Dual-ledger architecture (CAL + VET)', 'Ed25519 cryptographic signatures', 'Isolates DarkWave core IP', 'Proves provenance to buyers/dealers', 'Mathematically verifiable audit trail'], color: 'var(--accent-cyan)' },
  { icon: <Hexagon size={18}/>, title: 'Meridian Energy Protocol', items: ['Radiative microwave power transmission (MPT)', '5.8GHz solid-state phased-array nodes', 'Zero OEM integration required', 'Universal rectenna retrofit bolt-on', 'Packetized energy routing via tokenization', 'Patent Pending: U.S. Prov 64/056,378'], color: '#fb923c' },
];

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

        {/* OBD-II Protocol Stack — compact bento card */}
        <motion.div {...f} className="panel" style={{ padding: '1.75rem', marginBottom: '1.25rem', borderColor: 'rgba(16,185,129,0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={18} color="var(--accent-emerald)" /> OBD-II Protocol Implementation
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Protocol Layer</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {['SAE J1979 standard request/response', 'ELM327 AT command set (full)', 'ISO 15765-4 CAN frame parsing', 'Mode 01: Real-time sensor data', 'Mode 03: Confirmed DTCs', 'Mode 09: VIN + calibration IDs'].map((t, i) => (
                  <li key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(16,185,129,0.2)' }}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Governance Nodes</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {['42 monitored PIDs per scan cycle', '100 Hz polling rate (10ms intervals)', 'Voltage deviation detection: ±0.02V', 'Timing anomaly threshold: 3ms drift', 'Cross-validation: 4-node consensus', 'Catalytic efficiency: bank-paired ΔT'].map((t, i) => (
                  <li key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(16,185,129,0.2)' }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ═══ CONTINUOUS SUBSYSTEMS CAROUSEL ═══ */}
        <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: '0 2rem' }}>
          <style>{`
            .sys-carousel {
              display: flex; gap: 1.25rem; overflow-x: auto; scroll-snap-type: x mandatory;
              padding-bottom: 2rem; scrollbar-width: none;
            }
            .sys-carousel::-webkit-scrollbar { display: none; }
            .sys-carousel > div {
              flex: 0 0 340px; scroll-snap-align: start;
            }
            @media (max-width: 768px) {
              .sys-carousel > div { flex: 0 0 85vw; }
            }
          `}</style>
          
          <div className="sys-carousel">
            {SUBSYSTEMS.map((sys, i) => (
              <div key={i} className="panel" style={{ padding: '1.25rem', minHeight: '260px', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <div style={{ color: sys.color }}>{sys.icon}</div>
                  <h4 style={{ fontSize: '0.9rem', margin: 0, fontWeight: 700 }}>{sys.title}</h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  {sys.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', paddingLeft: '0.6rem', borderLeft: `2px solid ${sys.color}30` }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* API surface — compact 3-column bento */}
        <motion.div {...f} className="panel" style={{ padding: '1.75rem', marginTop: '1.25rem', borderColor: 'rgba(56,189,248,0.2)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={18} color="var(--accent-cyan)" /> API Surface & Integration Points
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[
              { method: 'POST', endpoint: '/api/scan/initiate', desc: 'Start OBD-II scan session' },
              { method: 'GET', endpoint: '/api/vehicle/:vin/health', desc: 'Retrieve condition certificate' },
              { method: 'POST', endpoint: '/api/moves/log', desc: 'Record vehicle move event' },
              { method: 'WS', endpoint: '/ws/supervisor', desc: 'Real-time supervisor channel' },
              { method: 'GET', endpoint: '/api/fleet/population', desc: 'Fleet-wide health dashboard' },
              { method: 'POST', endpoint: '/api/scan/replay', desc: 'Deterministic scan replay' },
            ].map((api, i) => (
              <div key={i} style={{ padding: '0.65rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.55rem', padding: '1px 5px', borderRadius: '3px', fontWeight: 700,
                    background: api.method === 'POST' ? 'rgba(16,185,129,0.15)' : api.method === 'WS' ? 'rgba(167,139,250,0.15)' : 'rgba(56,189,248,0.15)',
                    color: api.method === 'POST' ? 'var(--accent-emerald)' : api.method === 'WS' ? '#a78bfa' : 'var(--accent-cyan)',
                  }}>{api.method}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-main)' }}>{api.endpoint}</span>
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{api.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
