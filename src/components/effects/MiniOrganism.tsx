import { useEffect, useRef } from 'react';

/**
 * MiniOrganism — A small, auto-playing 42-node organism visualization.
 * Designed to sit in the hero section as an ambient visual.
 * No interactivity — pure atmosphere.
 */

const RINGS = [
  { count: 10, radius: 35,  color: '6, 182, 212',   label: 'TB' },  // cyan
  { count: 8,  radius: 65,  color: '16, 185, 129',   label: 'PR' },  // emerald
  { count: 12, radius: 95,  color: '139, 92, 246',    label: 'FS' },  // violet
  { count: 12, radius: 125, color: '251, 146, 60',    label: 'SL' },  // orange
];

export default function MiniOrganism({ size = 280 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    let t = 0;
    let animId: number;

    // Generate node positions
    const nodes: { x: number; y: number; ring: number; idx: number; health: number; phase: number }[] = [];
    RINGS.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 - Math.PI / 2;
        nodes.push({
          x: cx + Math.cos(angle) * ring.radius,
          y: cy + Math.sin(angle) * ring.radius,
          ring: ri,
          idx: i,
          health: 0.7 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    });

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, size, size);

      // Draw ring orbits
      RINGS.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color}, 0.06)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw connections between adjacent rings
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.abs(nodes[i].ring - nodes[j].ring) === 1) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 55) {
              const pulse = Math.sin(t * 2 + nodes[i].phase) * 0.5 + 0.5;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.04 + pulse * 0.06})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const ring = RINGS[node.ring];
        const pulse = Math.sin(t * 1.5 + node.phase) * 0.3 + 0.7;
        const r = 2.5 + pulse * 1;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.color}, ${0.05 * pulse})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ring.color}, ${0.4 + pulse * 0.4})`;
        ctx.fill();
      });

      // Center pulse
      const centerPulse = Math.sin(t) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${0.15 * centerPulse})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${0.6 + centerPulse * 0.3})`;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: size,
        height: size,
        opacity: 0.8,
        filter: 'blur(0.3px)',
      }}
    />
  );
}
