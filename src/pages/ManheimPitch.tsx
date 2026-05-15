import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import EcosystemCTA from '../components/manheim/EcosystemCTA';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      <HeroSection />
      <LotOpsProSection />
      <LumeLanguageSection />
      <ArchitectureSection />
      <AppShowcase />
      <HardwareSection />
      <EcosystemCTA />
    </div>
  );
}
