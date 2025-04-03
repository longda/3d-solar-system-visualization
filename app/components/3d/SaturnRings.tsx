'use client';

import { DoubleSide } from 'three';

interface SaturnRingsProps {
  position: [number, number, number];
  scale: number;
}

export default function SaturnRings({ position, scale }: SaturnRingsProps) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[scale * 1.5, scale * 2.5, 64]} />
      <meshStandardMaterial 
        color="#f1c40f"
        transparent={true} 
        opacity={0.5} 
        side={DoubleSide} 
      />
    </mesh>
  );
} 