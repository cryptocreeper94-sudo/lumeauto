import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Maximize2, X } from 'lucide-react';

function CanopyFrame() {
  const { scene } = useGLTF('/models/canopy-frame.glb');
  return <primitive object={scene} position={[0, 0, 0]} />;
}

function EVSedan({ position }: { position: [number, number, number] }) {
  const { scene } = useGLTF('/models/ev-sedan.glb');
  const clone = useMemo(() => scene.clone(), [scene]);
  return <primitive object={clone} position={position} />;
}

function LotSurface() {
  const { scene } = useGLTF('/models/lot-surface.glb');
  return <primitive object={scene} position={[0, -0.1, 0]} />;
}

function EnergyBeam({ position, active }: { position: [number, number, number]; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/energy-beam.glb');
  const clone = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (ref.current && active) {
      const t = state.clock.elapsedTime;
      ref.current.children.forEach((child, i) => {
        if ((child as THREE.Mesh).material && 'opacity' in ((child as THREE.Mesh).material as THREE.Material)) {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat.transparent) {
            mat.opacity = 0.3 + Math.sin(t * 3 + i) * 0.3;
          }
        }
      });
    }
  });

  // Position beam at canopy height, directly above vehicle
  return (
    <group ref={ref} visible={active}>
      <primitive object={clone} position={position} />
    </group>
  );
}

