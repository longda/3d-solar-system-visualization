'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Planet } from './Planet'

export function Scene() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 20, 50]} fov={75} />
      <Stars radius={300} depth={50} count={10000} factor={5} saturation={0} fade speed={1} />
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial emissive="yellow" emissiveIntensity={2} />
        <pointLight intensity={200} color="yellow" distance={1000} />
      </mesh>
      {/* Mercury */}
      <Planet 
        name="Mercury" 
        size={0.4} 
        color="gray" 
        orbitalRadius={5.8}
        orbitalSpeed={4.15}
      />
      {/* Add other planets here */}
    </Canvas>
  )
} 