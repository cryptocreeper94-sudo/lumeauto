import { motion } from 'framer-motion';
import { Layers, Database, Shield, Hexagon, Download, Lock, Monitor, Cpu, HardDrive, Globe, ServerCog, Fingerprint } from 'lucide-react';

/**
 * COPSection — Introduces the Cox Operational Platform (COP)
 * Comprehensive enterprise OS section matching the depth of LotOpsPro and LumeV.
 */

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

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

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>

        {/* Hero Image */}
        <motion.div {...fadeIn}>
          <img
            src="/assets/images/photos/cop_command_center.png"
            alt="Cox Operational Platform — Enterprise Command Center"
            style={{
              width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 30%',
              borderRadius: '20px', marginBottom: '2.5rem',
              border: '1px solid rgba(6,182,212,0.2)', opacity: 0.9
            }}
          />
        </motion.div>

        {/* Header Block */}
        <motion.div
          {...fadeIn}
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

        {/* What COP Provides — detailed breakdown */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', background: 'rgba(6,182,212,0.02)', borderColor: 'rgba(6,182,212,0.15)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-cyan)' }}>
              <Monitor size={22} color="var(--accent-cyan)" /> What Makes COP Different
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Unlike cloud dashboards that aggregate data after the fact, COP is a <strong style={{ color: '#fff' }}>native desktop operating system</strong> that runs directly on your facility's hardware.
              Every process — from vehicle scanning to driver routing to ledger verification — executes locally with zero cloud latency. It is a self-contained command center
              that can operate independently of internet connectivity while syncing to the enterprise mesh when available.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem 1.5rem' }}>
              {[
                'Runs natively on Windows desktops',
                'Zero cloud dependency for core ops',
                'Sub-10ms response on all interactions',
                'Electron-based hardened runtime',
                'Auto-updates via enterprise channel',
                'Full offline operation capability'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 500 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2×3 Module Grid */}
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Integrated Modules</h3>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}
        >
          {/* Module 1: Lot Ops Recon */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(6,182,212,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }} />
            <Layers size={28} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lot Ops Pro</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Real-time lot operations management. Vehicle routing, driver assignments, OCR scanning, GPS navigation, and reconditioning workflows — all from a single interface.
            </p>
          </motion.div>

          {/* Module 2: CAL */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(16,185,129,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
            <Database size={28} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Enterprise Ledger (CAL)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Private Proof-of-Authority blockchain layer providing cryptographic provenance for every vehicle asset passport. Total auditability, tamper-proof by design.
            </p>
          </motion.div>

          {/* Module 3: Meridian 3D */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
            <Hexagon size={28} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Meridian Visualization</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Spatial physics and 3D rendering engine. Real-time interactive canon of the 42-node facility mesh and structural operations monitoring.
            </p>
          </motion.div>

          {/* Module 4: TrustShield */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
            <Shield size={28} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>TrustShield Layer</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Guardian Security framework enforcing strict zero-trust boundaries at the hardware level. Enterprise data never leaks to public vectors.
            </p>
          </motion.div>

          {/* Module 5: LUME-V Wrapper */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(56,189,248,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)' }} />
            <ServerCog size={28} color="#38bdf8" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>LUME-V Governance</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Deterministic governance wrapper that unifies legacy systems into a single source of truth. Zero database migration, zero downtime.
            </p>
          </motion.div>

          {/* Module 6: SSO & Identity */}
          <motion.div variants={itemVariants} style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
            <Fingerprint size={28} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Enterprise SSO</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Native integration with existing Okta and Azure Active Directory. Employees log in exactly as they do today — zero new credentials required.
            </p>
          </motion.div>
        </motion.div>

        {/* Architecture Breakdown — Two-Column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(6,182,212,0.15)', background: 'linear-gradient(180deg, rgba(6,182,212,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-cyan)' }}>Deployment Architecture</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              COP deploys as a hardened Electron application with enterprise-grade build tooling:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: <HardDrive size={18} />, text: 'Native .exe installer — no browser required' },
                { icon: <Cpu size={18} />, text: 'Local SQLite + in-memory caching layer' },
                { icon: <Shield size={18} />, text: 'Code-signed binary with integrity verification' },
                { icon: <Globe size={18} />, text: 'Enterprise mesh sync when connected' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <div style={{ color: 'var(--accent-cyan)', padding: '6px', background: 'rgba(6,182,212,0.1)', borderRadius: '8px', display: 'flex' }}>
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.02) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>Security Posture</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Every layer of COP enforces defense-in-depth security principles:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: <Lock size={18} />, text: 'Zero-trust authentication on every action' },
                { icon: <Shield size={18} />, text: 'Role-based access — each user sees only their scope' },
                { icon: <Database size={18} />, text: 'All data encrypted at rest and in transit' },
                { icon: <Fingerprint size={18} />, text: 'Biometric + PIN multi-factor for field ops' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  <div style={{ color: 'var(--accent-emerald)', padding: '6px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', display: 'flex' }}>
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { val: '6', unit: '', label: 'Integrated Modules' },
            { val: '<10', unit: 'ms', label: 'Response Time' },
            { val: '0', unit: '', label: 'Cloud Dependencies' },
            { val: '256', unit: '-bit', label: 'AES Encryption' },
            { val: '∞', unit: '', label: 'Offline Capability' },
          ].map((s, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.2 + i * 0.08 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{s.val}<span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{s.unit}</span></div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}
        >
          <a
            href="/downloads/Cox_Operational_Platform.exe"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)',
              border: '1px solid rgba(6,182,212,0.4)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(6,182,212,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(6,182,212,0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.1) 100%)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(6,182,212,0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)';
            }}
          >
            <Download size={20} />
            Download Enterprise OS (.exe)
          </a>
          <br />
          <div style={{
            marginTop: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '20px',
            color: '#f87171',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Lock size={14} />
            Restricted Access: Manheim / Cox Automotive Use Only
          </div>
        </motion.div>
      </div>
    </section>
  );
}
