import React, { useState } from 'react';
import { Vehicle } from '../types/vehicle';
import { IndianRupee, Fuel, Zap, TrendingDown } from 'lucide-react';

interface CostCalculatorProps {
  vehicles: Vehicle[];
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ vehicles }) => {
  const [monthlyKm, setMonthlyKm] = useState<number>(1200);

  if (vehicles.length < 2) return null;

  return (
    <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm dark:shadow-none transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <IndianRupee className="h-4 w-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Running Cost & Fuel Showdown
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real running cost comparison calculated per kilometer based on real-world efficiency
          </p>
        </div>

        {/* Monthly Km Slider Control */}
        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[220px]">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Monthly Driving:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {monthlyKm.toLocaleString()} km
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="3000"
            step="100"
            value={monthlyKm}
            onChange={(e) => setMonthlyKm(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => {
          const isEv = v.powertrain === 'ev';
          const costPerKm = v.efficiency.energyCostPerKmInr;
          const monthlyExpense = Math.round(monthlyKm * costPerKm);
          const annualExpense = monthlyExpense * 12;
          const fiveYearExpense = annualExpense * 5;

          return (
            <div
              key={v.id}
              className={`p-4 rounded-xl border transition ${
                isEv
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30'
                  : 'bg-slate-50/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-300 truncate">{v.name}</span>
                {isEv ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    <Zap className="h-2.5 w-2.5" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    <Fuel className="h-2.5 w-2.5" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                )}
              </div>

              {/* Monthly Cost Callout */}
              <div className="mb-4">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
                  Estimated Monthly Fuel
                </span>
                <span className={`text-2xl font-black font-mono ${isEv ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  ₹{monthlyExpense.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                  Based on {v.efficiency.realWorldEfficiency} real-world
                </span>
              </div>

              {/* Long term timeline */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">1 Year Fuel:</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                    ₹{annualExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">5 Year Cumulative:</span>
                  <span className={`font-mono font-bold ${isEv ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    ₹{fiveYearExpense.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Difference Highlights if ICE vs EV */}
      {vehicles.some(v => v.powertrain === 'ev') && vehicles.some(v => v.powertrain !== 'ev') && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-indigo-50 to-slate-50 dark:from-emerald-950/40 dark:via-indigo-950/30 dark:to-slate-900 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
              Electric Fuel Savings Notice
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
              At {monthlyKm.toLocaleString()} km/month, switching from ICE to EV saves approximately{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                ₹{Math.round(monthlyKm * (7.80 - 1.15) * 12).toLocaleString()} per year
              </strong>{' '}
              in direct fuel expenses alone.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
