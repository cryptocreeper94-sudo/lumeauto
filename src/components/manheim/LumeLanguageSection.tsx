import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Code2, Cpu, Shield, Layers, Zap, GitBranch, Mic, ChevronLeft, ChevronRight, Pause, Play, ChevronDown } from 'lucide-react';

const features = [
  {
    icon: <Code2 size={24}/>,
    title: 'Deterministic Compilation',
    desc: 'Lume source compiles to governance organisms — not executables. Same inputs always produce same outputs.',
    detail: 'No randomness, no inference, no hallucination surface. Every compilation is bit-for-bit reproducible. Two developers compiling the same Lume source on different machines will produce identical organisms. This is not an aspirational property — it is enforced by the compiler specification.',
    color: '#a78bfa',
  },
  {
    icon: <Cpu size={24}/>,
    title: 'Synthetic Organisms',
    desc: 'Each organism is a living network of 42 governance nodes that monitor, cross-validate, and self-heal.',
    detail: 'An organism is not a program — it is an autonomous system. Nodes communicate through deterministic message passing. Each node validates the outputs of adjacent nodes. If a node produces an unexpected result, the organism detects the deviation before it propagates. This architecture eliminates single points of failure.',
    color: '#10b981',
  },
  {
    icon: <Shield size={24}/>,
    title: 'Safety Envelope',
    desc: 'Every organism runs inside a formal safety envelope with provable bounds.',
    detail: 'If sensor data violates the envelope, the organism flags — never guesses. Safety envelopes are defined at compile time and cannot be modified at runtime. This means the boundaries of acceptable operation are known before deployment, not discovered after failure. The envelope is not a threshold — it is a mathematical proof.',
    color: '#22d3ee',
  },
  {
    icon: <Layers size={24}/>,
    title: 'The 4/42 Fractal Law',
    desc: '4 layers, 42 nodes per organism. This structural ratio emerges across all deterministic architectures.',
    detail: 'From vehicle diagnostics to energy routing to planetary infrastructure — the 4/42 ratio produces optimal cross-validation density. This is not arbitrary. It is the minimum node count that ensures every signal path has at least three independent verification routes. Below 42, blind spots appear. Above 42, redundancy increases cost without improving accuracy.',
    color: '#fb923c',
  },
  {
    icon: <GitBranch size={24}/>,
    title: 'Self-Healing Runtime',
    desc: 'When a node drifts or fails, the organism detects and corrects the deviation autonomously.',
    detail: 'No retraining. No manual intervention. The system heals itself through deterministic consensus — adjacent nodes compare expected outputs against actual outputs and route around any node that violates its contract. Recovery happens in milliseconds, not minutes. The organism continues operating at reduced capacity while the failed node is restored.',
    color: '#10b981',
  },
  {
    icon: <Zap size={24}/>,
    title: 'Edge-Native Execution',
    desc: 'Organisms run on the device. No cloud dependency. No latency.',
    detail: 'A vehicle diagnosis completes in 45 seconds on a phone connected to a commodity dongle. The entire organism — all 42 nodes — executes locally. No data leaves the device unless explicitly anchored to the ledger. This means the system works in parking structures, rural lots, and anywhere cellular coverage is unreliable.',
    color: '#a78bfa',
  },
  {
    icon: <Mic size={24}/>,
    title: 'Voice-to-Code Authoring',
    desc: 'Speak governance logic, organism definitions, or node behaviors directly into the compiler.',
    detail: 'Lume is designed for natural English voice input. The deterministic compiler processes spoken structure into verifiable organisms. No syntax memorization. No keyboard required. The same spoken instruction produces the same compiled organism every time. This is not an AI code assistant — it is a voice-native compiler interface built into the language specification.',
    color: '#22d3ee',
  },
];

/* Fixed-height card height — all cards same size, no layout jump */
const CARD_MIN_HEIGHT = '220px';

