import React, { useState, useMemo } from 'react';
import { VEHICLES } from './data/vehicles';
import { Vehicle } from './types/vehicle';
import { Header } from './components/Header';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { VehicleCard } from './components/VehicleCard';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { ComparisonModal } from './components/ComparisonModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ThemeProvider } from './context/ThemeContext';
import { Shield, Zap, Search, ArrowRight, Gauge, IndianRupee, Sparkles, Fuel, Disc } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  powertrain: 'all',
  maxPriceLakh: 25,
  minGroundClearanceMm: 0,
  maxSeatHeightMm: 850,
  minNcapStars: 0,
  adasOnly: false,
  ventilatedSeatsOnly: false,
  sunroofOnly: false,
};

const MainApp: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  // Active showcase duel in the hero
  const [activeDuelPreset, setActiveDuelPreset] = useState<'nexon' | 'diesel' | 'twoWheeler'>('nexon');

  const duelContenders = useMemo(() => {
    if (activeDuelPreset === 'nexon') {
      return {
        v1: VEHICLES.find(v => v.id === 'tata-nexon-ev-45')!,
        v2: VEHICLES.find(v => v.id === 'tata-nexon-petrol-facelift')!,
        title: 'EV vs Petrol Sibling Duel',
        badge: 'Top Energy Showdown'
      };
    }
    if (activeDuelPreset === 'diesel') {
      return {
        v1: VEHICLES.find(v => v.id === 'mahindra-xuv700-diesel')!,
        v2: VEHICLES.find(v => v.id === 'hyundai-creta-facelift')!,
        title: 'Diesel Torque Monster vs Petrol King',
        badge: 'Highway Cruiser Clash'
      };
    }
    return {
      v1: VEHICLES.find(v => v.id === 'ather-450x-gen3')!,
      v2: VEHICLES.find(v => v.id === 'royal-enfield-hunter-350')!,
      title: 'Electric Commuter vs Retro Roadster',
      badge: 'Two-Wheeler Face-off'
    };
  }, [activeDuelPreset]);

  const loadPresetPair = (id1: string, id2: string) => {
    setSelectedVehicleIds([id1, id2]);
    setIsComparisonOpen(true);
  };

  const handleToggleSelect = (vehicle: Vehicle) => {
    setSelectedVehicleIds((prev) => {
      if (prev.includes(vehicle.id)) {
        return prev.filter((id) => id !== vehicle.id);
      }
      if (prev.length >= 4) {
        alert('You can compare up to 4 vehicles at once.');
        return prev;
      }
      return [...prev, vehicle.id];
    });
  };

  const handleRemoveVehicle = (id: string) => {
    setSelectedVehicleIds((prev) => prev.filter((vId) => vId !== id));
  };

  const handleClearAll = () => {
    setSelectedVehicleIds([]);
  };

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((vehicle) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = vehicle.name.toLowerCase().includes(query);
        const matchesBrand = vehicle.brand.toLowerCase().includes(query);
        const matchesTag = vehicle.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesTag) return false;
      }

      if (filters.category !== 'all' && vehicle.category !== filters.category) {
        return false;
      }

      if (filters.powertrain !== 'all' && vehicle.powertrain !== filters.powertrain) {
        return false;
      }

      if (filters.maxPriceLakh < 25 && vehicle.priceRange.min > filters.maxPriceLakh) {
        return false;
      }

      if (filters.minGroundClearanceMm > 0 && vehicle.dimensions.groundClearanceMm < filters.minGroundClearanceMm) {
        return false;
      }

      if (
        vehicle.category === 'bike' &&
        filters.maxSeatHeightMm < 850 &&
        vehicle.dimensions.seatHeightMm &&
        vehicle.dimensions.seatHeightMm > filters.maxSeatHeightMm
      ) {
        return false;
      }

      if (filters.minNcapStars > 0) {
        if (!vehicle.safety.ncapRatingStars || vehicle.safety.ncapRatingStars < filters.minNcapStars) {
          return false;
        }
      }

      if (filters.adasOnly && (!vehicle.safety.adasLevel || vehicle.safety.adasLevel === 'None')) {
        return false;
      }

      if (filters.ventilatedSeatsOnly && !vehicle.features.hasVentilatedSeats) {
        return false;
      }

      if (filters.sunroofOnly && !vehicle.features.hasSunroof) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const selectedVehicles = useMemo(() => {
    return VEHICLES.filter((v) => selectedVehicleIds.includes(v.id));
  }, [selectedVehicleIds]);

  return (
    <div
      data-powertrain={filters.powertrain}
      className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors duration-300"
    >
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-neutral-900 focus:text-white dark:focus:bg-white dark:focus:text-neutral-950 focus:rounded-xl focus:shadow-xl focus:font-bold focus:text-sm focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-white"
      >
        Skip to main content
      </a>
      
      {/* Top Navigation */}
      <Header
        activeCategory={filters.category}
        setActiveCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        selectedPowertrain={filters.powertrain}
        setSelectedPowertrain={(pt) => setFilters((prev) => ({ ...prev, powertrain: pt }))}
        selectedCount={selectedVehicleIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* Dynamic Mode Announcement Banner */}
        <section aria-labelledby="hero-title" className="space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              
              {/* Dynamic Theme Banner Pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--pt-accent-subtle)',
                  borderColor: 'var(--pt-accent-border)',
                  color: 'var(--pt-accent-text)',
                }}
              >
                {filters.powertrain === 'ev' && <><Zap className="h-4 w-4 fill-current" /> Active Theme: Electric Green (EV Focus)</>}
                {filters.powertrain === 'petrol' && <><Fuel className="h-4 w-4" /> Active Theme: Petrol Yellow (High-Octane Rev)</>}
                {filters.powertrain === 'diesel' && <><Disc className="h-4 w-4" /> Active Theme: Diesel Smoke Slate (Heavy Torque)</>}
                {filters.powertrain === 'all' && <><Sparkles className="h-4 w-4" /> Active Theme: All Powertrains Showdown</>}
              </div>

              <h1 id="hero-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
                Compare on pure engineering, <br className="hidden sm:inline" />
                <span className="text-neutral-600 dark:text-neutral-400 font-semibold">not dealership marketing.</span>
              </h1>
            </div>

            {/* Micro Value Proposition Bar */}
            <div className="flex items-center gap-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400 shrink-0 pb-1">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" style={{ color: 'var(--pt-accent-text)' }} /> 100% Privacy
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4" style={{ color: 'var(--pt-accent-text)' }} /> Real Tested Range
              </span>
              <span>•</span>
              <span>1-Click Trim Diffs</span>
            </div>
          </div>

          {/* Interactive Duel Arena Card */}
          <div
            className="bg-surface-light dark:bg-surface-dark border rounded-3xl p-6 sm:p-8 shadow-soft-lift dark:shadow-soft-lift-dark transition-all duration-300"
            style={{ borderColor: 'var(--pt-accent-border)' }}
          >
            
            {/* Arena Header: Presets Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderLine-light dark:border-borderLine-dark">
              <div>
                <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block">Featured Head-to-Head</span>
                <h2 className="text-lg font-extrabold text-neutral-900 dark:text-white">{duelContenders.title}</h2>
              </div>

              {/* Preset Selector Tabs */}
              <div role="tablist" aria-label="Featured showdown presets" className="inline-flex p-1 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-borderLine-light dark:border-borderLine-dark text-sm font-bold">
                <button
                  role="tab"
                  aria-selected={activeDuelPreset === 'nexon'}
                  onClick={() => {
                    setActiveDuelPreset('nexon');
                    setFilters(prev => ({ ...prev, powertrain: 'all' }));
                  }}
                  className={`px-3.5 py-2 rounded-lg transition ${
                    activeDuelPreset === 'nexon'
                      ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Nexon EV vs Petrol
                </button>
                <button
                  role="tab"
                  aria-selected={activeDuelPreset === 'diesel'}
                  onClick={() => {
                    setActiveDuelPreset('diesel');
                    setFilters(prev => ({ ...prev, powertrain: 'diesel' }));
                  }}
                  className={`px-3.5 py-2 rounded-lg transition ${
                    activeDuelPreset === 'diesel'
                      ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  XUV700 Diesel vs Creta
                </button>
                <button
                  role="tab"
                  aria-selected={activeDuelPreset === 'twoWheeler'}
                  onClick={() => {
                    setActiveDuelPreset('twoWheeler');
                    setFilters(prev => ({ ...prev, powertrain: 'all' }));
                  }}
                  className={`px-3.5 py-2 rounded-lg transition ${
                    activeDuelPreset === 'twoWheeler'
                      ? 'bg-surface-light dark:bg-surface-dark text-neutral-900 dark:text-white shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  Ather 450X vs Hunter
                </button>
              </div>
            </div>

            {/* Arena Stage: Contender A vs Contender B */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
              
              {/* Contender 1 */}
              <div className="md:col-span-5 bg-surface-subtle-light/60 dark:bg-surface-subtle-dark/60 border border-borderLine-light dark:border-borderLine-dark rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <img
                  src={duelContenders.v1.image}
                  alt={`${duelContenders.v1.brand} ${duelContenders.v1.name}`}
                  className="h-20 w-28 sm:h-24 sm:w-36 object-cover rounded-xl border border-borderLine-light dark:border-borderLine-dark shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">{duelContenders.v1.brand}</span>
                  <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white leading-tight">{duelContenders.v1.name}</h3>
                  <div className="flex items-center gap-2 pt-1 font-mono text-sm">
                    <span className="font-bold" style={{ color: 'var(--pt-accent-text)' }}>₹{duelContenders.v1.efficiency.energyCostPerKmInr.toFixed(2)}/km</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{duelContenders.v1.performance.powerBhp} bhp</span>
                  </div>
                </div>
              </div>

              {/* Central VS Ring with Dynamic Ring Accent */}
              <div className="md:col-span-1 flex justify-center">
                <div
                  aria-hidden="true"
                  className="h-12 w-12 rounded-full bg-surface-light dark:bg-surface-dark border-2 flex items-center justify-center font-black text-sm text-neutral-900 dark:text-white shadow-sm transition-colors duration-300"
                  style={{ borderColor: 'var(--pt-accent)' }}
                >
                  VS
                </div>
              </div>

              {/* Contender 2 */}
              <div className="md:col-span-5 bg-surface-subtle-light/60 dark:bg-surface-subtle-dark/60 border border-borderLine-light dark:border-borderLine-dark rounded-2xl p-4 sm:p-5 flex items-center gap-4">
                <img
                  src={duelContenders.v2.image}
                  alt={`${duelContenders.v2.brand} ${duelContenders.v2.name}`}
                  className="h-20 w-28 sm:h-24 sm:w-36 object-cover rounded-xl border border-borderLine-light dark:border-borderLine-dark shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">{duelContenders.v2.brand}</span>
                  <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white leading-tight">{duelContenders.v2.name}</h3>
                  <div className="flex items-center gap-2 pt-1 font-mono text-sm">
                    <span className="font-bold text-amber-800 dark:text-amber-400">₹{duelContenders.v2.efficiency.energyCostPerKmInr.toFixed(2)}/km</span>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{duelContenders.v2.performance.powerBhp} bhp</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Arena Footer: Direct Launch Button & Key Telemetry Delta */}
            <div className="pt-4 border-t border-borderLine-light dark:border-borderLine-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                <span className="flex items-center gap-1 font-bold" style={{ color: 'var(--pt-accent-text)' }}>
                  <IndianRupee className="h-4 w-4" />
                  Cost Difference: ₹{(Math.abs(duelContenders.v1.efficiency.energyCostPerKmInr - duelContenders.v2.efficiency.energyCostPerKmInr)).toFixed(2)}/km
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Gauge className="h-4 w-4 text-neutral-500" />
                  Power Delta: {Math.abs(duelContenders.v1.performance.powerBhp - duelContenders.v2.performance.powerBhp)} bhp
                </span>
              </div>

              <button
                onClick={() => loadPresetPair(duelContenders.v1.id, duelContenders.v2.id)}
                aria-label={`Launch showdown comparison between ${duelContenders.v1.name} and ${duelContenders.v2.name}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm text-neutral-950 transition shadow-sm active:scale-95 hover:brightness-105"
                style={{ backgroundColor: 'var(--pt-accent)' }}
              >
                <span>Launch Full Showdown</span>
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </section>

        {/* 2-Column Responsive Layout: Filter Sidebar + Catalog Grid */}
        <section id="catalog" aria-labelledby="catalog-heading" className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          <h2 id="catalog-heading" className="sr-only">Vehicle Catalog and Parametric Filters</h2>
          
          {/* Left Column: Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onReset={() => setFilters(INITIAL_FILTERS)}
              totalMatches={filteredVehicles.length}
            />
          </div>

          {/* Right Column: Vehicle Cards Grid */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Results Filter Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-borderLine-light dark:border-borderLine-dark">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Showing {filteredVehicles.length} of {VEHICLES.length} Available Models
              </span>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <span>Select 2 to 4 to compare</span>
              </div>
            </div>

            {/* Empty State */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-surface-light dark:bg-surface-dark border border-borderLine-light dark:border-borderLine-dark rounded-3xl p-12 text-center space-y-4 shadow-sm">
                <Search className="h-10 w-10 text-neutral-400 dark:text-neutral-600 mx-auto" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No vehicles match these filters</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Try widening your budget, lowering minimum ground clearance, or clearing search keywords.
                </p>
                <button
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  aria-label="Reset all search filters"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-neutral-950 hover:opacity-90 transition"
                  style={{ backgroundColor: 'var(--pt-accent)' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSelected={selectedVehicleIds.includes(vehicle.id)}
                    onToggleSelect={handleToggleSelect}
                    onQuickView={setQuickViewVehicle}
                  />
                ))}
              </div>
            )}

          </div>

        </section>

      </main>

      {/* Floating Bottom Comparison Drawer */}
      <ComparisonDrawer
        selectedVehicles={selectedVehicles}
        onRemoveVehicle={handleRemoveVehicle}
        onClearAll={handleClearAll}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Side-by-Side Comparison Modal */}
      {isComparisonOpen && selectedVehicles.length >= 2 && (
        <ComparisonModal
          vehicles={selectedVehicles}
          onClose={() => setIsComparisonOpen(false)}
          onRemoveVehicle={handleRemoveVehicle}
        />
      )}

      {/* Quick View Spec Inspection Modal */}
      {quickViewVehicle && (
        <QuickViewModal
          vehicle={quickViewVehicle}
          onClose={() => setQuickViewVehicle(null)}
          isSelected={selectedVehicleIds.includes(quickViewVehicle.id)}
          onToggleSelect={handleToggleSelect}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-borderLine-light dark:border-borderLine-dark bg-surface-light dark:bg-surface-dark mt-16 py-8 px-4 text-center text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white">ComePare</span>
            <span>• Pure Automobile & EV Comparison Utility • Zero dealership sales calls</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1.5 font-semibold text-neutral-900 dark:text-white">
              <Shield className="h-4 w-4" style={{ color: 'var(--pt-accent-text)' }} /> 100% Privacy-First
            </span>
            <a
              href="https://github.com/Raj8313/comepare"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition font-semibold underline underline-offset-4"
            >
              GitHub Project
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};
