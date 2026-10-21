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
    <aside className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-6 sticky top-20 shadow-sm transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-outline-light dark:border-outline-dark">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-900 dark:text-wa-green" />
          <h2 className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
            Parametric Finder
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] font-black text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
          title="Reset all filters"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-6 pt-5">
        
        {/* Search Input */}
        <div>
          <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 block mb-1.5 uppercase tracking-wider">
            Search Make / Model
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="e.g. Nexon, Ather, Hunter, Creta..."
            className="w-full bg-surface-subtle-light dark:bg-surface-subtle-dark border-2 border-outline-light dark:border-outline-dark rounded-xl px-3.5 py-2 text-xs font-semibold text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-wa-green transition"
          />
        </div>

        {/* Powertrain Filter */}
        <div>
          <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 flex items-center justify-between mb-2 uppercase tracking-wider">
            <span>Powertrain</span>
            {filters.powertrain === 'ev' && (
              <span className="text-[10px] font-black text-[#15803d] dark:text-wa-green flex items-center gap-0.5">
                <Zap className="h-2.5 w-2.5 fill-current" /> Zero Emission
              </span>
            )}
          </label>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            {(['all', 'ev', 'petrol'] as const).map((pt) => (
              <button
                key={pt}
                onClick={() => setFilters(prev => ({ ...prev, powertrain: pt }))}
                className={`py-2 rounded-xl border-2 text-center font-black capitalize transition ${
                  filters.powertrain === pt
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white shadow-sm'
                    : 'bg-surface-light dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 border-outline-light/40 dark:border-outline-dark hover:border-neutral-900'
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
            <label className="font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Max Budget</label>
            <span className="font-mono font-black text-neutral-900 dark:text-wa-green">
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
            className="w-full accent-neutral-900 dark:accent-wa-green h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-bold text-neutral-500 mt-1">
            <span>₹1L (Bikes)</span>
            <span>₹15L</span>
            <span>₹25L+</span>
          </div>
        </div>

        {/* Minimum Ground Clearance */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <label className="font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Min. Ground Clearance</label>
            <span className="font-mono font-black text-neutral-900 dark:text-wa-green">
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
            className="w-full accent-neutral-900 dark:accent-wa-green h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-bold text-neutral-500 mt-1">
            <span>140 mm</span>
            <span>180 mm</span>
            <span>210+ mm (SUV)</span>
          </div>
        </div>

        {/* Bike Seat Height */}
        {filters.category !== 'car' && (
          <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-3.5 rounded-2xl border-2 border-outline-light dark:border-outline-dark">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">Max Seat Height (Bikes)</label>
              <span className="font-mono font-black text-neutral-900 dark:text-wa-green">
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
              className="w-full accent-neutral-900 dark:accent-wa-green h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] font-medium text-neutral-600 dark:text-neutral-400 mt-1">
              Filter bikes for shorter rider comfort (&lt;790mm)
            </p>
          </div>
        )}

        {/* Safety Star Rating */}
        <div>
          <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 block mb-2 uppercase tracking-wider">
            Safety Rating (NCAP)
          </label>
          <div className="flex gap-1.5">
            {[0, 3, 4, 5].map((stars) => (
              <button
                key={stars}
                onClick={() => setFilters(prev => ({ ...prev, minNcapStars: stars }))}
                className={`flex-1 py-1.5 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-1 transition ${
                  filters.minNcapStars === stars
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white shadow-sm'
                    : 'bg-surface-light dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 border-outline-light/40 dark:border-outline-dark hover:border-neutral-900'
                }`}
              >
                {stars === 0 ? (
                  'All'
                ) : (
                  <>
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                    <span>{stars}★+</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div className="space-y-3 pt-3 border-t-2 border-outline-light dark:border-outline-dark">
          <label className="text-xs font-black text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
            Must-Have Features
          </label>

          <label className="flex items-center gap-3 text-xs font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.adasOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, adasOnly: e.target.checked }))}
              className="rounded-md border-2 border-outline-light dark:border-outline-dark text-wa-green focus:ring-0 h-4 w-4 cursor-pointer"
            />
            <span>Level 2 ADAS Available</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.ventilatedSeatsOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, ventilatedSeatsOnly: e.target.checked }))}
              className="rounded-md border-2 border-outline-light dark:border-outline-dark text-wa-green focus:ring-0 h-4 w-4 cursor-pointer"
            />
            <span>Ventilated Front Seats</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.sunroofOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, sunroofOnly: e.target.checked }))}
              className="rounded-md border-2 border-outline-light dark:border-outline-dark text-wa-green focus:ring-0 h-4 w-4 cursor-pointer"
            />
            <span>Sunroof / Glass Roof</span>
          </label>
        </div>

      </div>

      {/* Footer Match Counter */}
      <div className="mt-6 pt-4 border-t-2 border-outline-light dark:border-outline-dark flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
        <span className="flex items-center gap-1.5 font-bold">
          <Filter className="h-3.5 w-3.5 text-neutral-900 dark:text-wa-green" />
          <span>Matches:</span>
        </span>
        <span className="font-mono font-black text-neutral-950 dark:text-white bg-surface-subtle-light dark:bg-surface-subtle-dark border border-outline-light dark:border-outline-dark px-3 py-0.5 rounded-full">
          {totalMatches} vehicles
        </span>
      </div>

    </aside>
  );
};
