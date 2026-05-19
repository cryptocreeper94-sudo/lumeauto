import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import PersonalNote from '../components/manheim/PersonalNote';
import PlainEnglish from '../components/manheim/PlainEnglish';
import COPSection from '../components/manheim/COPSection';
import LumeVSection from '../components/manheim/LumeVSection';
import CoxLedgerSection from '../components/manheim/CoxLedgerSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import VETSection from '../components/manheim/TrustLayerSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import MeridianTeaser from '../components/manheim/MeridianTeaser';
import EnterpriseMeshTeaser from '../components/manheim/EnterpriseMeshTeaser';
import EcosystemCTA from '../components/manheim/EcosystemCTA';
import PlatformRoadmap from '../components/manheim/PlatformRoadmap';
import ImplementationPath from '../components/manheim/ImplementationPath';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      {/* 1. Narrative / Origin Story */}
      <HeroSection />
      {/* Personal context from Jason */}
      <PersonalNote />
      {/* Plain-English explainer — kills AI/blockchain fears before they start */}
      <PlainEnglish />
      {/* 3. COP — The Unified OS Wrapper */}
      <COPSection />
      {/* 4. LUME-V — Modernization Wrapper */}
      <LumeVSection />
      {/* 3. Cox Automotive Ledger — Enterprise Trust Fabric */}
      <CoxLedgerSection />
      {/* 4. Lot Ops Pro — Operational OS */}
      <LotOpsProSection />
      {/* 5. LUME-Native Runtime / Deterministic Substrate */}
      <ArchitectureSection />
      {/* 6. Synthetic Organisms / Deterministic Mathematics */}
      <LumeLanguageSection />
      {/* 7. VET — Verified Enterprise Trust */}
      <VETSection />
      {/* 8. LUME-Auto — OBD-II Organism */}
      <AppShowcase />
      {/* 9. Hardware */}
      <HardwareSection />
      {/* 10. Meridian — Future Wireless Energy Layer */}
      <MeridianTeaser />
      {/* 10.5. Enterprise Mesh — Future Sovereign Chain Network */}
      <EnterpriseMeshTeaser />
      {/* 11. Academic / Patent / DOI Section */}
      <EcosystemCTA />
      {/* 12. Platform Roadmap — Future Native COP Apps */}
      <PlatformRoadmap />
      {/* 13. Manheim-Specific Implementation Path */}
      <ImplementationPath />
    </div>
  );
}
