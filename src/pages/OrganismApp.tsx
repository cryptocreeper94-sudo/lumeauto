import { useState } from 'react';
import OrganismConnection from '../components/organism/OrganismConnection';
import OrganismDashboard from '../components/organism/OrganismDashboard';
import OrganismReport from '../components/organism/OrganismReport';

type Screen = 'connection' | 'dashboard' | 'report';

export default function OrganismApp() {
  const [screen, setScreen] = useState<Screen>('connection');

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      {screen === 'connection' && (
        <OrganismConnection onConnect={() => setScreen('dashboard')} />
      )}
      {screen === 'dashboard' && (
        <OrganismDashboard onReport={() => setScreen('report')} />
      )}
      {screen === 'report' && (
        <OrganismReport onBack={() => setScreen('dashboard')} />
      )}
    </div>
  );
}
