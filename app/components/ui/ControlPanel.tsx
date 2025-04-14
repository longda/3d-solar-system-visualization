'use client'

import React from 'react';

interface ControlPanelProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  animationSpeed: number;
  onSpeedChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ControlPanel({ 
  isPlaying, 
  onTogglePlayPause, 
  animationSpeed, 
  onSpeedChange 
}: ControlPanelProps) {
  return (
    <div 
      style={{
        position: 'fixed', 
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 20, 
        backgroundColor: 'rgba(31, 41, 55, 0.5)'
      }}
      className="text-white p-3 sm:p-4 rounded-lg shadow-md w-48 sm:w-64"
    >
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Controls</h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 sm:mb-3">
        <button 
          style={{ 
            backgroundColor: '#3B82F6',
            borderRadius: '0.375rem',
            border: '1px solid transparent'
          }}
          className="px-3 py-1 text-white text-sm w-full sm:w-20 mb-2 sm:mb-0"
          onClick={onTogglePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="flex flex-col">
        <label htmlFor="speedSlider" className="text-xs sm:text-sm mb-1">Speed: {animationSpeed.toFixed(1)}x</label>
        <input 
          type="range" 
          id="speedSlider"
          min="0.1" 
          max="10" 
          step="0.1" 
          value={animationSpeed}
          onChange={onSpeedChange}
          style={{ backgroundColor: '#4B5563' }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
} 