import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Database, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { signInWithGoogle, signInWithEmail, registerWithEmail } from '../lib/firebase';

interface LoginScreenProps {
  brand?: 'lumescan' | 'tll';
}

const brands = {
  lumescan: {
    icon: <Shield size={28} color="#0a0a0c" />,
    title: 'LumeScan Pro',
    subtitle: 'Create a free account to access your vehicle diagnostics dashboard, download the app, and manage your subscription.',
    gradient: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
    accent: 'var(--accent-cyan)',
  },
  tll: {
    icon: <Database size={28} color="#0a0a0c" />,
    title: 'Trust Layer Ledger',
    subtitle: 'Cryptographic vehicle provenance explorer.',
    gradient: 'linear-gradient(135deg, #22d3ee, #38bdf8)',
    accent: '#38bdf8',
  },
};

export default function LoginScreen({ brand = 'lumescan' }: LoginScreenProps) {
  const b = brands[brand];
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'register') {
        await registerWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      // Clean up Firebase error messages
      if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
        setError('Invalid email or password.');
      } else if (msg.includes('email-already-in-use')) {
        setError('This email is already registered. Try signing in.');
      } else if (msg.includes('weak-password')) {
        setError('Password must be at least 6 characters.');
      } else if (msg.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (msg.includes('user-not-found')) {
        setError('No account found. Register below.');
      } else {
        setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)/, '').trim());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed';
      if (!msg.includes('popup-closed')) {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg-dark)',
      display: 'flex', overflowY: 'auto',
      padding: '1.5rem', zIndex: 100,
    }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%', maxWidth: '420px', position: 'relative', zIndex: 2,
          margin: 'auto',
        }}
      >
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: b.gradient,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 8px 32px rgba(56,189,248,0.2)',
          }}>
            {b.icon}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>{b.title}</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{b.subtitle}</p>
        </div>

        {/* Login card */}
        <div className="panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>

          {/* Google SSO */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: '100%', padding: '0.85rem', borderRadius: '10px',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${b.accent}`; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {mode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
          </button>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'center', margin: '4px 0 0' }}>Fastest way to get started — one click</p>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-light)' }} />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                placeholder={mode === 'register' ? 'Your email address' : 'Email address'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                  background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)',
                  borderRadius: '8px', color: '#fff', fontSize: '0.9rem',
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="password"
                placeholder={mode === 'register' ? 'Create a password (min 6 characters)' : 'Password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                  background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)',
                  borderRadius: '8px', color: '#fff', fontSize: '0.9rem',
                }}
              />
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.7rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px' }}>
                <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#fca5a5' }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.85rem', borderRadius: '10px',
                background: b.gradient, border: 'none',
                color: '#0a0a0c', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s',
              }}
            >
              <LogIn size={16} />
              {loading ? 'Authenticating…' : mode === 'register' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle mode */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ background: 'none', border: 'none', color: b.accent, fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500 }}
            >
              {mode === 'login' ? "New here? Create a free account" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Lume Auto by DarkWave Studios<br />
            Authentication secured by Firebase
          </p>
        </div>
      </motion.div>
    </div>
  );
}
