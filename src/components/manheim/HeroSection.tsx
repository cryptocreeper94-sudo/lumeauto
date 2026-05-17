import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Link2, Eye, Cpu, FileText, BookOpen, Activity } from 'lucide-react';

const HERO_IMAGES = [
  '/assets/images/photos/hero_auction.png',
  '/assets/images/photos/hero_diagnostic.png',
  '/assets/images/photos/hero_lotops.png',
  '/assets/images/photos/hero_infrastructure.png',
];

export default function HeroSection() {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % HERO_IMAGES.length), 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${HERO_IMAGES[imgIndex]})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transformOrigin: 'center center',
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,12,0.75) 0%, rgba(10,10,12,0.85) 50%, rgba(10,10,12,0.95) 100%)',
      }} />

      {/* Subtle grid overlay */}
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
            A private cryptographic ledger that seals every custody transfer, condition report, and arbitration event into an immutable record. Deterministic vehicle diagnostics — powered by self-healing synthetic organisms running on a purpose-built runtime — that produce cryptographic proof in 45 seconds. An operations layer built for the scale and security Cox Automotive demands — not a concept, a deployed system.
          </p>

          {/* Credential bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '3rem', maxWidth: '540px' }}>
            {[
              { icon: <Link2 size={14}/>, val: 'CAL', label: 'Private Ledger', color: '#38bdf8' },
              { icon: <Eye size={14}/>, val: 'Lume-V', label: 'Governance Layer', color: '#22d3ee' },
              { icon: <Cpu size={14}/>, val: '42', label: 'Governance Nodes', color: '#10b981' },
              { icon: <FileText size={14}/>, val: 'Lume', label: 'Native Runtime', color: '#a78bfa' },
              { icon: <BookOpen size={14}/>, val: '10+', label: 'Published Papers', color: '#f59e0b' },
              { icon: <Activity size={14}/>, val: '100Hz', label: 'Polling Rate', color: '#f472b6' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                style={{ padding: '10px 12px', background: `${s.color}0a`, border: `1px solid ${s.color}20`, borderRadius: '10px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)', lineHeight: 1.3 }}>{s.val}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center', marginTop: 2 }}>{s.icon}{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Slide indicators */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {HERO_IMAGES.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} aria-label={`Slide ${i + 1}`}
                style={{
                  width: imgIndex === i ? '20px' : '8px', height: '4px',
                  borderRadius: '2px', border: 'none', cursor: 'pointer',
                  background: imgIndex === i ? '#38bdf8' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.4s ease',
                }}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
