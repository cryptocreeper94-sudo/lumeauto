import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, FileText, Globe, Shield } from 'lucide-react';
import ROICalculator from '../ROICalculator';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function EcosystemCTA() {
  return (
    <>
      {/* Academic Foundation */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, rgba(167,139,250,0.03) 0%, var(--bg-dark) 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Academic Foundation</p>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Published. Patented. Research-Backed.</h2>
            <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', lineHeight: 1.7 }}>
              Every core technology in this platform is documented in published research with verifiable DOIs on Zenodo and backed by 6 pending U.S. patent applications. The following papers are directly relevant to the systems described in this presentation.
            </p>
          </div>

          {/* Relevant Papers — individually verified */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { title: 'Lume: A Deterministic Natural-Language Programming Language', sub: 'The core language and compiler powering the 42-node governance organisms, trust certificates, and deterministic intent resolution.', doi: '10.5281/zenodo.19382282', version: 'v6 · April 2026', color: 'var(--accent-emerald)', relevance: 'Core substrate for all platform governance' },
              { title: 'Lume-V: Deterministic Governance for Non-Deterministic AI Systems', sub: 'The verification wrapper that validates, certifies, and arbitrates AI outputs before they reach downstream systems. 10-layer architecture with Ed25519-signed trust certificates.', doi: '10.5281/zenodo.19645097', version: 'v1 · 2026', color: 'var(--accent-cyan)', relevance: 'Directly deployed as the verification layer' },
              { title: 'DAIGS: Deterministic Autonomous Infrastructure Governance System', sub: 'The multi-vertical governance framework defining Lume-Auto (vehicle systems), deterministic state models, invariant engines, and certificate fabrics across 23 infrastructure verticals.', doi: '10.5281/zenodo.19491784', version: 'v3 · 2026', color: 'var(--accent-cyan)', relevance: 'Defines the Lume-Auto vertical used here' },
              { title: 'The Routed World — Meridian and Deterministic Physical Infrastructure', sub: 'Collected edition of the Meridian Canon: deterministic wireless energy routing, anchor node architecture, and the theory of Deterministic Infrastructure.', doi: '10.5281/zenodo.20028362', version: 'First Edition · May 2026', color: '#dc2626', relevance: 'Foundation for the Meridian charging system' },
            ].map((paper, i) => (
              <motion.div key={i} {...f} transition={{ delay: i * 0.08 }} className="panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1rem', color: paper.color, flex: 1, minWidth: '200px' }}>{paper.title}</h4>
                  <span style={{ fontSize: '0.6rem', padding: '3px 8px', borderRadius: '8px', background: `${paper.color}12`, color: paper.color, fontWeight: 600, whiteSpace: 'nowrap' }}>{paper.version}</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.6rem' }}>{paper.sub}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener" style={{ fontSize: '0.68rem', color: paper.color, fontFamily: 'var(--font-mono)', opacity: 0.8 }}>
                    DOI: {paper.doi} ↗
                  </a>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>{paper.relevance}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Patent bar */}
          <motion.div {...f} className="panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: <FileText size={16}/>, label: 'U.S. Provisional 64/032,339', desc: 'Lume Deterministic Governance' },
              { icon: <FileText size={16}/>, label: 'U.S. Provisional 64/056,378', desc: 'Meridian Energy Architecture' },
              { icon: <Shield size={16}/>, label: '4 Additional Filings', desc: 'Runtime, Dongle, Organisms, Trust Layer' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ color: '#fb923c', flexShrink: 0, marginTop: 2 }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fb923c' }}>{p.label}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* External links */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Lume Core · DOI', href: 'https://doi.org/10.5281/zenodo.19382282', icon: <BookOpen size={14}/> },
              { label: 'Zenodo Archive', href: 'https://zenodo.org/communities/meridian-canon', icon: <BookOpen size={14}/> },
              { label: 'TrustShield', href: 'https://trustshield.tech', icon: <Globe size={14}/> },
              { label: 'MeridianCanon.com', href: 'https://meridiancanon.com', icon: <Globe size={14}/> },
              { label: 'ORCID Profile', href: 'https://orcid.org/0009-0007-5214-649X', icon: <ExternalLink size={14}/> },
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px solid var(--border-light)', borderRadius: '8px', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.4)'; (e.currentTarget as HTMLElement).style.color = '#c4b5fd'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}>
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ROI + CTA */}
      <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>The Numbers</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Adjust the parameters to model deterministic vehicle intelligence at different scales.</p>
          </div>
          <ROICalculator />

          <motion.div {...f} style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              The system is built. The research is published. The patents are filed. The governance layer and ledger are deployed. The operational platform is ready for pilot validation.
            </p>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '2rem' }}>
              © 2026 DarkWave Studios LLC / Lume42 Labs · 6 U.S. Provisional Patents Pending · Published Research on Zenodo
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
