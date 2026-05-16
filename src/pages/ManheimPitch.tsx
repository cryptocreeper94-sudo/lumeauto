import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import LumeVSection from '../components/manheim/LumeVSection';
import CoxLedgerSection from '../components/manheim/CoxLedgerSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import TrustLayerSection from '../components/manheim/TrustLayerSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import EcosystemCTA from '../components/manheim/EcosystemCTA';
import ImplementationPath from '../components/manheim/ImplementationPath';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      {/* 1. Narrative / Origin Story */}
      <HeroSection />
      {/* 2. LUME-V — Modernization Wrapper */}
      <LumeVSection />
      {/* 3. Cox Automotive Ledger — Enterprise Trust Fabric */}
      <CoxLedgerSection />
      {/* 4. Lot Ops Pro — Operational OS */}
      <LotOpsProSection />
      {/* 5. LUME-Native Runtime / Deterministic Substrate */}
      <ArchitectureSection />
      {/* 6. Synthetic Organisms / Deterministic Mathematics */}
      <LumeLanguageSection />
      {/* 7. Trust Layer — Commercial Verification Chain */}
      <TrustLayerSection />
      {/* 8. LUME-Auto — OBD-II Organism */}
      <AppShowcase />
      {/* 9. Hardware */}
      <HardwareSection />
      {/* 10. Academic / Patent / DOI Section */}
      <EcosystemCTA />
      {/* 11. Manheim-Specific Implementation Path */}
      <ImplementationPath />
    </div>
  );
}
