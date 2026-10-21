import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Ruler, Maximize2 } from 'lucide-react';

interface VisualDimensionOverlayProps {
  vehicles: Vehicle[];
}

export const VisualDimensionOverlay: React.FC<VisualDimensionOverlayProps> = ({ vehicles }) => {
  if (vehicles.length < 2) return null;

  // Find max length for relative scale
  const maxLength = Math.max(...vehicles.map((v) => v.dimensions.lengthMm), 4500);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Ruler className="h-4 w-4" />
            </div>
            <h3 className="text-base font-extrabold text-white">Visual Dimension & Stance Stacker</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Scaled 1:1 visual footprint overlay (inspired by Carsized)
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <Maximize2 className="h-3.5 w-3.5 text-indigo-400" />
          <span>True Proportions</span>
        </div>
      </div>

      {/* Relative Length Stacker */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Exterior Length (Front Bumper to Rear Bumper)
        </span>

        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {vehicles.map((v, index) => {
            const lengthPercentage = (v.dimensions.lengthMm / maxLength) * 100;
            const colors = [
              'from-indigo-600 to-indigo-400',
              'from-emerald-600 to-emerald-400',
              'from-amber-600 to-amber-400',
              'from-rose-600 to-rose-400'
            ];
            const barColor = colors[index % colors.length];

            return (
              <div key={v.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{v.name}</span>
                  <span className="font-mono font-bold text-indigo-300">
                    {v.dimensions.lengthMm.toLocaleString()} mm
                  </span>
                </div>
                
                {/* Visual Bar with Wheels Simulation */}
                <div className="relative w-full bg-slate-800/60 rounded-xl h-9 overflow-hidden flex items-center px-3">
                  <div
                    className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r ${barColor} opacity-90 rounded-xl transition-all duration-700 flex items-center justify-end pr-3 shadow-md`}
                    style={{ width: `${lengthPercentage}%` }}
                  >
                    <span className="text-[11px] font-black text-slate-950 drop-shadow-sm truncate">
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
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
          Road Stance & Ground Clearance
        </span>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl text-center">
              <span className="text-[11px] text-slate-400 truncate block font-medium">{v.name}</span>
              <div className="my-2 py-2 border-y border-slate-800/80">
                <span className="text-xl font-extrabold font-mono text-indigo-400 block">
                  {v.dimensions.groundClearanceMm} mm
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Ground Clearance</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Wheelbase: {v.dimensions.wheelbaseMm} mm
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
