import { motion } from 'framer-motion';
import { ShieldCheck, Bot, Link2 } from 'lucide-react';

/**
 * PlainEnglish — A non-technical explainer positioned right after the Personal Note
 * and before the deep-dive sections. Addresses the two biggest corporate fears
 * (AI dependency and blockchain/crypto) head-on in plain language.
 *
 * DarkWave Studios LLC — Copyright 2026
 */
export default function PlainEnglish() {
  return (
    <section style={{ padding: '2rem 0 3rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1rem',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block' }} />
            Before I Go Further
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>
            What this is — and what it isn't.
          </h2>

          <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2rem' }}>
            <p>
              You're going to see a lot of technical detail below. Before you get into it, 
              here's the plain version of what this platform does and doesn't do.
            </p>
          </div>

          {/* Three cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* NOT AI */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(34,197,94,0.12)',
              borderRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(34,197,94,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={16} color="#22c55e" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>This is not an AI system.</span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                The core platform is rules-based software. It does exactly what you tell it to do, every time, the same way — like a calculator, not a chatbot. 
                There is an optional voice assistant for drivers (think Siri for the lot), but it can be turned off completely. 
                Nothing about diagnostics, vehicle records, custody tracking, or operations depends on AI in any way. 
                If every AI company on earth shut down tomorrow, this platform would still work exactly the same.
              </p>
            </div>

            {/* NOT CRYPTO */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(56,189,248,0.12)',
              borderRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(56,189,248,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Link2 size={16} color="#38bdf8" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>The ledgers are not public blockchains.</span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                When I say "ledger," I mean a private, tamper-proof record book — not cryptocurrency, not tokens, not Bitcoin. 
                I built a <strong>dual-ledger architecture</strong> to completely isolate your data. The <strong>Cox Automotive Ledger (CAL)</strong> is strictly internal: a notarized logbook on your own servers tracking every lane move and scan. The <strong>Verified Enterprise Trust (VET)</strong> ledger is external: a secure way to cryptographically prove vehicle condition to buyers and financing partners without ever exposing your internal operations. No one can alter the records after the fact. It's simply a better way to keep data that can't be disputed.
              </p>
            </div>

            {/* WHAT IT ACTUALLY IS */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(14,165,233,0.12)',
              borderRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(14,165,233,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShieldCheck size={16} color="#38bdf8" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>So what is it?</span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                It's an infrastructure layer that sits on top of what Manheim already runs. It doesn't replace your systems — including your existing Cox2M telematics dongles, which stay exactly where they are. 
                It adds modular capabilities that complement existing operations: deterministic condition reports via <strong>LumeScan</strong>, 
                the tamper-evident <strong>Cox Automotive Ledger (CAL)</strong> for immutable operational records, the <strong>Verified Enterprise Trust (VET)</strong> ledger for external buyer and dealer verification, and a mobile-first 
                platform that works on the phones your drivers already carry. Every piece works on its own. You don't have to adopt the whole thing to get value from one part.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
