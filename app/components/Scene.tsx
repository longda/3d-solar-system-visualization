'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { Planet } from './Planet'
import { planets } from '../../data/planets' // Import planets data

const EARTH_ORBITAL_PERIOD = 365.25;

export function Scene() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
      <ambientLight intensity={0.5} />
      <PerspectiveCamera makeDefault position={[0, 50, 150]} fov={75} /> {/* Adjusted camera further out */}
      <Stars radius={300} depth={50} count={10000} factor={5} saturation={0} fade speed={1} />
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial emissive="yellow" emissiveIntensity={2} />
        <pointLight intensity={200} color="yellow" distance={1000} />
      </mesh>
      
      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          name={planet.name}
          size={planet.size}
          color={planet.color}
          orbitalRadius={planet.orbitalRadius}
          orbitalSpeed={EARTH_ORBITAL_PERIOD / planet.orbitalPeriod} // Calculate relative speed
        />
      ))}
    </Canvas>
  )
} 