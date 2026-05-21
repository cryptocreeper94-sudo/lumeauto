import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Activity, Zap, ShieldCheck, Droplets, Volume2, Wrench, Users, Cpu, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleField from '../components/effects/ParticleField';
import MiniDiagnostic from '../components/effects/MiniDiagnostic';
import AnimatedCounter from '../components/effects/AnimatedCounter';

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
              42 OBD-II signals. 100ms intervals. Zero AI dependency. Pure deterministic governance for the 1.4 billion petroleum vehicles still on the road.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '2rem' }}>
              2,358 deterministic test cases passed · Zero AI calls
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
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>At $3.50/gallon and 15,000 miles per year, a 10% improvement puts <strong style={{ color: 'var(--text-main)' }}>$180–$320 back in your pocket annually.</strong></p>
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

      {/* ═══ Ecosystem ═══ */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-cyan" style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Ecosystem</p>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>One Engine. Infinite Domains.</h2>
          <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>Lume Auto validates the deterministic governance substrate at consumer scale. Each subsequent engine inherits the same runtime, the same primitives, and the same integration pattern.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
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
            <motion.a key={i} href={item.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="panel flex flex-col gap-3" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
