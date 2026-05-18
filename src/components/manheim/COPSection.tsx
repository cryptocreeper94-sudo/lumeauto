import { motion } from 'framer-motion';
import { Layers, Database, Shield, Hexagon } from 'lucide-react';

/**
 * COPSection — Introduces the Cox Operational Platform (COP)
 * Placed after PlainEnglish to establish the overarching OS wrapper.
 */
export default function COPSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow specific to COP */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '80vw', height: '80vh', background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
            The Unified Enterprise Architecture
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
          </div>

          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Cox Operational Platform <span style={{ color: 'var(--accent-cyan)' }}>(COP)</span>
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            The applications you are about to see do not exist in isolation. They are securely housed within 
            the <strong style={{ color: '#fff' }}>Cox Operational Platform</strong> — a deterministic, zero-trust meta-operating system wrapper 
            deployed directly to your command centers. It is the single pane of glass that governs your entire physical and digital ecosystem.
          </p>
        </motion.div>

        {/* 2x2 Grid of Modules */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}
        >
          {/* Module 1: Lot Ops Recon */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }} />
            <Layers size={28} color="var(--accent-cyan)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Lume Ops Recon</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              The real-time lot operations module. It governs vehicle routing, driver assignments, and reconditioning workflows across the physical facility.
            </p>
          </motion.div>

          {/* Module 2: CAL */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
            <Database size={28} color="#10b981" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Enterprise Ledger (CAL)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              The private Proof-of-Authority blockchain layer. It provides cryptographic provenance for every vehicle asset passport, ensuring total auditability.
            </p>
          </motion.div>

          {/* Module 3: Meridian 3D */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
            <Hexagon size={28} color="#8b5cf6" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Meridian Visualization</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              The spatial physics and rendering engine. It provides a real-time, 3D interactive canon of the 42-node facility mesh and structural operations.
            </p>
          </motion.div>

          {/* Module 4: TrustShield */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
            <Shield size={28} color="#94a3b8" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>TrustShield Layer</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              The Guardian Security framework. Enforces strict zero-trust boundaries at the hardware level, ensuring that your enterprise data never leaks to public vectors.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
