"use client";

import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F7F5EF] pt-10">
      
      {/* Dynamic Background: Grid + Animated Gradients */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/10 blur-[80px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], x: [0, -50, 0], y: [0, 50, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-accent/10 blur-[100px]" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-5xl md:text-7xl font-bold text-brand-text mb-6 text-balance tracking-tight leading-tight"
        >
          Find Where You're <br className="hidden md:block" />
          <span className="text-brand-primary italic relative">
            Meant to Grow
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
            </svg>
          </span>
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-brand-text/80 mb-12 text-balance font-medium"
        >
          Discover the perfect home tailored to your lifestyle. Powered by AI, designed for humans, rooted in trust.
        </motion.p>

        {/* Floating Search Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card w-full max-w-4xl p-3 md:p-4 flex flex-col md:flex-row gap-3 md:gap-4 items-center shadow-2xl bg-white/70 backdrop-blur-xl border border-white/60"
        >
          
          <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white/90 rounded-xl w-full border border-gray-100 focus-within:ring-2 ring-brand-primary/30 transition-all shadow-inner">
            <MapPin className="w-5 h-5 text-brand-primary" />
            <input 
              type="text" 
              placeholder="Where do you want to live? (e.g. Gulshan)" 
              className="bg-transparent border-none outline-none w-full text-brand-text placeholder-gray-400 font-medium"
            />
          </div>

          <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white/90 rounded-xl w-full border border-gray-100 shadow-inner">
            <select className="bg-transparent border-none outline-none w-full text-brand-text cursor-pointer font-medium appearance-none">
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House / Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <Link 
            href="/explore" 
            className="w-full md:w-auto px-10 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl transition-all hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(135,138,80,0.5)] flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </Link>
        </motion.div>
        
        {/* Quick Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold text-brand-text/60"
        >
          <span className="px-3 py-1 bg-white/50 rounded-full border border-gray-200">Popular:</span>
          <Link href="/explore?type=apartment" className="px-4 py-1 bg-white/50 rounded-full border border-gray-200 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm">Studio Apartments</Link>
          <Link href="/explore?city=dhaka" className="px-4 py-1 bg-white/50 rounded-full border border-gray-200 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm">Villas in Dhaka</Link>
          <Link href="/explore?type=commercial" className="px-4 py-1 bg-white/50 rounded-full border border-gray-200 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm">Offices spaces</Link>
        </motion.div>
      </div>

      {/* Floating Image Decorations for Premium feel */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:block absolute left-[5%] top-[20%] w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg]"
      >
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" className="w-full h-full object-cover" alt="Interior" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute right-[5%] top-[30%] w-56 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[4deg]"
      >
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" className="w-full h-full object-cover" alt="Villa exterior" />
      </motion.div>

    </section>
  );
}
