import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark)', borderTop: '1px solid var(--border-strong)', padding: '4rem 2rem 2rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
            <div style={{ padding: '6px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px' }}>
              <Activity size={20} color="var(--accent-cyan)" />
            </div>
            Lume-Auto
          </Link>
          <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '250px' }}>
            Deterministic governance and telemetry mapping for the modern internal combustion ecosystem.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Ecosystem</h4>
          <Link to="/technology" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Technology</Link>
          <Link to="/fleet" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Fleet & Family</Link>
          <Link to="/waitlist" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Hardware Waitlist</Link>
          <a href="https://axiomstudio.tech" target="_blank" rel="noreferrer" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Axiom Studio</a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Legal</h4>
          <Link to="/terms" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Terms of Service</Link>
          <Link to="/privacy" className="text-muted hover:text-cyan transition-colors" style={{ fontSize: '0.9rem' }}>Privacy Policy</Link>
          <p className="text-dim" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
            Text msg rates may apply. SMS opt-out available.
          </p>
        </div>
      </div>
      
      <div className="container flex justify-between items-center" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
        <p className="text-dim" style={{ fontSize: '0.8rem' }}>© 2026 Lume-Auto. All rights reserved.</p>
        <p className="text-dim" style={{ fontSize: '0.8rem' }}>System Status: <span style={{ color: 'var(--accent-emerald)' }}>Operational</span></p>
      </div>
    </footer>
  );
}
