import { Link, useLocation } from 'react-router-dom';
import { Zap, Activity, Cpu } from 'lucide-react';

export default function ManheimTabs() {
  const { pathname } = useLocation();
  const isSubdomain = window.location.hostname.includes('manheim');
  const tabs = [
    { path: isSubdomain ? '/' : '/manheim', label: 'OBD-II', fullLabel: 'Phase 1 · OBD-II Intelligence', icon: <Activity size={14} />, color: 'var(--accent-emerald)' },
    { path: isSubdomain ? '/meridian' : '/manheim-meridian', label: 'Meridian', fullLabel: 'Phase 2 · Meridian Energy', icon: <Zap size={14} />, color: '#a78bfa' },
    { path: isSubdomain ? '/engineering' : '/manheim-engineering', label: 'Engineering', fullLabel: 'Engineering Brief', icon: <Cpu size={14} />, color: 'var(--accent-cyan)' },
  ];

  return (
    <div style={{
      display: 'flex', gap: '0', borderBottom: '1px solid var(--border-light)',
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)',
      position: 'sticky', top: '70px', zIndex: 40,
      overflow: 'hidden',
    }}>
      {tabs.map(tab => {
        const active = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '12px 8px', fontWeight: 600,
              letterSpacing: '0.04em', textTransform: 'uppercase',
              color: active ? tab.color : 'var(--text-dim)',
              borderBottom: active ? `2px solid ${tab.color}` : '2px solid transparent',
              background: active ? `linear-gradient(180deg, ${tab.color}0a, transparent)` : 'transparent',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              minWidth: 0,
            }}
          >
            {tab.icon}
            <span className="tab-full" style={{ fontSize: '0.8rem' }}>{tab.fullLabel}</span>
            <span className="tab-short" style={{ fontSize: '0.75rem', display: 'none' }}>{tab.label}</span>
          </Link>
        );
      })}
      <style>{`
        @media (max-width: 680px) {
          .tab-full { display: none !important; }
          .tab-short { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
