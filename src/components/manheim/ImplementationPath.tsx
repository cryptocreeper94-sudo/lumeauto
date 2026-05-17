import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckCircle, Clock, ArrowRight, Building2, Cpu, Shield, Layers, Zap, Globe, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
const accent = 'var(--accent-emerald)';

const PHASES = [
  {
    phase: 'Phase 1', timeline: 'Weeks 1–4', title: 'Telemetry Capture & Baseline',
    icon: <Cpu size={20} />, color: 'var(--accent-cyan)',
    items: [
      'Deploy commodity ELM327 OBD-II adapters at pilot facility',
      'Capture 42-signal telemetry from 500–1,000 vehicles',
      'Generate automated condition reports from sensor data',
      'Validate scan accuracy against existing inspection reports',
    ],
  },
  {
    phase: 'Phase 2', timeline: 'Weeks 4–8', title: 'Lot Intelligence & Workflow Integration',
    icon: <Shield size={20} />, color: '#38bdf8',
    items: [
      'Enable real-time lane readiness dashboards for lot managers',
      'Activate dead-battery, cold-start, and pending-fault detection',
      'Integrate transport pre-dispatch health reports and reconditioning work orders',
      'Begin arbitration reduction tracking with sealed condition records',
    ],
  },
  {
    phase: 'Phase 3', timeline: 'Weeks 8–12', title: 'CAL Integration & Trust Certificates',
    icon: <Layers size={20} />, color: '#38bdf8',
    items: [
      'Activate Cox Automotive Ledger validators at pilot facility',
      'Anchor all condition certificates on-ledger with cryptographic proof',
      'Deploy LUME-V governance wrapper over existing operational workflows',
      'Issue Trust Layer certificates for buyer-facing vehicle verification',
    ],
  },
  {
    phase: 'Phase 4', timeline: 'Weeks 12–16', title: 'Network Intelligence & Multi-Facility',
    icon: <Globe size={20} />, color: 'var(--accent-emerald)',
    items: [
      'Full-lot predictive throughput modeling and population health analytics',
      'Cross-facility health scoring and benchmarking',
      'Expand to additional Manheim locations with proven playbook',
      'Enable cross-facility custody chain continuity via CAL',
    ],
  },
];

