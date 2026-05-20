import { motion } from 'framer-motion';
import { Gift, ArrowLeft, CheckCircle, AlertCircle, Loader, Smartphone, Download } from 'lucide-react';
import { useState } from 'react';

const APK_URL = 'https://expo.dev/accounts/cryptocreeper/projects/lume-auto/builds/d0ac60e9-e374-4cb1-bc01-48319a11e306';
const REDEEM_API = 'https://dwtl.io/api/lumescan/redeem';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Redeem() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleRedeem = async () => {
    if (!code.trim() || !email.trim()) {
      setStatus('error');
      setMessage('Please enter both your redemption code and email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(REDEEM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'License activated successfully!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to redeem code. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 56px)', padding: '3rem 1.5rem', background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Back */}
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Platform
        </a>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px', margin: '0 auto 1.5rem',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Gift size={32} style={{ color: 'var(--accent-emerald)' }} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Redeem Your License
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '450px', margin: '0 auto' }}>
            Enter the 16-character code from your Lume Scan purchase to activate your license.
          </p>
        </motion.div>

        {/* Redemption Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{
            background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '2rem',
            border: '1px solid var(--border-light)',
          }}
        >
          {/* Code Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
              color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase',
            }}>
              Redemption Code
            </label>
            <input
              type="text"
              placeholder="e.g. 4A8F3C2B1D6E9F07"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              maxLength={16}
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-light)',
                color: 'var(--text-main)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.15em', textTransform: 'uppercase', outline: 'none',
                transition: 'border-color 0.2s', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
              color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase',
            }}>
              Email Address
            </label>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
              Use the same email you'll sign into the Lume Scan app with.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-light)',
                color: 'var(--text-main)', fontSize: '0.95rem', outline: 'none',
                transition: 'border-color 0.2s', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(6,182,212,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>

          {/* Status Messages */}
          {status === 'error' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '8px', marginBottom: '1.5rem',
            }}>
              <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
              <span style={{ color: '#fca5a5', fontSize: '0.85rem' }}>{message}</span>
            </div>
          )}

          {status === 'success' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
              borderRadius: '8px', marginBottom: '1.5rem',
            }}>
              <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <span style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          {status !== 'success' && (
            <button
              onClick={handleRedeem}
              disabled={status === 'loading'}
              style={{
                width: '100%', padding: '14px', borderRadius: '30px', border: 'none',
                background: status === 'loading' ? 'var(--text-muted)' : 'var(--accent-emerald)',
                color: '#000', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.1em',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'all 0.2s',
              }}
            >
              {status === 'loading' ? (
                <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> ACTIVATING...</>
              ) : (
                <><Gift size={18} /> REDEEM LICENSE</>
              )}
            </button>
          )}

          {/* Success: Download Section */}
          {status === 'success' && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <Smartphone size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                Download Your App
              </h3>
              <a href={APK_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                padding: '14px 24px', borderRadius: '30px', marginBottom: '1rem',
                background: 'var(--accent-cyan)', border: 'none',
                color: '#000', fontSize: '0.85rem', fontWeight: 800,
                letterSpacing: '0.1em', textDecoration: 'none',
              }}>
                <Download size={18} /> DOWNLOAD APK
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  'Download and install the APK',
                  'Open LUME-Auto and sign in with the email you just used',
                  'Plug your OBD-II adapter into your vehicle',
                  'Start scanning — 42 signals, real-time diagnostics',
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.7rem', fontWeight: 700, minWidth: '16px' }}>{i + 1}.</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Help text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', lineHeight: 1.7 }}>
            Purchased on Amazon? Your redemption code was emailed to you after purchase.<br />
            Need help? Contact <a href="mailto:support@darkwavestudios.com" style={{ color: 'var(--accent-cyan)' }}>support@darkwavestudios.com</a>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
