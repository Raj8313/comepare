import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Gauge, X, Sparkles, Trash2 } from 'lucide-react';

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
      <div
        className="bg-surface-light/95 dark:bg-surface-dark/95 border rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl transition-all duration-300"
        style={{ borderColor: 'var(--pt-accent-border)' }}
      >
        
        {/* Left Side: Selected Items */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto py-1">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-2" style={{ color: 'var(--pt-accent)' }}>
            <Gauge className="h-4 w-4" />
            <span>Showdown ({selectedVehicles.length}/4):</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedVehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-2 bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark rounded-xl px-2.5 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 shrink-0 shadow-sm"
              >
                <img src={v.image} alt={v.name} className="h-5 w-7 object-cover rounded-md" />
                <span className="font-semibold text-xs truncate max-w-[120px]">{v.name}</span>
                <button
                  onClick={() => onRemoveVehicle(v.id)}
                  className="text-neutral-400 hover:text-rose-500 transition"
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
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          <button
            onClick={onOpenComparison}
            disabled={selectedVehicles.length < 2}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
              selectedVehicles.length >= 2
                ? 'text-neutral-950 font-black hover:brightness-105'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-400 cursor-not-allowed border border-borderLine-light dark:border-borderLine-dark'
            }`}
            style={{
              backgroundColor: selectedVehicles.length >= 2 ? 'var(--pt-accent)' : undefined,
            }}
          >
            <Sparkles className="h-4 w-4 text-neutral-950" />
            <span>
              {selectedVehicles.length < 2 ? 'Select 1 More to Pair' : `Launch Showdown (${selectedVehicles.length})`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
