'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { HeroSection } from '@/components/HeroSection';
import { CNNObstacleEngine } from '@/components/CNNObstacleEngine';
import { TerraceDesignStudio } from '@/components/TerraceDesignStudio';
import { SolarEquippingModule } from '@/components/SolarEquippingModule';
import { RainwaterHarvestingModule } from '@/components/RainwaterHarvestingModule';
import { TransformationFinale } from '@/components/TransformationFinale';
import { Footer } from '@/components/ui/footer-section';
import { INITIAL_OBSTACLES } from '@/lib/data';
import { calculateNetUsableArea } from '@/lib/calculations';
import { DesignZoneId, ObstacleDetection } from '@/types/terrace';

export default function App() {
  const [grossSqFt, setGrossSqFt] = useState<number>(1200);
  const [obstacles, setObstacles] = useState<ObstacleDetection[]>(INITIAL_OBSTACLES);
  const [selectedZones, setSelectedZones] = useState<DesignZoneId[]>(['wellness', 'pergola']);

  // Calculate validated net usable space passed into downstream modules
  const { netUsableSqFt } = calculateNetUsableArea(grossSqFt, obstacles);

  const handleToggleZone = (zoneId: DesignZoneId) => {
    setSelectedZones((prev) => 
      prev.includes(zoneId) 
        ? prev.filter((id) => id !== zoneId) 
        : [...prev, zoneId]
    );
  };

  const handleHeroModuleSelect = (module: 'design' | 'solar' | 'rwh') => {
    const targetMap: Record<string, string> = {
      design: 'design-studio',
      solar: 'solar-module',
      rwh: 'rainwater-module',
    };
    const targetEl = document.getElementById(targetMap[module]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Precision CleanTech Ambient Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-cyan-100/35 blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-100/35 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[15%] w-[50vw] h-[50vw] rounded-full bg-amber-100/30 blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Sticky CleanTech Navbar */}
        <Navbar />

        {/* Main Application Sections */}
        <main className="w-full flex flex-col items-center">
          {/* 1. Hero Block Layout & 3D Spline Scene with 3 Horizontal Cards */}
          <HeroSection onSelectModule={handleHeroModuleSelect} />

          {/* 2. Computer Vision (CNN) Obstacle Detection & Usability Calculation Engine */}
          <CNNObstacleEngine
            grossSqFt={grossSqFt}
            onGrossChange={setGrossSqFt}
            obstacles={obstacles}
            onObstaclesChange={setObstacles}
          />

          {/* 3, 4, 5. Terrace Design Studio, Feasibility Engine & Curated Marketplace with Built-In AI */}
          <TerraceDesignStudio
            netUsableSqFt={netUsableSqFt}
            selectedZones={selectedZones}
            onToggleZone={handleToggleZone}
          />

          {/* 6. EcoNest Solar Equipping Module */}
          <SolarEquippingModule netUsableSqFt={netUsableSqFt} />

          {/* 7. EcoNest Rainwater Harvesting (RWH) Module */}
          <RainwaterHarvestingModule netUsableSqFt={netUsableSqFt} />

          {/* 8. Finale: Post-Transformation Preview & AI Benefit Scorecard */}
          <TransformationFinale
            netUsableSqFt={netUsableSqFt}
            selectedZones={selectedZones}
            initialPillars={{
              includeDesign: true,
              includeSolar: true,
              includeRainwater: true,
            }}
          />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
