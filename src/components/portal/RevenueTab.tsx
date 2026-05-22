import { DollarSign } from 'lucide-react';

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12, padding: 16,
};

const TIERS = [
  { name: 'LumeScan Founders', price: '$9.99', monthly: '$1.99/mo', sold: '—' },
  { name: 'LumeScan Own Outright', price: '$249.00', monthly: '—', sold: '—' },
  { name: 'Mode 05 Key Unlock', price: '$199.00', monthly: '$8.99/key', sold: '—' },
  { name: 'Mode 05 Unlimited', price: '$54.99/mo', monthly: 'Recurring', sold: '—' },
];

export default function RevenueTab() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <DollarSign size={18} style={{ color: '#10b981' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Revenue</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'MRR', value: '$0.00', color: '#10b981' },
          { label: 'Total Revenue', value: '$0.00', color: '#06b6d4' },
          { label: 'Conversion Rate', value: '—', color: '#f59e0b' },
          { label: 'Churn', value: '—', color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'monospace', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <div style={card}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Active Pricing Tiers
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TIERS.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', background: 'rgba(255,255,255,0.02)',
              borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'monospace', color: '#10b981' }}>{t.price}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{t.monthly}</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>Sold: {t.sold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
