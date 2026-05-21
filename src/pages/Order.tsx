import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Activity, Wrench, Star, CheckCircle, ChevronDown, Smartphone, Gauge, Package, Download, Flame } from 'lucide-react';
import QRCodeLib from 'qrcode';


// 3-tier launch pricing
const TIERS = [
  { name: 'Founders', cap: 100, price: 9.99, color: '#fbbf24', icon: '🔥' },
  { name: 'Early Adopter', cap: 500, price: 19.99, color: 'var(--accent-cyan)', icon: '⚡' },
  { name: 'Standard', cap: Infinity, price: 39.99, color: 'var(--accent-emerald)', icon: '🚀' },
];
const TOTAL_CLAIMED = 12; // Update this as users purchase
const getCurrentTier = () => {
  let acc = 0;
  for (const t of TIERS) {
    if (TOTAL_CLAIMED < acc + t.cap) return { ...t, remaining: t.cap === Infinity ? null : (acc + t.cap) - TOTAL_CLAIMED };
    acc += t.cap;
  }
  return TIERS[TIERS.length - 1];
};
const CURRENT_TIER = getCurrentTier();
const KIT_PRICE = CURRENT_TIER.price;
const AMAZON_TAG = 'garagebot-20';


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
  { q: 'How much will I actually save?', a: 'At $3.50/gallon and 15,000 miles/year, most drivers save $180-$320 annually in fuel alone. But the real savings come from predictive maintenance — catching a failing catalytic converter early can save you $2,000+ in a single repair. First-year value: $2,700+.' },
  { q: 'What do I get?', a: 'Your Lume Scan Pro license with instant download. The free version includes code reading + basic live data. Pro unlocks the full 42-signal engine, fuel coaching, predictive maintenance, and driver scoring. Works with any ELM327 BLE adapter ($15-$30 on Amazon).' },
  { q: 'Do I need a mechanic to install it?', a: 'No. You plug the adapter into the OBD-II port under your dashboard (every car has one). Takes 10 seconds. No wiring, no tools, no modifications.' },
  { q: 'Is there a subscription?', a: 'No. One purchase, yours forever. No monthly fees, no annual renewals, no premium tiers. The full 42-signal engine is included.' },
  { q: 'Why is the Founders price so low?', a: 'We\'re an indie lab launching our first product. We need 100 people who believe in what we\'re building. Founders pricing is our way of saying thank you — all we ask in return is that you use it, and if it earns it, tell people about it. An honest review is the best way to support an indie launch.' },
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

  // Detect Stripe redirect success/cancel
  const urlParams = new URLSearchParams(window.location.search);
  const purchaseSuccess = urlParams.get('success') === 'true';

  useEffect(() => {
    if (qrRef.current) {
      QRCodeLib.toCanvas(qrRef.current, 'https://lumeauto.tech/download', {
        width: 120, margin: 1,
        color: { dark: '#06b6d4', light: '#0a0a0c' },
        errorCorrectionLevel: 'M',
      });
    }
  }, []);

  // Scroll to top and show success message
  useEffect(() => {
    if (purchaseSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [purchaseSuccess]);

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

      {/* === PURCHASE SUCCESS BANNER === */}
      {purchaseSuccess && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))', border: '1px solid rgba(16,185,129,0.3)', padding: '2rem', textAlign: 'center', marginTop: '5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>You're In — Welcome to Pro!</h2>
          <p className="text-muted" style={{ fontSize: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Check your email for your redemption code. Open the Lume Scan app → Settings → Redeem Code to activate.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))', color: '#000', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
              <Download size={18} /> Download App
            </a>
          </div>
          <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
            Didn't get the email? Check spam, or contact support@lumescan.tech
          </p>
        </motion.div>
      )}

      {/* === HERO === */}
      <section style={{
        background: 'linear-gradient(165deg, rgba(6,182,212,0.06) 0%, var(--bg-dark) 40%, rgba(16,185,129,0.04) 100%)',
        padding: '5rem 0 4rem', borderBottom: '1px solid var(--border-light)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '30%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '3rem', alignItems: 'center' }}>

            {/* Left: Product Info */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              {/* Tier Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', fontSize: '0.75rem', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <Flame size={14} /> {CURRENT_TIER.icon} {CURRENT_TIER.name} Pricing{CURRENT_TIER.remaining !== null ? ` — ${CURRENT_TIER.remaining} left` : ''}
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

              {/* 3-Tier pricing roadmap */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', maxWidth: '420px' }}>
                {TIERS.map((t, i) => {
                  const isActive = t.name === CURRENT_TIER.name;
                  return (
                    <div key={i} style={{ flex: 1, padding: '8px 6px', borderRadius: '10px', background: isActive ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isActive ? 'rgba(16,185,129,0.3)' : 'var(--border-light)'}`, textAlign: 'center', opacity: isActive ? 1 : 0.5 }}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: isActive ? 'var(--accent-emerald)' : 'var(--text-dim)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t.icon} {t.name}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: isActive ? 'var(--text-main)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>${t.price}</div>
                      <div style={{ fontSize: '0.55rem', color: 'var(--text-dim)' }}>{t.cap === Infinity ? 'After 500' : `First ${t.cap}`}</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', maxWidth: '400px' }}>New release pricing. {CURRENT_TIER.remaining !== null ? `${CURRENT_TIER.remaining} ${CURRENT_TIER.name} spots remaining.` : ''} Free version is always free.</p>

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
                  <p className="text-muted" style={{ fontSize: '0.78rem', lineHeight: 1.5 }}>Read/clear codes · 3 live signals (RPM, speed, coolant) · 39 gauges visible but locked</p>
                </div>
              </div>
              {/* Combo purchase card */}
              <div style={{ marginTop: '12px', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(6,182,212,0.15)', background: 'rgba(6,182,212,0.03)' }}>
                <div style={{ height: '120px', overflow: 'hidden', position: 'relative' }}>
                  <img src="/combo-bundle.png" alt="Lume Scan + BLE Adapter combo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,12,0.85), transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '10px', left: '14px', fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>RECOMMENDED COMBO</div>
                </div>
                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Pro + BLE Adapter</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>~${(KIT_PRICE + 18).toFixed(0)} total</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '10px', lineHeight: 1.5 }}>Get Pro above, then grab a compatible adapter below. Already have one? Skip this.</p>
                  <a href={`https://www.amazon.com/s?k=ELM327+BLE+OBD2+adapter&i=automotive&tag=garagebot-20`} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: 'rgba(255,153,0,0.08)', border: '1px solid rgba(255,153,0,0.2)', color: '#ff9900', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}>
                    <ShoppingCart size={14} /> Shop BLE Adapters on Amazon — $15–$25
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FOUNDERS HANDSHAKE === */}
      <section style={{ padding: '3rem 0', borderBottom: '1px solid var(--border-light)', background: 'rgba(245,158,11,0.02)' }}>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>The Founders Handshake</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '550px', margin: '0 auto' }}>
              You're getting {CURRENT_TIER.name} pricing because we believe in this product and we need people who believe in it too. We're a small indie lab in Tennessee — not a corporation. All we ask is that you use it, and if it earns it — <strong style={{ color: 'var(--text-main)' }}>tell people about it</strong>. An honest review is the best way to support an indie launch.
            </p>
          </motion.div>
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

      {/* === WIFI vs BLE ADAPTER GUIDE === */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>WiFi or BLE?</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem' }}>Both work with Lume Scan. Here's how to choose.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {/* BLE Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="panel" style={{ padding: '2rem', borderColor: 'rgba(6,182,212,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', background: 'rgba(6,182,212,0.1)', borderRadius: '12px', color: 'var(--accent-cyan)' }}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>BLE Adapter</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>$15–$25 on Amazon</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Best for', value: 'Personal use, single vehicle' },
                  { label: 'Range', value: '~30 feet' },
                  { label: 'Power draw', value: 'Ultra-low (safe to leave plugged in)' },
                  { label: 'Phone compatibility', value: 'Android + iOS' },
                  { label: 'Battery impact', value: 'Minimal — BLE 4.0+ is efficient' },
                  { label: 'Connection', value: 'Auto-pairs via Bluetooth settings' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="https://www.amazon.com/s?k=ELM327+BLE+OBD2+adapter&i=automotive&tag=garagebot-20" target="_blank" rel="noopener"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                  Amazon →
                </a>
                <a href="https://www.ebay.com/sch/i.html?_nkw=ELM327+BLE+OBD2+adapter&_sacat=6000&LH_BIN=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339140935&toolid=10001" target="_blank" rel="noopener"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                  eBay →
                </a>
              </div>
            </motion.div>

            {/* WiFi Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ padding: '10px', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', color: 'var(--accent-emerald)' }}>
                  <Zap size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>WiFi Adapter</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>$20–$30 on Amazon</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Best for', value: 'Fleet, lot ops, multi-vehicle' },
                  { label: 'Range', value: '~100 feet' },
                  { label: 'Power draw', value: 'Moderate (unplug when not in use)' },
                  { label: 'Phone compatibility', value: 'Android + iOS' },
                  { label: 'Speed', value: 'Faster data throughput' },
                  { label: 'Connection', value: 'Joins as WiFi network' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: 'var(--text-main)', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="https://www.amazon.com/s?k=ELM327+WiFi+OBD2+adapter&i=automotive&tag=garagebot-20" target="_blank" rel="noopener"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                  Amazon →
                </a>
                <a href="https://www.ebay.com/sch/i.html?_nkw=ELM327+WiFi+OBD2+adapter&_sacat=6000&LH_BIN=1&mkcid=1&mkrid=711-53200-19255-0&campid=5339140935&toolid=10001" target="_blank" rel="noopener"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none', flex: 1, justifyContent: 'center' }}>
                  eBay →
                </a>
              </div>
            </motion.div>
          </div>
          <p className="text-dim" style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '1.5rem' }}>
            Not sure? Start with BLE — it's cheaper, lower power, and works great for personal use. Upgrade to WiFi if you're scanning multiple vehicles or need longer range.
          </p>
        </div>
      </section>

      {/* === TRUE BIDIRECTIONAL PROOF === */}
      <section style={{ padding: '5rem 0', background: 'rgba(16,185,129,0.02)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Industry First
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>True Bidirectional Communication</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Most "bidirectional" scanners only <em>read</em> data. Lume Scan reads, writes, and clears — real two-way communication with your ECU.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* What competitors claim */}
            <div className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(239,68,68,0.15)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>What "Bidirectional" Usually Means</div>
              {[
                { label: 'Read DTCs', status: '✓', ok: true },
                { label: 'Read live data', status: '✓', ok: true },
                { label: 'Clear codes', status: '✗', ok: false },
                { label: 'Write parameters', status: '✗', ok: false },
                { label: 'Active system tests', status: '✗', ok: false },
                { label: 'Freeze frame access', status: '✗', ok: false },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span className="text-muted">{row.label}</span>
                  <span style={{ color: row.ok ? 'var(--text-dim)' : '#ef4444', fontWeight: 600 }}>{row.status}</span>
                </div>
              ))}
              <p className="text-dim" style={{ fontSize: '0.7rem', marginTop: '0.75rem', fontStyle: 'italic' }}>
                Most scanners under $100 are read-only despite "bidirectional" marketing.
              </p>
            </div>

            {/* What Lume Scan actually does */}
            <div className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.03)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>What Lume Scan Actually Does</div>
              {[
                { label: 'Read DTCs', status: '✓', desc: 'All standard + manufacturer codes' },
                { label: 'Read live data', status: '✓', desc: '42 signals at 100ms intervals' },
                { label: 'Clear codes', status: '✓', desc: 'Full ECU reset + MIL off' },
                { label: 'Write parameters', status: '✓', desc: 'Mode 08 request control' },
                { label: 'Active system tests', status: '✓', desc: 'O2 sensor, EVAP, catalyst' },
                { label: 'Freeze frame access', status: '✓', desc: 'Snapshot at time of fault' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{row.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{row.status}</span>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{row.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical proof */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(6,182,212,0.15)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>OBD-II Protocol Coverage</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { mode: 'Mode 01', desc: 'Live powertrain data', dir: 'READ' },
                { mode: 'Mode 02', desc: 'Freeze frame data', dir: 'READ' },
                { mode: 'Mode 03', desc: 'Read stored DTCs', dir: 'READ' },
                { mode: 'Mode 04', desc: 'Clear codes + MIL reset', dir: 'WRITE' },
                { mode: 'Mode 05', desc: 'O2 sensor monitoring', dir: 'READ' },
                { mode: 'Mode 06', desc: 'On-board test results', dir: 'READ' },
                { mode: 'Mode 07', desc: 'Pending DTCs', dir: 'READ' },
                { mode: 'Mode 08', desc: 'Request control of system', dir: 'WRITE' },
                { mode: 'Mode 09', desc: 'Vehicle info (VIN)', dir: 'READ' },
                { mode: 'Mode 0A', desc: 'Permanent DTCs', dir: 'READ' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: m.dir === 'WRITE' ? 'var(--accent-emerald)' : 'var(--accent-cyan)', minWidth: '52px' }}>{m.mode}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 500 }}>{m.desc}</div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700, color: m.dir === 'WRITE' ? 'var(--accent-emerald)' : 'var(--text-dim)', letterSpacing: '0.05em' }}>{m.dir}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-dim" style={{ fontSize: '0.7rem', marginTop: '1rem' }}>
              Lume Scan implements all 10 standard OBD-II service modes. Modes 04 and 08 are <strong style={{ color: 'var(--accent-emerald)' }}>write operations</strong> — true bidirectional communication that most consumer scanners omit or fake.
            </p>
          </motion.div>
        </div>
      </section>
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
              Download free. Upgrade to Pro for ${KIT_PRICE}{CURRENT_TIER.name !== 'Standard' ? <> <span style={{ color: '#fbbf24', fontWeight: 700 }}>({CURRENT_TIER.name} pricing)</span></> : ''}.<br />$2,700+ saved in year one. The math does itself.
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

