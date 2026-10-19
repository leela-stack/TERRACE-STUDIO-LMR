import { ObstacleDetection, SolarConfig, RwhConfig } from '@/types/terrace';

export const SQFT_TO_SQM = 0.092903;
export const SQM_TO_SQFT = 10.7639;

// Default State Rainfall Data (mm/year)
export const STATE_RAINFALL_MAP: Record<string, { rainfallMm: number; mandate: string; rebate: string }> = {
  'Tamil Nadu': {
    rainfallMm: 980,
    mandate: 'Mandatory for all buildings under TN Combined Development and Building Rules (TNCDBR 2019). Strict compliance required.',
    rebate: 'Eligible for property tax reduction and municipal water tariff concession on verified functional compliance.',
  },
  'Tamil Nadu (Coastal / Chennai)': {
    rainfallMm: 1300,
    mandate: 'Mandatory under Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB) bylaws.',
    rebate: 'Priority tanker access during peak summer and municipal inspection certification.',
  },
  'Karnataka': {
    rainfallMm: 900,
    mandate: 'Mandatory by BWSSB for all sites measuring 60x40 ft (2,400 sq ft) or above.',
    rebate: 'Exemption from BWSSB water penalty surcharge and property tax incentive.',
  },
  'Maharashtra': {
    rainfallMm: 1100,
    mandate: 'Mandatory by BMC & PMC for residential plots above 500 sq. m.',
    rebate: '5% rebate on municipal property tax for residential societies.',
  },
  'Delhi NCR': {
    rainfallMm: 750,
    mandate: 'Mandatory by Delhi Jal Board (DJB) for plots 100 sq. m and above.',
    rebate: '10% rebate on monthly water bills for functional RWH installations.',
  },
  'Gujarat': {
    rainfallMm: 800,
    mandate: 'Mandatory under Gujarat Comprehensive General Development Control Regulations (GDCR).',
    rebate: 'Subsidies up to ₹10,000 for percolation well construction in urban local bodies.',
  },
};

// Central PM-Surya Ghar Subsidy Calculation
export function calculateCentralSolarSubsidy(kwp: number): number {
  if (kwp < 1) return 0;
  if (kwp < 2) return 30000;
  if (kwp < 3) return 60000;
  return 78000; // 3 kW and above capped at 78,000
}

// Net Usable Area Calculation
export function calculateNetUsableArea(
  grossSqFt: number,
  obstacles: ObstacleDetection[]
): {
  grossSqFt: number;
  totalDeductionsSqFt: number;
  netUsableSqFt: number;
  netUsableSqM: number;
  deductionPercent: number;
} {
  const totalDeductions = obstacles
    .filter((o) => o.enabled)
    .reduce((acc, curr) => acc + curr.areaSqFt, 0);

  const netSqFt = Math.max(0, grossSqFt - totalDeductions);
  const deductionPct = grossSqFt > 0 ? (totalDeductions / grossSqFt) * 100 : 0;

  return {
    grossSqFt,
    totalDeductionsSqFt: totalDeductions,
    netUsableSqFt: netSqFt,
    netUsableSqM: Math.round(netSqFt * SQFT_TO_SQM * 10) / 10,
    deductionPercent: Math.round(deductionPct * 10) / 10,
  };
}

