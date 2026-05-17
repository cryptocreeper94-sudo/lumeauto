import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, ArrowRight, Building2, Cpu, Shield, Layers, Zap, Globe, Activity } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = 'var(--accent-emerald)';

export default function ImplementationPath() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 65%)', transform: 'translate(30%, 30%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/implementation.png" alt="Enterprise deployment planning session" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(16,185,129,0.15)', opacity: 0.8 }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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

        {/* Phased timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            {
              phase: 'Phase 1',
              timeline: 'Weeks 1–4',
              title: 'Telemetry Capture & Baseline',
              icon: <Cpu size={20} />,
              color: 'var(--accent-cyan)',
              items: [
                'Deploy commodity ELM327 OBD-II adapters at pilot facility',
                'Capture 42-signal telemetry from 500–1,000 vehicles',
                'Generate automated condition reports from sensor data',
                'Validate scan accuracy against existing inspection reports',
              ],
            },
            {
              phase: 'Phase 2',
              timeline: 'Weeks 4–8',
              title: 'Lot Intelligence & Workflow Integration',
              icon: <Shield size={20} />,
              color: '#38bdf8',
              items: [
                'Enable real-time lane readiness dashboards for lot managers',
                'Activate dead-battery, cold-start, and pending-fault detection',
                'Integrate transport pre-dispatch health reports and reconditioning work orders',
                'Begin arbitration reduction tracking with sealed condition records',
              ],
            },
            {
              phase: 'Phase 3',
              timeline: 'Weeks 8–12',
              title: 'CAL Integration & Trust Certificates',
              icon: <Layers size={20} />,
              color: '#a78bfa',
              items: [
                'Activate Cox Automotive Ledger validators at pilot facility',
                'Anchor all condition certificates on-ledger with cryptographic proof',
                'Deploy LUME-V governance wrapper over existing operational workflows',
                'Issue Trust Layer certificates for buyer-facing vehicle verification',
              ],
            },
            {
              phase: 'Phase 4',
              timeline: 'Weeks 12–16',
              title: 'Network Intelligence & Multi-Facility',
              icon: <Globe size={20} />,
              color: 'var(--accent-emerald)',
              items: [
                'Full-lot predictive throughput modeling and population health analytics',
                'Cross-facility health scoring and benchmarking',
                'Expand to additional Manheim locations with proven playbook',
                'Enable cross-facility custody chain continuity via CAL',
              ],
            },
          ].map((phase, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}
              className="panel" style={{ padding: '2rem', borderColor: `${phase.color}25`, background: `linear-gradient(90deg, ${phase.color}06 0%, transparent 40%)` }}>
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
          ))}
        </div>

        {/* Key principles */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <Zap size={20} />, title: 'Zero Downtime', desc: 'Every phase runs alongside existing operations. Nothing shuts down, nothing migrates, nothing breaks.' },
            { icon: <Building2 size={20} />, title: 'Facility by Facility', desc: 'Start with one pilot location. Prove value. Expand when ready. Each facility is independently operational.' },
            { icon: <Shield size={20} />, title: 'Independently Valuable', desc: 'Each phase delivers measurable ROI on its own. Phase 1 alone reduces diagnostic overhead and strengthens arbitration defense.' },
            { icon: <Shield size={20} />, title: 'Enterprise Identity Ready', desc: 'The platform integrates with your existing SSO — Azure AD, Okta, SAML 2.0, or any corporate identity provider. Your people sign in with the credentials they already use.' },
            { icon: <Globe size={20} />, title: 'Data Residency & Compliance', desc: 'All data stays on infrastructure Cox controls. The platform is designed for SOC 2, GDPR, and PCI compliance readiness. No data leaves your network without explicit authorization.' },
            { icon: <Layers size={20} />, title: 'Uptime & Disaster Recovery', desc: 'The platform supports multi-region failover, automated backups, and deterministic state recovery. Uptime commitments and SLAs are defined during deployment planning.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.45 + i * 0.08 }}
              className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(16,185,129,0.15)', background: 'rgba(16,185,129,0.02)' }}>
              <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Modular Adoption */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }} style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Modular Architecture</h3>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
              The platform is designed so that each layer operates independently. Manheim can begin with the components that address immediate operational needs and integrate additional layers over time — without rearchitecting what's already running.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'LUME-Auto', desc: 'OBD-II diagnostics and condition reporting — standalone hardware and software.', color: 'var(--accent-cyan)', full: false },
              { title: 'Lot Ops Pro', desc: 'Operational workforce platform — custody tracking, routing, messaging.', color: '#a78bfa', full: false },
              { title: 'LUME-V', desc: 'Deterministic governance wrapper — operates across any legacy enterprise stack.', color: 'var(--accent-emerald)', full: false },
              { title: 'CAL + Trust Layer', desc: 'Private ledger and commercial verification — the cryptographic audit fabric.', color: '#38bdf8', full: false },
              { title: 'Meridian', desc: 'Wireless energy routing — EV charging, powered signage, and lot infrastructure.', color: '#818cf8', full: false },
              { title: 'Unified Platform', desc: 'When deployed together, every component amplifies the others — the whole exceeds the sum of its parts.', color: '#fb923c', full: true },
            ].map((mod, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: 0.55 + i * 0.06 }}
                style={{
                  padding: '1.25rem', borderRadius: '12px',
                  background: mod.full ? `linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.02) 100%)` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${mod.full ? 'rgba(251,146,60,0.25)' : 'var(--border-light)'}`,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: mod.color }} />
                  <h4 style={{ fontSize: '0.95rem', color: mod.color }}>{mod.title}</h4>
                </div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{mod.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="panel" style={{ padding: '3rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.25)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.01) 100%)', boxShadow: '0 10px 40px rgba(16,185,129,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: accent }}>Ready When Manheim Is</h3>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The infrastructure is built. The ledger is live. The governance wrapper is deployed. The organisms are running. The diagnostic software is complete. This is not a proposal for future development — it is a deployment schedule for a pilot that validates the operational layer at a live facility.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/whitepaper" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: accent, color: '#0a0a0c', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
              Read Full Whitepaper <ArrowRight size={14} />
            </a>
            <a href="https://cal.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: accent, borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.6)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.3)'}>
              View Live Ledger <ArrowRight size={14} />
            </a>
            <a href="/engineering" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: accent, borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.6)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.3)'}>
              Engineering Brief <ArrowRight size={14} />
            </a>
            <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.6)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)'}>
              <Activity size={14} /> Launch Organism
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
