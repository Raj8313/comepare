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
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-8 py-3 transition-colors duration-200 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1.5px] shadow-md shadow-indigo-500/20">
              <div className="h-full w-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center transition-colors">
                <Scale className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Come<span className="text-indigo-600 dark:text-indigo-400">Pare</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-full">
                  Zero Spam
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                The pure spec showdown • Cars, Bikes & EVs
              </p>
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Compare */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
            </button>

            <button
              onClick={onOpenComparison}
              disabled={selectedCount === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                selectedCount > 0
                  ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Pair ({selectedCount})</span>
            </button>
          </div>
        </div>

        {/* Desktop Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* 2W / 4W Category Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'car'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setActiveCategory('bike')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeCategory === 'bike'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bike className="h-3.5 w-3.5" />
              <span>Bikes & 2W</span>
            </button>
          </div>

          {/* EV Quick Pill */}
          <button
            onClick={() => setSelectedPowertrain(selectedPowertrain === 'ev' ? 'all' : 'ev')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedPowertrain === 'ev'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-500" />
            <span>EV Only</span>
          </button>

          {/* Light / Dark Mode Toggle Switch (Desktop) */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition active:scale-95"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Desktop Showdown Launch Button */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount < 2}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCount >= 2
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-700 hover:to-indigo-600 active:scale-95'
                : selectedCount === 1
                ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700/50 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800 cursor-not-allowed'
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
