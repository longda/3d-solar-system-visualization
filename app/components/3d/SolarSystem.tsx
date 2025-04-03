'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <OrbitControls makeDefault enablePan={true} enableZoom={true} enableRotate={true} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sun />
    </Canvas>
  );
} 