export default function LumeLanguageSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const next = useCallback(() => setCurrent(i => (i + 1) % features.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + features.length) % features.length), []);

  useEffect(() => {
    if (paused || expanded !== null) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, expanded, next]);

  const toggleExpand = (idx: number) => {
    if (expanded === idx) {
      setExpanded(null);
    } else {
      setExpanded(idx);
      setPaused(true);
    }
  };

  // Get visible cards for desktop (3-up)
  const visible = [
    (current - 1 + features.length) % features.length,
    current,
    (current + 1) % features.length,
  ];

  const renderCard = (feat: typeof features[0], idx: number, isCenter: boolean) => {
    const isExpanded = expanded === idx;
    return (
      <motion.div
        layout
        key={`card-${idx}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isCenter ? 1 : 0.6, scale: isCenter ? 1 : 0.97 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={() => toggleExpand(idx)}
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${isCenter ? `${feat.color}35` : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px',
          padding: '1.75rem',
          cursor: 'pointer',
          minHeight: CARD_MIN_HEIGHT,
          display: 'flex',
          flexDirection: 'column' as const,
          boxShadow: isCenter ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${feat.color}08` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{ padding: '12px', background: `${feat.color}15`, borderRadius: '14px', display: 'inline-flex', marginBottom: '1rem', color: feat.color, alignSelf: 'flex-start' }}>
          {feat.icon}
        </div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: isCenter ? feat.color : 'var(--text-main)' }}>{feat.title}</h4>
        <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>

        {/* Expand indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 'auto', paddingTop: '0.75rem',
          color: feat.color, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, opacity: 0.7,
          gap: '4px',
        }}>
          {isExpanded ? 'Collapse' : 'Tap to expand'}
          <ChevronDown size={12} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '1rem',
                background: `${feat.color}08`,
                borderRadius: '12px',
                border: `1px solid ${feat.color}20`,
              }}>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-main)', margin: 0, opacity: 0.85 }}>
                  {feat.detail}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section style={{
      padding: '5rem 0', position: 'relative', overflow: 'hidden',
      borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)',
    }}>
      {/* Background */}
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

        {/* Carousel container — NO position:relative on this, arrows go below */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { if (expanded === null) setPaused(false); }}
        >
          {/* Desktop: 3 cards */}
          <div className="lume-carousel-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', minHeight: CARD_MIN_HEIGHT }}>
            <AnimatePresence mode="popLayout">
              {visible.map((idx, pos) => renderCard(features[idx], idx, pos === 1))}
            </AnimatePresence>
          </div>

          {/* Mobile: single card */}
          <div className="lume-carousel-mobile" style={{ display: 'none', minHeight: CARD_MIN_HEIGHT }}>
            <AnimatePresence mode="wait">
              {renderCard(features[current], current, true)}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls BELOW carousel: arrows + dots + pause */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px', marginTop: '1.5rem', marginBottom: '3rem',
        }}>
          {/* Prev arrow */}
          <button onClick={prev} aria-label="Previous" style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {features.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: current === i ? '20px' : '8px', height: '8px',
                  borderRadius: '4px', border: 'none', cursor: 'pointer',
                  background: current === i ? '#a78bfa' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button onClick={next} aria-label="Next" style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.15)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <ChevronRight size={16} />
          </button>

          {/* Pause/Play */}
          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: paused ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${paused ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.1)'}`,
              color: paused ? '#a78bfa' : 'var(--text-muted)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>

        {/* Voice-to-Code callout */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            background: 'rgba(56,189,248,0.03)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px',
            padding: '2rem', textAlign: 'center',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Mic size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', margin: 0 }}>Write Code by Speaking</h4>
          </div>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Lume's syntax is designed to mirror natural English structure. Define an organism, declare a governance node, set a safety envelope — all by voice. The compiler doesn't interpret intent; it parses deterministic structure from spoken input. No ambiguity. No inference. The same spoken instruction produces the same compiled organism every time.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            {['"Define organism: vehicle intake"', '"Add node: catalyst efficiency"', '"Set safety envelope: 85 to 100"', '"Compile and deploy"'].map((cmd, i) => (
              <div key={i} style={{ padding: '6px 14px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
                {cmd}
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .lume-carousel-desktop { display: none !important; }
          .lume-carousel-mobile { display: block !important; }
        }
      `}
      </style>
    </section>
  );
}
