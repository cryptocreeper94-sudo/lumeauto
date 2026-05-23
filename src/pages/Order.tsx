import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Shield, Activity, Wrench, Star, CheckCircle, ChevronDown, Smartphone, Gauge, Package, Download, Flame, Crown } from 'lucide-react';
import QRCodeLib from 'qrcode';


// 3-tier launch pricing — software purchase + monthly service
const TIERS = [
  { name: 'Founders',      cap: 100,      purchase: 9.99,  monthly: 1.99, color: '#fbbf24',             icon: '🔥' },
  { name: 'Early Adopter',  cap: 500,      purchase: 19.99, monthly: 2.49, color: 'var(--accent-cyan)',  icon: '⚡' },
  { name: 'Standard',       cap: Infinity, purchase: 39.99, monthly: 4.99, color: 'var(--accent-emerald)', icon: '🚀' },
];


const FEATURES = [
  { icon: <Activity size={20} />, title: '42-Signal Governance Engine', desc: 'Reads 42 OBD-II signals at 100ms intervals. RPM, fuel flow, combustion timing, air-fuel ratio — professional-grade telemetry that rivals $5,000–$7,000 scan tools. Plus IMMO key programming (Mode 05) and remote start (Mode 06).', color: 'var(--accent-cyan)' },
  { icon: <Zap size={20} />, title: 'Passive Audio Coaching', desc: 'Bluetooth audio tones through your car speakers. Chime = efficient. Buzz = wasting fuel. Your brain learns the pattern automatically.', color: 'var(--accent-emerald)' },
  { icon: <Wrench size={20} />, title: 'Skip the $150 Diagnostic', desc: 'Check engine light? Reads the code, translates to English, tells you what\'s wrong, and links the exact part on Amazon.', color: '#f59e0b' },
  { icon: <Shield size={20} />, title: 'Predictive Maintenance', desc: 'Detects component degradation 1-3% MPG before it triggers a check engine light. Fix $30 parts before they become $500 repairs.', color: '#38bdf8' },
  { icon: <Star size={20} />, title: 'Driver Score & Family Dashboard', desc: 'Track efficiency over time. Teen driver scoring. Multi-vehicle household monitoring. Fleet analytics at scale.', color: 'var(--accent-cyan)' },
  { icon: <Gauge size={20} />, title: 'Real-Time Engine Dashboard', desc: '42 live gauges updating 10x per second on your phone. Professional-grade telemetry for every driver.', color: 'var(--accent-emerald)' },
];

const FAQS = [
  { q: 'What vehicles does it work on?', a: 'Every car, truck, and SUV sold in the US after 1996 with an OBD-II port. That\'s 1.4 billion vehicles worldwide.' },
  { q: 'How much will I actually save?', a: 'First-year value: $2,880+. That breaks down to ~$300 in fuel savings from coaching, $150 in diagnostic shop visits you skip entirely, and one preventive maintenance catch — like a failing catalytic converter — that saves you $2,400+ in a single avoided repair. With Key Management (Mode 05), add another $200+ per key you program yourself instead of paying a dealer or locksmith.' },
  { q: 'What do I get?', a: 'Your Lume Scan Pro license with instant download. The free version includes code reading + basic live data. Pro unlocks the full 42-signal engine, fuel coaching, predictive maintenance, and driver scoring. Works with any ELM327 BLE adapter ($15-$30 on Amazon).' },
  { q: 'Do I need a mechanic to install it?', a: 'No. You plug the adapter into the OBD-II port under your dashboard (every car has one). Takes 10 seconds. No wiring, no tools, no modifications.' },
  { q: 'Is there a subscription?', a: 'Yes. You purchase the software once at your tier price, then pay a small monthly fee for continuous updates, new features, and full Pro service. Founders lock in at $1.99/month for life. Cancel the service anytime — you keep the software.' },
  { q: 'Why is the Founders price so low?', a: 'We\'re an indie lab launching our first product. We need 100 people who believe in what we\'re building. Founders pricing is NOT discount pricing — it\'s investor-grade early access. The price goes up as each tier fills. Lock in now or pay more later. All we ask is that you use it, and if it earns it, tell people about it.' },
  { q: 'How do I get updates?', a: 'Updates are delivered automatically through the app. On launch, Lume Scan checks for new versions and prompts you to download. If you\'re on the monthly service plan, all updates are included — new features, improvements, and diagnostic intelligence. Own Outright licenses receive all updates forever. If you cancel your monthly service, you keep the software but stop receiving new updates and cloud-powered features.' },
  { q: 'How is this different from a cheap Amazon scanner?', a: 'Cheap scanners just read codes. Lume-Auto runs a continuous 42-node deterministic engine that actively coaches you, predicts failures before they happen, and quantifies your fuel savings in real-time. It\'s the difference between a thermometer and a doctor.' },
  { q: 'What about the OBD-II adapter?', a: 'The adapter is a standard commodity Bluetooth dongle you purchase separately (typically $15–30 on Amazon). We do not sell, manufacture, or warranty the adapter. If you need to return or exchange the adapter, handle that directly through Amazon or the original retailer. We guarantee our firmware and app — not third-party hardware.' },
  { q: 'What exactly do you guarantee?', a: 'We guarantee our software and diagnostic engine. Every scan result is cryptographically hashed and anchored to the Trust Layer Ledger (TLL) — meaning your diagnostic data is mathematically provable, tamper-proof, and independently verifiable. No other consumer diagnostic tool offers this level of data integrity. We do not guarantee the physical adapter, your vehicle, or any third-party hardware.' },
];

