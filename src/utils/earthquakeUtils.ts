import * as THREE from 'three';
import { format } from 'date-fns';
import { registerMesh } from '@utils/performRayCast';

/**
 * Convert lat/lon to 3D sphere coordinates
 */
export const latLonToVector3 = (lat : number, lon: number, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return { x, y, z };
};

/**
 * Format earthquake time
 */
export const formatEarthquakeTime = (timestamp: number) => {
  return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
};

/**
 * Calculate time ago from timestamp
 */
export const timeAgo = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

 /**
 * Earthquake points on globe - Spherical shape
 */
export const drawEarthQuakePoint = (lat: number, lon: number, eqId: string, options = {size: 0.01, color: 0xff0000}) => {
  const { x, y, z } = latLonToVector3(lat, lon, 1.08); // Slightly above the Earth surface

  const geometry = new THREE.IcosahedronGeometry(options.size, 4);
  const material = new THREE.MeshBasicMaterial({ color: options.color }); // Use the passed-in color
  
  const pointMesh = new THREE.Mesh(geometry, material);
  pointMesh.position.set(x, y, z);
  
  pointMesh.name = `quake-${lat}-${lon}`;
  
  // register for ray-casting
  registerMesh(eqId, pointMesh);
  return pointMesh;
}