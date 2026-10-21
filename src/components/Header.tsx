import React from 'react';
import { Scale, Zap, Car, Bike, Sparkles } from 'lucide-react';
import { VehicleCategory, PowertrainType } from '../types/vehicle';

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
  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Logo & Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scale className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  Come<span className="text-indigo-400">Pare</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Zero-Spam Specs
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pure vehicle spec showdown • No dealer calls • No OTP traps
              </p>
            </div>
          </div>

          {/* Mobile Comparison Trigger */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount === 0}
            className={`md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedCount > 0
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>Pair ({selectedCount})</span>
          </button>
        </div>

        {/* Category Tabs & EV Filter */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 2W / 4W Type Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Wheels
            </button>
            <button
              onClick={() => setActiveCategory('car')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeCategory === 'car'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              <span>Cars</span>
            </button>
            <button
              onClick={() => setActiveCategory('bike')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeCategory === 'bike'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bike className="h-3.5 w-3.5" />
              <span>Bikes & 2W</span>
            </button>
          </div>

          {/* EV Quick Pill */}
          <button
            onClick={() => setSelectedPowertrain(selectedPowertrain === 'ev' ? 'all' : 'ev')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              selectedPowertrain === 'ev'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-emerald-400 hover:border-emerald-500/30'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>EV Only</span>
          </button>

          {/* Desktop Compare Button */}
          <button
            onClick={onOpenComparison}
            disabled={selectedCount < 2}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCount >= 2
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-700 active:scale-95'
                : selectedCount === 1
                ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-700/50 cursor-pointer animate-pulse'
                : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>
              {selectedCount === 0
                ? 'Select 2 to Compare'
                : selectedCount === 1
                ? 'Select 1 More to Pair'
                : `Compare (${selectedCount})`}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
