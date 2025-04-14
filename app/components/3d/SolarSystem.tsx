'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { Group, Mesh } from 'three';
import planetData from '@/app/lib/planets-data';
import Planet from './Planet';
import Orbit from './Orbit';
import SaturnRings from './SaturnRings';

function Sun() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Slow rotation for the sun
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[planetData[0].size, 32, 32]} />
      <meshStandardMaterial 
        color="orange" 
        emissive="orange" 
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function PlanetarySystem() {
  const groupRef = useRef<Group>(null);
  
  // Use a ref to avoid recreating this array on every render
  const distances = planetData.map(planet => {
    // Scale distances for better visualization
    // Start from index 1 to skip the sun
    if (planet.id === 'sun') return 0;
    return planet.distance * 6; // Multiply by a scaling factor
  });

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Planetary system can have some gentle motion
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Sun />
      
      {/* Draw orbit lines first */}
      {planetData.slice(1).map((planet, index) => (
        <Orbit 
          key={`orbit-${planet.id}`} 
          radius={distances[index + 1]} 
          color={planet.color} 
        />
      ))}
      
      {/* Then draw planets */}
      {planetData.slice(1).map((planet, index) => (
        <group key={`planet-group-${planet.id}`}>
          <Planet 
            planet={planet} 
            orbitRadius={distances[index + 1]} 
          />
          
          {/* Special case for Saturn - add rings */}
          {planet.id === 'saturn' && (
            <SaturnRings 
              position={[distances[index + 1], 0, 0]} 
              scale={planet.size} 
            />
          )}
        </group>
      ))}
    </group>
  );
}

export default function SolarSystem() {
  return (
    <Canvas camera={{ position: [0, 30, 50], fov: 45 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={5} color="white" distance={100} />
      {/* Add directional lights to improve planet visibility */}
      <directionalLight position={[10, 20, 10]} intensity={1} />
      <directionalLight position={[-10, -20, -10]} intensity={0.5} />
      <OrbitControls 
        makeDefault 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={10}
        maxDistance={100}
      />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <PlanetarySystem />
    </Canvas>
  );
} 