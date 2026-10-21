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
    <div
      role="region"
      aria-label="Vehicle comparison dock"
      aria-live="polite"
      className="fixed bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-40 max-w-5xl mx-auto animate-in slide-in-from-bottom duration-300"
    >
      <div
        className="bg-surface-light/95 dark:bg-surface-dark/95 border rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 backdrop-blur-xl transition-all duration-300"
        style={{ borderColor: 'var(--pt-accent-border)' }}
      >
        
        {/* Left Side: Counter Badge & Scrollable Vehicle Chips */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 overflow-hidden">
          {/* Symmetrical Counter Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-bold whitespace-nowrap shrink-0 shadow-sm"
            style={{ color: 'var(--pt-accent-text)' }}
          >
            <Gauge className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden md:inline">Showdown</span>
            <span>({selectedVehicles.length}/4)</span>
          </div>

          {/* Vehicle Chips - Zero Scrollbar Track & Guaranteed Dismiss Target */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar min-w-0 flex-1 py-0.5">
            {selectedVehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-2 bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark rounded-xl pl-1.5 pr-2 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 shrink-0 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
              >
                <img
                  src={v.image}
                  alt=""
                  className="h-6 w-9 object-cover rounded-lg shrink-0 border border-borderLine-light/60 dark:border-borderLine-dark/60"
                  aria-hidden="true"
                />
                <span className="font-semibold text-xs truncate max-w-[110px] sm:max-w-[140px] md:max-w-[170px] whitespace-nowrap">
                  {v.name}
                </span>
                <button
                  onClick={() => onRemoveVehicle(v.id)}
                  aria-label={`Remove ${v.name} from comparison`}
                  className="text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition p-1 rounded-md hover:bg-rose-500/10 focus:outline-none shrink-0"
                  title={`Remove ${v.name}`}
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Actions (Clear All & Primary CTA) */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onClearAll}
            aria-label="Clear all vehicles from showdown comparison"
            title="Clear all selected vehicles"
            className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-neutral-600 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 hover:bg-surface-subtle-light dark:hover:bg-surface-subtle-dark transition rounded-xl shrink-0"
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">Clear all</span>
          </button>

          <button
            onClick={onOpenComparison}
            disabled={selectedVehicles.length < 2}
            aria-label={
              selectedVehicles.length < 2
                ? 'Select at least 2 vehicles to launch showdown comparison'
                : `Launch showdown comparison with ${selectedVehicles.length} vehicles`
            }
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm active:scale-95 shrink-0 whitespace-nowrap ${
              selectedVehicles.length >= 2
                ? 'text-neutral-950 font-black hover:brightness-105'
                : 'bg-surface-subtle-light dark:bg-surface-subtle-dark text-neutral-500 dark:text-neutral-500 cursor-not-allowed border border-borderLine-light dark:border-borderLine-dark'
            }`}
            style={{
              backgroundColor: selectedVehicles.length >= 2 ? 'var(--pt-accent)' : undefined,
            }}
          >
            <Sparkles className="h-4 w-4 shrink-0 text-neutral-950" />
            <span>
              {selectedVehicles.length < 2 ? 'Select 1 More' : `Launch Showdown (${selectedVehicles.length})`}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
