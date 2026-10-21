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
      className={`group relative bg-surface-light dark:bg-surface-dark border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-soft-lift dark:shadow-soft-lift-dark hover:-translate-y-1 hover:shadow-md ${
        isSelected
          ? 'ring-2'
          : 'border-borderLine-light dark:border-borderLine-dark hover:border-neutral-400 dark:hover:border-neutral-500'
      }`}
      style={{
        borderColor: isSelected ? 'var(--pt-accent)' : undefined,
      }}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-surface-subtle-light dark:bg-surface-subtle-dark border-b border-borderLine-light dark:border-borderLine-dark">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Powertrain / EV Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isEv && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-500 text-neutral-950 rounded-lg shadow-sm">
              <Zap className="h-3 w-3 fill-neutral-950" />
              <span>EV</span>
            </span>
          )}
          {!isEv && isDiesel && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-slate-700 text-white border border-slate-600 rounded-lg shadow-sm">
              <Disc className="h-3 w-3" />
              <span>Diesel</span>
            </span>
          )}
          {!isEv && !isDiesel && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-neutral-950 rounded-lg shadow-sm">
              <Fuel className="h-3 w-3" />
              <span className="capitalize">{vehicle.powertrain}</span>
            </span>
          )}

          {vehicle.safety.ncapRatingStars && vehicle.safety.ncapRatingStars >= 4 && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-white/95 dark:bg-neutral-900/90 text-amber-800 dark:text-amber-300 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3 text-amber-600 dark:text-amber-400" />
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
          className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm active:scale-95 ${
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
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-baseline justify-between z-10 text-white">
          <div>
            <span className="text-[10px] font-bold text-neutral-300 block uppercase tracking-wider">{vehicle.brand}</span>
            <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-md">{vehicle.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-300 uppercase tracking-wider block font-medium">Ex-Showroom</span>
            <span className="text-sm font-black text-white font-mono drop-shadow-md">
              ₹{vehicle.priceRange.min}L - {vehicle.priceRange.max}L
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
        
        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {vehicle.tagline}
        </p>

        {/* Mini Spec Telemetry Box */}
        <div className="grid grid-cols-3 gap-2 bg-surface-subtle-light/70 dark:bg-surface-subtle-dark/70 p-2.5 rounded-xl border border-borderLine-light dark:border-borderLine-dark text-center text-xs">
          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Gauge className="h-2.5 w-2.5" /> Power
            </span>
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 block">
              {vehicle.performance.powerBhp} bhp
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
              {isEv ? 'Real Range' : 'Real Mileage'}
            </span>
            <span
              className="font-mono font-bold mt-0.5 block truncate"
              style={{
                color: isEv ? '#10B981' : isDiesel ? '#64748B' : '#F59E0B'
              }}
            >
              {isEv
                ? vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km'
                : vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km/l'}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Ruler className="h-2.5 w-2.5" /> {isBike ? 'Seat Ht' : 'Ground Clr'}
            </span>
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200 mt-0.5 block">
              {isBike
                ? `${vehicle.dimensions.seatHeightMm} mm`
                : `${vehicle.dimensions.groundClearanceMm} mm`}
            </span>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[11px] font-medium text-neutral-400">
            {vehicle.variants.length} Trims available
          </span>
          <button
            onClick={() => onQuickView(vehicle)}
            className="text-xs font-bold transition hover:underline"
            style={{ color: 'var(--pt-accent)' }}
          >
            Inspect Specs →
          </button>
        </div>

      </div>
    </div>
  );
};
