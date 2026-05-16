import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

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
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 2 + position[0]) * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[position[0], 3.5, position[2]]}>
      <cylinderGeometry args={[0.4, 0.8, 7, 16, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;
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
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} />
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

export default function MeridianScene3D() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        width: '100%', height: '520px', borderRadius: '16px', overflow: 'hidden',
        border: '1px solid rgba(167, 139, 250, 0.3)',
        background: 'linear-gradient(180deg, #06081a 0%, #04060c 100%)',
        boxShadow: '0 20px 80px rgba(124, 58, 237, 0.12), 0 0 120px rgba(167, 139, 250, 0.06)',
      }}>
        <Canvas
          camera={{ position: [16, 9, 14], fov: 42 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 2.2 }}
          shadows
        >
          <color attach="background" args={['#06081a']} />
          <fog attach="fog" args={['#06081a', 25, 65]} />

          {/* Rich multi-source lighting */}
          <ambientLight intensity={0.3} />
          <hemisphereLight args={['#6366f1', '#111118', 0.6]} />
          <directionalLight position={[8, 15, 5]} intensity={2.5} color="#ffffff" castShadow />
          <directionalLight position={[-5, 8, -3]} intensity={1.0} color="#c4b5fd" />
          {/* Purple accent lighting from above */}
          <pointLight position={[0, 8, 0]} intensity={2.0} color="#a78bfa" distance={25} />
          <pointLight position={[-2, 5, 0]} intensity={1.2} color="#818cf8" distance={15} />
          <pointLight position={[3, 5, 0]} intensity={1.2} color="#818cf8" distance={15} />
          {/* Ground-bounce cyan accent */}
          <pointLight position={[0, 0.5, 4]} intensity={0.6} color="#06b6d4" distance={12} />

          {/* Scene */}
          <CanopyFrame />
          <EVSedan position={[-2, 0, 0]} />
          <EVSedan position={[3, 0, 0]} />
          <EnergyBeam position={[-2, 0, 0]} active={true} />
          <EnergyBeam position={[3, 0, 0]} active={true} />
          {/* Energy visualization effects */}
          <EnergyColumn position={[-2, 0, 0]} color="#a78bfa" />
          <EnergyColumn position={[3, 0, 0]} color="#818cf8" />
          <EnergyPulse position={[-2, 0, 0]} color="#a78bfa" />
          <EnergyPulse position={[3, 0, 0]} color="#818cf8" />
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
        </Canvas>
      </div>

      {/* Descriptive callouts around the scene */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem',
        marginTop: '1rem',
      }}>
        {[
          { label: 'Overhead Anchor Nodes', desc: 'Energy transmitters mounted in existing canopy structure', color: '#a78bfa' },
          { label: 'Wireless Energy Routing', desc: 'Deterministic protocol — no cables, no adapters', color: '#818cf8' },
          { label: 'Cryptographic Billing', desc: 'Every kWh metered and sealed on-chain automatically', color: '#c4b5fd' },
        ].map((c, i) => (
          <div key={i} style={{
            padding: '0.75rem', background: 'rgba(167,139,250,0.04)',
            border: '1px solid rgba(167,139,250,0.12)', borderRadius: '10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: c.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>{c.label}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Preload GLBs
useGLTF.preload('/models/anchor-node.glb');
useGLTF.preload('/models/canopy-frame.glb');
useGLTF.preload('/models/ev-sedan.glb');
useGLTF.preload('/models/lot-surface.glb');
useGLTF.preload('/models/energy-beam.glb');
