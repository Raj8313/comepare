import React from 'react';
import { Scale, Zap, Car, Bike, Sparkles, Sun, Moon, Fuel, Disc } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-canvas-light/85 dark:bg-canvas-dark/85 backdrop-blur-md border-b border-borderLine-light dark:border-borderLine-dark px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand / Logo with Dynamic Color */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-strong-light dark:border-borderLine-strong-dark flex items-center justify-center shadow-sm transition-colors duration-300"
              style={{ borderColor: 'var(--pt-accent-border)' }}
            >
              <Scale className="h-5 w-5 transition-colors duration-300 stroke-[2]" style={{ color: 'var(--pt-accent)' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  Come<span className="transition-colors duration-300" style={{ color: 'var(--pt-accent)' }}>Pare</span>
                </span>
                
                {/* Dynamic Powertrain Indicator Pill */}
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all duration-300 flex items-center gap-1"
                  style={{
                    backgroundColor: 'var(--pt-accent-subtle)',
                    borderColor: 'var(--pt-accent-border)',
                    color: 'var(--pt-accent)',
                  }}
                >
                  {selectedPowertrain === 'ev' && <><Zap className="h-2.5 w-2.5 fill-current" /> EV Mode</>}
                  {selectedPowertrain === 'petrol' && <><Fuel className="h-2.5 w-2.5" /> Petrol Mode</>}
                  {selectedPowertrain === 'diesel' && <><Disc className="h-2.5 w-2.5" /> Diesel Mode</>}
                  {selectedPowertrain === 'all' && <>All Powertrains</>}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium hidden sm:block">
                The automobile spec showdown • Zero dealer calls
              </p>
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Compare */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark text-neutral-700 dark:text-neutral-300 transition active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-800" />}
            </button>

            <button
              onClick={onOpenComparison}
              disabled={selectedCount === 0}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm"
              style={{
                backgroundColor: selectedCount > 0 ? 'var(--pt-accent)' : undefined,
                color: selectedCount > 0 ? '#000000' : undefined,
              }}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Pair ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Category Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'car'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setActiveCategory('bike')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'bike'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bike className="h-3.5 w-3.5" />
              <span>Bikes & 2W</span>
            </button>
          </div>

          {/* Powertrain Quick Switcher (All / EV / Petrol / Diesel) */}
          <div className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold">
            <button
              onClick={() => setSelectedPowertrain('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                selectedPowertrain === 'all'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Fuel
            </button>

            <button
              onClick={() => setSelectedPowertrain('ev')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'ev'
                  ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/10'
              }`}
            >
              <Zap className="h-3 w-3 fill-current" />
              <span>EV</span>
            </button>

            <button
              onClick={() => setSelectedPowertrain('petrol')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'petrol'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-500/10'
              }`}
            >
              <Fuel className="h-3 w-3" />
              <span>Petrol</span>
            </button>

            <button
              onClick={() => setSelectedPowertrain('diesel')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all font-bold ${
                selectedPowertrain === 'diesel'
                  ? 'bg-slate-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-500/10'
              }`}
            >
              <Disc className="h-3 w-3" />
              <span>Diesel</span>
            </button>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark text-neutral-700 dark:text-neutral-300 hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark transition active:scale-95 shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
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
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
              selectedCount >= 2
                ? 'shadow-md font-extrabold text-neutral-950 hover:brightness-105'
                : selectedCount === 1
                ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white border border-dashed animate-pulse'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 dark:text-neutral-600 border border-borderLine-light dark:border-borderLine-dark cursor-not-allowed'
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
