import { useState, useEffect, type ReactNode } from 'react';
import { auth, onAuthStateChanged, type User } from '../lib/firebase';
import LoginScreen from './LoginScreen';

interface AuthGateProps {
  children: ReactNode;
  /** Which brand to show on the login screen */
  brand?: 'lumescan' | 'tll';
}

export default function AuthGate({ children, brand }: AuthGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          border: '3px solid rgba(56,189,248,0.2)',
          borderTopColor: 'var(--accent-cyan)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Authenticating…
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen brand={brand} />;
  }

  return <>{children}</>;
}
