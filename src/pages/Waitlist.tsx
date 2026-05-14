import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Waitlist() {
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/opt-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, consent })
      });
      
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Join the Future.</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Hardware is deploying soon. Get SMS alerts the second it goes live.</p>
        
        <div className="panel mt-8" style={{ textAlign: 'left' }}>
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%' }}>
                <ShieldCheck size={48} color="var(--accent-emerald)" />
              </div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-emerald)' }}>Secured.</h2>
              <p className="text-muted">You are officially on the Lume-Auto waitlist. We will text you when the dongle drops.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mobile Number</label>
                <div style={{ display: 'flex', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
                    <MessageSquare size={18} />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="(555) 000-0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ 
                      width: '100%', 
                      background: 'rgba(0,0,0,0.2)', 
                      border: '1px solid var(--border-strong)', 
                      padding: '1rem 1rem 1rem 3rem', 
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '1.1rem',
                      fontFamily: 'var(--font-mono)'
                    }} 
                  />
                </div>
              </div>

              <label style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <input 
                  type="checkbox" 
                  checked={consent} 
                  onChange={(e) => setConsent(e.target.checked)} 
                  required
                  style={{ marginTop: '4px', transform: 'scale(1.2)' }}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  By checking this box, I agree to receive text messages from Lume-Auto regarding product drops, account updates, and telemetry alerts at the number provided. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to cancel or HELP for help. View our Privacy Policy and Terms of Service.
                </span>
              </label>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={!consent || status === 'loading'}
                style={{ width: '100%', justifyContent: 'center', padding: '1.25rem', fontSize: '1.1rem', opacity: (!consent || status === 'loading') ? 0.5 : 1 }}
              >
                {status === 'loading' ? 'Securing Spot...' : 'Join Waitlist via SMS'} <ArrowRight size={20} />
              </button>
              {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>Network error. Please try again.</p>}
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
