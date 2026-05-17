import { motion } from 'framer-motion';
import { Cpu, FileText, BookOpen, Layers, Activity, Download } from 'lucide-react';
import ManheimTabs from '../components/ManheimTabs';
import StackComparison from '../components/engineering/StackComparison';
import TechDeepDive from '../components/engineering/TechDeepDive';

export default function EngineeringBrief() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />

      {/* Hero */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(165deg, rgba(56,189,248,0.08) 0%, var(--bg-dark) 50%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              <Cpu size={14} style={{ marginRight: 6 }} /> Engineering Reference Document
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.08, marginBottom: '1.5rem' }}>
              Full Technical Architecture<br/>
              <span style={{ color: 'var(--accent-cyan)' }}>For Engineering Review.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              This document details the complete system architecture — from OBD-II protocol parsing to governance organism topology to the native Lume build migration path. Every subsystem, protocol, and integration point is specified for engineering-grade review. The intent is simple: any qualified engineer should be able to read this document, review the published research, and independently verify every claim.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', maxWidth: '360px', margin: '0 auto' }}>
              {[
                { icon: <Layers size={14}/>, val: '9', label: 'Subsystems' },
                { icon: <FileText size={14}/>, val: '42', label: 'OBD-II PIDs' },
                { icon: <BookOpen size={14}/>, val: '6', label: 'API Endpoints' },
                { icon: <Cpu size={14}/>, val: '2', label: 'Build Targets' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                  style={{ padding: '14px 12px', background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>{s.icon}{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <StackComparison />
      <TechDeepDive />

      {/* Footer */}
      <section style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
            The architecture documented above is production-ready and verifiable. The React build is live and available for deployment. The native Lume build is architecturally complete and migration-ready. Both share the same 4/42 organism topology — the upgrade path requires no rearchitecture, only a deeper level of runtime enforcement. Every technical claim in this document is backed by published research with verifiable DOIs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', margin: '1.5rem 0' }}>
            <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent-cyan)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              <Activity size={15} /> Try It Live
            </a>
            <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none' }}>
              <Download size={15} /> Download App
            </a>
          </div>
          <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}>
            © 2026 DarkWave Studios LLC / Lume42 Labs · 6 U.S. Provisional Patents Pending · Published Research on Zenodo
          </p>
        </div>
      </section>
    </div>
  );
}
