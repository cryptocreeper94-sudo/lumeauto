import { motion } from 'framer-motion';
import { Zap, Radio, Lightbulb, BatteryCharging, ArrowRight, Layers } from 'lucide-react';

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
              <Radio size={14} style={{ marginRight: 6 }} /> Future Infrastructure Layer
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Meridian
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Deterministic wireless energy routing — a system that delivers power to vehicles and lot infrastructure the same way the internet delivers data: routed, metered, and cryptographically verified.
            </p>
          </motion.div>
        </div>

        {/* What Meridian enables */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <BatteryCharging size={22} />, title: 'Wireless EV Charging', desc: 'Overhead anchor nodes deliver energy to vehicles on the lot — no ground-level chargers, no cables, no adapters. Vehicles charge passively while parked, waiting for auction, or in transit between lanes. Adapter-agnostic by design.' },
            { icon: <Lightbulb size={22} />, title: 'Powered Lot Infrastructure', desc: 'The same energy routing system that charges vehicles can power mobile lane signs, night lighting, digital signage, and IoT sensors anywhere on the lot — without running new electrical. Infrastructure that moves when the lot layout changes.' },
            { icon: <Zap size={22} />, title: 'Cryptographic Energy Metering', desc: 'Every watt delivered is metered, timestamped, and anchored to CAL. Energy billing is deterministic and verifiable. No estimated usage, no disputed invoices — the ledger records exactly what was consumed, by what, and when.' },
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

        {/* How it connects */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.25rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Layers size={20} /> How Meridian Integrates
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Meridian is not a separate system — it is another organism running on the same Lume runtime, governed by the same deterministic rules, and anchored to the same CAL ledger:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Same 4/42 fractal organism architecture',
                'Energy routing governed by LUME-V',
                'Every transaction anchored to CAL',
                'Trust Layer certificates for energy billing',
                'Lot Ops Pro coordinates charging schedules',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={20} /> Why This Matters for Manheim
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Manheim lots are already transitioning to handle increasing EV volume. Current charging infrastructure creates ground-level obstacles, adapter compatibility issues, and unmetered energy consumption:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Eliminates ground-level charging obstacles on auction lots',
                'No adapter compatibility issues — energy routing is universal',
                'Vehicles charge while waiting — no dedicated charging time',
                'Mobile signage and lighting without electrical runs',
                'Energy costs are auditable down to the individual vehicle',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '2.5rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(129,140,248,0.02) 100%)` }}>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Meridian is published research with a dedicated architecture specification. The energy routing organisms are designed and documented — this is the next deployment phase after the diagnostic and operational layers are proven in production.
          </p>
          <a href="/meridian" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: accent, color: '#0a0a0c', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
            Full Meridian Documentation <ArrowRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
