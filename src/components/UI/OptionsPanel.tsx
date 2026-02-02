import { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { MAG_THRESHOLDS, TIME_RANGES } from '@constants/api_constants';


interface OptionsPanelProps {
  earthquakeData: ReturnType<typeof import('@hooks/useEarthquakes').useEarthquakes>;
}

const OptionsPanel = ({ earthquakeData }: OptionsPanelProps) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const {
        earthquakes,
        loading,
        timeRange,
        magThreshold,
        lastUpdated,
        setTimeRange,
        setMagThreshold,
        refresh
    } = earthquakeData;

    const timeRangeOptions = [
        { label: 'Past Hour', value: TIME_RANGES.HOUR },
        { label: 'Past Day', value: TIME_RANGES.DAY },
        { label: 'Past Week', value: TIME_RANGES.WEEK },
        { label: 'Past Month', value: TIME_RANGES.MONTH },
    ];
  
    const magnitudeOptions = [
        { label: 'All Magnitudes', value: MAG_THRESHOLDS.ALL },
        { label: 'M1.0+', value: MAG_THRESHOLDS.M1 },
        { label: 'M2.5+', value: MAG_THRESHOLDS.M2_5 },
        { label: 'M4.5+', value: MAG_THRESHOLDS.M4_5 },
        { label: 'Significant', value: MAG_THRESHOLDS.SIGNIFICANT },
    ];

    const formatLastUpdated = () => {
        if (!lastUpdated) return 'Never';
        const now = new Date();
        const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
        
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
    };

    return (
        <>
        {/* Sliding Panel */}
        <div 
            className={`absolute top-0 right-0 h-full bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 transition-transform duration-300 ease-in-out z-10 ${
            isPanelOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ width: '320px' }}
        >
            {/* Toggle Button */}
            <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-gray-900/95 hover:bg-gray-800 text-white p-2.5 rounded-l-lg border border-r-0 border-gray-700/50 transition-all hover:shadow-lg"
            aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
            >
            {isPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {/* Panel Content */}
            <div className="p-6 h-full overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Earthquake Data</h2>
                <button
                onClick={refresh}
                disabled={loading}
                className={`p-2 rounded-lg transition-all ${
                    loading 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-label="Refresh data"
                >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>
            
            {/* Time Range Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                Time Range
                </label>
                <div className="space-y-2">
                {timeRangeOptions.map(option => (
                    <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    disabled={loading}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all font-medium ${
                        timeRange === option.value
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            </div>

            {/* Magnitude Filter Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                Minimum Magnitude
                </label>
                <div className="space-y-2">
                {magnitudeOptions.map(option => (
                    <button
                    key={option.value}
                    onClick={() => setMagThreshold(option.value)}
                    disabled={loading}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all font-medium ${
                        magThreshold === option.value
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            </div>

            {/* Info Display */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Active Earthquakes:</span>
                    <span className="text-sm text-white font-semibold">
                    {loading ? '...' : earthquakes.length}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Data Source:</span>
                    <span className="text-sm text-white">USGS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Last Updated:</span>
                    <span className="text-sm text-white">{formatLastUpdated()}</span>
                </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                <h3 className="text-xs font-semibold text-gray-300 mb-2">Magnitude Scale</h3>
                <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                    <span>M1.0 - M2.5</span>
                    <span className="text-green-400">Minor</span>
                </div>
                <div className="flex justify-between">
                    <span>M2.5 - M4.5</span>
                    <span className="text-yellow-400">Light</span>
                </div>
                <div className="flex justify-between">
                    <span>M4.5 - M6.0</span>
                    <span className="text-orange-400">Moderate</span>
                </div>
                <div className="flex justify-between">
                    <span>M6.0+</span>
                    <span className="text-red-400">Strong+</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
};

export default OptionsPanel;