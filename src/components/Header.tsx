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
    <header className="sticky top-0 z-30 bg-canvas-light/90 dark:bg-canvas-dark/90 backdrop-blur-md border-b border-outline-light dark:border-outline-dark px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark flex items-center justify-center">
              <Scale className="h-5 w-5 text-neutral-900 dark:text-wa-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Come<span className="text-[#15803d] dark:text-wa-green">Pare</span>
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-wa-green/15 text-neutral-900 dark:text-wa-green border border-wa-green/40 rounded-full">
                  Zero Spam
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium hidden sm:block">
                Pure vehicle spec showdown • No phone number required
              </p>
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Compare */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark text-neutral-900 dark:text-neutral-100 transition active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-900" />}
            </button>

            <button
              onClick={onOpenComparison}
              disabled={selectedCount === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition ${
                selectedCount > 0
                  ? 'bg-wa-green text-neutral-950 hover:bg-wa-greenHover'
                  : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 cursor-not-allowed border border-outline-light/30'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Pair ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Pills */}
          <div className="inline-flex p-1 rounded-full bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark text-xs font-bold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full transition ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
                activeCategory === 'car'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setActiveCategory('bike')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition ${
                activeCategory === 'bike'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
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
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
              selectedPowertrain === 'ev'
                ? 'bg-wa-green text-neutral-950 border-neutral-900 dark:border-wa-green font-black'
                : 'bg-surface-light dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 border-outline-light dark:border-outline-dark hover:border-wa-green'
            }`}
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>EV Only</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark text-neutral-800 dark:text-neutral-200 hover:scale-105 transition active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-900" />
            )}
          </button>

          {/* Showdown CTA Pill - styled exactly like the WhatsApp green Download pill in reference image! */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount < 2}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-200 active:scale-95 ${
              selectedCount >= 2
                ? 'bg-wa-green text-neutral-950 hover:bg-wa-greenHover border border-neutral-900 shadow-sm'
                : selectedCount === 1
                ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white border-2 border-dashed border-outline-light dark:border-outline-dark animate-pulse'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 dark:text-neutral-600 border border-outline-light/40 dark:border-outline-dark cursor-not-allowed'
            }`}
          >
            <Sparkles className="h-4 w-4" />
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
