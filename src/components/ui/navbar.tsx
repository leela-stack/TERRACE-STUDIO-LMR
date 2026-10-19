'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'CNN Vision', target: 'vision-engine' },
    { label: 'Design Studio', target: 'design-studio' },
    { label: 'Solar PV', target: 'solar-module' },
    { label: 'Rainwater RWH', target: 'rainwater-module' },
    { label: 'Finale Preview', target: 'finale-section' },
  ];

  return (
    <motion.nav 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg border border-slate-200/90' : 'bg-white/60 backdrop-blur-md border border-white/60 shadow-xs'
      }`}>
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer text-slate-900 font-bold tracking-tight text-base sm:text-lg flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs">
            TL
          </div>
          <span className="font-sans">TERRACE STUDIO <span className="font-mono text-blue-600">LMR</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono font-semibold text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollTo('vision-engine')}
            className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-mono font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Model Net Space</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-slate-700 p-1.5 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="lg:hidden absolute top-full left-0 w-full mt-3 p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl flex flex-col gap-2 font-mono text-sm"
          >
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollTo(item.target)}
                className="text-left text-slate-700 hover:text-blue-600 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('vision-engine')}
              className="mt-2 w-full py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md"
            >
              Start Usability Engine
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
