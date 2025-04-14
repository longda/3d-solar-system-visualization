'use client'

import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Planet } from './Planet'
import { InfoPanel } from './InfoPanel'
import { planets, PlanetData } from '../../data/planets'

const EARTH_ORBITAL_PERIOD = 365.25;

export function Scene() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  const handlePlanetClick = (planetData: PlanetData) => {
    setSelectedPlanet(planetData);
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
        <ambientLight intensity={0.5} />
        <PerspectiveCamera makeDefault position={[0, 50, 150]} fov={75} />
        <Stars radius={300} depth={50} count={10000} factor={5} saturation={0} fade speed={1} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
            planetData={planet}
            onPlanetClick={handlePlanetClick}
          />
        ))}
      </Canvas>
      <InfoPanel planet={selectedPlanet} onClose={handleClosePanel} />
    </div>
  )
} 