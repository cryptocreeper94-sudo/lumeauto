import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Technology from './pages/Technology';
import MpgGains from './pages/MpgGains';
import Maintenance from './pages/Maintenance';
import Fleet from './pages/Fleet';

function LoadingScreen() {
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
        <Activity size={48} className="text-cyan" />
      </motion.div>
      <div style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }} className="text-muted">
        Lume<span className="text-cyan">Auto</span>
      </div>
      <div style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }} className="text-dim">
        INITIALIZING DETERMINISTIC GOVERNANCE
      </div>
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

  const links = [
    { path: '/', label: 'Home' },
    { path: '/technology', label: 'Technology' },
    { path: '/mpg-gains', label: 'MPG Gains' },
    { path: '/maintenance', label: 'Maintenance' },
    { path: '/fleet', label: 'Fleet' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: 'rgba(10, 10, 12, 0.8)',
      backdropFilter: 'blur(12px)',
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
          <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Get Early Access
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          id="mobile-toggle"
          style={{ display: 'block', padding: '0.5rem' }} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'absolute', top: '70px', left: 0, right: 0, 
              background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)',
              padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem'
            }}
          >
            {links.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ 
                  fontSize: '1rem', 
                  color: location.pathname === link.path ? 'var(--text-main)' : 'var(--text-muted)'
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-light)', padding: '4rem 0', marginTop: '4rem' }}>
      <div className="container flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.03em', opacity: 0.5 }}>
            <Activity size={24} />
            <span>Lume<span style={{ fontWeight: 400 }}>Auto</span></span>
          </div>
          <div className="flex gap-4 text-muted text-sm">
            <a href="#">Whitepaper</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p>© 2026 DarkWave Studios LLC / Lume42 Labs. All rights reserved.</p>
          <p>Patent: US Provisional 64/032,339</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <ScrollToTop />
          <style>{`
            @media (min-width: 768px) {
              #desktop-nav { display: flex !important; }
              #mobile-toggle { display: none !important; }
            }
          `}</style>
          <Navigation />
          <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 200px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/mpg-gains" element={<MpgGains />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/fleet" element={<Fleet />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      )}
    </Router>
  );
}

export default App;
