import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import LumeVSection from '../components/manheim/LumeVSection';
import CoxLedgerSection from '../components/manheim/CoxLedgerSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import EcosystemCTA from '../components/manheim/EcosystemCTA';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      {/* 1. Platform Hero — captures the whole system */}
      <HeroSection />
      {/* 2. LUME-V — Modernization Wrapper */}
      <LumeVSection />
      {/* 3. Cox Automotive Ledger — Enterprise Trust Fabric */}
      <CoxLedgerSection />
      {/* 4. Architecture — how the organism works */}
      <ArchitectureSection />
      {/* 5. The Language — deterministic mathematics */}
      <LumeLanguageSection />
      {/* 6. Lot Ops Pro — operational integration */}
      <LotOpsProSection />
      {/* 7. App Showcase — LUME-Auto interfaces */}
      <AppShowcase />
      {/* 8. Hardware */}
      <HardwareSection />
      {/* 9. Academic / Patent / CTA */}
      <EcosystemCTA />
    </div>
  );
}
