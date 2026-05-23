import { Hammer, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Build {
  app: string;
  platform: string;
  status: 'finished' | 'errored' | 'building';
  apkUrl?: string;
}

const BUILDS: Build[] = [
  { app: 'LumeScan', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/swv6JsxEjzQkSbDjyBJN8e.apk' },
  { app: 'TrustGen 3D', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/bkvKG3NCC8zy4evZWGRTqq.apk' },
  { app: 'TrustVault', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/aS4WBJS7XXuWWgD4oTJRt3.apk' },
  { app: 'TrustShield', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/7DWBLv9z2zBxYmKCX99cVv.apk' },
  { app: 'Axiom Studio', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/2S7BR72a27XskKHNKse9p2.apk' },
  { app: 'Trust Layer Hub', platform: 'android', status: 'finished', apkUrl: 'https://expo.dev/artifacts/eas/uMa4aF2vVyLVUWWqpqzR72.apk' },
];

export default function BuildsTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Hammer size={18} style={{ color: '#f59e0b' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Build Status</h2>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginLeft: 'auto' }}>
          EAS Cloud Builds
        </span>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12, overflow: 'hidden',
      }}>
        {BUILDS.map((b, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
            borderBottom: i < BUILDS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            {b.status === 'finished' ? <CheckCircle size={14} style={{ color: '#10b981', flexShrink: 0 }} /> :
             b.status === 'errored' ? <XCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} /> :
             <Clock size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{b.app}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                {b.platform} · {b.status}
              </div>
            </div>
            {b.apkUrl && (
              <a href={b.apkUrl} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 10, padding: '4px 10px', borderRadius: 6,
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)',
                color: '#06b6d4', textDecoration: 'none', fontWeight: 600,
              }}>
                Download APK
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
