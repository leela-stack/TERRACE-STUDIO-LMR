export interface ObstacleDetection {
  id: string;
  name: string;
  category: 'oht' | 'mumty' | 'parapet' | 'utility';
  areaSqFt: number;
  confidence: number;
  description: string;
  deductionReason: string;
  coords: { x: number; y: number; width: number; height: number }; // percentage 0-100
  enabled: boolean;
}

export type DesignZoneId = 
  | 'sunroom' 
  | 'greenhouse' 
  | 'firepit' 
  | 'pergola' 
  | 'wellness' 
  | 'stargazing';

export interface DesignZone {
  id: DesignZoneId;
  name: string;
  category: string;
  minAreaSqFt: number;
  typicalAreaSqFt: number;
  estCostInr: number;
  estCostUsd: number;
  description: string;
  features: string[];
  specs: string;
  materials: string[];
  daytimeImage: string;
  nighttimeImage: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  zoneId: DesignZoneId | 'solar' | 'rwh';
  priceInr: number;
  rating: number;
  retailer: 'Amazon' | 'Flipkart' | 'Direct EPC' | 'Authorized Dealer';
  spec: string;
  affiliateUrl: string;
}

export type SolarTechType = 'mono_perc' | 'bifacial' | 'polycrystalline';
export type MountingType = 'standard_floor' | 'elevated_canopy';

export interface SolarConfig {
  locationState: string;
  discom: string;
  bimonthlyBillInr: number;
  targetKwp: number;
  mountingType: MountingType;
  techType: SolarTechType;
}

export interface RwhConfig {
  state: string;
  district: string;
  annualRainfallMm: number;
  systemArchitecture: 'direct_storage' | 'groundwater_recharge' | 'hybrid';
  filterType: 'pop_up_vwire' | 'sand_gravel';
  dailyConsumptionLiters: number;
}

export interface FinaleConfig {
  includeDesign: boolean;
  includeSolar: boolean;
  includeRainwater: boolean;
  selectedZones: DesignZoneId[];
}
