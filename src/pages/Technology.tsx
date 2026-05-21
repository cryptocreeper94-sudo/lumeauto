import { motion } from 'framer-motion';
import { Activity, Zap, Droplets, ShieldCheck, ArrowRight, Gauge, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRIMITIVES = [
  {
    id: 'tb',
    name: 'Throughput Base',
    tagline: '"What\'s flowing in and out right now."',
    icon: <Activity size={28} />,
    color: 'var(--accent-cyan)',
    bg: 'rgba(6,182,212,0.06)',
    border: 'rgba(6,182,212,0.15)',
    count: 10,
    desc: 'Air, fuel, heat, exhaust — the raw materials your engine consumes and produces every second. These 10 signals track intake volume, fuel delivery, throttle response, and atmospheric conditions.',
    signals: [
      { id: 'TB1', name: 'Mass Air Flow', unit: 'g/s' },
      { id: 'TB2', name: 'Fuel Flow Rate', unit: 'cc/min' },
      { id: 'TB3', name: 'Manifold Pressure', unit: 'kPa' },
      { id: 'TB4', name: 'Intake Air Temp', unit: '°C' },
      { id: 'TB5', name: 'Throttle Position', unit: '%' },
      { id: 'TB6', name: 'Engine RPM', unit: 'rpm' },
      { id: 'TB7', name: 'Vehicle Speed', unit: 'km/h' },
      { id: 'TB8', name: 'Volumetric Eff.', unit: '%' },
      { id: 'TB9', name: 'Air-Fuel Ratio', unit: ':1' },
      { id: 'TB10', name: 'Barometric Pressure', unit: 'kPa' },
    ],
  },
  {
    id: 'pr',
    name: 'Process Rate',
    tagline: '"How efficiently is it being converted to work."',
    icon: <Zap size={28} />,
    color: 'var(--accent-emerald)',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.15)',
    count: 8,
    desc: 'Combustion timing, fuel trim corrections, engine load — 8 signals measuring whether your engine is burning fuel efficiently or wasting it.',
    signals: [
      { id: 'PR1', name: 'Ignition Timing', unit: '° BTDC' },
      { id: 'PR2', name: 'STFT Bank 1', unit: '%' },
      { id: 'PR3', name: 'LTFT Bank 1', unit: '%' },
      { id: 'PR4', name: 'STFT Bank 2', unit: '%' },
      { id: 'PR5', name: 'LTFT Bank 2', unit: '%' },
      { id: 'PR6', name: 'Combustion Eff.', unit: '%' },
      { id: 'PR7', name: 'Calculated Load', unit: '%' },
      { id: 'PR8', name: 'Absolute Load', unit: '%' },
    ],
  },
  {
    id: 'fs',
    name: 'Flow State',
    tagline: '"What\'s the real-time state right now."',
    icon: <Droplets size={28} />,
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.06)',
    border: 'rgba(56,189,248,0.15)',
    count: 5,
    desc: 'Oxygen sensors, catalyst health, driver behavior scoring — 5 signals that put the numbers in context. Are you cruising efficiently or hammering the throttle?',
    signals: [
      { id: 'FS1', name: 'O2 Upstream B1', unit: 'V' },
      { id: 'FS2', name: 'O2 Downstream B1', unit: 'V' },
      { id: 'FS5', name: 'Catalyst Temp B1', unit: '°C' },
      { id: 'FS7', name: 'Catalyst Efficiency', unit: '%' },
      { id: 'FS10', name: 'Driver Score', unit: '/100' },
    ],
  },
  {
    id: 'sl',
    name: 'System Lifecycle',
    tagline: '"How long will things last."',
    icon: <ShieldCheck size={28} />,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.15)',
    count: 6,
    desc: 'Coolant, battery, check engine status, component degradation — 6 signals predicting what\'s about to fail before your dashboard warns you.',
    signals: [
      { id: 'SL1', name: 'Coolant Temp', unit: '°C' },
      { id: 'SL3', name: 'Battery Voltage', unit: 'V' },
      { id: 'SL4', name: 'Engine Runtime', unit: 's' },
      { id: 'SL7', name: 'MIL Status', unit: 'on/off' },
      { id: 'SL8', name: 'DTC Count', unit: 'codes' },
      { id: 'SL11', name: 'Degradation Index', unit: '%' },
    ],
  },
];

export default function Technology() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(165deg, rgba(6,182,212,0.06) 0%, var(--bg-dark) 40%, rgba(16,185,129,0.04) 100%)',
        borderBottom: '1px solid var(--border-light)', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.12, pointerEvents: 'none' }}>
          <img src="/architecture-4-42.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', top: '30%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '700px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              <Cpu size={14} /> Technical Architecture
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
              The <span className="text-gradient">4/42 Architecture</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Your engine is a system of flows. We organized every readable signal into 4 groups that match how engines actually work. That's 42 data points, read 10 times per second. It's the difference between a thermometer and a full physical.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              4 primitives × 10+ signals = 42 governance nodes · 100ms polling · Zero AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why 42? */}
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Why 42 Signals?</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Because your engine tells a story in four chapters.</h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>Most scanners read a handful of numbers and call it a day. We asked: what if you treated every engine like four interconnected systems, each one telling part of the story?</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {PRIMITIVES.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="panel"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))' }}>
                {/* Left: description */}
                <div style={{ padding: '2rem', borderRight: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '12px', background: p.bg, borderRadius: '14px', color: p.color }}>{p.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '2px' }}>{p.name}</h3>
                      <span style={{ fontSize: '0.8rem', color: p.color, fontWeight: 600 }}>{p.count} signals</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', color: p.color, fontWeight: 600, fontStyle: 'italic', marginBottom: '1rem' }}>{p.tagline}</p>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
                {/* Right: signal list */}
                <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Signal Manifest</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {p.signals.map((s) => (
                      <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: p.color, minWidth: '36px' }}>{s.id}</span>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{s.name}</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>{s.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture summary */}
      <section style={{ background: 'rgba(255,255,255,0.01)', padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <Gauge size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Deterministic. Not Probabilistic.</h2>
          <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Every reading is computed from raw OBD-II data using fixed mathematical relationships — no machine learning, no cloud inference, no hallucinations. Same inputs, same outputs, every time. Fully auditable. Fully reproducible.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            {[
              { val: '42', label: 'Governance Nodes' },
              { val: '100ms', label: 'Scan Interval' },
              { val: '0', label: 'AI Dependencies' },
              { val: '2,358', label: 'Test Cases Passed' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="panel" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{s.val}</div>
                <div className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>See it in action.</h2>
          <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
            The 42-signal engine is live in the Lume Scan app. Download free, or upgrade to Pro for the full governance stack.
          </p>
          <div className="flex gap-4 items-center" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/order" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))', color: '#000', fontWeight: 800, border: 'none', borderRadius: '14px' }}>
              Get Lume Scan <ArrowRight size={18} />
            </Link>
            <Link to="/engineering" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Engineering Brief <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
