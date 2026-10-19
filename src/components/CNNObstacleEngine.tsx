'use client';

import React, { useState } from 'react';
import { ObstacleDetection } from '@/types/terrace';
import { calculateNetUsableArea } from '@/lib/calculations';
import { 
  Scan, 
  Upload, 
  Layers, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface CNNObstacleEngineProps {
  grossSqFt: number;
  onGrossChange: (sqFt: number) => void;
  obstacles: ObstacleDetection[];
  onObstaclesChange: (obstacles: ObstacleDetection[]) => void;
}

export function CNNObstacleEngine({
  grossSqFt,
  onGrossChange,
  obstacles,
  onObstaclesChange,
}: CNNObstacleEngineProps) {
  const [unitMode, setUnitMode] = useState<'sqft' | 'sqm'>('sqft');
  const [activeViewMode, setActiveViewMode] = useState<'segmented' | 'conv2d' | 'raw'>('segmented');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedObstacleId, setSelectedObstacleId] = useState<string | null>(null);

  const { totalDeductionsSqFt, netUsableSqFt, netUsableSqM, deductionPercent } = 
    calculateNetUsableArea(grossSqFt, obstacles);

  const handleToggleObstacle = (id: string) => {
    const updated = obstacles.map((obs) => 
      obs.id === id ? { ...obs, enabled: !obs.enabled } : obs
    );
    onObstaclesChange(updated);
  };

  const handleAreaSliderChange = (id: string, newArea: number) => {
    const updated = obstacles.map((obs) => 
      obs.id === id ? { ...obs, areaSqFt: newArea } : obs
    );
    onObstaclesChange(updated);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSimulateScan();
    }
  };

  return (
    <section id="vision-engine" className="py-20 md:py-28 w-full max-w-7xl mx-auto px-6 relative z-10">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-blue-600 uppercase mb-2">
          <Scan className="w-4 h-4 text-blue-600" />
          <span>Computer Vision (CNN) Usability Pipeline</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Obstacle Detection & Net Space Engine
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl text-base sm:text-lg">
          Before recommending spatial layouts or clean energy equipment, our deep learning backbone analyzes rooftop imagery 
          to segment structural impediments—ensuring zero spatial conflict.
        </p>
      </div>

      {/* Step A: Gross Dimension Input Bar */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center">
                A
              </span>
              <h3 className="text-base font-bold text-slate-900">Step A: Gross Rooftop Dimension Input</h3>
            </div>
            <p className="text-xs text-slate-500">
              Enter measured boundary area before physical obstacle deductions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Unit Switcher */}
            <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50 text-xs font-mono">
              <button
                onClick={() => setUnitMode('sqft')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  unitMode === 'sqft' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sq. Feet (sq. ft.)
              </button>
              <button
                onClick={() => setUnitMode('sqm')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  unitMode === 'sqm' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sq. Meters (m²)
              </button>
            </div>

            {/* Input Field */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="number"
                  min="300"
                  max="15000"
                  step="50"
                  value={unitMode === 'sqft' ? grossSqFt : Math.round(grossSqFt * 0.092903)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitMode === 'sqft') {
                      onGrossChange(val);
                    } else {
                      onGrossChange(Math.round(val * 10.7639));
                    }
                  }}
                  className="font-mono text-lg font-bold w-36 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
                  {unitMode === 'sqft' ? 'sqft' : 'm²'}
                </span>
              </div>

              {/* Preset buttons */}
              <div className="hidden sm:flex gap-1.5 text-xs font-mono">
                {[800, 1200, 1800, 2400].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onGrossChange(preset)}
                    className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                      grossSqFt === preset
                        ? 'bg-blue-600 border-blue-600 text-white font-semibold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Bento Grid: CNN Visualizer & Deduction Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step B: Visual Aerial View & CNN Feature Layer (7 Columns) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-mono text-xs font-bold flex items-center justify-center">
                  B
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Step B: CNN Feature Extraction & Segmentation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Backbone: Conv2D • BatchNorm • MaxPool spatial segmentation
                  </p>
                </div>
              </div>

              {/* View Mode Filters */}
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-mono">
                <button
                  onClick={() => setActiveViewMode('segmented')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeViewMode === 'segmented' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Segmented
                </button>
                <button
                  onClick={() => setActiveViewMode('conv2d')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeViewMode === 'conv2d' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Feature Map
                </button>
                <button
                  onClick={() => setActiveViewMode('raw')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeViewMode === 'raw' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Drone Raw
                </button>
              </div>
            </div>

            {/* Interactive Aerial Canvas Simulation */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-inner">
              {/* Raw Drone Shot Background */}
              <img
                src="https://images.unsplash.com/photo-1590496793907-425b0b2e316e?auto=format&fit=crop&w=1200&q=80"
                alt="Aerial Terrace Drone View"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  activeViewMode === 'conv2d' ? 'filter hue-rotate-180 contrast-200 saturate-200 brightness-75' : ''
                }`}
              />

              {/* Conv2D Grid Feature Overlay */}
              {activeViewMode === 'conv2d' && (
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-color-dodge pointer-events-none">
                  <div 
                    className="w-full h-full opacity-40" 
                    style={{
                      backgroundImage: 'radial-gradient(circle, #06b6d4 1.5px, transparent 1.5px)',
                      backgroundSize: '24px 24px'
                    }} 
                  />
                  <div className="absolute bottom-4 left-4 font-mono text-[11px] text-cyan-300 bg-black/80 px-2 py-1 rounded border border-cyan-800">
                    Kernel: 3x3 Conv2D | Activation: ReLU | Stride: 1
                  </div>
                </div>
              )}

              {/* Scanning Laser Beam */}
              {isScanning && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent pointer-events-none animate-bounce" />
              )}

              {/* Segmented Bounding Boxes */}
              {activeViewMode !== 'raw' && (
                <div className="absolute inset-0 pointer-events-auto">
                  {obstacles.map((obs) => {
                    const isSelected = selectedObstacleId === obs.id;
                    if (!obs.enabled) return null;

                    let borderTheme = 'border-amber-400 bg-amber-500/20 text-amber-300';
                    if (obs.category === 'mumty') borderTheme = 'border-blue-400 bg-blue-500/20 text-blue-300';
                    if (obs.category === 'parapet') borderTheme = 'border-red-400 bg-red-500/10 text-red-300';
                    if (obs.category === 'utility') borderTheme = 'border-purple-400 bg-purple-500/20 text-purple-300';

                    return (
                      <div
                        key={obs.id}
                        onClick={() => setSelectedObstacleId(isSelected ? null : obs.id)}
                        style={{
                          left: `${obs.coords.x}%`,
                          top: `${obs.coords.y}%`,
                          width: `${obs.coords.width}%`,
                          height: `${obs.coords.height}%`,
                        }}
                        className={`absolute border-2 rounded-lg transition-all duration-200 cursor-pointer flex flex-col justify-between p-1.5 ${borderTheme} ${
                          isSelected ? 'ring-2 ring-white scale-[1.02] z-20' : 'hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold px-1 rounded bg-black/70 tracking-tight">
                            {obs.name.split(' ')[0]}
                          </span>
                          <span className="font-mono text-[9px] bg-black/60 px-1 rounded text-white">
                            {obs.confidence}%
                          </span>
                        </div>
                        <div className="font-mono text-[10px] font-semibold text-right">
                          -{obs.areaSqFt} sq. ft.
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Calibration Watermark / Scale */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-white flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CNN Live Inference: ResNet-FPN v3</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 text-[11px] font-mono">
                Spatial Resolution: 0.05 m/px
              </div>
            </div>
          </div>

          {/* Upload & Re-scan Action Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-mono font-medium hover:bg-slate-800 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Drone / Terrace Image</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-mono font-medium hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                <span>Re-Infer</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-mono">
              Auto-calibrated against 4 structural obstacle classes
            </span>
          </div>
        </div>

        {/* Step C: Verification & Deduction Math Table (5 Columns) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold flex items-center justify-center">
                  C
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Step C: Verification & Deduction Math
                </h3>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Manual Override Ready
              </span>
            </div>

            {/* Formula Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs mb-5 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Formula: </span>
                <span className="text-cyan-400 font-bold">Net Usable Area</span> = Gross Area − ∑(Deductions)
              </div>
            </div>

            {/* Obstacle Deduction List with Interactive Overrides */}
            <div className="space-y-3">
              {obstacles.map((obs) => (
                <div
                  key={obs.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    obs.enabled
                      ? 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                      : 'border-slate-100 bg-slate-50/20 opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={obs.enabled}
                        onChange={() => handleToggleObstacle(obs.id)}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{obs.name}</div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {obs.deductionReason}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {obs.enabled ? `-${obs.areaSqFt}` : '0'} sqft
                      </span>
                      <div className="text-[10px] font-mono text-emerald-600 font-medium">
                        {obs.confidence}% conf
                      </div>
                    </div>
                  </div>

                  {/* Manual Area Fine-Tune Slider */}
                  {obs.enabled && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-400">Fine-tune:</span>
                      <input
                        type="range"
                        min="20"
                        max="350"
                        value={obs.areaSqFt}
                        onChange={(e) => handleAreaSliderChange(obs.id, Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <span className="font-mono text-[10px] text-slate-600 w-12 text-right">
                        {obs.areaSqFt} ft²
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* High-Contrast Final Area Summary Callout */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-800">
                <div className="text-[11px] font-mono text-slate-500 uppercase">Gross Input</div>
                <div className="text-lg font-mono font-bold text-slate-900">
                  {grossSqFt.toLocaleString()} sq. ft.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-50 text-red-900 border border-red-100">
                <div className="text-[11px] font-mono text-red-600 uppercase">Total Deducted</div>
                <div className="text-lg font-mono font-bold text-red-700">
                  -{totalDeductionsSqFt} sq. ft. ({deductionPercent}%)
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-between shadow-md">
              <div>
                <div className="text-xs font-mono uppercase text-cyan-300 font-semibold tracking-wider">
                  Validated Net Usable Area
                </div>
                <div className="text-2xl font-mono font-bold text-white mt-0.5">
                  {netUsableSqFt.toLocaleString()} <span className="text-sm font-normal text-slate-300">sq. ft.</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm px-2.5 py-1 rounded bg-white/10 text-cyan-200 border border-white/20">
                  {netUsableSqM} m²
                </span>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 justify-end">
                  <CheckCircle2 className="w-3 h-3" /> Spatial Safe
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
