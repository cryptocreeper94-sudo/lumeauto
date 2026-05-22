import { useState, useEffect } from 'react';
import { FileCheck, ExternalLink } from 'lucide-react';

export default function ContentTab() {
  const [papers, setPapers] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://zenodo.org/api/records?q=DarkWave&size=1&sort=mostrecent')
      .then(r => r.json())
      .then(d => setPapers(d?.hits?.total ?? null))
      .catch(() => {});
  }, []);

  const PATENTS = [
    '64/032,339', '64/047,512', '64/047,467', '64/047,496', '64/047,536', '64/056,378',
  ];

  const REPOS = [
    { name: 'TrustGen 3D', url: 'https://github.com/cryptocreeper94-sudo/TrustGen-3D' },
    { name: 'TrustVault', url: 'https://github.com/cryptocreeper94-sudo/TrustVault' },
    { name: 'TrustShield', url: 'https://github.com/cryptocreeper94-sudo/TrustShield' },
    { name: 'Axiom Studio', url: 'https://github.com/cryptocreeper94-sudo/Axiom-Studio' },
    { name: 'Trust Layer Hub', url: 'https://github.com/cryptocreeper94-sudo/trust-layer-hub' },
    { name: 'LumeAuto', url: 'https://github.com/cryptocreeper94-sudo/lumeauto' },
    { name: 'LumeScan', url: 'https://github.com/cryptocreeper94-sudo/lumescan' },
  ];

  const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 12, padding: 16,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <FileCheck size={18} style={{ color: '#06b6d4' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Content Audit</h2>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div style={{ ...card, textAlign: 'center', padding: '20px 16px' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: '#06b6d4' }}>
            {papers ?? '—'}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
            Research Papers
          </div>
        </div>
        <div style={{ ...card, textAlign: 'center', padding: '20px 16px' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: '#f59e0b' }}>
            {PATENTS.length}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
            Provisional Patents
          </div>
        </div>
        <div style={{ ...card, textAlign: 'center', padding: '20px 16px' }}>
          <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'monospace', color: '#10b981' }}>
            {REPOS.length}
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
            GitHub Repos
          </div>
        </div>
      </div>

      {/* Patents */}
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          Patent Applications
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PATENTS.map(p => (
            <span key={p} style={{
              fontSize: 10, fontFamily: 'monospace', padding: '4px 10px', borderRadius: 6,
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)',
              color: '#f59e0b',
            }}>
              U.S. {p}
            </span>
          ))}
        </div>
      </div>

      {/* Repos */}
      <div style={card}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          Repositories
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {REPOS.map(r => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none', color: '#e2e8f0',
              fontSize: 12, transition: 'border-color 0.2s',
            }}>
              <span style={{ fontWeight: 600 }}>{r.name}</span>
              <ExternalLink size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
