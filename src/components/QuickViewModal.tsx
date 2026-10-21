import React, { useEffect } from 'react';
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vehicle) return null;

  const isEv = vehicle.powertrain === 'ev';
  const isBike = vehicle.category === 'bike';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 transition-colors">
        
        {/* Banner with Image */}
        <div className="relative h-56 w-full bg-surface-subtle-light dark:bg-surface-subtle-dark border-b border-borderLine-light dark:border-borderLine-dark">
          <img src={vehicle.image} alt={`${vehicle.brand} ${vehicle.name}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close vehicle details dialog"
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 text-white hover:bg-black transition active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white">
            <div>
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">{vehicle.brand}</span>
              <h2 id="quickview-title" className="text-2xl font-extrabold text-white">{vehicle.name}</h2>
              <p className="text-sm text-slate-100 mt-1">{vehicle.tagline}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-200 block uppercase tracking-wider">Price Band</span>
              <span className="text-xl font-black text-white font-mono">
                ₹{vehicle.priceRange.min}L - ₹{vehicle.priceRange.max}L
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-4 rounded-2xl border border-borderLine-light dark:border-borderLine-dark text-center">
              <span className="text-xs text-content-secondary uppercase font-bold tracking-wider flex items-center justify-center gap-1.5">
                <Gauge className="h-3.5 w-3.5" /> Power
              </span>
              <span className="text-base font-bold font-mono text-content-primary mt-1.5 block">
                {vehicle.performance.powerBhp} bhp
              </span>
            </div>

            <div className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-4 rounded-2xl border border-borderLine-light dark:border-borderLine-dark text-center">
              <span className="text-xs text-content-secondary uppercase font-bold tracking-wider flex items-center justify-center gap-1.5">
                {isEv ? <Zap className="h-3.5 w-3.5 fill-current" style={{ color: 'var(--pt-accent-text)' }} /> : <Fuel className="h-3.5 w-3.5" style={{ color: 'var(--pt-accent-text)' }} />}
                {isEv ? 'Real Range' : 'Real Mileage'}
              </span>
              <span className="text-base font-bold font-mono text-content-primary mt-1.5 block">
                {vehicle.efficiency.realWorldEfficiency.split(' ')[0]} {isEv ? 'km' : 'km/l'}
              </span>
            </div>

            <div className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-4 rounded-2xl border border-borderLine-light dark:border-borderLine-dark text-center">
              <span className="text-xs text-content-secondary uppercase font-bold tracking-wider flex items-center justify-center gap-1.5">
                <Ruler className="h-3.5 w-3.5" /> {isBike ? 'Seat Height' : 'Ground Clr'}
              </span>
              <span className="text-base font-bold font-mono text-content-primary mt-1.5 block">
                {isBike ? `${vehicle.dimensions.seatHeightMm} mm` : `${vehicle.dimensions.groundClearanceMm} mm`}
              </span>
            </div>

            <div className="bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-4 rounded-2xl border border-borderLine-light dark:border-borderLine-dark text-center">
              <span className="text-xs text-content-secondary uppercase font-bold tracking-wider flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-500" /> NCAP Crash
              </span>
              <span className="text-base font-bold font-mono text-content-primary mt-1.5 block">
                {vehicle.safety.ncapRatingStars ? `${vehicle.safety.ncapRatingStars} Stars` : 'N/A'}
              </span>
            </div>
          </div>

          {/* EV Specific Battery Info */}
          {isEv && vehicle.efficiency.batteryKwh && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-400">
                  <BatteryCharging className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-content-primary block">
                    {vehicle.efficiency.batteryKwh} kWh {vehicle.efficiency.batteryChemistry} Battery
                  </span>
                  <span className="text-xs text-content-secondary mt-0.5 block">
                    DC Fast Charge 10-80% in {vehicle.efficiency.dcChargingTime10To80Min} mins ({vehicle.efficiency.dcFastChargingKw} kW)
                  </span>
                </div>
              </div>
              <span className="text-sm font-mono font-bold" style={{ color: 'var(--pt-accent-text)' }}>
                ₹{vehicle.efficiency.energyCostPerKmInr}/km running
              </span>
            </div>
          )}

          {/* Trims & Variants Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-content-secondary uppercase tracking-wider mb-3">
              Available Trims & What They Add
            </h3>
            <div className="space-y-2">
              {vehicle.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="p-4 rounded-xl bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 border border-borderLine-light dark:border-borderLine-dark flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-content-primary">{variant.name}</span>
                      {variant.transmission && (
                        <span className="text-xs px-2.5 py-0.5 rounded-lg bg-surface-light dark:bg-neutral-800 text-content-secondary border border-borderLine-light dark:border-neutral-700 font-semibold">
                          {variant.transmission}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {variant.keyDifferentiators.map((diff, i) => (
                        <span key={i} className="text-xs text-content-secondary bg-surface-light dark:bg-surface-dark px-2.5 py-1 rounded-lg border border-borderLine-light dark:border-borderLine-dark font-medium">
                          + {diff}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold font-mono text-content-primary">
                      ₹{(variant.priceExShowroom / 100000).toFixed(2)} Lakh
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-surface-subtle-light dark:bg-surface-subtle-dark border-t border-borderLine-light dark:border-borderLine-dark flex items-center justify-between">
          <span className="text-xs text-content-secondary font-medium">
            Zero-Spam Promise: No phone number required to view specs.
          </span>
          <button
            onClick={() => {
              onToggleSelect(vehicle);
              onClose();
            }}
            aria-pressed={isSelected}
            aria-label={isSelected ? `Remove ${vehicle.name} from showdown` : `Add ${vehicle.name} to showdown`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition active:scale-95 shadow-sm ${
              isSelected
                ? 'bg-surface-light dark:bg-surface-dark text-content-primary border border-borderLine-light dark:border-borderLine-dark'
                : 'font-black hover:brightness-105'
            }`}
            style={{
              backgroundColor: isSelected ? undefined : 'var(--pt-accent)',
              color: isSelected ? undefined : 'var(--pt-on-accent)',
            }}
          >
            {isSelected ? (
              <>
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Added to Showdown</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add to Showdown</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
