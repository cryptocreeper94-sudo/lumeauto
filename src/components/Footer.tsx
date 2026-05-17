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
            Lume-Auto
          </Link>
          <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '250px', lineHeight: 1.6 }}>
            Deterministic governance and telemetry mapping for the modern internal combustion ecosystem.
          </p>
          <p className="text-dim" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
            US Provisional Patent 64/032,339
          </p>
        </div>

        {/* Ecosystem */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ecosystem</h4>
          <Link to="/technology" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Technology</Link>
          <Link to="/fleet" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Fleet & Family</Link>
          <Link to="/waitlist" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Hardware Waitlist</Link>
          <Link to="/blog" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Journal</Link>
        </div>

        {/* Network */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Network</h4>
          <a href="https://axiomstudio.tech" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Axiom Studio</a>
          <a href="https://meridiancanon.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Meridian Canon</a>
          <a href="https://hydrocore.dev" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>HydroCore</a>
          <a href="https://zenodo.org/search?q=Jason%20Andrews%20DarkWave" target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Published Research</a>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</h4>
          <Link to="/terms" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Terms of Service</Link>
          <Link to="/privacy" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Privacy Policy</Link>
          <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
            SMS: Msg & data rates may apply.<br />Reply STOP to opt-out at any time.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p className="text-dim" style={{ fontSize: '0.8rem', cursor: 'default', userSelect: 'none' }} onClick={handleCopyrightTap}>© 2026 DarkWave Studios LLC / Lume42 Labs. All rights reserved.</p>
        <p className="text-dim" style={{ fontSize: '0.8rem' }}>System Status: <span style={{ color: 'var(--accent-emerald)' }}>● Operational</span></p>
      </div>
    </footer>
  );
}