// Animated energy pulse rings beneath each charging point
function EnergyPulse({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      const scale = 1 + Math.sin(t * 2) * 0.3;
      ref.current.scale.set(scale, scale, 1);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 3) * 0.1;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[position[0], 0.02, position[2]]}>
      <ringGeometry args={[0.8, 1.5, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// Vertical energy column from canopy to vehicle
function EnergyColumn({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(t * 2 + position[0]) * 0.06;
    }
  });
  return (
    <mesh ref={ref} position={[position[0], 3.5, position[2]]}>
      <cylinderGeometry args={[0.4, 0.8, 7, 16, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// 3D Charging Indicator — battery % text rendered in the scene
function ChargingIndicator({ position, startPct, color, label }: { position: [number, number, number]; startPct: number; color: string; label: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [pct, setPct] = useState(startPct);

  useEffect(() => {
    const interval = setInterval(() => {
      setPct(prev => prev >= 95 ? startPct : prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [startPct]);

  useFrame((state) => {
    if (groupRef.current) {
      // Billboard: always face camera
      groupRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group ref={groupRef} position={[position[0], position[1] + 4.5, position[2]]}>
      {/* Background panel */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.65} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Label */}
      <Text position={[0, 0.4, 0]} fontSize={0.22} color="rgba(255,255,255,0.6)" anchorX="center" anchorY="middle" font="/fonts/Inter-Medium.woff">
        {label}
      </Text>

      {/* Battery percentage */}
      <Text position={[0, -0.05, 0]} fontSize={0.55} color={color} anchorX="center" anchorY="middle" font="/fonts/Inter-Bold.woff" fontWeight={700}>
        {pct}%
      </Text>

      {/* Status indicator */}
      <Text position={[0, -0.5, 0]} fontSize={0.16} color="#22c55e" anchorX="center" anchorY="middle" font="/fonts/Inter-Medium.woff">
        ● CHARGING
      </Text>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r < 0.5) { cols[i*3] = 0.65; cols[i*3+1] = 0.55; cols[i*3+2] = 0.98; } // purple
      else if (r < 0.8) { cols[i*3] = 0.4; cols[i*3+1] = 0.8; cols[i*3+2] = 0.95; } // cyan
      else { cols[i*3] = 0.06; cols[i*3+1] = 0.73; cols[i*3+2] = 0.51; } // emerald
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      const arr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += 0.004;
        if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = 0;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.65} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#060810" metalness={0.6} roughness={0.5} />
    </mesh>
  );
}

// Auto-resize handler for fullscreen
function CanvasResizer() {
  const { gl, camera } = useThree();
  useEffect(() => {
    const handleResize = () => {
      const canvas = gl.domElement;
      const parent = canvas.parentElement;
      if (parent) {
        gl.setSize(parent.clientWidth, parent.clientHeight);
        (camera as THREE.PerspectiveCamera).aspect = parent.clientWidth / parent.clientHeight;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);
    // Also fire on orientation change
    window.addEventListener('orientationchange', () => setTimeout(handleResize, 300));
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [gl, camera]);
  return null;
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#06081a']} />
      <fog attach="fog" args={['#06081a', 25, 65]} />

      {/* Rich multi-source lighting */}
      <ambientLight intensity={0.5} />
      <hemisphereLight args={['#38bdf8', '#111118', 0.8]} />
      <directionalLight position={[8, 15, 5]} intensity={3.0} color="#ffffff" castShadow />
      <directionalLight position={[-5, 8, -3]} intensity={1.0} color="#38bdf8" />
      {/* Red accent lighting from above */}
      <pointLight position={[0, 8, 0]} intensity={2.0} color="#dc2626" distance={25} />
      <pointLight position={[-2, 5, 0]} intensity={1.2} color="#dc2626" distance={15} />
      <pointLight position={[3, 5, 0]} intensity={1.2} color="#dc2626" distance={15} />
      {/* Ground-bounce cyan accent */}
      <pointLight position={[0, 0.5, 4]} intensity={0.6} color="#06b6d4" distance={12} />

      {/* Scene */}
      <CanopyFrame />
      <EVSedan position={[-2, 0, 0]} />
      <EVSedan position={[3, 0, 0]} />
      <EnergyBeam position={[-2, 0, 0]} active={true} />
      <EnergyBeam position={[3, 0, 0]} active={true} />
      {/* Energy visualization effects */}
      <EnergyColumn position={[-2, 0, 0]} color="#38bdf8" />
      <EnergyColumn position={[3, 0, 0]} color="#dc2626" />
      <EnergyPulse position={[-2, 0, 0]} color="#38bdf8" />
      <EnergyPulse position={[3, 0, 0]} color="#dc2626" />

      {/* 3D Charging indicators */}
      <ChargingIndicator position={[-2, 0, 0]} startPct={34} color="#38bdf8" label="BAY 1" />
      <ChargingIndicator position={[3, 0, 0]} startPct={61} color="#dc2626" label="BAY 2" />

      <LotSurface />
      <GridFloor />
      <FloatingParticles />

      {/* Controls */}
      <OrbitControls
        autoRotate autoRotateSpeed={0.3}
        enableDamping dampingFactor={0.06}
        minDistance={8} maxDistance={40}
        target={[0, 3, 0]}
      />
      <Environment preset="night" />
      <CanvasResizer />
    </>
  );
}

export default function MeridianScene3D() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
    // Try to lock to landscape on mobile
    try {
      if (screen.orientation && 'lock' in screen.orientation) {
        (screen.orientation as any).lock('landscape').catch(() => {});
      }
    } catch {}
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
    // Unlock orientation
    try {
      if (screen.orientation && 'unlock' in screen.orientation) {
        screen.orientation.unlock();
      }
    } catch {}
  }, []);

  // ESC key to exit
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) exitFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isFullscreen, exitFullscreen]);

  const canvasJSX = (
    <Canvas
      camera={{ position: [16, 9, 14], fov: 42 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 2.8 }}
      shadows
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContent />
    </Canvas>
  );

  return (
    <>
      {/* Inline view */}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '100%', height: '520px', borderRadius: '16px', overflow: 'hidden',
          border: '1px solid rgba(220, 38, 38, 0.25)',
          background: 'linear-gradient(180deg, #06081a 0%, #04060c 100%)',
          boxShadow: '0 20px 80px rgba(220, 38, 38, 0.08), 0 0 120px rgba(30, 58, 95, 0.06)',
        }}>
          {!isFullscreen && canvasJSX}
        </div>

        {/* Fullscreen toggle button */}
        {!isFullscreen && (
          <button
            onClick={enterFullscreen}
            style={{
              position: 'absolute', top: '12px', right: '12px', zIndex: 10,
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            title="Fullscreen 3D View"
          >
            <Maximize2 size={16} />
          </button>
        )}

        {/* Descriptive callouts around the scene */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem',
          marginTop: '1rem',
        }}>
          {[
            { label: 'Overhead Anchor Nodes', desc: 'Energy transmitters mounted in existing canopy structure', color: 'var(--accent-cyan)' },
            { label: 'Wireless Energy Routing', desc: 'Deterministic protocol — no cables, no adapters', color: '#38bdf8' },
            { label: 'Cryptographic Billing', desc: 'Every kWh metered and sealed on-chain automatically', color: 'var(--accent-emerald)' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '0.75rem', background: 'rgba(56,189,248,0.04)',
              border: '1px solid rgba(56,189,248,0.12)', borderRadius: '10px',
              textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', minHeight: '100px',
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: c.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', minHeight: '2.4em', display: 'flex', alignItems: 'center' }}>{c.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#06081a',
        }}>
          {canvasJSX}

          {/* Close button */}
          <button
            onClick={exitFullscreen}
            style={{
              position: 'absolute', top: '16px', right: '16px', zIndex: 10000,
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            title="Exit Fullscreen"
          >
            <X size={18} />
          </button>

          {/* Charging HUD overlay in fullscreen */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '24px', zIndex: 10000,
          }}>
            <div style={{
              padding: '12px 20px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(56,189,248,0.3)', borderRadius: '12px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Meridian Canopy Charging</div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>2 Vehicles Active</div>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ fontSize: '0.7rem', color: '#22c55e', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>● Online</div>
            </div>
          </div>

          {/* Landscape hint for portrait mobile */}
          <div style={{
            position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            zIndex: 10000,
          }}>
            Drag to orbit · Pinch to zoom · ESC to exit
          </div>
        </div>
      )}
    </>
  );
}

// Preload GLBs
useGLTF.preload('/models/anchor-node.glb');
useGLTF.preload('/models/canopy-frame.glb');
useGLTF.preload('/models/ev-sedan.glb');
useGLTF.preload('/models/lot-surface.glb');
useGLTF.preload('/models/energy-beam.glb');
