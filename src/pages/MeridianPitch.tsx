import { motion } from 'framer-motion';
import { Zap, MapPin, ShieldCheck, BatteryCharging, AlertTriangle, Activity, Cpu, Radio } from 'lucide-react';
import { Suspense } from 'react';
import ManheimTabs from '../components/ManheimTabs';
import MeridianScene3D from '../components/MeridianVisualizer';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

/* ═══ COLOR PALETTE ═══ */
const red     = '#dc2626';
const redDim  = 'rgba(220,38,38,0.10)';
const navyDim = 'rgba(30,58,95,0.20)';
const emerald = '#10b981';
const cyan    = '#38bdf8';

export default function MeridianPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />

      {/* ═══ HERO ═══ */}
      <section style={{
        padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden',
        background: `linear-gradient(165deg, ${navyDim} 0%, var(--bg-dark) 50%)`,
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `linear-gradient(rgba(30,58,95,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: redDim, border: `1px solid rgba(220,38,38,0.25)`, borderRadius: '20px', fontSize: '0.75rem', color: red, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Radio size={14} style={{ marginRight: 6 }} /> Phase 2 · Wireless Energy Infrastructure
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
              Deterministic Wireless Energy<br />
              <span style={{ background: `linear-gradient(135deg, ${red}, ${cyan}, ${emerald})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Built for Scale.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px', marginBottom: '2rem' }}>
              No ground stations. No broken adapters. No physical bottlenecks. Route energy to EVs deterministically from overhead while maintaining a perfect cryptographic billing ledger.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              {[
                { label: 'Zero Ground Friction', val: '0', color: red },
                { label: 'Adapter Types', val: 'ALL', color: cyan },
                { label: 'Billing Accuracy', val: '100%', color: emerald },
                { label: 'Labor Hours Saved', val: '80%', color: red },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ padding: '12px 20px', background: `${s.color}0F`, border: `1px solid ${s.color}25`, borderRadius: '10px', textAlign: 'center', minWidth: '120px' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Suspense fallback={
              <div style={{ width: '100%', height: '500px', borderRadius: '16px', background: '#04060c', border: `1px solid ${navyDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <Zap size={36} color={red} style={{ marginBottom: 12 }} />
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Loading 3D Scene...</div>
                </div>
              </div>
            }>
              <MeridianScene3D />
            </Suspense>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <p className="text-dim" style={{ fontSize: '0.72rem', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                INTERACTIVE 3D · DRAG TO ROTATE · SCROLL TO ZOOM
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
                Overhead Anchor Nodes route wireless energy to vehicles parked beneath the staging canopy. No ground infrastructure required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="responsive-grid" style={{ alignItems: 'stretch' }}>
            {/* Problem */}
            <motion.div {...fadeUp} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(239,68,68,0.25)', background: 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, transparent 100%)' }}>
              <AlertTriangle size={32} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fca5a5' }}>The Ground Charging Bottleneck</h3>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>
                Every wholesale auction facility running EVs faces the same physics problem. 16–20 electric vehicles competing for a handful of physical charging ports. Cables get damaged. Adapters go missing. Drivers spend 15 minutes hunting for the right connector instead of moving inventory. Ground-mounted bollards consume valuable lot space that should hold vehicles. The labor cost of manually rotating vehicles through charge stations adds up fast — and none of it scales.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                {['Tangled cables & broken connectors', 'Adapter hunting (J1772, NACS, CCS)', 'Ground space consumed by bollards', 'Manual move labor per charge cycle'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div {...fadeUp} className="panel" style={{ padding: '2.5rem', borderColor: `rgba(16,185,129,0.25)`, background: `linear-gradient(135deg, rgba(16,185,129,0.04) 0%, transparent 100%)` }}>
              <Zap size={32} color={emerald} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: emerald }}>The Overhead Solution</h3>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>
                Meridian eliminates the ground entirely. Anchor Nodes mount overhead in existing staging canopies. Vehicles drive under, receive energy wirelessly through a deterministic routing protocol, and drive out. No cables. No adapters. No manual intervention. The charging infrastructure becomes invisible — and infinitely scalable.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                {['Zero ground infrastructure', 'Adapter-agnostic energy routing', 'Automatic vehicle identification', 'Cryptographic billing receipts'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: emerald, flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Comparison image */}
          <motion.div {...fadeUp} style={{ marginTop: '3rem' }}>
            <img src="/assets/images/meridian/ground_vs_overhead.png" alt="Ground vs Overhead Comparison" style={{
              width: '100%', borderRadius: '16px', border: `1px solid ${navyDim}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE ═══ */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: red, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Architecture</p>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Overhead Advantage</h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
              Meridian pulls the entire charging infrastructure off the ground and into existing overhead structures. Anchor Nodes mount in staging canopies and route energy deterministically — no cables, no adapters, no wasted lot space. The protocol is not probabilistic. Every energy packet follows a governance chain with cryptographic billing at every step.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <MapPin size={22} />, title: 'Zero Ground Friction', desc: 'No bollards taking up lot space. Vehicles flow freely through the charging zone without navigating around concrete stations or tangled cords.', color: red },
              { icon: <BatteryCharging size={22} />, title: 'Adapter-Agnostic Routing', desc: 'Tesla, Ford, or Rivian — Meridian routes energy directly to the vehicle receiver. No hunting for the right J1772 or NACS adapter.', color: cyan },
              { icon: <Cpu size={22} />, title: 'Deterministic Protocol', desc: 'Not a probabilistic network. Each energy packet is routed via deterministic governance — same inputs, same outputs, every time.', color: emerald },
              { icon: <ShieldCheck size={22} />, title: 'Cryptographic Ledger', desc: 'Every charge session is cryptographically signed. Immutable receipts for perfect internal accounting and dispute resolution.', color: cyan },
            ].map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="panel" style={{ padding: '2rem', borderColor: `${feat.color}22`, transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}44`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}22`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ padding: '12px', background: `${feat.color}15`, borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem', color: feat.color }}>{feat.icon}</div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{feat.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BILLING FLOW ═══ */}
      <section style={{ padding: '6rem 0', background: `linear-gradient(180deg, var(--bg-dark) 0%, rgba(30,58,95,0.06) 100%)`, borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: cyan, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Cryptographic Billing</p>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Perfect Billing Accuracy</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Every charge session is automatically logged with cryptographic precision. No manual energy logs. No disputed billing hours.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            {/* Timeline line */}
            <div style={{ position: 'absolute', left: '28px', top: '40px', bottom: '40px', width: '2px', background: `linear-gradient(180deg, ${red}, ${emerald}, rgba(16,185,129,0.1))` }} />

            {[
              { step: '1', icon: <Activity size={20} />, title: 'Vehicle Sign-In', desc: 'The moment the vehicle enters the Meridian canopy, nodes identify its unique telemetry signature and log the exact incoming battery percentage.', color: red },
              { step: '2', icon: <Zap size={20} />, title: 'Deterministic Charging', desc: 'Energy is routed from the nearest anchor node to the vehicle receiver plate. The governance protocol optimizes flow rate based on battery chemistry.', color: cyan },
              { step: '3', icon: <ShieldCheck size={20} />, title: 'Cryptographic Receipt', desc: 'When the vehicle drives away, the session ends automatically. A cryptographic receipt captures the exact charge-in and charge-out state. Immutable and perfectly accurate.', color: emerald },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}
                style={{ display: 'flex', gap: '1.5rem', padding: '2rem 0', position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `${item.color}15`, border: `2px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0, zIndex: 1 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: item.color, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Step {item.step}</div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(220,38,38,0.06) 0%, transparent 70%)` }} />
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Engineered. Documented. Ready for the Lot.</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              No ground stations. No adapter hunting. No manual billing. The Meridian architecture eliminates every physical bottleneck in EV fleet charging.
            </p>
            <p style={{ fontSize: '1rem', maxWidth: '550px', margin: '0 auto', color: 'var(--text-main)', fontWeight: 500, lineHeight: 1.6 }}>
              9 published papers. Provisional patent filed. Full deployment architecture documented. This is not a concept — it is an engineering specification ready for implementation.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
