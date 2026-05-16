import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import LumeVSection from '../components/manheim/LumeVSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import CoxLedgerSection from '../components/manheim/CoxLedgerSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import EcosystemCTA from '../components/manheim/EcosystemCTA';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      <HeroSection />
      <LumeVSection />
      <LotOpsProSection />
      <LumeLanguageSection />
      <ArchitectureSection />
      <CoxLedgerSection />
      <AppShowcase />
      <HardwareSection />
      <EcosystemCTA />
    </div>
  );
}
