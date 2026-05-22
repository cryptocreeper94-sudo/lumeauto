import { BarChart3 } from 'lucide-react';

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12, padding: 16,
};

export default function AnalyticsTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <BarChart3 size={18} style={{ color: '#8b5cf6' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Analytics</h2>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginLeft: 'auto' }}>
          DW Beacon Aggregator
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Pageviews (24h)', value: '—', color: '#8b5cf6' },
          { label: 'Unique Visitors', value: '—', color: '#06b6d4' },
          { label: 'Top Referrer', value: '—', color: '#10b981' },
          { label: 'Bounce Rate', value: '—', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'monospace', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={card}>
        <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
          <BarChart3 size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
          <p style={{ margin: 0 }}>Analytics data will populate once the DW Beacon aggregation endpoint is connected.</p>
          <p style={{ margin: '8px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>
            Beacon is live on all 7 sites — backend aggregation pending.
          </p>
        </div>
      </div>
    </div>
  );
}
