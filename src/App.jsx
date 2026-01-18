import { useState } from 'react';
import Globe from './components/Globe';
import { useEarthquakes } from './hooks/useEarthquakes';

function App() {
  const { earthquakes, loading, error } = useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  if (loading) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontSize: '24px'
      }}>
        Loading earthquake data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#000',
        color: '#f00',
        fontSize: '24px'
      }}>
        Error: {error}
      </div>
    );
  }

  return (
    <Globe 
      earthquakes={earthquakes} 
      onEarthquakeClick={setSelectedEarthquake}
      selectedEarthquake={selectedEarthquake}
    />
  );
}

export default App;