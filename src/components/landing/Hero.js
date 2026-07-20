import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-brand-bg pt-10">
      
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-primary/5 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Main Headline */}
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-brand-primary mb-6 text-balance tracking-tight leading-tight">
          Find Where You're <br className="hidden md:block" />
          <span className="text-brand-accent italic">Meant to Grow</span>
        </h1>
        
        {/* Subheadline */}
        <p className="max-w-2xl text-lg md:text-xl text-brand-text/80 mb-10 text-balance">
          Discover the perfect home tailored to your lifestyle. Powered by AI, designed for humans, rooted in trust.
        </p>

        {/* Floating Search Card */}
        <div className="glass-card w-full max-w-4xl p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl w-full border border-gray-100 focus-within:ring-2 ring-brand-primary/20 transition-all">
            <MapPin className="w-5 h-5 text-brand-accent" />
            <input 
              type="text" 
              placeholder="Where do you want to live? (e.g. Gulshan)" 
              className="bg-transparent border-none outline-none w-full text-brand-text placeholder-gray-400"
            />
          </div>

          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl w-full border border-gray-100">
            <select className="bg-transparent border-none outline-none w-full text-brand-text cursor-pointer">
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <Link 
            href="/explore" 
            className="w-full md:w-auto px-8 py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-xl transition-transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </div>
        
        {/* Quick Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-brand-text/60">
          <span>Popular:</span>
          <Link href="/explore?type=apartment" className="hover:text-brand-primary transition-colors underline decoration-brand-accent/30 decoration-2 underline-offset-4">Studio Apartments</Link>
          <Link href="/explore?city=dhaka" className="hover:text-brand-primary transition-colors underline decoration-brand-accent/30 decoration-2 underline-offset-4">Villas in Dhaka</Link>
          <Link href="/explore?type=commercial" className="hover:text-brand-primary transition-colors underline decoration-brand-accent/30 decoration-2 underline-offset-4">Offices spaces</Link>
        </div>

      </div>
    </section>
  );
}
