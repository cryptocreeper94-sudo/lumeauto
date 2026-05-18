import { motion } from 'framer-motion';
import { MapPin, Radio, Camera, Shield, Gauge, MessageSquare, Cloud, Smartphone, Users, Activity, Download } from 'lucide-react';
const f = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function LotOpsProSection() {
  return (
    <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, var(--bg-dark) 100%)', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <img src="/assets/images/photos/lotops.png" alt="Lot operations workers with tablets" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '20px', marginBottom: '2.5rem', border: '1px solid rgba(16,185,129,0.2)', opacity: 0.85 }} />
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Operating System</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lot Ops Pro</h2>
          <p className="text-muted" style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
            The platform that started it all. A mobile-first autonomous lot management system — independently designed for wholesale automotive operations and engineered for pilot-scale deployment. The software is complete and ready for field validation. Multi-tenant by design. Every facility gets its own isolated environment, branding, and configuration from a single deployment. Drivers use their own phones or a low-cost provided device — no specialized hardware required. Supervisors manage from anywhere. The entire lot runs on one system — from ticket scanning to vehicle routing to performance tracking to real-time messaging.
          </p>
        </div>

        {/* Feature grid — strict 3×3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { icon: <Camera size={18}/>, title: 'Autonomous OCR Scanning', desc: 'Camera-based ticket scanning — no external database needed. Three input methods. Works offline.', color: 'var(--accent-emerald)' },
            { icon: <MapPin size={18}/>, title: 'GPS Routing & Navigation', desc: 'Real-time compass guidance with distance countdown. Smart group code routing to correct lanes.', color: 'var(--accent-cyan)' },
            { icon: <Gauge size={18}/>, title: 'Live Performance Tracking', desc: 'Moves-per-hour against 4.5 MPH quota. Real-time alerts. Daily, weekly, monthly aggregation. Automated bonus estimation.', color: 'var(--accent-emerald)' },
            { icon: <Shield size={18}/>, title: 'Safety & Speed Monitoring', desc: '15/17/22 MPH tiered alerts. Incident reporting with photo capture. Weather radar with tornado alerts.', color: '#ef4444' },
            { icon: <Users size={18}/>, title: 'Role-Based Dashboards', desc: 'Ops Manager, Supervisor, Van Driver, Inventory Driver — each sees exactly what they need.', color: 'var(--accent-cyan)' },
            { icon: <MessageSquare size={18}/>, title: 'Real-Time Messaging', desc: 'Supervisor ↔ driver communication. Broadcast or individual. 2-second polling. Toast notifications.', color: '#38bdf8' },
            { icon: <Radio size={18}/>, title: 'AI Voice Assistant (Optional)', desc: 'Hands-free bidirectional voice for drivers. 15+ commands. LLM-agnostic. All AI output governed by LUME-V deterministic wrapper.', color: '#fb923c' },
            { icon: <Smartphone size={18}/>, title: 'Zero Hardware Cost', desc: 'BYOD or provide a commodity Android device. Runs as a PWA — installable, offline-capable. No specialized equipment.', color: 'var(--accent-emerald)' },
            { icon: <Cloud size={18}/>, title: 'Multi-Tenant Architecture', desc: 'Nashville. Atlanta. Any facility. Isolated data, custom branding, facility-specific configs — one codebase, unlimited sites.', color: 'var(--accent-cyan)' },
          ].map((feat, i) => (
            <div key={i} className="panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', minHeight: '140px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <div style={{ color: feat.color }}>{feat.icon}</div>
                <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{feat.title}</h4>
              </div>
              <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Three Systems — strict 3-column */}
        <motion.div {...f} className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.2)', background: 'linear-gradient(135deg, rgba(16,185,129,0.03) 0%, transparent 100%)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Three Systems. One Platform.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { label: 'Lot Ops Pro', role: 'The Operating System', desc: 'Driver management, GPS routing, performance analytics, real-time messaging, OCR ticket scanning, role-based dashboards — the complete platform running daily lot operations from a single mobile app.', color: 'var(--accent-emerald)' },
              { label: 'Lume-Auto', role: 'The Intelligence Layer', desc: 'Full OBD-II scanner at intake — read and clear DTCs, freeze frame analysis, VIN auto-read from ECU, pending fault detection. Pilot target: 60% of the condition report auto-generated before a human touches the vehicle.', color: 'var(--accent-cyan)' },
              { label: 'Cox Automotive Ledger', role: 'The Enterprise Ledger', desc: 'Every condition report, custody transfer, and diagnostic result sealed into a tamper-proof private ledger. Arbitration disputes resolved by mathematical replay, not opinion.', color: '#38bdf8' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0.5rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: item.color, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>{item.role}</div>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Who Sees What — strict 3×2 */}
        <motion.div {...f}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>Who Sees What</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { role: 'Lane Managers', feeds: 'Real-time lane readiness. Vehicles flagged for dead batteries, pending faults, or open-loop cold starts before they reach the lane.', color: 'var(--accent-cyan)' },
              { role: 'Supervisors', feeds: 'Driver performance, GPS tracking, custody chain, facility-wide throughput. Full operational dashboard from any device.', color: 'var(--accent-emerald)' },
              { role: 'Transport Teams', feeds: 'Pre-dispatch health reports. Automatic flags for vehicles that won\'t start or will fail lane checks. No surprises on the truck.', color: '#38bdf8' },
              { role: 'Reconditioning', feeds: 'Auto-generated work orders from diagnostic data. Prioritized queues based on severity. Catalyst failures, battery issues, and fluid anomalies surfaced before the vehicle arrives.', color: '#fb923c' },
              { role: 'Arbitration Teams', feeds: 'Cryptographically sealed condition reports. Deterministic replay of original scan data. Dispute resolution by math, not opinion.', color: '#38bdf8' },
              { role: 'Facility Management', feeds: 'Population health analytics across all vehicles. Predictive throughput modeling. Cross-facility benchmarking and trend analysis.', color: 'var(--accent-emerald)' },
            ].map((item, i) => (
              <div key={i} className="panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: item.color, marginBottom: '0.35rem' }}>{item.role}</div>
                <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{item.feeds}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginTop: '2.5rem' }}>
          {[
            { val: '100', unit: '%', label: 'Automated Report' },
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

        {/* CTA Button */}
        <motion.div {...f} style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a
            href="/download"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)',
              border: '1px solid rgba(16,185,129,0.4)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(16,185,129,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(16,185,129,0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 100%)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(16,185,129,0.2)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.05) 100%)';
            }}
          >
            <Download size={20} />
            Download Lot Ops Pro (Desktop)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
