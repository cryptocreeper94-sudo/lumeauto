import { useEffect, useRef, useState } from 'react';

/**
 * RollerCoaster Easter Egg — Enhanced Edition
 * Desktop: Type "coaster" or Konami code (↑↑↓↓←→←→)
 * Mobile: Triple-tap the footer copyright text
 */

const PHRASES = [
  "Recalibrating your governance nodes...",
  "Deterministic stress relief in progress.",
  "Your organism is self-healing. Are you?",
  "Zero AI was harmed in the making of this ride.",
  "Same inputs. Same outputs. Same screams.",
  "This ride is cryptographically signed.",
  "Consensus achieved: you needed a break.",
  "Warning: Non-deterministic fun detected.",
  "Deploying dopamine to 42 governance nodes...",
  "Your condition report: mildly entertained.",
  "This is what happens when engineers get bored.",
  "Arbitration-grade amusement. Tamper-proof fun.",
  "Probabilistic drop incoming. Just kidding — deterministic.",
  "Auditable. Reproducible. Ridiculous.",
  "Please keep hands inside the organism at all times.",
  "If you can read this, you're not working hard enough.",
  "Merkle root of happiness: verified.",
  "Edge-computed thrills. No cloud required.",
  "42 nodes agree: you deserve this.",
  "Firmware update complete. Serotonin levels nominal.",
];

