import { motion } from 'framer-motion';

// Generate 42 nodes for the visualizer once outside the component to maintain render purity
const NODES = Array.from({ length: 42 }).map((_, i) => {
  // Distribute nodes somewhat randomly but keeping them in a ring
  const angle = (i * 360) / 42 + (Math.random() * 10 - 5);
  const radius = 90 + Math.random() * 80; // Distance from center
  return {
    id: i,
    angle,
    radius,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 1.5,
  };
});

export default function OrganismVisualizer() {
  return (
    <div className="panel" style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#0a0a0c', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '16px', boxShadow: 'inset 0 0 60px rgba(16, 185, 129, 0.05)' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--accent-cyan) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Connection Lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.2, pointerEvents: 'none' }}>
        <g style={{ transform: 'translate(50%, 50%)' }}>
          {NODES.map(node => {
            const endX = node.radius * Math.cos((node.angle * Math.PI) / 180);
            const endY = node.radius * Math.sin((node.angle * Math.PI) / 180);
            return (
              <motion.line 
                key={`line-${node.id}`} 
                x1="0" y1="0" x2={endX} y2={endY} 
                stroke="#10b981" 
                strokeWidth="1"
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ repeat: Infinity, duration: node.duration, delay: node.delay }}
              />
            );
          })}
        </g>
      </svg>

      {/* The Lume Core */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1], 
          boxShadow: ['0 0 20px rgba(16,185,129,0.4)', '0 0 80px rgba(16,185,129,0.9)', '0 0 20px rgba(16,185,129,0.4)'] 
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'radial-gradient(circle at center, #10b981 0%, #064e3b 100%)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#fff', opacity: 0.9, filter: 'blur(6px)' }} />
      </motion.div>

      {/* 42 Telemetry Nodes */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
        {NODES.map(node => {
          const x = node.radius * Math.cos((node.angle * Math.PI) / 180);
          const y = node.radius * Math.sin((node.angle * Math.PI) / 180);

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0.2, scale: 0.5 }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.5, 0.5] }}
              transition={{ repeat: Infinity, duration: node.duration, delay: node.delay, ease: "linear" }}
              style={{ position: 'absolute', top: y - 3, left: x - 3, width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 12px var(--accent-cyan)' }}
            />
          );
        })}
      </div>
      
      {/* HUD Telemetry Overlay */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-emerald)', opacity: 0.9, letterSpacing: '0.1em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 5px var(--accent-emerald)' }}></div>
          LUME_CORE_RUNTIME: <span style={{ color: '#fff' }}>NOMINAL</span>
        </div>
        <div>NODES_ACTIVE: <span style={{ color: 'var(--accent-cyan)' }}>42 (100Hz)</span></div>
        <div>GOVERNANCE: <span style={{ color: 'var(--text-dim)' }}>DETERMINISTIC</span></div>
      </div>

    </div>
  );
}
