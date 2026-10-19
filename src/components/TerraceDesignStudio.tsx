'use client';

import React, { useState } from 'react';
import { DesignZone, DesignZoneId, MarketplaceItem } from '@/types/terrace';
import { DESIGN_ZONES, MARKETPLACE_ITEMS } from '@/lib/data';
import { askGeminiShoppingAdvisor } from '@/lib/gemini';
import { 
  Palette, 
  Sun, 
  Moon, 
  Sparkles, 
  ExternalLink, 
  AlertCircle, 
  Check, 
  Sliders, 
  ShoppingBag,
  DollarSign,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

interface TerraceDesignStudioProps {
  netUsableSqFt: number;
  selectedZones: DesignZoneId[];
  onToggleZone: (id: DesignZoneId) => void;
}

export function TerraceDesignStudio({
  netUsableSqFt,
  selectedZones,
  onToggleZone,
}: TerraceDesignStudioProps) {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [targetBudget, setTargetBudget] = useState<number>(120000);
  const [maxBudgetCap, setMaxBudgetCap] = useState<number>(350000);
  const [executionTier, setExecutionTier] = useState<'DIY' | 'Semi-Custom' | 'Architectural Luxury'>('Semi-Custom');
  const [weatherZone, setWeatherZone] = useState<string>('Tropical Coastal / High Humidity');
  const [lightingMode, setLightingMode] = useState<Record<string, 'day' | 'night'>>({});
  
  // AI Shopping Assistant State
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [activeZoneForAi, setActiveZoneForAi] = useState<string>('Wellness & Calisthenics Deck');

  const toggleLighting = (id: string) => {
    setLightingMode((prev) => ({
      ...prev,
      [id]: prev[id] === 'night' ? 'day' : 'night',
    }));
  };

  const handleAskAi = async (zoneName: string) => {
    setActiveZoneForAi(zoneName);
    setIsAiLoading(true);
    setAiAdvice(null);
    try {
      const res = await askGeminiShoppingAdvisor({
        budgetInr: targetBudget,
        netSqFt: netUsableSqFt,
        zoneName,
        weatherZone,
        executionTier,
      });
      setAiAdvice(res);
    } catch {
      setAiAdvice('Unable to fetch AI recommendations right now. Please verify internet connection.');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Filter curated marketplace items for active selected zones
  const relevantMarketItems = MARKETPLACE_ITEMS.filter((item) => 
    selectedZones.includes(item.zoneId as DesignZoneId)
  );

  return (
    <section id="design-studio" className="py-20 md:py-28 w-full max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-2">
            <Compass className="w-4 h-4 text-blue-600" />
            <span>Terrace Design Studio • Module 01</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Curated Modular Lifestyle Zones
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl text-base sm:text-lg">
            Configure architectural leisure, wellness, and biophilic shade zones scaled dynamically to your validated 
            <span className="font-mono font-bold text-blue-600"> {netUsableSqFt} sq. ft.</span> net clearance.
          </p>
        </div>

        {/* Selected Zones Counter */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <div className="text-xs font-mono">
            <span className="font-bold text-slate-900">{selectedZones.length} Zones Selected</span>
            <div className="text-slate-400">Validated against net space</div>
          </div>
        </div>
      </div>

      {/* 4. Budget Filter & Spatial Feasibility Engine */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-12">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Budget Filter & Spatial Feasibility Engine
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">Currency:</span>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 text-xs font-mono rounded font-semibold transition-colors ${
                currency === 'INR' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-mono rounded font-semibold transition-colors ${
                currency === 'USD' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Target Budget */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Target Budget ({currency === 'INR' ? '₹' : '$'})
            </label>
            <input
              type="number"
              step={currency === 'INR' ? 10000 : 200}
              value={currency === 'INR' ? targetBudget : Math.round(targetBudget / 83)}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTargetBudget(currency === 'INR' ? val : val * 83);
              }}
              className="w-full font-mono text-base font-bold px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Cap */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Max Cap Limit ({currency === 'INR' ? '₹' : '$'})
            </label>
            <input
              type="number"
              step={currency === 'INR' ? 25000 : 500}
              value={currency === 'INR' ? maxBudgetCap : Math.round(maxBudgetCap / 83)}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMaxBudgetCap(currency === 'INR' ? val : val * 83);
              }}
              className="w-full font-mono text-base font-bold px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Execution Tier */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Execution Tier
            </label>
            <select
              value={executionTier}
              onChange={(e) => setExecutionTier(e.target.value as any)}
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="DIY">DIY / Budget-Friendly</option>
              <option value="Semi-Custom">Semi-Custom Modular</option>
              <option value="Architectural Luxury">Architectural Luxury</option>
            </select>
          </div>

          {/* Weather Zone */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Weather & Solar Exposure
            </label>
            <select
              value={weatherZone}
              onChange={(e) => setWeatherZone(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="Tropical Coastal / High Humidity">Tropical Coastal / High Humidity</option>
              <option value="Semi-Arid Plains / High UV">Semi-Arid Plains / High UV</option>
              <option value="High-Heat Inland (Central/South)">High-Heat Inland (Central/South)</option>
              <option value="Sub-Tropical / High Monsoon">Sub-Tropical / High Monsoon</option>
            </select>
          </div>
        </div>

        {/* Dynamic Feasibility Rule Check */}
        {netUsableSqFt < 150 && selectedZones.includes('sunroom') && (
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold">Dynamic Feasibility Alert: </span>
              Your net usable space is under 150 sq. ft. Installing a full Sunroom will crowd structural maintenance pathways. 
              We suggest selecting a <strong>Pergola & Creeper Canopy</strong> or <strong>Green Net House</strong> to optimize ventilation and avoid overcrowding.
            </div>
          </div>
        )}
      </div>

      {/* Visual Inspiration Cards (6 Curated Zones) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {DESIGN_ZONES.map((zone) => {
          const isSelected = selectedZones.includes(zone.id);
          const isNight = lightingMode[zone.id] === 'night';
          const activeImage = isNight ? zone.nighttimeImage : zone.daytimeImage;
          const costDisplay = currency === 'INR' 
            ? `₹${zone.estCostInr.toLocaleString('en-IN')}` 
            : `$${zone.estCostUsd.toLocaleString()}`;

          const isOverBudget = zone.estCostInr > maxBudgetCap;
          const isSpaceConstrained = zone.minAreaSqFt > netUsableSqFt;

          return (
            <div
              key={zone.id}
              className={`rounded-2xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between shadow-xs ${
                isSelected 
                  ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md' 
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Image Preview with Day/Night Switcher */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={activeImage}
                  alt={zone.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Day / Night Toggle Pill */}
                <button
                  onClick={() => toggleLighting(zone.id)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11px] font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20 transition-colors"
                >
                  {isNight ? (
                    <>
                      <Moon className="w-3 h-3 text-cyan-300" />
                      <span>Night Ambience</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3 h-3 text-amber-300" />
                      <span>Daylight View</span>
                    </>
                  )}
                </button>

                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-[11px] font-mono border border-slate-700">
                  {zone.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {zone.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-blue-600 shrink-0">
                      ~{costDisplay}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {zone.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-1.5 mb-4">
                    {zone.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Spec readout */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600">
                    {zone.specs}
                  </div>

                  {/* Feasibility Flag */}
                  {isSpaceConstrained && (
                    <div className="mt-2 text-[10px] font-mono text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Min recommended: {zone.minAreaSqFt} sq. ft.
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleAskAi(zone.name)}
                    className="text-[11px] font-mono font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>AI Trade-Offs</span>
                  </button>

                  <button
                    onClick={() => onToggleZone(zone.id)}
                    className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Included in Plan</span>
                      </>
                    ) : (
                      <span>+ Add to Terrace</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Built-In AI Shopping Assistant Dialog/Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl mb-16 border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/80 pb-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Built-In AI Shopping & Procurement Assistant</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Gemini API Powered
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Data-driven trade-offs based on ₹{targetBudget.toLocaleString('en-IN')} budget, {netUsableSqFt} sq. ft., and {weatherZone}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAskAi(activeZoneForAi)}
              disabled={isAiLoading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>{isAiLoading ? 'Consulting Gemini...' : 'Analyze Procurement Trade-offs'}</span>
            </button>
          </div>
        </div>

        {/* AI Output Content */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs leading-relaxed text-slate-300 min-h-[70px]">
          {isAiLoading ? (
            <div className="flex items-center gap-2 text-cyan-300 py-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Synthesizing engineering specs, local material pricing, and weather durability for {activeZoneForAi}...</span>
            </div>
          ) : aiAdvice ? (
            <div className="space-y-1">
              <div className="text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Recommendation for: {activeZoneForAi}</span>
              </div>
              <p className="whitespace-pre-line text-slate-200">{aiAdvice}</p>
            </div>
          ) : (
            <p className="text-slate-400 italic">
              Click &quot;Analyze Procurement Trade-offs&quot; or select &quot;AI Trade-Offs&quot; on any lifestyle zone card above to see exact cost optimization breakdowns.
            </p>
          )}
        </div>
      </div>

      {/* Curated Bill of Materials (Amazon / Flipkart Affiliate Links) */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Curated Bill of Materials (BOM) Marketplace
              </h3>
              <p className="text-xs text-slate-500">
                Verified high-durability terrace hardware with one-click direct sourcing links.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600">
            {relevantMarketItems.length > 0 ? `${relevantMarketItems.length} Matched Items` : 'Catalog View'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(relevantMarketItems.length > 0 ? relevantMarketItems : MARKETPLACE_ITEMS).slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                    {item.retailer}
                  </span>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">
                    ★ {item.rating}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {item.name}
                </h5>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-mono">
                  {item.spec}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">
                  ₹{item.priceInr.toLocaleString('en-IN')}
                </span>
                <a
                  href={item.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-blue-600 hover:text-blue-800"
                >
                  <span>Buy Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
