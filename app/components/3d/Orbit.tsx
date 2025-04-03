'use client';

interface OrbitProps {
  radius: number;
  color: string;
}

export default function Orbit({ radius, color }: OrbitProps) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial color={color} opacity={0.3} transparent={true} />
    </mesh>
  );
} 