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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Banner with Image */}
        <div className="relative h-56 w-full bg-slate-950">
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/80 text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{vehicle.brand}</span>
              <h2 className="text-2xl font-black text-white">{vehicle.name}</h2>
              <p className="text-xs text-slate-300 mt-0.5">{vehicle.tagline}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block uppercase">Price Band</span>
              <span className="text-lg font-black text-indigo-400 font-mono">
                ₹{vehicle.priceRange.min}L - ₹{vehicle.priceRange.max}L
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-center gap-1">
                <Gauge className="h-3 w-3" /> Power
              </span>
              <span className="text-sm font-bold font-mono text-slate-200 mt-1 block">
                {vehicle.performance.powerBhp} bhp
              </span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-center gap-1">
                {isEv ? <Zap className="h-3 w-3 text-emerald-400" /> : <Fuel className="h-3 w-3 text-amber-400" />}
                {isEv ? 'Real Range' : 'Real Mileage'}
              </span>
              <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">
                {vehicle.efficiency.realWorldEfficiency.split(' ')[0]} {isEv ? 'km' : 'km/l'}
              </span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-center gap-1">
                <Ruler className="h-3 w-3" /> {isBike ? 'Seat Height' : 'Ground Clr'}
              </span>
              <span className="text-sm font-bold font-mono text-slate-200 mt-1 block">
                {isBike ? `${vehicle.dimensions.seatHeightMm} mm` : `${vehicle.dimensions.groundClearanceMm} mm`}
              </span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-amber-400" /> NCAP Crash
              </span>
              <span className="text-sm font-bold font-mono text-amber-400 mt-1 block">
                {vehicle.safety.ncapRatingStars ? `${vehicle.safety.ncapRatingStars} Stars` : 'N/A'}
              </span>
            </div>
          </div>

          {/* EV Specific Battery Info */}
          {isEv && vehicle.efficiency.batteryKwh && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <BatteryCharging className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {vehicle.efficiency.batteryKwh} kWh {vehicle.efficiency.batteryChemistry} Battery
                  </span>
                  <span className="text-[11px] text-slate-400">
                    DC Fast Charge 10-80% in {vehicle.efficiency.dcChargingTime10To80Min} mins ({vehicle.efficiency.dcFastChargingKw} kW)
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                ₹{vehicle.efficiency.energyCostPerKmInr}/km running
              </span>
            </div>
          )}

          {/* Trims & Variants Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Available Trims & What They Add
            </h4>
            <div className="space-y-2">
              {vehicle.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{variant.name}</span>
                      {variant.transmission && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {variant.transmission}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {variant.keyDifferentiators.map((diff, i) => (
                        <span key={i} className="text-[10px] text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/50">
                          + {diff}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold font-mono text-indigo-400">
                      ₹{(variant.priceExShowroom / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Zero-Spam Promise: No phone number required to view specs.
          </span>
          <button
            onClick={() => {
              onToggleSelect(vehicle);
              onClose();
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              isSelected
                ? 'bg-slate-800 text-slate-300 hover:text-white'
                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4" />
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
