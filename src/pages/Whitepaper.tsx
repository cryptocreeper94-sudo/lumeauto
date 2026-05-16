import { motion } from 'framer-motion';
import { FileDown, Activity, ExternalLink, Download } from 'lucide-react';

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
                  'Technical Foundation — Lume Core & Self-Healing Runtime',
                  'Meridian — Wireless Energy Infrastructure',
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
              Manheim processes over 8 million vehicles annually across 76 locations. The infrastructure supporting these operations — built and refined over 25 years — represents one of the most complex operational systems in automotive wholesale. Modernizing systems at this scale without disrupting daily operations is a challenge that has historically eluded the industry.
            </p>
            <p>
              DarkWave Studios has built a complete infrastructure modernization platform that addresses this challenge without requiring Manheim to replace, migrate, or shut down any existing system. The platform operates as a governance and intelligence layer that wraps around existing infrastructure, adding deterministic auditability, cryptographic provenance, and real-time diagnostics.
            </p>
            <p>The platform consists of five independently operable components:</p>
            <ul>
              <li><strong>LUME-V</strong> — A deterministic governance wrapper that modernizes legacy behavior without altering source code</li>
              <li><strong>Cox Automotive Ledger (CAL)</strong> — A private, permissioned cryptographic ledger for enterprise-grade auditability</li>
              <li><strong>Lot Ops Pro</strong> — A real-time operational platform for vehicle custody, driver management, and workflow orchestration</li>
              <li><strong>LUME-Auto</strong> — A full OBD-II diagnostic scanner and governance organism. Reads and clears trouble codes, captures freeze frame data, auto-reads VINs from the ECU, and produces cryptographically verifiable condition reports in 45 seconds. Supports both Bluetooth and WiFi adapters.</li>
              <li><strong>Trust Layer</strong> — A commercial verification system that issues publicly verifiable certificates from internal CAL records</li>
            </ul>
            <p>
              Each component is designed to operate independently and deliver measurable value on its own. When deployed together, they form a unified intelligence layer that gives Manheim capabilities that do not exist anywhere else in automotive wholesale.
            </p>
          </WpSection>

          {/* 2. The Modernization Challenge */}
          <WpSection num={2} title="The Modernization Challenge">
            <p>
              Enterprise legacy modernization is one of the most challenging initiatives in corporate IT. The pattern is well-documented across every industry: multi-year timelines, significant budget requirements, organizational complexity — and outcomes that frequently fall short of expectations.
            </p>
            <p>Manheim's operational infrastructure faces five specific constraints that make traditional modernization approaches impractical — not because of any shortcoming in the existing systems, but because of the inherent challenges of operating at this scale:</p>
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
              <li><strong>Workforce events</strong> — time entries, performance records, and payroll-affecting changes</li>
            </ul>
            <h4>Data Privacy Architecture</h4>
            <p>
              CAL follows a strict separation between <strong>what is hashed</strong> and <strong>what is stored</strong>. No sensitive corporate data — employee PII, compensation details, internal pricing, or competitive intelligence — is written to the ledger in cleartext. The ledger stores cryptographic hashes (SHA-256 fingerprints) and structured metadata pointers. The underlying records remain in Cox-controlled databases behind existing access control policies.
            </p>
            <p>
              This means CAL provides tamper-proof verification without data exposure:
            </p>
            <ul>
              <li><strong>Verified but private</strong> — any authorized party can confirm a record hasn't been altered, but cannot read the record itself without proper access</li>
              <li><strong>Separation of proof and data</strong> — the hash proves integrity; the source database stores content. If the source is modified after anchoring, the hash mismatch is detectable.</li>
              <li><strong>Permissioned read access</strong> — facility managers see their facility. Corporate sees the aggregate. Employees see only records that affect them. The ledger enforces the same access hierarchy that already exists — it does not create new visibility into data that was previously restricted.</li>
              <li><strong>Zero external exposure</strong> — nothing on CAL is accessible outside the Cox network. The Trust Layer, if enabled, issues verification certificates from CAL data — but the certificates contain only what Cox chooses to make verifiable. The underlying data never leaves the private network.</li>
            </ul>
            <h4>Employee Hash Receipts</h4>
            <p>
              Every record on CAL that affects an individual employee generates a cryptographic receipt delivered to that employee. When a timecard is edited, a pay adjustment is processed, a performance review is filed, or a safety incident is logged — the employee receives the SHA-256 hash of the record as it was anchored. This gives every worker in the organization a personal, independently verifiable proof that their records have not been altered after the fact.
            </p>
            <p>
              This is not a transparency feature — it is a trust feature. Employees do not see anyone else's data. They see only the cryptographic proof that <em>their</em> records are intact. If a timecard entry is modified after anchoring, the employee's receipt hash will not match the current record — making unauthorized changes provably detectable. This creates a zero-trust audit trail that protects both the organization and its workforce.
            </p>
            <h4>Enterprise Scalability</h4>
            <p>
              CAL is not limited to Manheim. The same infrastructure can extend across the entire Cox Automotive portfolio — Autotrader, Kelley Blue Book, Dealer.com, NextGear Capital — providing a unified, cryptographically verified data layer wherever vehicles are bought, sold, serviced, or financed.
            </p>
          </WpSection>

          {/* 6. Lot Ops Pro */}
          <WpSection num={6} title="Lot Ops Pro — Operational Platform">
            <p>
              Lot Ops Pro is the real-time operational platform that manages the physical side of Manheim's business. It is a mobile-first autonomous lot management system — multi-tenant by design, offline-capable, and deployable on commodity hardware. The software is complete and ready for field validation at a pilot facility.
            </p>
            <h4>Core Capabilities</h4>
            <ul>
              <li><strong>Autonomous OCR scanning</strong> — Camera-based ticket scanning with three input methods. No external database dependency. Works offline.</li>
              <li><strong>GPS routing and navigation</strong> — Real-time compass guidance with distance countdown. Smart group code routing to correct lanes.</li>
              <li><strong>Live performance tracking</strong> — Moves-per-hour against configurable quotas. Daily, weekly, and monthly aggregation. Automated bonus estimation.</li>
              <li><strong>Safety and speed monitoring</strong> — Tiered speed alerts (15/17/22 MPH). Incident reporting with photo capture. Weather radar with severe weather alerts.</li>
              <li><strong>Role-based dashboards</strong> — Ops Manager, Supervisor, Van Driver, and Inventory Driver each see exactly what they need.</li>
              <li><strong>Real-time messaging</strong> — Supervisor-to-driver communication. Broadcast or individual. 2-second polling with toast notifications.</li>
              <li><strong>AI voice assistant</strong> — Bidirectional voice commands for hands-free operation. 15+ supported commands with speech pattern learning.</li>
            </ul>
            <h4>Architecture Advantages</h4>
            <ul>
              <li><strong>Zero hardware investment</strong> — BYOD or provide a commodity Android device. Runs as a PWA — installable, offline-capable. No scanners, no specialized equipment.</li>
              <li><strong>Multi-tenant by design</strong> — Every facility gets its own isolated environment, branding, and configuration from a single deployment.</li>
              <li><strong>300+ facility scalability</strong> — Nashville first. Atlanta next. The architecture supports every Manheim location from a single codebase.</li>
            </ul>
            <p>
              Lot Ops Pro integrates with LUME-Auto for diagnostic data, CAL for custody verification, and LUME-V for governance enforcement — but operates independently as a standalone workforce platform with zero dependency on any other component.
            </p>
          </WpSection>

          {/* 7. LUME-Auto */}
          <WpSection num={7} title="LUME-Auto — Diagnostic Organism">
            <p>
              LUME-Auto is a 42-node synthetic organism that processes real-time OBD-II telemetry to produce structured, deterministic vehicle condition reports. It represents the diagnostic intelligence layer of the platform — the system that turns raw vehicle data into cryptographically verifiable condition certificates.
            </p>
            <h4>Technical Specifications</h4>
            <ul>
              <li>42 real-time signals ingested at 100ms intervals: RPM, MAP, MAF, fuel trims (short and long term), O2 sensors, coolant temp, intake air temp, timing advance, catalyst efficiency, battery voltage, engine hours, and more</li>
              <li>45-second scan produces a complete structured condition report</li>
              <li>60% of the condition report is auto-generated from sensor data before a human inspector touches the vehicle</li>
              <li>Deterministic processing — same inputs always produce the same output on any device</li>
              <li>Cryptographically signed results anchored to CAL at the moment of diagnosis</li>
              <li>Zero AI dependencies — 42 deterministic test cases passed with zero inference calls</li>
            </ul>
            <h4>Full OBD-II Scanner Capabilities</h4>
            <p>
              Beyond telemetry monitoring, LUME-Auto is a complete OBD-II scanner that matches or exceeds the capabilities of dedicated scan tools:
            </p>
            <ul>
              <li><strong>Read Stored DTCs (Mode 03)</strong> — Read all diagnostic trouble codes with severity classification and system categorization (Powertrain, Body, Chassis, Network)</li>
              <li><strong>Clear Codes + MIL Reset (Mode 04)</strong> — Clear all stored trouble codes, freeze frame data, and reset the Malfunction Indicator Lamp (Check Engine Light). Also resets readiness monitors.</li>
              <li><strong>Pending DTCs (Mode 07)</strong> — Detect intermittent faults that haven't yet triggered the MIL. Critical for pre-lane screening — catches faults before they become buyer issues.</li>
              <li><strong>Freeze Frame Data (Mode 02)</strong> — Capture the exact engine state (RPM, speed, coolant, load, fuel trims) at the moment a DTC was stored. Enables root-cause analysis without live reproduction.</li>
              <li><strong>VIN Auto-Read (Mode 09)</strong> — Read the Vehicle Identification Number directly from the ECU. Eliminates manual entry errors and provides cryptographic proof that the scan matches the physical vehicle.</li>
              <li><strong>8 Readiness Monitors (Mode 01)</strong> — Full emissions readiness status for all eight OBD-II monitors. Pass/fail status for state inspections and auction lane qualification.</li>
              <li><strong>CSV Telemetry Export</strong> — Download full telemetry session data as CSV for fleet-level analytics, audit trails, and third-party integrations.</li>
            </ul>
            <h4>Dual-Connectivity Architecture</h4>
            <p>
              The platform supports both Bluetooth Low Energy (BLE) and WiFi OBD-II adapters. The web application (PWA) supports BLE via the Web Bluetooth API. The native Android application (APK) supports both BLE and direct WiFi TCP connections, enabling deployment on field tablets and fleet devices that use WiFi-based adapters. Both interfaces share the same 42-node governance engine — the transport layer is abstracted; the diagnostic output is identical.
            </p>
            <h4>Hardware Strategy</h4>
            <p>
              The platform uses commodity ELM327-compatible OBD-II adapters — the same adapters mechanics already own. Zero proprietary hardware required. Zero capital investment to begin evaluation.
            </p>
            <p>
              At fleet scale, commodity adapters present three architectural constraints: no device identity (any adapter looks the same to the network), no firmware governance (no way to version, update, or control behavior across devices), and no secure gateway compliance (2018+ vehicles with gateway modules block commodity ELM327 communication entirely).
            </p>
            <p>
              The Lume Dongle ($13 BOM, ESP32-S3 based) is designed as the production-grade endpoint that addresses each constraint. It supports WiFi + BT Classic + BLE simultaneously, performs passive CAN bus sniffing (zero discovery latency), includes a Ghost Mode secure gateway bypass for 2018+ vehicles, and accepts OTA firmware updates. Each device carries a unique fleet identity, enabling per-device telemetry attribution, firmware channel management, and deployment-specific configuration.
            </p>
            <p>
              The hardware abstraction layer is architecturally modular — the branding layer, firmware channel, and fleet management interface are configurable per deployment. The same physical hardware supports independent identity configurations without hardware modification. This architectural decision was made to ensure the platform is deployable across multiple operational contexts without per-deployment hardware redesign.
            </p>
            <h4>Lot Flow Intelligence</h4>
            <p>
              Beyond individual vehicle diagnostics, LUME-Auto provides facility-wide operational intelligence:
            </p>
            <ul>
              <li><strong>Dead-battery detection</strong> — Vehicles that won't start are identified before they reach a lane or transport</li>
              <li><strong>Cold-start and open-loop detection</strong> — Flags vehicles still in warm-up phase to prevent false diagnostic readings</li>
              <li><strong>Pending fault detection</strong> — Catches faults that haven't triggered a check engine light but will affect auction lane readiness</li>
              <li><strong>Prioritized reconditioning queues</strong> — Auto-generated work orders sorted by severity: catalyst failures, emissions faults, fluid anomalies</li>
              <li><strong>Pre-dispatch health reports</strong> — Transport teams see vehicle health before loading, eliminating no-start surprises at delivery</li>
              <li><strong>Predictive throughput modeling</strong> — Population-level analytics that predict lane capacity and reconditioning volume</li>
            </ul>
            <h4>Arbitration Reduction</h4>
            <p>
              Deterministic health scoring complements inspector expertise by adding a sensor-verified, reproducible data layer to every assessment. Buyers receive transparent condition data with cryptographic proof of when and how the scan was conducted. Post-sale disputes gain a new resolution path: deterministic replay of the original scan data provides objective evidence alongside the inspector's professional judgment.
            </p>
          </WpSection>

          {/* 8. Trust Layer */}
          <WpSection num={8} title="Trust Layer — Commercial Verification">
            <p>
              The Trust Layer is the outward-facing verification system that turns internal CAL records into commercially provable certificates. It gives buyers, dealers, and financing partners cryptographic confidence in a vehicle's condition and history — without requiring access to the internal ledger.
            </p>
            <h4>Capabilities</h4>
            <ul>
              <li><strong>Verifiable certificates</strong> — Any party can confirm a vehicle's condition report authenticity via hash lookup. No login, no account, no API integration required.</li>
              <li><strong>Provenance without exposure</strong> — Proves when, where, and how a vehicle was scanned without revealing internal operational data, facility workflows, or proprietary diagnostics.</li>
              <li><strong>Cross-platform portability</strong> — Certificates travel with the vehicle across Autotrader listings, dealer management systems, and financing platforms. The verification is attached to the vehicle, not the system.</li>
            </ul>
            <h4>Chain of Trust</h4>
            <p>
              Every certificate follows a provable chain: OBD-II Scan → Organism Processing → CAL Anchor → Trust Layer Certificate → Public Verification. Each step is cryptographically linked to the previous one. There are no gaps in provenance, no manual steps, and no opportunity for data to be altered between capture and certificate issuance.
            </p>
            <h4>Architectural Distinction</h4>
            <p>
              The Trust Layer is architecturally distinct from CAL. CAL is the private, internal operational ledger that Cox controls — it records everything but exposes nothing. The Trust Layer is the commercial-facing verification layer that issues publicly confirmable certificates derived from CAL records. This separation ensures that Cox maintains full control over its operational data while still providing commercially useful verification to external parties.
            </p>
          </WpSection>

          {/* 9. Technical Foundation */}
          <WpSection num={9} title="Technical Foundation — Lume Core & Self-Healing Runtime">
            <p>
              Every capability described in this document — the governance layer, the ledger, the diagnostics, the verification chain — is built on a single foundational technology: the Lume programming language and its self-healing deterministic runtime. This section documents the core intellectual property that makes the platform possible and, critically, difficult to replicate.
            </p>

            <h4>The Lume Programming Language</h4>
            <p>
              Lume is a purpose-built deterministic programming language designed for governance-critical systems. Unlike general-purpose languages (Python, Java, C++) that allow non-deterministic behavior by default, Lume enforces determinism at the compiler level. This means:
            </p>
            <ul>
              <li>Given the same inputs, a Lume program will <strong>always</strong> produce the same output — regardless of when, where, or on what hardware it runs</li>
              <li>There is no randomness, no floating-point ambiguity, no race conditions, no undefined behavior</li>
              <li>Every execution path is formally bounded and provably terminates</li>
              <li>The language compiles to governance organisms, not traditional executables</li>
            </ul>
            <p>
              This is not a feature added after the fact. Determinism is a mathematical property of the language itself — enforced by the compiler, guaranteed by the type system, and verified at runtime.
            </p>

            <h4>Synthetic Organisms</h4>
            <p>
              The platform's processing units are not traditional software modules, services, or functions. They are synthetic organisms — autonomous, self-governing networks of nodes that process data through cross-validation consensus.
            </p>
            <p>
              The LUME-Auto diagnostic organism, for example, consists of 42 nodes. Each node monitors a specific domain of vehicle telemetry (fuel system, ignition, emissions, electrical) and cross-validates its readings against adjacent nodes. A condition report is only produced when the organism reaches internal consensus — not when a single algorithm produces a score.
            </p>
            <p>
              This architecture eliminates entire categories of failure modes: a single corrupted sensor reading cannot propagate through the system because adjacent nodes detect the inconsistency and flag it before it reaches output.
            </p>

            <h4>Self-Healing Runtime</h4>
            <p>
              The most distinctive property of the Lume runtime is self-healing. Traditional software degrades over time: configurations drift, edge cases accumulate, dependencies break. The Lume runtime detects and corrects these deviations autonomously.
            </p>
            <ul>
              <li><strong>Drift detection</strong> — When a node's output begins to deviate from its expected behavioral envelope, the organism detects it in real time</li>
              <li><strong>Autonomous correction</strong> — The organism corrects the drifting node by re-anchoring it to the consensus state of its neighbors — no manual intervention, no retraining, no redeployment</li>
              <li><strong>Safety envelopes</strong> — Every organism runs inside formal safety bounds. If sensor data violates the envelope, the organism flags the anomaly rather than guessing. It never extrapolates beyond proven territory</li>
              <li><strong>No retraining cycle</strong> — Unlike ML models that require periodic retraining as data distributions shift, organisms maintain correct behavior through structural self-correction</li>
            </ul>

            <h4>The 4/42 Fractal Architecture</h4>
            <p>
              All Lume organisms share a structural signature: 4 layers of 42 nodes. This ratio is not arbitrary — it emerges from the mathematics of deterministic consensus in bounded systems. The same architecture that governs a vehicle diagnostic organism governs LUME-V's enterprise wrapper, CAL's validator consensus, and Meridian's future energy routing.
            </p>
            <p>
              This fractal consistency means the platform scales by replicating a proven architecture rather than building new systems from scratch. A Lot Ops Pro deployment uses the same organism structure as a LUME-Auto scan — just configured for a different domain.
            </p>

            <h4>Edge-Native Execution</h4>
            <p>
              Lume organisms run on the device. There is no cloud dependency in the critical path. A complete vehicle diagnosis executes in 45 seconds on a phone connected to a commodity OBD-II dongle — no internet connection required, no API latency, no server costs. The cloud is used for anchoring results to CAL and issuing Trust Layer certificates, but the intelligence itself is fully edge-native.
            </p>

            <h4>Deterministic Replay</h4>
            <p>
              Because Lume programs are deterministic, any historical result can be independently verified. Feed the original sensor data through the same organism version, and you get the identical output — bit for bit, years later, on different hardware. This is the foundation of the platform's arbitration defense: disputes are resolved by mathematical replay, not by opinion.
            </p>

            <h4>Voice-to-Code Authoring</h4>
            <p>
              Lume's syntax is designed to mirror natural English structure. The language supports native voice-to-code authoring — engineers and operators can define organisms, declare governance nodes, set safety envelopes, and compile deployable systems entirely by speaking. The compiler does not interpret intent or infer meaning; it parses deterministic structure from spoken input. The same spoken instruction produces the same compiled organism every time. This is not an AI code assistant — it is a voice-native compiler interface built into the language specification.
            </p>

            <h4>Why This Matters Strategically</h4>
            <p>
              The Lume runtime is not a configuration layer on top of existing technology. It is a new computational substrate — a fundamentally different approach to enterprise software that prioritizes provability over flexibility and correctness over speed-to-market. It cannot be replicated by configuring existing tools differently. It is the intellectual property that makes everything else in this platform defensible.
            </p>
          </WpSection>

          {/* 10. Meridian */}
          <WpSection num={10} title="Meridian — Wireless Energy Infrastructure (Roadmap)">
            <p>
              Meridian is the next-phase energy layer of the platform — a deterministic wireless energy routing system designed for deployment after the diagnostic and operational layers are proven in production. The architecture is fully documented in published research and covered by US Provisional Patent 64/056,378. This section describes the planned system.
            </p>
            <h4>The EV Charging Challenge</h4>
            <p>
              As Manheim's vehicle mix shifts toward electric, existing charging infrastructure creates operational friction: ground-level chargers obstruct lot flow, adapter compatibility varies by manufacturer, charging time competes with auction throughput, and energy costs are difficult to attribute to individual vehicles.
            </p>
            <h4>How Meridian Works</h4>
            <p>
              Overhead anchor nodes deliver wireless energy to vehicles on the lot. There are no ground-level chargers, no cables, and no adapters. Vehicles charge passively while parked, while waiting for auction, or while in transit between lanes. The energy routing is adapter-agnostic by design — any EV receives power regardless of connector standard.
            </p>
            <ul>
              <li><strong>Wireless energy routing</strong> — Overhead anchor nodes deliver power to specific zones or individual vehicles based on demand</li>
              <li><strong>Adapter-agnostic</strong> — No cables, no connector compatibility issues. Energy is delivered to the vehicle, not to a plug</li>
              <li><strong>Passive charging</strong> — Vehicles charge while parked or waiting. No dedicated charging time, no queuing</li>
              <li><strong>Cryptographic metering</strong> — Every watt delivered is timestamped and anchored to CAL. Billing is deterministic and auditable</li>
            </ul>
            <h4>Beyond Vehicles — Powered Lot Infrastructure</h4>
            <p>
              The same energy routing architecture that charges vehicles can power any infrastructure on the lot:
            </p>
            <ul>
              <li><strong>Mobile lane signage</strong> — Illuminated lane markers and directional signs powered wirelessly. Relocate them when the lot layout changes without running new electrical.</li>
              <li><strong>Night lighting</strong> — Portable, repositionable lighting for evening auctions, security zones, and staging areas</li>
              <li><strong>Digital signage</strong> — Wireless-powered displays for auction information, vehicle details, and real-time pricing at the lane</li>
              <li><strong>IoT sensors</strong> — Environmental monitoring, occupancy detection, and security cameras powered without wiring</li>
            </ul>
            <h4>Platform Integration</h4>
            <p>
              Meridian is not a separate system. It runs on the same Lume runtime, uses the same 4/42 organism architecture, is governed by the same LUME-V wrapper, and anchors its records to the same CAL ledger. Energy routing is deterministic. Billing is cryptographically verified through the Trust Layer. Lot Ops Pro coordinates charging schedules with vehicle movement.
            </p>
            <p>
              The Meridian architecture is fully documented in published research (DOI: 10.5281/zenodo.20028362) and covered by US Provisional Patent 64/056,378. Meridian is the next deployment phase — the governance layer, the ledger, the trust layer, the runtime, and the diagnostic software are built and operational today.
            </p>
          </WpSection>

          {/* 11. Implementation */}
          <WpSection num={11} title="Implementation Path">
            <p>
              Deployment follows a phased approach designed for zero disruption to existing operations. Each phase is independently valuable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1.5rem 0' }}>
              {[
                { phase: 'Phase 1 — Weeks 1-4', title: 'Telemetry Capture & Baseline', desc: 'Deploy commodity ELM327 OBD-II adapters at pilot facility. Capture 42-signal telemetry from 500–1,000 vehicles. Generate automated condition reports. Validate scan accuracy against existing inspection reports.' },
                { phase: 'Phase 2 — Weeks 4-8', title: 'Lot Intelligence & Workflow Integration', desc: 'Enable real-time lane readiness dashboards. Activate dead-battery, cold-start, and pending-fault detection. Integrate transport pre-dispatch health reports and reconditioning work orders. Begin arbitration reduction tracking.' },
                { phase: 'Phase 3 — Weeks 8-12', title: 'CAL Integration & Trust Certificates', desc: 'Activate Cox Automotive Ledger validators. Anchor all condition certificates on-ledger with cryptographic proof. Deploy LUME-V governance wrapper. Issue Trust Layer certificates for buyer-facing verification.' },
                { phase: 'Phase 4 — Weeks 12-16', title: 'Network Intelligence & Multi-Facility', desc: 'Full-lot predictive throughput modeling and population health analytics. Cross-facility health scoring and benchmarking. Expand to additional Manheim locations with proven playbook.' },
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
            <h4>Enterprise Identity Integration</h4>
            <p>
              The platform's authentication layer is designed to integrate with any corporate identity provider. The current deployment uses a centralized SSO service, but the architecture supports direct integration with Azure Active Directory, Okta, SAML 2.0, OpenID Connect, or any enterprise identity system Cox Automotive already operates. Drivers, supervisors, and administrators sign in with the credentials they already use — no separate accounts, no additional password management, no IT provisioning overhead. This integration is a day-one deployment concern, not a future roadmap item.
            </p>
            <h4>Data Residency & Compliance</h4>
            <p>
              All platform data resides on infrastructure that Cox Automotive controls. The Cox Automotive Ledger is a private network — no data traverses public chains or third-party infrastructure. The platform architecture is designed for SOC 2 Type II, GDPR, and PCI DSS compliance readiness. Audit trails are cryptographically anchored and immutable. Data sovereignty is not a configuration option — it is a structural guarantee of the ledger architecture.
            </p>
            <h4>Uptime & Disaster Recovery</h4>
            <p>
              The platform supports multi-region failover with automated backups and deterministic state recovery. Because the Lume runtime is deterministic, disaster recovery is not probabilistic — given the same inputs and organism version, any node can reconstruct the identical state. Uptime commitments and SLA terms are defined during deployment planning based on Cox Automotive's operational requirements.
            </p>
            <h4>AI & LLM Usage</h4>
            <p>
              The platform includes an optional AI voice assistant for hands-free driver commands within Lot Ops Pro. This feature uses a large language model for natural language processing. It is explicitly non-critical — the entire platform operates fully without it. The voice layer is LLM-agnostic: it can connect to any provider (OpenAI, Anthropic, a self-hosted model, or Cox's own infrastructure), and it can be disabled entirely at the facility level. No core platform function — diagnostics, governance, ledger operations, custody tracking, or condition certification — depends on any external AI service. The deterministic stack is the platform. The LLM is a convenience layer.
            </p>
            <p>
              When the voice assistant is active, all LLM output passes through the same LUME-V deterministic governance wrapper that covers every other system component. The AI agent does not operate outside the safety envelope — its responses are validated, bounded, and auditable through the same 10-layer verification architecture documented in Section 2. This means the non-deterministic nature of the language model is contained by the deterministic runtime. The LLM can suggest; LUME-V decides what reaches the driver.
            </p>
          </WpSection>

          {/* 12. Academic */}
          <WpSection num={12} title="Academic Foundation & References">
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

          {/* 13. About */}
          <WpSection num={13} title="About DarkWave Studios LLC">
            <p>
              DarkWave Studios LLC is the research and engineering organization behind the Lume ecosystem. Founded on the principle that enterprise infrastructure should be deterministic, auditable, and mathematically provable, DarkWave develops the languages, runtimes, governance systems, and hardware that make this vision operational.
            </p>
            <p>
              The technologies described in this document are not concepts or proposals. They are built and tested systems — the ledger is live, the governance wrapper is deployed, the organisms are running, and the diagnostic software is complete. Lot Ops Pro and OBD-II dongle field connectivity are ready for pilot validation.
            </p>
            <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0 }}>
                DarkWave Studios LLC<br />
                US Provisional Patent 64/032,339<br />
                <a href="https://lumeauto.tech" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>lumeauto.tech</a> · <a href="https://cal.tlid.io" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>cal.tlid.io</a><br />
                <a href="mailto:team@dwsc.io" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>team@dwsc.io</a>
              </p>
            </div>
          </WpSection>

          {/* Footer spacer */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', padding: '2rem 0' }}>
            <a href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent-cyan)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
              <Activity size={16} /> Try It Live
            </a>
            <a href="/download" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--accent-emerald)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}>
              <Download size={16} /> Download App
            </a>
          </div>
          <div style={{ height: '2rem' }} />
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
