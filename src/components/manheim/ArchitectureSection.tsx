import { motion } from 'framer-motion';
import { Zap, Shield, Activity, MapPin } from 'lucide-react';
import OrganismVisualizer from '../OrganismVisualizer';
import LiveScanSimulator from '../LiveScanSimulator';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function ArchitectureSection() {
  return (
    <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(16,185,129,0.02) 100%)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="responsive-grid" style={{ marginBottom: '4rem' }}>
          <motion.div {...f}>
            <p style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Architecture</p>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>The Synthetic Organism.</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Lume-Auto is not an algorithm. It does not call an API. It is a deterministic synthetic organism — a living network of 42 governance nodes that monitors, cross-validates, and self-corrects in real-time on the edge device.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Zero AI in the Critical Path</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  When the organism flags a failing catalytic converter, it is a deterministic certainty — not a statistical guess. No inference model. No hallucination surface. The safety envelope relies on pure, immutable mathematics.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>Deterministic Replay</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                  Feed the same sensor data through the same organism and you get the same diagnosis — every time, on any device, years later. This is what makes cryptographic arbitration defense possible.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <OrganismVisualizer />
          </motion.div>
        </div>

        {/* Live scan demo with context */}
        <motion.div {...f} style={{ marginBottom: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Live Simulation</p>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>See the Organism Work.</h3>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>This is a real-time simulation of the 42-node governance organism processing a vehicle scan. Watch it identify faults, cross-validate sensor data, and produce a deterministic condition report in under 45 seconds.</p>
          </div>
          <LiveScanSimulator />
        </motion.div>

        {/* What it does for the lot */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>What This Means on the Ground</h3>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Every step is deterministic. Every output is reproducible. Every decision has a traceable input chain.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { icon: <Activity size={22}/>, title: 'Intake Automation', desc: '45-second deterministic scan generates a structured condition report. Dead batteries, severe misfires, and catalytic failures are flagged before the vehicle reaches a lane.', color: 'var(--accent-emerald)' },
            { icon: <MapPin size={22}/>, title: 'Intelligent Routing', desc: 'Health data feeds directly into Ops Recon. Vehicles route automatically to the correct lane or reconditioning queue. Drivers receive GPS move assignments instantly.', color: 'var(--accent-cyan)' },
            { icon: <Shield size={22}/>, title: 'Arbitration Defense', desc: 'Post-sale dispute? Pull the intake scan log. Replay the inputs through the deterministic runtime — you get the exact same result. Resolved by data, not opinion.', color: '#a78bfa' },
            { icon: <Zap size={22}/>, title: 'Population Health', desc: 'Every vehicle scanned feeds the population-level dashboard. See fleet-wide trends: battery degradation patterns, regional fault clusters, seasonal failure spikes.', color: '#fb923c' },
          ].map((item, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.08 }} className="panel flex gap-4" style={{ padding: '1.5rem', alignItems: 'flex-start', borderColor: `${item.color}22` }}>
              <div style={{ padding: '10px', background: `${item.color}12`, borderRadius: '10px', color: item.color, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{item.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deterministic vs AI table */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', textAlign: 'center' }}>Why Deterministic Matters</h3>
          <table className="data-table">
            <thead><tr><th>AI-Based Systems</th><th>Lume Deterministic Runtime</th></tr></thead>
            <tbody>
              <tr><td>Probabilistic outputs vary per run</td><td style={{ color: 'var(--accent-emerald)' }}>Same inputs → same outputs, always</td></tr>
              <tr><td>Hallucination risk in edge cases</td><td style={{ color: 'var(--accent-emerald)' }}>No inference, no hallucination surface</td></tr>
              <tr><td>Audit trail: "the model decided"</td><td style={{ color: 'var(--accent-emerald)' }}>Audit trail: sensor → decision chain</td></tr>
              <tr><td>Requires retraining as data shifts</td><td style={{ color: 'var(--accent-emerald)' }}>Self-healing: detects & corrects own drift</td></tr>
              <tr><td>Black box scoring</td><td style={{ color: 'var(--accent-emerald)' }}>Every score → specific input + timestamp</td></tr>
            </tbody>
          </table>
          <p className="text-dim" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
            When a $2,500 arbitration dispute hinges on a condition report, "the AI thought" is not an acceptable answer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
