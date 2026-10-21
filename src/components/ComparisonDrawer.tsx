import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Scale, X, Sparkles, Trash2 } from 'lucide-react';

interface ComparisonDrawerProps {
  selectedVehicles: Vehicle[];
  onRemoveVehicle: (id: string) => void;
  onClearAll: () => void;
  onOpenComparison: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  selectedVehicles,
  onRemoveVehicle,
  onClearAll,
  onOpenComparison,
}) => {
  if (selectedVehicles.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="bg-white/95 dark:bg-slate-900/95 border border-indigo-200 dark:border-indigo-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-slate-400/20 dark:shadow-indigo-950/60 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
        
        {/* Left Side: Selected Items */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2">
            <Scale className="h-4 w-4" />
            <span>Showdown ({selectedVehicles.length}/4):</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedVehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200 shrink-0 shadow-sm"
              >
                <img src={v.image} alt={v.name} className="h-6 w-8 object-cover rounded-md" />
                <span className="font-semibold text-xs truncate max-w-[120px]">{v.name}</span>
                <button
                  onClick={() => onRemoveVehicle(v.id)}
                  className="text-slate-400 hover:text-rose-500 transition"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={onOpenComparison}
            disabled={selectedVehicles.length < 2}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition shadow-lg ${
              selectedVehicles.length >= 2
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-indigo-600/30 active:scale-95'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>
              {selectedVehicles.length < 2 ? 'Select 1 More to Pair' : `Launch Showdown (${selectedVehicles.length})`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
