'use client';

import React from 'react';
import { SplineScene } from '@/components/ui/splite';
import { motion } from 'framer-motion';
import { Compass, Sun, Droplets, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onSelectModule: (module: 'design' | 'solar' | 'rwh') => void;
}

export function HeroSection({ onSelectModule }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full min-h-[100vh] relative flex flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-12">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 flex justify-center md:justify-end items-center pointer-events-auto opacity-90 md:translate-x-[15%]">
        <div 
          className="w-[120%] h-[70vh] md:max-w-none md:w-[75vw] md:h-[105vh] mx-auto md:mx-0 transform scale-[0.8] md:scale-100 origin-center flex items-center justify-center"
          style={{
            maskImage: 'radial-gradient(55% 55% at 50% 50%, black 65%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(55% 55% at 50% 50%, black 65%, transparent 100%)'
          }}
        >
          <SplineScene 
            scene="https://my.spline.design/glassknotvortex-xpuus24CEHGNFIlr2NjtjuK2/"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Main Hero Header & Pitch */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 pointer-events-none mt-4 md:mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Engineering Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-6 shadow-md backdrop-blur-md border border-slate-700/50 pointer-events-auto">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI Decision Support System (DSS) • CleanTech Precision</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 leading-[1.02]">
            TERRACE STUDIO <br />
            <span className="text-blue-600 font-mono tracking-tight">LMR</span>
          </h1>

          <p className="mt-5 text-slate-700 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
            Optimize and engineer your rooftop terrace. Calculate net usable space via CNN obstacle detection, 
            configure bespoke lifestyle zones, size solar PV with government subsidies, and engineer rainwater catchment.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono text-slate-600 pointer-events-auto">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ResNet Obstacle Segmentation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>₹78,000 PM-Surya Ghar Subsidies</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Concrete Runoff Coeff: 0.85</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Block Layout: 3 Horizontally Aligned Glassmorphic Cards */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 mt-14 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-4 flex items-center justify-between"
        >
          <div className="text-xs uppercase tracking-widest font-mono font-semibold text-slate-500 flex items-center gap-2">
            <span>Primary CleanTech & Spatial Workflows</span>
          </div>
          <button 
            onClick={() => scrollTo('vision-engine')}
            className="text-xs font-mono text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            Start with CNN Dimensioning <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Rooftop Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            onClick={() => {
              onSelectModule('design');
              scrollTo('design-studio');
            }}
            className="group cursor-pointer rounded-2xl p-6 bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-slate-200/80 hover:border-blue-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(37,99,235,0.12)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  Zone Studio
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Rooftop Architecture & Terrace Design Studio
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Living spaces, outdoor lounges, wellness setups, pergolas, and solariums with spatial clearance verification.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-500">6 Modular Themes</span>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Configure Zones <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Card 2: Solar Equipping */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onClick={() => {
              onSelectModule('solar');
              scrollTo('solar-module');
            }}
            className="group cursor-pointer rounded-2xl p-6 bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-slate-200/80 hover:border-amber-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(245,158,11,0.12)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  Solar PV DSS
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                EcoNest Solar Equipping Module
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                kWp capacity modeling, central & state policy subsidies (PM-Surya Ghar), 25-yr payback curves, and DISCOM net metering.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-amber-700">Up to ₹78,000 Subsidy</span>
              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Size PV System <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>

          {/* Card 3: Rainwater Harvesting */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            onClick={() => {
              onSelectModule('rwh');
              scrollTo('rainwater-module');
            }}
            className="group cursor-pointer rounded-2xl p-6 bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-slate-200/80 hover:border-cyan-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(6,182,212,0.12)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 group-hover:scale-110 transition-transform">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                  RWH Analytics
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                EcoNest Rainwater Harvesting
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Catchment yield, automated dual-stage filtration, municipal mandates compliance, and private tanker cost savings.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-cyan-700">85% Catchment Yield</span>
              <span className="text-xs font-semibold text-cyan-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Model Catchment <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
