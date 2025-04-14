'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'

export function Scene() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      {/* Add other scene elements here */}
    </Canvas>
  )
} 