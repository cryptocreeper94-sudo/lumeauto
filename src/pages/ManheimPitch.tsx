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
import VETSection from '../components/manheim/VETSection';
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

      {/* 2. THE PLATFORM (The Daily Operations) */}
      <COPSection />
      <LumeVSection />
      <LotOpsProSection />

      {/* 3. THE ENGINE & DIAGNOSTICS (Lume Core, LumeScan, & Hardware) */}
      <LumeLanguageSection />
      <ArchitectureSection />
      <AppShowcase />
      <HardwareSection />

      {/* 4. THE LEDGERS (Data & Trust) */}
      <CoxLedgerSection />
      <VETSection />

      {/* 5. DEPLOYMENT & ROADMAP */}
      <ImplementationPath />
      <PlatformRoadmap />

      {/* 6. THE FINALE (Future Ecosystem) */}
      <EcosystemCTA />
      <MeridianTeaser />
      <EnterpriseMeshTeaser />
    </div>
  );
}
