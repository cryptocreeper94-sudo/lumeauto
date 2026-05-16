import { motion } from 'framer-motion';
import { FileDown, Activity, ExternalLink } from 'lucide-react';

const f = { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Whitepaper() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          nav, .no-print, footer { display: none !important; }
          body { background: white !important; color: #111 !important; }
          .wp-container { max-width: 100% !important; padding: 0 !important; }
          .wp-container * { color: #111 !important; border-color: #ddd !important; background: white !important; }
          .wp-container h1, .wp-container h2, .wp-container h3 { color: #0a0a0c !important; }
          .wp-accent { color: #0369a1 !important; }
          .wp-section { page-break-inside: avoid; }
          .wp-cover { min-height: auto !important; padding: 3rem 0 !important; }
          section { padding: 0 !important; }
          main { padding-top: 0 !important; }
        }
      `}</style>

      <section style={{ padding: '0', background: 'var(--bg-dark)' }}>
        <div className="wp-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>

          {/* Cover */}
          <div className="wp-cover" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--border-light)' }}>
            <motion.div {...f}>
              <div style={{ marginBottom: '2rem' }}>
                <Activity size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
              </div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '2rem' }}>
                DarkWave Studios LLC — Confidential
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                Manheim Vehicle Intelligence<br />
                <span style={{ fontSize: '0.6em', color: 'var(--text-muted)', fontWeight: 400 }}>Infrastructure Modernization Platform</span>
              </h1>
              <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                A deterministic governance, diagnostic, and operational infrastructure layer designed exclusively for the Cox Automotive ecosystem.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
                <span>Version 1.0</span>
                <span>May 2026</span>
                <span>US Patent Pending — 64/032,339</span>
              </div>
              <button onClick={handleDownload} className="no-print" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', background: 'var(--accent-cyan)', color: '#0a0a0c',
                border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700,
                cursor: 'pointer', transition: 'transform 0.2s',
              }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}>
                <FileDown size={18} /> Download as PDF
              </button>
            </motion.div>
          </div>

          {/* Table of Contents */}
          <div className="wp-section" style={{ padding: '3rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <motion.div {...f}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Contents</h2>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', counterReset: 'toc' }}>
                {[
                  'Executive Summary',
                  'The Modernization Challenge',
                  'Platform Architecture Overview',
                  'LUME-V — Deterministic Governance Wrapper',
                  'Cox Automotive Ledger (CAL)',
                  'Lot Ops Pro — Operational Platform',
                  'LUME-Auto — Diagnostic Organism',
                  'Trust Layer — Commercial Verification',
                  'Technical Foundation',
                  'Implementation Path',
                  'Academic Foundation & References',
                  'About DarkWave Studios LLC',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)', counterIncrement: 'toc' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, minWidth: '1.5rem' }}>{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* 1. Executive Summary */}
          <WpSection num={1} title="Executive Summary">
            <p>
              Manheim processes over 8 million vehicles annually across 76 locations. The infrastructure supporting these operations — built over 25 years — is a patchwork of legacy systems, vendor-locked databases, and manual processes that resist modernization.
            </p>
            <p>
              DarkWave Studios has built a complete infrastructure modernization platform that addresses this challenge without requiring Manheim to replace, migrate, or shut down any existing system. The platform operates as a governance and intelligence layer that wraps around existing infrastructure, adding deterministic auditability, cryptographic provenance, and real-time diagnostics.
            </p>
            <p>The platform consists of five independently operable components:</p>
            <ul>
              <li><strong>LUME-V</strong> — A deterministic governance wrapper that modernizes legacy behavior without altering source code</li>
              <li><strong>Cox Automotive Ledger (CAL)</strong> — A private, permissioned cryptographic ledger for enterprise-grade auditability</li>
              <li><strong>Lot Ops Pro</strong> — A real-time operational platform for vehicle custody, driver management, and workflow orchestration</li>
              <li><strong>LUME-Auto</strong> — An OBD-II diagnostic organism that produces cryptographically verifiable condition reports in 45 seconds</li>
              <li><strong>Trust Layer</strong> — A commercial verification system that issues publicly verifiable certificates from internal CAL records</li>
            </ul>
            <p>
              Each component is designed to operate independently and deliver measurable value on its own. When deployed together, they form a unified intelligence layer that gives Manheim capabilities that do not exist anywhere else in automotive wholesale.
            </p>
          </WpSection>

          {/* 2. The Modernization Challenge */}
          <WpSection num={2} title="The Modernization Challenge">
            <p>
              Enterprise legacy modernization is one of the most consistently failed initiatives in corporate IT. The pattern is well-documented: multi-year timelines, hundreds of millions in budget, massive organizational disruption — and a high probability of failure or partial delivery.
            </p>
            <p>Manheim's operational infrastructure faces five specific constraints that make traditional modernization approaches impractical:</p>
            <ul>
              <li><strong>Too expensive to rebuild</strong> — The cost of replacing 25 years of accumulated business logic exceeds any reasonable capital allocation</li>
              <li><strong>Too risky to replace</strong> — Production systems processing $100B+ annually cannot tolerate downtime or migration failures</li>
              <li><strong>Too slow to migrate</strong> — Traditional rip-and-replace projects take 3-7 years, during which the competitive landscape continues to evolve</li>
              <li><strong>Too disruptive to retrain</strong> — Thousands of employees across 76 locations would need simultaneous retraining on new systems</li>
              <li><strong>Too fragmented to unify</strong> — Decades of vendor-specific integrations have created data silos that resist centralization</li>
            </ul>
            <p>
              The platform described in this document takes a fundamentally different approach. Rather than replacing existing systems, it wraps them in a deterministic governance layer that adds modern capabilities — auditability, cryptographic provenance, real-time intelligence — without touching the underlying infrastructure.
            </p>
          </WpSection>

          {/* 3. Platform Architecture */}
          <WpSection num={3} title="Platform Architecture Overview">
            <p>
              The platform follows a layered architecture where each component operates at a different level of the stack but communicates through deterministic interfaces:
            </p>
            <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Layer</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Component</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--accent-cyan)', fontWeight: 600 }}>Function</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Governance', 'LUME-V', 'Deterministic wrapper over legacy systems'],
                    ['Trust', 'CAL', 'Private cryptographic ledger for operational records'],
                    ['Operations', 'Lot Ops Pro', 'Workforce, custody, and workflow management'],
                    ['Diagnostics', 'LUME-Auto', 'OBD-II vehicle intelligence and condition reporting'],
                    ['Verification', 'Trust Layer', 'Commercial-facing certificate issuance'],
                    ['Runtime', 'Lume Language', 'Deterministic programming substrate'],
                  ].map(([layer, component, fn], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{layer}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600 }}>{component}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{fn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              The architecture is modular by design. Each layer can be deployed independently, and each produces value on its own. However, the full power of the system emerges when layers interact — LUME-Auto feeds diagnostic data through LUME-V governance, which anchors results on CAL, which issues Trust Layer certificates, all while Lot Ops Pro orchestrates the physical operations that produce these events.
            </p>
          </WpSection>

          {/* 4. LUME-V */}
          <WpSection num={4} title="LUME-V — Deterministic Governance Wrapper">
            <p>
              LUME-V is the modernization engine that makes the entire platform possible without requiring a rip-and-replace migration. It sits between Manheim's existing systems and the governance layer — preserving every database, every workflow, every integration that already works.
            </p>
            <h4>How It Works</h4>
            <p>
              LUME-V wraps legacy system behavior in deterministic governance envelopes. This means existing applications continue to function exactly as they do today, but their inputs, outputs, and state transitions are now cryptographically tracked, verifiable, and auditable.
            </p>
            <ul>
              <li>Wraps existing systems without modifying source code</li>
              <li>Unifies fragmented logic into a single governance model</li>
              <li>Provides deterministic replay for any historical event</li>
              <li>Requires zero downtime and zero database migration</li>
              <li>Operates across any legacy enterprise stack</li>
            </ul>
            <h4>Strategic Significance</h4>
            <p>
              LUME-V is not automotive-specific. It is a general-purpose deterministic governance layer that can modernize any legacy enterprise stack — healthcare, logistics, energy, financial services. For Manheim, it provides the specific capability of modernizing 25 years of operational infrastructure without the traditional cost, risk, and disruption of platform replacement.
            </p>
          </WpSection>

          {/* 5. CAL */}
          <WpSection num={5} title="Cox Automotive Ledger (CAL)">
            <p>
              The Cox Automotive Ledger is a private, permissioned Proof-of-Authority cryptographic ledger built exclusively for the Cox Automotive ecosystem. It provides the tamper-proof operational truth layer that anchors the entire platform.
            </p>
            <h4>Why a Private Ledger</h4>
            <p>
              Public distributed ledgers are designed for trustless environments where participants do not know or trust each other. Cox Automotive is not a trustless environment — it is a known network of verified facilities, employees, and systems. A private ledger delivers the same immutability and auditability guarantees without the latency, transaction costs, or data exposure of public networks.
            </p>
            <h4>What CAL Records</h4>
            <ul>
              <li><strong>Vehicle custody transitions</strong> — every handoff from intake to lot to lane to transport</li>
              <li><strong>Condition certificates</strong> — OBD-II scan results sealed at the moment of diagnosis</li>
              <li><strong>Governance decisions</strong> — LUME-V workflow verifications anchored immutably</li>
              <li><strong>Arbitration evidence</strong> — deterministic replay data for dispute resolution</li>
            </ul>
            <h4>Enterprise Scalability</h4>
            <p>
              CAL is not limited to Manheim. The same infrastructure can extend across the entire Cox Automotive portfolio — Autotrader, Kelley Blue Book, Dealer.com, NextGear Capital — providing a unified, cryptographically verified data layer wherever vehicles are bought, sold, serviced, or financed.
            </p>
          </WpSection>

          {/* 6. Lot Ops Pro */}
          <WpSection num={6} title="Lot Ops Pro — Operational Platform">
            <p>
              Lot Ops Pro is the real-time operational platform that manages the physical side of Manheim's business: vehicle custody, driver assignments, lane routing, and workforce coordination.
            </p>
            <ul>
              <li><strong>Custody chain management</strong> — Track every vehicle from intake through sale with signed, timestamped transitions</li>
              <li><strong>Intelligent routing</strong> — Health data feeds directly into lane assignment and reconditioning queues</li>
              <li><strong>Driver coordination</strong> — GPS-based move assignments with real-time status updates</li>
              <li><strong>Supervisor dashboards</strong> — Population-level views of fleet health, worker productivity, and operational throughput</li>
            </ul>
            <p>
              Lot Ops Pro integrates with LUME-Auto for diagnostic data, CAL for custody verification, and LUME-V for governance enforcement — but operates independently as a standalone workforce platform.
            </p>
          </WpSection>

          {/* 7. LUME-Auto */}
          <WpSection num={7} title="LUME-Auto — Diagnostic Organism">
            <p>
              LUME-Auto is a 42-node synthetic organism that processes real-time OBD-II telemetry to produce structured, deterministic vehicle condition reports. It is deployed via a custom ESP32-S3 dongle with a bill of materials under $13.
            </p>
            <h4>Technical Specifications</h4>
            <ul>
              <li>Dual-core Xtensa LX7 @ 240MHz with WiFi and BLE 5.0</li>
              <li>Passive CAN bus interface via MCP2515 + TJA1050</li>
              <li>42 real-time signals: RPM, MAP, MAF, fuel trims, O2 sensors, coolant, intake air, and more</li>
              <li>45-second scan produces a complete structured condition report</li>
              <li>Deterministic processing — same inputs always produce the same output</li>
              <li>Cryptographically signed results anchored to CAL</li>
            </ul>
            <h4>Operational Impact</h4>
            <p>
              A single LUME-Auto scan replaces a manual inspection that currently costs $150-400 at a dealership. At Manheim's scale of 8 million vehicles annually, even partial deployment eliminates significant diagnostic overhead while producing higher-quality, verifiable data.
            </p>
          </WpSection>

          {/* 8. Trust Layer */}
          <WpSection num={8} title="Trust Layer — Commercial Verification">
            <p>
              The Trust Layer is the outward-facing verification system that turns internal CAL records into commercially provable certificates. It gives buyers, dealers, and financing partners cryptographic confidence in a vehicle's condition and history.
            </p>
            <ul>
              <li><strong>Verifiable certificates</strong> — Any party can confirm a vehicle's condition report authenticity via hash lookup</li>
              <li><strong>Provenance without exposure</strong> — Proves when, where, and how a vehicle was scanned without revealing internal operational data</li>
              <li><strong>Cross-platform portability</strong> — Certificates travel with the vehicle across Autotrader listings, DMS systems, and financing platforms</li>
            </ul>
            <p>
              The Trust Layer is architecturally distinct from CAL. CAL is the private internal ledger that Cox controls. The Trust Layer is the commercial-facing verification layer that issues publicly confirmable certificates derived from CAL records — without exposing the internal ledger.
            </p>
          </WpSection>

          {/* 9. Technical Foundation */}
          <WpSection num={9} title="Technical Foundation">
            <h4>The Lume Programming Language</h4>
            <p>
              The entire platform is built on Lume, a deterministic programming language designed for governance-critical systems. Lume guarantees that given the same inputs, the same program will always produce the same output — regardless of when, where, or how many times it runs.
            </p>
            <p>
              This determinism is what makes the platform's audit and replay capabilities possible. It is not a property added after the fact — it is a mathematical guarantee enforced at the language level.
            </p>
            <h4>Synthetic Organisms</h4>
            <p>
              The platform's processing units are not traditional software modules. They are synthetic organisms — self-governing, self-healing networks of nodes that process data through cross-validation consensus. The LUME-Auto diagnostic organism, for example, consists of 42 nodes that must reach consensus before producing a condition report.
            </p>
            <p>
              Organisms automatically detect and correct drift, enforce safety envelopes, and maintain deterministic behavior without human intervention. This architecture eliminates entire categories of software failure modes that plague traditional enterprise systems.
            </p>
          </WpSection>

          {/* 10. Implementation */}
          <WpSection num={10} title="Implementation Path">
            <p>
              Deployment follows a phased approach designed for zero disruption to existing operations. Each phase is independently valuable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { phase: 'Phase 1 — Weeks 1-4', title: 'Hardware Deployment & Baseline', desc: 'Deploy OBD-II dongles to pilot facility. Establish baseline telemetry. Validate scan accuracy against existing condition reports.' },
                { phase: 'Phase 2 — Weeks 4-8', title: 'CAL Integration & Governance', desc: 'Activate ledger validators. Begin anchoring condition certificates. Deploy LUME-V governance wrapper over existing workflows.' },
                { phase: 'Phase 3 — Weeks 8-12', title: 'Lot Ops Pro & Operational Integration', desc: 'Integrate telemetry into routing. Deploy supervisor dashboards. Enable driver GPS assignments from health-based routing.' },
                { phase: 'Phase 4 — Weeks 12-16', title: 'Trust Layer & Multi-Facility Expansion', desc: 'Issue public verification certificates. Expand to additional Manheim locations. Enable cross-facility custody continuity.' },
              ].map((p, i) => (
                <div key={i} style={{ padding: '1rem 1.25rem', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{p.phase}</div>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{p.title}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              ))}
            </div>
            <p>
              The platform is modular by design. Each layer operates independently, allowing Manheim to begin with the components that address immediate operational needs and integrate additional layers over time.
            </p>
          </WpSection>

          {/* 11. Academic */}
          <WpSection num={11} title="Academic Foundation & References">
            <p>
              The platform is built on published research available through Zenodo. The following papers document the core technologies:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { title: 'Lume: A Deterministic Programming Language for Governance-Critical Systems', doi: '10.5281/zenodo.19382282', desc: 'The core language specification — deterministic execution, formal verification, organism architecture.' },
                { title: 'Lume-V: Deterministic Governance Wrapper for Legacy Enterprise Modernization', doi: '10.5281/zenodo.19645097', desc: 'The governance layer — wrapping legacy systems without modification.' },
                { title: 'DAIGS: Deterministic AI Governance System', doi: '10.5281/zenodo.19491784', desc: 'AI governance within deterministic constraints — organism-level intelligence.' },
                { title: 'The Routed World: Meridian Architecture for Deterministic Energy Systems', doi: '10.5281/zenodo.20028362', desc: 'Future energy layer — wireless power distribution for autonomous facility operations.' },
              ].map((paper, i) => (
                <div key={i} style={{ padding: '1rem 1.25rem', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.95rem' }}>{paper.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{paper.desc}</div>
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    DOI: {paper.doi} <ExternalLink size={10} />
                  </a>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)' }}>
              All research is published and publicly accessible. Additional papers covering DAIGS v2, DAIGS v3, Lume-X, and the Deterministic Synthetic Organism specification are in preparation.
            </p>
          </WpSection>

          {/* 12. About */}
          <WpSection num={12} title="About DarkWave Studios LLC">
            <p>
              DarkWave Studios LLC is the research and engineering organization behind the Lume ecosystem. Founded on the principle that enterprise infrastructure should be deterministic, auditable, and mathematically provable, DarkWave develops the languages, runtimes, governance systems, and hardware that make this vision operational.
            </p>
            <p>
              The technologies described in this document are not concepts or proposals. They are built, tested, and deployed systems — the hardware is manufactured, the ledger is live, the organisms are running, and the platform is production-ready.
            </p>
            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                DarkWave Studios LLC<br />
                US Provisional Patent 64/032,339<br />
                <a href="https://lumeauto.tech" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>lumeauto.tech</a> · <a href="https://cal.tlid.io" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>cal.tlid.io</a>
              </p>
            </div>
          </WpSection>

          {/* Footer spacer */}
          <div style={{ height: '4rem' }} />
        </div>
      </section>
    </>
  );
}

/* Reusable section wrapper */
function WpSection({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div {...f} className="wp-section" style={{ padding: '3rem 0', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{String(num).padStart(2, '0')}</span>
        <h2 style={{ fontSize: '1.6rem', lineHeight: 1.2 }}>{title}</h2>
      </div>
      <div style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)' }} className="wp-body">
        <style>{`
          .wp-body p { margin-bottom: 1rem; }
          .wp-body ul { padding-left: 1.5rem; margin-bottom: 1rem; }
          .wp-body li { margin-bottom: 0.5rem; }
          .wp-body h4 { color: var(--text-main); font-size: 1.1rem; margin: 1.5rem 0 0.75rem; }
          .wp-body strong { color: var(--text-main); }
        `}</style>
        {children}
      </div>
    </motion.div>
  );
}
