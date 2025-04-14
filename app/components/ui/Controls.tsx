'use client';

import { useState } from 'react';

export default function Controls() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(5);

  return (
    <div className="rounded-lg bg-black/80 backdrop-blur-md border border-gray-600 shadow-xl p-3 w-44">
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full px-2.5 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <div className="flex flex-col space-y-1.5">
          <span className="text-xs text-white font-medium">Speed: {speed}</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <button
          className="w-full px-2.5 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm font-medium"
          onClick={() => {
            // Reset camera functionality would go here
            console.log('Reset camera clicked');
          }}
        >
          Reset Camera
        </button>
      </div>
    </div>
  );
} 