import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    target: 'Consumer acquisition',
    features: ['Basic OBD-II read', 'Efficiency score', 'Single vehicle', 'Check engine light translation'],
    cta: 'Get Started',
    accent: false,
  },
  {
    name: 'Premium Consumer',
    price: '$9.99',
    period: '/month or $79/year',
    target: 'Individual drivers',
    features: ['Full 42-node governance', 'Real-time coaching', 'Maintenance predictions', 'Fuel quality alerts', 'Historical efficiency data', 'Passive Audio Coach'],
    cta: 'Subscribe',
    accent: true,
  },
  {
    name: 'Family Dashboard',
    price: '$14.99',
    period: '/month',
    target: 'Households, 3–5 vehicles',
    features: ['Multi-vehicle scoring', 'Teen driver safety scoring', 'Shared efficiency dashboard', 'Centralized maintenance alerts', 'Passenger Telemetry View'],
    cta: 'Subscribe',
    accent: false,
  },
  {
    name: 'Commercial Fleet',
    price: '$36',
    period: '/vehicle/month',
    target: 'SMB fleets, logistics, couriers',
    features: ['Fleet-wide efficiency analytics', 'Driver behavior scoring (FS10)', 'Maintenance scheduling', 'Aggregate telemetry', 'Fuel waste reporting', 'Configurable alert thresholds'],
    cta: 'Contact Sales',
    accent: false,
  },
];

export default function Fleet() {
  return (
    <div style={{ paddingBottom: '6rem' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '800px', paddingTop: '4rem', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Pricing
          </div>
          <h1 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1rem' }}>Choose Your Tier</h1>
          <p className="text-muted" style={{ fontSize: '1.15rem' }}>
            From individual drivers to enterprise auction operators. Every tier runs on the same deterministic Lume runtime.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="panel flex flex-col"
              style={{
                padding: '2rem',
                border: tier.accent ? '1px solid rgba(6, 182, 212, 0.4)' : undefined,
                background: tier.accent ? 'rgba(6, 182, 212, 0.03)' : undefined,
              }}
            >
              {tier.accent && <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Most Popular</span>}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{tier.price}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>{tier.period}</span>
              </div>
              <p className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '1.5rem' }}>{tier.target}</p>
              <ul className="flex flex-col gap-2" style={{ listStyle: 'none', flex: 1 }}>
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
                    <Check size={14} color="var(--accent-emerald)" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/waitlist" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.75rem' }}>
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enterprise tier */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel" style={{ padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.03)' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise / Auction</h3>
            <p className="text-muted" style={{ maxWidth: '500px' }}>Condition report automation, arbitration reduction, lot-flow intelligence, lane readiness scoring. Custom contract pricing.</p>
          </div>
          <Link to="/enterprise" className="btn-primary" style={{ padding: '1rem 2rem' }}>
            Enterprise Solutions <ArrowRight size={18} />
          </Link>
        </motion.div>

        <p className="text-dim" style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '2rem' }}>
          Payback: First-year value per vehicle is $2,880+ (fuel savings, skipped diagnostics, preventive repair catches). Premium subscription pays back in under 30 days.
        </p>
      </div>
    </div>
  );
}
