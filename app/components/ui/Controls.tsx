'use client';

import { useState } from 'react';

export default function Controls() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(5);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-black/80 backdrop-blur-sm border-t border-gray-700 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-white">Speed: {speed}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-24 h-2"
            />
          </div>
        </div>
        <button
          className="px-3 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
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