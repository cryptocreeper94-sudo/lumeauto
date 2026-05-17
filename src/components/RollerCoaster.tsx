import { useEffect, useRef, useState } from 'react';

/**
 * RollerCoaster Easter Egg
 * Trigger: Type "coaster" anywhere on the site, or press ↑↑↓↓←→←→
 * A full-screen canvas roller coaster ride with a first-person POV.
 */
export default function RollerCoaster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Listen for "coaster" typed or konami code
  useEffect(() => {
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
    let konamiIdx = 0;

    const handler = (e: KeyboardEvent) => {
      // Konami code
      if (e.key === konami[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konami.length) { setActive(true); konamiIdx = 0; }
      } else { konamiIdx = 0; }

      // "coaster" typed
      if (e.key.length === 1) {
        bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-7);
        if (bufferRef.current === 'coaster') setActive(true);
      }

      // Escape to close
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // The ride
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);

    // Track generation — a parametric roller coaster
    const trackPoints: { x: number; y: number; z: number }[] = [];
    const numPoints = 800;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 8;
      trackPoints.push({
        x: Math.sin(t) * 300 + Math.sin(t * 0.7) * 150 + Math.cos(t * 0.3) * 100,
        y: -Math.sin(t * 0.5) * 200 - Math.cos(t * 1.3) * 80 - 50 + Math.sin(t * 0.2) * 120,
        z: i * 8 + Math.cos(t) * 40,
      });
    }

    // Stars
    const stars: { x: number; y: number; s: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * 2000 - 1000,
        y: Math.random() * 2000 - 1000,
        s: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.4;

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#0a0a1a');
      sky.addColorStop(0.4, '#0d1b2a');
      sky.addColorStop(1, '#1b2838');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach(s => {
        const twinkle = 0.5 + Math.sin(timeRef.current * 0.05 + s.x) * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.8})`;
        ctx.beginPath();
        ctx.arc(((s.x + w / 2) % w + w) % w, ((s.y + h / 2) % h + h) % h, s.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Camera position on track
      const camPos = timeRef.current % numPoints;
      const camIdx = Math.floor(camPos);
      const fov = 400;

      // Project track points relative to camera
      const projected: { sx: number; sy: number; z: number; behind: boolean }[] = [];
      for (let i = 0; i < numPoints; i++) {
        const p = trackPoints[i];
        const cam = trackPoints[camIdx % numPoints];
        const nextCam = trackPoints[(camIdx + 1) % numPoints];

        // Camera direction
        const dx = nextCam.x - cam.x;
        const dy = nextCam.y - cam.y;
        const dz = nextCam.z - cam.z;
        // direction vector length (used for normalization if needed)
        void(Math.sqrt(dx * dx + dy * dy + dz * dz) || 1);

        // Relative position
        let rx = p.x - cam.x;
        let ry = p.y - cam.y;
        let rz = p.z - cam.z;

        // Handle wrapping
        if (rz < -numPoints * 4) rz += numPoints * 8;
        if (rz > numPoints * 4) rz -= numPoints * 8;

        // Simple rotation to face forward
        const angle = Math.atan2(dx, dz);
        const cosA = Math.cos(-angle);
        const sinA = Math.sin(-angle);
        const rx2 = rx * cosA - rz * sinA;
        const rz2 = rx * sinA + rz * cosA;

        const behind = rz2 < 1;
        const scale = behind ? 0 : fov / (rz2 + 1);
        projected.push({
          sx: w / 2 + rx2 * scale,
          sy: h / 2 + (ry - cam.y * 0.3) * scale,
          z: rz2,
          behind,
        });
      }

      // Draw track rails
      ctx.lineWidth = 2;
      for (let offset = -1; offset <= 1; offset += 2) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < numPoints; i++) {
          const p = projected[i];
          if (p.behind || p.z > 2000) continue;
          const railOffset = offset * Math.max(2, 40 * (fov / (p.z + fov)));
          const px = p.sx + railOffset;
          const py = p.sy;

          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        }
        const alpha = 0.8;
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.stroke();
      }

      // Draw crossties
      for (let i = 0; i < numPoints; i += 4) {
        const p = projected[i];
        if (p.behind || p.z > 1500) continue;
        const tieWidth = Math.max(2, 50 * (fov / (p.z + fov)));
        ctx.beginPath();
        ctx.moveTo(p.sx - tieWidth, p.sy);
        ctx.lineTo(p.sx + tieWidth, p.sy);
        ctx.strokeStyle = `rgba(56,189,248,${Math.max(0, 0.3 - p.z / 2000)})`;
        ctx.lineWidth = Math.max(1, 3 * (fov / (p.z + fov)));
        ctx.stroke();
      }

      // Support pillars every 30 points
      for (let i = 0; i < numPoints; i += 30) {
        const p = projected[i];
        if (p.behind || p.z > 1000) continue;
        ctx.beginPath();
        ctx.moveTo(p.sx, p.sy);
        ctx.lineTo(p.sx, h);
        ctx.strokeStyle = `rgba(16,185,129,${Math.max(0, 0.15 - p.z / 1500)})`;
        ctx.lineWidth = Math.max(1, 4 * (fov / (p.z + fov)));
        ctx.stroke();
      }

      // HUD
      const speed = 87 + Math.sin(timeRef.current * 0.02) * 15;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(20, h - 80, 200, 60);
      ctx.strokeStyle = 'rgba(56,189,248,0.3)';
      ctx.strokeRect(20, h - 80, 200, 60);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`${speed.toFixed(0)} MPH`, 35, h - 45);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '400 11px "Inter", sans-serif';
      ctx.fillText('LUME COASTER™', 35, h - 30);

      // G-force indicator
      const gForce = 1 + Math.sin(timeRef.current * 0.03) * 1.5;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(w - 150, h - 80, 130, 60);
      ctx.strokeStyle = 'rgba(167,139,250,0.3)';
      ctx.strokeRect(w - 150, h - 80, 130, 60);
      ctx.fillStyle = gForce > 2 ? '#ef4444' : '#a78bfa';
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${gForce.toFixed(1)}G`, w - 35, h - 45);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '400 11px "Inter", sans-serif';
      ctx.fillText('G-FORCE', w - 35, h - 30);

      // Close hint
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = '400 12px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Press ESC to exit the ride', w / 2, 30);

      // Lume branding
      ctx.fillStyle = 'rgba(56,189,248,0.15)';
      ctx.font = '700 14px "Inter", sans-serif';
      ctx.fillText('🎢 DETERMINISTIC THRILLS — NO PROBABILISTIC DROPS', w / 2, 55);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#0a0a1a',
    }} onClick={() => setActive(false)}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
