import { useState } from 'react';
import Globe from './components/Globe';
import InfoPanel from './components/InfoPanel';
import { useEarthquakes } from './hooks/useEarthquakes';

function App() {
  const { earthquakes, loading, error, lastUpdated, refresh } = useEarthquakes();
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

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
        <button 
          onClick={refresh}
          style={{ 
            marginLeft: '20px', 
            padding: '10px 20px', 
            background: '#3b82f6',
            border: 'none',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Globe 
        earthquakes={earthquakes} 
        onEarthquakeClick={setSelectedEarthquake}
        selectedEarthquake={selectedEarthquake}
      />
      
      <InfoPanel 
        earthquakes={earthquakes}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
        loading={loading}
      />
    </div>
  );
}

export default App;