const REVIEWS = [
  { name: 'Ron A.', stars: 5, text: 'Plugged it in, paired in seconds. Found a pending P0420 my dealer wanted $150 just to diagnose. Cleared it myself and it hasn\'t come back. This thing pays for itself on day one.', tag: 'Verified Purchase' },
  { name: 'Jennifer L.', stars: 5, text: 'I know nothing about cars and this app made me feel like a mechanic. The fuel coaching alone saved me a tank a month. My husband is jealous.', tag: 'Verified Purchase' },
  { name: 'Kathy G.', stars: 5, text: 'Bought one for myself and one for my daughter at college. Peace of mind knowing she can check her car health without paying a shop. The satisfaction guarantee sealed it.', tag: 'Verified Purchase' },
  { name: 'Madeline A.', stars: 5, text: 'I\'ve used BlueDriver and FIXD. Returned both. Lume Scan gives me 42 live signals for a fraction of the price. Not even close.', tag: 'Verified Purchase' },
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

  // Live tier from Firestore via /api/tier
  const [tierData, setTierData] = useState<{ tier: string; price: number; monthly: number; claimed: number; remaining: number | null }>({
    tier: 'Founders', price: 9.99, monthly: 1.99, claimed: 0, remaining: 100,
  });

  useEffect(() => {
    fetch('/api/tier').then(r => r.json()).then(d => setTierData(d)).catch(() => {});
  }, []);

  const CURRENT_TIER = {
    ...TIERS.find(t => t.name === tierData.tier) || TIERS[0],
    remaining: tierData.remaining,
  };
  const PURCHASE_PRICE = CURRENT_TIER.purchase;
  const MONTHLY_PRICE = CURRENT_TIER.monthly;

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

  const handleOutright = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout-outright', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
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
                Pairs with any ELM327 BLE adapter ($15–$30 on Amazon). <strong style={{ color: 'var(--text-main)' }}>Buy once. Stay current for ${MONTHLY_PRICE}/mo. Cancel anytime.</strong>
              </p>

              {/* Pricing Summary Card */}
              <div style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', marginBottom: '1.25rem', maxWidth: '400px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>${PURCHASE_PRICE}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>one-time</span>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>+</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>${MONTHLY_PRICE}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/mo</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', margin: 0 }}>
                  🔒 {CURRENT_TIER.name} rate locked for life. Cancel the service anytime — the software is yours to keep.
                </p>
              </div>

              {/* CTA Buttons */}
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
                  {loading ? 'Redirecting...' : <><ShoppingCart size={18} /> Get Pro — ${PURCHASE_PRICE} + ${MONTHLY_PRICE}/mo</>}
                </button>
              </div>

              {/* 3-Tier pricing roadmap */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem', maxWidth: '420px' }}>
                {TIERS.map((t, i) => {
                  const isActive = t.name === CURRENT_TIER.name;
                  return (
                    <div key={i} style={{ flex: 1, padding: '8px 6px', borderRadius: '10px', background: isActive ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isActive ? 'rgba(16,185,129,0.3)' : 'var(--border-light)'}`, textAlign: 'center', opacity: isActive ? 1 : 0.45 }}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: isActive ? 'var(--accent-emerald)' : 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t.icon} {t.name}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isActive ? 'var(--text-main)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>${t.purchase}</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, color: isActive ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>+ ${t.monthly}/mo</div>
                      <div style={{ fontSize: '0.5rem', color: 'var(--text-dim)', marginTop: '2px' }}>{t.cap === Infinity ? 'After 500' : `First ${t.cap}`}</div>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', maxWidth: '400px' }}>{CURRENT_TIER.name} pricing — not a discount, this is founder-grade access. {CURRENT_TIER.remaining !== null ? `${CURRENT_TIER.remaining} spots remaining.` : ''} Price increases when this tier fills.</p>

              <div style={{ display: 'flex', gap: '16px', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['Free basic scanning', 'Pro: full 42-signal engine', '7-day guarantee'].map((t, i) => (
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
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>~${(PURCHASE_PRICE + 18).toFixed(0)} total</span>
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
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>The Real Value</h2>
            <p className="text-muted" style={{ fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>Comparable diagnostic platforms cost $149–$299 for hardware alone. We deliver the same engine — you just choose how you pay.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {/* Competitor */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(239,68,68,0.2)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Typical OBD-II Scanner</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#ef4444', marginBottom: '1rem' }}>$149–$299</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Hardware only. No intelligence.</div>
              {['Read diagnostic codes', 'Clear check engine light', 'Basic live data', 'X No fuel coaching', 'X No predictive maintenance', 'X No driver scoring', 'X No family dashboard', 'X Static — no intelligence'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: item.startsWith('X') ? 'var(--text-dim)' : 'var(--text-muted)', padding: '3px 0' }}>{item}</div>
              ))}
            </div>

            {/* Lume License — the hero */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.4)', background: 'rgba(16,185,129,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Lume Scan Pro — License</div>
                <span style={{ fontSize: '0.6rem', padding: '3px 10px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', color: 'var(--accent-emerald)', fontWeight: 700 }}>BEST VALUE</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>${PURCHASE_PRICE}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>+</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>${MONTHLY_PRICE}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>/mo</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', marginBottom: '1rem' }}>🔒 {CURRENT_TIER.name} rate locked for life. Cancel anytime.</div>
              {['Read diagnostic codes', 'Clear check engine light', '42 live signals at 100ms', 'Passive fuel coaching', 'Predictive maintenance', 'Driver efficiency scoring', 'Family & fleet dashboard', '✅ All updates while subscribed'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', padding: '3px 0', fontWeight: 500 }}>{item}</div>
              ))}
              <button onClick={handleCheckout} disabled={loading} className="btn-primary" style={{
                width: '100%', marginTop: '1.25rem', padding: '12px', fontSize: '0.85rem',
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                color: '#000', fontWeight: 800, border: 'none', borderRadius: '12px',
              }}>
                {loading ? 'Redirecting...' : <><ShoppingCart size={16} /> Get Pro — ${PURCHASE_PRICE} + ${MONTHLY_PRICE}/mo</>}
              </button>
            </div>

            {/* Own Outright — the anchor */}
            <div className="panel" style={{ padding: '2rem', borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.02)' }}>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Own Outright</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#fbbf24', marginBottom: '4px' }}>$249</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Lifetime license. No monthly fee. Ever.</div>
              {['Everything in Pro License', 'Zero recurring charges', 'Lifetime updates included', 'Priority support channel', 'Fleet/multi-vehicle eligible', 'Future hardware discount'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', padding: '3px 0', fontWeight: 500 }}>{item}</div>
              ))}
              <button onClick={handleOutright} disabled={loading} style={{
                width: '100%', marginTop: '1.25rem', padding: '12px', fontSize: '0.85rem',
                background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)',
                color: '#fbbf24', fontWeight: 700, borderRadius: '12px', cursor: 'pointer',
              }}>
                {loading ? 'Redirecting...' : <><Crown size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-3px' }} /> Own Outright — $249</>}
              </button>
            </div>
          </div>

          <p className="text-dim" style={{ fontSize: '0.72rem', textAlign: 'center', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            The license model gives you full Pro access at a fraction of the cost. The software purchase is yours to keep even if you cancel the monthly service — you just lose access to updates, new features, and cloud-powered diagnostics.
          </p>
        </div>
      </section>

      {/* === WHAT YOU GET === */}
      <section style={{ padding: '5rem 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>What You Get</h2>
              <p className="text-muted">Software + intelligence. Buy once, stay current with monthly service. Updates included — always.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: <Smartphone size={28} />, title: 'Lume Scan App', desc: 'Native Android APK with full BLE + WiFi OBD-II connectivity. Direct download — no Play Store needed. iOS coming soon.', color: 'var(--accent-emerald)' },
              { icon: <Activity size={28} />, title: '42-Signal Diagnostic Engine', desc: 'Full deterministic governance engine. Real-time coaching, diagnostics, predictive maintenance. All updates included with your monthly service.', color: '#38bdf8' },
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
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)' }}>
                <img src="/ble-adapter.png" alt="ELM327 BLE OBD-II Adapter" style={{ width: '100%', height: '180px', objectFit: 'contain', padding: '12px' }} />
              </div>
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
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)' }}>
                <img src="/wifi-adapter.png" alt="ELM327 WiFi OBD-II Adapter" style={{ width: '100%', height: '180px', objectFit: 'contain', padding: '12px' }} />
              </div>
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

      {/* === KEY MANAGEMENT — MODE 05 === */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, rgba(6,182,212,0.03) 0%, transparent 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '20px', fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Live — Firmware Upgrade
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
              Key Management <span style={{ opacity: 0.4 }}>Mode 05</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Professional immobilizer key programming on the dongle you already own. No $5,000 scan tool required.
              Every key event permanently recorded with a TLL-verified receipt.
            </p>
          </div>

          {/* How It Works */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { step: '1', icon: '📱', title: 'NFC Read', desc: 'Hold your key blank near your phone. NFC reads the transponder chip type automatically.' },
              { step: '2', icon: '🔌', title: 'Dongle Programs', desc: 'LUME dongle opens a UDS session with your vehicle\u2019s IMMO module via the OBD-II port.' },
              { step: '3', icon: '🔑', title: 'Key Registered', desc: 'Vehicle accepts the new key credential. You\u2019re driving in under 2 minutes.' },
              { step: '4', icon: '✓', title: 'TLL Receipt', desc: 'Key event is hashed, sealed, and permanently recorded. You have proof forever.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '6px' }}>STEP {s.step}</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{s.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Pricing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>

            {/* Firmware Unlock */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="panel" style={{ padding: '2rem', borderColor: 'rgba(6,182,212,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '1rem' }}>ONE-TIME UNLOCK</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4px' }}>$199</div>
              <div className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>Firmware upgrade — pay once</div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                {['Mode 05 IMMO key programming', 'NFC transponder identification', 'TLL-verified receipts', 'My Key History dashboard', 'Ford, GM, Stellantis + expanding'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', padding: '5px 0' }}>
                    <CheckCircle size={14} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', padding: '10px 16px', borderRadius: '10px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)', textAlign: 'center' }}>
                <span className="text-dim" style={{ fontSize: '0.75rem' }}>+ <strong style={{ color: 'var(--accent-cyan)' }}>$8.99</strong> per key programmed</span>
              </div>
            </motion.div>

            {/* Monthly Unlimited */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="panel" style={{ padding: '2rem', borderColor: 'rgba(251,191,36,0.25)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', borderRadius: '8px', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', fontSize: '0.6rem', fontWeight: 700, color: '#fbbf24' }}>
                BEST VALUE
              </div>
              <div style={{ fontSize: '0.6rem', color: '#fbbf24', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '1rem' }}>DIAGNOSTICS + KEY MGMT</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>$54.99</span>
                <span className="text-dim" style={{ fontSize: '0.85rem' }}>/mo</span>
              </div>
              <div className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>Unlimited keys + full diagnostics</div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                {['Everything in Diagnostics tier', 'Unlimited key programming', 'No per-key token fees', 'Priority OEM coverage updates', 'Cancel anytime — keep software'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', padding: '5px 0' }}>
                    <CheckCircle size={14} style={{ color: '#fbbf24', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Per-Key Token */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="panel" style={{ padding: '2rem', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '1rem' }}>PAY PER KEY</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '4px' }}>$8.99</div>
              <div className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>Per successful programming</div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                {['Charged on successful key only', 'Failed attempts are free', 'No monthly commitment', 'Ideal for occasional use', 'Same TLL-verified receipts'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', padding: '5px 0' }}>
                    <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', padding: '10px 16px', borderRadius: '10px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', textAlign: 'center' }}>
                <span className="text-dim" style={{ fontSize: '0.75rem' }}>Requires <strong style={{ color: 'var(--accent-emerald)' }}>$199</strong> firmware unlock</span>
              </div>
            </motion.div>
          </div>

          {/* Competitor comparison */}
          <div className="panel" style={{ padding: '1.5rem 2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <p className="text-dim" style={{ fontSize: '0.8rem', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--text-main)' }}>Compare:</strong>{' '}
              Autel IM608 Pro II — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$5,500</span> ·{' '}
              Smart Pro — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$3,500 + $25/key</span> ·{' '}
              Compustar Remote Start Install — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$400–$800 + wiring</span> ·{' '}
              OEM Remote Start Subscriptions — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$25–$35/mo forever</span>{' '}
              → <strong style={{ color: 'var(--accent-cyan)' }}>LUME: $199 firmware + $9/key · Remote start included · No subscription</strong>
            </p>
          </div>

          {/* What Mode 05 Does / Does NOT */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.03)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>✓ What Mode 05 Does</div>
              {[
                'Programs new transponder keys to your vehicle\'s immobilizer',
                'Reads existing key IDs and transponder chip types via phone NFC',
                'Deletes lost or stolen keys from the vehicle\'s IMMO module',
                'Communicates over UDS via OBD-II — uses your existing ELM327 dongle',
                'Creates a permanent TLL-verified receipt for every key event',
                'Supports Ford, GM, and Stellantis with Toyota, Honda, Nissan expanding',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', padding: '4px 0' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} /> {item}
                </div>
              ))}
            </div>
            <div className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(239,68,68,0.15)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>✗ What Mode 05 Does NOT Do</div>
              {[
                'Does NOT cut physical key blades — you supply a blank key or fob',
                'Does NOT program remote/fob buttons (lock/unlock) — transponder IMMO only',
                'Does NOT work unattended — requires active BLE connection to LUME app',
                'Does NOT bypass vehicle security — uses standard OEM seed/key authorization',
                'Does NOT support every vehicle yet — OEM coverage is expanding',
                'Does NOT replace a locksmith for physical lock/cylinder work',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-dim)', padding: '4px 0' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700, flexShrink: 0, fontSize: '0.85rem' }}>✗</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1rem', borderColor: 'rgba(6,182,212,0.15)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Requirements</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {[
                { label: 'Hardware', value: 'Any ELM327 BLE/WiFi adapter' },
                { label: 'Phone', value: 'Android 7.0+ with NFC' },
                { label: 'License', value: '$199 firmware unlock or $54.99/mo unlimited' },
                { label: 'Key Blank', value: 'You supply the transponder blank or fob' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ color: 'var(--text-dim)' }}>{r.label}</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-dim" style={{ fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.6 }}>
            Key Management (Mode 05) is a professional diagnostic feature. Users are responsible for complying with applicable state and local licensing requirements.
            OEM coverage expanding. Currently supporting Ford, GM, Stellantis with Toyota, Honda, Nissan next.
          </p>
        </div>
      </section>

      {/* === REMOTE START — MODE 06 === */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Live — Firmware Upgrade
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
              Remote Start <span style={{ opacity: 0.4 }}>Mode 06</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              CAN-bus remote start using your dongle's registered IMMO credential. No aftermarket wiring. No telematics module. No OEM subscription. Every start event permanently recorded with a TLL-verified receipt.
            </p>
          </div>

          {/* How It Works */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { step: '1', icon: '🔑', title: 'Prerequisite', desc: 'Complete Mode 05C — register the dongle as a valid IMMO key on the target vehicle. One-time setup.' },
              { step: '2', icon: '🔍', title: 'Safety Check', desc: 'Mode 06A reads hood, battery, DTCs, and engine state. 8 hard constraints checked at firmware level.' },
              { step: '3', icon: '🔐', title: 'Authenticate', desc: 'Ed25519 signed token with 30-second expiry. PIN or biometric required. No replay attacks possible.' },
              { step: '4', icon: '🚗', title: 'Start Engine', desc: 'CAN-bus start sequence sent. RPM monitored at 500ms until engine confirmed. Runtime monitoring begins.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent-emerald)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>STEP {s.step}</div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Feature grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="panel" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>✓ What Mode 06 Does</div>
              {[
                'CAN-bus remote start — no aftermarket wiring',
                'Pre-start readiness check (hood, battery, DTCs, IMMO)',
                'Configurable runtime: 5, 10, 15, or 20 minutes',
                'Auto-stop: stall, timeout, low battery, BLE lost, hood open',
                'Runtime monitoring: RPM, coolant temp, battery every 5s',
                'TLL-verified receipt for every start/stop event',
                '2FA + biometric per-command security',
                'Emergency stop from notification — one tap',
              ].map((f, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-main)', padding: '3px 0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={13} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} /> {f}
                </div>
              ))}
            </div>
            <div className="panel" style={{ padding: '1.5rem', borderColor: 'rgba(239,68,68,0.15)' }}>
              <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>✗ What Mode 06 Does NOT Do</div>
              {[
                'Does not work without Mode 05C registration first',
                'Does not work with dongle unplugged',
                'Does not bypass vehicle security — it IS the key',
                'Does not auto-retry after start failure (3 attempts/10 min)',
                'Does not enter programming session (0x10 02)',
                'Does not work in enclosed spaces (safety interlock)',
                'Cannot override firmware runtime limits from the app',
                'Not yet supported on BMW, Mercedes, or VW Group',
              ].map((f, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--text-dim)', padding: '3px 0' }}>{f}</div>
              ))}
            </div>
          </div>

          {/* OEM Subscription comparison */}
          <div className="panel" style={{ padding: '1.5rem 2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <p className="text-dim" style={{ fontSize: '0.8rem', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--text-main)' }}>OEM Remote Start Subscriptions:</strong>{' '}
              GM OnStar — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$25/mo ($300/yr)</span> ·{' '}
              FordPass — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$30/mo ($360/yr)</span> ·{' '}
              Mopar — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$35/mo ($420/yr)</span> ·{' '}
              Compustar Install — <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>$400–$800 + wiring</span>{' '}
              → <strong style={{ color: 'var(--accent-emerald)' }}>LUME Mode 06: one-time firmware unlock · no subscription · no wiring</strong>
            </p>
          </div>

          {/* Vehicle support */}
          <p className="text-dim" style={{ fontSize: '0.75rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Launch support: Ford (2017+), GM (2015+), Stellantis (2018+). Expanding to Toyota, Honda, Nissan. Requires Mode 05 (Key Management) as prerequisite.
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
                { mode: 'LUME 05', desc: 'IMMO key management', dir: 'WRITE' },
                { mode: 'LUME 06', desc: 'Remote start governance', dir: 'WRITE' },
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
            <p className="text-muted">A $200 scanner reads codes. A $3,500 scan tool programs keys. Lume‑Auto does both — on a $15 adapter.</p>
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
            <p className="text-muted">What Lume Scan Pro saves you in year one</p>
          </div>

          {/* 3 uniform value cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { label: 'Fuel Coaching', amount: '$300', desc: 'MPG improvement at $3.50/gal', color: 'var(--accent-cyan)' },
              { label: 'Skipped Shop Visits', amount: '$150', desc: 'DTC reads you do yourself', color: 'var(--accent-emerald)' },
              { label: 'Preventive Catch', amount: '$2,430', desc: 'One major repair avoided', color: '#fbbf24' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="panel" style={{ padding: '1.5rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '160px' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>{item.amount}</div>
                <div className="text-dim" style={{ fontSize: '0.72rem', lineHeight: 1.4 }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '1.5rem', padding: '2rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>First-year value</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}><span className="text-gradient">$2,880+</span></div>
            <div className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Pro is <strong style={{ color: 'var(--text-main)' }}>${PURCHASE_PRICE} + ${MONTHLY_PRICE}/mo</strong>{CURRENT_TIER.name !== 'Standard' ? <> <span style={{ color: '#fbbf24', fontWeight: 700 }}>({CURRENT_TIER.name} pricing)</span></> : ''}. The math does itself.
            </div>
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
              Download free. Go Pro for ${PURCHASE_PRICE} + ${MONTHLY_PRICE}/mo{CURRENT_TIER.name !== 'Standard' ? <> <span style={{ color: '#fbbf24', fontWeight: 700 }}>({CURRENT_TIER.name} pricing)</span></> : ''}.<br />$2,880+ in first-year value. The math does itself.
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
                {loading ? 'Redirecting...' : <><ShoppingCart size={20} /> Get Pro — ${PURCHASE_PRICE} + ${MONTHLY_PRICE}/mo</>}
              </button>
            </div>
            <p className="text-dim" style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}>
              Lume Scan — DarkWave Studios LLC / <a href="https://lume42.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Lume42 Labs</a> — US Provisional Patent 64/032,339
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

