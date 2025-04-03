'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

// Use dynamic import with no SSR for the 3D components
const SolarSystem = dynamic(() => import('./components/3d/SolarSystem'), { ssr: false });
const Controls = dynamic(() => import('./components/ui/Controls'), { ssr: false });

// Loading component
function LoadingScreen() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading Solar System...</p>
      </div>
    </div>
  );
}

export default function SolarSystemPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative">
      <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            3D Solar System Visualization
          </h1>
          <p className="text-center text-gray-300 mt-2 mb-2">
            Interactive 3D visualization of our solar system
          </p>
        </div>
      </div>
      
      <div className="w-full h-screen pt-20">
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <SolarSystem />
          </Suspense>
        </ErrorBoundary>
      </div>
      
      <Controls />
    </main>
  );
} 