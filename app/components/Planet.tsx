'use client'

import React, { useRef, forwardRef } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { PlanetData } from '../../data/planets' // Import PlanetData
import { Atmosphere } from './3d/Atmosphere' // Corrected import path

interface PlanetProps {
  planetData: PlanetData; // Pass the whole data object
  onPlanetClick: (planetData: PlanetData) => void; // Callback for click
  isPlaying: boolean; // Add isPlaying prop
  animationSpeed: number; // Add animationSpeed prop
}

// Wrap component logic in a function
const PlanetComponent = (
  { planetData, onPlanetClick, isPlaying, animationSpeed }: PlanetProps,
  ref: React.ForwardedRef<THREE.Mesh> // Add forwarded ref parameter
) => {
  // const meshRef = useRef<THREE.Mesh>(null!); // Use the forwarded ref instead

  const { size, name, color } = planetData;

  useFrame((state, delta) => {
    const mesh = ref && (ref as React.RefObject<THREE.Mesh>).current;
    if (!mesh || !isPlaying) return; // Check forwarded ref

    const effectiveDelta = delta * animationSpeed; // Apply speed multiplier

    // Keep Axial rotation (spinning)
    mesh.rotation.y += effectiveDelta * 0.2; // Use effectiveDelta
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onPlanetClick(planetData); // Call the callback with this planet's data
  };

  return (
    <mesh ref={ref} name={name} onClick={handleClick}> {/* Assign forwarded ref */}
      <sphereGeometry args={[size * 0.5, 32, 32]} /> {/* Use size from planetData */}
      <meshStandardMaterial color={color} /> {/* Use color from planetData */}
      {/* Conditionally render atmosphere for Earth */}
      {name === 'Earth' && <Atmosphere size={size} />}
    </mesh>
  )
}

// Export the component wrapped in forwardRef
export const Planet = forwardRef(PlanetComponent); 