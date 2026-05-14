import { motion } from 'framer-motion';
import { Smartphone, Bluetooth, Gauge, CheckCircle, Download, ShieldCheck, Zap, Star, DollarSign, Wrench, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* ═══ HERO — As Seen On TV Energy ═══ */}
      <section style={{
        background: 'linear-gradient(165deg, rgba(6,182,212,0.08) 0%, var(--bg-dark) 40%, rgba(16,185,129,0.06) 100%)',
        padding: '6rem 0 4rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '30px', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem' }}>
              ✦ Available Now
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
              Plug In. <span className="text-gradient">Save Money.</span><br/>That's It.
            </h1>
            <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 1rem', lineHeight: 1.6 }}>
              A $24 adapter. A free app. <strong style={{ color: 'var(--text-main)' }}>$180–$320 saved</strong> every year on gas.<br/>Works on any car made after 1996.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '2.5rem' }}>
              No mechanic. No modifications. No subscription required to start.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3 Steps — Big Bold Visual ═══ */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Three steps. Five minutes.</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>From unboxing to saving money.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                step: '01', icon: <Bluetooth size={32} />, title: 'Buy the Adapter',
                desc: 'Any Bluetooth ELM327 OBD-II adapter. We recommend the BAFX 34t5 ($24 on Amazon). It plugs into the port under your dashboard — every car sold after 1996 has one.',
                highlight: '$24',
                cta: { text: 'Buy on Amazon →', url: 'https://www.amazon.com/dp/B005NLQAHS' }
              },
              {
                step: '02', icon: <Smartphone size={32} />, title: 'Download the App',
                desc: 'Install Lume-Auto on your phone. Open it, tap "Scan for Adapter." The app finds your adapter via Bluetooth and connects automatically. No pairing codes, no setup.',
                highlight: 'Free',
                cta: { text: 'Download Lume-Auto →', url: '#download' }
              },
              {
                step: '03', icon: <Gauge size={32} />, title: 'Start Driving',
                desc: 'That\'s it. The organism reads 42 signals from your engine 10 times per second and starts coaching you to better MPG. You\'ll hear a chime when you\'re efficient and a buzz when you\'re wasting fuel.',
                highlight: '42 Signals',
                cta: null
              }
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="panel" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>{item.step}</div>
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '1.5rem' }}>{item.icon}</div>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(6,182,212,0.1)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>{item.highlight}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: item.cta ? '1.5rem' : '0' }}>{item.desc}</p>
                {item.cta && (
                  <a href={item.cta.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan" style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {item.cta.text}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ What You Get — Infomercial Grid ═══ */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>But Wait — There's More.</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>Seriously though. Here's everything you get.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <DollarSign size={22} />, title: 'Real Money Back', desc: '3–12% MPG improvement means $180–$320 saved per year at current gas prices. The adapter pays for itself in 2 weeks.' },
              { icon: <Activity size={22} />, title: 'Live Engine Dashboard', desc: '42 gauges updating 10 times per second. RPM, fuel flow, combustion efficiency, air-fuel ratio — everything your mechanic sees, but on your phone.' },
              { icon: <Wrench size={22} />, title: 'Skip the $150 Diagnostic', desc: 'Check engine light? The app reads the code, translates it to English, tells you what\'s wrong, and links the exact replacement part on Amazon.' },
              { icon: <ShieldCheck size={22} />, title: 'Predict Problems Early', desc: 'The organism detects component degradation 1–3% MPG before it triggers a check engine light. Fix a $30 part before it becomes a $500 repair.' },
              { icon: <Zap size={22} />, title: 'Passive Audio Coaching', desc: 'A pleasant chime through your car speakers when you\'re driving efficiently. A subtle buzz when you\'re burning extra fuel. Your brain learns the pattern automatically.' },
              { icon: <Star size={22} />, title: 'Driver Score', desc: 'A 0-100 score that tracks your driving efficiency over time. Compete with yourself. Share with your family. Watch your score climb as your fuel bill drops.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="panel flex flex-col gap-3" style={{ padding: '2rem' }}>
                <div style={{ color: 'var(--accent-cyan)' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Savings Calculator ═══ */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Do The Math</h2>
            <p className="text-muted">At $3.50/gallon and 15,000 miles per year</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Without Lume-Auto</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>$2,187</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>per year on gas</div>
            </div>
            <div className="panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>With Lume-Auto</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>$1,859</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>per year on gas</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>You save</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}><span className="text-gradient">$328</span></div>
            <div className="text-muted" style={{ fontSize: '0.95rem' }}>per year · The adapter costs $24 · Pays for itself in <strong style={{ color: 'var(--text-main)' }}>27 days</strong></div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Compatible Adapters ═══ */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Compatible Adapters</h2>
            <p className="text-muted">Any Bluetooth Low Energy (BLE) ELM327 adapter works. Here are our tested picks.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'BAFX 34t5', price: '$24', rating: '4.5★', badge: 'Best Value', link: 'https://www.amazon.com/dp/B005NLQAHS' },
              { name: 'OBDLink MX+', price: '$80', rating: '4.8★', badge: 'Fastest', link: 'https://www.amazon.com/dp/B07JFRFJG6' },
              { name: 'Veepeak OBDCheck', price: '$30', rating: '4.4★', badge: 'Budget BLE', link: 'https://www.amazon.com/dp/B076XVQMVS' },
            ].map((adapter, i) => (
              <a key={i} href={adapter.link} target="_blank" rel="noopener noreferrer" className="panel" style={{ padding: '1.5rem', textDecoration: 'none', display: 'block', transition: 'border-color 0.3s', cursor: 'pointer' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{adapter.badge}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{adapter.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '1.25rem' }}>{adapter.price}</span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>{adapter.rating}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="text-dim" style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '1.5rem' }}>Works on every OBD-II vehicle — every car, truck, and SUV sold in the US after 1996.</p>
        </div>
      </section>

      {/* ═══ Download CTA ═══ */}
      <section id="download" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Download Lume-Auto</h2>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              Free to start. Premium features for $9.99/month.<br/>Cancel anytime.
            </p>
            <div className="flex gap-4 items-center" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/waitlist" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                <Download size={20} /> Join the Waitlist
              </Link>
            </div>
            <div className="flex gap-4 items-center" style={{ justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {['No credit card required', 'Works on iOS & Android', '42-node governance'].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
                  <CheckCircle size={14} color="var(--accent-emerald)" /> {item}
                </span>
              ))}
            </div>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '2rem' }}>
              Lume-Auto · DarkWave Studios LLC / Lume42 Labs · US Provisional Patent 64/032,339
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
