import { motion } from 'framer-motion';

export default function Technology() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
          Architecture
        </div>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>The 42-Signal Diagnostic Engine</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>
          Lume-Auto maps 42 governance nodes across four flow primitives. It treats the internal combustion engine (ICE) as a deterministic multi-flow system.
        </p>

        <div className="panel mt-8">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>1. Throughput Base (TB)</h2>
          <p className="text-muted">Fundamental flow rates: air, fuel, heat, torque, loss. Ten nodes governing what is flowing into and out of the system right now.</p>
        </div>

        <div className="panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>2. Process Rate (PR)</h2>
          <p className="text-muted">Efficiency of conversion processes: combustion, transmission, thermal. Ten nodes calculating exactly how efficiently input is converted to work.</p>
        </div>

        <div className="panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>3. Flow State (FS)</h2>
          <p className="text-muted">Real-time state of flows: mixture, timing, load, and driver behavior. Twelve nodes contextualizing the efficiency metrics.</p>
        </div>

        <div className="panel">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>4. System Lifecycle (SL)</h2>
          <p className="text-muted">Health and remaining life of components governing flow capacity. Ten nodes that predict component degradation before catastrophic failure.</p>
        </div>
      </motion.div>
    </div>
  );
}

