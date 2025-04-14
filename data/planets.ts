export interface PlanetData {
  name: string;
  size: number; // Relative to Earth size = 1
  color: string;
  orbitalRadius: number; // Mean distance in AU
  orbitalPeriod: number; // In Earth days
}

export const planets: PlanetData[] = [
  {
    name: 'Mercury',
    size: 0.383,
    color: '#8C8C8C', // Gray
    orbitalRadius: 0.387,
    orbitalPeriod: 87.97,
  },
  {
    name: 'Venus',
    size: 0.949,
    color: '#FFA500', // Orange
    orbitalRadius: 0.723,
    orbitalPeriod: 224.70,
  },
  {
    name: 'Earth',
    size: 1,
    color: '#0077BE', // Blue
    orbitalRadius: 1,
    orbitalPeriod: 365.25,
  },
  {
    name: 'Mars',
    size: 0.532,
    color: '#FF4500', // Red-Orange
    orbitalRadius: 1.524,
    orbitalPeriod: 686.98,
  },
  {
    name: 'Jupiter',
    size: 11.21,
    color: '#FFD700', // Gold/Yellow
    orbitalRadius: 5.204,
    orbitalPeriod: 4332.59,
  },
  {
    name: 'Saturn',
    size: 9.45,
    color: '#F4A460', // Sandy Brown
    orbitalRadius: 9.582,
    orbitalPeriod: 10759.22,
  },
  {
    name: 'Uranus',
    size: 4.01,
    color: '#ADD8E6', // Light Blue
    orbitalRadius: 19.218,
    orbitalPeriod: 30688.5,
  },
  {
    name: 'Neptune',
    size: 3.88,
    color: '#00008B', // Dark Blue
    orbitalRadius: 30.11,
    orbitalPeriod: 60182,
  },
]; 