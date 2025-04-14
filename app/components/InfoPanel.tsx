'use client'

import React from 'react';
import { PlanetData } from '../../data/planets'; // Assuming PlanetData is exported from planets.ts

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export function InfoPanel({ planet, onClose }: InfoPanelProps) {
  if (!planet) {
    return null; // Don't render if no planet is selected
  }

  return (
    <div 
      style={{ 
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        zIndex: 10,
        maxHeight: '35vh',
        overflowY: 'auto'
      }}
      className={`text-white px-6 sm:px-8 py-4 sm:py-6 shadow-lg transform transition-transform duration-300 ease-in-out ${planet ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-4 sm:mt-6">{planet.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base">
        <div>
          <p><span className="font-semibold">Size (vs Earth):</span> {planet.size.toFixed(3)}</p>
          <p><span className="font-semibold">Color:</span> <span style={{ display: 'inline-block', width: '1rem', height: '1rem', backgroundColor: planet.color, borderRadius: '50%', verticalAlign: 'middle', marginRight: '0.5rem' }}></span>{planet.color}</p>
        </div>
        <div>
          <p><span className="font-semibold">Mean Orbital Radius:</span> {planet.orbitalRadius.toFixed(3)} AU</p>
          <p><span className="font-semibold">Orbital Period:</span> {planet.orbitalPeriod.toFixed(2)} Earth Days</p>
        </div>
      </div>
      {/* Add more details as needed */}
    </div>
  );
} 