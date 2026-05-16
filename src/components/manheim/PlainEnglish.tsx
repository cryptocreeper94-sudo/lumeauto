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
            Before We Go Further
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
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>The ledger is not a blockchain.</span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                When I say "ledger," I mean a private, tamper-proof record book — not cryptocurrency, not tokens, not Bitcoin, not anything public. 
                Think of it like a notarized logbook that lives on your own servers. Every time a vehicle changes hands, gets scanned, or moves through a lane, 
                that event gets a timestamped, tamper-evident record. No one outside your network can see it. No one can alter it after the fact. 
                It's just a better way to keep records that can't be disputed.
              </p>
            </div>

            {/* WHAT IT ACTUALLY IS */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(168,85,247,0.12)',
              borderRadius: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(168,85,247,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShieldCheck size={16} color="#a855f7" />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>So what is it?</span>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.75, color: 'var(--text-muted)', margin: 0 }}>
                It's an infrastructure layer that sits on top of what Manheim already runs. It doesn't replace anything. 
                It adds three capabilities that complement existing operations: sensor-verified condition reports with cryptographic proof, 
                a tamper-evident custody record for every vehicle transition, and a mobile operational platform that works on 
                phones your drivers already own or an inexpensive browser-based device. Every piece works on its own. You don't have to adopt the whole thing to get value from one part.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