export default function ImplementationPath() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const prevPhase = useCallback(() => setPhaseIdx(i => (i - 1 + PHASES.length) % PHASES.length), []);
  const nextPhase = useCallback(() => setPhaseIdx(i => (i + 1) % PHASES.length), []);
  const phase = PHASES[phaseIdx];

  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 65%)', transform: 'translate(30%, 30%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/implementation.png" alt="Enterprise deployment planning session" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(16,185,129,0.15)', opacity: 0.8 }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <FileText size={14} style={{ marginRight: 6 }} /> Implementation Path
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              How Manheim Deploys This
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              A phased deployment path designed for zero disruption to existing operations. Every stage is independently valuable — no all-or-nothing commitment required.
            </p>
          </motion.div>
        </div>

        {/* ═══ PHASE CAROUSEL — single card with internal nav ═══ */}
        <motion.div {...fadeIn} style={{ marginBottom: '3rem' }}>
          <div className="panel" style={{
            padding: '2rem', borderColor: `${phase.color}25`,
            background: `linear-gradient(90deg, ${phase.color}06 0%, transparent 40%)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '200px' }}>
                    <div style={{ padding: '10px', background: `${phase.color}12`, borderRadius: '10px', color: phase.color, display: 'flex' }}>
                      {phase.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: phase.color, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{phase.phase}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{phase.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Clock size={12} /> {phase.timeline}
                      </div>
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '280px' }}>
                    {phase.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} style={{ color: phase.color, flexShrink: 0 }} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Internal nav bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)',
            }}>
              <button onClick={prevPhase} aria-label="Previous phase" style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChevronLeft size={12} />
              </button>
              <div style={{ display: 'flex', gap: '5px' }}>
                {PHASES.map((_, i) => (
                  <button key={i} onClick={() => setPhaseIdx(i)} aria-label={`Phase ${i + 1}`}
                    style={{
                      width: phaseIdx === i ? '18px' : '6px', height: '6px',
                      borderRadius: '3px', border: 'none', cursor: 'pointer',
                      background: phaseIdx === i ? phase.color : 'rgba(255,255,255,0.12)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
              <button onClick={nextPhase} aria-label="Next phase" style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChevronRight size={12} />
              </button>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginLeft: '6px' }}>
                {phaseIdx + 1} / {PHASES.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ═══ KEY PRINCIPLES — strict 3×2 grid ═══ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { icon: <Zap size={20} />, title: 'Zero Downtime', desc: 'Every phase runs alongside existing operations. Nothing shuts down, nothing migrates, nothing breaks.' },
            { icon: <Building2 size={20} />, title: 'Facility by Facility', desc: 'Start with one pilot location. Prove value. Expand when ready. Each facility is independently operational.' },
            { icon: <Shield size={20} />, title: 'Independently Valuable', desc: 'Each phase delivers measurable ROI on its own. Phase 1 alone reduces diagnostic overhead and strengthens arbitration defense.' },
            { icon: <Shield size={20} />, title: 'Enterprise Identity Ready', desc: 'The platform integrates with your existing SSO — Azure AD, Okta, SAML 2.0, or any corporate identity provider.' },
            { icon: <Globe size={20} />, title: 'Data Residency & Compliance', desc: 'All data stays on infrastructure Cox controls. Designed for SOC 2, GDPR, and PCI compliance readiness.' },
            { icon: <Layers size={20} />, title: 'Uptime & Disaster Recovery', desc: 'Multi-region failover, automated backups, and deterministic state recovery. SLAs defined during deployment.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.05 }} className="panel" style={{ padding: '1.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.02)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: accent, marginBottom: '0.6rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.35rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ MODULAR ARCHITECTURE — strict 3×2 grid, consistent styling ═══ */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Modular Architecture</h3>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
              The platform is designed so that each layer operates independently. Manheim can begin with the components that address immediate operational needs and integrate additional layers over time.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { title: 'LUME-Auto', desc: 'OBD-II diagnostics and condition reporting — standalone hardware and software.', color: 'var(--accent-cyan)' },
              { title: 'Lot Ops Pro', desc: 'Operational workforce platform — custody tracking, routing, messaging.', color: '#38bdf8' },
              { title: 'LUME-V', desc: 'Deterministic governance wrapper — operates across any legacy enterprise stack.', color: 'var(--accent-emerald)' },
              { title: 'CAL + Trust Layer', desc: 'Private ledger and commercial verification — the cryptographic audit fabric.', color: '#38bdf8' },
              { title: 'Meridian', desc: 'Wireless energy routing — EV charging, powered signage, and lot infrastructure.', color: '#dc2626' },
              { title: 'Unified Platform', desc: 'When deployed together, every component amplifies the others — the whole exceeds the sum of its parts.', color: '#fb923c' },
            ].map((mod, i) => (
              <div key={i} className="panel" style={{
                padding: '1.25rem', borderColor: `${mod.color}22`, display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: mod.color, flexShrink: 0 }} />
                  <h4 style={{ fontSize: '0.9rem', color: mod.color, margin: 0 }}>{mod.title}</h4>
                </div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{mod.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '3rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.25)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.01) 100%)', boxShadow: '0 10px 40px rgba(16,185,129,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: accent }}>Built. Tested. Ready to Deploy.</h3>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The infrastructure is built. The ledger is live. The governance wrapper is deployed. The organisms are running. This is not a proposal for future development — it is a deployment schedule for a pilot that validates the operational layer at a live facility.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/whitepaper" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: accent, color: '#0a0a0c', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
              Read Full Whitepaper <ArrowRight size={14} />
            </a>
            <a href="https://cal.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: accent, borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              View Live Ledger <ArrowRight size={14} />
            </a>
            <a href="/engineering" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: accent, borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              Engineering Brief <ArrowRight size={14} />
            </a>
            <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
              <Activity size={14} /> Launch Organism
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
