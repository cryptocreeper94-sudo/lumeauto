import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Shield, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Technology from './pages/Technology';
import MpgGains from './pages/MpgGains';
import Maintenance from './pages/Maintenance';
import Fleet from './pages/Fleet';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Waitlist from './pages/Waitlist';
import Blog from './pages/Blog';
import Enterprise from './pages/Enterprise';
import GetStarted from './pages/GetStarted';
import ManheimPitch from './pages/ManheimPitch';
import MeridianPitch from './pages/MeridianPitch';
import EngineeringBrief from './pages/EngineeringBrief';
import Whitepaper from './pages/Whitepaper';
import OrganismApp from './pages/OrganismApp';
import DownloadPage from './pages/DownloadPage';
import Order from './pages/Order';
import Footer from './components/Footer';
import RollerCoaster from './components/RollerCoaster';
import AuthGate from './components/AuthGate';
import { firebaseSignOut } from './lib/firebase';

function LoadingScreen({ subdomain }: { subdomain: 'manheim' | 'cal' | null }) {
  const isManheim = subdomain === 'manheim' || subdomain === 'cal';
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'var(--bg-dark)', zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1rem'
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Shield size={48} className="text-cyan" />
      </motion.div>
      <div style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }} className="text-muted">
        {isManheim ? (
          <>Manheim <span className="text-cyan">Vehicle Intelligence</span></>
        ) : (
          <>Lume<span className="text-cyan">Auto</span></>
        )}
      </div>
      <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }} className="text-dim">
        {isManheim ? 'INITIALIZING ENTERPRISE PLATFORM' : 'INITIALIZING DETERMINISTIC GOVERNANCE'}
      </div>
      <motion.div
        style={{ width: '200px', height: '2px', background: 'var(--border-light)', borderRadius: '1px', marginTop: '1rem', overflow: 'hidden' }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'var(--accent-cyan)' }}
        />
      </motion.div>
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile nav on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/order', label: 'Order' },
    { path: '/fleet', label: 'Pricing' },
    { path: '/enterprise', label: 'Enterprise' },
    { path: '/blog', label: 'Journal' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: 'rgba(10, 10, 12, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container flex justify-between items-center" style={{ height: '70px' }}>
        <Link to="/" className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
          <Activity className="text-cyan" size={24} />
          <span>Lume<span style={{ opacity: 0.5 }}>Auto</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="flex items-center gap-6" style={{ display: 'none' }} id="desktop-nav">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: location.pathname === link.path ? 'var(--text-main)' : 'var(--text-muted)',
                transition: 'color 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/waitlist" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Get Early Access
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-toggle"
          style={{ display: 'block', padding: '0.5rem' }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '70px', left: 0, right: 0,
              background: 'rgba(10, 10, 12, 0.98)', backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border-light)',
              padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'
            }}
          >
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: location.pathname === link.path ? 'var(--accent-cyan)' : 'var(--text-muted)'
                }}
              >
                {link.label}
              </Link>
            ))}
            {/* Executive Summary */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                Lume-Auto reads 42 real-time signals from your vehicle's OBD-II port to passively improve fuel efficiency, predict maintenance failures, and eliminate diagnostic fees — using hardware you already own.
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                US Provisional Patent 64/032,339<br />
                DarkWave Studios LLC / Lume42 Labs
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
              <Link to="/waitlist" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}>
                Get Early Access
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/** Detect which subdomain we're on */
function getSubdomain(): 'manheim' | 'cal' | null {
  const host = window.location.hostname;
  if (host.includes('manheim')) return 'manheim';
  if (host.includes('cal')) return 'cal';
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const subdomain = getSubdomain();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" subdomain={subdomain} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <ScrollToTop />
          <style>{`
            @media (min-width: 769px) {
              #desktop-nav { display: flex !important; }
              #mobile-toggle { display: none !important; }
            }
          `}</style>

          {subdomain ? (
            /* ── Gated subdomain (manheim / cal) ── */
            <AuthGate brand={subdomain}>
              <nav style={{
                position: 'fixed', top: 0, width: '100%', zIndex: 50,
                background: 'rgba(10, 10, 12, 0.85)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border-light)',
              }}>
                <div className="container flex justify-between items-center" style={{ height: '56px', padding: '0 12px' }}>
                  <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Shield size={16} color="#0a0a0c" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.02em', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Manheim Vehicle Intelligence</div>
                      <div className="nav-subtitle-desktop" style={{ fontSize: '0.55rem', color: 'var(--text-dim)', letterSpacing: '0.06em' }}>Vehicle Intelligence Platform</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', flexShrink: 0 }}>
                    <span className="nav-auth-desktop" style={{ color: 'var(--accent-emerald)', whiteSpace: 'nowrap' }}>● Authenticated</span>
                    <button
                      onClick={() => firebaseSignOut()}
                      style={{
                        background: 'none', border: '1px solid var(--border-light)', borderRadius: '6px',
                        padding: '4px 10px', cursor: 'pointer', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem',
                        transition: 'border-color 0.2s', whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.4)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'}
                      title="Sign Out"
                    >
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                </div>
              </nav>
              <main style={{ paddingTop: '56px', minHeight: 'calc(100vh - 200px)' }}>
                <Routes>
                  <Route path="/" element={<ManheimPitch />} />
                  <Route path="/meridian" element={<MeridianPitch />} />
                  <Route path="/engineering" element={<EngineeringBrief />} />
                  <Route path="/whitepaper" element={<Whitepaper />} />
                  <Route path="/manheim" element={<ManheimPitch />} />
                  <Route path="/manheim-meridian" element={<MeridianPitch />} />
                  <Route path="/manheim-engineering" element={<EngineeringBrief />} />
                  <Route path="/app" element={<OrganismApp />} />
                  <Route path="/download" element={<DownloadPage />} />
                </Routes>
              </main>
              <Footer />
              <RollerCoaster />
            </AuthGate>
          ) : (
            /* ── Public site (lumeauto.tech) ── */
            <>
              <Navigation />
              <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 200px)' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/technology" element={<Technology />} />
                  <Route path="/mpg-gains" element={<MpgGains />} />
                  <Route path="/maintenance" element={<Maintenance />} />
                  <Route path="/fleet" element={<Fleet />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/waitlist" element={<Waitlist />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/get-started" element={<GetStarted />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/manheim" element={<ManheimPitch />} />
                  <Route path="/manheim-meridian" element={<MeridianPitch />} />
                  <Route path="/manheim-engineering" element={<EngineeringBrief />} />
                  <Route path="/meridian" element={<MeridianPitch />} />
                  <Route path="/engineering" element={<EngineeringBrief />} />
                  <Route path="/app" element={<OrganismApp />} />
                  <Route path="/download" element={<DownloadPage />} />
                </Routes>
              </main>
              <Footer />
              <RollerCoaster />
            </>
          )}
        </motion.div>
      )}
    </Router>
  );
}

export default App;

