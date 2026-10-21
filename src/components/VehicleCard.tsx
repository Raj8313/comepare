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
      className={`group relative bg-slate-900/70 border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/5 ${
        isSelected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-slate-900/90'
          : 'border-slate-800/80'
      }`}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* Powertrain / EV Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isEv ? (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-emerald-500/90 text-slate-950 rounded-full shadow-md backdrop-blur-md">
              <Zap className="h-3 w-3 fill-slate-950" />
              <span>EV</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-slate-900/80 text-amber-300 border border-amber-500/30 rounded-full backdrop-blur-md">
              <Fuel className="h-3 w-3" />
              <span className="capitalize">{vehicle.powertrain}</span>
            </span>
          )}

          {vehicle.safety.ncapRatingStars && vehicle.safety.ncapRatingStars >= 4 && (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full backdrop-blur-md">
              <ShieldCheck className="h-3 w-3 text-amber-400" />
              <span>{vehicle.safety.ncapRatingStars}★</span>
            </span>
          )}
        </div>

        {/* Pair Button (Corner Overlay) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(vehicle);
          }}
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-lg backdrop-blur-md active:scale-90 ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-indigo-600/30'
              : 'bg-slate-950/80 text-white border border-slate-700/80 hover:bg-indigo-600 hover:border-indigo-600'
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

        {/* Pricing Ribbon at Bottom of Image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block">{vehicle.brand}</span>
            <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-sm">{vehicle.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Ex-Showroom</span>
            <span className="text-sm font-extrabold text-indigo-400 font-mono">
              ₹{vehicle.priceRange.min}L - {vehicle.priceRange.max}L
            </span>
          </div>
        </div>
      </div>

      {/* Card Content & Spec Badges */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {vehicle.tagline}
        </p>

        {/* Mini Spec Matrix */}
        <div className="grid grid-cols-3 gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 text-center text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Gauge className="h-2.5 w-2.5" /> Power
            </span>
            <span className="font-mono font-bold text-slate-200 mt-0.5 block">
              {vehicle.performance.powerBhp} bhp
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              {isEv ? 'Real Range' : 'Real Mileage'}
            </span>
            <span className="font-mono font-bold text-emerald-400 mt-0.5 block truncate">
              {isEv
                ? vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km'
                : vehicle.efficiency.realWorldEfficiency.split(' ')[0] + ' km/l'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-center gap-1">
              <Ruler className="h-2.5 w-2.5" /> {isBike ? 'Seat Ht' : 'Ground Clr'}
            </span>
            <span className="font-mono font-bold text-slate-200 mt-0.5 block">
              {isBike
                ? `${vehicle.dimensions.seatHeightMm} mm`
                : `${vehicle.dimensions.groundClearanceMm} mm`}
            </span>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[11px] text-slate-500">
            {vehicle.variants.length} Trims available
          </span>
          <button
            onClick={() => onQuickView(vehicle)}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            Inspect Specs →
          </button>
        </div>

      </div>
    </div>
  );
};
