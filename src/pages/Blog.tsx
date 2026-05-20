import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const POSTS = [
  {
    slug: 'why-your-car-is-wasting-fuel',
    date: 'May 2026',
    title: 'Why Your Car Is Wasting 15% of Its Fuel Right Now',
    excerpt: 'Most vehicles on the road today operate significantly below their engineering potential. Deferred maintenance, sub-optimal driving habits, and invisible sensor degradation silently drain your MPG every single day.',
    tag: 'Engineering',
  },
  {
    slug: 'the-diagnostic-gap',
    date: 'May 2026',
    title: 'The Diagnostic Gap: Why $150 Reads Should Cost $0',
    excerpt: 'The average check engine light costs $150 just to diagnose at a mechanic shop. With a $15 Bluetooth OBD-II scanner and Lume-Auto, that same information is delivered to your phone instantly â€” in plain English.',
    tag: 'Product',
  },
  {
    slug: 'passive-audio-coaching-and-classical-conditioning',
    date: 'May 2026',
    title: 'Passive Audio Coaching: Classical Conditioning Behind the Wheel',
    excerpt: 'Attention spans are short. Lume-Auto\'s Passive Audio Coach uses simple audio tones to subconsciously train drivers toward optimal throttle behavior â€” no screen required.',
    tag: 'Research',
  },
  {
    slug: 'fleet-families-and-the-byod-revolution',
    date: 'May 2026',
    title: 'Fleet, Families, and the BYOD Revolution',
    excerpt: 'From parents monitoring teenage drivers to fleet managers tracking 200 delivery vans, the Bring Your Own Device strategy eliminates hardware bottlenecks and puts software adoption first.',
    tag: 'Strategy',
  },
];

export default function Blog() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
          Research & Engineering
        </div>
        <h1 style={{ fontSize: '3rem', lineHeight: 1.1 }}>Journal</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>
          Technical dispatches from the Lume-Auto engine. Engineering insights, product strategy, and the science of deterministic vehicle governance.
        </p>

        <div className="flex flex-col gap-6" style={{ marginTop: '2rem' }}>
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="panel"
              style={{ padding: '2rem', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}
              whileHover={{ borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, padding: '4px 10px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {post.tag}
                </span>
                <span className="flex items-center gap-1 text-dim" style={{ fontSize: '0.8rem' }}>
                  <Calendar size={12} /> {post.date}
                </span>
              </div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{post.title}</h2>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{post.excerpt}</p>
              <div className="flex items-center gap-2 text-cyan" style={{ marginTop: '1.25rem', fontWeight: 600, fontSize: '0.9rem' }}>
                Read dispatch <ArrowRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

