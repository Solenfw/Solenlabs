/**
 * Convert magnitude to color (green → yellow → orange → red)
 */
export const magnitudeToColor = (magnitude) => {
  if (magnitude < 2.5) return '#00ff00'; // Green - minor
  if (magnitude < 4.5) return '#ffff00'; // Yellow - light
  if (magnitude < 6.0) return '#ff9900'; // Orange - moderate
  if (magnitude < 7.0) return '#ff3300'; // Red-orange - strong
  return '#ff0000'; // Red - major
};

/**
 * Get magnitude category label
 */
export const getMagnitudeLabel = (magnitude) => {
  if (magnitude < 2.5) return 'Minor';
  if (magnitude < 4.5) return 'Light';
  if (magnitude < 6.0) return 'Moderate';
  if (magnitude < 7.0) return 'Strong';
  return 'Major';
};

/**
 * Convert magnitude to marker size scale
 */
export const magnitudeToSize = (magnitude) => {
  return Math.max(0.02, magnitude * 0.015);
};