import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Ruler, Maximize2 } from 'lucide-react';

interface VisualDimensionOverlayProps {
  vehicles: Vehicle[];
}

export const VisualDimensionOverlay: React.FC<VisualDimensionOverlayProps> = ({ vehicles }) => {
  if (vehicles.length < 2) return null;

  const maxLength = Math.max(...vehicles.map((v) => v.dimensions.lengthMm), 4500);

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft-lift dark:shadow-soft-lift-dark transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-borderLine-light dark:border-borderLine-dark">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
              <Ruler className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">
              Visual Dimension & Stance Stacker
            </h3>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5">
            Scaled 1:1 visual footprint overlay (inspired by Carsized)
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-surface-subtle-light dark:bg-surface-subtle-dark px-3.5 py-2 rounded-xl border border-borderLine-light dark:border-borderLine-dark">
          <Maximize2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <span>True Proportions</span>
        </div>
      </div>

      {/* Relative Length Stacker */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block">
          Exterior Length (Front Bumper to Rear Bumper)
        </span>

        <div className="space-y-4 bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-6 rounded-2xl border border-borderLine-light dark:border-borderLine-dark">
          {vehicles.map((v, index) => {
            const lengthPercentage = (v.dimensions.lengthMm / maxLength) * 100;
            const barStyles = [
              'bg-emerald-500 text-neutral-950 font-black',
              'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-black',
              'bg-amber-500 text-neutral-950 font-black',
              'bg-indigo-700 text-white font-black',
            ];
            const barStyle = barStyles[index % barStyles.length];

            return (
              <div key={v.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{v.name}</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-emerald-400">
                    {v.dimensions.lengthMm.toLocaleString()} mm
                  </span>
                </div>
                
                {/* Visual Bar */}
                <div className="relative w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl h-8 overflow-hidden flex items-center px-3 border border-borderLine-light/40">
                  <div
                    className={`absolute left-0 top-0 bottom-0 ${barStyle} rounded-xl transition-all duration-700 flex items-center justify-end pr-3 shadow-sm`}
                    style={{ width: `${lengthPercentage}%` }}
                  >
                    <span className="text-xs font-black truncate">
                      {v.dimensions.lengthMm} mm
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ground Clearance & Stance Comparison */}
      <div>
        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider block mb-3">
          Road Stance & Ground Clearance
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 border border-borderLine-light dark:border-borderLine-dark p-4 rounded-2xl text-center">
              <span className="text-sm text-neutral-700 dark:text-neutral-300 truncate block font-bold">{v.name}</span>
              <div className="my-2.5 py-2.5 border-y border-borderLine-light dark:border-borderLine-dark">
                <span className="text-2xl font-black font-mono text-neutral-900 dark:text-emerald-400 block">
                  {v.dimensions.groundClearanceMm} mm
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">Ground Clearance</span>
              </div>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                Wheelbase: {v.dimensions.wheelbaseMm} mm
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
