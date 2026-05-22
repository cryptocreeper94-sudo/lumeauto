import { useState } from 'react';
import { X, Package, Activity, BarChart3, DollarSign, Hammer, FileCheck } from 'lucide-react';
import OrdersTab from './portal/OrdersTab';
import HealthTab from './portal/HealthTab';
import AnalyticsTab from './portal/AnalyticsTab';
import RevenueTab from './portal/RevenueTab';
import BuildsTab from './portal/BuildsTab';
import ContentTab from './portal/ContentTab';

const TABS = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'health', label: 'Health', icon: Activity },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'revenue', label: 'Revenue', icon: DollarSign },
  { id: 'builds', label: 'Builds', icon: Hammer },
  { id: 'content', label: 'Content', icon: FileCheck },
] as const;

type TabId = typeof TABS[number]['id'];

export default function DevPortal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<TabId>('orders');

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, sans-serif", color: '#e2e8f0',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', borderBottom: '1px solid rgba(6,182,212,0.15)',
        background: 'rgba(6,182,212,0.03)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #0891b2, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Activity size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', color: '#06b6d4' }}>
              COMMAND CENTER
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
              DarkWave Ecosystem · Federated Dashboard
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8',
        }}>
          <X size={18} />
        </button>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex', gap: 2, padding: '0 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.3)', overflowX: 'auto',
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '12px 16px', fontSize: 12, fontWeight: 600,
            color: tab === t.id ? '#06b6d4' : 'rgba(255,255,255,0.4)',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderBottom: tab === t.id ? '2px solid #06b6d4' : '2px solid transparent',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        {tab === 'orders' && <OrdersTab />}
        {tab === 'health' && <HealthTab />}
        {tab === 'analytics' && <AnalyticsTab />}
        {tab === 'revenue' && <RevenueTab />}
        {tab === 'builds' && <BuildsTab />}
        {tab === 'content' && <ContentTab />}
      </div>
    </div>
  );
}
