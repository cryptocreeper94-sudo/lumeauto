import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Zap, ShieldCheck } from 'lucide-react';

export default function MeridianVisualizer() {
  const [chargingState, setChargingState] = useState<'idle' | 'charging' | 'complete'>('idle');
  const [chargeLevel, setChargeLevel] = useState(24);
  const [hash, setHash] = useState('');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (chargingState === 'charging') {
      interval = setInterval(() => {
        setChargeLevel(prev => {
          if (prev >= 100) {
            setChargingState('complete');
            setHash('0x' + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join(''));
            return 100;
          }
          return prev + 1;
        });
      }, 30); // Fast simulation
    }
    return () => clearInterval(interval);
  }, [chargingState]);

  const initiateCharge = () => {
    setChargeLevel(24);
    setHash('');
    setChargingState('charging');
  };

  return (
    <div className="panel" style={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', background: '#0a0a0c', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '16px', overflow: 'hidden' }}>
      
      {/* Visualizer Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        {/* Overhead Canopy (Anchor Nodes) */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '40px', background: 'rgba(167, 139, 250, 0.1)', borderBottom: '2px solid #a78bfa', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: '5px' }}>
          {[1, 2, 3, 4, 5].map(node => (
            <div key={node} style={{ width: '12px', height: '8px', background: chargingState === 'charging' ? '#fff' : '#a78bfa', borderRadius: '2px', boxShadow: chargingState === 'charging' ? '0 0 15px #a78bfa' : 'none', transition: 'all 0.3s' }} />
          ))}
        </div>

        {/* Wireless Energy Beams */}
        <AnimatePresence>
          {chargingState === 'charging' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ position: 'absolute', top: '40px', bottom: '150px', left: '20%', right: '20%', background: 'linear-gradient(180deg, rgba(167,139,250,0.4) 0%, rgba(167,139,250,0) 100%)', pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>

        {/* Vehicle Envelope */}
        <motion.div
          animate={{
            x: chargingState === 'idle' ? ['-200%', '0%'] : chargingState === 'complete' ? ['0%', '200%'] : '0%',
            opacity: chargingState === 'complete' ? [1, 0] : 1
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ width: '280px', height: '100px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px 40px 16px 16px', background: 'rgba(255,255,255,0.02)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}
        >
          {/* Battery Indicator on Vehicle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: chargingState === 'charging' ? '#a78bfa' : 'var(--text-muted)' }}>
            <Battery size={24} />
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{Math.floor(chargeLevel)}%</span>
          </div>

          {/* Glowing receiver plate */}
          <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '4px', background: chargingState === 'charging' ? '#a78bfa' : 'rgba(255,255,255,0.2)', borderRadius: '2px', boxShadow: chargingState === 'charging' ? '0 0 20px #a78bfa' : 'none', transition: 'all 0.3s' }} />
        </motion.div>

        {/* Ground */}
        <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '100px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)' }} />

      </div>

      {/* Control Panel & Output */}
      <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(167, 139, 250, 0.2)', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          onClick={initiateCharge}
          disabled={chargingState === 'charging'}
          className="btn-primary"
          style={{ background: chargingState === 'charging' ? 'transparent' : '#a78bfa', color: chargingState === 'charging' ? '#a78bfa' : '#fff', border: chargingState === 'charging' ? '1px solid #a78bfa' : 'none', width: '100%', justifyContent: 'center', height: '48px' }}
        >
          {chargingState === 'charging' ? (
            <><Zap className="spin" size={18} /> Routing...</>
          ) : chargingState === 'complete' ? (
            'Next Vehicle in Queue'
          ) : (
            'Enter Charging Zone'
          )}
        </button>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-emerald)', background: '#020205', padding: '0.75rem', borderRadius: '8px', border: '1px dashed rgba(16, 185, 129, 0.3)', height: '48px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={16} />
          {chargingState === 'idle' ? (
            <span style={{ color: 'var(--text-dim)' }}>WAITING FOR VEHICLE SIGN-IN...</span>
          ) : chargingState === 'charging' ? (
            <span>GENERATING CRYPTOGRAPHIC RECEIPT...</span>
          ) : (
            <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <span>TX_HASH:</span>
              <span style={{ color: '#fff' }}>{hash}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
