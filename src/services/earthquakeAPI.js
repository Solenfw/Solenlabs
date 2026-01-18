import axios from 'axios';

const BASE_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary';

// Available time ranges
export const TIME_RANGES = {
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

// Available magnitude thresholds
export const MAG_THRESHOLDS = {
  ALL: 'all',
  M1: '1.0',
  M2_5: '2.5',
  M4_5: '4.5',
  SIGNIFICANT: 'significant'
};

/**
 * Fetch earthquakes from USGS API
 * @param {string} timeRange - Time range (hour, day, week, month)
 * @param {string} magThreshold - Magnitude threshold (all, 1.0, 2.5, 4.5, significant)
 */
export const fetchEarthquakes = async (timeRange = TIME_RANGES.DAY, magThreshold = MAG_THRESHOLDS.ALL) => {
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
export const fetchEarthquakeDetails = async (detailUrl) => {
  try {
    const response = await axios.get(detailUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching earthquake details:', error);
    throw error;
  }
};