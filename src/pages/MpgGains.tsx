import { motion } from 'framer-motion';

export default function MpgGains() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Quantified MPG Gains</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>
          First-year value: $2,880+. That's ~$300 in fuel coaching savings, $150 in diagnostic shop visits you never make, and one preventive maintenance catch worth $2,400+ in avoided repairs.
        </p>

        <div className="panel mt-8">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Improvement by Vehicle Condition</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Typical MPG Gain</th>
                <th>Primary Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Well-maintained, efficient driver</td>
                <td className="text-cyan font-mono">3–5%</td>
                <td className="text-muted">Operating point + DFCO optimization</td>
              </tr>
              <tr>
                <td>Average driver, good maintenance</td>
                <td className="text-cyan font-mono">5–8%</td>
                <td className="text-muted">Behavioral + operating point</td>
              </tr>
              <tr>
                <td>Average driver, some deferred maintenance</td>
                <td className="text-cyan font-mono">8–12%</td>
                <td className="text-muted">Behavioral + maintenance recovery</td>
              </tr>
              <tr>
                <td>Poor driver or significant maintenance backlog</td>
                <td className="text-emerald font-mono font-bold">12–20%+</td>
                <td className="text-muted">All mechanisms combined</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel mt-4" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }}>Planetary Scale</h3>
          <p className="text-muted">
            105 billion gallons is equivalent to removing 210 million vehicles from the road entirely. 934 million metric tons of CO₂ is nearly three times the annual CO₂ output of India's entire transportation sector.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
