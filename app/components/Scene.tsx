'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Stars, OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
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

// Helper component to run useFrame logic inside Canvas
interface TimelineSetupHelperProps {
  planetRefs: React.RefObject<{ [key: string]: THREE.Mesh | null }>;
  timelineSetupComplete: React.MutableRefObject<boolean>;
  setupTimeline: () => void;
}
function TimelineSetupHelper({ planetRefs, timelineSetupComplete, setupTimeline }: TimelineSetupHelperProps) {
  useFrame(() => {
    if (!timelineSetupComplete.current) {
      const allRefsReady = planets.every(p => planetRefs.current?.[p.name]);
      if (allRefsReady) {
        setupTimeline();
        timelineSetupComplete.current = true;
      }
    }
  });
  return null; // Doesn't render anything visible
}

export function Scene() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const planetRefs = useRef<{ [key: string]: THREE.Mesh | null }>({});
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const timelineSetupComplete = useRef(false);

  // Initialize planet refs container
  useEffect(() => {
    planets.forEach(planet => {
      planetRefs.current[planet.name] = null;
    });
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      timelineSetupComplete.current = false;
    }
  }, []);

  // Function to setup the GSAP timeline
  const setupTimeline = useCallback(() => {
    const tl = gsap.timeline({ repeat: -1, paused: !isPlaying });
    timelineRef.current = tl;

    planets.forEach(planet => {
      const mesh = planetRefs.current[planet.name];
      if (!mesh) {
        console.error(`Ref for planet ${planet.name} not ready for GSAP.`);
        return; // Skip if ref not ready (shouldn't happen if check passes)
      }

      const radius = planet.orbitalRadius * 10; 
      const duration = (planet.orbitalPeriod / 365.25) * 20; 
      const startAngle = Math.random() * Math.PI * 2;
      
      // Set initial position explicitly
      mesh.position.x = Math.cos(startAngle) * radius;
      mesh.position.z = Math.sin(startAngle) * radius;
      mesh.position.y = 0; // Ensure Y is 0

      // Animate using GSAP
      const orbitParams = { angle: startAngle }; 
      tl.to(orbitParams, {
        angle: startAngle + Math.PI * 2,
        duration: duration,
        ease: "none",
        onUpdate: () => {
          mesh.position.x = Math.cos(orbitParams.angle) * radius;
          mesh.position.z = Math.sin(orbitParams.angle) * radius;
        }
      }, 0); 
    });
    console.log("GSAP timeline setup complete.")
  }, [isPlaying]);

  // Control timeline playback based on state
  useEffect(() => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: animationSpeed, duration: 0.3 });
      if (isPlaying) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying, animationSpeed]);

  // Define handlers
  const handlePlanetClick = (planetData: PlanetData) => {
    if (selectedPlanet && selectedPlanet.name === planetData.name) {
      setSelectedPlanet(null);
    } else {
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

  // Basic check for mobile-like screen width on client
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialCameraPosition: [number, number, number] = isMobile ? [0, 60, 180] : [0, 50, 150];
  const initialFov = isMobile ? 85 : 75;

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
        <PerspectiveCamera makeDefault position={initialCameraPosition} fov={initialFov} />
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} speed={0.5} />
        <OrbitControls 
          ref={controlsRef} 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true} 
          maxDistance={145}
        />
        <KeyboardControls controlsRef={controlsRef} />
        {/* Add the helper component inside Canvas */}
        <TimelineSetupHelper 
          planetRefs={planetRefs}
          timelineSetupComplete={timelineSetupComplete}
          setupTimeline={setupTimeline}
        />
        {/* Sun */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial emissive="yellow" emissiveIntensity={2} toneMapped={false} />
          <pointLight intensity={200} color="yellow" distance={1000} />
          <Sparkles 
            count={100} 
            scale={3.5}
            size={6} 
            speed={0.4} 
            color="#FFDB58"
          />
        </mesh>
        
        {/* Planets */}
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            planetData={planet}
            ref={(el: THREE.Mesh | null) => { planetRefs.current[planet.name] = el; }}
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