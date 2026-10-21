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
    <div className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft-lift dark:shadow-soft-lift-dark transition-colors">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-borderLine-light dark:border-borderLine-dark">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-speed-green/10 text-emerald-800 dark:text-speed-green border border-speed-green/20">
              <IndianRupee className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white">
              Running Cost & Fuel Showdown
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            Real running cost calculated per kilometer based on real-world test telemetry
          </p>
        </div>

        {/* Monthly Km Slider Control */}
        <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark px-4 py-2.5 rounded-xl border border-borderLine-light dark:border-borderLine-dark min-w-[220px]">
          <div className="flex justify-between text-xs mb-1">
            <label htmlFor="cost-monthly-km" className="text-neutral-700 dark:text-neutral-300 font-semibold">Monthly Driving:</label>
            <span className="font-mono font-bold text-neutral-900 dark:text-speed-green">
              {monthlyKm.toLocaleString()} km
            </span>
          </div>
          <input
            id="cost-monthly-km"
            type="range"
            min="300"
            max="3000"
            step="100"
            value={monthlyKm}
            aria-valuemin={300}
            aria-valuemax={3000}
            aria-valuenow={monthlyKm}
            aria-valuetext={`${monthlyKm.toLocaleString()} kilometers per month`}
            onChange={(e) => setMonthlyKm(Number(e.target.value))}
            className="w-full accent-neutral-900 dark:accent-speed-green h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg cursor-pointer"
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
              className={`p-5 rounded-2xl border transition ${
                isEv
                  ? 'bg-speed-green/5 dark:bg-speed-green/10 border-speed-green/30'
                  : 'bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 border-borderLine-light dark:border-borderLine-dark'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">{v.name}</span>
                {isEv ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-speed-green/20 text-emerald-800 dark:text-speed-green border border-speed-green/30">
                    <Zap className="h-2.5 w-2.5 fill-current" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
                    <Fuel className="h-2.5 w-2.5" /> ₹{costPerKm.toFixed(2)}/km
                  </span>
                )}
              </div>

              {/* Monthly Cost Big Callout */}
              <div className="mb-4">
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block font-semibold">
                  Estimated Monthly Fuel
                </span>
                <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${isEv ? 'text-emerald-800 dark:text-speed-green' : 'text-neutral-900 dark:text-white'}`}>
                  ₹{monthlyExpense.toLocaleString()}
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 block">
                  Based on {v.efficiency.realWorldEfficiency}
                </span>
              </div>

              {/* Long term timeline */}
              <div className="pt-3 border-t border-borderLine-light dark:border-borderLine-dark space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">1 Year Fuel:</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    ₹{annualExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">5 Year Cumulative:</span>
                  <span className={`font-mono font-bold ${isEv ? 'text-emerald-800 dark:text-speed-green' : 'text-neutral-900 dark:text-white'}`}>
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
        <div className="p-4 rounded-2xl bg-speed-green/10 border border-speed-green/20 flex items-center gap-3.5">
          <div className="p-2 rounded-xl bg-speed-green/20 text-speed-green shrink-0">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-neutral-900 dark:text-white block uppercase tracking-wider">
              Electric Fuel Savings Notice
            </span>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 mt-0.5 leading-relaxed">
              At {monthlyKm.toLocaleString()} km/month, switching from ICE to EV saves approximately{' '}
              <strong className="font-mono font-bold text-emerald-800 dark:text-speed-green">
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
