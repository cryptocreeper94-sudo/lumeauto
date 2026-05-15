import { motion } from 'framer-motion';
import { Activity, FileText, BookOpen } from 'lucide-react';
import LiveScanSimulator from '../LiveScanSimulator';

export default function HeroSection() {
  return (
    <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, rgba(16,185,129,0.1) 0%, var(--bg-dark) 50%)' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(16,185,129,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Activity size={14} style={{ marginRight: 6 }} /> Phase 1 · Deterministic Vehicle Intelligence
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
            The Runtime That Replaces<br/>
            <span className="text-gradient">Guesswork With Certainty.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '720px', marginBottom: '2rem' }}>
            42 OBD-II telemetry nodes. 100 Hz deterministic polling. A synthetic organism that diagnoses vehicles in 45 seconds with zero AI in the critical path. Not a concept — a working system backed by 96 published papers and 6 pending patents.
          </p>

          {/* Credential bar */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {[
              { icon: <FileText size={14}/>, val: '6', label: 'Patents Pending' },
              { icon: <BookOpen size={14}/>, val: '96', label: 'Published Papers' },
              { icon: <Activity size={14}/>, val: '42', label: 'Governance Nodes' },
              { icon: <Activity size={14}/>, val: '100Hz', label: 'Polling Rate' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ padding: '10px 18px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '10px', textAlign: 'center', minWidth: '110px' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>{s.icon}{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Live scan */}
          <div style={{ textAlign: 'left' }}>
            <LiveScanSimulator />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
