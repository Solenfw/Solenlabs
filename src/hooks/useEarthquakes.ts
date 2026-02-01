import { useState, useEffect, useCallback } from 'react';
import { fetchEarthquakes, TIME_RANGES, MAG_THRESHOLDS } from '../services/earthquakeAPI.ts';

export const useEarthquakes = () => { 
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(TIME_RANGES.DAY);
  const [magThreshold, setMagThreshold] = useState(MAG_THRESHOLDS.ALL);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadEarthquakes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchEarthquakes(timeRange, magThreshold);
      setEarthquakes(data.features || []);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange, magThreshold]);

  useEffect(() => {
    loadEarthquakes();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(loadEarthquakes, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [loadEarthquakes]);

  return {
    earthquakes,
    loading,
    error,
    timeRange,
    magThreshold,
    lastUpdated,
    setTimeRange,
    setMagThreshold,
    refresh: loadEarthquakes
  };
};