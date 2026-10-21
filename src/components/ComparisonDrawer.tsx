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
    <div className="fixed bottom-5 left-4 right-4 z-40 max-w-4xl mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-3.5 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors">
        
        {/* Left Side: Selected Items */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-black text-neutral-900 dark:text-wa-green px-2">
            <Scale className="h-4 w-4" />
            <span>Showdown ({selectedVehicles.length}/4):</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedVehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-2 bg-surface-subtle-light dark:bg-surface-subtle-dark border border-outline-light dark:border-outline-dark rounded-full px-3 py-1.5 text-xs text-neutral-900 dark:text-white shrink-0"
              >
                <img src={v.image} alt={v.name} className="h-5 w-7 object-cover rounded-md" />
                <span className="font-bold text-xs truncate max-w-[120px]">{v.name}</span>
                <button
                  onClick={() => onRemoveVehicle(v.id)}
                  className="text-neutral-500 hover:text-rose-600 transition"
                  title="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={onOpenComparison}
            disabled={selectedVehicles.length < 2}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-black transition shadow-sm active:scale-95 ${
              selectedVehicles.length >= 2
                ? 'bg-wa-green text-neutral-950 hover:bg-wa-greenHover border border-neutral-900'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed border border-outline-light/30'
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
