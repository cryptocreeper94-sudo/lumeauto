import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, BookOpen, FileText, Globe, Shield } from 'lucide-react';
import ROICalculator from '../ROICalculator';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function EcosystemCTA() {
  return (
    <>
      {/* Academic Foundation */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, rgba(167,139,250,0.03) 0%, var(--bg-dark) 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Academic Foundation</p>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Published. Patented. Peer-Reviewed.</h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              This is not a startup pitch deck. The Lume ecosystem is backed by 96 published academic papers across three canon series, 6 pending patent applications, and a collected edition published on Zenodo.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {[
              { title: 'Canon 1', sub: 'Lume Language & Trust Layer', papers: '42 papers', desc: 'Deterministic compilation, governance organisms, the 4/42 fractal law, trust layer cryptography.', color: 'var(--accent-emerald)' },
              { title: 'Canon 2', sub: 'DAIGS & Synthetic Organisms', papers: '31 papers', desc: 'Deterministic AI governance systems, organism architecture, self-healing runtime, planetary-scale systems.', color: 'var(--accent-cyan)' },
              { title: 'Canon 3', sub: 'Meridian Energy Architecture', papers: '10 papers + collected edition', desc: 'Wireless energy routing, anchor nodes, beam geometry, the Energy Internet protocol stack.', color: '#a78bfa' },
            ].map((canon, i) => (
              <motion.div key={i} {...f} transition={{ delay: i * 0.1 }} className="panel" style={{ padding: '1.75rem', borderColor: `${canon.color}22` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: canon.color }}>{canon.title}</h4>
                  <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '10px', background: `${canon.color}12`, color: canon.color, fontWeight: 600 }}>{canon.papers}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{canon.sub}</div>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{canon.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Patent bar */}
          <motion.div {...f} className="panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', borderColor: 'rgba(251,146,60,0.2)', background: 'rgba(251,146,60,0.02)' }}>
            {[
              { icon: <FileText size={16}/>, label: 'U.S. Patent 64/032,339', desc: 'Lume Deterministic Governance' },
              { icon: <FileText size={16}/>, label: 'U.S. Patent 64/056,378', desc: 'Meridian Energy Architecture' },
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
              { label: 'Zenodo Archive', href: 'https://zenodo.org/communities/meridian-canon', icon: <BookOpen size={14}/> },
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
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Adjust the sliders to see what deterministic vehicle intelligence looks like at your scale.</p>
          </div>
          <ROICalculator />

          <motion.div {...f} style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p className="text-muted" style={{ fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              This platform is launching publicly. The architecture is proven. The papers are published. The patents are filed. The only question is who deploys it first.
            </p>
            <a href="mailto:team@dwsc.io" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, var(--accent-emerald), #059669)', color: '#fff', border: 'none', borderRadius: '10px', boxShadow: '0 8px 30px rgba(16,185,129,0.3)' }}>
              Start the Conversation <ArrowRight size={20} />
            </a>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.25rem' }}>
              Ronald Jason Andrews · DarkWave Studios LLC / Lume42 Labs · 6 U.S. Provisional Patents Pending
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
