import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Zap, Radio, Shield, Cpu, Building2, Activity, ChevronLeft, ChevronRight, Pause, Play, ChevronDown } from 'lucide-react';

const components = [
  {
    icon: <Radio size={24}/>,
    title: 'Anchor Node Transmitter',
    desc: 'Overhead energy transmitter mounted in existing canopy infrastructure. Broadcasts deterministic phased-array energy packets.',
    detail: 'Each anchor node operates as an autonomous energy transmitter embedded in the canopy superstructure. The node uses solid-state phased arrays to achieve nanosecond-level beam steering in the 5.8GHz ISM band. Power delivery is deterministic: same input conditions produce identical output every time. Nodes require no active cooling and operate maintenance-free for 15+ years. A single canopy can support 12–24 anchor nodes.',
    color: '#38bdf8',
  },
  {
    icon: <Zap size={24}/>,
    title: 'Wireless Energy Router',
    desc: 'Deterministic protocol engine that routes radiative energy packets from anchor nodes to vehicle receivers.',
    detail: 'The router governs the radiative microwave power transmission (MPT). Energy is routed through directed beamforming, governed by the organism. Each packet of energy is metered, timestamped, and sealed before delivery. The router handles multi-vehicle simultaneous charging via spatial multiplexing — each vehicle receiver operates on an isolated targeting vector assigned by the organism.',
    color: '#dc2626',
  },
  {
    icon: <Cpu size={24}/>,
    title: 'Vehicle Receiver Plate',
    desc: 'Rectenna (rectifying antenna) array mounted on vehicle roof. Converts radiative microwave energy to DC charging current.',
    detail: 'The receiver plate is a passive rectenna tuned to the anchor node\'s 5.8GHz frequency. No active electronics on the vehicle side — the plate converts electromagnetic microwave energy directly to DC current through rectification. It acts as a universal intake plate, ignoring the underlying OEM battery architecture. Installation is a bolt-on retrofit requiring zero OEM software integration.',
    color: '#38bdf8',
  },
  {
    icon: <Shield size={24}/>,
    title: 'Cryptographic Billing Engine',
    desc: 'On-chain metering and receipt generation using Ed25519 signatures. Every kWh is sealed and publicly verifiable.',
    detail: 'Every energy transfer micro-burst generates a cryptographic receipt anchored to the Cox Automotive Ledger (CAL) via Ed25519 signatures. The receipt contains: kWh delivered, duration, vehicle VIN, anchor node ID, and a SHA-256 hash of the metering data. Billing disputes are resolved by mathematical replay — feed the same inputs, get the same receipt. No human judgment required.',
    color: 'var(--accent-emerald)',
  },
  {
    icon: <Building2 size={24}/>,
    title: 'Canopy Infrastructure',
    desc: 'Structural integration with existing Manheim staging canopies. Zero new construction required.',
    detail: 'Meridian anchor nodes mount directly to existing steel canopy structures at Manheim facilities. No new construction, no trenching, no conduit runs. Electrical feed taps existing panel capacity with a single 240V circuit per node cluster. A facility with 200 staging spots can be fully equipped in a single weekend shutdown. The infrastructure is invisible to daily operations — vehicles park normally.',
    color: '#fb923c',
  },
  {
    icon: <Activity size={24}/>,
    title: 'Governance Organism',
    desc: '42-node runtime governing energy flow, load balancing, and safety interlocks across all active bays.',
    detail: 'The Meridian organism evaluates all 42 governance nodes in a single 10ms cycle. It governs: anchor node power output, receiver plate alignment compensation, thermal management of all active nodes, load balancing across simultaneous charging sessions, and safety interlocks for human proximity. If any safety node triggers, the organism cuts power to the affected bay in under 5ms. The organism runs on-edge — no cloud dependency.',
    color: '#22d3ee',
  },
];

const CARD_MIN_HEIGHT = '220px';

export default function MeridianBreakdown() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const next = useCallback(() => setCurrent(i => (i + 1) % components.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + components.length) % components.length), []);

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
    (current - 1 + components.length) % components.length,
    current,
    (current + 1) % components.length,
  ];

  const renderCard = (comp: typeof components[0], idx: number, isCenter: boolean) => {
    const isExpanded = expanded === idx;
    return (
      <motion.div
        layout
        key={`meridian-card-${idx}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isCenter ? 1 : 0.6, scale: isCenter ? 1 : 0.97 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={() => toggleExpand(idx)}
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${isCenter ? `${comp.color}35` : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '20px',
          padding: '1.75rem',
          cursor: 'pointer',
          minHeight: CARD_MIN_HEIGHT,
          display: 'flex',
          flexDirection: 'column' as const,
          boxShadow: isCenter ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${comp.color}08` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <div style={{ padding: '12px', background: `${comp.color}15`, borderRadius: '14px', display: 'inline-flex', marginBottom: '1rem', color: comp.color, alignSelf: 'flex-start' }}>
          {comp.icon}
        </div>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: isCenter ? comp.color : 'var(--text-main)' }}>{comp.title}</h4>
        <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{comp.desc}</p>

        {/* Expand indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 'auto', paddingTop: '0.75rem',
          color: comp.color, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, opacity: 0.7,
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
                background: `${comp.color}08`,
                borderRadius: '12px',
                border: `1px solid ${comp.color}20`,
              }}>
                <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-main)', margin: 0, opacity: 0.85 }}>
                  {comp.detail}
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
      padding: '4rem 0', position: 'relative', overflow: 'hidden',
    }}>
      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>System Architecture</p>
          <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Component Breakdown</h3>
          <p className="text-muted" style={{ maxWidth: '620px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Six subsystems under unified organism governance. Tap any component to see the full technical specification.
          </p>
        </div>

        {/* Carousel container */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { if (expanded === null) setPaused(false); }}
        >
          {/* Desktop: 3 cards */}
          <div className="meridian-bd-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', minHeight: CARD_MIN_HEIGHT }}>
            <AnimatePresence mode="popLayout">
              {visible.map((idx, pos) => renderCard(components[idx], idx, pos === 1))}
            </AnimatePresence>
          </div>

          {/* Mobile: single card */}
          <div className="meridian-bd-mobile" style={{ display: 'none', minHeight: CARD_MIN_HEIGHT }}>
            <AnimatePresence mode="wait">
              {renderCard(components[current], current, true)}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '12px', marginTop: '1.5rem',
        }}>
          <button onClick={prev} aria-label="Previous" style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <ChevronLeft size={16} />
          </button>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {components.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: current === i ? '20px' : '8px', height: '8px',
                  borderRadius: '4px', border: 'none', cursor: 'pointer',
                  background: current === i ? '#dc2626' : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button onClick={next} aria-label="Next" style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'Resume autoplay' : 'Pause autoplay'}
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: paused ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${paused ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.1)'}`,
              color: paused ? '#dc2626' : 'var(--text-muted)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .meridian-bd-desktop { display: none !important; }
          .meridian-bd-mobile { display: block !important; }
        }
      `}
      </style>
    </section>
  );
}
