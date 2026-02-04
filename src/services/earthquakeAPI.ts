import axios from 'axios';
import { MAG_THRESHOLDS, TIME_RANGES } from '@constants/apis';
const BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

/**
 * Fetch earthquakes from USGS API
 * @param {string} timeRange - Time range (hour, day, week, month)
 * @param {string} magThreshold - Magnitude threshold (all, 1.0, 2.5, 4.5, significant)
 */
export const fetchEarthquakes = async (timeRange: string = TIME_RANGES.DAY, magThreshold: string = MAG_THRESHOLDS.ALL) => {
  try {
    const url = `${BASE_URL}/${magThreshold}_${timeRange}.geojson`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
};

/**
 * Fetch details for a specific earthquake
 * @param {string} detailUrl - Detail URL from earthquake feature
 */
export const fetchEarthquakeDetails = async (detailUrl : string) => {
  try {
    const response = await axios.get(detailUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching earthquake details:', error);
    throw error;
  }
};