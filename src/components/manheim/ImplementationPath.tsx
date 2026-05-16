import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, ArrowRight, Building2, Cpu, Shield, Layers, Zap, Globe } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = 'var(--accent-emerald)';

export default function ImplementationPath() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 65%)', transform: 'translate(30%, 30%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>

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
              title: 'Hardware Deployment & Baseline',
              icon: <Cpu size={20} />,
              color: 'var(--accent-cyan)',
              items: [
                'Deploy ESP32-S3 OBD-II dongles to pilot facility',
                'Establish baseline telemetry from live vehicle fleet',
                'Connect LUME-Auto organism to facility network',
                'Validate scan accuracy against existing condition reports',
              ],
            },
            {
              phase: 'Phase 2',
              timeline: 'Weeks 4–8',
              title: 'CAL Integration & Governance',
              icon: <Shield size={20} />,
              color: '#38bdf8',
              items: [
                'Activate Cox Automotive Ledger validators at pilot facility',
                'Begin anchoring condition certificates on-ledger',
                'Deploy LUME-V governance wrapper over existing workflows',
                'Establish deterministic audit trail for all vehicle events',
              ],
            },
            {
              phase: 'Phase 3',
              timeline: 'Weeks 8–12',
              title: 'Lot Ops Pro & Operational Integration',
              icon: <Layers size={20} />,
              color: '#a78bfa',
              items: [
                'Integrate real-time telemetry into lane routing decisions',
                'Deploy supervisor dashboards for custody chain visibility',
                'Enable driver GPS assignments from health-based routing',
                'Connect arbitration defense to ledger-backed replay',
              ],
            },
            {
              phase: 'Phase 4',
              timeline: 'Weeks 12–16',
              title: 'Trust Layer & Multi-Facility Expansion',
              icon: <Globe size={20} />,
              color: 'var(--accent-emerald)',
              items: [
                'Issue public Trust Layer certificates for verified vehicles',
                'Expand CAL validators to additional Manheim locations',
                'Enable cross-facility custody chain continuity',
                'Begin population health analytics across regional fleet',
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
            { icon: <Shield size={20} />, title: 'Independently Valuable', desc: 'Each phase delivers measurable ROI on its own. Phase 1 alone eliminates diagnostic costs and reduces arbitration exposure.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.45 + i * 0.08 }}
              style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
              <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Modular Adoption */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }} style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Modular by Design</h3>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
              This is the full-picture implementation vision — but every component is independently deployable. Manheim can adopt the pieces that solve today's problems and expand as needs evolve.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'LUME-Auto', desc: 'OBD-II diagnostics and condition reporting — standalone hardware + software.', color: 'var(--accent-cyan)', standalone: true },
              { title: 'Lot Ops Pro', desc: 'Operational workforce platform — custody tracking, routing, messaging.', color: '#a78bfa', standalone: true },
              { title: 'LUME-V', desc: 'Deterministic governance wrapper — licensable across any legacy enterprise stack.', color: 'var(--accent-emerald)', standalone: true },
              { title: 'CAL + Trust Layer', desc: 'Private ledger + commercial verification — the cryptographic audit fabric.', color: '#38bdf8', standalone: true },
              { title: 'Full Stack', desc: 'Maximum value — every component amplifies the others when deployed together.', color: '#fb923c', standalone: false },
            ].map((mod, i) => (
              <motion.div key={i} {...fadeIn} transition={{ delay: 0.55 + i * 0.06 }}
                style={{
                  padding: '1.25rem', borderRadius: '12px',
                  background: mod.standalone ? 'rgba(255,255,255,0.02)' : `linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.02) 100%)`,
                  border: `1px solid ${mod.standalone ? 'var(--border-light)' : 'rgba(251,146,60,0.25)'}`,
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: mod.color }} />
                  <h4 style={{ fontSize: '0.95rem', color: mod.color }}>{mod.title}</h4>
                </div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>{mod.desc}</p>
                <div style={{ fontSize: '0.65rem', color: mod.standalone ? 'var(--text-dim)' : '#fb923c', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                  {mod.standalone ? '● Available Independently' : '★ Maximum Enterprise Value'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="panel" style={{ padding: '3rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.25)', background: 'linear-gradient(180deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.01) 100%)', boxShadow: '0 10px 40px rgba(16,185,129,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: accent }}>Ready When Manheim Is</h3>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The infrastructure is built. The hardware is manufactured. The ledger is live. The organisms are running. This is not a proposal for future development — it is a deployment schedule for systems that already exist.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="https://cal.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: accent, color: '#0a0a0c', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
              View Live Ledger <ArrowRight size={14} />
            </a>
            <a href="/engineering" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', border: '1px solid rgba(16,185,129,0.3)', color: accent, borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'border-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.6)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(16,185,129,0.3)'}>
              Engineering Brief <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
