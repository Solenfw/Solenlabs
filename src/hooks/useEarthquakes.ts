import { useState, useCallback } from 'react';
import { TIME_RANGES, MAG_THRESHOLDS } from '@constants/api_constants';
import { fetchEarthquakes } from '@services/earthquakeAPI';

export const useEarthquakes = () => { 
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);  // ✅ Changed to false initially
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