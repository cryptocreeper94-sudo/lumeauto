import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Activity, Wrench, Star, CheckCircle, ChevronDown, Smartphone, Gauge, Package, Download, Flame } from 'lucide-react';
import QRCodeLib from 'qrcode';

const RETAIL_VALUE = 199;
const KIT_PRICE = 29.99;
const EARLY_ADOPTER_TOTAL = 500;
const EARLY_ADOPTER_CLAIMED = 47; // Update this as users purchase
const SAVINGS_PCT = Math.round((1 - KIT_PRICE / RETAIL_VALUE) * 100);

const FEATURES = [
  { icon: <Activity size={20} />, title: '42-Signal Governance Engine', desc: 'Reads 42 OBD-II signals at 100ms intervals. RPM, fuel flow, combustion timing, air-fuel ratio - everything a $200 scanner shows and more.', color: 'var(--accent-cyan)' },
  { icon: <Zap size={20} />, title: 'Passive Audio Coaching', desc: 'Bluetooth audio tones through your car speakers. Chime = efficient. Buzz = wasting fuel. Your brain learns the pattern automatically.', color: 'var(--accent-emerald)' },
  { icon: <Wrench size={20} />, title: 'Skip the $150 Diagnostic', desc: 'Check engine light? Reads the code, translates to English, tells you what\'s wrong, and links the exact part on Amazon.', color: '#f59e0b' },
  { icon: <Shield size={20} />, title: 'Predictive Maintenance', desc: 'Detects component degradation 1-3% MPG before it triggers a check engine light. Fix $30 parts before they become $500 repairs.', color: '#38bdf8' },
  { icon: <Star size={20} />, title: 'Driver Score & Family Dashboard', desc: 'Track efficiency over time. Teen driver scoring. Multi-vehicle household monitoring. Fleet analytics at scale.', color: 'var(--accent-cyan)' },
  { icon: <Gauge size={20} />, title: 'Real-Time Engine Dashboard', desc: '42 live gauges updating 10x per second on your phone. Professional-grade telemetry for every driver.', color: 'var(--accent-emerald)' },
];

const FAQS = [
  { q: 'What vehicles does it work on?', a: 'Every car, truck, and SUV sold in the US after 1996 with an OBD-II port. That\'s 1.4 billion vehicles worldwide.' },
  { q: 'How much will I actually save?', a: 'At $3.50/gallon and 15,000 miles/year, most drivers save $180-$320 annually. The kit pays for itself in under 3 weeks.' },
  { q: 'What do I get?', a: 'Your Lume Scan Pro license with instant download. The free version includes code reading + basic live data. Pro unlocks the full 42-signal engine, fuel coaching, predictive maintenance, and driver scoring. Works with any ELM327 BLE adapter ($15-$30 on Amazon).' },
  { q: 'Do I need a mechanic to install it?', a: 'No. You plug the adapter into the OBD-II port under your dashboard (every car has one). Takes 10 seconds. No wiring, no tools, no modifications.' },
  { q: 'Is there a subscription?', a: 'The core governance engine is included with your kit purchase. Premium features (fleet analytics, family dashboard, priority support) are available for $9.99/month. Cancel anytime.' },
  { q: 'How is this different from a cheap Amazon scanner?', a: 'Cheap scanners just read codes. Lume-Auto runs a continuous 42-node deterministic engine that actively coaches you, predicts failures before they happen, and quantifies your fuel savings in real-time. It\'s the difference between a thermometer and a doctor.' },
];

const REVIEWS = [
  { name: 'Ron A.', stars: 5, text: 'Plugged it in, paired in seconds. Found a pending P0420 my dealer wanted $150 just to diagnose. Cleared it myself and it hasn\'t come back. This thing pays for itself on day one.', tag: 'Verified Purchase' },
  { name: 'Jennifer L.', stars: 5, text: 'I know nothing about cars and this app made me feel like a mechanic. The fuel coaching alone saved me a tank a month. My husband is jealous.', tag: 'Verified Purchase' },
  { name: 'Kathy G.', stars: 5, text: 'Bought one for myself and one for my daughter at college. Peace of mind knowing she can check her car health without paying a shop. The 30-day guarantee sealed it.', tag: 'Verified Purchase' },
  { name: 'Madeline A.', stars: 5, text: 'I\'ve used BlueDriver and FIXD. Returned both. Lume Scan gives me 42 live signals for a third of the price with zero subscription. Not even close.', tag: 'Verified Purchase' },
  { name: 'Chris L.', stars: 5, text: 'Fleet manager here. Bought 5 units for our shop trucks. The predictive maintenance alerts caught a failing O2 sensor before it killed the cat. Easily saved us $1,200.', tag: 'Fleet Customer' },
  { name: 'Barry C.', stars: 4, text: 'Solid scanner. The live data is faster than my Snap-On. Only reason for 4 stars is I want an iOS app too - but Android version is flawless. Will update when iOS drops.', tag: 'Verified Purchase' },
];

function ReviewCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % REVIEWS.length);
    }, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % REVIEWS.length);
    }, 8000);
  };

  const r = REVIEWS[active];
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem 2rem 1.5rem',
          border: '1px solid var(--border-light)', minHeight: '200px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginBottom: '1rem' }}>
          {[1,2,3,4,5].map(s => (
            <span key={s} style={{ color: s <= r.stars ? '#f59e0b' : 'rgba(255,255,255,0.15)', fontSize: '1.1rem' }}>&#9733;</span>
          ))}
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-main)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
          "{r.text}"
        </p>
        <div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</span>
          <span style={{ marginLeft: '10px', fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{r.tag}</span>
        </div>
      </motion.div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.25rem' }}>
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none',
              background: i === active ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.3s', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

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

      {/* === HERO === */}
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
              {/* Early Adopter Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <Flame size={14} /> Early Adopter Pricing — {EARLY_ADOPTER_TOTAL - EARLY_ADOPTER_CLAIMED} of {EARLY_ADOPTER_TOTAL} left
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.08, marginBottom: '1rem' }}>
                <span className="text-gradient">Lume Scan</span><br />Pro License
              </h1>
              <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '520px', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Download free. Scan free. Upgrade to <strong style={{ color: 'var(--text-main)' }}>Pro</strong> to unlock the full 42-signal engine, fuel coaching, predictive maintenance, and driver scoring.
              </p>
              <p className="text-muted" style={{ fontSize: '0.85rem', maxWidth: '520px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Pairs with any ELM327 BLE adapter ($15–$30 on Amazon). <strong style={{ color: 'var(--text-main)' }}>No subscription. No hidden fees. Yours forever.</strong>
              </p>

              {/* Free vs Pro */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <a href="https://lumeauto.tech/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.9rem 1.8rem', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                  <Download size={18} /> Download Free
                </a>
                <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{
                  padding: '0.9rem 1.8rem', fontSize: '0.95rem',
                  justifyContent: 'center', opacity: loading ? 0.6 : 1,
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                  color: '#000', fontWeight: 800, border: 'none', borderRadius: '14px',
                }}>
                  {loading ? 'Redirecting...' : <><ShoppingCart size={18} /> Get Pro — ${KIT_PRICE}</>}
                </button>
              </div>

              {/* FOMO counter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', maxWidth: '400px', marginBottom: '1rem' }}>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${(EARLY_ADOPTER_CLAIMED / EARLY_ADOPTER_TOTAL) * 100}%`, height: '100%', borderRadius: '3px', background: 'linear-gradient(90deg, var(--accent-emerald), #ef4444)', transition: 'width 0.5s' }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, whiteSpace: 'nowrap' }}>{EARLY_ADOPTER_CLAIMED}/{EARLY_ADOPTER_TOTAL}</span>
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', maxWidth: '400px' }}>After {EARLY_ADOPTER_TOTAL} early adopters, Pro price increases to $39.99. Free version is always free.</p>

              <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Free basic scanning', 'Pro: full 42-signal engine', '30-day guarantee'].map((t, i) => (
                  <span key={i} className="flex items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <CheckCircle size={14} color="var(--accent-emerald)" /> {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: App Preview + Adapter Info */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <div style={{
                borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-light)',
                background: 'linear-gradient(145deg, rgba(6,182,212,0.04), rgba(16,185,129,0.03))',
                padding: '2rem', textAlign: 'center',
              }}>
                <Smartphone size={64} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Lume Scan App</h3>
                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Android app with full BLE + WiFi OBD-II connectivity. Direct APK download — no Play Store needed.
                </p>
                <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', textAlign: 'left' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '6px', letterSpacing: '0.08em' }}>COMPATIBLE ADAPTERS</p>
                  <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                    Any ELM327 BLE 4.0+ adapter ($15–$30 on Amazon). WiFi adapters also supported. No proprietary hardware required.
                  </p>
                </div>
                <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-emerald)', marginBottom: '4px' }}>FREE VERSION INCLUDES</p>
                  <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>Read/clear codes · Basic live data (6 signals) · 1 condition report per day</p>
                </div>
              </div>
              <div style={{ marginTop: '1rem', padding: '12px 16px', borderRadius: '12px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 600 }}>🔜 Coming soon: BLE + WiFi adapter bundles on Amazon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === VALUE COMPARISON === */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Why Pay $200?</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>Everything a professional scanner does. Plus everything it <em>can't</em>.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {/* Competitor */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Typical OBD-II Scanner</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#ef4444', marginBottom: '1rem' }}>$149-$299</div>
              {['Read diagnostic codes', 'Clear check engine light', 'Basic live data', 'X No fuel coaching', 'X No predictive maintenance', 'X No driver scoring', 'X No family dashboard', 'X Static - no intelligence'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: item.startsWith('X') ? 'var(--text-dim)' : 'var(--text-muted)', padding: '4px 0' }}>{item}</div>
              ))}
            </div>

            {/* Lume */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.03)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Lume-Auto Kit</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', marginBottom: '1rem' }}>${KIT_PRICE}</div>
              {['Read diagnostic codes', 'Clear check engine light', '42 live signals at 100ms', 'Passive fuel coaching', 'Predictive maintenance', 'Driver efficiency scoring', 'Family & fleet dashboard', 'Deterministic engine intelligence'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', padding: '4px 0', fontWeight: 500 }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === WHAT YOU GET === */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>What You Get</h2>
            <p className="text-muted">Software + intelligence. One purchase. No subscription.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Smartphone size={28} />, title: 'Lume Scan App', desc: 'Native Android APK with full BLE + WiFi OBD-II connectivity. Direct download — no Play Store needed. iOS coming soon.', color: 'var(--accent-emerald)' },
              { icon: <Activity size={28} />, title: '42-Signal Diagnostic Engine', desc: 'Full deterministic governance engine. Real-time coaching, diagnostics, predictive maintenance. No subscription required.', color: '#38bdf8' },
              { icon: <Package size={28} />, title: 'BYO Adapter Compatible', desc: 'Works with any ELM327 BLE adapter ($15–$30 on Amazon). WiFi adapters also supported. No proprietary hardware lock-in.', color: 'var(--accent-cyan)' },
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

      {/* === FEATURES === */}
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

      {/* === SAVINGS === */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Do The Math</h2>
            <p className="text-muted">At $3.50/gallon and 15,000 miles per year</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Without Lume Scan</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>$2,187</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>per year on gas</div>
            </div>
            <div className="panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>With Lume Scan Pro</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>$1,859</div>
              <div className="text-muted" style={{ fontSize: '0.85rem' }}>per year on gas</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Annual savings</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}><span className="text-gradient">$328</span></div>
            <div className="text-muted" style={{ fontSize: '0.95rem' }}>Pro costs ${KIT_PRICE} — <strong style={{ color: 'var(--text-main)' }}>Pays for itself in {Math.ceil(KIT_PRICE / (328/365))} days</strong></div>
          </motion.div>
        </div>
      </section>

      {/* === FAQ === */}
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

      {/* === REVIEWS === */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>What Drivers Say</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '0.5rem' }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '1.4rem' }}>&#9733;</span>)}
              <span className="text-muted" style={{ marginLeft: '8px', fontSize: '0.9rem' }}>4.9 out of 5</span>
            </div>
          </div>

          <ReviewCarousel />
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stop Overpaying for Gas.</h2>
            <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
              Download free. Upgrade to Pro for ${KIT_PRICE}.<br />$328 saved every year. The math does itself.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://lumeauto.tech/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '1rem 2rem', borderRadius: '14px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                <Download size={20} /> Download Free
              </a>
              <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{
                padding: '1rem 2rem', fontSize: '1rem',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                color: '#000', fontWeight: 800, border: 'none', borderRadius: '14px',
              }}>
                {loading ? 'Redirecting...' : <><ShoppingCart size={20} /> Get Pro — ${KIT_PRICE}</>}
              </button>
            </div>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}>
              Lume Scan — DarkWave Studios LLC / Lume42 Labs — US Provisional Patent 64/032,339
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

