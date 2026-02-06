import { EarthquakeContextData } from '@types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const InfoPanel = ({ earthquakes, loading, error, lastUpdated }: EarthquakeContextData) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    return (
        <div 
            className={`fixed top-0 left-0 h-full flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-r border-slate-700/30 shadow-2xl transition-transform duration-500 ease-out z-50
                ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ width: '380px' }}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="absolute -right-12 top-15 bg-linear-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-100 p-3 rounded-r-xl border border-l-0 border-slate-600/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(148,163,184,0.3)] hover:translate-x-1 group"
                aria-label={isPanelOpen ? 'Close panel' : 'Open panel'}
            >   
                {isPanelOpen ? (
                    <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
                ) : (
                    <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
                )}
            </button>

            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-800/50 bg-linear-to-r from-slate-900/50 to-transparent shrink-0">
                <h2 className="text-2xl font-bold tracking-tight bg-linear-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Live Earthquakes
                </h2>
                {lastUpdated && (
                    <p className="text-xs text-slate-500 mt-2 font-medium">
                        Last updated {lastUpdated.toLocaleTimeString()}
                    </p>
                )}
            </div>

            {/* Status Messages */}
            {loading && (
                <div className="px-6 py-4 text-sm text-slate-400 flex items-center gap-2 shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Loading earthquake data…
                </div>
            )}
            {error && (
                <div className="mx-6 my-4 px-4 py-3 bg-red-950/30 border border-red-800/30 rounded-lg text-sm text-red-400 shrink-0">
                    {error}
                </div>
            )}

            {/* Earthquake List */}
            <ul className="flex-1 min-h-0 overflow-y-auto px-3 py-2 space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                {earthquakes.map((eq) => {
                    const { mag, place, time, magType } = eq.properties;
                    
                    const getMagStyle = (mag : number) => {
                        if (mag >= 6) return 'from-red-600 to-red-700 text-white shadow-red-500/50';
                        if (mag >= 5) return 'from-orange-600 to-orange-700 text-white shadow-orange-500/50';
                        if (mag >= 4) return 'from-yellow-600 to-yellow-700 text-white shadow-yellow-500/50';
                        return 'from-emerald-600 to-emerald-700 text-white shadow-emerald-500/50';
                    };

                    return (
                        <li
                            key={eq.id}
                            className="group bg-slate-900/40 hover:bg-slate-800/60 rounded-xl p-4 cursor-pointer transition-all duration-300 border border-slate-800/30 hover:border-slate-700/50 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-0.5"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${getMagStyle(mag)} flex items-center justify-center font-bold text-lg shadow-lg transition-transform group-hover:scale-110`}>
                                    {mag !== null ? mag.toFixed(1) : '–'}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-white transition-colors">
                                        {place || 'Unknown location'}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1.5 font-medium">
                                        {new Date(time).toLocaleString()}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3 text-xs">
                                        <span className="px-2 py-0.5 bg-slate-800/60 text-slate-400 rounded-md border border-slate-700/30">
                                            {magType ?? 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
                
                {!loading && earthquakes.length === 0 && (
                    <li className="px-6 py-12 text-center">
                        <div className="text-slate-600 text-4xl mb-3">🌍</div>
                        <p className="text-sm text-slate-500">No earthquakes detected</p>
                    </li>
                )}
            </ul>
        </div>
    );
};
