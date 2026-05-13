import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Maintenance Intelligence</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>
          Know what's wrong before it costs you. Lume-Auto watches your key components degrade in real time.
        </p>

        <div className="flex gap-4 items-start panel mt-8">
          <ShieldCheck className="text-cyan mt-1" size={32} />
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Most maintenance issues cost 5–15% MPG before they're serious enough to notice.</h3>
            <p className="text-muted">Lume-Auto finds them in the 1–3% range — early enough to fix cheaply.</p>
          </div>
        </div>

        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>What We Watch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            'Spark plugs', 'Fuel injectors', 'Air filter', 'Oxygen sensors', 
            'Catalytic converter', 'Tires', 'Engine oil', 'Intake valves', 
            'Transmission', 'Carbon buildup'
          ].map(item => (
            <div key={item} className="panel" style={{ padding: '1rem' }}>
              <span style={{ fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
