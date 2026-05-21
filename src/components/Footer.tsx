import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useRef } from 'react';

export default function Footer() {
  const tapRef = useRef<number[]>([]);

  const handleCopyrightTap = () => {
    const now = Date.now();
    tapRef.current.push(now);
    tapRef.current = tapRef.current.filter(t => now - t < 800);
    if (tapRef.current.length >= 3) {
      tapRef.current = [];
      if ((window as any).__launchCoaster) (window as any).__launchCoaster();
    }
  };

  return (
    <footer style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-strong)', padding: '4rem 2rem 2rem', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
            <div style={{ padding: '6px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px' }}>
              <Activity size={20} color="var(--accent-cyan)" />
            </div>
            Lume Auto
          </Link>
          <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '250px', lineHeight: 1.6 }}>
            42-signal diagnostic governance, fuel coaching, and vehicle intelligence by DarkWave Studios.
          </p>
          <p className="text-dim" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
            US Provisional Patent 64/032,339
          </p>
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Platform</h4>
          <Link to="/order" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Get Lume Scan</Link>
          <Link to="/download" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Downloads</Link>
          <a href="https://lumescan.tech/explorer.html" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Scan Explorer</a>
          <a href="https://lumescan.tech" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>LumeScan.tech</a>
        </div>

        {/* Research */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Research</h4>
          <a href="https://zenodo.org/search?q=Jason%20Andrews%20DarkWave" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Published Papers</a>
          <a href="https://orcid.org/0009-0007-5214-649X" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>ORCID Profile</a>
          <a href="https://dwtl.io" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Trust Layer Ledger</a>
        </div>

        {/* Ecosystem */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ecosystem</h4>
          <a href="https://lume42.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Lume42 Labs</a>
          <a href="https://hydrocore.dev" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>HydroCore</a>
          <a href="https://axiomstudio.tech" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Axiom Studio</a>
          <a href="https://meridiancanon.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Meridian</a>
          <a href="https://verdaraultra.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Verdara Ultra</a>
          <a href="https://lume42.com/#/invest" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: '#38bdf8' }}>Signal Holdings</a>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</h4>
          <Link to="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Terms of Service</Link>
          <Link to="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Privacy Policy</Link>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>Patent 64/032,339</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Patent 64/056,378</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p className="text-dim" style={{ fontSize: '0.8rem', cursor: 'default', userSelect: 'none' }} onClick={handleCopyrightTap}>© 2026 DarkWave Studios LLC / <a href="https://lume42.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Lume42 Labs</a>. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.03em' }}>🇺🇸 Proudly made in Gladeville, TN, USA</p>
        <p className="text-dim" style={{ fontSize: '0.8rem' }}>System Status: <span style={{ color: 'var(--accent-emerald)' }}>● Operational</span></p>
      </div>
      {/* Social & App Store */}
      <div className="container" style={{ paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <a href="https://x.com/TrustSignal26" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          @TrustSignal26
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '8px', color: 'rgba(6,182,212,0.9)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 2H6.477L0 17.346l3.477 4.308L12 15.116l8.523 6.538L24 17.346zM4.193 16.5L8 6h8l3.807 10.5L12 11.192z"/></svg>
            Android — Download Now
          </a>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontWeight: 500 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            iOS — Coming Soon
          </span>
        </div>
      </div>
      <div className="container" style={{ paddingTop: '0.75rem', textAlign: 'center' }}>
        <p className="text-dim" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
          Google Play and the Google Play logo are trademarks of Google LLC. Apple and the Apple logo are trademarks of Apple Inc.
        </p>
      </div>
      <div className="container" style={{ paddingTop: '1rem' }}>
        <p className="text-dim" style={{ fontSize: '0.65rem', lineHeight: 1.6, maxWidth: '700px' }}>
          Lume Scan Pro subscriptions are billed monthly via Stripe. Your payment method is charged automatically at the start of each billing cycle. Cancel anytime — no contracts, no cancellation fees. Software purchase is non-refundable after 7 days. See <Link to="/terms" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>Terms</Link> and <Link to="/privacy" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>Privacy</Link> for details.
        </p>
      </div>
    </footer>
  );
}
