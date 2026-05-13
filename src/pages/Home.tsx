import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Activity, Zap, ShieldCheck, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div 
          className="ken-burns-bg"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url(/hero_dashboard.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            zIndex: -2,
            transformOrigin: 'center center'
          }}
        />
        <div 
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,12,0.1), var(--bg-dark))',
            zIndex: -1
          }}
        />
        <div className="hero-glow" />

        <div className="container flex flex-col gap-8" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '2rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              <Activity size={14} /> The 4/42 Architecture
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              More MPG From the <span className="text-gradient">Car You Already Have</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '2rem' }}>
              No hardware changes. No ECU modification. Pure software. Pure efficiency for the 1.4 billion vehicles still on the road.
            </p>
            <div className="flex gap-4 items-center">
              <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                See Your MPG Potential <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Three steps to more MPG</h2>
          <p className="text-muted">Works on any OBD-II vehicle — every car, truck, and SUV sold after 1996.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {[
            { step: '1', title: 'Plug in.', desc: 'Connect any standard ELM327 OBD-II Bluetooth adapter to the port under your dashboard. Use an existing scanner or join the waitlist for the official adapter.', img: '/card_step1.png' },
            { step: '2', title: 'Drive normally.', desc: 'The organism learns your vehicle over your first few hundred miles. It builds a model of your specific engine, your driving patterns, and your component health.', img: '/card_step2.png' },
            { step: '3', title: 'Get smarter.', desc: 'Real-time guidance appears in the app as you drive. Maintenance predictions, efficiency scores, and quantified MPG improvements — for your car.', img: '/card_step3.png' }
          ].map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              key={item.step} 
              className="panel flex flex-col"
              style={{ padding: 0, overflow: 'hidden', position: 'relative' }}
            >
              <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="card-bg-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', fontSize: '3rem', fontWeight: 700, color: 'var(--border-strong)', lineHeight: 1, zIndex: 1 }}>{item.step}</div>
              </div>
              <div className="flex flex-col gap-4" style={{ padding: '1.5rem', flex: 1, position: 'relative', zIndex: 1, background: 'var(--bg-panel)' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{item.title}</h3>
                <p className="text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section style={{ background: 'rgba(255,255,255,0.01)', padding: '6rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container flex" style={{ gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>What drivers are recovering</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              At $3.50/gallon and 15,000 miles per year, a 10% MPG improvement puts <strong>$200–$300 back in your pocket annually.</strong>
            </p>
            <Link to="/mpg-gains" className="flex items-center gap-2 text-cyan" style={{ fontWeight: 600 }}>
              View detailed results data <ChevronRight size={18} />
            </Link>
          </div>
          <div style={{ flex: '1 1 500px' }}>
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
                  <td className="text-cyan font-mono">5–8% MPG</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Some deferred maintenance</td>
                  <td className="text-cyan font-mono">8–12% MPG</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 500 }}>Significant maintenance backlog</td>
                  <td className="text-emerald font-mono" style={{ fontWeight: 700 }}>15–20%+ MPG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Technology Callout */}
      <section className="container flex items-center" style={{ gap: '4rem', flexWrap: 'wrap-reverse' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src="/hero_obd2.png" alt="OBD2 Scanner" style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-light)' }} />
        </div>
        <div style={{ flex: '1 1 500px' }} className="flex flex-col gap-6">
          <h2 style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>42 signals.<br/>One organism.<br/>Continuous governance.</h2>
          <p className="text-muted">
            Lume-Auto watches 42 data points from your engine simultaneously — air flow, fuel flow, combustion timing, engine load, component health, driver behavior, and more.
          </p>
          <ul className="flex flex-col gap-4" style={{ listStyle: 'none', marginTop: '1rem' }}>
            {[
              { icon: <Activity className="text-cyan" />, text: 'Throughput — what\'s actually flowing right now' },
              { icon: <Zap className="text-cyan" />, text: 'Process Rate — how efficiently conversion happens' },
              { icon: <Droplets className="text-cyan" />, text: 'Flow State — what operating mode you are in' },
              { icon: <ShieldCheck className="text-cyan" />, text: 'System Lifecycle — what\'s wearing down' },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3" style={{ fontWeight: 500 }}>
                {item.icon} {item.text}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/technology" className="btn-primary" style={{ background: 'transparent' }}>
              Read the Technical Architecture <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
