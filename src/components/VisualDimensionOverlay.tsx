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
    <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b-2 border-outline-light dark:border-outline-dark">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-wa-green/20 text-neutral-900 dark:text-wa-green border border-neutral-900 dark:border-wa-green">
              <Ruler className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              Visual Dimension & Stance Stacker
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
            Scaled 1:1 visual footprint overlay (inspired by Carsized)
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-surface-subtle-light dark:bg-surface-subtle-dark px-3.5 py-1.5 rounded-full border border-outline-light dark:border-outline-dark">
          <Maximize2 className="h-3.5 w-3.5 text-neutral-900 dark:text-wa-green" />
          <span>True Proportions</span>
        </div>
      </div>

      {/* Relative Length Stacker */}
      <div className="space-y-4">
        <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider block">
          Exterior Length (Front Bumper to Rear Bumper)
        </span>

        <div className="space-y-3 bg-surface-subtle-light dark:bg-surface-subtle-dark p-5 rounded-2xl border-2 border-outline-light dark:border-outline-dark">
          {vehicles.map((v, index) => {
            const lengthPercentage = (v.dimensions.lengthMm / maxLength) * 100;
            const barStyles = [
              'bg-wa-green text-neutral-950 border border-neutral-900',
              'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border border-neutral-900 dark:border-white',
              'bg-amber-400 text-neutral-950 border border-neutral-900',
              'bg-sky-400 text-neutral-950 border border-neutral-900',
            ];
            const barStyle = barStyles[index % barStyles.length];

            return (
              <div key={v.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-black text-neutral-900 dark:text-neutral-100">{v.name}</span>
                  <span className="font-mono font-black text-neutral-900 dark:text-wa-green">
                    {v.dimensions.lengthMm.toLocaleString()} mm
                  </span>
                </div>
                
                {/* Visual Bar */}
                <div className="relative w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-8 overflow-hidden flex items-center px-3 border border-outline-light/30">
                  <div
                    className={`absolute left-0 top-0 bottom-0 ${barStyle} font-black rounded-full transition-all duration-700 flex items-center justify-end pr-4 shadow-sm`}
                    style={{ width: `${lengthPercentage}%` }}
                  >
                    <span className="text-[11px] truncate">
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
        <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider block mb-3">
          Road Stance & Ground Clearance
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-surface-subtle-light dark:bg-surface-subtle-dark border-2 border-outline-light dark:border-outline-dark p-4 rounded-2xl text-center">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate block font-bold">{v.name}</span>
              <div className="my-2.5 py-2.5 border-y-2 border-outline-light/20 dark:border-outline-dark">
                <span className="text-2xl font-black font-mono text-neutral-900 dark:text-wa-green block">
                  {v.dimensions.groundClearanceMm} mm
                </span>
                <span className="text-[10px] text-neutral-500 uppercase font-black tracking-wider">Ground Clearance</span>
              </div>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono font-bold">
                Wheelbase: {v.dimensions.wheelbaseMm} mm
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
