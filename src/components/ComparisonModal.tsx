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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex flex-col justify-between">
      
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-40 bg-canvas-light/95 dark:bg-canvas-dark/95 border-b-2 border-outline-light dark:border-outline-dark px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-lg shadow-sm transition-colors">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
              Come<span className="text-[#15803d] dark:text-wa-green">Pare</span> Showdown
            </span>
            <span className="px-3 py-0.5 text-xs font-black bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white border-2 border-outline-light dark:border-outline-dark rounded-full">
              {vehicles.length} Vehicles
            </span>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="hidden sm:inline-flex p-1 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark text-xs font-bold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition ${
                activeTab === 'specs'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <TableProperties className="h-3.5 w-3.5" />
              <span>Full Specs</span>
            </button>
            <button
              onClick={() => setActiveTab('cost')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition ${
                activeTab === 'cost'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              <span>Running Cost</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition ${
                activeTab === 'visual'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
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
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border-2 transition ${
                showDiffsOnly
                  ? 'bg-amber-400 text-neutral-950 border-neutral-900 shadow-sm'
                  : 'bg-surface-light dark:bg-surface-dark text-neutral-800 dark:text-neutral-200 border-outline-light dark:border-outline-dark hover:border-neutral-900'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>{showDiffsOnly ? 'Differences Only' : 'Highlight Differences'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition active:scale-95"
            title="Close"
          >
            <X className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>

      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Render Tab Contents */}
        {activeTab === 'cost' && <CostCalculator vehicles={vehicles} />}
        {activeTab === 'visual' && <VisualDimensionOverlay vehicles={vehicles} />}

        {activeTab === 'specs' && (
          <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl overflow-hidden shadow-xl transition-colors">
            
            {/* Sticky Vehicle Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b-2 border-outline-light dark:border-outline-dark bg-surface-subtle-light dark:bg-surface-subtle-dark divide-y md:divide-y-0 md:divide-x-2 divide-outline-light dark:divide-outline-dark">
              <div className="p-5 flex flex-col justify-center">
                <span className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider block">
                  Head-to-Head
                </span>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                  Switch variants to view live prices and package upgrades.
                </p>
              </div>

              {vehicles.map((v) => {
                const currentVariant = v.variants.find(
                  (variant) => variant.id === selectedVariantIds[v.id]
                ) || v.variants[0];

                return (
                  <div key={v.id} className="p-5 space-y-3 relative">
                    <button
                      onClick={() => onRemoveVehicle(v.id)}
                      className="absolute top-3 right-3 p-1 text-neutral-400 hover:text-rose-600 transition"
                      title="Remove"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={v.name} className="h-12 w-16 object-cover rounded-xl border border-outline-light dark:border-outline-dark shrink-0" />
                      <div>
                        <span className="text-[10px] text-neutral-500 uppercase font-black block">{v.brand}</span>
                        <h4 className="text-sm font-black text-neutral-900 dark:text-white leading-tight">{v.name}</h4>
                      </div>
                    </div>

                    {/* Variant Selector Dropdown */}
                    {v.variants.length > 0 && (
                      <div>
                        <label className="text-[10px] font-black text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                          Trim / Variant:
                        </label>
                        <select
                          value={selectedVariantIds[v.id]}
                          onChange={(e) => handleVariantChange(v.id, e.target.value)}
                          className="w-full bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-xl px-2.5 py-1.5 text-xs text-neutral-900 dark:text-wa-green font-black focus:outline-none focus:border-wa-green"
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
                    <div className="bg-surface-light dark:bg-surface-dark p-2.5 rounded-xl border border-outline-light dark:border-outline-dark flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-bold">Trim Price:</span>
                      <span className="font-mono font-black text-neutral-900 dark:text-wa-green text-sm">
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
            <div className="divide-y-2 divide-outline-light/30 dark:divide-outline-dark text-xs font-semibold">
              
              {/* Category 1: Powertrain & Energy */}
              <div>
                <div className="px-5 py-2.5 font-black text-[11px] uppercase tracking-wider text-neutral-900 dark:text-wa-green bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
                  Powertrain, Battery & Efficiency
                </div>

                {/* Powertrain Type */}
                {(!showDiffsOnly || !isIdentical(v => v.powertrain)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Fuel / Powertrain</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-black capitalize flex items-center gap-1.5">
                        {v.powertrain === 'ev' ? (
                          <span className="text-[#15803d] dark:text-wa-green flex items-center gap-1">
                            <Zap className="h-3 w-3 fill-current" /> Pure Electric (EV)
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                            <Fuel className="h-3 w-3" /> {v.powertrain}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Max Power */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.powerBhp)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Peak Power</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.performance.powerBhp} bhp
                      </div>
                    ))}
                  </div>
                )}

                {/* Torque */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.torqueNm)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Max Torque</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.performance.torqueNm} Nm
                      </div>
                    ))}
                  </div>
                )}

                {/* Battery Size (if EV) */}
                {vehicles.some(v => v.efficiency.batteryKwh) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Battery Capacity (kWh)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-[#15803d] dark:text-wa-green">
                        {v.efficiency.batteryKwh ? `${v.efficiency.batteryKwh} kWh (${v.efficiency.batteryChemistry || 'LFP'})` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Real-World Mileage / Range */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.realWorldEfficiency)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Tested Real-World Range/Mileage</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-[#15803d] dark:text-wa-green">
                        {v.efficiency.realWorldEfficiency}
                      </div>
                    ))}
                  </div>
                )}

                {/* Running Cost Per Km */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.energyCostPerKmInr)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Direct Fuel Cost / Km</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        ₹{v.efficiency.energyCostPerKmInr.toFixed(2)} / km
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 2: Dimensions & Ergonomics */}
              <div>
                <div className="px-5 py-2.5 font-black text-[11px] uppercase tracking-wider text-neutral-900 dark:text-wa-green bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
                  Dimensions, Weight & Clearance
                </div>

                {/* Ground Clearance */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.groundClearanceMm)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Ground Clearance</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.dimensions.groundClearanceMm} mm
                      </div>
                    ))}
                  </div>
                )}

                {/* Bike Seat Height */}
                {vehicles.some(v => v.dimensions.seatHeightMm) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Rider Seat Height (Bikes)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.dimensions.seatHeightMm ? `${v.dimensions.seatHeightMm} mm` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Kerb Weight */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.kerbWeightKg)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Kerb Weight</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.dimensions.kerbWeightKg} kg
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 3: Safety & Crash Test */}
              <div>
                <div className="px-5 py-2.5 font-black text-[11px] uppercase tracking-wider text-neutral-900 dark:text-wa-green bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
                  Safety, Crash Rating & Brakes
                </div>

                {/* NCAP Stars */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.ncapRatingStars)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Crash Test Rating</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-black text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        {v.safety.ncapRatingStars ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            <span>{v.safety.ncapRatingStars}-Star ({v.safety.ncapAuthority})</span>
                          </>
                        ) : (
                          <span className="text-neutral-400">Not Tested / 2W</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ADAS Level */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.adasLevel)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Autonomous Safety (ADAS)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-black">
                        {v.safety.adasLevel && v.safety.adasLevel !== 'None' ? (
                          <span className="text-[#15803d] dark:text-wa-green">{v.safety.adasLevel} Active Safety</span>
                        ) : (
                          <span className="text-neutral-400">None</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Standard Airbags */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.airbagsStandard)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Airbags (Standard)</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.safety.airbagsStandard > 0 ? `${v.safety.airbagsStandard} Airbags` : 'N/A (2-Wheeler)'}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 4: Comfort & Tech */}
              <div>
                <div className="px-5 py-2.5 font-black text-[11px] uppercase tracking-wider text-neutral-900 dark:text-wa-green bg-surface-subtle-light dark:bg-surface-subtle-dark border-b-2 border-outline-light dark:border-outline-dark">
                  Infotainment & Cabin Tech
                </div>

                {/* Screen */}
                {(!showDiffsOnly || !isIdentical(v => v.features.screenSizeInches)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Display Size</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-mono font-black text-neutral-900 dark:text-white">
                        {v.features.screenSizeInches ? `${v.features.screenSizeInches}-inch` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Ventilated Seats */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasVentilatedSeats)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40">
                    <span className="text-neutral-500">Ventilated Seats</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-black">
                        {v.features.hasVentilatedSeats ? (
                          <span className="text-[#15803d] dark:text-wa-green flex items-center gap-1">
                            <Check className="h-4 w-4 stroke-[3]" /> Available
                          </span>
                        ) : (
                          <span className="text-neutral-400">No</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Sunroof */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasSunroof)) && (
                  <div className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x-2 divide-outline-light/30 dark:divide-outline-dark items-center">
                    <span className="text-neutral-500">Sunroof</span>
                    {vehicles.map(v => (
                      <div key={v.id} className="p-1 font-black">
                        {v.features.hasSunroof ? (
                          <span className="text-[#15803d] dark:text-wa-green flex items-center gap-1">
                            <Check className="h-4 w-4 stroke-[3]" /> Yes
                          </span>
                        ) : (
                          <span className="text-neutral-400">No</span>
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
