'use client';

import { useState } from 'react';

export default function Controls() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(5);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Speed: {speed}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-32"
            />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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