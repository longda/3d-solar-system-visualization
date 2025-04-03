'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';
import { PlanetData } from '@/app/lib/planets-data';

interface PlanetProps {
  planet: PlanetData;
  orbitRadius: number;
}

export default function Planet({ planet, orbitRadius }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  
  // Self-rotation speed - scale based on planet size for visualization
  const rotationSpeed = 0.01 / (planet.size * 0.5);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Self-rotation on the Y axis
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[orbitRadius, 0, 0]}>
      <sphereGeometry args={[planet.size, 32, 32]} />
      <meshStandardMaterial color={planet.color} />
    </mesh>
  );
} 