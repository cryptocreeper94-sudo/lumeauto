import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Code2, Cpu, Shield, Layers, Zap, GitBranch, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  { icon: <Code2 size={24}/>, title: 'Deterministic Compilation', desc: 'Lume source compiles to governance organisms — not executables. Same inputs always produce same outputs. No randomness, no inference, no hallucination surface.', color: '#a78bfa' },
  { icon: <Cpu size={24}/>, title: 'Synthetic Organisms', desc: 'Each organism is a living network of 42 governance nodes. Nodes monitor, cross-validate, and self-heal in real-time. An organism is not a program — it is an autonomous system.', color: 'var(--accent-emerald)' },
  { icon: <Shield size={24}/>, title: 'Safety Envelope', desc: 'Every organism runs inside a formal safety envelope. Provable bounds. If sensor data violates the envelope, the organism flags — never guesses.', color: 'var(--accent-cyan)' },
  { icon: <Layers size={24}/>, title: 'The 4/42 Fractal Law', desc: '4 layers, 42 nodes per organism. This structural ratio emerges naturally across all deterministic cognitive architectures — from vehicle diagnostics to energy routing to planetary infrastructure.', color: '#fb923c' },
  { icon: <GitBranch size={24}/>, title: 'Self-Healing Runtime', desc: 'When a node drifts or fails, the organism detects the deviation and corrects it autonomously. No retraining. No manual intervention. The system heals itself.', color: 'var(--accent-emerald)' },
  { icon: <Zap size={24}/>, title: 'Edge-Native Execution', desc: 'Organisms run on the device. No cloud dependency. No latency. A vehicle diagnosis completes in 45 seconds on a phone connected to a commodity dongle.', color: '#a78bfa' },
  { icon: <Wrench size={24}/>, title: 'Lume-V: Deterministic Wrapper', desc: 'Already deployed across multiple sites. Wraps existing systems — legacy software, third-party tools, current inspection platforms — and makes their outputs deterministically verifiable. No rip-and-replace.', color: 'var(--accent-cyan)' },
];

const glassCard = {
  background: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '20px',
  padding: '2rem',
  transition: 'all 0.4s ease',
  height: '100%',
  display: 'flex' as const,
  flexDirection: 'column' as const,
};

export default function LumeLanguageSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % features.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + features.length) % features.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  // Get visible cards (3 on desktop, 1 on mobile — handled via CSS)
  const getVisibleIndices = () => {
    return [
      (current - 1 + features.length) % features.length,
      current,
      (current + 1) % features.length,
    ];
  };
  const visible = getVisibleIndices();

  return (
    <section style={{
      padding: '5rem 0', position: 'relative', overflow: 'hidden',
      borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/images/lume_bg.png)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.15,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--bg-dark) 0%, transparent 20%, transparent 80%, var(--bg-dark) 100%)' }} />

      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Foundation</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lume Is a Language.</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Not a library. Not a framework. Not an API wrapper. Lume is a deterministic programming language and runtime that compiles governance logic into synthetic organisms — self-healing systems that monitor, diagnose, and act without probabilistic inference.
          </p>
        </div>

        {/* Carousel */}
        <div
          style={{ position: 'relative', marginBottom: '3rem' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Desktop: 3 cards */}
          <div className="lume-carousel-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <AnimatePresence mode="popLayout">
              {visible.map((idx, pos) => {
                const feat = features[idx];
                const isCenter = pos === 1;
                return (
                  <motion.div
                    key={`${idx}-${pos}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isCenter ? 1 : 0.6, scale: isCenter ? 1.02 : 0.97 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      ...glassCard,
                      borderColor: isCenter ? `${feat.color}35` : 'rgba(255,255,255,0.06)',
                      boxShadow: isCenter ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${feat.color}08` : 'none',
                    }}
                  >
                    <div style={{ padding: '12px', background: `${feat.color}15`, borderRadius: '14px', display: 'inline-flex', marginBottom: '1rem', color: feat.color }}>
                      {feat.icon}
                    </div>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: isCenter ? feat.color : 'var(--text-main)' }}>{feat.title}</h4>
                    <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.65, flex: 1 }}>{feat.desc}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile: single card */}
          <div className="lume-carousel-mobile" style={{ display: 'none' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                style={{ ...glassCard, borderColor: `${features[current].color}30` }}
              >
                <div style={{ padding: '12px', background: `${features[current].color}15`, borderRadius: '14px', display: 'inline-flex', marginBottom: '1rem', color: features[current].color }}>
                  {features[current].icon}
                </div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.6rem', color: features[current].color }}>{features[current].title}</h4>
                <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.65 }}>{features[current].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav arrows */}
          <button onClick={prev} aria-label="Previous" style={{
            position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} aria-label="Next" style={{
            position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '3rem' }}>
          {features.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
              style={{
                width: current === i ? '24px' : '8px', height: '8px',
                borderRadius: '4px', border: 'none', cursor: 'pointer',
                background: current === i ? '#a78bfa' : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Native build callout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ ...glassCard, padding: '2rem', borderColor: 'rgba(167,139,250,0.2)', textAlign: 'center', background: 'rgba(167,139,250,0.03)', backdropFilter: 'blur(20px)' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#c4b5fd' }}>A Full Native Lume Build Is Waiting in the Wings</h4>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
            The current deployment runs on React and commodity hardware to prove the architecture with zero risk. Behind it sits a fully native Lume runtime — purpose-built from the compiler up — ready for production deployment. The React layer is the proof. The native layer is the product.
          </p>
        </motion.div>

        {/* Lume-V callout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ ...glassCard, padding: '2rem', marginTop: '1.25rem', borderColor: 'rgba(56,189,248,0.2)', background: 'rgba(56,189,248,0.03)', backdropFilter: 'blur(20px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--accent-cyan)' }}>Lume-V: Already Deployed. Zero Migration Risk.</h4>
            <p className="text-muted" style={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
              Lume-V is live and wrapping existing systems across multiple deployments today. Auction platforms, inspection tools, inventory management — their outputs become deterministically verifiable without modifying a single line of their source code.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Wraps any existing API or data pipeline', 'No source code access required', 'Cryptographic output verification', 'Audit trail injected at the wrapper level', 'Incremental adoption — system by system'].map((item, i) => (
              <div key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(56,189,248,0.3)' }}>{item}</div>
            ))}
            <a href="https://doi.org/10.5281/zenodo.19645097" target="_blank" rel="noopener" style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', opacity: 0.7, marginTop: '0.25rem' }}>
              DOI: 10.5281/zenodo.19645097 ↗
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lume-carousel-desktop { display: none !important; }
          .lume-carousel-mobile { display: block !important; }
        }
      `}</style>
    </section>
  );
}
