import { useState, useEffect } from 'react';
import { Package, CreditCard, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  email: string;
  product: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded' | 'cancelled';
  date: string;
  type: 'purchase' | 'subscription' | 'key_unlock';
}

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12, padding: 16,
};

const statCard: React.CSSProperties = {
  ...card, textAlign: 'center', padding: '20px 16px',
};

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from Stripe webhook endpoint when available
    // For now, show demo pipeline structure
    setTimeout(() => {
      setOrders([
        { id: 'ord_demo_001', email: 'demo@example.com', product: 'LumeScan Founders', amount: 9.99, status: 'completed', date: new Date().toISOString(), type: 'purchase' },
        { id: 'sub_demo_001', email: 'demo2@example.com', product: 'LumeScan Pro Monthly', amount: 1.99, status: 'pending', date: new Date().toISOString(), type: 'subscription' },
        { id: 'key_demo_001', email: 'demo3@example.com', product: 'Mode 05 Key Unlock', amount: 199.00, status: 'completed', date: new Date().toISOString(), type: 'key_unlock' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const statusIcon = (s: Order['status']) => {
    if (s === 'completed') return <CheckCircle size={14} style={{ color: '#10b981' }} />;
    if (s === 'pending') return <Clock size={14} style={{ color: '#f59e0b' }} />;
    if (s === 'refunded') return <RefreshCw size={14} style={{ color: '#6366f1' }} />;
    return <AlertTriangle size={14} style={{ color: '#ef4444' }} />;
  };

  const stats = {
    total: orders.length,
    revenue: orders.filter(o => o.status === 'completed').reduce((a, o) => a + o.amount, 0),
    pending: orders.filter(o => o.status === 'pending').length,
    subs: orders.filter(o => o.type === 'subscription').length,
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <Package size={18} style={{ color: '#06b6d4' }} />
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Order Pipeline</h2>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginLeft: 'auto' }}>
          Stripe Webhook Feed
        </span>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Total Orders', value: stats.total, color: '#06b6d4' },
          { label: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, color: '#10b981' },
          { label: 'Pending', value: stats.pending, color: '#f59e0b' },
          { label: 'Active Subs', value: stats.subs, color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} style={statCard}>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'monospace', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Order List */}
      <div style={card}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: 8 }}>Loading order pipeline...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            No orders yet — connect Stripe webhook to see live data
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {orders.map(o => (
              <div key={o.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {statusIcon(o.status)}
                  <CreditCard size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {o.product}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                    {o.email} · {o.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: '#10b981' }}>
                    ${o.amount.toFixed(2)}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                    {o.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
