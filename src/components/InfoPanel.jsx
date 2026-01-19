import { useState, useEffect } from 'react';
import { getEarthquakeStats } from '../utils/earthquakeUtils';
import { format } from 'date-fns';

const InfoPanel = ({ earthquakes, lastUpdated, onRefresh, loading }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (earthquakes && earthquakes.length > 0) {
      const calculatedStats = getEarthquakeStats(earthquakes);
      setStats(calculatedStats);
    }
  }, [earthquakes]);

  if (!stats) {
    return (
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-6 rounded-lg w-80 backdrop-blur-sm">
        <div className="text-xl font-bold mb-4">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-6 rounded-lg w-80 backdrop-blur-sm border border-gray-700 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-400">Earthquake Data</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm transition"
          title="Refresh data"
        >
          {loading ? '⟳' : '↻'}
        </button>
      </div>

      {/* Total Count */}
      <div className="mb-6 p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
        <div className="text-gray-400 text-sm uppercase tracking-wide">Total Earthquakes</div>
        <div className="text-5xl font-bold text-blue-300">{stats.total}</div>
      </div>

      {/* Strongest Earthquake */}
      {stats.strongest && (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-40 rounded-lg border border-red-700">
          <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Strongest</div>
          <div className="text-3xl font-bold text-red-300 mb-1">
            M {stats.strongest.properties.mag.toFixed(1)}
          </div>
          <div className="text-sm text-gray-300 line-clamp-2">
            {stats.strongest.properties.place}
          </div>
        </div>
      )}

      {/* Average Magnitude */}
      <div className="mb-6 p-3 bg-gray-800 rounded-lg">
        <div className="text-gray-400 text-sm">Average Magnitude</div>
        <div className="text-2xl font-bold text-yellow-400">M {stats.averageMag}</div>
      </div>

      {/* Breakdown by Category */}
      <div className="mb-6">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-3">By Magnitude</div>
        <div className="space-y-2">
          <MagnitudeBar 
            label="Minor (< 2.5)" 
            count={stats.byMagnitude.minor} 
            color="bg-green-500"
            total={stats.total}
          />
          <MagnitudeBar 
            label="Light (2.5-4.5)" 
            count={stats.byMagnitude.light} 
            color="bg-yellow-500"
            total={stats.total}
          />
          <MagnitudeBar 
            label="Moderate (4.5-6.0)" 
            count={stats.byMagnitude.moderate} 
            color="bg-orange-500"
            total={stats.total}
          />
          <MagnitudeBar 
            label="Strong (6.0-7.0)" 
            count={stats.byMagnitude.strong} 
            color="bg-red-500"
            total={stats.total}
          />
          <MagnitudeBar 
            label="Major (7.0+)" 
            count={stats.byMagnitude.major} 
            color="bg-red-700"
            total={stats.total}
          />
        </div>
      </div>

      {/* Color Legend */}
      <div className="mb-6 p-3 bg-gray-800 rounded-lg">
        <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Marker Colors</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Green: Minor (&lt; 2.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Yellow: Light (2.5-4.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Orange: Moderate (4.5-6.0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Red: Strong (6.0+)</span>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 text-center border-t border-gray-700 pt-3">
          Last updated: {format(lastUpdated, 'MMM dd, HH:mm:ss')}
        </div>
      )}
    </div>
  );
};

// Helper component for magnitude breakdown bars
const MagnitudeBar = ({ label, count, color, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span>{count}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`${color} h-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default InfoPanel;