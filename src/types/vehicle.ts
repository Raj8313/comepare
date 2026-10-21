export type VehicleCategory = 'car' | 'bike';
export type PowertrainType = 'ev' | 'petrol' | 'diesel' | 'hybrid';
export type BodyType = 
  // Car body types
  | 'compact-suv' | 'midsize-suv' | 'sedan' | 'hatchback' | 'ev-crossover'
  // Bike body types
  | 'ev-scooter' | 'commuter' | 'naked-sport' | 'adventure' | 'cruiser';

export interface VehicleVariant {
  id: string;
  name: string;
  priceExShowroom: number; // in INR (e.g. 1449000 for 14.49 Lakh)
  transmission?: 'Manual' | 'Automatic' | 'DCT' | 'CVT' | 'AMT' | 'Direct Drive' | 'Single-Speed';
  keyDifferentiators: string[]; // List of features added in this trim
  sunroof?: boolean;
  ventilatedSeats?: boolean;
  adas?: boolean;
  screenSizeInches?: number;
  wirelessCarPlayAndroidAuto?: boolean;
  airbagsCount?: number;
  alloyWheels?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  powertrain: PowertrainType;
  bodyType: BodyType;
  launchYear: number;
  image: string; // URL or SVG illustration
  tagline: string;
  
  // Pricing range
  priceRange: {
    min: number; // in Lakhs/INR
    max: number;
  };

  // Dimensions & Weight
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    wheelbaseMm: number;
    groundClearanceMm: number;
    kerbWeightKg: number;
    bootSpaceLitres?: number;
    seatHeightMm?: number; // for bikes
    fuelTankLitres?: number; // for ICE
  };

  // Powertrain & Performance
  performance: {
    powerBhp: number;
    torqueNm: number;
    zeroToHundredKphSec: number;
    topSpeedKph: number;
    transmissionTypes: string[];
    cylindersCount?: number; // ICE
    displacementCc?: number; // ICE
    motorType?: string; // EV (e.g. PMSM, Induction)
  };

  // Energy & Efficiency
  efficiency: {
    claimedEfficiency: string; // e.g. "18.2 km/l" or "465 km (ARAI)"
    realWorldEfficiency: string; // e.g. "14.5 km/l" or "320 km"
    energyCostPerKmInr: number; // e.g. 1.20 for EV, 7.80 for Petrol
    batteryKwh?: number; // EV
    usableBatteryKwh?: number; // EV
    batteryChemistry?: 'LFP' | 'NMC'; // EV
    dcFastChargingKw?: number; // EV
    dcChargingTime10To80Min?: number; // EV
    acChargingKw?: number; // EV
    v2lSupported?: boolean; // EV Vehicle-to-load
  };

  // Safety & Chassis
  safety: {
    ncapRatingStars?: number; // 0 to 5
    ncapAuthority?: 'Bharat NCAP' | 'Global NCAP' | 'Euro NCAP';
    airbagsStandard: number;
    hasAbs: boolean;
    hasEsc: boolean;
    adasLevel?: 'None' | 'Level 1' | 'Level 2';
    brakingHardware: string; // e.g. "All 4 Discs" or "Front Disc, Rear Drum"
  };

  // Tech & Comfort Highlights
  features: {
    screenSizeInches: number;
    soundSystem: string;
    hasVentilatedSeats: boolean;
    hasSunroof: boolean;
    has360Camera: boolean;
    hasWirelessCharging: boolean;
    connectedCarTech: boolean;
    otaUpdates: boolean;
  };

  // Available Trims
  variants: VehicleVariant[];
}
