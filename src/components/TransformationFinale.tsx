'use client';

import React, { useState } from 'react';
import { FinaleConfig, DesignZoneId } from '@/types/terrace';
import { calculateSolarMetrics, calculateRwhMetrics } from '@/lib/calculations';
import { 
  Sparkles, 
  Layers, 
  Sun, 
  Compass, 
  Droplets, 
  CheckCircle2, 
  Download, 
  Share2, 
  TrendingUp, 
  ShieldCheck, 
  Leaf, 
  Flame, 
  Check 
} from 'lucide-react';

interface TransformationFinaleProps {
  netUsableSqFt: number;
  selectedZones: DesignZoneId[];
  initialPillars: {
    includeDesign: boolean;
    includeSolar: boolean;
    includeRainwater: boolean;
  };
}

export function TransformationFinale({
  netUsableSqFt,
  selectedZones,
  initialPillars,
}: TransformationFinaleProps) {
  const [config, setConfig] = useState<FinaleConfig>({
    includeDesign: initialPillars.includeDesign,
    includeSolar: initialPillars.includeSolar,
    includeRainwater: initialPillars.includeRainwater,
    selectedZones,
  });

  const togglePillar = (pillar: 'includeDesign' | 'includeSolar' | 'includeRainwater') => {
    setConfig((prev) => ({
      ...prev,
      [pillar]: !prev[pillar],
    }));
  };

  // Calculations for dynamic placeholders
  const solarMetrics = calculateSolarMetrics(netUsableSqFt, {
    locationState: 'Tamil Nadu',
    discom: 'TANGEDCO',
    bimonthlyBillInr: 5200,
    targetKwp: 3,
    mountingType: 'elevated_canopy',
    techType: 'bifacial',
  });

  const rwhMetrics = calculateRwhMetrics(netUsableSqFt, {
    state: 'Tamil Nadu',
    district: 'Tamil Nadu',
    annualRainfallMm: 980,
    systemArchitecture: 'hybrid',
    filterType: 'pop_up_vwire',
    dailyConsumptionLiters: 450,
  });

  // Determine which visual state to render
  const { includeDesign, includeSolar, includeRainwater } = config;

  let modeLabel = 'Full Integrated CleanTech & Architecture Terrace (3-in-1)';
  let previewImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80';
  let previewCaption = 'Combined elevated solar canopy over modular wellness deck and perimeter rainwater harvesting pipe network.';

  if (includeDesign && !includeSolar && !includeRainwater) {
    modeLabel = 'Design Only Mode';
    previewImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Curated lifestyle zones (wellness decks, canopies, fire pit) safely navigating the stair and water tower with clear open sky.';
  } else if (!includeDesign && includeSolar && !includeRainwater) {
    modeLabel = 'Solar Only Mode';
    previewImage = 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Clean, utility elevated PV array setup with uncluttered concrete terrace for maximum solar yield.';
  } else if (!includeDesign && !includeSolar && includeRainwater) {
    modeLabel = 'Rainwater Only Mode';
    previewImage = 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Functional rainwater collection manifold, first-flush devices, and modular storage tank near the staircase.';
  } else if (includeDesign && includeSolar && !includeRainwater) {
    modeLabel = 'Solar + Design Hybrid (2-in-1)';
    previewImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Elevated 9ft solar pergola canopy casting cooling shade over the lifestyle wellness lounge.';
  } else if (includeDesign && !includeSolar && includeRainwater) {
    modeLabel = 'Design + Rainwater Eco-Living (2-in-1)';
    previewImage = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Rooftop green net house irrigated with harvested rainwater from modular filter tanks.';
  } else if (!includeDesign && includeSolar && includeRainwater) {
    modeLabel = 'Pure CleanTech Utility (Solar + Rainwater)';
    previewImage = 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1400&q=80';
    previewCaption = 'Zero-carbon energy generation combined with closed-loop water harvesting infrastructure.';
  }

  return (
    <section id="finale-section" className="py-20 md:py-28 w-full max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Finale • Post-Transformation Decision Preview</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Selective Modular Rendering & Benefit Scorecard
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl text-base sm:text-lg">
          The engine dynamically filters both the visual transformation render and the AI benefit scorecard based strictly 
          on the modular clean energy and architecture components you chose to build.
        </p>
      </div>

      {/* A. Interactive User Configuration Map (Toggle Pills) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase font-mono">
              A. Interactive User Configuration Map (Visual Rule-Set)
            </h3>
            <p className="text-xs text-slate-500">
              Toggle the primary landing modules to adapt the finale preview render in real time.
            </p>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {modeLabel}
          </span>
        </div>

        {/* 3 Toggle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Design Toggle */}
          <button
            onClick={() => togglePillar('includeDesign')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              includeDesign
                ? 'border-blue-600 bg-blue-50/70 text-slate-900 ring-2 ring-blue-600/20'
                : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Compass className={`w-5 h-5 ${includeDesign ? 'text-blue-600' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-mono">Terrace Design Studio</div>
                <div className="text-[11px] text-slate-500">Living, Wellness & Shade</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${includeDesign ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
              {includeDesign && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>

          {/* Solar Toggle */}
          <button
            onClick={() => togglePillar('includeSolar')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              includeSolar
                ? 'border-amber-500 bg-amber-50/70 text-slate-900 ring-2 ring-amber-500/20'
                : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Sun className={`w-5 h-5 ${includeSolar ? 'text-amber-500' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-mono">EcoNest Solar Equipping</div>
                <div className="text-[11px] text-slate-500">kWp PV & Govt Subsidies</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${includeSolar ? 'bg-amber-500 text-white' : 'bg-slate-200'}`}>
              {includeSolar && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>

          {/* Rainwater Toggle */}
          <button
            onClick={() => togglePillar('includeRainwater')}
            className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              includeRainwater
                ? 'border-cyan-500 bg-cyan-50/70 text-slate-900 ring-2 ring-cyan-500/20'
                : 'border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Droplets className={`w-5 h-5 ${includeRainwater ? 'text-cyan-600' : 'text-slate-400'}`} />
              <div>
                <div className="text-xs font-bold font-mono">EcoNest Rainwater (RWH)</div>
                <div className="text-[11px] text-slate-500">Catchment & Tanker Offset</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${includeRainwater ? 'bg-cyan-600 text-white' : 'bg-slate-200'}`}>
              {includeRainwater && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Render Canvas Preview */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl mb-14">
        <div className="relative aspect-[16/9] w-full max-h-[580px] overflow-hidden">
          <img
            src={previewImage}
            alt={modeLabel}
            className="w-full h-full object-cover transition-opacity duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Dynamic Badges on Image */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-mono font-bold border border-slate-700">
              {modeLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-mono font-bold">
              Net Space: {netUsableSqFt} sq. ft.
            </span>
          </div>

          {/* Bottom Caption Box */}
          <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Post-Transformation Engineering Preview
              </div>
              <p className="text-sm text-slate-200 mt-0.5">
                {previewCaption}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-mono font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* B. Dynamic AI Benefit Summary (Module-Based) */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">
            B. Dynamic AI Benefit Summary (Module-Based)
          </h3>
          <span className="text-xs font-mono text-slate-500">
            Filtered strictly to active choices
          </span>
        </div>

        {/* If Solar Only or Solar Included */}
        {includeSolar && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-mono uppercase font-bold text-amber-800">
                EcoNest Solar Equipping Benefits
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">💸</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Financial Freedom</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Cut your electricity bill down to ₹0 and get up to ₹78,000 in PM-Surya Ghar subsidies.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-amber-600 font-bold">
                  Annual Savings: ₹{solarMetrics.annualSavingsInr.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🌿</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Carbon Impact</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Directly offset {solarMetrics.annualCo2Tons} metric tons of CO2 annually, the equivalent of planting {solarMetrics.equivalentTrees} trees.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-emerald-600 font-bold">
                  Lifetime: {solarMetrics.lifetimeCo2Tons} Tons CO₂ Offset
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">📈</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Asset Boost</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Transform idle roof space into an active, high-yield energy asset with a payback period of ~{solarMetrics.paybackYears} years.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-blue-600 font-bold">
                  25-Year Yield: ₹{solarMetrics.cumulativeSavings25Y.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If Design Only or Design Included */}
        {includeDesign && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-mono uppercase font-bold text-blue-800">
                Terrace Design Studio Benefits
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🏃‍♂️</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Active Lifestyle</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Gain an on-site wellness, workout, and relaxation sanctuary tailored to your physical health and leisure.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-blue-600 font-bold">
                  Interlocking Shock Tiles & Bamboo Privacy
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🌡️</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Micro-Climate Comfort</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Natural cooling (pergolas, shading, plant cover) reduces roof-level heat absorption, keeping the home below naturally cooler by 2–4°C.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-cyan-600 font-bold">
                  Passive HVAC Load Reduction
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🎨</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Enhanced Liveability</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Unlocks valuable, vibrant living space for hosting, gardening, or remote work, directly boosting the property’s appeal.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-indigo-600 font-bold">
                  High Visual & Real-Estate Asset Value
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If Water Only or Water Included */}
        {includeRainwater && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-cyan-600" />
              <h4 className="text-xs font-mono uppercase font-bold text-cyan-800">
                EcoNest Rainwater Harvesting Benefits
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">💦</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Tanker Free</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Save up to {rwhMetrics.annualYieldLiters.toLocaleString('en-IN')} Liters of rainwater annually, severely reducing reliance on municipal or private tankers.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-cyan-700 font-bold">
                  {rwhMetrics.tankerEquivalentLoads} Tanker Loads Replaced
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🔋</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Groundwater Recharge</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Secure water availability and replenish groundwater reserves via a direct, low-maintenance filtration & recharge pit system.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-blue-700 font-bold">
                  Aquifer Restoration & Salinity Shield
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <div className="text-2xl mb-2">🛡️</div>
                <h5 className="text-sm font-bold text-slate-900 font-mono">Risk Buffer</h5>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  &ldquo;Avoid future municipal penalties and secure water self-reliance during dry summer periods.&rdquo;
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 font-mono text-[11px] text-emerald-700 font-bold">
                  100% Statutory Bylaw Compliance
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
