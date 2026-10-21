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
import { Shield, Search, ArrowRight, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

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
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-neutral-900 dark:text-neutral-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        activeCategory={filters.category}
        setActiveCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
        selectedPowertrain={filters.powertrain}
        setSelectedPowertrain={(pt) => setFilters((prev) => ({ ...prev, powertrain: pt }))}
        selectedCount={selectedVehicleIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Banner 1: Styled exactly like the top "Download WhatsApp for Mac" banner in reference image */}
        <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors shadow-sm">
          
          <div className="flex items-start sm:items-center gap-4">
            {/* Outline Laptop / Vehicle Line Art Icon Box */}
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-surface-subtle-light dark:bg-surface-subtle-dark border-2 border-outline-light dark:border-outline-dark flex items-center justify-center shrink-0">
              <Scale className="h-8 w-8 text-neutral-900 dark:text-wa-green stroke-[1.8]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white leading-tight">
                  The Zero-Spam Automobile & EV Showdown
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-wa-green/20 text-neutral-900 dark:text-wa-green rounded-full border border-wa-green/40">
                  Privacy-First
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                Compare cars, bikes, and EVs side-by-side. 1-click trim diffs, true running cost per km, and 100% free of sales calls.
              </p>
            </div>
          </div>

          {/* Right Action Button - Signature Green Pill */}
          <button
            onClick={() => loadPresetPair('tata-nexon-ev-45', 'tata-nexon-petrol-facelift')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-wa-green text-neutral-950 font-black text-xs sm:text-sm hover:bg-wa-greenHover border border-neutral-900 dark:border-neutral-800 transition active:scale-95 shrink-0 shadow-sm"
          >
            <span>Launch Nexon Showdown</span>
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

        {/* Banner 2: Clean How-It-Works Box with Numbered Steps (Patterned after reference image's Scan to Log In card) */}
        <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-6 sm:p-10 transition-colors shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 Columns: Title & Connected Numbered Steps (1-2-3) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                  Compare without the dealer spam
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  How ComePare works in 3 simple steps:
                </p>
              </div>

              {/* Connected Steps List */}
              <div className="space-y-4 pl-1">
                
                {/* Step 1 */}
                <div className="flex items-start gap-3.5 relative">
                  <div className="h-7 w-7 rounded-full border-2 border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark flex items-center justify-center text-xs font-black text-neutral-900 dark:text-white shrink-0 z-10">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 pt-0.5">
                    <strong>Pick any 2 to 4 vehicles</strong> below (Cars, Motorcycles, or EVs).
                  </div>
                </div>

                {/* Vertical Connector Line */}
                <div className="flex items-start gap-3.5 relative">
                  <div className="h-7 w-7 rounded-full border-2 border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark flex items-center justify-center text-xs font-black text-neutral-900 dark:text-white shrink-0 z-10">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 pt-0.5">
                    Select your exact <strong>trims & variants</strong> to see real prices and packages.
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3.5 relative">
                  <div className="h-7 w-7 rounded-full border-2 border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark flex items-center justify-center text-xs font-black text-neutral-900 dark:text-white shrink-0 z-10">
                    3
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 pt-0.5">
                    Click <strong>"Highlight Differences"</strong> to isolate exact spec deltas and fuel math.
                  </div>
                </div>

              </div>

              {/* Bottom Row: Checkbox & Underlined Link (Identical to reference image) */}
              <div className="pt-4 border-t border-neutral-200 dark:border-outline-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  <div className="h-5 w-5 rounded-md bg-wa-green text-neutral-950 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span>100% Zero-Spam Promise (No phone number collected)</span>
                </div>

                <a
                  href="#catalog"
                  className="inline-flex items-center gap-1 text-xs font-bold text-neutral-900 dark:text-wa-green underline underline-offset-4 hover:opacity-80 transition"
                >
                  <span>Explore All Vehicles</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </a>

              </div>

            </div>

            {/* Right 5 Columns: Visual Preset Showcase Card (Replaces QR code with interactive showdown preview) */}
            <div className="lg:col-span-5 bg-surface-subtle-light dark:bg-surface-subtle-dark border-2 border-outline-light dark:border-outline-dark rounded-2xl p-5 space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Featured Showdown
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-wa-green text-neutral-950 border border-neutral-900">
                  EV vs ICE
                </span>
              </div>

              {/* Side-by-Side Mini Preview */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-xl border border-outline-light dark:border-outline-dark">
                  <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-wa-green block">Electric</span>
                  <h4 className="text-xs font-black text-neutral-900 dark:text-white mt-0.5 truncate">Nexon.ev 45</h4>
                  <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 block mt-1">₹1.15 / km</span>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-xl border border-outline-light dark:border-outline-dark">
                  <span className="text-[10px] font-black uppercase text-amber-600 block">Petrol Turbo</span>
                  <h4 className="text-xs font-black text-neutral-900 dark:text-white mt-0.5 truncate">Nexon Petrol</h4>
                  <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 block mt-1">₹7.90 / km</span>
                </div>
              </div>

              <button
                onClick={() => loadPresetPair('tata-nexon-ev-45', 'tata-nexon-petrol-facelift')}
                className="w-full py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 text-xs font-black hover:opacity-90 transition flex items-center justify-center gap-1.5"
              >
                <span>View Full Comparison</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>

        </div>

        {/* 2-Column Responsive Layout: Filter Sidebar + Vehicle Catalog */}
        <div id="catalog" className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start pt-2">
          
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
            <div className="flex items-center justify-between pb-3 border-b-2 border-outline-light dark:border-outline-dark">
              <span className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                Showing {filteredVehicles.length} of {VEHICLES.length} Models
              </span>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-bold">
                <span>Select 2 to 4 to pair & compare</span>
              </div>
            </div>

            {/* Empty State */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-surface-light dark:bg-surface-dark border-2 border-outline-light dark:border-outline-dark rounded-3xl p-12 text-center space-y-4 shadow-sm">
                <Search className="h-10 w-10 text-neutral-400 dark:text-neutral-600 mx-auto" />
                <h3 className="text-base font-black text-neutral-900 dark:text-white">No vehicles match these filters</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Try widening your budget, lowering minimum ground clearance, or clearing search keywords.
                </p>
                <button
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  className="px-5 py-2.5 rounded-full text-xs font-black bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <footer className="border-t-2 border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark mt-16 py-8 px-4 text-center text-xs text-neutral-600 dark:text-neutral-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-neutral-900 dark:text-white">ComePare</span>
            <span>• Pure Automobile & EV Comparison Utility • No dealer sales calls</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1 font-bold text-neutral-900 dark:text-wa-green">
              <Shield className="h-3.5 w-3.5" /> 100% Privacy-First
            </span>
            <a
              href="https://github.com/Raj8313/comepare"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition font-bold underline underline-offset-4"
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
