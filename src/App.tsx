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
import { Sparkles, Shield, Zap, Search, ArrowRight, Gauge, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Header */}
      <Header
        activeCategory={filters.category}
        setActiveCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        selectedPowertrain={filters.powertrain}
        setSelectedPowertrain={(pt) => setFilters((prev) => ({ ...prev, powertrain: pt }))}
        selectedCount={selectedVehicleIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-indigo-100/70 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800/80 overflow-hidden shadow-lg dark:shadow-2xl transition-colors">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-5">
            
            {/* Pill Ticker */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Zero-Spam Automobile & EV Comparison Engine</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <Zap className="h-3.5 w-3.5 text-emerald-500" />
                <span>Real-World Tested Range</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Come, pair any two wheels. <br />
              <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 dark:from-indigo-400 dark:via-sky-300 dark:to-emerald-400 bg-clip-text text-transparent">
                See the true difference.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              No dealership spam calls. No phone number gates. Just pure parametric filters, 
              1-click variant trim diffs, and transparent running cost math.
            </p>

            {/* Quick Preset Showdowns */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Popular Head-to-Head Showdowns:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => loadPresetPair('tata-nexon-ev-45', 'tata-nexon-petrol-facelift')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-300 transition shadow-sm font-semibold"
                >
                  <Zap className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Nexon EV vs Nexon Petrol (Running Cost)</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </button>

                <button
                  onClick={() => loadPresetPair('tata-nexon-ev-45', 'mg-windsor-ev')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-300 transition shadow-sm font-semibold"
                >
                  <Gauge className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Nexon EV vs MG Windsor EV</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </button>

                <button
                  onClick={() => loadPresetPair('ather-450x-gen3', 'royal-enfield-hunter-350')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-300 transition shadow-sm font-semibold"
                >
                  <Activity className="h-3.5 w-3.5 text-amber-500" />
                  <span>Ather 450X vs RE Hunter 350 (2W Showdown)</span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
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
          <div className="lg:col-span-3 space-y-4">
            
            {/* Results Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Showing {filteredVehicles.length} of {VEHICLES.length} Models
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>Select 2 to 4 to compare</span>
              </div>
            </div>

            {/* Empty State */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                <Search className="h-10 w-10 text-slate-400 dark:text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-300">No vehicles match these filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try widening your budget, lowering minimum ground clearance, or clearing search keywords.
                </p>
                <button
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

        </div>

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
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 mt-16 py-8 px-4 text-center text-xs text-slate-500 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-300">ComePare</span>
            <span>• Built for car, bike & EV enthusiasts • Zero dealership sales calls</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Shield className="h-3 w-3" /> 100% Privacy-First
            </span>
            <a
              href="https://github.com/Raj8313/comepare"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 dark:hover:text-white transition underline"
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