export default function RollerCoaster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const bufferRef = useRef('');
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const phraseIdxRef = useRef(0);
  const phraseTimerRef = useRef(0);

  // Desktop triggers
  useEffect(() => {
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight'];
    let konamiIdx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === konami[konamiIdx]) { konamiIdx++; if (konamiIdx === konami.length) { setActive(true); konamiIdx = 0; } } else { konamiIdx = 0; }
      if (e.key.length === 1) { bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-7); if (bufferRef.current === 'coaster') setActive(true); }
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Mobile trigger
  useEffect(() => {
    (window as any).__launchCoaster = () => setActive(true);
    return () => { delete (window as any).__launchCoaster; };
  }, []);

  useEffect(() => {
    if (active) { phraseIdxRef.current = Math.floor(Math.random() * PHRASES.length); phraseTimerRef.current = 0; timeRef.current = 0; }
  }, [active]);

  // ═══ THE RIDE ═══
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener('resize', resize);

    // Track
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
    const stars: { x: number; y: number; s: number; b: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({ x: Math.random() * 2000 - 1000, y: Math.random() * 1200 - 600, s: Math.random() * 2.5 + 0.3, b: Math.random() });
    }

    // Mountains (layered silhouettes)
    const mountains: { points: number[]; color: string }[] = [];
    for (let layer = 0; layer < 3; layer++) {
      const pts: number[] = [];
      const segments = 30;
      for (let i = 0; i <= segments; i++) {
        const baseH = [0.45, 0.55, 0.65][layer];
        pts.push(baseH + Math.sin(i * 0.5 + layer * 2) * 0.08 + Math.sin(i * 1.3 + layer) * 0.04 + Math.cos(i * 0.3 + layer * 5) * 0.06);
      }
      const alpha = [0.12, 0.08, 0.05][layer];
      mountains.push({ points: pts, color: `rgba(56,189,248,${alpha})` });
    }

    // Speed line particles
    const speedLines: { x: number; y: number; len: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      speedLines.push({
        x: Math.random(), y: Math.random(),
        len: 20 + Math.random() * 60, speed: 2 + Math.random() * 4,
        alpha: 0.05 + Math.random() * 0.1,
      });
    }

    // Trail particles
    const trails: { x: number; y: number; alpha: number; size: number; vx: number; vy: number }[] = [];

    const PHRASE_DURATION = 180;

    const draw = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 0.4;
      phraseTimerRef.current++;
      if (phraseTimerRef.current >= PHRASE_DURATION) { phraseTimerRef.current = 0; phraseIdxRef.current = (phraseIdxRef.current + 1) % PHRASES.length; }

      // ═══ SKY ═══
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#050510');
      sky.addColorStop(0.3, '#0a0f2e');
      sky.addColorStop(0.6, '#0d1b2a');
      sky.addColorStop(1, '#1a2332');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // ═══ AURORA BOREALIS ═══
      for (let i = 0; i < 5; i++) {
        const auroraY = h * 0.15 + i * 15;
        const wave = Math.sin(timeRef.current * 0.008 + i * 0.7) * 40;
        const grad = ctx.createLinearGradient(0, auroraY - 30, 0, auroraY + 30);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(16,185,129,${0.03 + Math.sin(timeRef.current * 0.01 + i) * 0.015})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, auroraY);
        for (let x = 0; x <= w; x += 20) {
          const y = auroraY + Math.sin(x * 0.003 + timeRef.current * 0.01 + i) * 25 + wave;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, auroraY + 60);
        ctx.lineTo(0, auroraY + 60);
        ctx.fill();
      }

      // ═══ MOON ═══
      const moonX = w * 0.82;
      const moonY = h * 0.12;
      const moonR = 35;
      // Glow
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, moonR * 4);
      moonGlow.addColorStop(0, 'rgba(200,220,255,0.08)');
      moonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGlow;
      ctx.beginPath(); ctx.arc(moonX, moonY, moonR * 4, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = 'rgba(200,215,240,0.15)';
      ctx.beginPath(); ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2); ctx.fill();
      // Craters
      ctx.fillStyle = 'rgba(150,170,200,0.08)';
      ctx.beginPath(); ctx.arc(moonX - 8, moonY - 5, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(moonX + 12, moonY + 8, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(moonX - 3, moonY + 12, 6, 0, Math.PI * 2); ctx.fill();

      // ═══ STARS ═══
      stars.forEach(s => {
        const twinkle = 0.4 + Math.sin(timeRef.current * 0.05 + s.b * 100) * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.7})`;
        ctx.beginPath();
        ctx.arc(((s.x + w / 2) % w + w) % w, ((s.y + h * 0.3) % (h * 0.6) + h * 0.6) % (h * 0.6), s.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Shooting star (occasional)
      if (Math.sin(timeRef.current * 0.013) > 0.995) {
        const sx = (timeRef.current * 73) % w;
        const sy = Math.random() * h * 0.3;
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + 80, sy + 30); ctx.stroke();
      }

      // ═══ MOUNTAINS ═══
      mountains.forEach(m => {
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let i = 0; i < m.points.length; i++) {
          ctx.lineTo((i / (m.points.length - 1)) * w, m.points[i] * h);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      });

      // ═══ GROUND GRID ═══
      const horizon = h * 0.65;
      for (let i = 0; i < 20; i++) {
        const depth = i / 20;
        const gy = horizon + (h - horizon) * depth * depth;
        const alpha = 0.03 + depth * 0.04;
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }
      // Vertical ground lines (converging to center)
      for (let i = -8; i <= 8; i++) {
        const spread = i * 120;
        ctx.strokeStyle = 'rgba(56,189,248,0.02)';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(w / 2 + spread * 3, h); ctx.lineTo(w / 2, horizon); ctx.stroke();
      }

      // ═══ SPEED LINES ═══
      const currentSpeed = 87 + Math.sin(timeRef.current * 0.02) * 15;
      speedLines.forEach(sl => {
        sl.y += sl.speed * 0.005;
        if (sl.y > 1) { sl.y = 0; sl.x = Math.random(); }
        const sx = sl.x * w;
        const sy = sl.y * h;
        const intensity = currentSpeed / 100;
        ctx.strokeStyle = `rgba(56,189,248,${sl.alpha * intensity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, sy + sl.len * intensity); ctx.stroke();
      });

      // ═══ 3D TRACK ═══
      const camPos = timeRef.current % numPoints;
      const camIdx = Math.floor(camPos);
      const fov = 400;

      const projected: { sx: number; sy: number; z: number; behind: boolean }[] = [];
      for (let i = 0; i < numPoints; i++) {
        const p = trackPoints[i];
        const cam = trackPoints[camIdx % numPoints];
        const nextCam = trackPoints[(camIdx + 1) % numPoints];
        const dx = nextCam.x - cam.x;
        const dz = nextCam.z - cam.z;
        let rz = p.z - cam.z;
        if (rz < -numPoints * 4) rz += numPoints * 8;
        if (rz > numPoints * 4) rz -= numPoints * 8;
        const angle = Math.atan2(dx, dz);
        const cosA = Math.cos(-angle);
        const sinA = Math.sin(-angle);
        const rx = p.x - cam.x;
        const rx2 = rx * cosA - rz * sinA;
        const rz2 = rx * sinA + rz * cosA;
        const ry = p.y - cam.y;
        const behind = rz2 < 1;
        const scale = behind ? 0 : fov / (rz2 + 1);
        projected.push({ sx: w / 2 + rx2 * scale, sy: h / 2 + (ry - cam.y * 0.3) * scale, z: rz2, behind });
      }

      // Track glow (under rails)
      for (let i = 1; i < numPoints; i++) {
        const p = projected[i];
        const prev = projected[i - 1];
        if (p.behind || prev.behind || p.z > 1200) continue;
        const glowAlpha = Math.max(0, 0.08 - p.z / 2000);
        ctx.strokeStyle = `rgba(56,189,248,${glowAlpha})`;
        ctx.lineWidth = Math.max(4, 80 * (fov / (p.z + fov)));
        ctx.beginPath(); ctx.moveTo(prev.sx, prev.sy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
      }

      // Rails
      ctx.lineWidth = 2;
      for (let offset = -1; offset <= 1; offset += 2) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < numPoints; i++) {
          const p = projected[i];
          if (p.behind || p.z > 2000) continue;
          const railOffset = offset * Math.max(2, 40 * (fov / (p.z + fov)));
          const px = p.sx + railOffset;
          if (!started) { ctx.moveTo(px, p.sy); started = true; } else ctx.lineTo(px, p.sy);
        }
        ctx.strokeStyle = 'rgba(56,189,248,0.85)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Crossties
      for (let i = 0; i < numPoints; i += 4) {
        const p = projected[i];
        if (p.behind || p.z > 1500) continue;
        const tw = Math.max(2, 50 * (fov / (p.z + fov)));
        ctx.beginPath(); ctx.moveTo(p.sx - tw, p.sy); ctx.lineTo(p.sx + tw, p.sy);
        ctx.strokeStyle = `rgba(56,189,248,${Math.max(0, 0.25 - p.z / 2000)})`;
        ctx.lineWidth = Math.max(1, 3 * (fov / (p.z + fov)));
        ctx.stroke();
      }

      // Support pillars with glow
      for (let i = 0; i < numPoints; i += 30) {
        const p = projected[i];
        if (p.behind || p.z > 1000) continue;
        const pillarAlpha = Math.max(0, 0.2 - p.z / 1200);
        const pillarW = Math.max(1, 4 * (fov / (p.z + fov)));
        // Pillar glow
        ctx.strokeStyle = `rgba(16,185,129,${pillarAlpha * 0.3})`;
        ctx.lineWidth = pillarW * 3;
        ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(p.sx, h); ctx.stroke();
        // Pillar core
        ctx.strokeStyle = `rgba(16,185,129,${pillarAlpha})`;
        ctx.lineWidth = pillarW;
        ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(p.sx, h); ctx.stroke();
        // Base glow
        ctx.fillStyle = `rgba(16,185,129,${pillarAlpha * 0.4})`;
        ctx.beginPath(); ctx.arc(p.sx, h, pillarW * 3, 0, Math.PI * 2); ctx.fill();
      }

      // ═══ TRAIL PARTICLES ═══
      if (Math.random() < 0.4) {
        trails.push({
          x: w / 2 + (Math.random() - 0.5) * 30,
          y: h / 2 + (Math.random() - 0.5) * 20,
          alpha: 0.6, size: 1 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 3, vy: -1 - Math.random() * 2,
        });
      }
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.x += t.vx; t.y += t.vy; t.alpha -= 0.012; t.size *= 0.99;
        if (t.alpha <= 0) { trails.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(56,189,248,${t.alpha})`;
        ctx.beginPath(); ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2); ctx.fill();
      }

      // ═══ PHRASE ═══
      const phraseProgress = phraseTimerRef.current / PHRASE_DURATION;
      let phraseAlpha = 1;
      if (phraseProgress < 0.15) phraseAlpha = phraseProgress / 0.15;
      else if (phraseProgress > 0.85) phraseAlpha = (1 - phraseProgress) / 0.15;
      const currentPhrase = PHRASES[phraseIdxRef.current];
      const fontSize = Math.min(w * 0.032, 20);

      // Phrase background pill
      ctx.fillStyle = `rgba(0,0,0,${phraseAlpha * 0.3})`;
      const metrics = ctx.measureText(currentPhrase);
      const pillW = fontSize * 0.6 * currentPhrase.length + 40;
      const pillH = fontSize * 2.2;
      const pillX = w / 2 - pillW / 2;
      const pillY = h * 0.35 - pillH / 2;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 12);
      ctx.fill();
      ctx.strokeStyle = `rgba(56,189,248,${phraseAlpha * 0.15})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      void metrics;

      ctx.fillStyle = `rgba(56,189,248,${phraseAlpha * 0.7})`;
      ctx.font = `600 ${fontSize}px "Inter", sans-serif`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(currentPhrase, w / 2, h * 0.35);

      // ═══ HUD ═══
      // Speed
      const speed = currentSpeed;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath(); ctx.roundRect(16, h - 84, 180, 64, 10); ctx.fill();
      ctx.strokeStyle = 'rgba(56,189,248,0.25)';
      ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(`${speed.toFixed(0)}`, 30, h - 48);
      ctx.fillStyle = 'rgba(56,189,248,0.5)';
      ctx.font = '400 12px "Inter", sans-serif';
      ctx.fillText('MPH', 95, h - 50);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '600 9px "Inter", sans-serif';
      ctx.fillText('LUME COASTER™', 30, h - 30);

      // G-force
      const gForce = 1 + Math.sin(timeRef.current * 0.03) * 1.5;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.beginPath(); ctx.roundRect(w - 146, h - 84, 130, 64, 10); ctx.fill();
      ctx.strokeStyle = `rgba(${gForce > 2 ? '239,68,68' : '167,139,250'},0.25)`;
      ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = gForce > 2 ? '#ef4444' : '#38bdf8';
      ctx.font = '700 28px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${gForce.toFixed(1)}`, w - 45, h - 48);
      ctx.fillStyle = gForce > 2 ? 'rgba(239,68,68,0.5)' : 'rgba(56,189,248,0.5)';
      ctx.font = '400 12px "Inter", sans-serif';
      ctx.fillText('G', w - 28, h - 50);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '600 9px "Inter", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('G-FORCE', w - 30, h - 30);

      // Exit
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.font = '400 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tap anywhere or press ESC to exit', w / 2, h - 12);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => { running = false; cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [active]);

  if (!active) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#050510', cursor: 'pointer' }} onClick={() => setActive(false)}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
