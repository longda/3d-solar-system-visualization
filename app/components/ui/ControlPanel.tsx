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
    <div className="fixed top-4 left-4 bg-gray-700 bg-opacity-80 text-white p-4 rounded-lg shadow-md z-10 w-64">
      <h3 className="text-lg font-semibold mb-3">Controls</h3>
      <div className="flex items-center space-x-2 mb-3">
        <button 
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm w-20"
          onClick={onTogglePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="flex flex-col">
        <label htmlFor="speedSlider" className="text-sm mb-1">Speed: {animationSpeed.toFixed(1)}x</label>
        <input 
          type="range" 
          id="speedSlider"
          min="0.1" 
          max="10" 
          step="0.1" 
          value={animationSpeed}
          onChange={onSpeedChange}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
} 