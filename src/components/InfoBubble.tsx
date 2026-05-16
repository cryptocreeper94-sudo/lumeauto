import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface InfoBubbleProps {
  title: string;
  children: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
}

/**
 * Contextual info bubble — inline expandable tooltip.
 * Tap/click to expand, tap again or X to close.
 */
export default function InfoBubble({ title, children, color = 'var(--accent-cyan)', icon }: InfoBubbleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={title}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          background: open ? `${color}15` : 'transparent',
          border: `1px solid ${open ? `${color}40` : `${color}20`}`,
          borderRadius: '20px', padding: '5px 12px',
          color, cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.04em', transition: 'all 0.2s',
        }}
      >
        {icon || <Info size={13} />}
        {title}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          width: 'min(340px, 85vw)', padding: '16px', borderRadius: '12px',
          background: 'rgba(15,15,20,0.98)', border: `1px solid ${color}30`,
          backdropFilter: 'blur(12px)', zIndex: 100,
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 12px ${color}10`,
          animation: 'fadeInUp 0.2s ease-out',
        }}>
          {/* Arrow */}
          <div style={{
            position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
            width: '12px', height: '12px',
            background: 'rgba(15,15,20,0.98)', border: `1px solid ${color}30`,
            borderRight: 'none', borderBottom: 'none',
          }} />

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            style={{
              position: 'absolute', top: '8px', right: '8px',
              background: 'none', border: 'none', color: 'var(--text-dim)',
              cursor: 'pointer', padding: '4px',
            }}
          >
            <X size={14} />
          </button>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
