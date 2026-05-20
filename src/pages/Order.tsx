import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Activity, Wrench, Star, CheckCircle, ChevronDown, Smartphone, Gauge, Package } from 'lucide-react';
import QRCodeLib from 'qrcode';

const RETAIL_VALUE = 199;
const KIT_PRICE = 49.99;
const SAVINGS_PCT = Math.round((1 - KIT_PRICE / RETAIL_VALUE) * 100);

const FEATURES = [
  { icon: <Activity size={20} />, title: '42-Signal Governance Engine', desc: 'Reads 42 OBD-II signals at 100ms intervals. RPM, fuel flow, combustion timing, air-fuel ratio — everything a $200 scanner shows and more.', color: 'var(--accent-cyan)' },
  { icon: <Zap size={20} />, title: 'Passive Audio Coaching', desc: 'Bluetooth audio tones through your car speakers. Chime = efficient. Buzz = wasting fuel. Your brain learns the pattern automatically.', color: 'var(--accent-emerald)' },
  { icon: <Wrench size={20} />, title: 'Skip the $150 Diagnostic', desc: 'Check engine light? Reads the code, translates to English, tells you what\'s wrong, and links the exact part on Amazon.', color: '#f59e0b' },
  { icon: <Shield size={20} />, title: 'Predictive Maintenance', desc: 'Detects component degradation 1–3% MPG before it triggers a check engine light. Fix $30 parts before they become $500 repairs.', color: '#38bdf8' },
  { icon: <Star size={20} />, title: 'Driver Score & Family Dashboard', desc: 'Track efficiency over time. Teen driver scoring. Multi-vehicle household monitoring. Fleet analytics at scale.', color: 'var(--accent-cyan)' },
  { icon: <Gauge size={20} />, title: 'Real-Time Engine Dashboard', desc: '42 live gauges updating 10x per second on your phone. Professional-grade telemetry for every driver.', color: 'var(--accent-emerald)' },
];

const FAQS = [
  { q: 'What vehicles does it work on?', a: 'Every car, truck, and SUV sold in the US after 1996 with an OBD-II port. That\'s 1.4 billion vehicles worldwide.' },
  { q: 'How much will I actually save?', a: 'At $3.50/gallon and 15,000 miles/year, most drivers save $180–$320 annually. The kit pays for itself in under 3 weeks.' },
  { q: 'What\'s in the box?', a: 'A professional-grade WiFi OBD-II diagnostic adapter + your unique license code emailed instantly for the Lume-Auto app (Android APK, PWA, or native iOS coming soon).' },
  { q: 'Do I need a mechanic to install it?', a: 'No. You plug the adapter into the OBD-II port under your dashboard (every car has one). Takes 10 seconds. No wiring, no tools, no modifications.' },
  { q: 'Is there a subscription?', a: 'The core governance engine is included with your kit purchase. Premium features (fleet analytics, family dashboard, priority support) are available for $9.99/month. Cancel anytime.' },
  { q: 'How is this different from a cheap Amazon scanner?', a: 'Cheap scanners just read codes. Lume-Auto runs a continuous 42-node deterministic organism that actively coaches you, predicts failures before they happen, and quantifies your fuel savings in real-time. It\'s the difference between a thermometer and a doctor.' },
];

