import { motion } from 'framer-motion';
import { MapPin, Radio, Camera, Shield, Gauge, MessageSquare, Cloud, Smartphone, Users } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LotOpsProSection() {
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, var(--bg-dark) 100%)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Operating System</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lot Ops Pro</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            The platform that started it all. A production-ready, mobile-first autonomous lot management system — independently designed for wholesale automotive operations, currently deployed at multiple facilities. Multi-tenant by design. Every facility gets its own isolated environment, branding, and configuration from a single deployment. Drivers use their own phones or a $90 provided device — no specialized hardware required. Supervisors manage from anywhere. The entire lot runs on one system — from ticket scanning to vehicle routing to performance tracking to real-time messaging.
          </p>
        </div>

        {/* Feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: <Camera size={18}/>, title: 'Autonomous OCR Scanning', desc: 'Camera-based ticket scanning — no external database needed. Three input methods. Works offline.', color: 'var(--accent-emerald)' },
            { icon: <MapPin size={18}/>, title: 'GPS Routing & Navigation', desc: 'Real-time compass guidance with distance countdown. Smart group code routing to correct lanes.', color: 'var(--accent-cyan)' },
            { icon: <Gauge size={18}/>, title: 'Live Performance Tracking', desc: 'Moves-per-hour against 4.5 MPH quota. Real-time alerts. Daily, weekly, monthly aggregation. Automated bonus estimation.', color: 'var(--accent-emerald)' },
            { icon: <Shield size={18}/>, title: 'Safety & Speed Monitoring', desc: '15/17/22 MPH tiered alerts. Incident reporting with photo capture. Weather radar with tornado alerts.', color: '#ef4444' },
            { icon: <Users size={18}/>, title: 'Role-Based Dashboards', desc: 'Ops Manager, Supervisor, Van Driver, Inventory Driver — each sees exactly what they need.', color: 'var(--accent-cyan)' },
            { icon: <MessageSquare size={18}/>, title: 'Real-Time Messaging', desc: 'Supervisor ↔ driver communication. Broadcast or individual. 2-second polling. Toast notifications.', color: '#a78bfa' },
            { icon: <Radio size={18}/>, title: 'AI Voice Assistant', desc: 'GPT-5 powered bidirectional voice. 15+ hands-free commands. Speech pattern learning.', color: '#fb923c' },
            { icon: <Smartphone size={18}/>, title: 'Zero Hardware Cost', desc: 'BYOD or provide a $90 Android device. Runs as a PWA — installable, offline-capable. No scanners, no specialized equipment, no IT deployment.', color: 'var(--accent-emerald)' },
            { icon: <Cloud size={18}/>, title: 'Multi-Tenant Architecture', desc: 'Nashville. Atlanta. Any facility. Isolated data, custom branding, facility-specific configs — one codebase, unlimited sites.', color: 'var(--accent-cyan)' },
          ].map((feat, i) => (
            <motion.div key={i} {...f} transition={{ delay: i * 0.05 }}
              style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-light)', borderRadius: '12px', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <div style={{ color: feat.color }}>{feat.icon}</div>
                <h4 style={{ fontSize: '0.9rem' }}>{feat.title}</h4>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The integration story */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.2)', background: 'linear-gradient(135deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>How Everything Connects</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { label: 'Lot Ops Pro', role: 'The Operating System', desc: 'Driver management, GPS routing, performance analytics, real-time messaging, OCR ticket scanning, role-based dashboards — the complete platform running daily lot operations from a single mobile app.', color: 'var(--accent-emerald)' },
              { label: 'Lume-Auto', role: 'The Intelligence Layer', desc: 'OBD-II diagnostics at intake, deterministic condition certificates, arbitration-grade scan history, population health analytics — every vehicle assessed in 45 seconds with cryptographic proof.', color: 'var(--accent-cyan)' },
              { label: 'Meridian', role: 'The Energy Layer', desc: 'Wireless EV charging from overhead anchor nodes, adapter-agnostic energy routing, cryptographic billing ledger — Phase 2 infrastructure that eliminates every ground-level charging bottleneck.', color: '#a78bfa' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: item.color, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{item.role}</div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-dim" style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem' }}>
            Three products. One deterministic runtime. One data layer. Nashville first. Atlanta next. Every facility after that.
          </p>
        </motion.div>

        {/* Stats bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          {[
            { val: '2', unit: '', label: 'Active Facilities' },
            { val: '20K', unit: '+', label: 'Vehicles Managed' },
            { val: '$0', unit: '', label: 'Hardware Investment' },
            { val: '300', unit: '+', label: 'Potential Facilities' },
            { val: '20+', unit: '', label: 'Production Features' },
          ].map((s, i) => (
            <motion.div key={i} {...f} transition={{ delay: 0.2 + i * 0.08 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{s.val}<span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{s.unit}</span></div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
