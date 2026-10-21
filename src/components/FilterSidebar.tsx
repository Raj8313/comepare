import React from 'react';
import { Filter, SlidersHorizontal, Zap, RotateCcw, Fuel, Disc, Star, Sparkles } from 'lucide-react';
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
    <aside className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl p-6 sm:p-7 sticky top-24 shadow-soft-lift dark:shadow-soft-lift-dark transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-borderLine-light dark:border-borderLine-dark">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 transition-colors duration-300" style={{ color: 'var(--pt-accent-text)' }} />
          <h2 className="text-xs font-bold text-content-primary uppercase tracking-wider">
            Parametric Finder
          </h2>
        </div>
        <button
          onClick={onReset}
          aria-label="Reset all search filters"
          className="flex items-center gap-1.5 text-xs font-semibold text-content-tertiary hover:text-content-primary transition px-2.5 py-1 rounded-lg hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark"
          title="Reset all filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-7 pt-6">
        
        {/* Search Input */}
        <div>
          <label htmlFor="search-input" className="text-xs font-bold text-content-tertiary block mb-2 uppercase tracking-wider">
            Search Make / Model
          </label>
          <input
            id="search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="e.g. Nexon, Creta, Hunter..."
            className="w-full bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark rounded-xl px-4 py-2.5 text-sm font-medium text-content-primary placeholder:text-content-tertiary focus:outline-none transition"
            style={{
              borderColor: filters.searchQuery ? 'var(--pt-accent)' : undefined,
            }}
          />
        </div>

        {/* Powertrain Dynamic Theme Switcher Buttons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-content-tertiary uppercase tracking-wider">
              Fuel / Powertrain
            </span>
            {filters.powertrain === 'all' && (
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                <Sparkles className="h-3.5 w-3.5" /> All Blue
              </span>
            )}
            {filters.powertrain === 'ev' && (
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                <Zap className="h-3.5 w-3.5 fill-current" /> EV Green
              </span>
            )}
            {filters.powertrain === 'petrol' && (
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                <Fuel className="h-3.5 w-3.5" /> Petrol Yellow
              </span>
            )}
            {filters.powertrain === 'diesel' && (
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                <Disc className="h-3.5 w-3.5" /> Diesel Steel
              </span>
            )}
          </div>

          <div role="group" aria-label="Powertrain driving mode" className="grid grid-cols-4 gap-2 text-xs font-bold">
            {(['all', 'ev', 'petrol', 'diesel'] as const).map((pt) => {
              const isSelected = filters.powertrain === pt;
              return (
                <button
                  key={pt}
                  onClick={() => setFilters(prev => ({ ...prev, powertrain: pt }))}
                  aria-pressed={isSelected}
                  className={`py-2 rounded-xl border text-center capitalize transition-all duration-300 ${
                    isSelected
                      ? 'shadow-sm font-black'
                      : 'bg-surface-light dark:bg-surface-dark text-content-secondary border-borderLine-light dark:border-borderLine-dark hover:border-borderLine-strong-light dark:hover:border-borderLine-strong-dark'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--pt-accent)' : undefined,
                    color: isSelected ? 'var(--pt-on-accent)' : undefined,
                    borderColor: isSelected ? 'var(--pt-accent)' : undefined,
                  }}
                >
                  {pt === 'all' ? 'All' : pt === 'ev' ? 'EV' : pt === 'petrol' ? 'Petrol' : 'Diesel'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Max Price Slider */}
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <label htmlFor="max-price-slider" className="font-bold text-content-tertiary uppercase tracking-wider">Max Budget</label>
            <span className="font-mono font-bold text-xs transition-colors duration-300" style={{ color: 'var(--pt-accent-text)' }}>
              {filters.maxPriceLakh >= 25 ? '₹25L+' : `₹${filters.maxPriceLakh} Lakh`}
            </span>
          </div>
          <input
            id="max-price-slider"
            type="range"
            min="1"
            max="25"
            step="1"
            value={filters.maxPriceLakh}
            aria-valuemin={1}
            aria-valuemax={25}
            aria-valuenow={filters.maxPriceLakh}
            aria-valuetext={filters.maxPriceLakh >= 25 ? 'Maximum budget 25 Lakh Rupees or above' : `Maximum budget ${filters.maxPriceLakh} Lakh Rupees`}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPriceLakh: Number(e.target.value) }))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer transition-colors duration-300"
            style={{ accentColor: 'var(--pt-accent)' }}
          />
          <div className="flex justify-between text-xs font-medium text-content-tertiary mt-1.5">
            <span>₹1L (Bikes)</span>
            <span>₹15L</span>
            <span>₹25L+</span>
          </div>
        </div>

        {/* Minimum Ground Clearance */}
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <label htmlFor="min-ground-clearance-slider" className="font-bold text-content-tertiary uppercase tracking-wider">Min. Ground Clearance</label>
            <span className="font-mono font-bold text-xs transition-colors duration-300" style={{ color: 'var(--pt-accent-text)' }}>
              {filters.minGroundClearanceMm === 0 ? 'Any' : `≥ ${filters.minGroundClearanceMm} mm`}
            </span>
          </div>
          <input
            id="min-ground-clearance-slider"
            type="range"
            min="140"
            max="215"
            step="5"
            value={filters.minGroundClearanceMm}
            aria-valuemin={140}
            aria-valuemax={215}
            aria-valuenow={filters.minGroundClearanceMm}
            aria-valuetext={filters.minGroundClearanceMm === 0 ? 'Any ground clearance' : `Minimum ${filters.minGroundClearanceMm} millimeters ground clearance`}
            onChange={(e) => setFilters(prev => ({ ...prev, minGroundClearanceMm: Number(e.target.value) }))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer transition-colors duration-300"
            style={{ accentColor: 'var(--pt-accent)' }}
          />
          <div className="flex justify-between text-xs font-medium text-content-tertiary mt-1.5">
            <span>140 mm</span>
            <span>180 mm</span>
            <span>210+ mm (SUV)</span>
          </div>
        </div>

        {/* Bike Seat Height */}
        {filters.category !== 'car' && (
          <div className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-3.5 rounded-2xl border border-borderLine-light dark:border-borderLine-dark">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label htmlFor="max-seat-height-slider" className="font-bold text-content-tertiary uppercase tracking-wider">Max Seat Height (Bikes)</label>
              <span className="font-mono font-bold text-xs transition-colors duration-300" style={{ color: 'var(--pt-accent-text)' }}>
                {filters.maxSeatHeightMm >= 850 ? 'Any' : `≤ ${filters.maxSeatHeightMm} mm`}
              </span>
            </div>
            <input
              id="max-seat-height-slider"
              type="range"
              min="760"
              max="850"
              step="10"
              value={filters.maxSeatHeightMm}
              aria-valuemin={760}
              aria-valuemax={850}
              aria-valuenow={filters.maxSeatHeightMm}
              aria-valuetext={filters.maxSeatHeightMm >= 850 ? 'Any bike seat height' : `Maximum ${filters.maxSeatHeightMm} millimeters seat height`}
              onChange={(e) => setFilters(prev => ({ ...prev, maxSeatHeightMm: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer transition-colors duration-300"
              style={{ accentColor: 'var(--pt-accent)' }}
            />
            <p className="text-xs text-content-tertiary mt-1.5">
              Filter bikes for shorter rider comfort (&lt;790mm)
            </p>
          </div>
        )}

        {/* Safety Star Rating */}
        <div>
          <label className="text-xs font-bold text-content-tertiary block mb-2 uppercase tracking-wider">
            Safety Rating (NCAP)
          </label>
          <div role="group" aria-label="Minimum NCAP safety rating" className="grid grid-cols-4 gap-2 text-xs font-bold">
            {[0, 3, 4, 5].map((stars) => {
              const isSelected = filters.minNcapStars === stars;
              return (
                <button
                  key={stars}
                  onClick={() => setFilters(prev => ({ ...prev, minNcapStars: stars }))}
                  aria-pressed={isSelected}
                  aria-label={stars === 0 ? 'All safety ratings' : `${stars} stars or higher`}
                  className={`py-2 rounded-xl border text-center transition flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'shadow-sm font-black'
                      : 'bg-surface-light dark:bg-surface-dark text-content-secondary border-borderLine-light dark:border-borderLine-dark hover:border-borderLine-strong-light dark:hover:border-borderLine-strong-dark'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--pt-accent)' : undefined,
                    color: isSelected ? 'var(--pt-on-accent)' : undefined,
                    borderColor: isSelected ? 'var(--pt-accent)' : undefined,
                  }}
                >
                  {stars > 0 && (
                    <Star
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isSelected ? 'fill-current' : 'fill-amber-400 text-amber-400'
                      }`}
                    />
                  )}
                  <span>{stars === 0 ? 'All' : stars === 5 ? '5' : `${stars}+`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Checkboxes */}
        <div className="space-y-3.5 pt-5 border-t border-borderLine-light dark:border-borderLine-dark">
          <span className="text-xs font-bold text-content-tertiary block uppercase tracking-wider mb-1">
            Must-Have Features
          </span>

          <label className="flex items-center gap-3 text-xs font-medium text-content-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.adasOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, adasOnly: e.target.checked }))}
              className="rounded border border-borderLine-strong-light dark:border-borderLine-strong-dark h-4 w-4 cursor-pointer"
              style={{ accentColor: 'var(--pt-accent)' }}
            />
            <span>Level 2 ADAS Available</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-medium text-content-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.ventilatedSeatsOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, ventilatedSeatsOnly: e.target.checked }))}
              className="rounded border border-borderLine-strong-light dark:border-borderLine-strong-dark h-4 w-4 cursor-pointer"
              style={{ accentColor: 'var(--pt-accent)' }}
            />
            <span>Ventilated Front Seats</span>
          </label>

          <label className="flex items-center gap-3 text-xs font-medium text-content-secondary cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.sunroofOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, sunroofOnly: e.target.checked }))}
              className="rounded border border-borderLine-strong-light dark:border-borderLine-strong-dark h-4 w-4 cursor-pointer"
              style={{ accentColor: 'var(--pt-accent)' }}
            />
            <span>Sunroof / Glass Roof</span>
          </label>
        </div>

      </div>

      {/* Footer Match Counter */}
      <div className="mt-7 pt-4 border-t border-borderLine-light dark:border-borderLine-dark flex items-center justify-between text-xs text-content-tertiary">
        <span className="flex items-center gap-2 font-semibold">
          <Filter className="h-3.5 w-3.5" style={{ color: 'var(--pt-accent-text)' }} />
          <span>Matches:</span>
        </span>
        <span className="font-mono font-bold text-content-primary bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark px-3 py-1 rounded-full text-xs">
          {totalMatches} vehicles
        </span>
      </div>

    </aside>
  );
};
