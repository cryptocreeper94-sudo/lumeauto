import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity, Shield, CheckCircle } from 'lucide-react';

export default function LiveScanSimulator() {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState({
    rpm: 0,
    load: 0,
    o2: 0.45,
    timing: 0,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (scanning && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setScanning(false);
            setComplete(true);
            return 100;
          }
          return p + 0.8; // Takes about 12.5 seconds (100 / 0.8 * 100ms)
        });
        
        // Jitter telemetry
        setTelemetry({
          rpm: Math.floor(800 + Math.random() * 200),
          load: Number((20 + Math.random() * 15).toFixed(1)),
          o2: Number((0.1 + Math.random() * 0.8).toFixed(2)),
          timing: Math.floor(10 + Math.random() * 5),
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [scanning, progress]);

  const handleStart = () => {
    setScanning(true);
    setComplete(false);
    setProgress(0);
  };

  return (
    <div className="panel" style={{ background: '#0a0a0c', border: '1px solid var(--border-light)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: scanning ? 'var(--accent-emerald)' : 'var(--text-dim)', boxShadow: scanning ? '0 0 10px var(--accent-emerald)' : 'none' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {scanning ? 'CONNECTION: ACTIVE (100Hz)' : complete ? 'CONNECTION: TERMINATED' : 'CONNECTION: STANDBY'}
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          PROTOCOL: CAN ISO 15765-4
        </div>
      </div>

      {/* Main Display */}
      <div style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        <AnimatePresence mode="wait">
          {!scanning && !complete && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,12,0.8)', backdropFilter: 'blur(4px)', zIndex: 10 }}>
              <button onClick={handleStart} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent-emerald)', padding: '1rem 2rem', borderRadius: '30px', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}>
                <Play fill="currentColor" /> INITIATE LIVE SCAN
              </button>
            </motion.div>
          )}

          {scanning && (
            <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>REAL-TIME TELEMETRY STREAM</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  <div className="flex justify-between"><span>ENGINE_RPM</span><span style={{ color: 'var(--accent-cyan)' }}>{telemetry.rpm}</span></div>
                  <div className="flex justify-between"><span>CALC_LOAD</span><span style={{ color: 'var(--accent-cyan)' }}>{telemetry.load}%</span></div>
                  <div className="flex justify-between"><span>O2_VOLTAGE</span><span style={{ color: 'var(--accent-cyan)' }}>{telemetry.o2}v</span></div>
                  <div className="flex justify-between"><span>TIMING_ADV</span><span style={{ color: 'var(--accent-cyan)' }}>{telemetry.timing}°</span></div>
                  <div className="flex justify-between" style={{ marginTop: '1rem', color: 'var(--text-dim)' }}><span>NODES_ACTIVE</span><span>42</span></div>
                  <div className="flex justify-between" style={{ color: 'var(--text-dim)' }}><span>LATENCY</span><span>12ms</span></div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Activity size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
                <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{Math.floor(progress)}%</div>
                <div style={{ width: '100%', height: '4px', background: 'var(--bg-dark)', borderRadius: '2px', marginTop: '1rem', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-emerald)', transition: 'width 0.1s linear' }} />
                </div>
              </div>
            </motion.div>
          )}

          {complete && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', paddingTop: '1rem' }}>
              <Shield size={48} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Scan Complete</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>BATTERY HEALTH</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>84%</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>FAULTS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>0 PENDING</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>STATUS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="var(--accent-emerald)" /> L2 READY
                  </div>
                </div>
              </div>

              <div style={{ width: '100%', marginTop: '1rem', padding: '1rem', background: 'var(--bg-dark)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', wordBreak: 'break-all' }}>
                LUME_HASH: 0x8f2c3b4a...9d1e {Date.now()}
              </div>

              <button onClick={() => { setComplete(false); setProgress(0); }} style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>
                Reset Demo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
