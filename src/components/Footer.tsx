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
      <div className="container" style={{ paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <a href="https://x.com/TrustSignal26" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>
          <svg width="14" height="14" viewBox="0 0 300 300" fill="currentColor" style={{ opacity: 0.85 }}><path d="M178.57 127.15 290.27 0h-26.46l-96.97 110.39L89.34 0H0l117.13 166.93L0 300.01h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.7l187.13 262.13h-40.7"/></svg>
          @TrustSignal26
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '8px', color: 'rgba(6,182,212,0.9)', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>
            <svg width="13" height="15" viewBox="0 0 24 28" fill="currentColor" style={{ opacity: 0.85 }}><path d="M12 0L2.5 5.5v5c0 .83.67 1.5 1.5 1.5h1V7.5L12 3.25 18.99 7.5V12h1c.83 0 1.5-.67 1.5-1.5v-5L12 0zM5 14v8.5c0 1.93 2.69 4.03 7 5.5 4.31-1.47 7-3.57 7-5.5V14H5zm7 11c-2.76-1.12-5-2.72-5-3.5V16h10v5.5c0 .78-2.24 2.38-5 3.5z"/></svg>
            Android — Download Now
          </a>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', fontWeight: 500 }}>
            <svg width="13" height="15" viewBox="0 0 170 200" fill="currentColor" style={{ opacity: 0.6 }}><path d="M141.04 36.57c-7.75-9.87-18.7-15.72-30.29-16.6 1.65-8.4 6.3-16.06 13.22-20.68-5.45 1.04-10.6 3.54-14.9 7.23-3.3-4.68-8.06-8.06-13.72-9.52.47 5.15 2.6 10.03 6.04 13.77-8.2-.06-16.26 2.87-22.58 8.2 5.3 2.1 11.07 2.8 16.73 2.02-4.22 5.4-6.74 12.01-7.13 18.9h10.43c.3-5.64 2.32-11.06 5.78-15.44 8.97.73 17.2 5.64 22.65 13.5L141.04 36.57zM85 62C47.55 62 17 92.55 17 130c0 24.44 12.95 45.87 32.37 57.8V200l23.08-12.7c3.95 1.1 8.1 1.7 12.4 1.7 37.45 0 68-30.55 68-68S122.45 62 85 62z"/></svg>
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
