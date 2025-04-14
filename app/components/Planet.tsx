'use client'

import React, { useRef } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { PlanetData } from '../../data/planets' // Import PlanetData

interface PlanetProps {
  planetData: PlanetData; // Pass the whole data object
  onPlanetClick: (planetData: PlanetData) => void; // Callback for click
  isPlaying: boolean; // Add isPlaying prop
  animationSpeed: number; // Add animationSpeed prop
}

export function Planet({ planetData, onPlanetClick, isPlaying, animationSpeed }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const angleRef = useRef(Math.random() * Math.PI * 2) // Start at random position

  const { size, orbitalRadius, name, color } = planetData;

  useFrame((state, delta) => {
    if (!meshRef.current || !isPlaying) return; // Stop animation if not playing

    const effectiveDelta = delta * animationSpeed; // Apply speed multiplier

    // Orbital movement
    const speedFactor = 365.25 / planetData.orbitalPeriod; // Use period from data
    angleRef.current += speedFactor * effectiveDelta * 0.1 // Use effectiveDelta
    const x = Math.cos(angleRef.current) * orbitalRadius * 10 // Scale AU for visualization
    const z = Math.sin(angleRef.current) * orbitalRadius * 10 // Scale AU for visualization
    meshRef.current.position.set(x, 0, z)

    // Axial rotation (spinning)
    meshRef.current.rotation.y += effectiveDelta * 0.2; // Use effectiveDelta
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onPlanetClick(planetData); // Call the callback with this planet's data
  };

  return (
    <mesh ref={meshRef} name={name} onClick={handleClick}>
      <sphereGeometry args={[size * 0.5, 32, 32]} /> {/* Use size from planetData */}
      <meshStandardMaterial color={color} /> {/* Use color from planetData */}
    </mesh>
  )
} 