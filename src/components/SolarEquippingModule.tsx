'use client';

import React, { useState } from 'react';
import { SolarConfig, SolarTechType, MountingType } from '@/types/terrace';
import { calculateSolarMetrics } from '@/lib/calculations';
import { SOLAR_INSTALLERS } from '@/lib/data';
import { 
  Sun, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  AlertCircle, 
  PhoneCall, 
  Layers, 
  Leaf, 
  Info,
  CheckCircle2
} from 'lucide-react';

interface SolarEquippingModuleProps {
  netUsableSqFt: number;
}

export function SolarEquippingModule({ netUsableSqFt }: SolarEquippingModuleProps) {
  const [solarConfig, setSolarConfig] = useState<SolarConfig>({
    locationState: 'Tamil Nadu',
    discom: 'TANGEDCO (Tamil Nadu Generation and Distribution Corp)',
    bimonthlyBillInr: 5200,
    targetKwp: 3,
    mountingType: 'elevated_canopy',
    techType: 'bifacial',
  });

  const metrics = calculateSolarMetrics(netUsableSqFt, solarConfig);

  const handleStateChange = (state: string) => {
    let discom = 'State DISCOM Net Metering';
    if (state === 'Tamil Nadu') discom = 'TANGEDCO (Net Feed-in / Bi-monthly Tariff Slabs)';
    if (state === 'Karnataka') discom = 'BESCOM (Bangalore Electricity Supply Co)';
    if (state === 'Maharashtra') discom = 'MSEDCL (Mahavitaran Solar Net Metering)';
    if (state === 'Gujarat') discom = 'UGVCL / DGVCL (Surya Gujarat Scheme)';
    if (state === 'Delhi NCR') discom = 'BSES Rajdhani / Yamuna Solar Policy';

    setSolarConfig((prev) => ({
      ...prev,
      locationState: state,
      discom,
    }));
  };

  return (
    <section id="solar-module" className="py-20 md:py-28 w-full max-w-7xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-600 uppercase mb-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>EcoNest Solar Equipping Module • Module 02</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          CleanTech Solar PV Sizing & Policy Engineering
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl text-base sm:text-lg">
          Transform your rooftop into a high-yield power station. Auto-model kWp capacity, claim verified PM-Surya Ghar subsidies, 
          and track 25-year financial breakeven metrics.
        </p>
      </div>

      {/* Main Configuration Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
        
        {/* Left Column: Sizing Controls & Policy Selector (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Solar System Parameters</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              Max Area: {metrics.maxPossibleKwpByArea} kWp
            </span>
          </div>

          {/* State / DISCOM Selector */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-1.5">
              Select State / DISCOM Grid Region
            </label>
            <select
              value={solarConfig.locationState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-amber-500"
            >
              <option value="Tamil Nadu">Tamil Nadu (TANGEDCO)</option>
              <option value="Karnataka">Karnataka (BESCOM)</option>
              <option value="Maharashtra">Maharashtra (MSEDCL)</option>
              <option value="Gujarat">Gujarat (GUVNL / Surya Gujarat)</option>
              <option value="Delhi NCR">Delhi NCR (BSES / DVB)</option>
            </select>
            <div className="mt-1 text-[11px] font-mono text-slate-500">
              DISCOM: {solarConfig.discom}
            </div>
          </div>

          {/* Bi-Monthly Electricity Bill Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-semibold text-slate-600">
                Average Bi-Monthly Electricity Bill
              </label>
              <span className="font-mono text-sm font-bold text-slate-900">
                ₹{solarConfig.bimonthlyBillInr.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="1500"
              max="25000"
              step="500"
              value={solarConfig.bimonthlyBillInr}
              onChange={(e) => setSolarConfig({ ...solarConfig, bimonthlyBillInr: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>₹1,500 (~200 units)</span>
              <span>₹25,000 (~3,000 units)</span>
            </div>
          </div>

          {/* Target kWp Sizing Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono font-semibold text-slate-600">
                Target Capacity Sizing (kWp)
              </label>
              <span className="font-mono text-sm font-bold text-amber-600">
                {solarConfig.targetKwp} kWp
              </span>
            </div>
            <input
              type="range"
              min="1"
              max={Math.max(1, metrics.maxPossibleKwpByArea || 5)}
              step="1"
              value={solarConfig.targetKwp}
              onChange={(e) => setSolarConfig({ ...solarConfig, targetKwp: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>1 kWp (Small Household)</span>
              <span>3 kWp (Standard Tier)</span>
              <span>{Math.max(1, metrics.maxPossibleKwpByArea)} kWp (Max Roof)</span>
            </div>
          </div>

          {/* Elevated vs Floor Mounting Structure */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              Structural Mounting Architecture
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => setSolarConfig({ ...solarConfig, mountingType: 'elevated_canopy' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  solarConfig.mountingType === 'elevated_canopy'
                    ? 'border-amber-500 bg-amber-50/70 text-slate-900 font-bold ring-1 ring-amber-400'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Elevated Canopy (8–9 ft)</div>
                <div className="text-[10px] font-normal text-slate-500 mt-1">
                  Preserves 100% usable terrace space underneath
                </div>
              </button>

              <button
                onClick={() => setSolarConfig({ ...solarConfig, mountingType: 'standard_floor' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  solarConfig.mountingType === 'standard_floor'
                    ? 'border-amber-500 bg-amber-50/70 text-slate-900 font-bold ring-1 ring-amber-400'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold">Standard Floor Mount</div>
                <div className="text-[10px] font-normal text-slate-500 mt-1">
                  Direct roof anchors, lower structural capex
                </div>
              </button>
            </div>
          </div>

          {/* Technology Selection */}
          <div>
            <label className="text-xs font-mono font-semibold text-slate-600 block mb-2">
              PV Module Technology Selection
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { id: 'bifacial', name: 'Bifacial TOPCon', note: '+15% Rear Gain' },
                { id: 'mono_perc', name: 'Mono PERC', note: '21.5% Efficiency' },
                { id: 'polycrystalline', name: 'Polycrystalline', note: 'Budget Utility' },
              ].map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSolarConfig({ ...solarConfig, techType: tech.id as SolarTechType })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    solarConfig.techType === tech.id
                      ? 'border-amber-500 bg-amber-50/70 text-slate-900 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-[11px]">{tech.name}</div>
                  <div className="text-[9px] font-normal text-slate-500 mt-0.5">{tech.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Technology Reasoning Box */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-mono space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Built-In AI Technology Reasoning:</span>
            </div>
            {solarConfig.techType === 'bifacial' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Bifacial Modules:</strong> Recommended because your elevated pergola structure allows ambient light reflection off light-colored terrace tiles, yielding an additional <strong>+12% to +18% rear-side generation gain</strong>.
              </p>
            )}
            {solarConfig.techType === 'mono_perc' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Mono PERC / N-Type TOPCon:</strong> Engineered for compact urban rooftops requiring maximum wattage density (21%–23% cell efficiency) with lower temperature coefficients in high-heat Indian summers.
              </p>
            )}
            {solarConfig.techType === 'polycrystalline' && (
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong>Polycrystalline:</strong> Highlighted only for large-footprint, low-budget installations where terrace surface area is unrestricted and lower conversion efficiency (16%–17%) is acceptable.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Financial Sizing, Subsidies & Cost Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Transparent Cost Breakdown Card */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono mb-4 flex items-center justify-between">
              <span>Transparent Cost Breakdown & Subsidies</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                PM-Surya Ghar Scheme
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Total Estimated CapEx</div>
                <div className="text-xl font-mono font-bold text-slate-900 mt-1">
                  ₹{metrics.totalCapEx.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Includes modules, structure & inverter
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-[11px] font-mono text-emerald-800 uppercase font-semibold">
                  Total Govt Subsidies
                </div>
                <div className="text-xl font-mono font-bold text-emerald-700 mt-1">
                  -₹{metrics.totalSubsidies.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] font-mono text-emerald-600 mt-0.5">
                  Central: ₹{metrics.centralSubsidy.toLocaleString('en-IN')} | State: ₹{metrics.stateSubsidy.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-[11px] font-mono text-amber-800 uppercase font-semibold">
                  Net Out-of-Pocket Cost
                </div>
                <div className="text-xl font-mono font-bold text-amber-900 mt-1">
                  ₹{metrics.netOutOfPocket.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] font-mono text-amber-700 mt-0.5">
                  Estimated Payback: ~{metrics.paybackYears} Years
                </div>
              </div>
            </div>

            {/* Bill Savings Comparison */}
            <div className="p-4 rounded-xl bg-slate-900 text-white mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div>
                  <div className="text-xs font-mono uppercase text-amber-400 font-semibold">
                    Bi-Monthly Electricity Bill Savings
                  </div>
                  <div className="text-sm text-slate-300">
                    Calculated against your local DISCOM slab rates
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xl font-bold text-emerald-400">
                    -₹{metrics.bimonthlySavingsInr.toLocaleString('en-IN')} / cycle
                  </span>
                </div>
              </div>

              {/* Progress Comparison Bar */}
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Pre-Solar Bill</span>
                    <span>₹{solarConfig.bimonthlyBillInr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                    <span>Post-Solar Net Bill</span>
                    <span className="text-emerald-400 font-bold">
                      ₹{Math.max(0, solarConfig.bimonthlyBillInr - metrics.bimonthlySavingsInr).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(5, (1 - metrics.bimonthlySavingsInr / solarConfig.bimonthlyBillInr) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Payback & Breakeven Curve Snapshot */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Payback & Breakeven Cashflow Projections</span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-600">
                  25-Year Net: ₹{metrics.cumulativeSavings25Y.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2 text-center font-mono">
                {metrics.paybackCurve.slice(0, 6).map((item) => (
                  <div key={item.year} className="p-2 rounded-lg bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-400">Yr {item.year}</div>
                    <div className={`text-xs font-bold mt-1 ${item.netCashflow >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.netCashflow >= 0 ? `+₹${Math.round(item.netCashflow / 1000)}k` : `-₹${Math.abs(Math.round(item.netCashflow / 1000))}k`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Metric Gauges */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-800 uppercase font-bold">CO₂ Offset</div>
                  <div className="font-mono text-base font-bold text-emerald-950">
                    {metrics.lifetimeCo2Tons} <span className="text-xs font-normal">Metric Tons</span>
                  </div>
                  <div className="text-[10px] text-emerald-700">Lifetime 25-Year footprint</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-800 uppercase font-bold">Trees Equivalent</div>
                  <div className="font-mono text-base font-bold text-cyan-950">
                    {metrics.equivalentTrees} <span className="text-xs font-normal">Mature Trees</span>
                  </div>
                  <div className="text-[10px] text-cyan-700">Annual carbon sequestration</div>
                </div>
              </div>
            </div>

            {/* Prominent Policy Disclaimer */}
            <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Policy Disclaimer:</strong> Subsidies and net-metering approvals are subject to central/state eligibility norms, 
                DISCOM technical feasibility approval, grid connectivity, and execution via officially empanelled vendors.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* AI Local Installer & Vendor Suggestions */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Empanelled Rooftop Solar EPC Contractors & Regional Distributors
              </h3>
              <p className="text-xs text-slate-500">
                Verified national portal partners for guaranteed subsidy disbursement in {solarConfig.locationState}.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600">
            DISCOM Liaison Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOLAR_INSTALLERS.map((inst, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                    {inst.tier}
                  </span>
                  <span className="text-[10px] font-mono text-amber-600 font-bold">
                    ★ {inst.rating}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 mt-1">
                  {inst.name}
                </h5>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {inst.specialty}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 text-[11px]">{inst.badge}</span>
                <span className="text-blue-600 font-bold flex items-center gap-1">
                  <PhoneCall className="w-3 h-3" /> Connect
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
