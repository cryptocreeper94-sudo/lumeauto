import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Download, LogIn, CheckCircle2, XCircle } from 'lucide-react';
import { signInWithGoogle, firebaseSignOut, onAuthStateChanged, auth } from '../lib/firebase';
import type { User } from '../lib/firebase';

const WHITELISTED_EMAILS = [
  'barrycline33@gmail.com',
  'pcdirect97@gmail.com',
  'cryptocreeper94@gmail.com',
  'kathytidwell74@gmail.com'
];

export default function BetaAccess() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      if (user && user.email) {
        const authorized = WHITELISTED_EMAILS.includes(user.email.toLowerCase());
        setIsAuthorized(authorized);
        if (!authorized) {
          setAuthError(`Access Denied: ${user.email} is not on the beta tester whitelist.`);
        } else {
          setAuthError(null);
        }
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Login failed:', error);
      setAuthError(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ShieldAlert size={64} className="text-cyan" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Beta Tester <span className="text-cyan">Portal</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          Welcome to the exclusive Lume-Auto beta testing program. Please authenticate with your authorized Google account to access the pre-release APK.
        </p>

        {loading ? (
          <div style={{ padding: '2rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Verifying credentials...</p>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '1rem', padding: '3rem 2rem' }}>
            {!user ? (
              <div className="flex flex-col items-center gap-4">
                <button onClick={handleLogin} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                  <LogIn size={20} />
                  Sign in with Google
                </button>
                {authError && (
                  <p style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.9rem' }}>{authError}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div style={{ marginBottom: '2rem' }}>
                  <img src={user.photoURL || ''} alt="Profile" style={{ width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 1rem auto' }} />
                  <p style={{ fontWeight: 600, fontSize: '1.2rem' }}>{user.displayName}</p>
                  <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                </div>

                {isAuthorized ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '0.75rem', padding: '2rem', width: '100%' }}
                  >
                    <CheckCircle2 size={48} className="text-cyan" style={{ margin: '0 auto 1rem auto' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600 }}>Authorization Complete</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your account is whitelisted for beta access.</p>
                    
                    <a href="/releases/LumeScan_v1.0.0.apk" download className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%', padding: '1rem' }}>
                      <Download size={20} />
                      Download LumeScan Beta APK
                    </a>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.75rem', padding: '2rem', width: '100%' }}
                  >
                    <XCircle size={48} color="#ef4444" style={{ margin: '0 auto 1rem auto' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 600, color: '#ef4444' }}>Access Denied</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{authError}</p>
                  </motion.div>
                )}

                <button onClick={handleLogout} style={{ marginTop: '2rem', color: 'var(--text-muted)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
