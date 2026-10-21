import React, { useState, useEffect } from 'react';
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
  Disc,
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-md flex flex-col justify-between"
    >
      
      {/* Top Fixed Header */}
      <div className="sticky top-0 z-40 bg-canvas-light/95 dark:bg-canvas-dark/95 border-b border-borderLine-light dark:border-borderLine-dark px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-lg shadow-sm transition-colors duration-300">
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 id="comparison-dialog-title" className="text-lg font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Come<span style={{ color: 'var(--pt-accent-text)' }}>Pare</span> Showdown
            </h2>
            <span
              className="px-2.5 py-0.5 text-xs font-bold rounded-full border transition-colors duration-300"
              style={{
                backgroundColor: 'var(--pt-accent-subtle)',
                borderColor: 'var(--pt-accent-border)',
                color: 'var(--pt-accent-text)',
              }}
            >
              {vehicles.length} Vehicles
            </span>
          </div>

          {/* Sub Navigation Tabs */}
          <div role="tablist" aria-label="Comparison views" className="hidden sm:inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-xs font-semibold">
            <button
              role="tab"
              aria-selected={activeTab === 'specs'}
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'specs'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <TableProperties className="h-3.5 w-3.5" />
              <span>Full Specs</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'cost'}
              onClick={() => setActiveTab('cost')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'cost'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm font-bold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              <span>Running Cost</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'visual'}
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === 'visual'
                  ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm font-bold'
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
              aria-pressed={showDiffsOnly}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                showDiffsOnly
                  ? 'shadow-sm font-black'
                  : 'bg-surface-light dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 border-borderLine-light dark:border-borderLine-dark hover:border-neutral-400'
              }`}
              style={{
                backgroundColor: showDiffsOnly ? 'var(--pt-accent)' : undefined,
                color: showDiffsOnly ? '#000000' : undefined,
                borderColor: showDiffsOnly ? 'var(--pt-accent)' : undefined,
              }}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>{showDiffsOnly ? 'Differences Only' : 'Highlight Differences'}</span>
            </button>
          )}

          <button
            onClick={onClose}
            aria-label="Close vehicle comparison dialog"
            className="p-2 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition active:scale-95"
            title="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Render Tab Contents */}
        {activeTab === 'cost' && <CostCalculator vehicles={vehicles} />}
        {activeTab === 'visual' && <VisualDimensionOverlay vehicles={vehicles} />}

        {activeTab === 'specs' && (
          <div
            role="table"
            aria-label="Side-by-side vehicle specifications"
            className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl overflow-hidden shadow-soft-lift dark:shadow-soft-lift-dark transition-colors duration-300"
          >
            
            {/* Sticky Vehicle Header Row */}
            <div role="rowgroup">
              <div role="row" className="grid grid-cols-1 md:grid-cols-4 border-b border-borderLine-light dark:border-borderLine-dark bg-surface-subtle-light/60 dark:bg-surface-subtle-dark/60 divide-y md:divide-y-0 md:divide-x divide-borderLine-light dark:divide-borderLine-dark">
                <div role="columnheader" className="p-5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">
                    Head-to-Head
                  </span>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    Switch variants to view live prices and package upgrades.
                  </p>
                </div>

                {vehicles.map((v) => {
                  const currentVariant = v.variants.find(
                    (variant) => variant.id === selectedVariantIds[v.id]
                  ) || v.variants[0];

                  return (
                    <div role="columnheader" key={v.id} className="p-5 space-y-3 relative">
                      <button
                        onClick={() => onRemoveVehicle(v.id)}
                        aria-label={`Remove ${v.name} from comparison`}
                        className="absolute top-3 right-3 p-1 text-neutral-500 hover:text-rose-500 transition rounded-md"
                        title={`Remove ${v.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-3">
                        <img src={v.image} alt="" aria-hidden="true" className="h-12 w-16 object-cover rounded-xl border border-borderLine-light dark:border-borderLine-dark shrink-0" />
                        <div>
                          <span className="text-[10px] text-neutral-600 dark:text-neutral-400 uppercase font-bold block">{v.brand}</span>
                          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white leading-tight">{v.name}</h3>
                        </div>
                      </div>

                      {/* Variant Selector Dropdown */}
                      {v.variants.length > 0 && (
                        <div>
                          <label htmlFor={`trim-select-${v.id}`} className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                            Trim / Variant:
                          </label>
                          <select
                            id={`trim-select-${v.id}`}
                            aria-label={`Select trim variant for ${v.brand} ${v.name}`}
                            value={selectedVariantIds[v.id]}
                            onChange={(e) => handleVariantChange(v.id, e.target.value)}
                            className="w-full bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                            style={{ color: 'var(--pt-accent-text)' }}
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
                      <div className="bg-surface-subtle-light dark:bg-surface-subtle-dark p-2 rounded-xl border border-borderLine-light dark:border-borderLine-dark flex items-center justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400 font-semibold">Trim Price:</span>
                        <span className="font-mono font-bold text-sm" style={{ color: 'var(--pt-accent-text)' }}>
                          {currentVariant
                            ? `₹${(currentVariant.priceExShowroom / 100000).toFixed(2)} Lakh`
                            : `₹${v.priceRange.min}L`}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spec Sections */}
            <div className="divide-y divide-borderLine-light/60 dark:divide-borderLine-dark/60 text-xs">
              
              {/* Category 1: Powertrain & Energy */}
              <div role="rowgroup">
                <div role="row">
                  <div
                    role="columnheader"
                    aria-colspan={vehicles.length + 1}
                    className="px-5 py-2.5 font-bold text-[11px] uppercase tracking-wider bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40 border-b border-borderLine-light dark:border-borderLine-dark"
                    style={{ color: 'var(--pt-accent-text)' }}
                  >
                    Powertrain, Battery & Efficiency
                  </div>
                </div>

                {/* Powertrain Type */}
                {(!showDiffsOnly || !isIdentical(v => v.powertrain)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Fuel / Powertrain</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-bold capitalize flex items-center gap-1.5">
                        {v.powertrain === 'ev' && (
                          <span className="text-emerald-800 dark:text-emerald-300 flex items-center gap-1 font-bold">
                            <Zap className="h-3 w-3 fill-current" /> Pure Electric (EV)
                          </span>
                        )}
                        {v.powertrain === 'diesel' && (
                          <span className="text-slate-800 dark:text-slate-300 flex items-center gap-1 font-bold">
                            <Disc className="h-3 w-3" /> Diesel Turbo
                          </span>
                        )}
                        {v.powertrain === 'petrol' && (
                          <span className="text-amber-800 dark:text-amber-300 flex items-center gap-1 font-bold">
                            <Fuel className="h-3 w-3" /> Petrol
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Max Power */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.powerBhp)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Peak Power</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.performance.powerBhp} bhp
                      </div>
                    ))}
                  </div>
                )}

                {/* Torque */}
                {(!showDiffsOnly || !isIdentical(v => v.performance.torqueNm)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Max Torque</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.performance.torqueNm} Nm
                      </div>
                    ))}
                  </div>
                )}

                {/* Battery Size (if EV) */}
                {vehicles.some(v => v.efficiency.batteryKwh) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Battery Capacity (kWh)</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-emerald-800 dark:text-emerald-300">
                        {v.efficiency.batteryKwh ? `${v.efficiency.batteryKwh} kWh (${v.efficiency.batteryChemistry || 'LFP'})` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Real-World Mileage / Range */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.realWorldEfficiency)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Tested Real-World Range/Mileage</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold" style={{ color: 'var(--pt-accent-text)' }}>
                        {v.efficiency.realWorldEfficiency}
                      </div>
                    ))}
                  </div>
                )}

                {/* Running Cost Per Km */}
                {(!showDiffsOnly || !isIdentical(v => v.efficiency.energyCostPerKmInr)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Direct Fuel Cost / Km</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        ₹{v.efficiency.energyCostPerKmInr.toFixed(2)} / km
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 2: Dimensions & Ergonomics */}
              <div role="rowgroup">
                <div role="row">
                  <div
                    role="columnheader"
                    aria-colspan={vehicles.length + 1}
                    className="px-5 py-2.5 font-bold text-[11px] uppercase tracking-wider bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40 border-b border-borderLine-light dark:border-borderLine-dark"
                    style={{ color: 'var(--pt-accent-text)' }}
                  >
                    Dimensions, Weight & Clearance
                  </div>
                </div>

                {/* Ground Clearance */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.groundClearanceMm)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Ground Clearance</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.dimensions.groundClearanceMm} mm
                      </div>
                    ))}
                  </div>
                )}

                {/* Bike Seat Height */}
                {vehicles.some(v => v.dimensions.seatHeightMm) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Rider Seat Height (Bikes)</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.dimensions.seatHeightMm ? `${v.dimensions.seatHeightMm} mm` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Kerb Weight */}
                {(!showDiffsOnly || !isIdentical(v => v.dimensions.kerbWeightKg)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Kerb Weight</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.dimensions.kerbWeightKg} kg
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 3: Safety & Crash Test */}
              <div role="rowgroup">
                <div role="row">
                  <div
                    role="columnheader"
                    aria-colspan={vehicles.length + 1}
                    className="px-5 py-2.5 font-bold text-[11px] uppercase tracking-wider bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40 border-b border-borderLine-light dark:border-borderLine-dark"
                    style={{ color: 'var(--pt-accent-text)' }}
                  >
                    Safety, Crash Rating & Brakes
                  </div>
                </div>

                {/* NCAP Stars */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.ncapRatingStars)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Crash Test Rating</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                        {v.safety.ncapRatingStars ? (
                          <>
                            <ShieldCheck className="h-4 w-4" />
                            <span>{v.safety.ncapRatingStars}-Star ({v.safety.ncapAuthority})</span>
                          </>
                        ) : (
                          <span className="text-neutral-500">Not Tested / 2W</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ADAS Level */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.adasLevel)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Autonomous Safety (ADAS)</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-bold">
                        {v.safety.adasLevel && v.safety.adasLevel !== 'None' ? (
                          <span style={{ color: 'var(--pt-accent-text)' }}>{v.safety.adasLevel} Active Safety</span>
                        ) : (
                          <span className="text-neutral-500">None</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Standard Airbags */}
                {(!showDiffsOnly || !isIdentical(v => v.safety.airbagsStandard)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Airbags (Standard)</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.safety.airbagsStandard > 0 ? `${v.safety.airbagsStandard} Airbags` : 'N/A (2-Wheeler)'}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Category 4: Comfort & Tech */}
              <div role="rowgroup">
                <div role="row">
                  <div
                    role="columnheader"
                    aria-colspan={vehicles.length + 1}
                    className="px-5 py-2.5 font-bold text-[11px] uppercase tracking-wider bg-surface-subtle-light/40 dark:bg-surface-subtle-dark/40 border-b border-borderLine-light dark:border-borderLine-dark"
                    style={{ color: 'var(--pt-accent-text)' }}
                  >
                    Infotainment & Cabin Tech
                  </div>
                </div>

                {/* Screen */}
                {(!showDiffsOnly || !isIdentical(v => v.features.screenSizeInches)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Display Size</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-mono font-bold text-neutral-900 dark:text-white">
                        {v.features.screenSizeInches ? `${v.features.screenSizeInches}-inch` : '—'}
                      </div>
                    ))}
                  </div>
                )}

                {/* Ventilated Seats */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasVentilatedSeats)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center bg-surface-subtle-light/20 dark:bg-surface-subtle-dark/20">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Ventilated Seats</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-bold">
                        {v.features.hasVentilatedSeats ? (
                          <span className="flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                            <Check className="h-4 w-4 stroke-[3]" /> Available
                          </span>
                        ) : (
                          <span className="text-neutral-500">No</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Sunroof */}
                {(!showDiffsOnly || !isIdentical(v => v.features.hasSunroof)) && (
                  <div role="row" className="grid grid-cols-1 md:grid-cols-4 p-3.5 md:divide-x divide-borderLine-light/60 dark:divide-borderLine-dark/60 items-center">
                    <div role="rowheader" className="text-neutral-700 dark:text-neutral-300 font-semibold">Sunroof</div>
                    {vehicles.map(v => (
                      <div role="cell" key={v.id} className="p-1 font-bold">
                        {v.features.hasSunroof ? (
                          <span className="flex items-center gap-1" style={{ color: 'var(--pt-accent-text)' }}>
                            <Check className="h-4 w-4 stroke-[3]" /> Yes
                          </span>
                        ) : (
                          <span className="text-neutral-500">No</span>
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
