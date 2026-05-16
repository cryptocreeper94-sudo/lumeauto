import { motion } from 'framer-motion';
import { Shield, Layers, FileCheck, Globe, ArrowRight } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = '#a78bfa';
const accentDim = 'rgba(167,139,250,0.10)';
const accentBorder = 'rgba(167,139,250,0.20)';
const accentBorderHover = 'rgba(167,139,250,0.45)';

export default function TrustLayerSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Shield size={14} style={{ marginRight: 6 }} /> Commercial Verification Layer
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Trust Layer
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              The outward-facing verification system that turns internal CAL records into commercially provable certificates — giving buyers, dealers, and financing partners cryptographic confidence in every vehicle's history.
            </p>
          </motion.div>
        </div>

        {/* CAL vs Trust Layer distinction */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="panel" style={{ padding: '2.5rem', marginBottom: '3rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} /> How It Relates to CAL
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#38bdf8' }}>CAL — Internal</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The private operational ledger that Cox controls. Records every event, scan, and workflow internally. Never exposed to the outside world. The enterprise source of truth.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: accent }}>Trust Layer — External</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                The commercial verification layer that issues publicly verifiable certificates derived from CAL records. Dealers, buyers, and partners can confirm a vehicle's condition and custody history — without accessing the internal ledger.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What Trust Layer provides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            { icon: <FileCheck size={22} />, title: 'Verifiable Condition Certificates', desc: 'Every LUME-Auto scan produces a cryptographically signed certificate. Dealers and buyers can verify authenticity with a hash lookup — no login, no account, no API integration required.' },
            { icon: <Shield size={22} />, title: 'Provenance Without Exposure', desc: 'The Trust Layer proves a vehicle was scanned, by whom, and when — without revealing internal operational data, facility workflows, or proprietary diagnostics.' },
            { icon: <Globe size={22} />, title: 'Cross-Platform Portability', desc: 'Trust Layer certificates are portable across Autotrader listings, dealer management systems, and financing platforms. The verification travels with the vehicle, not the system.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: 0.15 + i * 0.08 }}
              style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${accentDim}`, borderRadius: '16px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorderHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = accentDim}>
              <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The chain of trust */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="panel" style={{ padding: '2.5rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(167,139,250,0.02) 100%)` }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: accent }}>Chain of Trust</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            {[
              { label: 'OBD-II Scan', color: 'var(--accent-cyan)' },
              { label: 'Organism Processing', color: 'var(--accent-emerald)' },
              { label: 'CAL Anchor', color: '#38bdf8' },
              { label: 'Trust Layer Certificate', color: accent },
              { label: 'Public Verification', color: '#fb923c' },
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '8px 16px', background: `${step.color}15`, border: `1px solid ${step.color}30`, borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: step.color, whiteSpace: 'nowrap' }}>
                  {step.label}
                </div>
                {i < 4 && <ArrowRight size={16} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '1.5rem auto 0', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Every certificate is traceable from the original sensor data through deterministic processing to its final anchored record — end to end, with no gaps in provenance.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
