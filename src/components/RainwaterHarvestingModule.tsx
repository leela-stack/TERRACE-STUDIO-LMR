'use client';

import React, { useState } from 'react';
import { RwhConfig } from '@/types/terrace';
import { calculateRwhMetrics, STATE_RAINFALL_MAP } from '@/lib/calculations';
import { RWH_SUPPLIERS } from '@/lib/data';
import { 
  Droplets, 
  Waves, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Filter, 
  HelpCircle,
  Truck
} from 'lucide-react';

interface RainwaterHarvestingModuleProps {
  netUsableSqFt: number;
}

export function RainwaterHarvestingModule({ netUsableSqFt }: RainwaterHarvestingModuleProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('Tamil Nadu');
  const [systemArch, setSystemArch] = useState<'direct_storage' | 'groundwater_recharge' | 'hybrid'>('hybrid');
  const [filterType, setFilterType] = useState<'pop_up_vwire' | 'sand_gravel'>('pop_up_vwire');
  const [dailyDemandLiters, setDailyDemandLiters] = useState<number>(450);

  const regionData = STATE_RAINFALL_MAP[selectedRegion] || STATE_RAINFALL_MAP['Tamil Nadu'];

  const rwhConfig: RwhConfig = {
    state: selectedRegion,
    district: selectedRegion,
    annualRainfallMm: regionData.rainfallMm,
    systemArchitecture: systemArch,
    filterType,
    dailyConsumptionLiters: dailyDemandLiters,
  };

  const metrics = calculateRwhMetrics(netUsableSqFt, rwhConfig);

  return (
    <section id="rainwater-module" className="py-20 md:py-28 w-full max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-cyan-600 uppercase mb-2">
          <Droplets className="w-4 h-4 text-cyan-600" />
          <span>EcoNest Rainwater Harvesting (RWH) Module • Module 03</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Catchment Yield Sizing & Water Analytics
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl text-base sm:text-lg">
          Harness monsoon precipitation falling onto your concrete terrace. Calculate annual harvestable yield, 
          size dual-stage pop-up filters, and eliminate reliance on private water tankers.
        </p>
      </div>

      {/* 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
        
        {/* Left Column: Hydrological Parameters & Architecture (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-600" />
              <span>Catchment Parameters</span>
            </h3>
            <span className="text-[11px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded font-bold">
              Runoff: 0.85
            </span>
          </div>

          {/* Location-Based Rainfall Lookup */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-1.5">
              Location-Based Historical Rainfall Lookup
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-cyan-500"
            >
              {Object.keys(STATE_RAINFALL_MAP).map((region) => (
                <option key={region} value={region}>
                  {region} (~{STATE_RAINFALL_MAP[region].rainfallMm} mm/year)
                </option>
              ))}
            </select>
            <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Avg Annual Rainfall:</span>
              <span className="font-bold text-slate-800">{regionData.rainfallMm} mm</span>
            </div>
          </div>

          {/* Daily Household Water Consumption */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-semibold text-slate-600">
                Daily Non-Potable Utility Consumption
              </label>
              <span className="font-mono text-sm font-bold text-cyan-800">
                {dailyDemandLiters} L / day
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="1500"
              step="50"
              value={dailyDemandLiters}
              onChange={(e) => setDailyDemandLiters(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>200 L (Couples/Small)</span>
              <span>450 L (Typical 4-person)</span>
              <span>1,500 L (Large/Gardening)</span>
            </div>
          </div>

          {/* System Architecture Selection */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              System Architecture & Destination
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { id: 'hybrid', title: 'Hybrid Dual', note: 'Storage + Borewell' },
                { id: 'direct_storage', title: 'Direct Tank', note: 'Immediate Reuse' },
                { id: 'groundwater_recharge', title: 'Recharge Pit', note: 'Aquifer Injection' },
              ].map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSystemArch(arch.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    systemArch === arch.id
                      ? 'border-cyan-500 bg-cyan-50/70 text-slate-900 font-bold ring-1 ring-cyan-400'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-[11px]">{arch.title}</div>
                  <div className="text-[9px] font-normal text-slate-500 mt-0.5">{arch.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filtration Hardware Selection */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Filtration Technology
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setFilterType('pop_up_vwire')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  filterType === 'pop_up_vwire'
                    ? 'border-cyan-500 bg-cyan-50/70 text-slate-900 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Dual-Stage Pop-Up Filter</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                  Self-cleaning, zero sand bed clogging, automatic first-flush
                </div>
              </button>

              <button
                onClick={() => setFilterType('sand_gravel')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  filterType === 'sand_gravel'
                    ? 'border-cyan-500 bg-cyan-50/70 text-slate-900 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Traditional Sand / Charcoal</div>
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                  Civil gravity bed; requires seasonal desilting
                </div>
              </button>
            </div>
          </div>

          {/* AI Architecture Reasoning Box */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-mono space-y-1.5">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Built-In AI System Architecture Reasoning:</span>
            </div>
            {systemArch === 'hybrid' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Hybrid Dual Approach:</strong> High-intensity showers first fill a 3,000L above-ground modular storage tank for immediate daily gardening and flushing. Any overflow seamlessly diverts to your direct borewell percolation well to recharge your deep aquifer.
              </p>
            )}
            {systemArch === 'direct_storage' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Direct Storage & Reuse:</strong> Recommended for urban plots without functional borewells. Pairs modular food-grade polyethylene tanks (Sintex/Supreme) with dual-stage stainless mesh filters for zero-maintenance utility water.
              </p>
            )}
            {systemArch === 'groundwater_recharge' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Groundwater Recharge Pit:</strong> Ideal for independent residences facing declining borewell water tables. Injects clean terrace runoff into surrounding strata, reversing seasonal salinity intrusion.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Yield Analytics, Mandates & Tanker Offset (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Catchment Yield Formula Banner */}
          <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-slate-400 text-[10px] uppercase">Scientific Catchment Formula:</div>
              <div className="text-cyan-300 font-bold text-xs mt-0.5">
                Yield (L) = Area ({metrics.areaSqM} m²) × Rainfall ({regionData.rainfallMm} mm) × 0.85
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
                Concrete Coeff: 0.85
              </span>
            </div>
          </div>

          {/* Key Water Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
              <div className="text-[11px] font-mono text-cyan-800 uppercase font-bold">
                Annual Harvestable Yield
              </div>
              <div className="text-2xl font-mono font-bold text-cyan-950 mt-1">
                {metrics.annualYieldLiters.toLocaleString('en-IN')} <span className="text-xs font-normal">Liters</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-700 mt-0.5">
                {(metrics.annualYieldLiters / 1000).toFixed(1)} kiloliters / yr
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-[11px] font-mono text-emerald-800 uppercase font-bold">
                Tanker Loads Offset
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-900 mt-1">
                {metrics.tankerEquivalentLoads} <span className="text-xs font-normal">Tankers</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-700 mt-0.5">
                Based on 6,000L commercial loads
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-[11px] font-mono text-blue-800 uppercase font-bold">
                Annual Tanker Savings
              </div>
              <div className="text-2xl font-mono font-bold text-blue-900 mt-1">
                ₹{metrics.annualTankerSavingsInr.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] font-mono text-blue-700 mt-0.5">
                Payback: ~{metrics.rwhPaybackYears} Years
              </div>
            </div>
          </div>

          {/* Household Self-Sufficiency Index */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono">
                  Household Utility Self-Sufficiency Index
                </h4>
                <p className="text-xs text-slate-500">
                  Percentage of annual non-potable demand met entirely by your rooftop terrace.
                </p>
              </div>
              <span className="font-mono text-xl font-bold text-cyan-800">
                {metrics.selfSufficiencyPercent}%
              </span>
            </div>

            <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${metrics.selfSufficiencyPercent}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>0% (Full Tanker Reliance)</span>
              <span>Recommended Storage Tank Buffer: <strong>{metrics.recommendedStorageCapacityLiters.toLocaleString()} L</strong></span>
              <span>100% Self-Sufficient</span>
            </div>
          </div>

          {/* State RWH Policies, Mandates & Municipal Rebates */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>State Mandate & Municipal Incentive Checker</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Statutory Mandate ({selectedRegion}):</span>
              </div>
              <p className="leading-relaxed">{regionData.mandate}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-600" />
                <span>Municipal Tax Concessions & Subsidies:</span>
              </div>
              <p className="leading-relaxed">{regionData.rebate}</p>
            </div>

            {/* Site Feasibility Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Site Feasibility Disclaimer:</strong> Groundwater recharge feasibility depends on local soil percolation rates, 
                sub-surface strata, and distance from septic tanks or building foundations.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* AI Local Vendor & Sourcing Directory */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-cyan-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Verified RWH Hardware Manufacturers & Local Civil Contractors
              </h3>
              <p className="text-xs text-slate-500">
                Direct procurement for dual-stage filters, food-grade storage, and percolation wells.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600">
            Groundwater Authority Compliant
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RWH_SUPPLIERS.map((sup, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-cyan-400 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 font-semibold border border-cyan-200">
                  {sup.type}
                </span>
                <h5 className="text-xs font-bold text-slate-900 mt-2">
                  {sup.name}
                </h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {sup.efficiency}
                </p>
                <div className="text-[10px] font-mono text-slate-400 mt-2">
                  Flow: {sup.flowRate}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">₹{sup.costInr.toLocaleString('en-IN')}</span>
                <span className="text-cyan-800 font-bold hover:underline cursor-pointer">
                  Supplier Info
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
