import { useState, useEffect, useCallback, Children } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CardCarousel — Responsive card layout
 * Desktop (>768px): standard CSS grid
 * Mobile (≤768px): swipeable single-card carousel with arrows + dots
 */
interface Props {
  children: ReactNode;
  /** CSS grid-template-columns for desktop, e.g. 'repeat(auto-fit, minmax(280px, 1fr))' */
  desktopColumns?: string;
  /** Gap between cards on desktop */
  gap?: string;
  /** Extra styles for the desktop grid wrapper */
  style?: React.CSSProperties;
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlay?: number;
  /** Accent color for active dot */
  accentColor?: string;
}

export default function CardCarousel({
  children,
  desktopColumns = 'repeat(auto-fit, minmax(280px, 1fr))',
  gap = '1.25rem',
  style = {},
  autoPlay = 0,
  accentColor = '#38bdf8',
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const items = Children.toArray(children);
  const count = items.length;

  // Responsive detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isMobile || !autoPlay || autoPlay <= 0 || paused) return;
    const t = setInterval(() => {
      setDirection(1);
      setCurrent(i => (i + 1) % count);
    }, autoPlay);
    return () => clearInterval(t);
  }, [isMobile, autoPlay, count, paused]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(i => (i - 1 + count) % count);
  }, [count]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(i => (i + 1) % count);
  }, [count]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    setTouchStart(null);
  };

  // ═══ DESKTOP: normal grid ═══
  if (!isMobile) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: desktopColumns,
        gap,
        ...style,
      }}>
        {items.map((child, i) => (
          <div key={i} style={{ display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {child}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ═══ MOBILE: carousel ═══
  return (
    <div style={{ ...style }}>
      {/* Card viewport */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '180px',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 60 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {items[current]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation: arrows + dots + counter */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '10px', marginTop: '12px',
      }}>
        <button onClick={prev} aria-label="Previous" style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          <ChevronLeft size={14} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              aria-label={`Card ${i + 1}`}
              style={{
                width: current === i ? '14px' : '6px', height: '6px',
                borderRadius: '3px', border: 'none', cursor: 'pointer',
                background: current === i ? accentColor : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Pause / Play */}
        {autoPlay > 0 && (
          <button onClick={() => setPaused(p => !p)} aria-label={paused ? 'Play' : 'Pause'} style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: paused ? accentColor : 'var(--text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', fontSize: '0.7rem', fontWeight: 700,
          }}>{paused ? '▶' : '⏸'}</button>
        )}

        <button onClick={next} aria-label="Next" style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
