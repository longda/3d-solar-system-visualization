'use client';

import { useTexture } from "@react-three/drei";
import { BackSide } from "three";

export default function Skybox() {
  const texture = useTexture('/textures/2k_stars.jpg');

  return (
    <mesh>
      <sphereGeometry args={[300, 64, 64]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
} 