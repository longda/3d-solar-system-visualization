'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Planet } from './Planet'
import { InfoPanel } from './InfoPanel'
import { ControlPanel } from './ui/ControlPanel'
import { planets, PlanetData } from '../../data/planets'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

const EARTH_ORBITAL_PERIOD = 365.25;

// Component to handle keyboard controls
function KeyboardControls({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const speed = 0.2;
  const keys = useRef<{ [key: string]: boolean }>({});
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = true; };
    const handleKeyUp = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (!controlsRef.current) return;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize(); // Get right vector relative to camera

    const moveDirection = new THREE.Vector3();

    if (keys.current['w']) {
      moveDirection.add(forward);
    }
    if (keys.current['s']) {
      moveDirection.sub(forward);
    }
    if (keys.current['a']) {
      moveDirection.add(right);
    }
    if (keys.current['d']) {
      moveDirection.sub(right);
    }

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize().multiplyScalar(speed);
      controlsRef.current.target.add(moveDirection); // Move the target (pivot point)
      // Optionally move camera position directly: camera.position.add(moveDirection);
    }
  });

  return null; // This component doesn't render anything itself
}

export function Scene() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const controlsRef = useRef<OrbitControlsImpl>(null); // Ref for OrbitControls

  const handlePlanetClick = (planetData: PlanetData) => {
    // If the clicked planet is already selected, deselect it (toggle off)
    if (selectedPlanet && selectedPlanet.name === planetData.name) {
      setSelectedPlanet(null);
    } else {
      // Otherwise, select the clicked planet
      setSelectedPlanet(planetData);
    }
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationSpeed(parseFloat(event.target.value));
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ControlPanel 
        isPlaying={isPlaying} 
        onTogglePlayPause={togglePlayPause} 
        animationSpeed={animationSpeed}
        onSpeedChange={handleSpeedChange}
      />
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black' }}>
        <ambientLight intensity={0.5} />
        <PerspectiveCamera makeDefault position={[0, 50, 150]} fov={75} />
        <Stars radius={300} depth={50} count={10000} factor={5} saturation={0} fade speed={1} />
        <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} enableRotate={true} />
        <KeyboardControls controlsRef={controlsRef} />
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
            isPlaying={isPlaying}
            animationSpeed={animationSpeed}
          />
        ))}
      </Canvas>
      <InfoPanel planet={selectedPlanet} onClose={handleClosePanel} />
    </div>
  )
} 