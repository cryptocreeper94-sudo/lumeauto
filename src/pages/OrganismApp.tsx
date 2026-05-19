import { useState } from 'react';
import OrganismConnection from '../components/organism/OrganismConnection';
import OrganismDashboard from '../components/organism/OrganismDashboard';
import OrganismReport from '../components/organism/OrganismReport';
import OrganismVisualization from '../components/organism/OrganismVisualization';
import { type TelemetrySnapshot } from '../telemetry/SimulatedEngine';
import { startBLETelemetryLoop, recordTelemetrySnapshot } from '../telemetry/BLEConnector';
import { useEffect } from 'react';
import { BarChart3, FileText, Cpu } from 'lucide-react';

type Screen = 'connection' | 'dashboard' | 'organism' | 'report';

export default function OrganismApp() {
  const [screen, setScreen] = useState<Screen>('connection');
  const [data, setData] = useState<TelemetrySnapshot | null>(null);

  // Start telemetry once connected
  useEffect(() => {
    if (screen === 'connection') return;
    const stop = startBLETelemetryLoop((snapshot) => {
      setData(snapshot);
      recordTelemetrySnapshot(snapshot);
    }, 150);
    return () => stop();
  }, [screen === 'connection']);

  if (screen === 'connection') {
    return (
      <div style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <OrganismConnection onConnect={() => setScreen('dashboard')} />
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '70px' }}>
      {screen === 'dashboard' && (
        <OrganismDashboard onReport={() => setScreen('report')} />
      )}
      {screen === 'organism' && (
        <OrganismVisualization onBack={() => setScreen('dashboard')} data={data} />
      )}
      {screen === 'report' && (
        <OrganismReport onBack={() => setScreen('dashboard')} />
      )}

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(10,10,14,0.95)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border-light)',
        display: 'flex', justifyContent: 'center', zIndex: 100,
      }}>
        <div style={{
          display: 'flex', maxWidth: '480px', width: '100%',
        }}>
          {[
            { id: 'dashboard' as Screen, icon: BarChart3, label: 'Dashboard' },
            { id: 'organism' as Screen, icon: Cpu, label: 'LumeScan' },
            { id: 'report' as Screen, icon: FileText, label: 'Report' },
          ].map(tab => {
            const active = screen === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setScreen(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '4px', padding: '10px 0', background: 'none', border: 'none',
                  color: active ? 'var(--accent-cyan)' : 'var(--text-dim)',
                  cursor: 'pointer', transition: 'color 0.2s',
                }}
              >
                <Icon size={20} />
                <span style={{
                  fontSize: '0.55rem', fontWeight: active ? 700 : 500,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {tab.label}
                </span>
                {active && (
                  <div style={{
                    position: 'absolute', top: 0, width: '40px', height: '2px',
                    background: 'var(--accent-cyan)', borderRadius: '0 0 2px 2px',
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