// Solar Technical & Financial Engineering Engine
export function calculateSolarMetrics(
  netUsableSqFt: number,
  config: SolarConfig
) {
  // 1 kWp typically requires ~100 sq. ft. of shadow-free rooftop
  const maxPossibleKwpByArea = Math.floor(netUsableSqFt / 95);
  const targetKwp = Math.min(Math.max(1, config.targetKwp), Math.max(1, maxPossibleKwpByArea || 3));

  // Module sizing (using high-efficiency 550W panels)
  const panelWattage = 550;
  const panelCount = Math.ceil((targetKwp * 1000) / panelWattage);
  const inverterKw = Math.ceil(targetKwp * 1.1); // 1.1x DC-to-AC ratio

  // Capital Cost calculations (INR)
  // Floor mount: ~₹55,000/kWp; Elevated canopy (8-9ft clearance): +₹16,000/kWp
  const baseCostPerKwp = config.mountingType === 'elevated_canopy' ? 72000 : 56000;
  
  // Tech multiplier: Mono PERC = 1.0, Bifacial = 1.08, Polycrystalline = 0.88
  const techMultiplier = 
    config.techType === 'bifacial' ? 1.08 :
    config.techType === 'polycrystalline' ? 0.88 : 1.0;

  const totalCapEx = Math.round(targetKwp * baseCostPerKwp * techMultiplier);
  const centralSubsidy = calculateCentralSolarSubsidy(targetKwp);
  const stateSubsidy = config.locationState === 'Tamil Nadu' ? 5000 : 0;
  const totalSubsidies = centralSubsidy + stateSubsidy;
  const netOutOfPocket = Math.max(0, totalCapEx - totalSubsidies);

  // Energy generation: ~4.2 kWh/kWp/day in India, with +15% rear gain if bifacial on elevated structure
  const bifacialGain = config.techType === 'bifacial' && config.mountingType === 'elevated_canopy' ? 1.15 : 1.0;
  const dailyKwh = Math.round(targetKwp * 4.2 * bifacialGain * 10) / 10;
  const bimonthlyUnits = Math.round(dailyKwh * 60);
  const annualKwh = Math.round(dailyKwh * 365);

  // Financial bill savings: TANGEDCO average effective slab rate ₹7.5 / unit
  const bimonthlySavingsInr = Math.min(
    config.bimonthlyBillInr,
    Math.round(bimonthlyUnits * 7.5)
  );
  const annualSavingsInr = bimonthlySavingsInr * 6;

  // Payback period
  const paybackYears = annualSavingsInr > 0 ? Math.round((netOutOfPocket / annualSavingsInr) * 10) / 10 : 3.8;

  // 25-Year Cumulative Savings (assuming 3% annual tariff inflation & 0.7% panel degradation)
  let cumulativeSavings25Y = 0;
  const paybackCurve: { year: number; netCashflow: number }[] = [];
  let runningCashflow = -netOutOfPocket;

  for (let year = 1; year <= 25; year++) {
    const yearSavings = annualSavingsInr * Math.pow(1.03, year - 1) * Math.pow(0.993, year - 1);
    runningCashflow += yearSavings;
    cumulativeSavings25Y += yearSavings;
    if (year <= 10 || year % 5 === 0) {
      paybackCurve.push({
        year,
        netCashflow: Math.round(runningCashflow),
      });
    }
  }

  // Environmental impact
  // 0.82 kg CO2 offset per kWh generated in Indian grid mix
  const annualCo2Tons = Math.round(((annualKwh * 0.82) / 1000) * 10) / 10;
  const lifetimeCo2Tons = Math.round(annualCo2Tons * 25 * 10) / 10;
  const equivalentTrees = Math.round(targetKwp * 42);

  return {
    targetKwp,
    maxPossibleKwpByArea,
    panelCount,
    panelWattage,
    inverterKw,
    totalCapEx,
    centralSubsidy,
    stateSubsidy,
    totalSubsidies,
    netOutOfPocket,
    dailyKwh,
    bimonthlyUnits,
    annualKwh,
    bimonthlySavingsInr,
    annualSavingsInr,
    paybackYears,
    cumulativeSavings25Y: Math.round(cumulativeSavings25Y),
    paybackCurve,
    annualCo2Tons,
    lifetimeCo2Tons,
    equivalentTrees,
  };
}

// Rainwater Harvesting Catchment & Financial Engine
export function calculateRwhMetrics(
  netUsableSqFt: number,
  config: RwhConfig
) {
  // Area in sq. meters
  const areaSqM = netUsableSqFt * SQFT_TO_SQM;
  const rainfallMm = config.annualRainfallMm;
  const runoffCoefficient = 0.85; // Concrete terrace runoff coefficient

  // Yield Formula: Annual Harvestable Water (Liters) = Area (sq. m) * Rainfall (mm) * 0.85
  const annualYieldLiters = Math.round(areaSqM * rainfallMm * runoffCoefficient);

  // Recommended Storage Tank sizing
  // 50-80mm single intense monsoon rainfall storage buffer:
  const peakBufferLiters = Math.round(areaSqM * 65 * runoffCoefficient);
  const recommendedStorageCapacityLiters = Math.min(10000, Math.max(2000, Math.round(peakBufferLiters / 500) * 500));

  // Daily utility demand for average Indian household: ~450 L/day utility (flushing, cleaning, gardening)
  const annualUtilityDemandLiters = config.dailyConsumptionLiters * 365;
  const selfSufficiencyPercent = Math.min(100, Math.round((annualYieldLiters / annualUtilityDemandLiters) * 100));

  // Private Water Tanker Cost Offset
  // 6,000 Liter private water tanker in urban Indian cities costs ~₹950 (₹0.158 / Liter)
  const tankerEquivalentLoads = Math.round((annualYieldLiters / 6000) * 10) / 10;
  const annualTankerSavingsInr = Math.round(tankerEquivalentLoads * 950);

  // System Setup Cost estimation
  // Dual stage automatic pop-up filter + piping + 3,000L tank or recharge pit:
  const baseSystemCostInr = 
    config.systemArchitecture === 'direct_storage' ? 38000 :
    config.systemArchitecture === 'groundwater_recharge' ? 32000 : 54000;
  
  const filterHardwareAddon = config.filterType === 'pop_up_vwire' ? 8500 : 3500;
  const totalRwhCostInr = baseSystemCostInr + filterHardwareAddon;

  const rwhPaybackYears = annualTankerSavingsInr > 0 ? Math.round((totalRwhCostInr / annualTankerSavingsInr) * 10) / 10 : 2.5;

  return {
    areaSqM: Math.round(areaSqM * 10) / 10,
    annualYieldLiters,
    recommendedStorageCapacityLiters,
    tankerEquivalentLoads,
    annualTankerSavingsInr,
    totalRwhCostInr,
    rwhPaybackYears,
    selfSufficiencyPercent,
    annualUtilityDemandLiters,
  };
}
