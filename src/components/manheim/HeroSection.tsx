import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Link2, Eye, Cpu, FileText, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_IMAGES = [
  '/assets/images/photos/hero_auction.png',
  '/assets/images/photos/hero_diagnostic.png',
  '/assets/images/photos/hero_lotops.png',
  '/assets/images/photos/hero_infrastructure.png',
];

const STATS = [
  { icon: <Shield size={18}/>, val: '45s', label: 'Full Vehicle Scan', color: '#10b981' },
  { icon: <Link2 size={18}/>, val: '100%', label: 'Tamper-Proof Records', color: '#38bdf8' },
  { icon: <Eye size={18}/>, val: '42', label: 'Validator Nodes', color: '#22d3ee' },
  { icon: <Cpu size={18}/>, val: 'OBD-II', label: 'Deep Diagnostics', color: '#f59e0b' },
  { icon: <FileText size={18}/>, val: '10+', label: 'Published Papers', color: '#f472b6' },
  { icon: <Activity size={18}/>, val: 'Real-Time', label: 'Fleet Intelligence', color: '#38bdf8' },
];

export default function HeroSection() {
  const [imgIndex, setImgIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);

  // Background slideshow
  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % HERO_IMAGES.length), 9000);
    return () => clearInterval(t);
  }, []);

  // Stat carousel auto-advance
  useEffect(() => {
    const t = setInterval(() => setStatIndex(i => (i + 1) % STATS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const prevStat = useCallback(() => setStatIndex(i => (i - 1 + STATS.length) % STATS.length), []);
  const nextStat = useCallback(() => setStatIndex(i => (i + 1) % STATS.length), []);

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

      {/* Lightened overlay — lets the photo show through more */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.70) 50%, rgba(10,10,12,0.88) 100%)',
      }} />

      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <Shield size={14} style={{ marginRight: 6 }} /> Cox Enterprise Platform
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
            Enterprise Infrastructure.<br/>
            <span className="text-gradient">Proven at Manheim.</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '760px', marginBottom: '2rem' }}>
            A private operations platform — purpose-built for Cox Enterprises — that delivers verifiable, tamper-proof records of every operational event. The COP operating environment, Cox Automotive Ledger, and Lume-V governance layer are enterprise infrastructure designed to scale across verticals. Manheim is the first deployment: 45-second vehicle scans, deterministic condition reports, and a lot operations system built to replace guesswork with proof.
          </p>

          {/* ═══ STAT CAROUSEL — self-contained ═══ */}
          <style>{`
            .hero-stat-carousel { max-width: 320px; margin-bottom: 2.5rem; }
            @media (max-width: 768px) { .hero-stat-carousel { max-width: 100%; margin-left: auto; margin-right: auto; } }
          `}</style>
          <div className="hero-stat-carousel">
            <div style={{
              position: 'relative',
              background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* Stat display */}
              <div style={{ position: 'relative', height: '90px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={statIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      textAlign: 'center', padding: '0.75rem 1rem',
                    }}
                  >
                    <div style={{
                      fontSize: '1.8rem', fontWeight: 800,
                      color: STATS[statIndex].color,
                      fontFamily: 'var(--font-mono)', lineHeight: 1.2,
                    }}>
                      {STATS[statIndex].val}
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      fontSize: '0.65rem', color: 'var(--text-dim)',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      marginTop: '4px',
                    }}>
                      {STATS[statIndex].icon}
                      {STATS[statIndex].label}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Internal nav — inside the card */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '6px 12px 10px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}>
                <button onClick={prevStat} aria-label="Previous stat" style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <ChevronLeft size={12} />
                </button>

                <div style={{ display: 'flex', gap: '4px' }}>
                  {STATS.map((_, i) => (
                    <button key={i} onClick={() => setStatIndex(i)} aria-label={`Stat ${i + 1}`}
                      style={{
                        width: statIndex === i ? '14px' : '5px', height: '5px',
                        borderRadius: '3px', border: 'none', cursor: 'pointer',
                        background: statIndex === i ? STATS[statIndex].color : 'rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>

                <button onClick={nextStat} aria-label="Next stat" style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
