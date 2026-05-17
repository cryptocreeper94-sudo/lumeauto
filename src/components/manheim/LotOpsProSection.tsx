import { motion } from 'framer-motion';
import { MapPin, Radio, Camera, Shield, Gauge, MessageSquare, Cloud, Smartphone, Users, Activity, Download } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LotOpsProSection() {
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, var(--bg-dark) 100%)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <img src="/assets/images/photos/lotops.png" alt="Lot operations workers with tablets" style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(16,185,129,0.2)', opacity: 0.85 }} />
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Operating System</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lot Ops Pro</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            The platform that started it all. A mobile-first autonomous lot management system — independently designed for wholesale automotive operations and engineered for pilot-scale deployment. The software is complete and ready for field validation. Multi-tenant by design. Every facility gets its own isolated environment, branding, and configuration from a single deployment. Drivers use their own phones or a low-cost provided device — no specialized hardware required. Supervisors manage from anywhere. The entire lot runs on one system — from ticket scanning to vehicle routing to performance tracking to real-time messaging.
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
            { icon: <Radio size={18}/>, title: 'AI Voice Assistant (Optional)', desc: 'Hands-free bidirectional voice for drivers. 15+ commands. LLM-agnostic — works with any provider or can be disabled entirely. When active, all AI output is governed by the LUME-V deterministic wrapper. Not required for platform operation.', color: '#fb923c' },
            { icon: <Smartphone size={18}/>, title: 'Zero Hardware Cost', desc: 'BYOD or provide a commodity Android device. Runs as a PWA — installable, offline-capable. No scanners, no specialized equipment, no IT deployment.', color: 'var(--accent-emerald)' },
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
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Three Systems. One Platform.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { label: 'Lot Ops Pro', role: 'The Operating System', desc: 'Driver management, GPS routing, performance analytics, real-time messaging, OCR ticket scanning, role-based dashboards — the complete platform running daily lot operations from a single mobile app.', color: 'var(--accent-emerald)' },
              { label: 'Lume-Auto', role: 'The Intelligence Layer', desc: 'Full OBD-II scanner at intake — read and clear DTCs, freeze frame analysis, VIN auto-read from ECU, pending fault detection. 60% of the condition report auto-generated before a human touches the vehicle. CSV export for fleet analytics. Cryptographic condition certificates in 45 seconds.', color: 'var(--accent-cyan)' },
              { label: 'Trust Layer', role: 'The Verification Layer', desc: 'Every condition report, custody transfer, and diagnostic result sealed into a tamper-proof record. Arbitration disputes resolved by mathematical replay, not opinion. Public verification available without login or API.', color: '#a78bfa' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: item.color, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{item.role}</div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Operational Intelligence */}
        <motion.div {...f} style={{ marginTop: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Who Sees What</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { role: 'Lane Managers', feeds: 'Real-time lane readiness. Vehicles flagged for dead batteries, pending faults, or open-loop cold starts before they reach the lane.', color: 'var(--accent-cyan)' },
              { role: 'Supervisors', feeds: 'Driver performance, GPS tracking, custody chain, facility-wide throughput. Full operational dashboard from any device.', color: 'var(--accent-emerald)' },
              { role: 'Transport Teams', feeds: 'Pre-dispatch health reports. Automatic flags for vehicles that won\'t start or will fail lane checks. No surprises on the truck.', color: '#38bdf8' },
              { role: 'Reconditioning', feeds: 'Auto-generated work orders from diagnostic data. Prioritized queues based on severity. Catalyst failures, battery issues, and fluid anomalies surfaced before the vehicle arrives.', color: '#fb923c' },
              { role: 'Arbitration Teams', feeds: 'Cryptographically sealed condition reports. Deterministic replay of original scan data. Dispute resolution by math, not opinion.', color: '#a78bfa' },
              { role: 'Facility Management', feeds: 'Population health analytics across all vehicles. Predictive throughput modeling. Cross-facility benchmarking and trend analysis.', color: 'var(--accent-emerald)' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-light)', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: item.color, marginBottom: '0.35rem' }}>{item.role}</div>
                <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{item.feeds}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          {[
            { val: '60', unit: '%', label: 'Auto-Generated Report' },
            { val: '45', unit: 's', label: 'Per Vehicle Scan' },
            { val: '$0', unit: '', label: 'Hardware Investment' },
            { val: '80', unit: '+', label: 'Auction Facilities' },
            { val: '42', unit: '', label: 'Diagnostic Signals' },
          ].map((s, i) => (
            <motion.div key={i} {...f} transition={{ delay: 0.2 + i * 0.08 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{s.val}<span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{s.unit}</span></div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div {...f} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
          <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent-cyan)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <Activity size={15} /> Try It Live
          </a>
          <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', transition: 'border-color 0.2s' }}>
            <Download size={15} /> Download App
          </a>
        </motion.div>
      </div>
    </section>
  );
}
