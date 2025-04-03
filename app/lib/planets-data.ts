export interface PlanetData {
  id: string;
  name: string;
  diameter: number; // km
  distance: number; // AU (Astronomical Units)
  yearLength: number; // Earth days
  moons: number;
  texture: string;
  size: number; // Relative size for our visualization
  color: string; // Color for orbit line
}

// Not to true scale to keep visualization manageable
const planetData: PlanetData[] = [
  {
    id: "sun",
    name: "Sun",
    diameter: 1392700,
    distance: 0,
    yearLength: 0,
    moons: 0,
    texture: "/textures/2k_sun.jpg",
    size: 5,
    color: "#ffd700",
  },
  {
    id: "mercury",
    name: "Mercury",
    diameter: 4879,
    distance: 0.39,
    yearLength: 88,
    moons: 0,
    texture: "/textures/2k_mercury.jpg",
    size: 0.8,
    color: "#bdc3c7",
  },
  {
    id: "venus",
    name: "Venus",
    diameter: 12104,
    distance: 0.72,
    yearLength: 225,
    moons: 0,
    texture: "/textures/2k_venus_atmosphere.jpg",
    size: 1.1,
    color: "#f39c12",
  },
  {
    id: "earth",
    name: "Earth",
    diameter: 12756,
    distance: 1,
    yearLength: 365,
    moons: 1,
    texture: "/textures/2k_earth_daymap.jpg",
    size: 1.2,
    color: "#3498db",
  },
  {
    id: "mars",
    name: "Mars",
    diameter: 6792,
    distance: 1.52,
    yearLength: 687,
    moons: 2,
    texture: "/textures/2k_mars.jpg",
    size: 0.9,
    color: "#e74c3c",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    diameter: 142984,
    distance: 5.2,
    yearLength: 4333,
    moons: 79,
    texture: "/textures/2k_jupiter.jpg",
    size: 3.5,
    color: "#e67e22",
  },
  {
    id: "saturn",
    name: "Saturn",
    diameter: 120536,
    distance: 9.5,
    yearLength: 10759,
    moons: 82,
    texture: "/textures/2k_saturn.jpg",
    size: 3,
    color: "#f1c40f",
  },
  {
    id: "uranus",
    name: "Uranus",
    diameter: 51118,
    distance: 19.2,
    yearLength: 30687,
    moons: 27,
    texture: "/textures/2k_uranus.jpg",
    size: 2,
    color: "#1abc9c",
  },
  {
    id: "neptune",
    name: "Neptune",
    diameter: 49528,
    distance: 30.1,
    yearLength: 60190,
    moons: 14,
    texture: "/textures/2k_neptune.jpg",
    size: 2,
    color: "#3498db",
  },
];

export default planetData; 