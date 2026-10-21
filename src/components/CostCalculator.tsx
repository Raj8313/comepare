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
    <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b-2 border-outline-light dark:border-outline-dark">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-wa-green/20 text-neutral-900 dark:text-wa-green border border-neutral-900 dark:border-wa-green">
              <IndianRupee className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-black text-neutral-900 dark:text-white">
              Running Cost & Fuel Showdown
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
            Real running cost calculated per kilometer based on real-world test telemetry
          </p>
        </div>

        {/* Monthly Km Slider Control */}
        <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark px-5 py-3 rounded-2xl border-2 border-outline-light dark:border-outline-dark min-w-[240px]">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase tracking-wider">Monthly Driving:</span>
            <span className="font-mono font-black text-neutral-900 dark:text-wa-green">
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
            className="w-full accent-neutral-900 dark:accent-wa-green h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Comparative Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map((v) => {
          const isEv = v.powertrain === 'ev';
          const costPerKm = v.efficiency.energyCostPerKmInr;
          const monthlyExpense = Math.round(monthlyKm * costPerKm);
          const annualExpense = monthlyExpense * 12;
          const fiveYearExpense = annualExpense * 5;

          return (
            <div
              key={v.id}
              className={`p-5 rounded-2xl border-2 transition ${
                isEv
                  ? 'bg-wa-green/10 border-neutral-900 dark:border-wa-green'
                  : 'bg-surface-subtle-light dark:bg-surface-subtle-dark border-outline-light/50 dark:border-outline-dark'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-neutral-900 dark:text-white truncate">{v.name}</span>
                {isEv ? (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-wa-green text-neutral-950 border border-neutral-900">
                    <Zap className="h-2.5 w-2.5 fill-current" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white text-neutral-900 border border-neutral-900">
                    <Fuel className="h-2.5 w-2.5" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                )}
              </div>

              {/* Monthly Cost Big Callout */}
              <div className="mb-4">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">
                  Estimated Monthly Fuel
                </span>
                <span className={`text-2xl sm:text-3xl font-black font-mono ${isEv ? 'text-[#15803d] dark:text-wa-green' : 'text-neutral-900 dark:text-white'}`}>
                  ₹{monthlyExpense.toLocaleString()}
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 block mt-0.5 font-medium">
                  Based on {v.efficiency.realWorldEfficiency}
                </span>
              </div>

              {/* Long term timeline */}
              <div className="pt-3 border-t-2 border-outline-light/20 dark:border-outline-dark space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">1 Year Fuel:</span>
                  <span className="font-mono font-black text-neutral-900 dark:text-neutral-100">
                    ₹{annualExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">5 Year Cumulative:</span>
                  <span className={`font-mono font-black ${isEv ? 'text-[#15803d] dark:text-wa-green' : 'text-neutral-900 dark:text-white'}`}>
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
        <div className="p-5 rounded-2xl bg-wa-green/15 border-2 border-neutral-900 dark:border-wa-green flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-wa-green text-neutral-950 border border-neutral-900 shrink-0">
            <TrendingDown className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs font-black text-neutral-900 dark:text-white block uppercase tracking-wider">
              Electric Fuel Savings Notice
            </span>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5 leading-relaxed font-medium">
              At {monthlyKm.toLocaleString()} km/month, switching from ICE to EV saves approximately{' '}
              <strong className="font-mono font-black text-[#15803d] dark:text-wa-green text-sm">
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
