import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ROICalculator() {
  const [volume, setVolume] = useState(500);

  // Constants
  const MIN_PER_SCAN = 15; // 15 mins manual vs 1 min automated
  const AVG_ARBITRATION_COST = 1200; 
  const ARBITRATION_RATE = 0.02; // 2% of cars hit arbitration usually
  const LUME_PREVENTION_RATE = 0.70; // Catch 70% of faults at intake
  const WORKING_DAYS = 22;

  // Calcs
  const manualHoursMonth = (volume * WORKING_DAYS * MIN_PER_SCAN) / 60;
  const automatedHoursMonth = (volume * WORKING_DAYS * 1) / 60;
  const hoursSaved = Math.round(manualHoursMonth - automatedHoursMonth);
  
  const totalArbsMonth = volume * WORKING_DAYS * ARBITRATION_RATE;
  const arbsPrevented = totalArbsMonth * LUME_PREVENTION_RATE;
  const arbitrationSavingsMonth = Math.round(arbsPrevented * AVG_ARBITRATION_COST);

  return (
    <div className="panel" style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)', overflow: 'hidden' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Interactive Financial Impact</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Daily Intake Volume (per location)</label>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent-emerald)' }}>{volume} vehicles</span>
        </div>
        <input 
          type="range" 
          min="100" 
          max="2000" 
          step="50" 
          value={volume} 
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
          <span>100/day</span>
          <span>2,000/day</span>
        </div>
      </div>

      <div className="roi-stats-grid">
        <motion.div key={volume} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Inspector Hours Saved / Mo</div>
          <div className="roi-big-number" style={{ fontWeight: 700, color: 'var(--text-main)' }}>{hoursSaved.toLocaleString()}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>Reallocated to reconditioning</div>
        </motion.div>

        <motion.div key={`arb-${volume}`} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Arbitration Savings / Mo</div>
          <div className="roi-big-number" style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>${arbitrationSavingsMonth.toLocaleString()}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>Direct bottom-line recovery</div>
        </motion.div>
      </div>

      <style>{`
        .roi-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .roi-big-number { font-size: 2.2rem; }
        @media (max-width: 520px) {
          .roi-stats-grid { grid-template-columns: 1fr; gap: 1.25rem; }
          .roi-big-number { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}
