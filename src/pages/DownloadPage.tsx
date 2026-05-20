import { motion } from 'framer-motion';
import { Smartphone, Download, Bluetooth, Wifi, Shield, Activity, ArrowLeft, QrCode, Monitor } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import QRCodeLib from 'qrcode';

// Direct download URLs
const APK_URL = 'https://expo.dev/accounts/cryptocreeper/projects/lume-auto/builds/496f5903-3302-439d-85cf-ef1b45633eb4';
const EXE_URL = 'https://firebasestorage.googleapis.com/v0/b/darkwave-auth.firebasestorage.app/o/downloads%2FLot_Ops_Pro_Setup.exe?alt=media&token=36fe7582-07b0-423a-a366-bd1a1e6af6a0';
const DOWNLOAD_URL = 'https://cox.tlid.io/download';

export default function DownloadPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (window.innerWidth <= 768);
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, DOWNLOAD_URL, {
        width: 200,
        margin: 2,
        color: {
          dark: '#06b6d4',
          light: '#0a0a0c',
        },
        errorCorrectionLevel: 'M',
      });
    }
  }, []);

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', padding: '3rem 1.5rem', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Back */}
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Platform
        </a>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
            <Activity size={32} style={{ color: 'var(--accent-cyan)' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '0.05em', margin: 0 }}>
              LUME<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>AUTO</span>
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Native Android app with full WiFi + Bluetooth OBD-II connectivity. Direct APK — no Play Store needed.
          </p>
        </motion.div>

        {/* Two-column: QR + Download */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

          {/* QR Code */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem',
            border: '1px solid var(--border-light)', textAlign: 'center',
          }}>
            <QrCode size={24} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Scan to Download</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              Point your phone camera at this code
            </p>
            <div style={{
              width: '200px', height: '200px', margin: '0 auto', borderRadius: '12px',
              border: '2px solid rgba(6,182,212,0.3)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#0a0a0c',
            }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', marginTop: '1rem' }}>lumeauto.tech/download</p>
          </motion.div>

          {/* Direct Download */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem',
            border: '1px solid var(--border-light)',
          }}>
            <Smartphone size={24} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Direct Install</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              Download the APK and install directly on any Android device
            </p>

            <a href={APK_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '14px 24px', borderRadius: '30px', marginBottom: '1rem',
              background: 'var(--accent-cyan)', border: 'none',
              color: '#000', fontSize: '0.85rem', fontWeight: 800,
              letterSpacing: '0.1em', textDecoration: 'none',
              transition: 'transform 0.2s',
            }}>
              <Download size={18} /> DOWNLOAD APK
            </a>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '1.5rem' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>INSTALL STEPS</p>
              {[
                'Download the APK file',
                'Open it — tap "Install" when prompted',
                'If blocked: Settings → allow from this source',
                'Open LUME-Auto and connect your adapter',
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 700, minWidth: '16px' }}>{i + 1}.</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enterprise Desktop Section — hidden on mobile */}
        {!isMobile && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem',
            border: '1px solid var(--border-light)', marginBottom: '3rem',
            display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <Monitor size={28} style={{ color: '#38bdf8' }} />
                <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Lot Ops Pro Desktop</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                The complete operational workforce platform built specifically for Windows desktops. Features real-time custody tracking, routing, and messaging.
              </p>
              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '6px', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                POWERED BY NATIVE LUME BUILD
              </div>
            </div>

            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
              <a
                href={EXE_URL}
                download
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px 24px', borderRadius: '30px',
                  background: 'transparent', border: '2px solid #38bdf8',
                  color: '#38bdf8', fontSize: '0.85rem', fontWeight: 800,
                  letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Download size={18} /> DOWNLOAD .EXE
              </a>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.65rem', textAlign: 'center' }}>
                Requires Windows 10/11 (64-bit) · ~1 GB
              </p>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem',
          border: '1px solid var(--border-light)', marginBottom: '2rem',
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textAlign: 'center' }}>Native App Capabilities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Wifi size={20} />, title: 'WiFi Connectivity', desc: 'Direct TCP socket to ELM327 WiFi adapters — full raw protocol access', color: 'var(--accent-cyan)' },
              { icon: <Bluetooth size={20} />, title: 'Bluetooth Low Energy', desc: 'Native BLE pairing for wireless adapters — OBDLink MX+, Veepeak, BAFX', color: '#22d3ee' },
              { icon: <Activity size={20} />, title: '42-Node Governance', desc: 'Real-time telemetry at 100ms intervals — same deterministic organism', color: 'var(--accent-emerald)' },
              { icon: <Shield size={20} />, title: 'Condition Reports', desc: 'Cryptographically signed vehicle health assessments — arbitration-grade', color: '#f59e0b' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: f.color, flexShrink: 0, marginTop: '2px' }}>{f.icon}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>{f.title}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requirements */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', lineHeight: 1.7 }}>
            Requires Android 8.0+ · ~25MB · No Play Store account needed<br />
            WiFi: Any ELM327 WiFi adapter · BLE: Any Bluetooth Low Energy adapter<br />
            US Provisional Patent 64/032,339 · DarkWave Studios LLC
          </p>
        </div>
      </div>
    </div>
  );
}
