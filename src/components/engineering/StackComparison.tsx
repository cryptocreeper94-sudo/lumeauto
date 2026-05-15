import { motion } from 'framer-motion';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function StackComparison() {
  return (
    <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Architecture Comparison</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Two Builds. One Vision.</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
            The current deployment runs on a React + PostgreSQL stack — built to prove the concept with zero risk. Behind it sits a fully native Lume runtime, purpose-built from the compiler up. Here is what changes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', marginBottom: '2.5rem' }}>
          {/* Header */}
          <div style={{ padding: '1rem 1.5rem', background: 'rgba(251,146,60,0.08)', borderBottom: '2px solid rgba(251,146,60,0.3)', fontWeight: 700, fontSize: '0.85rem', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '12px 0 0 0' }}>
            Current · React Build
          </div>
          <div style={{ padding: '1rem 1.5rem', background: 'rgba(56,189,248,0.08)', borderBottom: '2px solid rgba(56,189,248,0.3)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '0 12px 0 0' }}>
            Native · Lume Build
          </div>

          {/* Rows */}
          {[
            { label: 'Runtime', react: 'Node.js / V8 Engine', lume: 'Lume Deterministic Runtime (LDR)' },
            { label: 'Language', react: 'TypeScript / JavaScript', lume: 'Lume — deterministic, compiled' },
            { label: 'Governance', react: 'Application-level logic', lume: 'Compiled governance organisms' },
            { label: 'State', react: 'React useState / useEffect', lume: 'Organism state graph — self-healing' },
            { label: 'Data Layer', react: 'PostgreSQL + Prisma ORM', lume: 'Lume Trust Store — cryptographic' },
            { label: 'Diagnostics', react: 'JS-parsed OBD-II frames', lume: 'Native CAN bus governance' },
            { label: 'Safety', react: 'Application error boundaries', lume: 'Formal safety envelope — provable bounds' },
            { label: 'Replay', react: 'Log-based reconstruction', lume: 'Deterministic replay — bit-identical' },
            { label: 'Deployment', react: 'Render / Vercel / any PaaS', lume: 'Edge-native — runs on-device' },
            { label: 'AI Usage', react: 'GPT-5 for voice + summaries', lume: 'GPT-5 for voice + summaries (unchanged)' },
          ].map((row, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.03 }} style={{ display: 'contents' }}>
              <div style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--border-light)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{row.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{row.react}</div>
              </div>
              <div style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--border-light)', background: i % 2 === 0 ? 'rgba(56,189,248,0.02)' : 'transparent' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{row.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 500 }}>{row.lume}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...f} className="panel" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'rgba(56,189,248,0.2)' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>Key insight:</strong> The React build proves the architecture works in production. The Lume build makes it <em>deterministic at the runtime level</em> — meaning the governance guarantees are no longer application logic. They are compiled into the system itself. The upgrade path is clean because both builds share the same organism topology.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
