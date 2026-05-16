import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Zap, ChevronRight, AlertTriangle } from 'lucide-react';
import { connectBLE, type BLEConnection, enterBLEDemoMode, isBLESupported } from '../../telemetry/BLEConnector';

export default function OrganismConnection({ onConnect }: { onConnect: () => void }) {
  const [status, setStatus] = useState<BLEConnection>({
    status: 'disconnected', deviceName: null, error: null, isSimulated: false, adapterInfo: null,
  });
  const [scanning, setScanning] = useState(false);
  const bleSupported = isBLESupported();

  const statusText: Record<string, string> = {
    disconnected: 'Ready to connect',
    scanning: 'Scanning for adapters...',
    connecting: `Connecting to ${status.deviceName || 'device'}...`,
    initializing: 'Initializing ELM327...',
    connected: status.adapterInfo || `Connected: ${status.deviceName}`,
    error: status.error || 'Connection error',
    unsupported: 'Bluetooth not available in this browser',
  };

  const statusColor: Record<string, string> = {
    disconnected: 'var(--text-muted)',
    scanning: 'var(--accent-cyan)',
    connecting: 'var(--accent-cyan)',
    initializing: '#f59e0b',
    connected: 'var(--accent-emerald)',
    error: '#ef4444',
    unsupported: '#f59e0b',
  };

  async function handleBLEConnect() {
    setScanning(true);
    try {
      const found = await connectBLE(setStatus);
      if (found) {
        setTimeout(onConnect, 800);
      }
    } catch {
      // User cancelled picker or error
    }
    setScanning(false);
  }

  function handleDemoMode() {
    enterBLEDemoMode(setStatus);
    setTimeout(onConnect, 500);
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <Bluetooth size={28} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '0.1em' }}>
              LUME<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>AUTO</span>
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Deterministic Vehicle Governance
          </p>
        </div>

        {/* Radar Scanner */}
        <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 2rem' }}>
          {[200, 240, 280].map((size, i) => (
            <motion.div
              key={i}
              animate={{ scale: [0.5, 1], opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                width: size, height: size, borderRadius: '50%',
                border: '1.5px solid rgba(6, 182, 212, 0.4)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 76, height: 76, borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.1)', border: '2px solid var(--accent-cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Bluetooth size={32} style={{ color: 'var(--accent-cyan)' }} />
          </motion.div>
        </div>

        {/* Status */}
        <p style={{
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: '1.5rem',
          color: statusColor[status.status],
        }}>
          {statusText[status.status]}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>

          {/* Primary: BLE Connect */}
          <button
            onClick={handleBLEConnect}
            disabled={scanning || !bleSupported}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '1rem', borderRadius: '30px',
              background: bleSupported ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
              border: 'none',
              color: bleSupported ? '#000' : 'var(--text-muted)',
              fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.15em',
              cursor: scanning || !bleSupported ? 'not-allowed' : 'pointer',
              opacity: scanning ? 0.5 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            <Bluetooth size={20} />
            {!bleSupported ? 'BLE NOT AVAILABLE' : scanning ? 'CONNECTING...' : 'CONNECT VIA BLUETOOTH'}
          </button>

          {!bleSupported && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              padding: '12px', borderRadius: '12px',
              background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)',
            }}>
              <AlertTriangle size={14} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.7rem', color: '#f59e0b', textAlign: 'left', lineHeight: 1.5 }}>
                Web Bluetooth requires Chrome or Edge on Android/Desktop. Use Demo Mode to explore the interface, or install the app for full hardware support.
              </span>
            </div>
          )}

          {/* Demo Mode */}
          <button onClick={handleDemoMode} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            width: '100%', padding: '1rem', borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)',
            color: 'var(--accent-cyan)', cursor: 'pointer', transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>DEMO MODE</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Simulated 2019 F-150 · No adapter needed</span>
          </button>
        </div>

        {/* Quick Setup */}
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>QUICK SETUP</p>
          {[
            '1. Plug BLE OBD-II adapter into your vehicle',
            '2. Turn on your vehicle\'s ignition (ACC or RUN)',
            '3. Tap "Connect via Bluetooth" — select your adapter',
            '4. Organism begins 42-node governance automatically',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <ChevronRight size={12} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Compatible */}
        <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6, marginBottom: '0.5rem' }}>
          <Bluetooth size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Any BLE ELM327 · OBDLink MX+ · Veepeak BLE · BAFX BLE
        </p>
        <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6 }}>
          42 Nodes · 4 Primitives · Zero AI · US Patent 64/032,339
        </p>
      </motion.div>
    </div>
  );
}
