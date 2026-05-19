import { motion } from 'framer-motion';

export default function PersonalNote() {
  return (
    <section style={{ padding: '3rem 0 1rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            padding: '2.5rem',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(56,189,248,0.1)',
            borderRadius: '16px',
            position: 'relative',
          }}
        >
          {/* Subtle accent line */}
          <div style={{
            position: 'absolute', top: 0, left: '2.5rem', right: '2.5rem', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)',
          }} />

          <div style={{
            fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-cyan)', display: 'inline-block' }} />
            A Note Before You Dig In
          </div>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>
              When we first connected, I was still building. The vision was there, but not everything you're about to see was finished yet. 
              This is the full picture now — every layer, every component, and how they all fit together.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              I know this is a lot. There are a dozen sections below covering everything from the governance wrapper and the private ledger 
              to the diagnostic hardware, the operational platform, and a future wireless energy layer. Each one is its own thing — 
              you don't need to absorb it all at once.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              The short version: this is an infrastructure modernization platform built specifically for the kind of operation Manheim runs. 
              Every piece works independently, and every piece works better together. Nothing here requires replacing what you already have.
            </p>
            <p style={{ marginBottom: '0' }}>
              Take your time with it. There's also a{' '}
              <a href="/whitepaper" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', borderBottom: '1px solid rgba(56,189,248,0.3)' }}>
                full whitepaper
              </a>{' '}
              if you prefer a single document you can download and read offline. I'm available whenever you want to talk through any of it.
            </p>
          </div>

          <div style={{
            marginTop: '1.75rem', paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>— Jason</div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
