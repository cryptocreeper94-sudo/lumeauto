import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedCounter — Counts up from 0 to target value when scrolled into view.
 * Supports integers, decimals, and string suffixes (e.g., "1.4B", "35–56B").
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  color = 'var(--accent-cyan)',
  fontSize = '2rem',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  color?: string;
  fontSize?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const start = Date.now();
    const isDecimal = value % 1 !== 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      if (isDecimal) {
        setDisplay(current.toFixed(1));
      } else {
        setDisplay(Math.floor(current).toLocaleString());
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(isDecimal ? value.toFixed(1) : value.toLocaleString());
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        fontSize,
        fontWeight: 700,
        color,
        fontFamily: 'var(--font-mono)',
      }}
    >
      {prefix}{display}{suffix}
    </motion.div>
  );
}
