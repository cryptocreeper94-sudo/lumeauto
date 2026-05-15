import { Link, useLocation } from 'react-router-dom';
import { Zap, Activity, Cpu } from 'lucide-react';

export default function ManheimTabs() {
  const { pathname } = useLocation();
  const tabs = [
    { path: '/manheim', label: 'Phase 1 · OBD-II Intelligence', icon: <Activity size={16} />, color: 'var(--accent-emerald)' },
    { path: '/manheim-meridian', label: 'Phase 2 · Meridian Energy', icon: <Zap size={16} />, color: '#a78bfa' },
    { path: '/manheim-engineering', label: 'Engineering Brief', icon: <Cpu size={16} />, color: 'var(--accent-cyan)' },
  ];

  return (
    <div style={{
      display: 'flex', gap: '0', borderBottom: '1px solid var(--border-light)',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
      position: 'sticky', top: '70px', zIndex: 40,
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '14px 20px', fontSize: '0.85rem', fontWeight: 600,
              letterSpacing: '0.03em', textTransform: 'uppercase',
              color: active ? tab.color : 'var(--text-dim)',
              borderBottom: active ? `2px solid ${tab.color}` : '2px solid transparent',
              background: active ? `linear-gradient(180deg, ${tab.color}08, transparent)` : 'transparent',
              transition: 'all 0.3s ease',
            }}
          >
            {tab.icon} {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
