import { motion } from 'framer-motion';
import { Shield, Link2, Eye, Cpu, FileText, BookOpen, Activity } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, rgba(56,189,248,0.08) 0%, var(--bg-dark) 50%)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Shield size={14} style={{ marginRight: 6 }} /> Manheim Vehicle Intelligence Platform
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
            Every Vehicle. Every Transfer.<br/>
            <span className="text-gradient">Every Proof. One Ledger.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '760px', marginBottom: '2rem' }}>
            A private blockchain that seals every custody transfer, condition report, and arbitration event into an immutable record. Deterministic vehicle diagnostics that produce cryptographic proof in 45 seconds. An operations layer built for the scale and security Cox Automotive demands — not a concept, a deployed system.
          </p>

          {/* Credential bar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { icon: <Link2 size={14}/>, val: 'CAL', label: 'Private Ledger', color: '#38bdf8' },
              { icon: <Eye size={14}/>, val: 'Lume-V', label: 'Vision System', color: '#22d3ee' },
              { icon: <Cpu size={14}/>, val: '42', label: 'Governance Nodes', color: 'var(--accent-emerald)' },
              { icon: <FileText size={14}/>, val: '6', label: 'Patents Pending', color: 'var(--accent-emerald)' },
              { icon: <BookOpen size={14}/>, val: '96', label: 'Published Papers', color: 'var(--accent-emerald)' },
              { icon: <Activity size={14}/>, val: '100Hz', label: 'Polling Rate', color: 'var(--accent-emerald)' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ padding: '10px 18px', background: `${s.color}0f`, border: `1px solid ${s.color}26`, borderRadius: '10px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>{s.icon}{s.label}</div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
