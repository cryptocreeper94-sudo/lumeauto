import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Shield, Mail, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function Account() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState('');
  const returned = new URLSearchParams(window.location.search).get('returned') === 'true';

  const checkAccount = async () => {
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    setStatus(null);
    try {
      const res = await fetch('/api/account/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setStatus(data);
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  const openPortal = async () => {
    setPortalLoading(true);
    setError('');
    try {
      const res = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setPortalLoading(false); return; }
      window.location.href = data.url;
    } catch { setError('Could not open billing portal.'); setPortalLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '5rem 0 4rem' }}>
      <div className="container" style={{ maxWidth: '560px' }}>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.1))',
              border: '1px solid rgba(6,182,212,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <User size={28} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Manage <span className="text-gradient">Subscription</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
              View your plan, update payment, or cancel — no hoops, no phone calls.
            </p>
          </div>

          {/* Return Banner */}
          {returned && (
            <div style={{
              padding: '14px 20px', borderRadius: '14px', marginBottom: '1.5rem',
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                ✓ Changes saved. Your billing has been updated.
              </p>
            </div>
          )}

          {/* Email Input */}
          <div className="panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <label style={{
              fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', display: 'block',
            }}>
              <Mail size={12} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Purchase Email
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkAccount()}
                placeholder="you@example.com"
                style={{
                  flex: 1, padding: '14px 16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)',
                  color: 'var(--text-main)', fontSize: '1rem', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              <button
                onClick={checkAccount}
                disabled={loading || !email.trim()}
                style={{
                  padding: '14px 20px', borderRadius: '12px', border: 'none',
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                  color: '#000', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                  opacity: loading || !email.trim() ? 0.5 : 1, transition: 'opacity 0.2s',
                  display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
                }}
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                {loading ? '' : 'Look Up'}
              </button>
            </div>
            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '10px', fontWeight: 600 }}>{error}</p>
            )}
          </div>

          {/* Account Status */}
          {status && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>

              {/* Status Card */}
              <div className="panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                    <Shield size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-cyan)', verticalAlign: 'middle' }} />
                    Pro License
                  </h3>
                  <span style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    background: status.subscription_active ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                    color: status.subscription_active ? 'var(--accent-emerald)' : '#ef4444',
                    border: `1px solid ${status.subscription_active ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                  }}>
                    {status.subscription_active
                      ? <><CheckCircle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Active</>
                      : <><XCircle size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Inactive</>}
                  </span>
                </div>

                {[
                  { label: 'Tier', value: status.tier },
                  { label: 'License', value: status.license_type === 'lifetime' ? 'Own Outright' : 'Subscription' },
                  { label: 'Purchased', value: status.purchased_at ? new Date(status.purchased_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—' },
                  { label: 'Last Payment', value: status.last_payment_at ? new Date(status.last_payment_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—' },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '10px 0',
                    borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none',
                  }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{row.label}</span>
                    <span style={{ color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                {/* Manage Billing — Primary */}
                <button
                  onClick={openPortal}
                  disabled={portalLoading}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '14px', border: 'none',
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                    color: '#000', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    opacity: portalLoading ? 0.6 : 1, transition: 'opacity 0.2s',
                  }}
                >
                  <CreditCard size={20} />
                  {portalLoading ? 'Opening Stripe...' : 'Manage Billing & Subscription'}
                </button>

                <p className="text-dim" style={{ textAlign: 'center', fontSize: '0.75rem', lineHeight: 1.6, margin: '4px 0 0' }}>
                  Opens Stripe's secure portal. Update payment, view invoices, or cancel — effective immediately. No phone call, no email, no waiting.
                </p>
              </div>

              {/* What happens when you cancel */}
              <div style={{
                marginTop: '2rem', padding: '1.25rem', borderRadius: '14px',
                background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.12)',
              }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                  What happens if I cancel?
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  <li><strong style={{ color: 'var(--text-main)' }}>You keep the software.</strong> It's yours — you paid for it.</li>
                  <li>New updates, cloud features, and predictive intelligence stop.</li>
                  <li>Your diagnostic data and reports remain on your device.</li>
                  <li>Re-subscribe anytime to restore full Pro access at your locked-in rate.</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Not a customer yet */}
          {!status && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p className="text-dim" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                Don't have a Pro license yet?{' '}
                <a href="/order" style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none' }}>
                  Get started from $9.99 →
                </a>
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
