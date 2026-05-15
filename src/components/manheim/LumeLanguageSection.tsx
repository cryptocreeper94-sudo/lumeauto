import { motion } from 'framer-motion';
import { Code2, Cpu, Shield, Layers, Zap, GitBranch } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LumeLanguageSection() {
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Foundation</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lume Is a Language.</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Not a library. Not a framework. Not an API wrapper. Lume is a deterministic programming language and runtime that compiles governance logic into synthetic organisms — self-healing systems that monitor, diagnose, and act without probabilistic inference.
          </p>
        </div>

        {/* Language features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <Code2 size={20}/>, title: 'Deterministic Compilation', desc: 'Lume source compiles to governance organisms — not executables. Same inputs always produce same outputs. No randomness, no inference, no hallucination surface.', color: '#a78bfa' },
            { icon: <Cpu size={20}/>, title: 'Synthetic Organisms', desc: 'Each organism is a living network of 42 governance nodes. Nodes monitor, cross-validate, and self-heal in real-time. An organism is not a program — it is an autonomous system.', color: 'var(--accent-emerald)' },
            { icon: <Shield size={20}/>, title: 'Safety Envelope', desc: 'Every organism runs inside a formal safety envelope. Provable bounds. If sensor data violates the envelope, the organism flags — never guesses.', color: 'var(--accent-cyan)' },
            { icon: <Layers size={20}/>, title: 'The 4/42 Fractal Law', desc: '4 layers, 42 nodes per organism. This structural ratio emerges naturally across all deterministic cognitive architectures — from vehicle diagnostics to energy routing to planetary infrastructure.', color: '#fb923c' },
            { icon: <GitBranch size={20}/>, title: 'Self-Healing Runtime', desc: 'When a node drifts or fails, the organism detects the deviation and corrects it autonomously. No retraining. No manual intervention. The system heals itself.', color: 'var(--accent-emerald)' },
            { icon: <Zap size={20}/>, title: 'Edge-Native Execution', desc: 'Organisms run on the device. No cloud dependency. No latency. A vehicle diagnosis completes in 45 seconds on a phone connected to a $25 dongle.', color: '#a78bfa' },
          ].map((feat, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.08 }} className="panel" style={{ padding: '1.75rem', borderColor: `${feat.color}22` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}44`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}22`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              <div style={{ padding: '10px', background: `${feat.color}12`, borderRadius: '10px', display: 'inline-flex', marginBottom: '0.75rem', color: feat.color }}>{feat.icon}</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{feat.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Native build callout */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', borderColor: 'rgba(167,139,250,0.25)', background: 'linear-gradient(135deg, rgba(167,139,250,0.04) 0%, transparent 100%)', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#c4b5fd' }}>A Full Native Lume Build Is Waiting in the Wings</h4>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
            The current deployment runs on React and commodity hardware to prove the concept with zero risk. Behind it sits a fully native Lume runtime — purpose-built from the compiler up — ready to deploy when the pilot validates the architecture. The React layer is the proof. The native layer is the product.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
