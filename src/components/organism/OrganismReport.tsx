import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, ArrowLeft, Activity, Trash2, List } from 'lucide-react';
import { generateConditionReport } from '../../telemetry/SimulatedEngine';
import { clearDTCs, readStoredDTCs } from '../../telemetry/BLEConnector';

const STATUS_ICONS: Record<string, React.ReactNode> = {
  ok: <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />,
  caution: <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />,
  warning: <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />,
  critical: <XCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />,
};

const STATUS_COLORS: Record<string, string> = {
  nominal: 'var(--accent-emerald)',
  caution: '#f59e0b',
  warning: '#f59e0b',
  critical: '#ef4444',
};

export default function OrganismReport({ onBack }: { onBack: () => void }) {
  const [report, setReport] = useState<ReturnType<typeof generateConditionReport> | null>(null);
  const [clearing, setClearing] = useState(false);
  const [clearResult, setClearResult] = useState<string | null>(null);
  const [dtcList, setDtcList] = useState<string[]>([]);
  const [loadingDTCs, setLoadingDTCs] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReport(generateConditionReport()), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!report) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--bg-dark)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Activity size={48} style={{ color: 'var(--accent-cyan)' }} />
        </motion.div>
        <p style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.2em' }}>SCANNING 42 NODES...</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Generating deterministic condition report</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '0' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 60px' }}>

        {/* Back */}
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', color: 'var(--text-muted)',
          cursor: 'pointer', fontSize: '0.85rem', marginTop: '20px', marginBottom: '24px', padding: 0,
        }}>
          <ArrowLeft size={20} /> Dashboard
        </button>

        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.2em', marginBottom: '4px' }}>CONDITION REPORT</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', marginBottom: '24px' }}>{report.timestamp}</p>

        {/* Vehicle */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px',
          border: '1px solid var(--border-light)', marginBottom: '16px',
        }}>
          <p style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{report.vehicle}</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{report.vin}</p>
        </div>

        {/* Overall Status */}
        <div style={{
          borderRadius: '12px', padding: '20px', marginBottom: '20px',
          border: `1px solid ${report.laneReady ? 'var(--accent-emerald)' : '#f59e0b'}`,
          background: 'rgba(255,255,255,0.02)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '4px' }}>OVERALL HEALTH</p>
              <p style={{
                fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)',
                color: report.overallHealth > 80 ? 'var(--accent-emerald)' : '#f59e0b',
                margin: 0,
              }}>
                {report.overallHealth}%
              </p>
            </div>
            <div style={{
              padding: '10px 16px', borderRadius: '20px',
              background: report.laneReady ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
              border: `1px solid ${report.laneReady ? 'var(--accent-emerald)' : '#f59e0b'}`,
            }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                color: report.laneReady ? 'var(--accent-emerald)' : '#f59e0b',
              }}>
                {report.laneReady ? '✓ LANE READY' : '⚠ REVIEW REQUIRED'}
              </span>
            </div>
          </div>
        </div>

        {/* Sections */}
        {report.sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px',
              border: '1px solid var(--border-light)', marginBottom: '12px',
            }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '12px', paddingBottom: '10px',
              borderBottom: '1px solid var(--border-light)',
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{section.name}</span>
              <span style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em',
                color: STATUS_COLORS[section.status] || 'var(--accent-emerald)',
              }}>
                ● {section.status.toUpperCase()}
              </span>
            </div>
            {section.items.map((item, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {STATUS_ICONS[item.status]}
                <span style={{ flex: 1, color: 'var(--text-muted)', fontSize: '0.75rem' }}>{item.label}</span>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
                  color: item.status === 'ok' ? 'var(--accent-cyan)' : item.status === 'critical' ? '#ef4444' : '#f59e0b',
                }}>{item.value}</span>
              </div>
            ))}
          </motion.div>
        ))}

        {/* DTC Actions */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '12px', marginBottom: '12px' }}>
          {/* Read DTCs */}
          <button onClick={async () => {
            setLoadingDTCs(true);
            const codes = await readStoredDTCs();
            setDtcList(codes);
            setLoadingDTCs(false);
          }} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '12px', borderRadius: '12px',
            background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)',
            color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.08em',
          }}>
            <List size={16} /> {loadingDTCs ? 'READING...' : 'READ DTCs'}
          </button>

          {/* Clear DTCs */}
          <button onClick={async () => {
            if (!confirm('Clear all DTCs and reset Check Engine Light?\n\nThis will also reset readiness monitors.')) return;
            setClearing(true);
            setClearResult(null);
            const result = await clearDTCs();
            setClearResult(result.message);
            setDtcList([]);
            setClearing(false);
          }} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '12px', borderRadius: '12px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            color: '#ef4444', fontSize: '0.75rem', fontWeight: 700,
            cursor: clearing ? 'not-allowed' : 'pointer', letterSpacing: '0.08em',
            opacity: clearing ? 0.5 : 1,
          }}>
            <Trash2 size={16} /> {clearing ? 'CLEARING...' : 'CLEAR CODES'}
          </button>
        </div>

        {/* DTC List */}
        {dtcList.length > 0 && (
          <div style={{
            background: 'rgba(239,68,68,0.05)', borderRadius: '12px', padding: '16px',
            border: '1px solid rgba(239,68,68,0.2)', marginBottom: '12px',
          }}>
            <p style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '10px' }}>
              {dtcList.length} STORED DTC{dtcList.length !== 1 ? 'S' : ''}
            </p>
            {dtcList.map((code, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <XCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#ef4444' }}>{code}</span>
              </div>
            ))}
          </div>
        )}

        {/* Clear Result */}
        {clearResult && (
          <div style={{
            background: 'rgba(16,185,129,0.08)', borderRadius: '12px', padding: '12px 16px',
            border: '1px solid rgba(16,185,129,0.2)', marginBottom: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 700 }}>
              ✓ {clearResult}
            </p>
          </div>
        )}

        {/* Summary */}
        <div style={{
          background: 'rgba(6,182,212,0.05)', borderRadius: '12px', padding: '20px',
          border: '1px solid rgba(6,182,212,0.2)', marginTop: '8px',
        }}>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '8px' }}>DETERMINISTIC ASSESSMENT</p>
          <p style={{ color: 'var(--text-main)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '16px' }}>{report.summary}</p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.6rem', lineHeight: 1.6, textAlign: 'center' }}>
            42 nodes scanned · 4 primitives · Zero AI calls<br />
            US Provisional Patent 64/032,339
          </p>
        </div>
      </div>
    </div>
  );
}
