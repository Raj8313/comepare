import React from 'react';
import { Filter, SlidersHorizontal, ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import { PowertrainType, VehicleCategory } from '../types/vehicle';

export interface FilterState {
  searchQuery: string;
  category: VehicleCategory | 'all';
  powertrain: PowertrainType | 'all';
  maxPriceLakh: number;
  minGroundClearanceMm: number;
  maxSeatHeightMm: number;
  minNcapStars: number;
  adasOnly: boolean;
  ventilatedSeatsOnly: boolean;
  sunroofOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  totalMatches: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onReset,
  totalMatches,
}) => {
  return (
    <aside className="bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 backdrop-blur-md sticky top-20 shadow-sm dark:shadow-none transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Parametric Finder
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition"
          title="Reset all filters"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-6 pt-5">
        
        {/* Search Input */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Search Make / Model
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="e.g. Nexon, Ather, Hunter, Creta..."
            className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
          />
        </div>

        {/* Powertrain Filter */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-2">
            <span>Powertrain</span>
            {filters.powertrain === 'ev' && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5" /> Zero Emission
              </span>
            )}
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(['all', 'ev', 'petrol'] as const).map((pt) => (
              <button
                key={pt}
                onClick={() => setFilters(prev => ({ ...prev, powertrain: pt }))}
                className={`py-1.5 rounded-lg border text-center font-bold capitalize transition ${
                  filters.powertrain === pt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-100/70 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {pt === 'all' ? 'Any' : pt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Max Price Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Max Budget</label>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {filters.maxPriceLakh >= 25 ? '₹25L+' : `₹${filters.maxPriceLakh} Lakh`}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={filters.maxPriceLakh}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPriceLakh: Number(e.target.value) }))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            <span>₹1L (Bikes)</span>
            <span>₹15L</span>
            <span>₹25L+</span>
          </div>
        </div>

        {/* Minimum Ground Clearance */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Min. Ground Clearance</label>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {filters.minGroundClearanceMm === 0 ? 'Any' : `≥ ${filters.minGroundClearanceMm} mm`}
            </span>
          </div>
          <input
            type="range"
            min="140"
            max="215"
            step="5"
            value={filters.minGroundClearanceMm}
            onChange={(e) => setFilters(prev => ({ ...prev, minGroundClearanceMm: Number(e.target.value) }))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
            <span>140 mm</span>
            <span>180 mm</span>
            <span>210+ mm (SUV)</span>
          </div>
        </div>

        {/* Bike Seat Height (Special 2W Ergonomics) */}
        {filters.category !== 'car' && (
          <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Max Seat Height (Bikes)</label>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {filters.maxSeatHeightMm >= 850 ? 'Any' : `≤ ${filters.maxSeatHeightMm} mm`}
              </span>
            </div>
            <input
              type="range"
              min="760"
              max="850"
              step="10"
              value={filters.maxSeatHeightMm}
              onChange={(e) => setFilters(prev => ({ ...prev, maxSeatHeightMm: Number(e.target.value) }))}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              Filter bikes for shorter rider comfort (&lt;790mm)
            </p>
          </div>
        )}

        {/* Safety Star Rating */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Safety Rating (NCAP)
          </label>
          <div className="flex gap-1.5">
            {[0, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() => setFilters(prev => ({ ...prev, minNcapStars: stars }))}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1 transition ${
                  filters.minNcapStars === stars
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-100/70 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {stars === 0 ? (
                  'All'
                ) : (
                  <>
                    <ShieldCheck className="h-3 w-3 text-amber-500" />
                    <span>{stars}★+</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Must-Have Features
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
            <input
              type="checkbox"
              checked={filters.adasOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, adasOnly: e.target.checked }))}
              className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0 h-4 w-4"
            />
            <span>Level 2 ADAS Available</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
            <input
              type="checkbox"
              checked={filters.ventilatedSeatsOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, ventilatedSeatsOnly: e.target.checked }))}
              className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0 h-4 w-4"
            />
            <span>Ventilated Front Seats</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
            <input
              type="checkbox"
              checked={filters.sunroofOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, sunroofOnly: e.target.checked }))}
              className="rounded bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-0 h-4 w-4"
            />
            <span>Sunroof / Glass Roof</span>
          </label>
        </div>

      </div>

      {/* Footer Match Counter */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <Filter className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Matches:</span>
        </span>
        <span className="font-mono font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
          {totalMatches} vehicles
        </span>
      </div>

    </aside>
  );
};
