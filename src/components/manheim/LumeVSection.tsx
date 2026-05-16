import { motion } from 'framer-motion';
import { Network, ServerOff, Workflow, ShieldCheck, Database, Anchor, Activity } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LumeVSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Background elements */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Network size={14} style={{ marginRight: 6 }} /> The Modernization Engine
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              LUME-V: <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(to right, #38bdf8, #a78bfa)' }}>Deterministic Governance Wrapper</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
              LUME-V wraps your entire legacy stack in deterministic governance—unifying logic and orchestrating workflows without requiring a multi-million dollar rip-and-replace migration.
            </p>
          </motion.div>
        </div>

        {/* The 25-Year Deadlock */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', background: 'rgba(239, 68, 68, 0.02)', borderColor: 'rgba(239, 68, 68, 0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#f87171' }}>
              <ServerOff size={22} color="#ef4444" /> The Legacy Modernization Challenge
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              {[
                'Too expensive to rebuild',
                'Too risky to replace',
                'Too slow to migrate',
                'Too disruptive to retrain',
                'Too fragmented to unify'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 500 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Two-Column Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(56,189,248,0.15)', background: 'linear-gradient(180deg, rgba(56,189,248,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>What LUME-V Is</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              A deterministic modernization wrapper. It is not a new database, and it is not a replacement platform. It is an intelligent governance layer that:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <Database size={18} />, text: 'Wraps your legacy stack in deterministic governance' },
                { icon: <Workflow size={18} />, text: 'Unifies fragmented logic into a single source of truth' },
                { icon: <ShieldCheck size={18} />, text: 'Modernizes behavior without altering source code' },
                { icon: <Activity size={18} />, text: 'Requires zero downtime and zero database migration' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <div style={{ color: 'var(--accent-cyan)', padding: '6px', background: 'rgba(56,189,248,0.1)', borderRadius: '8px', display: 'flex' }}>
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(167,139,250,0.15)', background: 'linear-gradient(180deg, rgba(167,139,250,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#c4b5fd' }}>What It Enables</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              LUME-V breaks the chains of vendor lock-in, turning monolithic, isolated databases into an interoperable ecosystem ready for:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { text: 'Modern APIs and unified workflows' },
                { text: 'Deterministic logic & cross-system automation' },
                { text: 'Trust Layer & LUME-Auto Integration' },
                { text: 'Future Meridian Integration' },
                { text: 'Modernization without disruption' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '1rem', color: 'var(--text-main)' }}>
                  <div style={{ color: '#c4b5fd', padding: '6px', background: 'rgba(167,139,250,0.1)', borderRadius: '8px', display: 'flex' }}>
                    <Anchor size={18} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Strategic Value */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '3.5rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.01) 100%)', boxShadow: '0 10px 40px rgba(16,185,129,0.05)' }}>
          <h3 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', color: 'var(--accent-emerald)' }}>The Hinge Layer</h3>
          <p className="text-muted" style={{ maxWidth: '850px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.8 }}>
            LUME-V is not a feature. It is the strategic modernization layer that unlocks the entire platform for Manheim. It is the deterministic engine that makes the entire DarkWave ecosystem deployable at scale. It preserves your legacy stack, eliminates vendor lock-in, unifies operations, and positions your infrastructure for the next decade.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
