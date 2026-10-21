import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Zap, ShieldCheck, Plus, Check, Gauge, Fuel, Ruler, Disc } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onToggleSelect: (vehicle: Vehicle) => void;
  onQuickView: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isSelected,
  onToggleSelect,
  onQuickView,
}) => {
  const isEv = vehicle.powertrain === 'ev';
  const isDiesel = vehicle.powertrain === 'diesel';
  const isBike = vehicle.category === 'bike';

  return (
    <div
      onClick={() => onQuickView(vehicle)}
      className={`group relative bg-surface-light dark:bg-surface-dark border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-soft-lift dark:shadow-soft-lift-dark hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
        isSelected
          ? 'ring-2'
          : 'border-borderLine-light dark:border-borderLine-dark hover:border-neutral-400 dark:hover:border-neutral-500'
      }`}
      style={{
        borderColor: isSelected ? 'var(--pt-accent)' : undefined,
      }}
    >
      {/* Top Image Banner */}
      <div className="relative h-52 w-full overflow-hidden bg-surface-subtle-light dark:bg-surface-subtle-dark border-b border-borderLine-light dark:border-borderLine-dark">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Powertrain / EV Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
          {isEv && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-emerald-500 text-neutral-950 rounded-lg shadow-sm">
              <Zap className="h-3.5 w-3.5 fill-neutral-950" />
              <span>EV</span>
            </span>
          )}
          {!isEv && isDiesel && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-slate-700 text-white border border-slate-600 rounded-lg shadow-sm">
              <Disc className="h-3.5 w-3.5" />
              <span>Diesel</span>
            </span>
          )}
          {!isEv && !isDiesel && (
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-amber-500 text-neutral-950 rounded-lg shadow-sm">
              <Fuel className="h-3.5 w-3.5" />
              <span className="capitalize">{vehicle.powertrain}</span>
            </span>
          )}

          {vehicle.safety.ncapRatingStars && vehicle.safety.ncapRatingStars >= 4 && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-white/95 dark:bg-neutral-900/90 text-amber-800 dark:text-amber-300 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              <span>{vehicle.safety.ncapRatingStars}★</span>
            </span>
          )}
        </div>

        {/* Pair Action Button with Dynamic Powertrain Accent */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(vehicle);
          }}
          aria-pressed={isSelected}
          aria-label={isSelected ? `Remove ${vehicle.name} from comparison` : `Add ${vehicle.name} to showdown comparison`}
          className={`absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
            isSelected
              ? 'text-neutral-950 font-black'
              : 'bg-white/95 dark:bg-neutral-900/90 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:brightness-105'
          }`}
          style={{
            backgroundColor: isSelected ? 'var(--pt-accent)' : undefined,
          }}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>Paired</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>+ Pair</span>
            </>
          )}
        </button>

        {/* Vehicle Brand & Name overlay */}
        <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-1">
            <span className="uppercase tracking-wider text-xs font-bold text-neutral-300">{vehicle.brand}</span>
            <span className="font-mono font-bold text-xs text-white bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/15">
              ₹{vehicle.priceRange.min}L – {vehicle.priceRange.max}L
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-sm line-clamp-1">
            {vehicle.name}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 space-y-5 flex-1 flex flex-col justify-between">
        
        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed min-h-[42px]">
          {vehicle.tagline}
        </p>

        {/* Mini Spec Telemetry Box */}
        <div className="bg-surface-subtle-light/60 dark:bg-surface-subtle-dark/60 p-3.5 rounded-2xl border border-borderLine-light dark:border-borderLine-dark">
          <div className="grid grid-cols-3 divide-x divide-borderLine-light dark:divide-borderLine-dark text-center">
            <div className="px-1.5">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Gauge className="h-3 w-3" /> Power
              </span>
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 text-sm mt-1.5 block">
                {vehicle.performance.powerBhp} <span className="text-xs font-normal text-neutral-500">bhp</span>
              </span>
            </div>

            <div className="px-1.5">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                {isEv ? 'Range' : 'Mileage'}
              </span>
              <span
                className="font-mono font-bold text-sm mt-1.5 block"
                style={{
                  color: isEv ? 'var(--pt-accent-text)' : isDiesel ? '#334155' : '#92400e'
                }}
              >
                {isEv
                  ? vehicle.efficiency.realWorldEfficiency.split(' ')[0]
                  : vehicle.efficiency.realWorldEfficiency.split(' ')[0]}
                <span className="text-xs font-normal text-neutral-500"> {isEv ? 'km' : 'km/l'}</span>
              </span>
            </div>

            <div className="px-1.5">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Ruler className="h-3 w-3" /> {isBike ? 'Seat Ht' : 'Clearance'}
              </span>
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 text-sm mt-1.5 block">
                {isBike ? vehicle.dimensions.seatHeightMm : vehicle.dimensions.groundClearanceMm} <span className="text-xs font-normal text-neutral-500">mm</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-borderLine-light/60 dark:border-borderLine-dark/60">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {vehicle.variants.length} Trims available
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(vehicle);
            }}
            aria-label={`Inspect detailed specifications for ${vehicle.brand} ${vehicle.name}`}
            className="text-sm font-bold transition flex items-center gap-1 group-hover:gap-1.5 duration-200 focus:outline-none focus:underline rounded"
            style={{ color: 'var(--pt-accent-text)' }}
          >
            <span>Inspect Specs</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
