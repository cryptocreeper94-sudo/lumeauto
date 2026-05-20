import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Droplets, ShieldCheck, ActivitySquare, FileText, Download } from 'lucide-react';
import { type TelemetrySnapshot } from '../../telemetry/SimulatedEngine';
import { startBLETelemetryLoop, getBLEStatus, recordTelemetrySnapshot, exportTelemetryCSV, getTelemetryHistoryCount } from '../../telemetry/BLEConnector';

function DataRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{label}</span>
      <span style={{ color: color || 'var(--accent-cyan)', fontSize: '0.65rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{value}</span>
    </div>
  );
}

export default function OrganismDashboard({ onReport }: { onReport?: () => void }) {
  const [data, setData] = useState<TelemetrySnapshot | null>(null);

  useEffect(() => {
    const stop = startBLETelemetryLoop((snapshot) => {
      setData(snapshot);
      recordTelemetrySnapshot(snapshot);
    }, 150);
    return () => stop();
  }, []);

  if (!data) return null;

  const modeColor = data.governanceMode === 'Flow State' ? 'var(--accent-emerald)'
    : data.governanceMode === 'Throughput Alert' ? '#f59e0b'
    : 'var(--accent-cyan)';

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
    padding: '14px', border: '1px solid var(--border-light)',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', padding: '0' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 60px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ActivitySquare size={24} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.05em' }}>
              LUME<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>AUTO</span>
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(16,185,129,0.1)', padding: '6px 12px',
            borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)',
          }}>
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: 4, background: 'var(--accent-emerald)' }}
            />
            <span style={{ color: 'var(--accent-emerald)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              {getBLEStatus().isSimulated ? 'DEMO MODE' : 'BLE CONNECTED'}
            </span>
          </div>
        </div>

        {/* Mode Badge */}
        <div style={{
          textAlign: 'center', marginBottom: '24px',
          padding: '6px 16px', borderRadius: '20px',
          border: `1px solid ${modeColor}`, display: 'inline-flex',
          margin: '0 auto 24px', width: 'fit-content',
        }}>
          <span style={{ color: modeColor, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em' }}>
            {data.governanceMode.toUpperCase()}
          </span>
        </div>

        {/* Main Telemetry Ring */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', marginBottom: '24px', position: 'relative' }}>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', width: 180, height: 180, borderRadius: '50%',
              border: '2px solid var(--accent-cyan)', opacity: 0.5,
              boxShadow: '0 0 40px rgba(6,182,212,0.15)',
            }}
          />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{
              fontSize: '3rem', fontWeight: 800, color: 'var(--accent-emerald)',
              textShadow: '0 0 20px rgba(16,185,129,0.3)',
            }}>
              +{data.mpgRecovery.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.2em', marginTop: '4px' }}>
              MPG RECOVERY
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-around',
          background: 'rgba(255,255,255,0.03)', borderRadius: '12px',
          padding: '16px', marginBottom: '24px',
          border: '1px solid var(--border-light)',
        }}>
          {[
            { val: data.tb6_rpm.toFixed(0), label: 'RPM' },
            { val: (data.tb7_speed * 0.621371).toFixed(0), label: 'MPH' },
            { val: data.mpgInstant > 0 ? data.mpgInstant.toFixed(1) : '—', label: 'MPG' },
            { val: data.fs10_driverScore.toFixed(0), label: 'SCORE', color: data.fs10_driverScore > 80 ? 'var(--accent-emerald)' : '#f59e0b' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ color: s.color || 'var(--accent-cyan)', fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* 4/42 Governance Nodes */}
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '16px' }}>
          GOVERNANCE NODES — 42 ACTIVE
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>

          {/* Throughput Base */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
              <Activity size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{ color: 'var(--text-main)', fontSize: '0.7rem', fontWeight: 700 }}>TB — Throughput</span>
            </div>
            <DataRow label="MAF (TB1)" value={`${data.tb1_maf.toFixed(1)} g/s`} />
            <DataRow label="RPM (TB6)" value={`${data.tb6_rpm.toFixed(0)}`} />
            <DataRow label="Throttle (TB5)" value={`${data.tb5_throttle.toFixed(1)}%`} />
            <DataRow label="Vol.Eff (TB8)" value={`${data.tb8_volEff.toFixed(1)}%`} />
            <DataRow label="AFR (TB9)" value={`${data.tb9_afr.toFixed(1)}:1`} color={data.tb9_afr > 14.5 && data.tb9_afr < 14.9 ? 'var(--accent-emerald)' : 'var(--accent-cyan)'} />
          </div>

          {/* Process Rate */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
              <Zap size={16} style={{ color: 'var(--accent-emerald)' }} />
              <span style={{ color: 'var(--text-main)', fontSize: '0.7rem', fontWeight: 700 }}>PR — Process</span>
            </div>
            <DataRow label="Timing (PR1)" value={`${data.pr1_timing.toFixed(1)}°`} />
            <DataRow label="Comb.Eff (PR6)" value={`${data.pr6_combEff.toFixed(1)}%`} color={data.pr6_combEff > 96 ? 'var(--accent-emerald)' : 'var(--accent-cyan)'} />
            <DataRow label="Load (PR7)" value={`${data.pr7_engLoad.toFixed(1)}%`} />
            <DataRow label="STFT B1 (PR2)" value={`${data.pr2_stftB1 > 0 ? '+' : ''}${data.pr2_stftB1.toFixed(1)}%`} />
            <DataRow label="LTFT B1 (PR3)" value={`${data.pr3_ltftB1 > 0 ? '+' : ''}${data.pr3_ltftB1.toFixed(1)}%`} />
          </div>

          {/* Flow State */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
              <Droplets size={16} style={{ color: '#38bdf8' }} />
              <span style={{ color: 'var(--text-main)', fontSize: '0.7rem', fontWeight: 700 }}>FS — Flow State</span>
            </div>
            <DataRow label="O2 Up B1 (FS1)" value={`${data.fs1_o2UpB1.toFixed(2)}V`} />
            <DataRow label="O2 Dn B1 (FS2)" value={`${data.fs2_o2DnB1.toFixed(2)}V`} />
            <DataRow label="Cat.Eff (FS7)" value={`${data.fs7_catEff.toFixed(1)}%`} color={data.fs7_catEff > 92 ? 'var(--accent-emerald)' : '#f59e0b'} />
            <DataRow label="Driver (FS10)" value={`${data.fs10_driverScore.toFixed(0)}/100`} color={data.fs10_driverScore > 80 ? 'var(--accent-emerald)' : '#f59e0b'} />
          </div>

          {/* System Lifecycle */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
              <ShieldCheck size={16} style={{ color: '#f59e0b' }} />
              <span style={{ color: 'var(--text-main)', fontSize: '0.7rem', fontWeight: 700 }}>SL — Lifecycle</span>
            </div>
            <DataRow label="Coolant (SL1)" value={`${data.sl1_coolant.toFixed(1)}°C`} color={data.sl1_coolant < 100 ? 'var(--accent-emerald)' : '#ef4444'} />
            <DataRow label="Battery (SL3)" value={`${data.sl3_battery.toFixed(1)}V`} color={data.sl3_battery > 13.5 ? 'var(--accent-emerald)' : '#f59e0b'} />
            <DataRow label="MIL (SL7)" value={data.sl7_mil ? 'ON' : 'OFF'} color={data.sl7_mil ? '#ef4444' : 'var(--accent-emerald)'} />
            <DataRow label="Health (SL11)" value={`${data.sl11_degradation.toFixed(0)}%`} color={data.sl11_degradation > 80 ? 'var(--accent-emerald)' : '#f59e0b'} />
          </div>
        </div>

        {/* Condition Report Button */}
        {onReport && (
          <button onClick={onReport} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            width: '100%', padding: '16px', borderRadius: '30px',
            background: 'rgba(6,182,212,0.1)', border: '1px solid var(--accent-cyan)',
            color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <FileText size={18} />
            GENERATE CONDITION REPORT
          </button>
        )}

        {/* CSV Export */}
        <button onClick={() => {
          const csv = exportTelemetryCSV();
          if (!csv) return;
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `lume-telemetry-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.csv`;
          a.click();
          URL.revokeObjectURL(url);
        }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          width: '100%', padding: '12px', borderRadius: '30px', marginTop: '10px',
          background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
          color: 'var(--accent-emerald)', fontSize: '0.7rem', fontWeight: 700,
          letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s',
        }}>
          <Download size={16} />
          EXPORT CSV · {getTelemetryHistoryCount()} SNAPSHOTS
        </button>

        {/* Runtime */}
        <p style={{
          color: 'var(--text-dim)', fontSize: '0.6rem', textAlign: 'center',
          marginTop: '16px', letterSpacing: '0.05em',
        }}>
          Runtime: {data.sl4_runtime}s · 42 nodes · 100ms polling · Deterministic
        </p>
      </div>
    </div>
  );
}
