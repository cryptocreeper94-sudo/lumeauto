import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getBLEStatus } from '../../telemetry/BLEConnector';

interface GovernanceEvent {
  time: string;
  message: string;
  type: 'info' | 'drift' | 'consensus' | 'heal';
}

interface NodeState {
  x: number;
  y: number;
  ring: number;
  status: 'nominal' | 'drift' | 'healing';
  pulse: number;
}

function generateNodes(): NodeState[] {
  const nodes: NodeState[] = [];
  const rings = [
    { count: 4, radius: 38 },   // Core — 4 primitives
    { count: 10, radius: 72 },  // Inner ring
    { count: 14, radius: 108 }, // Middle ring
    { count: 14, radius: 142 }, // Outer ring
  ];

  rings.forEach((ring, ri) => {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        x: Math.cos(angle) * ring.radius,
        y: Math.sin(angle) * ring.radius,
        ring: ri,
        status: 'nominal',
        pulse: Math.random(),
      });
    }
  });
  return nodes;
}

function getTimeStr(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

export default function OrganismVisualization({ onBack, data }: { onBack: () => void; data: any }) {
  const [nodes, setNodes] = useState<NodeState[]>(generateNodes);
  const [log, setLog] = useState<GovernanceEvent[]>([]);
  const [driftCount, setDriftCount] = useState(0);
  const [consensus, setConsensus] = useState(98.7);
  const [scanCycle, setScanCycle] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  // Simulated governance events
  useEffect(() => {
    const interval = setInterval(() => {
      setScanCycle(c => c + 1);
      setConsensus(c => Math.min(100, c + (Math.random() - 0.3) * 0.5));

      // Random governance events
      const roll = Math.random();
      if (roll < 0.08) {
        // Drift event
        const driftNode = 1 + Math.floor(Math.random() * 42);
        setDriftCount(d => d + 1);
        setLog(prev => [{
          time: getTimeStr(),
          message: `Node ${driftNode} drift detected — corrected in ${(1 + Math.random() * 4).toFixed(0)}ms`,
          type: 'drift' as const,
        }, ...prev].slice(0, 20));

        // Mark a node as drifting temporarily
        setNodes(prev => {
          const next = [...prev];
          const idx = Math.min(driftNode - 1, next.length - 1);
          next[idx] = { ...next[idx], status: 'drift' };
          setTimeout(() => {
            setNodes(p => {
              const n = [...p];
              n[idx] = { ...n[idx], status: 'healing' };
              setTimeout(() => {
                setNodes(pp => {
                  const nn = [...pp];
                  nn[idx] = { ...nn[idx], status: 'nominal' };
                  return nn;
                });
              }, 1200);
              return n;
            });
          }, 600);
          return next;
        });
      } else if (roll < 0.25) {
        setLog(prev => [{
          time: getTimeStr(),
          message: `Cross-validation consensus achieved (4-node)`,
          type: 'consensus' as const,
        }, ...prev].slice(0, 20));
      } else if (roll < 0.4) {
        setLog(prev => [{
          time: getTimeStr(),
          message: `Scan cycle #${scanCycle} complete — all 42 PIDs nominal`,
          type: 'info' as const,
        }, ...prev].slice(0, 20));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [scanCycle]);

  // Canvas animation for rings and connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 340;
    canvas.width = size * 2; // retina
    canvas.height = size * 2;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(2, 2);

    let animFrame: number;
    const cx = size / 2;
    const cy = size / 2;

    const animate = () => {
      frameRef.current++;
      const t = frameRef.current * 0.012;
      ctx.clearRect(0, 0, size, size);

      // Draw rings
      [38, 72, 108, 142].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 + i * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          // Connect adjacent rings only
          if (Math.abs(a.ring - b.ring) !== 1) continue;
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 80) continue;

          const alpha = Math.max(0, 0.03 + Math.sin(t + i * 0.3) * 0.02);
          ctx.beginPath();
          ctx.moveTo(cx + a.x, cy + a.y);
          ctx.lineTo(cx + b.x, cy + b.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const nx = cx + node.x;
        const ny = cy + node.y;
        const pulseFactor = 1 + Math.sin(t * 1.5 + i * 0.7) * 0.15;

        let color: string;
        let glowColor: string;
        let radius: number;

        if (node.status === 'drift') {
          color = '#f59e0b';
          glowColor = 'rgba(245, 158, 11, 0.6)';
          radius = (node.ring === 0 ? 5 : 3.5) * 1.4;
        } else if (node.status === 'healing') {
          color = '#38bdf8';
          glowColor = 'rgba(56,189,248, 0.4)';
          radius = (node.ring === 0 ? 5 : 3.5) * 1.2;
        } else {
          color = node.ring === 0 ? '#10b981' : '#06b6d4';
          glowColor = node.ring === 0 ? 'rgba(16, 185, 129, 0.35)' : 'rgba(6, 182, 212, 0.2)';
          radius = node.ring === 0 ? 5 : 3.5;
        }

        // Glow
        ctx.beginPath();
        ctx.arc(nx, ny, radius * pulseFactor * 2.5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * pulseFactor * 2.5);
        grad.addColorStop(0, glowColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(nx, ny, radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Center pulse
      const centerPulse = 0.4 + Math.sin(t * 0.8) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${centerPulse * 0.3})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 185, 129, ${0.6 + centerPulse * 0.4})`;
      ctx.fill();

      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrame);
  }, [nodes]);

  const bleStatus = getBLEStatus();
  const isHealthy = consensus > 90 && nodes.every(n => n.status === 'nominal');
  const mode = data?.governanceMode || 'Nominal';

  const eventColors: Record<string, string> = {
    info: 'var(--text-dim)',
    drift: '#f59e0b',
    consensus: 'var(--accent-emerald)',
    heal: '#38bdf8',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: 0 }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 60px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingTop: '12px' }}>
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: '0.75rem', padding: 0,
          }}>
            <ArrowLeft size={18} /> Dashboard
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.1em' }}>
            LUME<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>AUTO</span>
          </span>
        </div>

        {/* Organism Status Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
          border: '1px solid var(--border-light)', padding: '20px', marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em' }}>ORGANISM STATUS</span>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 14px', borderRadius: '20px',
                background: isHealthy ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                border: `1px solid ${isHealthy ? 'var(--accent-emerald)' : '#f59e0b'}`,
              }}
            >
              <Activity size={14} style={{ color: isHealthy ? 'var(--accent-emerald)' : '#f59e0b' }} />
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                color: isHealthy ? 'var(--accent-emerald)' : '#f59e0b',
              }}>
                {isHealthy ? 'HEALTHY' : 'CORRECTING'}
              </span>
            </motion.div>
          </div>

          {/* Canvas Visualization */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <canvas ref={canvasRef} style={{ borderRadius: '12px' }} />
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Active Nodes: <strong style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>42/42</strong>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              Consensus: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{consensus.toFixed(1)}%</strong>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              Drift Corrections: <strong style={{ color: driftCount > 0 ? '#f59e0b' : 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                {driftCount} (auto-healed)
              </strong>
            </div>
          </div>

          {/* Safety Envelope */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px', borderRadius: '10px',
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
          }}>
            <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Safety Envelope:</span>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--accent-emerald)',
            }}>
              {mode === 'Lifecycle Warning' ? 'WARNING' : 'NOMINAL'}
            </span>
          </div>
        </div>

        {/* Governance Log */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
          border: '1px solid var(--border-light)', padding: '16px',
        }}>
          <p style={{
            fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em',
            marginBottom: '12px', color: 'var(--text-main)',
          }}>
            GOVERNANCE LOG
          </p>

          <AnimatePresence>
            {log.length === 0 ? (
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                Waiting for governance events...
              </p>
            ) : (
              log.slice(0, 8).map((event) => (
                <motion.div
                  key={event.time + event.message}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex', gap: '10px', marginBottom: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{
                    fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)', flexShrink: 0, marginTop: '1px',
                  }}>
                    {event.time}
                  </span>
                  <span style={{
                    fontSize: '0.65rem', color: eventColors[event.type] || 'var(--text-muted)',
                    lineHeight: 1.4,
                  }}>
                    {event.message}
                  </span>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Connection Info */}
        <p style={{
          color: 'var(--text-dim)', fontSize: '0.55rem', textAlign: 'center',
          marginTop: '16px', letterSpacing: '0.05em',
        }}>
          {bleStatus.isSimulated ? 'Demo Mode' : bleStatus.adapterInfo || 'Connected'} · 42 nodes · 4 primitives · {consensus.toFixed(1)}% consensus
          <br />Deterministic · Zero AI · US Patent 64/032,339
        </p>
      </div>
    </div>
  );
}
