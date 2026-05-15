import { motion } from 'framer-motion';
import { ArrowRight, Zap, MapPin, ShieldCheck, BatteryCharging, AlertTriangle, Activity } from 'lucide-react';
import MeridianVisualizer from '../components/MeridianVisualizer';

export default function MeridianPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* Hero */}
      <section style={{ padding: '6rem 0 4rem', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(165deg, rgba(167, 139, 250, 0.08) 0%, var(--bg-dark) 60%)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Phase 2: EV Infrastructure
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Deterministic Wireless Energy <br/><span style={{ color: '#a78bfa' }}>Built for Manheim.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3rem' }}>
              No ground stations. No broken adapters. No physical bottlenecks. Route energy to your EVs deterministically from overhead while maintaining a perfect cryptographic billing ledger.
            </p>

            {/* Live Visualizer */}
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <MeridianVisualizer />
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Ground Friction Problem */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-darker)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="panel flex gap-6 items-start" style={{ padding: '2.5rem', borderColor: 'rgba(239,68,68,0.3)', background: 'linear-gradient(90deg, rgba(239,68,68,0.05) 0%, rgba(10,10,12,0) 100%)' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ef4444' }}>The Ground Charging Bottleneck</h3>
              <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1rem' }}>
                On any given day, you have 16-20 EVs fighting for physical charging ports. You are limited by ground footprint, broken cables, missing manufacturer adapters, and the high labor cost of employees moving cars between stations.
              </p>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.6 }}>
                Every hour an EV spends waiting for an adapter is an hour it isn't moving toward the auction block. Physical charging stations are a fundamental disruption to your lot velocity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Overhead Architecture */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>ARCHITECTURE: MERIDIAN CANON</div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>The Overhead Advantage.</h2>
              <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                We pull the charging infrastructure out of the ground entirely. Meridian Anchor Nodes are mounted overhead in your staging canopies. You drive under, you charge, you drive out.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }} className="flex items-center gap-2"><MapPin size={18} color="#a78bfa"/> Zero Ground Friction</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                    No physical bollards taking up valuable lot space. Vehicles flow freely in and out of the charging zone without navigating around concrete stations or tangled cords.
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-main)' }} className="flex items-center gap-2"><BatteryCharging size={18} color="#a78bfa"/> Adapter-Agnostic Energy Routing</h4>
                  <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                    Whether it's a Tesla, a Ford, or a Rivian, Meridian routes the energy directly to the vehicle's receiver. Your inspectors never have to hunt for the right J1772 or NACS adapter again.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
               <img src="/assets/images/meridian_canon_concept.jpg" alt="Meridian Canopy" style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(167, 139, 250, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} onError={(e) => { e.currentTarget.style.display='none'; }} />
               {/* Fallback pattern if image is missing */}
               <div style={{ padding: '3rem', background: 'var(--bg-darker)', borderRadius: '16px', border: '1px solid rgba(167, 139, 250, 0.3)', textAlign: 'center', marginTop: '-10px' }}>
                 <Zap size={48} color="#a78bfa" style={{ margin: '0 auto 1rem' }} />
                 <h4 style={{ color: 'var(--text-main)' }}>Passive Routing Protocol</h4>
                 <p className="text-muted" style={{ fontSize: '0.9rem' }}>Energy flowing like data packets.</p>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Cryptographic Ledger */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(16,185,129,0.02) 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Perfect Billing Accuracy</h2>
          <p className="text-muted" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            We don't just route energy; we cryptographically sign it. Say goodbye to manual energy logs and disputed billing hours.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel flex gap-4" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <Activity size={24} color="var(--accent-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Automatic Sign-In</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>The moment the vehicle enters the Meridian canopy, the nodes identify the vehicle's unique telemetry signature and log the exact incoming battery percentage.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="panel flex gap-4" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <ShieldCheck size={24} color="var(--accent-cyan)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Exact Charge Out (The Hash)</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>When the vehicle drives away, the session ends automatically. A cryptographic receipt is generated capturing the exact "Charge In" and "Charge Out" state. It is immutable and perfectly accurate for internal accounting.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Modernize Your EV Fleet</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
            Let's pilot the Meridian Canon architecture over your busiest EV intake lane. Stop fighting for ground space and adapters.
          </p>
          <a href="mailto:team@dwsc.io" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem', background: '#a78bfa', color: '#fff', border: 'none' }}>
            Discuss Phase 2 <ArrowRight size={20} />
          </a>
        </div>
      </section>

    </div>
  );
}
