import { useState, useEffect, useCallback, useRef, Children } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * CardCarousel — Horizontal scroll-snap carousel for desktop & mobile
 * Includes prev/next arrow buttons (scrolling by one card width) and
 * centered dot indicators that update on scroll.
 */
interface Props {
  children: ReactNode;
  /** Legacy grid hint (used to size cards appropriately on desktop) */
  desktopColumns?: string;
  /** Gap between cards */
  gap?: string;
  /** Extra styles for the carousel wrapper */
  style?: CSSProperties;
  /** Auto-advance interval in ms (0 = disabled) */
  autoPlay?: number;
  /** Accent color for active dot */
  accentColor?: string;
  /** Light/cream section variant */
  variant?: 'dark' | 'light';
}

export default function CardCarousel({
  children,
  desktopColumns = '',
  gap = '1.25rem',
  style = {},
  autoPlay = 0,
  accentColor = '#38bdf8',
  variant = 'dark',
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const items = Children.toArray(children);
  const count = items.length;
  const isCompactCards = desktopColumns.includes('200px') || desktopColumns.includes('220px');

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const getStepWidth = useCallback((): number => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return 320;
    const firstCard = track.firstElementChild as HTMLElement;
    const computed = window.getComputedStyle(track);
    const gapPx = parseFloat(computed.columnGap || computed.gap || '20') || 20;
    return firstCard.offsetWidth + gapPx;
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    const clamped = ((idx % count) + count) % count;
    const step = getStepWidth();
    track.scrollTo({ left: clamped * step, behavior: 'smooth' });
    setCurrent(clamped);
  }, [count, getStepWidth]);

  const prev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStepWidth();
    if (track.scrollLeft <= 8) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  }, [getStepWidth]);

  const next = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = getStepWidth();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= maxScroll - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  }, [getStepWidth]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || count <= 1) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 4) {
      setCurrent(0);
      return;
    }
    const step = getStepWidth();
    const rawIdx = Math.round(track.scrollLeft / Math.max(1, step));
    if (track.scrollLeft >= maxScroll - 6) {
      setCurrent(count - 1);
    } else {
      setCurrent(Math.max(0, Math.min(count - 1, rawIdx)));
    }
  }, [count, getStepWidth]);

  useEffect(() => {
    if (!autoPlay || autoPlay <= 0 || paused || count <= 1) return;
    const t = setInterval(() => {
      next();
    }, autoPlay);
    return () => clearInterval(t);
  }, [autoPlay, count, paused, next]);

  if (count === 0) return null;

  const desktopCardBasis = isCompactCards
    ? 'clamp(240px, 30%, 320px)'
    : 'clamp(300px, 42%, 440px)';

  const btnBg = variant === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)';
  const btnBorder = variant === 'light' ? '1px solid rgba(15,23,42,0.14)' : '1px solid rgba(255,255,255,0.12)';
  const btnColor = variant === 'light' ? '#0f172a' : 'var(--text-main, #e2e8f0)';
  const dotInactive = variant === 'light' ? 'rgba(15,23,42,0.2)' : 'rgba(255,255,255,0.18)';

  return (
    <div
      style={{ position: 'relative', width: '100%', ...style }}
      onMouseEnter={() => { if (autoPlay > 0) setPaused(true); }}
      onMouseLeave={() => { if (autoPlay > 0) setPaused(false); }}
    >
      <style>{`
        .lume-snap-track::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="lume-snap-track"
        style={{
          display: 'flex',
          gap,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '6px',
        }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            style={{
              flex: isMobile ? '0 0 88%' : `0 0 ${desktopCardBasis}`,
              scrollSnapAlign: 'start',
              display: 'flex',
              minWidth: 0,
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation: prev/next arrows + centered dot indicators */}
      {count > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '18px',
        }}>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous card"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: btnBg,
              border: btnBorder,
              color: btnColor,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {items.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Card ${i + 1}`}
                style={{
                  width: current === i ? '18px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  background: current === i ? accentColor : dotInactive,
                  transition: 'all 0.25s ease',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next card"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: btnBg,
              border: btnBorder,
              color: btnColor,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
