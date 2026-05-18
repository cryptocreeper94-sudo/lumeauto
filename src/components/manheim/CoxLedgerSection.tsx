import { motion } from 'framer-motion';
import { Link2, ShieldCheck, Lock, Server, FileCheck, Globe, Fingerprint, Layers, Workflow, Database, CheckCircle } from 'lucide-react';
import CardCarousel from '../CardCarousel';

const fadeIn = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const accent = '#38bdf8';
const accentDim = 'rgba(56,189,248,0.12)';
const accentBorder = 'rgba(56,189,248,0.25)';

export default function CoxLedgerSection() {
  return (
    <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden', background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Subtle pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: `repeating-linear-gradient(45deg, ${accent}44 0px, transparent 2px, transparent 20px, ${accent}44 22px)`, backgroundSize: '30px 30px' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', width: '900px', height: '900px', background: `radial-gradient(circle, ${accentDim} 0%, transparent 65%)`, transform: 'translate(-50%, -40%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <img src="/assets/images/photos/ledger.png" alt="Enterprise operations center" style={{ width: '100%', height: '320px', objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '20px', marginBottom: '2.5rem', border: `1px solid ${accentDim}`, opacity: 0.8 }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div {...fadeIn}>
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 14px', background: accentDim, border: `1px solid ${accentBorder}`, borderRadius: '20px', fontSize: '0.75rem', color: accent, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              <Link2 size={14} style={{ marginRight: 6 }} /> Enterprise Trust Fabric
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
              Cox Automotive Ledger
            </h2>
            <p className="text-muted" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              The private, tamper-proof operational ledger powering the entire Cox Automotive modernization stack.
            </p>
            <p className="text-dim" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A dedicated, permissioned Proof-of-Authority ledger built exclusively for Cox Automotive — isolated from public networks, free of tokens and transaction costs, and fully controlled by the enterprise it serves.
            </p>
          </motion.div>
        </div>

        {/* What CAL Is — core capabilities */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accent, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={20} /> What CAL Does
          </h3>
          <CardCarousel desktopColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="1.25rem" accentColor={accent}>
            {[
              { icon: <Fingerprint size={22} />, title: 'Records Operational Events', desc: 'Every vehicle scan, custody transfer, condition report, and workflow transition is sealed as a signed, timestamped, immutable record.' },
              { icon: <ShieldCheck size={22} />, title: 'Verifies Deterministic Workflows', desc: 'LUME-V governance decisions are anchored to the ledger — providing cryptographic proof that every output was produced deterministically.' },
              { icon: <Layers size={22} />, title: 'Unifies the Audit Fabric', desc: 'A single source of operational truth across Lot Ops Pro, LUME-Auto telemetry, condition certificates, and future Meridian integration.' },
            ].map((item, i) => (
              <div key={i} className="panel" style={{ padding: '1.75rem', borderColor: accentDim, height: '100%' }}>
                <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </CardCarousel>
        </motion.div>

        {/* Why CAL Exists + What It Enables — two-column */}
        <motion.div {...fadeIn} transition={{ delay: 0.25 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

          {/* Why it exists */}
          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(239,68,68,0.15)', background: 'linear-gradient(180deg, rgba(239,68,68,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> Why CAL Exists
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Manheim needs a safe, internal trust fabric that does not compromise existing operations:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Does not rely on public networks',
                'Does not expose commercial infrastructure',
                'Does not require tokens or cryptocurrency',
                'Does not require vendor replacement',
                'Does not require rewriting legacy systems',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* What it enables */}
          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Workflow size={20} /> What CAL Enables
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              CAL gives Manheim capabilities that extend current operational infrastructure:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Unified operational truth across every facility',
                'Deterministic audit trails for every workflow',
                'Cross-system verification without replacing legacy',
                'A modernization path aligned with LUME-V',
                'A foundation for future automation and energy',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Why Private + Enterprise Scalability */}
        <motion.div {...fadeIn} transition={{ delay: 0.3 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="panel" style={{ padding: '2.25rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: accent, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> Why a Private Ledger
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Public distributed ledgers are designed for trustless environments. Cox Automotive is not a trustless environment — it is a known network of verified facilities, employees, and systems. A private ledger delivers the same immutability and auditability guarantees without the latency, transaction costs, or data exposure of public networks.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Zero transaction costs — no per-event fees',
                'Sub-second finality — no mining delays',
                'Complete data privacy — nothing leaves the Cox network',
                'Permissioned validators — only authorized facilities',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.15)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} /> Enterprise Scalability
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              CAL is not limited to Manheim. The same private infrastructure can extend across the entire Cox Automotive portfolio — providing a unified, cryptographically verified data layer wherever vehicles are bought, sold, serviced, or financed.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Manheim — auction integrity and custody',
                'Autotrader — verified listing provenance',
                'Kelley Blue Book — cryptographic valuation anchoring',
                'Dealer.com — dealership transaction ledger',
                'NextGear Capital — financing audit trail',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* What It Records — operational detail */}
        <motion.div {...fadeIn} transition={{ delay: 0.35 }} style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accent, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck size={20} /> What Gets Recorded
          </h3>
          <CardCarousel desktopColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="1.25rem" accentColor={accent}>
            {[
              { icon: <Fingerprint size={22} />, title: 'Vehicle Custody Chain', desc: 'Every handoff — intake to lot, lot to lane, lane to transport — is recorded as a signed, timestamped transition. The full chain of custody is provable and immutable.' },
              { icon: <FileCheck size={22} />, title: 'Condition Certificates', desc: 'OBD-II scan results from LUME-Auto are sealed on-ledger at the moment of diagnosis. The same data that generated the report is cryptographically bound to it — permanently.' },
              { icon: <ShieldCheck size={22} />, title: 'Arbitration Defense', desc: 'When a dispute arises, the ledger provides deterministic replay. Same inputs, same organism, same result — backed by cryptographic proof that the data was never altered.' },
            ].map((item, i) => (
              <div key={i} className="panel" style={{ padding: '1.75rem', borderColor: accentDim, height: '100%' }}>
                <div style={{ color: accent, marginBottom: '0.75rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </CardCarousel>
        </motion.div>

        {/* Data Privacy Architecture */}
        <motion.div {...fadeIn} transition={{ delay: 0.38 }} style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: accent, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={20} /> Verified but Private
          </h3>
          <div className="panel" style={{ padding: '2.25rem', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, transparent 100%)` }}>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              CAL stores <strong style={{ color: accent }}>cryptographic hashes</strong>, not raw data. No employee PII, compensation details, internal pricing, or competitive intelligence is written to the ledger in cleartext. The underlying records remain in Cox-controlled databases behind existing access control policies. The ledger proves integrity — the source systems store content.
            </p>
            <CardCarousel desktopColumns="repeat(auto-fit, minmax(220px, 1fr))" gap="1rem" accentColor={accent}>
              {[
                { label: 'Hashes Only', desc: 'SHA-256 fingerprints + metadata pointers — never raw data', color: accent },
                { label: 'Permissioned Access', desc: 'Facility managers see their facility. Corporate sees aggregate. Employees see their own records only.', color: 'var(--accent-emerald)' },
                { label: 'Zero External Exposure', desc: 'Nothing on CAL is accessible outside the Cox network. Trust Layer certificates expose only what Cox approves.', color: '#f87171' },
                { label: 'Tamper-Proof Proof', desc: 'If a source record is modified after anchoring, the hash mismatch is instantly detectable.', color: '#38bdf8' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: `1px solid ${accentDim}`, height: '100%' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color, marginBottom: '0.4rem' }}>{item.label}</p>
                  <p className="text-dim" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </CardCarousel>
          </div>
        </motion.div>

        {/* Employee Hash Receipts */}
        <motion.div {...fadeIn} transition={{ delay: 0.42 }} style={{ marginBottom: '3rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fingerprint size={20} /> Employee Hash Receipts
          </h3>
          <div className="panel" style={{ padding: '2.25rem', borderColor: 'rgba(16,185,129,0.2)', background: 'linear-gradient(180deg, rgba(16,185,129,0.03) 0%, transparent 100%)' }}>
            <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.92rem' }}>
              Every record on CAL that affects an individual employee generates a <strong style={{ color: 'var(--accent-emerald)' }}>cryptographic receipt</strong> delivered to that employee's portal. When a timecard is edited, a pay adjustment is processed, a performance review is filed, or a safety incident is logged — the employee receives the SHA-256 hash of the record as it was anchored.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {[
                'Timecard edit → employee receives hash of original + modified entry',
                'Pay adjustment → employee receives hash of payroll record at processing time',
                'Performance review → employee receives hash of review as filed',
                'Safety incident → employee receives hash of incident report at recording',
                'Bonus calculation → employee receives hash of quota data + payout',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  <CheckCircle size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} /> {item}
                </div>
              ))}
            </div>
            <p className="text-dim" style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
              This is a trust feature, not a transparency feature. Employees see only the cryptographic proof that <em>their</em> records are intact. If a record is modified after anchoring, the receipt hash will not match — making unauthorized changes provably detectable. This protects both the organization and its workforce.
            </p>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="panel" style={{ padding: '3rem', textAlign: 'center', borderColor: accentBorder, background: `linear-gradient(180deg, ${accentDim} 0%, rgba(56,189,248,0.02) 100%)`, boxShadow: `0 10px 40px ${accentDim}` }}>
          <Server size={28} style={{ color: accent, marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: accent }}>Cox Controls the Record. Always.</h3>
          <p className="text-muted" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            The Cox Automotive Ledger runs on infrastructure Cox owns and governs. Every facility operates as a validator node. Every vehicle event becomes an immutable, enterprise-controlled record. Every dispute resolves against cryptographic proof — not negotiation, not memory, not he-said-she-said.
          </p>
          <a href="https://cal.tlid.io" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: accent, color: '#0a0c10', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 4px 20px ${accentDim}` }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <Link2 size={16} /> Launch Ledger Explorer
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '20px', color: '#f87171', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Lock size={14} /> Accessed securely via Cox Operational Platform (COP) or Authorized Web Gateway
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
