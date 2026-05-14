import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, BarChart3, ShieldCheck, Zap, Cpu, Clock, FileText } from 'lucide-react';

export default function Enterprise() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '4rem' }}>
      {/* Hero */}
      <section className="container" style={{ paddingTop: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Enterprise & Auction Intelligence
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>Deterministic Vehicle Intelligence at Intake</h1>
          <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Lume-Auto connects to any OBD-II vehicle at intake, reads 42 real-time telemetry signals through a deterministic governance engine, and produces a structured, auditable condition report in seconds. Every score is traceable to a specific sensor reading. Every fault flag is timestamped and reproducible.
          </p>
          <a href="mailto:team@dwsc.io" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
            Request Pilot Proposal <ArrowRight size={20} />
          </a>
        </motion.div>
      </section>

      {/* Problem → Solution Grid */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Operational Intelligence</h2>
          <p className="text-muted">Addressing the highest-cost friction points in wholesale vehicle operations.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: <FileText size={22} />, title: 'Automated Condition Reports', problem: 'Manual reports are slow, variable, and create arbitration surface.', solution: '42-node deterministic scan generates a structured, auditable report in 45 seconds. Pilot target: 50%+ automation rate.' },
            { icon: <ShieldCheck size={22} />, title: 'Arbitration Reduction', problem: 'Post-sale fault discovery costs $800–$2,500 per event.', solution: 'Organism scan log provides timestamped, reproducible fault record. Disputes resolved by replaying intake scan.' },
            { icon: <Zap size={22} />, title: 'Lot-Flow Intelligence', problem: 'Battery failures and pending faults disrupt lane flow.', solution: 'SL8 node flags battery health at intake. Pending faults identified before lane assignment. Lane readiness scoring.' },
            { icon: <BarChart3 size={22} />, title: 'Inventory Velocity', problem: 'No visibility into fleet-wide readiness state.', solution: 'Population health scoring at intake models expected time-on-lot. Proactive routing of high-readiness units.' },
            { icon: <Cpu size={22} />, title: 'Transport Integration', problem: 'Degraded drivetrain vehicles cause transport damage claims.', solution: 'Organism flags drivetrain health unsuitable for transport. Reduces roadside events and damage claims.' },
            { icon: <Clock size={22} />, title: 'Reconditioning Queue', problem: 'Surprise reconditioning events disrupt scheduling.', solution: 'Organism-predicted maintenance queue at intake. Priority scoring by SL-node severity.' },
          ].map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="panel flex flex-col gap-4" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--accent-cyan)' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.15rem' }}>{card.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}><em>Problem:</em> {card.problem}</p>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{card.solution}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Deterministic */}
      <section style={{ background: 'rgba(255,255,255,0.01)', padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Why Deterministic Matters</h2>
          <div className="flex flex-col gap-4">
            {[
              'Same inputs always produce same outputs. No nondeterminism, no probabilistic inference, no hallucinations.',
              'Every condition score traces to a specific sensor reading at a specific timestamp.',
              'Arbitration disputes resolved by replaying the organism\'s state at the time of report generation.',
              'Self-healing runtime auto-detects and corrects organism state drift.',
              'Self-monitoring: the organism observes its own scoring accuracy and flags degradation.',
              '2,358 deterministic test cases passed with zero AI calls.',
            ].map((item, i) => (
              <div key={i} className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                <CheckCircle size={18} color="var(--accent-emerald)" style={{ marginTop: '3px', flexShrink: 0 }} />
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Proposal */}
      <section className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="text-emerald" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>30-Day Pilot</p>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Pilot Proposal</h2>
            <p className="text-muted">500–1,000 vehicles · One location · Signed ROI report at close</p>
          </div>

          <div className="panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Success Metrics</h3>
            <table className="data-table">
              <thead><tr><th>Metric</th><th>Target</th></tr></thead>
              <tbody>
                <tr><td>Condition report automation rate</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>≥50%</td></tr>
                <tr><td>Arbitration events flagged by organism</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>≥70%</td></tr>
                <tr><td>Battery-related lot delays prevented</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Track & quantify</td></tr>
                <tr><td>Reconditioning queue accuracy</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>Organism vs. actual</td></tr>
                <tr><td>Dashboard daily active use</td><td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>By week 2</td></tr>
              </tbody>
            </table>
          </div>

          <div className="panel" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>ROI Validation</h3>
            <ul className="flex flex-col gap-3" style={{ listStyle: 'none' }}>
              {[
                'Cost per condition report: manual vs. automated time savings',
                'Arbitration cost reduction: internal cost per event × reduction rate',
                'Lot velocity: time-on-lot for organism-processed vs. control group',
                'Inspector hours freed: 50% automation × 500 vehicles/day × 15 min each = 62.5 hours/day',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted" style={{ fontSize: '0.9rem' }}>
                  <CheckCircle size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>No infrastructure investment. No hardware commitment. Deployable in 30 days.</p>
            <a href="mailto:team@dwsc.io" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
              Contact: team@dwsc.io <ArrowRight size={20} />
            </a>
            <p className="text-dim" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Jason Andrews · DarkWave Studios LLC / Lume42 Labs · US Provisional Patent 64/032,339</p>
          </div>
        </div>
      </section>
    </div>
  );
}
