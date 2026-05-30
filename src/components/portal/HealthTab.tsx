import { useState, useEffect } from 'react';
import { Globe, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const DOMAINS = [
  { name: 'Lume Auto', domain: 'lumeauto.tech', type: 'Consumer' },
  { name: 'Lume Scan', domain: 'lumescan.tech', type: 'Consumer' },
  { name: 'DarkWave Studios', domain: 'darkwavestudios.io', type: 'Corporate' },
  { name: 'Trust Layer', domain: 'dwtl.io', type: 'Infrastructure' },
  { name: 'Axiom Studio', domain: 'axiomstudio.dev', type: 'AI Platform' },
  { name: 'TrustGen 3D', domain: 'trustgen.design', type: 'Creative' },
  { name: 'TrustVault', domain: 'trustvault.studio', type: 'Media Vault' },
  { name: 'TrustShield', domain: 'trustshield.tech', type: 'Security' },
  { name: 'Meridian Canon', domain: 'meridiancanon.com', type: 'Consumer' },
  { name: 'Verdara Ultra', domain: 'verdaraultra.com', type: 'Consumer' },
  { name: 'HydroCore', domain: 'hydrocore.dev', type: 'R&D' },
  { name: 'Lume42 Labs', domain: 'lume42.com', type: 'R&D' },
  { name: 'TLID', domain: 'tlid.io', type: 'Infrastructure' },
  { name: 'DWSC', domain: 'dwsc.io', type: 'Research' },

  { name: 'EMP Demo', domain: 'emp.tlid.io', type: 'Enterprise' },
  { name: 'Axiom Studio', domain: 'axiomstudio.tech', type: 'AI Platform' },
  { name: 'DW Pulse', domain: 'pulse.darkwavestudios.io', type: 'Analytics' },
];

interface SiteStatus { domain: string; status: 'up' | 'down' | 'checking'; ms?: number }

export default function HealthTab() {
  const [sites, setSites] = useState<SiteStatus[]>(
    DOMAINS.map(d => ({ domain: d.domain, status: 'checking' }))
  );
  const [scanning, setScanning] = useState(false);

  const runHealthCheck = async () => {
    setScanning(true);
    setSites(DOMAINS.map(d => ({ domain: d.domain, status: 'checking' })));

    for (let i = 0; i < DOMAINS.length; i++) {
      const d = DOMAINS[i];
      const start = performance.now();
      try {
        await fetch(`https://${d.domain}`, { mode: 'no-cors', signal: AbortSignal.timeout(5000) });
        const ms = Math.round(performance.now() - start);
        setSites(prev => prev.map(s => s.domain === d.domain ? { ...s, status: 'up', ms } : s));
      } catch {
        setSites(prev => prev.map(s => s.domain === d.domain ? { ...s, status: 'down' } : s));
      }
    }
    setScanning(false);
  };

  useEffect(() => { runHealthCheck(); }, []);

  const upCount = sites.filter(s => s.status === 'up').length;
  const downCount = sites.filter(s => s.status === 'down').length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Globe size={18} style={{ color: '#10b981' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Ecosystem Health</h2>
        <button onClick={runHealthCheck} disabled={scanning} style={{
          marginLeft: 'auto', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: 6, padding: '6px 12px', fontSize: 11, color: '#06b6d4', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <RefreshCw size={12} style={{ animation: scanning ? 'spin 1s linear infinite' : 'none' }} />
          {scanning ? 'Scanning...' : 'Rescan'}
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{
          padding: '8px 16px', borderRadius: 8, background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.2)', fontSize: 12, color: '#10b981', fontWeight: 600,
        }}>
          ✓ {upCount} Up
        </div>
        {downCount > 0 && (
          <div style={{
            padding: '8px 16px', borderRadius: 8, background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)', fontSize: 12, color: '#ef4444', fontWeight: 600,
          }}>
            ✗ {downCount} Down
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {DOMAINS.map((d, i) => {
          const s = sites.find(x => x.domain === d.domain);
          return (
            <a key={i} href={`https://${d.domain}`} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s',
            }}>
              {s?.status === 'up' ? <CheckCircle size={14} style={{ color: '#10b981', flexShrink: 0 }} /> :
               s?.status === 'down' ? <XCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} /> :
               <RefreshCw size={14} style={{ color: '#64748b', flexShrink: 0, animation: 'spin 1s linear infinite' }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {d.name}
                </div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                  {d.domain}
                </div>
              </div>
              {s?.ms && (
                <span style={{ fontSize: 10, color: s.ms < 1000 ? '#10b981' : '#f59e0b', fontFamily: 'monospace' }}>
                  {s.ms}ms
                </span>
              )}
              <span style={{
                fontSize: 8, padding: '2px 6px', borderRadius: 4,
                background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)',
              }}>{d.type}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
