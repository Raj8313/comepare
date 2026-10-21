import React from 'react';
import { Vehicle } from '../types/vehicle';
import { Zap, ShieldCheck, Plus, Check, Gauge, Fuel, Ruler } from 'lucide-react';

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
  const isBike = vehicle.category === 'bike';

  return (
    <div
      className={`group relative bg-surface-light dark:bg-surface-dark border-2 rounded-3xl overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-sm hover:-translate-y-1 ${
        isSelected
          ? 'border-neutral-950 dark:border-wa-green ring-4 ring-neutral-950/10 dark:ring-wa-green/20'
          : 'border-outline-light dark:border-outline-dark hover:border-neutral-900 dark:hover:border-neutral-300'
      }`}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Powertrain / EV Badge */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {isEv ? (
            <span className="flex items-center gap-1 px-3 py-1 text-[11px] font-black bg-wa-green text-neutral-950 rounded-full border border-neutral-900 shadow-sm">
              <Zap className="h-3 w-3 fill-neutral-950" />
              <span>EV</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 text-[11px] font-black bg-white text-neutral-900 border border-neutral-900 rounded-full shadow-sm">
              <Fuel className="h-3 w-3" />
              <span className="capitalize">{vehicle.powertrain}</span>
            </span>
          )}

          {vehicle.safety.ncapRatingStars && vehicle.safety.ncapRatingStars >= 4 && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-black bg-white text-amber-900 border border-neutral-900 rounded-full shadow-sm">
              <ShieldCheck className="h-3 w-3 text-amber-600" />
              <span>{vehicle.safety.ncapRatingStars}★</span>
            </span>
          )}
        </div>

        {/* + Pair Action Pill (WhatsApp Green) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(vehicle);
          }}
          className={`absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition shadow-sm active:scale-95 ${
            isSelected
              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border border-neutral-900'
              : 'bg-wa-green text-neutral-950 border border-neutral-900 hover:bg-wa-greenHover'
          }`}
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
        <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between z-10 text-white">
          <div>
            <span className="text-[10px] font-bold text-neutral-300 block uppercase tracking-wider">{vehicle.brand}</span>
            <h3 className="text-base font-black text-white leading-tight drop-shadow-md">{vehicle.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-300 uppercase tracking-wider block font-bold">Ex-Showroom</span>
            <span className="text-sm font-black text-white font-mono drop-shadow-md">
              ₹{vehicle.priceRange.min}L - {vehicle.priceRange.max}L
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        
        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed font-medium">
          {vehicle.tagline}
        </p>

        {/* Mini Spec Telemetry Box */}
        <div className="grid grid-cols-3 gap-2 bg-surface-subtle-light dark:bg-surface-subtle-dark p-3 rounded-2xl border border-outline-light/40 dark:border-outline-dark text-center text-xs">
          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Gauge className="h-2.5 w-2.5" /> Power
            </span>
            <span className="font-mono font-black text-neutral-900 dark:text-neutral-100 mt-0.5 block">
              {vehicle.performance.powerBhp} bhp
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              {isEv ? 'Real Range' : 'Real Mileage'}
            </span>
            <span className="font-mono font-black text-[#15803d] dark:text-wa-green mt-0.5 block truncate">
              {isEv
                ? vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km'
                : vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km/l'}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Ruler className="h-2.5 w-2.5" /> {isBike ? 'Seat Ht' : 'Ground Clr'}
            </span>
            <span className="font-mono font-black text-neutral-900 dark:text-neutral-100 mt-0.5 block">
              {isBike
                ? `${vehicle.dimensions.seatHeightMm} mm`
                : `${vehicle.dimensions.groundClearanceMm} mm`}
            </span>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[11px] font-bold text-neutral-500">
            {vehicle.variants.length} Trims available
          </span>
          <button
            onClick={() => onQuickView(vehicle)}
            className="text-xs font-black text-neutral-900 dark:text-wa-green underline underline-offset-4 hover:opacity-80 transition"
          >
            Inspect Specs →
          </button>
        </div>

      </div>
    </div>
  );
};
