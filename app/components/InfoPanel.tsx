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
      className={`fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${planet ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold"
      >
        &times; {/* Close button */}
      </button>
      <h2 className="text-2xl font-bold mb-4">{planet.name}</h2>
      <div className="grid grid-cols-2 gap-4">
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