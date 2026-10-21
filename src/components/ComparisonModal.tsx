import React, { useState } from 'react';
import { Vehicle } from '../types/vehicle';
import { CostCalculator } from './CostCalculator';
import { VisualDimensionOverlay } from './VisualDimensionOverlay';
import {
  X,
  Zap,
  Check,
  Fuel,
  ShieldCheck,
  Sliders,
  DollarSign,
  Maximize2,
  TableProperties,
} from 'lucide-react';

interface ComparisonModalProps {
  vehicles: Vehicle[];
  onClose: () => void;
  onRemoveVehicle: (id: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  vehicles,
  onClose,
  onRemoveVehicle,
}) => {
  const [showDiffsOnly, setShowDiffsOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'cost' | 'visual'>('specs');

  const [selectedVariantIds, setSelectedVariantIds] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    vehicles.forEach((v) => {
      if (v.variants.length > 0) {
        initial[v.id] = v.variants[0].id;
      }
    });
    return initial;
  });

  const handleVariantChange = (vehicleId: string, variantId: string) => {
    setSelectedVariantIds((prev) => ({ ...prev, [vehicleId]: variantId }));
  };

  const isIdentical = (getter: (v: Vehicle) => any) => {
    if (vehicles.length < 2) return false;
    const firstVal = String(getter(vehicles[0]));
    return vehicles.every((v) => String(getter(v)) === firstVal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex flex-col justify-between">
      
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-lg shadow-sm dark:shadow-none transition-colors">
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Come<span className="text-indigo-600 dark:text-indigo-400">Pare</span> Showdown
            </span>
            <span className="px-2 py-0.5 text-xs font-bold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 rounded-full">
              {vehicles.length} Vehicles
            </span>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="hidden sm:inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'specs'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableProperties className="h-3.5 w-3.5" />
              <span>Full Specs</span>
            </button>
            <button
              onClick={() => setActiveTab('cost')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'cost'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              <span>Fuel/Running Cost</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'visual'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Visual Stance</span>
            </button>
          </div>
        </div>

        {/* Diff Switch & Close */}
        <div className="flex items-center gap-3">
          {activeTab === 'specs' && (
            <button
              onClick={() => setShowDiffsOnly(!showDiffsOnly)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                showDiffsOnly
                  ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/50 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-slate-400'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>{showDiffsOnly ? 'Showing Differences Only' : 'Highlight Differences'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            title="Close comparison"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Render Tab Contents */}
        {activeTab === 'cost' && <CostCalculator vehicles={vehicles} />}
        {activeTab === 'visual' && <VisualDimensionOverlay vehicles={vehicles} />}

        {activeTab === 'specs' && (
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-colors">
            
            {/* Sticky Vehicle Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/90 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
              <div className="p-4 flex flex-col justify-center bg-slate-100/50 dark:bg-slate-950/50">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Head-to-Head
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-500 mt-1">
                  Change trims to cross-examine specific features & pricing in real-time.
                </p>
              </div>

              {vehicles.map((v) => {
                const currentVariant = v.variants.find(
                  (variant) => variant.id === selectedVariantIds[v.id]
                ) || v.variants[0];

                return (
                  <div key={v.id} className="p-4 space-y-3 relative">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-500 transition"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={v.name} className="h-12 w-16 object-cover rounded-lg shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">{v.brand}</span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{v.name}</h4>
                      </div>
                    </div>

                    {/* Variant Selector Dropdown */}
                    {v.variants.length > 0 && (
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                          Trim / Variant:
                        </label>
                        <select
                          value={selectedVariantIds[v.id]}
                          onChange={(e) => handleVariantChange(v.id, e.target.value)}
                          className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-bold focus:outline-none focus:border-indigo-500"
                        >
                          {v.variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.name} — ₹{(variant.priceExShowroom / 100000).toFixed(2)}L
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Pricing Display */}
                    <div className="bg-slate-100 dark:bg-slate-950/70 p-2 rounded-lg border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Trim Price:</span>
                      <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">
                        {currentVariant
                          ? `₹${(currentVariant.priceExShowroom / 100000).toFixed(2)} Lakh`
                          : `₹${v.priceRange.min}L`}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Spec Sections */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800/80 text-xs">
              
              {/* Category 1: Powertrain & Energy */}
              <div>
                <div className="px-4 py-2 font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                  Powertrain, Battery & Efficiency
                </div>

                {/* Powertrain Type */}
                {(!showDiffsOnly || !isIdentical(v => v.powertrain)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Fuel / Powertrain</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold capitalize flex items-center gap-1.5">
                        {v.powertrain === 'ev' ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Zap className="h-3 w-3" /> Pure Electric (EV)
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-300 flex items-center gap-1">
                            <Fuel className="h-3 w-3" /> {v.powertrain}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Max Power */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.powerBhp)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Peak Power</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.performance.powerBhp} bhp
                      </div>
                    ))}
                  </div>
                )}

                {/* Torque */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.torqueNm)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Max Torque</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.performance.torqueNm} Nm
                      </div>
                    ))}
                  </div>
                )}

                {/* Battery Size (if EV) */}
                {vehicles.some(v => v.efficiency.batteryKwh) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Battery Capacity (kWh)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {v.efficiency.batteryKwh ? `${v.efficiency.batteryKwh} kWh (${v.efficiency.batteryChemistry || 'LFP'})` : '— (N/A)'}
                      </div>
                    ))}
                  </div>
                )}

                {/* DC Fast Charge Time (10-80%) */}
                {vehicles.some(v => v.efficiency.dcChargingTime10To80Min) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">DC Fast Charge (10-80%)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.efficiency.dcChargingTime10To80Min ? `${v.efficiency.dcChargingTime10To80Min} mins (${v.efficiency.dcFastChargingKw} kW)` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Real-World Mileage / Range */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.realWorldEfficiency)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Tested Real-World Range/Mileage</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                        {v.efficiency.realWorldEfficiency}
                      </div>
                    ))}
                  </div>
                )}

                {/* Running Cost Per Km */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.energyCostPerKmInr)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Direct Fuel Cost / Km</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                        ₹{v.efficiency.energyCostPerKmInr.toFixed(2)} / km
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 2: Dimensions & Ergonomics */}
              <div>
                <div className="px-4 py-2 font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                  Dimensions, Weight & Clearance
                </div>

                {/* Ground Clearance */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.groundClearanceMm)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Ground Clearance</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.dimensions.groundClearanceMm} mm
                      </div>
                    ))}
                  </div>
                )}

                {/* Bike Seat Height */}
                {vehicles.some(v => v.dimensions.seatHeightMm) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Rider Seat Height (Bikes)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.dimensions.seatHeightMm ? `${v.dimensions.seatHeightMm} mm` : '— (Car)'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Kerb Weight */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.kerbWeightKg)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Kerb Weight</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.dimensions.kerbWeightKg} kg
                      </div>
                    ))}
                  </div>
                )}

                {/* Boot Space */}
                {vehicles.some(v => v.dimensions.bootSpaceLitres) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Boot Space / Storage</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.dimensions.bootSpaceLitres ? `${v.dimensions.bootSpaceLitres} Litres` : '—'}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 3: Safety & Crash Test */}
              <div>
                <div className="px-4 py-2 font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                  Safety, Crash Rating & Brakes
                </div>

                {/* NCAP Stars */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.ncapRatingStars)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Crash Test Rating</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold text-amber-500 flex items-center gap-1">
                        {v.safety.ncapRatingStars ? (
                          <>
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>{v.safety.ncapRatingStars}-Star ({v.safety.ncapAuthority})</span>
                          </>
                        ) : (
                          <span className="text-slate-400">Not Tested / 2W</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ADAS Level */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.adasLevel)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Autonomous Safety (ADAS)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold text-slate-800 dark:text-slate-200">
                        {v.safety.adasLevel && v.safety.adasLevel !== 'None' ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{v.safety.adasLevel} Active Safety</span>
                        ) : (
                          <span className="text-slate-400">None</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Standard Airbags */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.airbagsStandard)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Airbags (Standard)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.safety.airbagsStandard > 0 ? `${v.safety.airbagsStandard} Airbags` : 'N/A (Two-Wheeler)'}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 4: Comfort, Infotainment & Gadgets */}
              <div>
                <div className="px-4 py-2 font-bold text-[11px] uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
                  Infotainment & Cabin Tech
                </div>

                {/* Touchscreen Size */}
                {(!showDiffsOnly || !isIdentical(v => v.features.screenSizeInches)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Display Size</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {v.features.screenSizeInches ? `${v.features.screenSizeInches}-inch` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Ventilated Seats */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasVentilatedSeats)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Ventilated Seats</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold">
                        {v.features.hasVentilatedSeats ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Available
                          </span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Sunroof */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasSunroof)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Sunroof / Glass Roof</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold">
                        {v.features.hasSunroof ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 360 Camera */}
                {(!showDiffsOnly || !isIdentical(v => v.features.has360Camera)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3 md:divide-x divide-slate-200 dark:divide-slate-800/60 items-center bg-slate-50 dark:bg-slate-950/20">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">360 Surround View Camera</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-bold">
                        {v.features.has360Camera ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Yes
                          </span>
                        ) : (
                          <span className="text-slate-400">No</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
