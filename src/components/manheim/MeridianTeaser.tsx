import { motion } from 'framer-motion';
import { Radio, Lightbulb, BatteryCharging, ArrowRight, Cpu, Activity, ShieldCheck } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = '#dc2626';
const accentDim = 'rgba(220,38,38,0.10)';
const accentBorder = 'rgba(220,38,38,0.20)';
const accentBorderHover = 'rgba(220,38,38,0.45)';

export default function MeridianTeaser() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Radio size={14} style={{ marginRight: 6 }} /> Phase 3 Infrastructure Protocol
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Meridian Energy Architecture
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Deterministic wireless energy routing. Power is delivered to vehicles and lot infrastructure via targeted micro-bursts, metered in real-time, and cryptographically anchored to the private enterprise ledger.
            </p>
          </motion.div>
        </div>

        {/* What Meridian enables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <BatteryCharging size={22} />, title: 'Radiative EV Charging', desc: 'Overhead nodes deliver energy to vehicles via directed beamforming — no ground-level chargers, no cables, no physical adapters. Vehicles charge passively while parked or in transit.' },
            { icon: <Lightbulb size={22} />, title: 'Powered Lot Infrastructure', desc: 'Mobile lane signs, night lighting, and lot sensors draw power from the same overhead mesh. Infrastructure can be relocated instantly without trenching or running new electrical lines.' },
            { icon: <ShieldCheck size={22} />, title: 'Packetized Ledger Metering', desc: 'Energy is routed in discrete, timestamped packets. Every watt delivered is metered and securely signed to the CAL ledger, creating a tamper-proof, auditable history of consumption.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.1 + i * 0.08 }}
              style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${accentDim}`, borderRadius: '16px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorderHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = accentDim}>
              <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Hardware & Transmission Spec */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Engineering Blueprint Panel */}
          <div className="panel" style={{ padding: '2.25rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={20} /> Hardware & Transmission Specification
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '4px' }}>TRANSMITTER (TX)</div>
                <div style={{ color: 'var(--text-muted)' }}>Solid-state phased array anchor nodes operating in the 5.8GHz ISM band. Capable of nanosecond-level beam steering and multi-target spatial multiplexing.</div>
              </div>
              
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '4px' }}>RECEIVER (RX)</div>
                <div style={{ color: 'var(--text-muted)' }}>Vehicle-agnostic rectenna (rectifying antenna) array. Converts radiative microwave energy directly to DC current. Requires zero OEM integration—functions as an external intake plate.</div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: 'var(--text-main)', fontWeight: 600, marginBottom: '4px' }}>ENERGY PROTOCOL</div>
                <div style={{ color: 'var(--text-muted)' }}>Energy is delivered in cryptographically signed micro-bursts. The RX node acknowledges receipt, and the TX node anchors the micro-transaction to the private CAL ledger for deterministic billing.</div>
              </div>
            </div>
          </div>

          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={20} /> Operational Impact
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Manheim lots are transitioning to handle increasing EV volume. Traditional charging creates ground-level obstacles, adapter bottlenecks, and untrackable energy sinkholes. Meridian solves this architecturally:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Zero ground-level obstacles — plows and sweepers operate freely.',
                'Adapter agnostic — the rectenna normalizes the intake process.',
                'Passive charging — no employees needed to plug/unplug vehicles.',
                'Micro-transaction billing — every dealer is billed exactly what their vehicle consumed, verified by the ledger.',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0, marginTop: '6px' }} /> 
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '2.5rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(34,211,238,0.02) 100%)` }}>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Meridian is fully architected research with a dedicated engineering specification. The spatial mesh, phased-array targeting, and ledger anchoring protocols are documented for the Phase 3 rollout.
          </p>
          <a href="/meridian" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: accent, color: '#0a0a0c', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
            View Engineering Specifications <ArrowRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

