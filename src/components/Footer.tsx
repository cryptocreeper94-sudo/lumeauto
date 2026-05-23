import { Link } from 'react-router-dom';
import { Activity, Shield } from 'lucide-react';
import { useRef, useState } from 'react';
import DevPortal from './DevPortal';

export default function Footer() {
  const tapRef = useRef<number[]>([]);
  const shieldTapRef = useRef<number[]>([]);
  const [showPin, setShowPin] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleCopyrightTap = () => {
    const now = Date.now();
    tapRef.current.push(now);
    tapRef.current = tapRef.current.filter(t => now - t < 800);
    if (tapRef.current.length >= 3) {
      tapRef.current = [];
      if ((window as any).__launchCoaster) (window as any).__launchCoaster();
    }
  };

  const handleShieldTap = () => {
    const now = Date.now();
    shieldTapRef.current.push(now);
    shieldTapRef.current = shieldTapRef.current.filter(t => now - t < 800);
    if (shieldTapRef.current.length >= 3) {
      shieldTapRef.current = [];
      setShowPin(true);
      setPinValue('');
      setPinError(false);
    }
  };

  const handlePinSubmit = () => {
    if (pinValue === '0424') {
      setShowPin(false);
      setShowPortal(true);
    } else {
      setPinError(true);
      setPinValue('');
      setTimeout(() => setPinError(false), 600);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <p className="text-dim" style={{ fontSize: '0.8rem', margin: 0 }}>System Status: <span style={{ color: 'var(--accent-emerald)' }}>● Operational</span></p>
          <Shield size={14} style={{ color: 'rgba(255,255,255,0.12)', cursor: 'default', userSelect: 'none' }} onClick={handleShieldTap} />
        </div>
      </div>
      {/* Social & App Store */}
      <div className="container" style={{ paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* X/Twitter — round ghost button */}
        <a href="https://x.com/TrustSignal26" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 300 300" fill="currentColor"><path d="M178.57 127.15 290.27 0h-26.46l-96.97 110.39L89.34 0H0l117.13 166.93L0 300.01h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.7l187.13 262.13h-40.7"/></svg>
        </a>
        {/* Google Play badge */}
        <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '8px', color: '#fff', textDecoration: 'none', transition: 'all 0.2s' }}>
          <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="none">
            <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" fill="#06b6d4"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>GET IT ON</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>Google Play</span>
          </div>
        </a>
        {/* Apple badge — Coming Soon */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.35)', cursor: 'default' }}>
          <svg width="16" height="20" viewBox="0 0 170 200" fill="currentColor" style={{ opacity: 0.6 }}>
            <path d="M119.24 7.52c-5.42 6.32-14.28 11.2-22.79 10.56C95.35 9.27 100.56 2.99 106.14.13c5.47-2.78 15.07-4.21 22.03 2.5-2.18 1.54-8.93 4.89-8.93 4.89z"/>
            <path d="M127.67 48.87c.15 17.26 15.15 23.01 15.31 23.08-.13.41-2.39 8.18-7.89 16.22-4.75 6.95-9.68 13.87-17.45 14.01-7.63.14-10.08-4.52-18.8-4.52s-11.73 4.38-18.92 4.66c-7.5.28-13.21-7.51-18-14.44-9.78-14.16-17.26-40.02-7.22-57.49 4.98-8.67 13.88-14.16 23.55-14.31 7.36-.14 14.3 4.95 18.8 4.95 4.51 0 12.97-6.13 21.85-5.23 3.72.16 14.17 1.5 20.88 11.32-1.81 1.12-12.11 7.25-11.98 21.62l-.13.13z"/>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{ fontSize: '0.55rem', opacity: 0.7, fontWeight: 400 }}>COMING SOON ON</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>App Store</span>
          </div>
        </span>
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

      {/* PIN Modal */}
      {showPin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99998 }} onClick={() => setShowPin(false)}>
          <div style={{ background: '#0a0a1a', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 16, padding: 32, textAlign: 'center', minWidth: 280 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 12, color: '#06b6d4', marginBottom: 16, letterSpacing: '3px' }}>AUTHENTICATION REQUIRED</div>
            <input
              type="password" maxLength={4} autoFocus
              value={pinValue}
              onChange={e => setPinValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handlePinSubmit()}
              style={{
                background: 'rgba(6,182,212,0.05)', border: `1px solid ${pinError ? '#f43f5e' : 'rgba(6,182,212,0.2)'}`,
                borderRadius: 8, padding: 12, color: '#fff', fontSize: 24, textAlign: 'center',
                width: 120, letterSpacing: 8, outline: 'none', transition: 'border-color 0.2s',
              }}
            />
            <div style={{ marginTop: 12, fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Enter PIN to continue</div>
          </div>
        </div>
      )}

      {/* Dev Portal */}
      {showPortal && <DevPortal onClose={() => setShowPortal(false)} />}
    </footer>
  );
}
