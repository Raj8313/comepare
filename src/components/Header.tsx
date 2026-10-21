import React from 'react';
import { Scale, Zap, Car, Bike, Sparkles, Sun, Moon } from 'lucide-react';
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
        
        {/* Brand / Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-surface-light dark:bg-surface-dark border border-borderLine-strong-light dark:border-borderLine-strong-dark flex items-center justify-center shadow-sm">
              <Scale className="h-5 w-5 text-neutral-900 dark:text-speed-green stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  Come<span className="text-speed-green">Pare</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-speed-green/10 text-emerald-800 dark:text-speed-green border border-speed-green/30 rounded-md">
                  Pure Specs
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCount > 0
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 cursor-not-allowed border border-borderLine-light dark:border-borderLine-dark'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Pair ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Segmented Controls */}
          <div className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                activeCategory === 'bike'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-950 dark:text-white shadow-sm font-bold border border-borderLine-strong-light/50 dark:border-borderLine-strong-dark/50'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Bike className="h-3.5 w-3.5" />
              <span>Bikes & 2W</span>
            </button>
          </div>

          {/* EV Quick Pill */}
          <button
            onClick={() => setSelectedPowertrain(selectedPowertrain === 'ev' ? 'all' : 'ev')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedPowertrain === 'ev'
                ? 'bg-speed-green/15 text-emerald-800 dark:text-speed-green border-speed-green/40 shadow-sm'
                : 'bg-surface-light dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 border-borderLine-light dark:border-borderLine-dark hover:border-speed-green/50'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-speed-green fill-current" />
            <span>EV Only</span>
          </button>

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

          {/* Showdown Launch Button */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount < 2}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
              selectedCount >= 2
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-md'
                : selectedCount === 1
                ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white border border-dashed border-speed-green animate-pulse'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 dark:text-neutral-600 border border-borderLine-light dark:border-borderLine-dark cursor-not-allowed'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-speed-green" />
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
