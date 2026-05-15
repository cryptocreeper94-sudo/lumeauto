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

  return (
    <group ref={ref} visible={active}>
      <primitive object={clone} position={position} />
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      const arr = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += 0.005;
        if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = 0;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#080810" metalness={0.5} roughness={0.6} />
    </mesh>
  );
}

export default function MeridianScene3D() {
  return (
    <div style={{
      width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden',
      border: '1px solid rgba(167, 139, 250, 0.3)',
      background: '#04060c',
    }}>
      <Canvas
        camera={{ position: [18, 10, 16], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 2.0 }}
        shadows
      >
        <color attach="background" args={['#04060c']} />
        <fog attach="fog" args={['#04060c', 20, 60]} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <hemisphereLight args={['#667799', '#111118', 0.8]} />
        <directionalLight position={[8, 15, 5]} intensity={2.0} color="#ffffff" castShadow />
        <directionalLight position={[-5, 8, -3]} intensity={0.8} color="#c4b5fd" />
        <pointLight position={[0, 7, 0]} intensity={1.5} color="#a78bfa" distance={20} />

        {/* Scene */}
        <CanopyFrame />
        <EVSedan position={[-2, 0, 0]} />
        <EVSedan position={[3, 0, 0]} />
        <EnergyBeam position={[-2, 0, 0]} active={true} />
        <EnergyBeam position={[3, 0, 0]} active={true} />
        <LotSurface />
        <GridFloor />
        <FloatingParticles />



        {/* Controls */}
        <OrbitControls
          autoRotate autoRotateSpeed={0.4}
          enableDamping dampingFactor={0.08}
          minDistance={8} maxDistance={40}
          target={[0, 3, 0]}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}

// Preload GLBs
useGLTF.preload('/models/anchor-node.glb');
useGLTF.preload('/models/canopy-frame.glb');
useGLTF.preload('/models/ev-sedan.glb');
useGLTF.preload('/models/lot-surface.glb');
useGLTF.preload('/models/energy-beam.glb');
