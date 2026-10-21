import React from 'react';
import { Vehicle } from '../types/vehicle';
import { X, Zap, Fuel, ShieldCheck, Check, Plus, Ruler, Gauge, BatteryCharging } from 'lucide-react';

interface QuickViewModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  isSelected: boolean;
  onToggleSelect: (vehicle: Vehicle) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  vehicle,
  onClose,
  isSelected,
  onToggleSelect,
}) => {
  if (!vehicle) return null;

  const isEv = vehicle.powertrain === 'ev';
  const isBike = vehicle.category === 'bike';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 transition-colors">
        
        {/* Banner with Image */}
        <div className="relative h-56 w-full bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/70 text-white hover:bg-black transition active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">{vehicle.brand}</span>
              <h2 className="text-2xl font-black text-white">{vehicle.name}</h2>
              <p className="text-xs text-neutral-200 mt-0.5 font-medium">{vehicle.tagline}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-300 block uppercase font-bold">Price Band</span>
              <span className="text-lg font-black text-white font-mono">
                ₹{vehicle.priceRange.min}L - ₹{vehicle.priceRange.max}L
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-3.5 rounded-2xl border border-outline-light/40 dark:border-outline-dark text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-black flex items-center justify-center gap-1">
                <Gauge className="h-3 w-3" /> Power
              </span>
              <span className="text-sm font-black font-mono text-neutral-900 dark:text-neutral-100 mt-1 block">
                {vehicle.performance.powerBhp} bhp
              </span>
            </div>

            <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-3.5 rounded-2xl border border-outline-light/40 dark:border-outline-dark text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-black flex items-center justify-center gap-1">
                {isEv ? <Zap className="h-3 w-3 fill-current text-wa-green" /> : <Fuel className="h-3 w-3 text-amber-500" />}
                {isEv ? 'Real Range' : 'Real Mileage'}
              </span>
              <span className="text-sm font-black font-mono text-[#15803d] dark:text-wa-green mt-1 block">
                {vehicle.efficiency.realWorldEfficiency.split(' ')[0]} {isEv ? 'km' : 'km/l'}
              </span>
            </div>

            <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-3.5 rounded-2xl border border-outline-light/40 dark:border-outline-dark text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-black flex items-center justify-center gap-1">
                <Ruler className="h-3 w-3" /> {isBike ? 'Seat Height' : 'Ground Clr'}
              </span>
              <span className="text-sm font-black font-mono text-neutral-900 dark:text-neutral-100 mt-1 block">
                {isBike ? `${vehicle.dimensions.seatHeightMm} mm` : `${vehicle.dimensions.groundClearanceMm} mm`}
              </span>
            </div>

            <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-3.5 rounded-2xl border border-outline-light/40 dark:border-outline-dark text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-black flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-amber-500" /> NCAP Crash
              </span>
              <span className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                {vehicle.safety.ncapRatingStars ? `${vehicle.safety.ncapRatingStars} Stars` : 'N/A'}
              </span>
            </div>
          </div>

          {/* EV Specific Battery Info */}
          {isEv && vehicle.efficiency.batteryKwh && (
            <div className="p-4 rounded-2xl bg-wa-green/15 border-2 border-neutral-900 dark:border-wa-green flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-wa-green text-neutral-950 border border-neutral-900">
                  <BatteryCharging className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-neutral-900 dark:text-white block">
                    {vehicle.efficiency.batteryKwh} kWh {vehicle.efficiency.batteryChemistry} Battery
                  </span>
                  <span className="text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
                    DC Fast Charge 10-80% in {vehicle.efficiency.dcChargingTime10To80Min} mins ({vehicle.efficiency.dcFastChargingKw} kW)
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-black text-[#15803d] dark:text-wa-green">
                ₹{vehicle.efficiency.energyCostPerKmInr}/km running
              </span>
            </div>
          )}

          {/* Trims & Variants Breakdown */}
          <div>
            <h4 className="text-xs font-black text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-2.5">
              Available Trims & What They Add
            </h4>
            <div className="space-y-2.5">
              {vehicle.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-3.5 rounded-2xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-outline-light/40 dark:border-outline-dark flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-neutral-900 dark:text-white">{variant.name}</span>
                      {variant.transmission && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 font-bold">
                          {variant.transmission}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {variant.keyDifferentiators.map((diff, i) => (
                        <span key={i} className="text-[10px] text-neutral-900 dark:text-wa-green bg-white dark:bg-surface-dark px-2.5 py-0.5 rounded-full border border-outline-light/40 dark:border-outline-dark font-bold">
                          + {diff}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black font-mono text-neutral-900 dark:text-wa-green">
                      ₹{(variant.priceExShowroom / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-subtle-light dark:bg-surface-subtle-dark border-t-2 border-outline-light dark:border-outline-dark flex items-center justify-between">
          <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
            Zero-Spam Promise: No phone number required to view specs.
          </span>
          <button
            onClick={() => {
              onToggleSelect(vehicle);
              onClose();
            }}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black transition active:scale-95 ${
              isSelected
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border border-neutral-900'
                : 'bg-wa-green text-neutral-950 hover:bg-wa-greenHover border border-neutral-900 shadow-sm'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Added to Showdown</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>+ Add to Showdown</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
