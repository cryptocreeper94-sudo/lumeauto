import { motion } from 'framer-motion';
import { Link2, ShieldCheck, Lock, Server, FileCheck, Globe, Fingerprint } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = '#38bdf8';  // Sky blue — matches ledger dashboard
const accentDim = 'rgba(56,189,248,0.12)';
const accentBorder = 'rgba(56,189,248,0.25)';
const accentBorderHover = 'rgba(56,189,248,0.5)';

export default function CoxLedgerSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Subtle chain-link pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg, ${accent}44 0px, transparent 2px, transparent 20px, ${accent}44 22px)`, backgroundSize: '30px 30px' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', width: '900px', height: '900px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -40%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Link2 size={14} style={{ marginRight: 6 }} /> Private Enterprise Ledger
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Cox Automotive Ledger
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.7 }}>
              A private, permissioned cryptographic ledger built exclusively for the Cox Automotive ecosystem. Every vehicle scan, custody transfer, and condition report receives a cryptographically sealed certificate on an immutable record that Cox controls.
            </p>
          </motion.div>
        </div>

        {/* What It Records */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { icon: <Fingerprint size={22} />, title: 'Vehicle Custody Chain', desc: 'Every handoff — intake to lot, lot to lane, lane to transport — is recorded as a signed, timestamped transition. The full chain of custody is provable and immutable.' },
            { icon: <FileCheck size={22} />, title: 'Condition Certificates', desc: 'OBD-II scan results from Lume-Auto are sealed on-ledger at the moment of diagnosis. The same data that generated the report is cryptographically bound to it — forever.' },
            { icon: <ShieldCheck size={22} />, title: 'Arbitration Defense', desc: 'When a dispute arises, the ledger provides deterministic replay. Same inputs, same organism, same result — backed by a cryptographic proof that the data was never altered.' },
          ].map((item, i) => (
            <motion.div key={i} {...fadeIn} transition={{ delay: i * 0.1 }}
              style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: `1px solid ${accentDim}`, borderRadius: '16px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = accentBorderHover}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = accentDim}>
              <div style={{ color: accent, marginBottom: '1rem' }}>{item.icon}</div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Private */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.5rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> Why a Private Ledger
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Public distributed ledgers are designed for trustless environments. Cox Automotive is not a trustless environment — it is a known network of verified facilities, employees, and systems. A private ledger delivers the same immutability and auditability guarantees without the latency, transaction costs, or data exposure of public networks.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Zero gas fees — no per-transaction cost',
                'Sub-second finality — no mining delays',
                'Complete data privacy — nothing leaves the Cox network',
                'Permissioned validators — only authorized facilities'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel" style={{ padding: '2.5rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} /> Enterprise Scalability
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
              The Cox Automotive Ledger is not limited to Manheim. The same private infrastructure can extend across the entire Cox Automotive portfolio — providing a unified, cryptographically verified data layer wherever vehicles are bought, sold, serviced, or financed.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Manheim — auction integrity and custody',
                'Autotrader — verified listing provenance',
                'Kelley Blue Book — cryptographic valuation anchoring',
                'Dealer.com — dealership transaction ledger',
                'NextGear Capital — financing audit trail'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '3rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(56,189,248,0.02) 100%)`, boxShadow: `0 10px 40px ${accentDim}` }}>
          <Server size={28} style={{ color: accent, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: accent }}>Your Data. Your Network. Your Ledger.</h3>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The Cox Automotive Ledger runs on infrastructure that Cox controls. Every facility becomes a validator node. Every vehicle event becomes an immutable record. Every dispute becomes a data problem with a provable answer — not a he-said-she-said negotiation.
          </p>
          <a href="https://cal.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: accent, color: '#0a0c10', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 4px 20px ${accentDim}` }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <Link2 size={16} /> Launch Block Explorer
          </a>
        </motion.div>

      </div>
    </section>
  );
}
