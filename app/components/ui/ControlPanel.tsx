'use client'

import React from 'react';

interface ControlPanelProps {
  isPlaying: boolean;
  onTogglePlayPause: () => void;
}

export function ControlPanel({ isPlaying, onTogglePlayPause }: ControlPanelProps) {
  return (
    <div className="fixed top-4 left-4 bg-gray-700 bg-opacity-80 text-white p-4 rounded-lg shadow-md z-10">
      <h3 className="text-lg font-semibold mb-2">Controls</h3>
      <div className="flex space-x-2">
        <button 
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm w-20"
          onClick={onTogglePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {/* Speed slider will be added later */}
      </div>
    </div>
  );
} 