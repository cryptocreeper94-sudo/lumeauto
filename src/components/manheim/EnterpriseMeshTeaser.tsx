import { motion } from 'framer-motion';
import { Globe, Lock, Link2, ShieldCheck } from 'lucide-react';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = '#7c3aed';
const accentDim = 'rgba(124,58,237,0.10)';
const accentBorder = 'rgba(124,58,237,0.20)';
const accentBorderHover = 'rgba(124,58,237,0.45)';

export default function EnterpriseMeshTeaser() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -50%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Globe size={14} style={{ marginRight: 6 }} /> Future Vision Layer
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Enterprise Mesh
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>
              When every company in the automotive ecosystem operates its own sovereign, private ledger — and those ledgers can verify shared assets without sharing data — the network becomes the infrastructure.
            </p>
          </motion.div>
        </div>

        {/* No public blockchain callout */}
        <motion.div {...fadeIn} transition={{ delay: 0.05 }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          padding: '14px 24px', background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(124,58,237,0.15)', borderRadius: '12px',
          marginBottom: '2.5rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto',
        }}>
          <Lock size={18} style={{ color: accent, flexShrink: 0 }} />
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-main)' }}>No public blockchain. No cryptocurrency. No tokens.</strong>{' '}
            Every chain in the mesh is a private, permissioned network owned and controlled exclusively by the enterprise that operates it. Data never touches a public ledger.
          </p>
        </motion.div>

        {/* Three feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {[
            {
              icon: <ShieldCheck size={22} />,
              title: 'Sovereign Chains',
              desc: 'Every enterprise in the Cox ecosystem — Manheim, transport vendors, reconditioning partners — operates its own private, permissioned ledger. Completely separate infrastructure. No shared databases, no shared risk, no external visibility. Each company controls their own chain, their own data, and their own access policies.'
            },
            {
              icon: <Link2 size={22} />,
              title: 'Verified Without Exposure',
              desc: 'Two private ledgers verify a shared asset using only cryptographic proofs — SHA-256 hashes, timestamps, and custody signatures. Neither party sees the other\'s internal records, pricing, or employee data. Custody disputes resolved through mathematical proof, not litigation or manual reconciliation.'
            },
            {
              icon: <Globe size={22} />,
              title: 'Industry Standard',
              desc: 'The same private ledger infrastructure Manheim deploys in this pilot becomes the template for the entire Cox Automotive vendor network. First mover defines the standard. Transport partners, reconditioning vendors, and dealers connect through the mesh — each on their own sovereign system, never on a shared one.'
            },
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

        {/* How it connects — two panels */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.25rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> How the Mesh Works
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Each enterprise runs its own private Proof-of-Authority chain — completely isolated, completely controlled. The Bridge Service connects them through cryptographic proofs only:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Manheim anchors a condition report to its private ledger',
                'Transport vendor anchors a pickup event to their private ledger',
                'Bridge verifies: same asset, same custody chain, matching timestamps',
                'Both parties confirm — neither sees the other\'s internal data',
                'Zero data exchange. Proofs only. Hashes, not records.',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} /> What This Is Not
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              The Enterprise Mesh is private infrastructure — not a public blockchain product. Every design decision reinforces this distinction:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'No public blockchain — every chain is private and permissioned',
                'No cryptocurrency or tokens — this is operational infrastructure',
                'No shared database — each company owns their data exclusively',
                'No external visibility — nothing is readable outside the network',
                'No consensus mining — Proof-of-Authority with known validators',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Closing callout */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '2.5rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(129,140,248,0.02) 100%)` }}>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            The pilot you are evaluating today is Phase 1 of a network that scales to every node in the automotive supply chain — without requiring any participant to expose their internal data, connect to a public network, or share a database with anyone. Each company gets their own sovereign system. The mesh connects them through proofs, not data.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', margin: 0, letterSpacing: '0.05em' }}>
            PRIVATE INFRASTRUCTURE · SOVEREIGN CHAINS · ZERO PUBLIC EXPOSURE
          </p>
        </motion.div>

      </div>
    </section>
  );
}
