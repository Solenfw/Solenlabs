import * as THREE from 'three';
import { format } from 'date-fns';

/**
 * Convert lat/lon to 3D sphere coordinates
 */
export const latLonToVector3 = (lat, lon, radius = 2) => {
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
export const formatEarthquakeTime = (timestamp) => {
  return format(new Date(timestamp), 'MMM dd, yyyy HH:mm:ss');
};

/**
 * Calculate time ago from timestamp
 */
export const timeAgo = (timestamp) => {
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
 * Get statistics from earthquake data
 */
export const getEarthquakeStats = (earthquakes) => {
  if (!earthquakes || earthquakes.length === 0) {
    return {
      total: 0,
      strongest: null,
      averageMag: 0,
      byMagnitude: { minor: 0, light: 0, moderate: 0, strong: 0, major: 0 }
    };
  }

  const magnitudes = earthquakes.map(eq => eq.properties.mag).filter(m => m !== null);
  const strongest = earthquakes.reduce((max, eq) => 
    eq.properties.mag > (max?.properties.mag || 0) ? eq : max
  , null);

  const byMagnitude = {
    minor: earthquakes.filter(eq => eq.properties.mag < 2.5).length,
    light: earthquakes.filter(eq => eq.properties.mag >= 2.5 && eq.properties.mag < 4.5).length,
    moderate: earthquakes.filter(eq => eq.properties.mag >= 4.5 && eq.properties.mag < 6.0).length,
    strong: earthquakes.filter(eq => eq.properties.mag >= 6.0 && eq.properties.mag < 7.0).length,
    major: earthquakes.filter(eq => eq.properties.mag >= 7.0).length
  };

  return {
    total: earthquakes.length,
    strongest,
    averageMag: (magnitudes.reduce((sum, mag) => sum + mag, 0) / magnitudes.length).toFixed(2),
    byMagnitude
  };
};

// Add a marker at a location
export function addMarker(lat, lon, earthGroup) {
  const markerGeometry = new THREE.SphereGeometry(0.02, 8, 8);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  
  // Position on globe surface (radius = 1)
  const position = latLonToVector3(lat, lon, 1.02); // 1.02 to sit above surface
  marker.position.copy(position);
  
  earthGroup.add(marker);
  return marker;
}