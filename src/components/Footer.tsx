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
      <div className="container" style={{ paddingTop: '1rem' }}>
        <p className="text-dim" style={{ fontSize: '0.65rem', lineHeight: 1.6, maxWidth: '700px' }}>
          Lume Scan Pro subscriptions are billed monthly via Stripe. Your payment method is charged automatically at the start of each billing cycle. Cancel anytime — no contracts, no cancellation fees. Software purchase is non-refundable after 7 days. See <Link to="/terms" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>Terms</Link> and <Link to="/privacy" style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem' }}>Privacy</Link> for details.
        </p>
      </div>
    </footer>
  );
}
