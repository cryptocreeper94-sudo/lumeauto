import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Server, Download, Wifi } from 'lucide-react';
import InfoBubble from '../InfoBubble';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function HardwareSection() {
  return (
    <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>

          {/* Phase 1 */}
          <motion.div {...f} style={{ display: 'flex', flexDirection: 'column' }}>
            <img src="/assets/images/photos/obd2_hardware.png" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }} alt="OBD-II Diagnostic Adapter" />
            <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Deploy Today · Zero Investment</div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Your Existing Hardware Works.</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6, flex: 1, fontSize: '0.95rem' }}>
              Any facility with WiFi or BLE-capable OBD-II dongles already has the hardware to run Lume-Auto today. Tens of thousands of compatible devices are already deployed across the industry. The software is the differentiator — not the hardware.
            </p>
            <div className="panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Works with any ELM327 WiFi or BLE dongle', 'Compatible with iOS and Android', 'Existing dongle inventory is deployment-ready', 'Zero capital investment to start'].map((t, i) => (
                <div key={i} className="flex items-center gap-3"><CheckCircle size={15} color="var(--accent-cyan)" /><span style={{ fontSize: '0.85rem' }}>{t}</span></div>
              ))}
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div {...f} transition={{ delay: 0.15 }} style={{ display: 'flex', flexDirection: 'column' }}>
            <img src="/assets/images/phase2.png" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid rgba(251,146,60,0.3)' }} alt="Lume Dongle PCB" />
            <div style={{ color: '#fb923c', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>The Branded Product</div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>The Lume Dongle.</h3>
            <p className="text-muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6, flex: 1, fontSize: '0.95rem' }}>
              Every scanner on the market uses a 2005-era chip with a single radio. The Lume Dongle is a <strong>$13 BOM ESP32-S3</strong> smart endpoint — WiFi + BT Classic + BLE, passive CAN bus sniffing, on-device governance, and OTA firmware updates. This is the branded hardware product for the broader automotive market.
            </p>
            <div className="panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', borderColor: 'rgba(251,146,60,0.2)', background: 'rgba(251,146,60,0.02)' }}>
              {[
                { icon: <Zap size={15}/>, t: 'Zero discovery time — passive CAN sniffing' },
                { icon: <Shield size={15}/>, t: 'Ghost Mode — bypasses Secure Gateways' },
                { icon: <Server size={15}/>, t: 'Fleet management — unique ID + OTA updates' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3" style={{ color: '#fb923c' }}>{item.icon}<span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.t}</span></div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...f} style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <a href="/download" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', borderRadius: '30px',
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
            color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700,
            textDecoration: 'none', letterSpacing: '0.05em', transition: 'all 0.2s',
          }}>
            <Download size={16} /> Download Native App for WiFi Testing
          </a>
          <InfoBubble title="WiFi vs Bluetooth" icon={<Wifi size={13} />}>
            <p style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '6px' }}>When do I need the native app?</p>
            <p><strong style={{ color: '#fff' }}>WiFi adapters</strong> require the native Android app because browsers cannot open raw TCP sockets. If your facility uses WiFi OBD-II adapters, download the APK.</p>
            <p style={{ marginTop: '8px' }}><strong style={{ color: '#fff' }}>Bluetooth (BLE) adapters</strong> work in both the web app and native app. Use whichever is more convenient.</p>
            <p style={{ marginTop: '8px', color: 'var(--text-dim)', fontSize: '0.7rem' }}>The native app installs directly — no Play Store required. Just download, install, and connect.</p>
          </InfoBubble>
        </motion.div>

        <motion.p {...f} className="text-dim" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', maxWidth: '650px', margin: '2rem auto 0' }}>
          The software runs on commodity hardware today. The Lume Dongle is the branded product built for the wider market — dealerships, independent shops, fleet operators. When you own the firmware, the runtime, and the governance engine, you own the full stack from silicon to organism.
        </motion.p>
      </div>
    </section>
  );
}