export default function Order() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrRef.current) {
      QRCodeLib.toCanvas(qrRef.current, 'https://lumeauto.tech/download', {
        width: 120, margin: 1,
        color: { dark: '#06b6d4', light: '#0a0a0c' },
        errorCorrectionLevel: 'M',
      });
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout-kit', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        background: 'linear-gradient(165deg, rgba(6,182,212,0.06) 0%, var(--bg-dark) 40%, rgba(16,185,129,0.04) 100%)',
        padding: '5rem 0 4rem', borderBottom: '1px solid var(--border-light)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '30%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'center' }}>

            {/* Left: Product Info */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '20px', fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                ✦ {SAVINGS_PCT}% Off Retail Value
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.08, marginBottom: '1rem' }}>
                The <span className="text-gradient">$200 Scanner</span><br />For ${KIT_PRICE}.
              </h1>
              <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '520px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Professional-grade OBD-II diagnostics + deterministic fuel governance. Everything a $200 scanner does — <strong style={{ color: 'var(--text-main)' }}>plus an AI-free organism that saves you $180–$320/year on gas.</strong>
              </p>

              {/* Price block */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>${KIT_PRICE}</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-dim)', textDecoration: 'line-through' }}>${RETAIL_VALUE}.99</span>
                <span style={{ padding: '4px 10px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>SAVE ${(RETAIL_VALUE - KIT_PRICE).toFixed(0)}</span>
              </div>

              {/* CTA */}
              <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{
                padding: '1.1rem 2.5rem', fontSize: '1.1rem', width: '100%', maxWidth: '400px',
                justifyContent: 'center', opacity: loading ? 0.6 : 1,
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                color: '#000', fontWeight: 800, border: 'none', borderRadius: '14px',
              }}>
                {loading ? 'Redirecting to Checkout...' : <><ShoppingCart size={20} /> Order Lume-Auto Kit</>}
              </button>

              <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Free shipping', 'App included', '30-day guarantee'].map((t, i) => (
                  <span key={i} className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={14} color="var(--accent-emerald)" /> {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: Product Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <div style={{
                borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-light)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))',
                boxShadow: '0 20px 80px rgba(6,182,212,0.08)',
              }}>
                <img src="/dongle_product.png" alt="Lume-Auto OBD-II Kit" style={{ width: '100%', display: 'block' }} />
              </div>
              <p className="text-dim" style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '0.75rem', letterSpacing: '0.05em' }}>
                LUME-AUTO DIAGNOSTIC KIT · PROFESSIONAL-GRADE HARDWARE + SOFTWARE
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ VALUE COMPARISON ═══ */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Why Pay $200?</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>Everything a professional scanner does. Plus everything it <em>can't</em>.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Competitor */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Typical OBD-II Scanner</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#ef4444', marginBottom: '1rem' }}>$149–$299</div>
              {['Read diagnostic codes', 'Clear check engine light', 'Basic live data', '❌ No fuel coaching', '❌ No predictive maintenance', '❌ No driver scoring', '❌ No family dashboard', '❌ Static — no intelligence'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: item.startsWith('❌') ? 'var(--text-dim)' : 'var(--text-muted)', padding: '4px 0' }}>{item}</div>
              ))}
            </div>

            {/* Lume */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.03)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Lume-Auto Kit</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', marginBottom: '1rem' }}>${KIT_PRICE}</div>
              {['✅ Read diagnostic codes', '✅ Clear check engine light', '✅ 42 live signals at 100ms', '✅ Passive fuel coaching', '✅ Predictive maintenance', '✅ Driver efficiency scoring', '✅ Family & fleet dashboard', '✅ Deterministic organism intelligence'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', padding: '4px 0', fontWeight: 500 }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>What's In The Kit</h2>
            <p className="text-muted">Hardware + software + intelligence. One purchase.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: <Package size={28} />, title: 'WiFi OBD-II Adapter', desc: 'Professional-grade hardware. Plugs into any vehicle sold after 1996. WiFi connectivity — works with iPhone and Android.', color: 'var(--accent-cyan)' },
              { icon: <Smartphone size={28} />, title: 'Lume-Auto App', desc: 'Native Android APK + Progressive Web App. Download code emailed instantly. iOS App Store build coming soon.', color: 'var(--accent-emerald)' },
              { icon: <Activity size={28} />, title: '42-Node Organism License', desc: 'Full deterministic governance engine. Real-time coaching, diagnostics, predictive maintenance. No subscription required to start.', color: '#38bdf8' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="panel" style={{ padding: '2rem', textAlign: 'center', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '14px', background: `${item.color}15`, borderRadius: '16px', display: 'inline-flex', marginBottom: '1.25rem', color: item.color }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Everything It Does</h2>
            <p className="text-muted">A $200 scanner reads codes. Lume-Auto governs your vehicle.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="panel flex gap-4" style={{ padding: '1.75rem' }}>
                <div style={{ color: f.color, flexShrink: 0, marginTop: '2px' }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{f.title}</h3>
                  <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SAVINGS ═══ */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Do The Math</h2>
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Annual savings</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}><span className="text-gradient">$328</span></div>
            <div className="text-muted" style={{ fontSize: '0.95rem' }}>Kit costs ${KIT_PRICE} · <strong style={{ color: 'var(--text-main)' }}>Pays for itself in {Math.ceil(KIT_PRICE / (328/365))} days</strong></div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="panel" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{faq.q}</span>
                  <ChevronDown size={18} style={{ color: 'var(--text-dim)', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
                </div>
                <div style={{ maxHeight: openFaq === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div style={{ padding: '0 1.5rem 1.25rem' }}>
                    <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stop Overpaying for Gas.</h2>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              ${KIT_PRICE} today. $328 saved every year.<br />The math does itself.
            </p>
            <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{
              padding: '1.1rem 3rem', fontSize: '1.1rem',
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
              color: '#000', fontWeight: 800, border: 'none', borderRadius: '14px',
            }}>
              {loading ? 'Redirecting...' : <><ShoppingCart size={20} /> Order Now — ${KIT_PRICE}</>}
            </button>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}>
              Lume-Auto · DarkWave Studios LLC / Lume42 Labs · US Provisional Patent 64/032,339
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
