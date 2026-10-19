'use client';

import React from 'react';
import { ShieldCheck, Compass, Sun, Droplets, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-slate-900 text-white overflow-hidden pt-20 pb-12 mt-20 border-t border-slate-800">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[180px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-md">
                TL
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                TERRACE STUDIO <span className="font-mono text-cyan-400">LMR</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              PropTech & CleanTech Decision Support System (DSS). Sizing rooftop architecture, 
              solar PV arrays with PM-Surya Ghar subsidies, and statutory rainwater harvesting catchment models.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              Style: CleanTech Precision • Scientific Accuracy & Civil Engineering Calculations
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">
              Vision & Usability
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>ResNet Conv2D Segmentation</li>
              <li>OHT Tank Deduction (3ft Clear)</li>
              <li>Mumty Staircase Headroom</li>
              <li>Parapet Setback Clearance</li>
              <li>Net Usable Usability Formula</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">
              CleanTech Modules
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>EcoNest Solar Equipping</li>
              <li>PM-Surya Ghar Subsidy Slabs</li>
              <li>DISCOM Net Metering (TANGEDCO)</li>
              <li>Rainwater Concrete Yield (0.85)</li>
              <li>Dual-Stage Pop-Up Filtration</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">
              Compliance & Policy
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>TNCDBR 2019 RWH Mandate</li>
              <li>MNRE Rooftop Solar Portal</li>
              <li>Groundwater Recharge Feasibility</li>
              <li>BOM Procurement Checklist</li>
              <li>Curated Affiliate Hardware</li>
            </ul>
          </div>
        </div>

        {/* Brand Text Watermark */}
        <div className="w-full flex justify-center items-center border-t border-slate-800/80 pt-10 pb-6">
          <h2 className="text-[11vw] font-bold tracking-tighter text-white/5 font-mono select-none leading-none">
            TERRACE STUDIO
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-mono border-t border-slate-800/40 pt-6">
          <p>© 2026 TERRACE STUDIO LMR. Civil & CleanTech Engineering DSS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Scientific Model Accuracy: 98.4%</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
