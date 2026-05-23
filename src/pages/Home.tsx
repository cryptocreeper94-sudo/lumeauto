import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Activity, Zap, ShieldCheck, Droplets, Volume2, Wrench, Users, Cpu, Gauge, BatteryCharging, MapPin, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleField from '../components/effects/ParticleField';
import MiniDiagnostic from '../components/effects/MiniDiagnostic';
import AnimatedCounter from '../components/effects/AnimatedCounter';
import MeridianBreakdown from '../components/MeridianBreakdown';

const MeridianScene3D = lazy(() => import('../components/MeridianVisualizer'));

const HERO_IMAGES = [
  '/hero_dashboard.png',
  '/card_step2.png',
  '/card_step1.png'
];

export default function Home() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {/* ═══ Hero Section ═══ */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="ken-burns-bg"
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${HERO_IMAGES[currentImgIndex]})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transformOrigin: 'center center'
              }}
            />
          </AnimatePresence>
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(10,10,12,0.3), var(--bg-dark))', zIndex: 1 }} />
        <ParticleField />
        <div className="hero-glow" style={{ zIndex: 1 }} />

        <div className="container flex flex-col gap-8" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '800px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Activity size={14} /> Deterministic Diagnostic Engine · 4/42 Architecture
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.05 }}>
              More MPG From the <span className="text-gradient">Car You Already Have</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.2rem', maxWidth: '640px', marginBottom: '1rem', lineHeight: 1.6 }}>
              42-signal diagnostic engine. Fuel coaching. Predictive maintenance. Immobilizer key programming. Remote start without subscription. $5,000–$7,000 in professional scan tool capability — on a $15 adapter you already own.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '2rem' }}>
              2,358 deterministic test cases passed · Key Management (Mode 05) + Remote Start (Mode 06) live
            </p>
            <div className="flex gap-4 items-center" style={{ flexWrap: 'wrap' }}>
              <Link to="/order" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                Order Now — From $9.99 <ArrowRight size={20} />
              </Link>
              <Link to="/enterprise" className="flex items-center gap-2 text-cyan" style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Enterprise Solutions <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Mini diagnostic engine — floating ambient visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="diagnostic-engine-float diagnostic-engine-glow"
            style={{ position: 'absolute', right: 'clamp(1rem, 8vw, 8rem)', top: '50%', transform: 'translateY(-50%)', display: 'none' }}
          >
            <MiniDiagnostic size={280} />
          </motion.div>
          <style>{`@media (min-width: 900px) { .diagnostic-engine-float { display: block !important; } }`}</style>
        </div>

        {/* Slide indicators */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: '8px' }}>
          {HERO_IMAGES.map((_, i) => (
            <div key={i} style={{ width: i === currentImgIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === currentImgIndex ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)', transition: 'all 0.4s ease' }} />
          ))}
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>How It Works</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Three steps to deterministic governance</h2>
          <p className="text-muted">Works on any OBD-II vehicle — every car, truck, and SUV sold after 1996.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { step: '1', title: 'Connect.', desc: 'Plug a standard OBD-II adapter running proprietary Lume firmware into the port under your dashboard. No installation. No wiring. No ECU reprogramming.', img: '/card_step1.png' },
            { step: '2', title: 'Observe.', desc: 'The Engine ingests 42 telemetry signals at 100ms intervals — airflow, fuel flow, combustion timing, engine load, component health, and driver behavioral patterns.', img: '/card_step2.png' },
            { step: '3', title: 'Govern.', desc: 'Deterministic coaching, predictive maintenance alerts, and quantified MPG scoring — calibrated to your specific vehicle\'s torque curve and degradation profile.', img: '/card_step3.png' }
          ].map((item, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} key={item.step} className="panel flex flex-col" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="card-bg-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '3rem', fontWeight: 700, color: 'var(--border-strong)', lineHeight: 1, zIndex: 1 }}>{item.step}</div>
              </div>
              <div className="flex flex-col gap-4" style={{ padding: '1.5rem', flex: 1, background: 'var(--bg-panel)' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ The Numbers ═══ */}
      <section style={{ background: 'rgba(255,255,255,0.01)', padding: '6rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Quantified Results</p>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>What drivers are recovering</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>Fuel coaching, skipped shop visits, and one major preventive repair catch. <strong style={{ color: 'var(--text-main)' }}>First-year value: $2,880+.</strong></p>
          </div>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle Condition</th>
                  <th>Typical Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 500 }}>Good maintenance, average driver</td>
                  <td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>3–8% MPG</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Some deferred maintenance</td>
                  <td style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>8–12% MPG</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Significant maintenance backlog</td>
                  <td style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>15%+ MPG</td>
                </tr>
              </tbody>
            </table>
            <p className="text-dim" style={{ fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>Conservative public claim: 5–10% improvement across diverse fleets</p>
          </div>
        </div>
      </section>

      {/* ═══ Passive Savings ═══ */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Consumer Intelligence</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Passive Savings. Zero Effort.</h2>
          <p className="text-muted">A massive lifestyle upgrade that pays for itself over and over again.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel flex flex-col gap-4">
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', alignSelf: 'flex-start' }}>
              <Volume2 size={24} color="var(--accent-cyan)" />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Passive Audio Coach</h3>
            <p className="text-muted">Engine-generated coaching calibrated to your vehicle's torque curve. Audio tones through car Bluetooth — a chime for optimal efficiency, a buzz for fuel waste. Pure classical conditioning. No screen required.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="panel flex flex-col gap-4">
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', alignSelf: 'flex-start' }}>
              <Wrench size={24} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Diagnostic Intelligence</h3>
            <p className="text-muted">Stop paying $150 for a diagnostic read. The Engine runs continuous 42-node health scans, translates fault codes to plain English, predicts component failures 1–3% MPG before they trigger a check engine light, and links you to the exact part on Amazon.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="panel flex flex-col gap-4">
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', alignSelf: 'flex-start' }}>
              <Users size={24} color="var(--text-main)" />
            </div>
            <h3 style={{ fontSize: '1.5rem' }}>Family & Fleet Dashboard</h3>
            <p className="text-muted">Monitor every vehicle in your household. Teen driver scoring, centralized maintenance alerts, shared efficiency dashboards. Commercial fleets get driver behavior analytics, fuel waste reporting, and maintenance coordination at scale.</p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Deterministic Runtime ═══ */}
      <section className="container">
        <div className="flex" style={{ gap: '4rem', flexWrap: 'wrap-reverse', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img src="/hero_obd2.png" alt="OBD-II Scanner with Lume Firmware" style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-light)' }} />
          </div>
          <div style={{ flex: '1 1 500px' }} className="flex flex-col gap-6">
            <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Deterministic Runtime</p>
            <h2 style={{ fontSize: '2.5rem', lineHeight: 1.15 }}>42 signals.<br/>One diagnostic engine.<br/>Continuous governance.</h2>
            <p className="text-muted">Built on the native Lume deterministic runtime — not a third-party AI framework. Same inputs, same outputs, every time. No hallucinations. No probabilistic inference. Fully auditable.</p>
            <ul className="flex flex-col gap-4" style={{ listStyle: 'none', marginTop: '0.5rem' }}>
              {[
                { icon: <Activity className="text-cyan" />, text: 'Throughput Base — airflow, fuel flow, intake efficiency' },
                { icon: <Zap className="text-cyan" />, text: 'Process Rate — combustion timing, BSFC, torque throughput' },
                { icon: <Droplets className="text-cyan" />, text: 'Flow State — drivetrain efficiency, behavioral coherence' },
                { icon: <ShieldCheck className="text-cyan" />, text: 'System Lifecycle — degradation modeling, maintenance trajectory' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3" style={{ fontWeight: 500 }}>
                  {item.icon} {item.text}
                </li>
              ))}
            </ul>
            <div className="flex gap-4" style={{ marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <Link to="/technology" className="btn-primary" style={{ background: 'transparent' }}>
                Technical Architecture <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Planetary Impact ═══ */}
      <section style={{ background: 'rgba(255,255,255,0.01)', padding: '6rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-emerald" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Impact</p>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Planetary-Scale Efficiency</h2>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>Moderate adoption across 30–50% of the global petroleum vehicle fleet could reduce global fuel consumption by 5–8%, saving 35–56 billion gallons annually.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { val: '1.4B', label: 'Petroleum vehicles globally' },
              { val: '35–56B', label: 'Gallons saved annually (moderate adoption)' },
              { val: '175–280M', label: 'Metric tons CO₂ eliminated' },
              { val: '6.85M', label: 'Barrels/day eliminated (full deployment)' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="panel" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <AnimatedCounter value={parseFloat(stat.val.replace(/[^0-9.]/g, ''))} suffix={stat.val.replace(/[0-9.]/g, '')} color="var(--accent-emerald)" />
                <div className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Mode 06 — Remote Start ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-light)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'url(/assets/images/mode06_remote_start.png)', backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-dark), rgba(10,10,12,0.92), var(--bg-dark))', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '6rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-emerald)', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Radio size={14} /> Mode 06 — Remote Start Firmware
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Remote Start Without the <span className="text-gradient">Subscription</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
              GM OnStar charges $25/month. FordPass charges $30/month. Mopar charges $35/month. LUME Mode 06 uses the same CAN-bus architecture as OEM remote start — without the telematics module, without the subscription, without the OEM relationship.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto 3rem' }}>
            {[
              { icon: <ShieldCheck size={22} />, title: 'Pre-Start Safety Check', desc: 'Reads hood status, battery voltage, active DTCs, and IMMO credential before any start attempt. 8 hard safety constraints enforced at the firmware level.', color: 'var(--accent-emerald)' },
              { icon: <Radio size={22} />, title: 'CAN-Bus Remote Start', desc: 'Sends OEM-native start sequence via CAN bus. Ed25519 signed authorization token with 30-second expiry. PIN or biometric required per command.', color: 'var(--accent-cyan)' },
              { icon: <Gauge size={22} />, title: 'Runtime Monitoring', desc: 'Polls RPM, coolant temp, and battery voltage every 5 seconds. Auto-stops on stall, timeout, low battery, BLE loss, or hood open. Configurable 5–20 minute runtime.', color: '#f59e0b' },
              { icon: <ShieldCheck size={22} />, title: 'TLL-Verified Receipts', desc: 'Every remote start and stop event is cryptographically hashed and anchored to the Trust Layer Ledger. Permanent, tamper-proof vehicle history.', color: 'var(--accent-emerald)' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="panel" style={{ padding: '1.75rem' }}>
                <div style={{ color: item.color, marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* OEM Subscription Killer */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel" style={{ maxWidth: '900px', margin: '0 auto 3rem', padding: '2rem', borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.03)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>What You Stop Paying For</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {[
                { name: 'GM OnStar', monthly: '$25/mo', annual: '$300/yr', color: '#ef4444' },
                { name: 'FordPass Connect', monthly: '$30/mo', annual: '$360/yr', color: '#ef4444' },
                { name: 'Mopar Connect', monthly: '$35/mo', annual: '$420/yr', color: '#ef4444' },
                { name: 'LUME Mode 06', monthly: 'One-time', annual: 'No subscription', color: 'var(--accent-emerald)' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '1rem 1.25rem', borderRadius: '12px', background: i === 3 ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.04)', border: `1px solid ${i === 3 ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.1)'}` }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{s.name}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: s.color }}>{s.monthly}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{s.annual}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>How Mode 06 Works</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { step: '01', label: 'Register Key', desc: 'Complete Mode 05C to register the dongle as a valid IMMO key credential on the target vehicle.' },
                { step: '02', label: 'Safety Check', desc: 'Mode 06A reads hood, battery, DTCs, and confirms the IMMO credential is present and valid.' },
                { step: '03', label: 'Authenticate', desc: 'App generates a signed Ed25519 token (30s expiry). Biometric or PIN confirmation required.' },
                { step: '04', label: 'Remote Start', desc: 'Dongle sends OEM-native CAN start sequence. RPM monitored until engine confirmed running.' },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} style={{ textAlign: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{s.step}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>{s.label}</div>
                  <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{s.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '2rem', maxWidth: '600px', margin: '2rem auto 0' }}>
              Ford, GM, and Stellantis supported at launch. Toyota, Honda, and Nissan in development. Requires Mode 05 (Key Management) completion on the target vehicle as a prerequisite.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ HydroCore — Hydrogen Engine ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-light)' }}>
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'url(/assets/images/hydrocore/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--bg-dark), rgba(10,10,12,0.95), var(--bg-dark))', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '6rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: '#00E5FF', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <BatteryCharging size={14} /> Patent 64/032,339 Pending
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              HydroCore Drive — <span style={{ background: 'linear-gradient(135deg, #00E5FF, #06b6d4, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Closed-Loop Hydrogen Engine</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
              The world's first deterministic closed-loop hydrogen engine. The vehicle carries water, splits it via PEM electrolysis, feeds hydrogen to a fuel cell, and recovers exhaust water. No hydrogen station required.
            </p>
          </div>

          {/* Flow Diagram */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap', padding: '2rem', background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.12)', borderRadius: '20px' }}>
              {[
                { icon: '💧', label: 'Water\nReservoir', color: '#1565C0' },
                { icon: '⚡', label: 'PEM\nElectrolyzer', color: '#FFC107' },
                { icon: 'H₂', label: 'Hydrogen\nBuffer', color: '#00695C' },
                { icon: '🔋', label: 'Fuel Cell\nStack', color: '#00E5FF' },
                { icon: '⚙️', label: 'Electric\nDrivetrain', color: '#607D8B' },
              ].map((node, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', padding: '16px 12px', minWidth: '100px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px', filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.3))' }}>{node.icon}</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: node.color, lineHeight: 1.4, letterSpacing: '0.03em', whiteSpace: 'pre-line' }}>{node.label}</div>
                  </div>
                  {i < 4 && <div style={{ color: 'rgba(0,229,255,0.4)', fontSize: '1.5rem', fontFamily: 'var(--font-mono)', padding: '0 4px' }}>→</div>}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(0,229,255,0.5)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                ← Water Recovery Loop ←
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
            {[
              { val: '3–8%', label: 'Faraday Efficiency Gain', color: '#00E5FF' },
              { val: '60–80', label: 'Extra Miles/Hr (Meridian)', color: '#10b981' },
              { val: '10ms', label: 'Full System Response', color: '#38bdf8' },
              { val: '0%', label: 'H₂ Infrastructure Needed', color: '#FFC107' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '1.25rem', background: `${s.color}0C`, border: `1px solid ${s.color}20`, borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Component Grid */}
          <h3 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center' }}>Vehicle Subsystems</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '900px', margin: '0 auto 3rem' }}>
            {[
              { img: '/assets/images/hydrocore/water.png', name: 'Water Reservoir', spec: 'Onboard H₂O supply', color: '#1565C0' },
              { img: '/assets/images/hydrocore/electrolyzer.png', name: 'PEM Electrolyzer', spec: 'H₂O → H₂ + O₂', color: '#FFC107' },
              { img: '/assets/images/hydrocore/h2buffer.png', name: 'H₂ Buffer Tank', spec: '10 bar pressurized', color: '#00695C' },
              { img: '/assets/images/hydrocore/fuelcell.png', name: 'PEM Fuel Cell', spec: 'H₂ → Electricity', color: '#00E5FF' },
              { img: '/assets/images/hydrocore/battery.png', name: 'Battery Pack', spec: 'Floor-mounted Li-ion', color: '#6A1B9A' },
              { img: '/assets/images/hydrocore/motor.png', name: 'Electric Motor', spec: 'Rear-axle drive unit', color: '#607D8B' },
            ].map((comp, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${comp.color}25`, background: 'rgba(255,255,255,0.02)', transition: 'border-color 0.3s, transform 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${comp.color}50`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${comp.color}25`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <img src={comp.img} alt={comp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,10,12,0.85) 0%, transparent 60%)` }} />
                </div>
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>{comp.name}</div>
                  <div style={{ fontSize: '0.72rem', color: comp.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}>{comp.spec}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <a href="https://hydrocore.dev" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(0,229,255,0.3)', color: '#00E5FF' }}>
              Explore Full 3D Architecture — hydrocore.dev <ArrowRight size={18} />
            </a>
            <p className="text-dim" style={{ fontSize: '0.72rem', marginTop: '1rem' }}>
              Full specification: <em>HydroCore Drive — Hydrogen-Hybrid Electric Vehicle</em> · Canon² Paper Series · DOI pending Zenodo
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Meridian — Wireless Energy Infrastructure ═══ */}
      <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border-light)', padding: '6rem 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(165deg, rgba(30,58,95,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Radio size={14} /> Patent 64/056,378 Pending · Wireless Energy
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Meridian Canon — <span className="text-gradient">Deterministic Wireless Energy</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
              No ground stations. No broken adapters. No physical bottlenecks. Route energy to EVs deterministically from overhead while maintaining a perfect cryptographic billing ledger.
            </p>
          </div>

          {/* 3D Scene */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Suspense fallback={
              <div style={{ width: '100%', height: '520px', borderRadius: '16px', background: '#04060c', border: '1px solid rgba(30,58,95,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <Zap size={36} color="var(--accent-cyan)" style={{ marginBottom: 12 }} />
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Loading 3D Scene...</div>
                </div>
              </div>
            }>
              <MeridianScene3D />
            </Suspense>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <p className="text-dim" style={{ fontSize: '0.72rem', letterSpacing: '0.04em', marginBottom: '0.2rem' }}>
                INTERACTIVE 3D · DRAG TO ROTATE · SCROLL TO ZOOM
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
                Overhead Anchor Nodes route wireless energy to vehicles parked beneath the staging canopy. No ground infrastructure required.
              </p>
            </div>
          </motion.div>

          {/* Ground vs Overhead Comparison */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ margin: '4rem 0' }}>
            <img src="/assets/images/meridian/ground_vs_overhead.png" alt="Ground vs Overhead Charging Comparison" style={{
              width: '100%', borderRadius: '16px', border: '1px solid rgba(30,58,95,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }} />
          </motion.div>

          {/* Architecture Features */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              { icon: <MapPin size={22} />, title: 'Zero Ground Friction', desc: 'No bollards taking up lot space. Vehicles flow freely through the charging zone without navigating around concrete stations or tangled cords.', color: 'var(--accent-cyan)' },
              { icon: <BatteryCharging size={22} />, title: 'Adapter-Agnostic Routing', desc: 'Tesla, Ford, or Rivian — Meridian routes energy directly to the vehicle receiver. No hunting for the right J1772 or NACS adapter.', color: '#38bdf8' },
              { icon: <Cpu size={22} />, title: 'Deterministic Protocol', desc: 'Not a probabilistic network. Each energy packet is routed via deterministic governance — same inputs, same outputs, every time.', color: 'var(--accent-emerald)' },
              { icon: <ShieldCheck size={22} />, title: 'Cryptographic Ledger', desc: 'Every charge session is cryptographically signed with Ed25519 and anchored to the Trust Layer Ledger for immutable receipts.', color: '#38bdf8' },
            ].map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="panel" style={{ padding: '2rem', borderColor: `${feat.color}22`, transition: 'border-color 0.3s, transform 0.3s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}44`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${feat.color}22`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ padding: '12px', background: `${feat.color}15`, borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem', color: feat.color }}>{feat.icon}</div>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{feat.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Component Breakdown Carousel */}
          <MeridianBreakdown />

          {/* Patent & CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <div style={{
              background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)',
              borderRadius: '12px', padding: '1.25rem', maxWidth: '550px', margin: '0 auto 2rem',
              display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>PATENT</span>
                <span style={{ color: 'var(--text-main)' }}>U.S. Provisional 64/056,378</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>ARCHIVE</span>
                <span style={{ color: 'var(--text-main)' }}>DOI: 10.5281/zenodo.20028362</span>
              </div>
            </div>
            <a href="https://meridiancanon.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Full Meridian Architecture <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Ecosystem</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>One Engine. Infinite Domains.</h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>Lume Auto validates the deterministic governance substrate at consumer scale. Each subsequent engine inherits the same runtime, the same primitives, and the same integration pattern.</p>
        </div>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }} className="ecosystem-grid">
          {[
            { name: 'Lume Scan', desc: 'Professional OBD-II diagnostic scanner — 42 signals, predictive maintenance, fuel governance.', status: 'Live · From $9.99', statusColor: 'var(--accent-emerald)', icon: <Gauge size={20} />, url: 'https://lumescan.tech' },
            { name: 'GarageBot', desc: 'Smart garage and workshop management with IoT integration, tool inventory, and maintenance tracking.', status: 'Live', statusColor: 'var(--accent-emerald)', icon: <Wrench size={20} />, url: 'https://garagebot.io' },
            { name: 'HydroCore', desc: 'Smart water management engine for residential and commercial flow governance and leak detection.', status: 'Active', statusColor: 'var(--accent-cyan)', icon: <Droplets size={20} />, url: 'https://hydrocore.com' },
            { name: 'Meridian Canon', desc: 'Navigation and positioning framework for deterministic route computation and location services.', status: 'Active', statusColor: 'var(--accent-emerald)', icon: <Activity size={20} />, url: 'https://meridiancanon.com' },
            { name: 'Verdara', desc: 'Plant identification and care engine — deterministic botanical classification and health monitoring.', status: 'Live', statusColor: 'var(--accent-emerald)', icon: <ShieldCheck size={20} />, url: 'https://verdara.tlid.io' },
            { name: 'Verdara Ultra', desc: 'Adventure travel and terrain analysis — 42-node outdoor engine for ultra-distance navigation and safety.', status: 'Free + Premium', statusColor: 'var(--accent-cyan)', icon: <Zap size={20} />, url: 'https://verdaraultra.com' },
            { name: 'AXIOM', desc: 'Deterministic knowledge architecture — 120K+ topics, offline-capable, zero-hallucination responses.', status: 'Active', statusColor: 'var(--accent-emerald)', icon: <Cpu size={20} />, url: 'https://axiom.tlid.io' },
            { name: 'Trust Layer', desc: 'The blockchain ecosystem powering all DarkWave products — Signal token, DeFi, NFTs, and 42 connected apps.', status: 'Live', statusColor: 'var(--accent-emerald)', icon: <Users size={20} />, url: 'https://dwtl.io' },
          ].map((item, i) => (
            <motion.a key={i} href={item.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="panel flex flex-col gap-3 ecosystem-card" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <div className="flex items-center gap-3">
                <div style={{ color: 'var(--accent-cyan)' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem' }}>{item.name}</h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: item.statusColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>● {item.status}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ═══ Founder's Letter ═══ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04), rgba(16,185,129,0.03))', border: '1px solid rgba(6,182,212,0.12)', borderRadius: '20px', padding: 'clamp(2rem, 5vw, 3.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>From the Founder</p>
            <div style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ margin: 0 }}>Professional tools shouldn't require a professional budget.</p>
              <p style={{ margin: 0 }}>A diagnostic scan costs $150 at a shop. A professional scanner costs $3,700–$7,000. A remote start subscription costs $25–$35 a month. An aftermarket remote start install costs $400–$800. A locksmith for a single car key costs $200–$400.</p>
              <p style={{ margin: 0 }}>We built Lume to end that.</p>
              <p style={{ margin: 0 }}>Lume Scan puts $5,000+ in professional scan tool capability on a $15 adapter you already own — starting at $9.99. Mode 05 key management replaces a $300 locksmith visit. Mode 06 proximity remote start replaces a $400 aftermarket install or a $35/month OEM subscription — for $9.99 a month.</p>
              <p style={{ margin: 0 }}>Every product we build follows the same principle: take something that costs hundreds at a shop and put it in your hands for under $40. Real tools. Real savings. Real ownership.</p>
              <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--accent-emerald)' }}>This is just the beginning.</p>
            </div>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Jason A.</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Founder, <a href="https://lume42.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>Lume42 Labs</a> & DarkWave Studios LLC</p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', margin: '4px 0 0', fontStyle: 'italic' }}>Gladeville, Tennessee</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DarkWave CTA ═══ */}
      <section className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Part of Something Bigger</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>Lume Auto is the automotive arm of DarkWave Studios — a 42-app ecosystem spanning blockchain, AI, creative tools, and enterprise infrastructure.</p>
          <a href="https://dwtl.io" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Explore the Ecosystem <ArrowRight size={20} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
