import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Wifi, Zap, ChevronRight, AlertTriangle, Download, Info } from 'lucide-react';
import { connectBLE, type BLEConnection, enterBLEDemoMode, isBLESupported } from '../../telemetry/BLEConnector';
import { probeForAdapter, type WiFiConnection } from '../../telemetry/WiFiConnector';
import InfoBubble from '../InfoBubble';

type ConnectionMode = 'idle' | 'ble' | 'wifi';

export default function OrganismConnection({ onConnect }: { onConnect: () => void }) {
  const [bleStatus, setBleStatus] = useState<BLEConnection>({
    status: 'disconnected', deviceName: null, error: null, isSimulated: false, adapterInfo: null,
  });
  const [wifiStatus, setWifiStatus] = useState<WiFiConnection>({
    status: 'disconnected', host: null, error: null, isSimulated: false, adapterInfo: null,
  });
  const [mode, setMode] = useState<ConnectionMode>('idle');
  const [scanning, setScanning] = useState(false);
  const [showWifiIP, setShowWifiIP] = useState(false);
  const [customIP, setCustomIP] = useState('192.168.0.10');
  const bleSupported = isBLESupported();

  // Active status display
  const activeStatus = mode === 'ble' ? bleStatus.status : mode === 'wifi' ? wifiStatus.status : 'disconnected';
  const activeMessage = mode === 'ble'
    ? (bleStatus.adapterInfo || bleStatus.error || bleStatus.deviceName || 'Ready')
    : mode === 'wifi'
    ? (wifiStatus.adapterInfo || wifiStatus.error || wifiStatus.host || 'Ready')
    : 'Select a connection method';

  const statusColor: Record<string, string> = {
    disconnected: 'var(--text-muted)',
    scanning: 'var(--accent-cyan)',
    probing: 'var(--accent-cyan)',
    connecting: 'var(--accent-cyan)',
    initializing: '#f59e0b',
    connected: 'var(--accent-emerald)',
    error: '#ef4444',
    unsupported: '#f59e0b',
  };

  async function handleBLEConnect() {
    setMode('ble');
    setScanning(true);
    try {
      const found = await connectBLE(setBleStatus);
      if (found) setTimeout(onConnect, 800);
    } catch { /* user cancelled picker */ }
    setScanning(false);
  }

  async function handleWiFiConnect(ip?: string) {
    setMode('wifi');
    setScanning(true);
    const found = await probeForAdapter(setWifiStatus, ip);
    if (found) {
      setTimeout(onConnect, 800);
    } else {
      setShowWifiIP(true);
    }
    setScanning(false);
  }

  function handleDemoMode() {
    enterBLEDemoMode(setBleStatus);
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
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bluetooth size={28} style={{ color: 'var(--accent-cyan)' }} />
            </motion.div>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '0.1em' }}>
              LUME<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>AUTO</span>
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Deterministic Vehicle Governance
          </p>
        </div>

        {/* Radar Scanner */}
        <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 1.5rem' }}>
          {[160, 200, 240].map((size, i) => (
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
              width: 68, height: 68, borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.1)', border: '2px solid var(--accent-cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Bluetooth size={28} style={{ color: 'var(--accent-cyan)' }} />
          </motion.div>
        </div>

        {/* Status */}
        <p style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: '1.25rem',
          color: statusColor[activeStatus] || 'var(--text-muted)',
          minHeight: '1.2em',
        }}>
          {scanning ? (mode === 'ble' ? 'Scanning for Bluetooth...' : 'Probing WiFi network...') : activeMessage}
        </p>

        {/* Connection Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>

          {/* BLE Button */}
          <button
            onClick={handleBLEConnect}
            disabled={scanning}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '0.9rem', borderRadius: '30px',
              background: bleSupported ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.06)',
              border: 'none',
              color: bleSupported ? '#000' : 'var(--text-dim)',
              fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em',
              cursor: scanning ? 'not-allowed' : 'pointer',
              opacity: scanning && mode === 'ble' ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
          >
            <Bluetooth size={18} />
            {!bleSupported ? 'BLE NOT AVAILABLE' : scanning && mode === 'ble' ? 'CONNECTING...' : 'CONNECT VIA BLUETOOTH'}
          </button>

          {/* WiFi Button */}
          <button
            onClick={() => handleWiFiConnect()}
            disabled={scanning}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              width: '100%', padding: '0.9rem', borderRadius: '30px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)',
              color: 'var(--text-main)',
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em',
              cursor: scanning ? 'not-allowed' : 'pointer',
              opacity: scanning && mode === 'wifi' ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
          >
            <Wifi size={18} style={{ color: 'var(--accent-cyan)' }} />
            {scanning && mode === 'wifi' ? 'SCANNING...' : 'CONNECT VIA WIFI'}
          </button>

          {/* Custom IP row */}
          {showWifiIP && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={customIP}
                onChange={e => setCustomIP(e.target.value)}
                placeholder="192.168.0.10"
                style={{
                  flex: 1, padding: '0.7rem 1rem', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-light)', borderRadius: '12px',
                  color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button onClick={() => handleWiFiConnect(customIP)} style={{
                padding: '0.7rem 1.25rem', background: 'var(--accent-cyan)',
                border: 'none', borderRadius: '12px', color: '#000', fontWeight: 800,
                cursor: 'pointer', fontSize: '0.8rem',
              }}>GO</button>
            </div>
          )}

          {/* Demo Mode */}
          <button onClick={handleDemoMode} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            width: '100%', padding: '0.9rem', borderRadius: '16px',
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)',
            color: 'var(--accent-emerald)', cursor: 'pointer', transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>DEMO MODE</span>
            </div>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>Simulated 2019 F-150 5.0L V8 · No hardware needed</span>
          </button>
        </div>

        {/* Info Bubbles */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <InfoBubble title="Need WiFi?" icon={<Download size={13} />} color="var(--accent-emerald)">
            <p style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px' }}>WiFi adapters need the native app</p>
            <p>Web browsers can’t open raw TCP connections to WiFi OBD-II adapters. If your adapter uses WiFi instead of Bluetooth, <a href="/download" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>download the native Android app</a> for full WiFi support.</p>
            <p style={{ marginTop: '8px', color: 'var(--text-dim)', fontSize: '0.7rem' }}>Bluetooth adapters work perfectly in this web app.</p>
          </InfoBubble>
          <InfoBubble title="What can it do?" icon={<Info size={13} />}>
            <p style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '6px' }}>Full OBD-II Scanner</p>
            <p>• Live telemetry (RPM, speed, MPG, 42 signals)<br/>
               • Read stored diagnostic trouble codes<br/>
               • Clear codes + reset Check Engine Light<br/>
               • Pending DTCs — catch faults before MIL<br/>
               • Freeze frame — engine state at fault time<br/>
               • VIN auto-read directly from ECU<br/>
               • 8 readiness monitors for inspections<br/>
               • CSV telemetry export for fleet analysis<br/>
               • Deterministic condition reports</p>
          </InfoBubble>
        </div>

        {/* Quick Setup */}
        <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '0.5rem' }}>QUICK SETUP</p>
          {[
            '1. Plug OBD-II adapter into vehicle (below steering column)',
            '2. Turn ignition to ACC or RUN',
            '3. Bluetooth: Tap connect — select adapter from picker',
            '4. WiFi: Join adapter hotspot first, then tap connect',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <ChevronRight size={11} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Browser compatibility note */}
        {!bleSupported && (
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '8px',
            padding: '10px 12px', borderRadius: '10px', marginBottom: '1rem',
            background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)',
          }}>
            <AlertTriangle size={13} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.6rem', color: '#f59e0b', textAlign: 'left', lineHeight: 1.5 }}>
              Bluetooth requires Chrome or Edge. WiFi works in all browsers when connected to the adapter's hotspot.
            </span>
          </div>
        )}

        {/* Compatible */}
        <p style={{ fontSize: '0.55rem', color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6 }}>
          BLE: Veepeak BLE · OBDLink MX+ · BAFX BLE<br />
          WiFi: Any ELM327 WiFi · OBDLink MX WiFi<br />
          42 Nodes · 4 Primitives · Zero AI · US Patent 64/032,339
        </p>
      </motion.div>
    </div>
  );
}
