'use client'

import React from 'react'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// GLSL Shader Code (embedded as strings)
const atmosphereVertexShader = `
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -modelViewPosition.xyz;
  vNormal = normalize(normalMatrix * normal);

  // Make atmosphere slightly larger and push it back slightly
  vec3 scaledPosition = position * 1.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(scaledPosition, 1.0);
}
`;

const atmosphereFragmentShader = `
uniform vec3 uGlowColor;
uniform float uIntensity;

varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(vViewPosition);

  // Fresnel effect calculation
  float fresnel = dot(normal, viewDirection);
  fresnel = pow(1.0 - abs(fresnel), 3.0); // Adjust power for falloff (use abs for back side)

  float alpha = smoothstep(0.0, 1.0, fresnel) * uIntensity;

  gl_FragColor = vec4(uGlowColor, alpha);
}
`;

// Create ShaderMaterial using drei helper
const AtmosphereMaterial = shaderMaterial(
  {
    uGlowColor: new THREE.Color(0x87CEEB), // Sky Blue
    uIntensity: 1.5,
  },
  atmosphereVertexShader,
  atmosphereFragmentShader,
  (material) => {
    if (material) {
      material.blending = THREE.AdditiveBlending;
      material.side = THREE.BackSide;
      material.transparent = true;
      material.depthWrite = false; // Don't obscure planet behind it
    }
  }
);

interface AtmosphereProps {
  size: number; // Receive planet size to scale atmosphere
}

export function Atmosphere({ size }: AtmosphereProps) {
  // Instantiate the material directly
  const material = React.useRef(new AtmosphereMaterial()); 

  return (
    <mesh scale={size * 0.5}> {/* Scale atmosphere based on planet size */}
      <sphereGeometry args={[1, 64, 64]} />
      {/* Use the instantiated material */}
      <primitive object={material.current} attach="material" />
    </mesh>
  );
} 