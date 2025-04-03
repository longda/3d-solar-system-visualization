'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR for the 3D components
const SolarSystem = dynamic(() => import('./components/3d/SolarSystem'), { ssr: false });
const Controls = dynamic(() => import('./components/ui/Controls'), { ssr: false });

export default function SolarSystemPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8 pt-8">3D Solar System Visualization</h1>
      <div className="text-center mb-8">
        <p className="mb-4">Interactive 3D visualization of our solar system</p>
        <p className="text-sm text-gray-500">Built with Next.js, Three.js, and React Three Fiber</p>
      </div>
      <div className="w-full max-w-6xl h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg mb-20 overflow-hidden">
        <SolarSystem />
      </div>
      <Controls />
    </main>
  );
} 