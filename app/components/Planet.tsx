'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PlanetProps {
  name: string
  size: number // Relative to Earth size=1
  color: string
  orbitalRadius: number // In AU
  orbitalSpeed: number // Arbitrary speed factor
}

export function Planet({ name, size, color, orbitalRadius, orbitalSpeed }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const angleRef = useRef(Math.random() * Math.PI * 2) // Start at random position

  useFrame((state, delta) => {
    if (meshRef.current) {
      angleRef.current += orbitalSpeed * delta * 0.1 // Adjust speed multiplier as needed
      const x = Math.cos(angleRef.current) * orbitalRadius * 10 // Scale AU for visualization
      const z = Math.sin(angleRef.current) * orbitalRadius * 10 // Scale AU for visualization
      meshRef.current.position.set(x, 0, z)
    }
  })

  return (
    <mesh ref={meshRef} name={name}>
      <sphereGeometry args={[size * 0.5, 32, 32]} /> {/* Scale size for visualization */}
      <meshStandardMaterial color={color} />
    </mesh>
  )
} 