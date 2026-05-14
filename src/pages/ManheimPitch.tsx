import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Shield, Activity, Zap, Server, MapPin } from 'lucide-react';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* Hero / Video Hook */}
      <section style={{ padding: '6rem 0 4rem', borderBottom: '1px solid var(--border-light)', background: 'linear-gradient(165deg, rgba(16,185,129,0.08) 0%, var(--bg-dark) 60%)' }}>
        <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              Private Enterprise Briefing
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Deterministic Vehicle Intelligence <br/><span className="text-gradient">Built for Manheim.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 3rem' }}>
              42 OBD-II telemetry signals. 100 Hz polling rate. Pure deterministic governance. 
              Zero AI in the critical path. Watch the live 2-minute demonstration below.
            </p>

            {/* Video Placeholder */}
            <div className="panel" style={{ 
              position: 'relative', 
              aspectRatio: '16/9', 
              width: '100%', 
              overflow: 'hidden', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'url(https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80) center/cover',
              cursor: 'pointer'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 10, 10, 0.6)', backdropFilter: 'blur(4px)' }} />
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'rgba(16, 185, 129, 0.2)', 
                border: '2px solid var(--accent-emerald)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}>
                <Play size={32} color="var(--accent-emerald)" style={{ marginLeft: '6px' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>Live F-150 Intake Demonstration</div>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>2 MIN WATCH</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Reality vs The Vision (Hardware) */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            
            {/* Phase 1 */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>PHASE 1: THE REALITY</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Commodity Hardware.</h3>
              <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>
                The demonstration above is running on a standard <strong>$25 off-the-shelf ELM327 BLE dongle</strong> (Veepeak/Vgate). We built our software to run perfectly on commodity hardware so you can deploy tomorrow without capital investment.
              </p>
              <div className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="flex items-center gap-3"><CheckCircle size={18} color="var(--accent-cyan)" /> <span style={{ fontSize: '0.9rem' }}>Standard J1979 request/response protocol</span></div>
                <div className="flex items-center gap-3"><CheckCircle size={18} color="var(--accent-cyan)" /> <span style={{ fontSize: '0.9rem' }}>Compatible with iOS and Android</span></div>
                <div className="flex items-center gap-3"><CheckCircle size={18} color="var(--accent-cyan)" /> <span style={{ fontSize: '0.9rem' }}>No custom manufacturing required for pilot</span></div>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div style={{ color: '#fb923c', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>PHASE 2: THE MOAT</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>The Lume Dongle.</h3>
              <p className="text-muted" style={{ marginBottom: '2rem', lineHeight: 1.6 }}>
                Every scanner on the market is a dumb pipe. I'm building a smart endpoint on a <strong>$13 ESP32 BOM</strong> that will completely redefine connection speed and security bypass.
              </p>
              <div className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderColor: 'rgba(251,146,60,0.3)', background: 'rgba(251,146,60,0.02)' }}>
                <div className="flex items-center gap-3"><Zap size={18} color="#fb923c" /> <span style={{ fontSize: '0.9rem' }}><strong>Zero Discovery Time:</strong> Passive CAN bus sniffing</span></div>
                <div className="flex items-center gap-3"><Shield size={18} color="#fb923c" /> <span style={{ fontSize: '0.9rem' }}><strong>Ghost Mode:</strong> Bypasses modern Secure Gateways (SGW)</span></div>
                <div className="flex items-center gap-3"><Server size={18} color="#fb923c" /> <span style={{ fontSize: '0.9rem' }}><strong>Fleet Management:</strong> Unique ID and OTA firmware updates</span></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* The Unified Lot */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Unified Lot</h2>
          <p className="text-muted" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Lume-Auto isn't a standalone product. It's the intelligence layer that feeds directly into Lume Ops Recon.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel flex gap-4" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <Activity size={24} color="var(--accent-emerald)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Intake Automation</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>45-second deterministic scan generates a structured condition report. Dead batteries and severe misfires are flagged before the vehicle ever reaches a lane.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="panel flex gap-4" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <MapPin size={24} color="var(--accent-cyan)" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Autonomous Routing (Ops Recon)</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>The organism passes the health data to Ops Recon. The vehicle is automatically routed to the correct lane or assigned to the reconditioning queue. Drivers receive GPS move assignments instantly.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="panel flex gap-4" style={{ padding: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(167, 139, 250, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
                <Shield size={24} color="#a78bfa" />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Cryptographic Arbitration Defense</h4>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>When a post-sale dispute arises, you pull the intake scan log. Replay the inputs through the deterministic runtime, and you get the exact same result. Disputes are resolved by indisputable data, not opinion.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 30-Day Pilot */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>The 30-Day Pilot Offer</h2>
          <div className="panel" style={{ padding: '3rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Volume</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>500 Vehicles</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Duration</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>30 Days</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Infrastructure Cost</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>$0.00</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Deliverable</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Signed ROI Report</div>
              </div>
            </div>
            
            <hr style={{ borderColor: 'var(--border-light)', margin: '2rem 0' }} />
            
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              We deploy standard BLE adapters at one intake station. We process 500 vehicles alongside your existing workflow. At close, you receive a signed report detailing the condition report automation rate, the arbitration events flagged at intake, and the inspector hours freed.
            </p>

            <div style={{ textAlign: 'center' }}>
              <a href="mailto:team@dwsc.io" className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                Let's Discuss Next Week <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
