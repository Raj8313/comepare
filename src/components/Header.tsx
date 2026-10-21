import React from 'react';
import { Gauge, Zap, Car, Bike, Sparkles, Sun, Moon, Fuel, Disc } from 'lucide-react';
import { VehicleCategory, PowertrainType } from '../types/vehicle';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeCategory: VehicleCategory | 'all';
  setActiveCategory: (cat: VehicleCategory | 'all') => void;
  selectedPowertrain: PowertrainType | 'all';
  setSelectedPowertrain: (pt: PowertrainType | 'all') => void;
  selectedCount: number;
  onOpenComparison: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  setActiveCategory,
  selectedPowertrain,
  setSelectedPowertrain,
  selectedCount,
  onOpenComparison,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-canvas-light/95 dark:bg-canvas-dark/95 backdrop-blur-md border-b border-borderLine-light dark:border-borderLine-dark px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        
        {/* Brand / Logo with Automotive Gauge Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            {/* Automotive Speedometer / Telemetry Icon */}
            <div
              className="h-9 w-9 rounded-xl bg-surface-light dark:bg-surface-dark border flex items-center justify-center shadow-sm transition-all duration-300 shrink-0"
              style={{
                borderColor: 'var(--pt-accent-border)',
                backgroundColor: 'var(--surface-subtle)',
              }}
            >
              <Gauge
                className="h-4 w-4 transition-colors duration-300 stroke-[2.2]"
                style={{ color: 'var(--pt-accent)' }}
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Come<span className="transition-colors duration-300" style={{ color: 'var(--pt-accent-text)' }}>Pare</span>
                </span>
                
                {/* Reactive Theme Pill Badge */}
                <span
                  className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md border transition-all duration-300 flex items-center gap-1 shadow-sm leading-none"
                  style={{
                    backgroundColor: 'var(--pt-accent-subtle)',
                    borderColor: 'var(--pt-accent-border)',
                    color: 'var(--pt-accent-text)',
                  }}
                >
                  {selectedPowertrain === 'ev' && <><Zap className="h-3 w-3 fill-current" /> EV Mode</>}
                  {selectedPowertrain === 'petrol' && <><Fuel className="h-3 w-3" /> Petrol Mode</>}
                  {selectedPowertrain === 'diesel' && <><Disc className="h-3 w-3" /> Diesel Mode</>}
                  {selectedPowertrain === 'all' && <>All Fuel</>}
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium hidden sm:block whitespace-nowrap mt-0.5">
                The automobile spec showdown • Zero dealer calls
              </p>
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Compare */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark text-neutral-700 dark:text-neutral-300 transition active:scale-95"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-800" />}
            </button>

            <button
              onClick={onOpenComparison}
              disabled={selectedCount === 0}
              aria-label={selectedCount === 0 ? 'No vehicles paired for showdown' : `View showdown comparison for ${selectedCount} vehicles`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
              style={{
                backgroundColor: selectedCount > 0 ? 'var(--pt-accent)' : undefined,
                color: selectedCount > 0 ? '#000000' : undefined,
              }}
            >
              <Gauge className="h-3.5 w-3.5" />
              <span>Pair ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="flex items-center gap-2.5 flex-nowrap shrink-0 overflow-x-auto pb-1 lg:pb-0">
          
          {/* Category Segmented Control */}
          <div
            role="group"
            aria-label="Filter vehicle category"
            className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold"
          >
            <button
              onClick={() => setActiveCategory('all')}
              aria-pressed={activeCategory === 'all'}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              aria-pressed={activeCategory === 'car'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'car'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setActiveCategory('bike')}
              aria-pressed={activeCategory === 'bike'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'bike'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bike className="h-3.5 w-3.5" />
              <span>Bikes & 2W</span>
            </button>
          </div>

          {/* Powertrain Dynamic Mode Switcher (All / EV / Petrol / Diesel) */}
          <div
            role="group"
            aria-label="Filter powertrain driving mode"
            className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold"
          >
            <button
              onClick={() => setSelectedPowertrain('all')}
              aria-pressed={selectedPowertrain === 'all'}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                selectedPowertrain === 'all'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold'
                  : 'text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Fuel
            </button>

            <button
              onClick={() => setSelectedPowertrain('ev')}
              aria-pressed={selectedPowertrain === 'ev'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'ev'
                  ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                  : 'text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <Zap className="h-3 w-3 fill-current" />
              <span>EV</span>
            </button>

            <button
              onClick={() => setSelectedPowertrain('petrol')}
              aria-pressed={selectedPowertrain === 'petrol'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'petrol'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-amber-800 dark:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Fuel className="h-3 w-3" />
              <span>Petrol</span>
            </button>

            <button
              onClick={() => setSelectedPowertrain('diesel')}
              aria-pressed={selectedPowertrain === 'diesel'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'diesel'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-500/10'
              }`}
            >
              <Disc className="h-3 w-3" />
              <span>Diesel</span>
            </button>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center h-9 w-9 rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark text-neutral-700 dark:text-neutral-300 hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark transition active:scale-95 shadow-sm shrink-0"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-800" />
            )}
          </button>

          {/* Showdown Launch Button with Dynamic Accent */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount < 2}
            aria-label={
              selectedCount === 0
                ? 'Select 2 vehicles to compare in showdown'
                : selectedCount === 1
                ? 'Select 1 more vehicle to pair for showdown'
                : `Launch showdown comparison for ${selectedCount} vehicles`
            }
            className={`hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shrink-0 ${
              selectedCount >= 2
                ? 'shadow-md font-extrabold text-neutral-950 hover:brightness-105'
                : selectedCount === 1
                ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white border border-dashed animate-pulse'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-500 dark:text-neutral-500 border border-borderLine-light dark:border-borderLine-dark cursor-not-allowed'
            }`}
            style={{
              backgroundColor: selectedCount >= 2 ? 'var(--pt-accent)' : undefined,
              borderColor: selectedCount === 1 ? 'var(--pt-accent)' : undefined,
            }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: selectedCount >= 2 ? '#000000' : 'var(--pt-accent)' }} />
            <span>
              {selectedCount === 0
                ? 'Select 2 to Compare'
                : selectedCount === 1
                ? 'Select 1 More to Pair'
                : `Launch Showdown (${selectedCount})`}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
