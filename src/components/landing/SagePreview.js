import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SagePreview() {
  return (
    <section className="py-24 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-sm mb-6 border border-brand-accent/20">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Recommendations</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary mb-6 text-balance">
              Meet Sage, Your Personal Home Guide
            </h2>
            <p className="text-lg text-brand-text/70 mb-8 max-w-xl">
              Don't know exactly what you want? Just chat with Sage. 
              Our intelligent assistant understands natural language and curates 
              properties based on what actually matters to you.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-brand-text/80">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                <span>"Find me a pet-friendly apartment near a park."</span>
              </li>
              <li className="flex items-start gap-3 text-brand-text/80">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                <span>"I need a quiet 2-bedroom with good sunlight under 30k."</span>
              </li>
            </ul>
            <Link 
              href="/sage" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-brand-primary/30 transition-all group"
            >
              Try Sage Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Mockup */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg relative">
            {/* Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-accent/20 to-brand-primary/5 rounded-3xl blur-2xl -z-10" />
            
            <div className="glass-card p-6 border-brand-primary/10 shadow-xl rounded-2xl bg-white/60">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-primary leading-tight">Sage</h4>
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-end">
                  <div className="bg-brand-primary text-white p-3 rounded-2xl rounded-tr-none text-sm shadow-sm inline-block max-w-[85%]">
                    I'm looking for a sunny apartment in Gulshan that allows cats.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 text-brand-text p-3 rounded-2xl rounded-tl-none text-sm shadow-sm inline-block max-w-[90%]">
                    <p className="mb-3">I found 3 perfect matches for you! Here is the top pick:</p>
                    <div className="border border-gray-100 rounded-lg p-2 bg-brand-bg flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded object-cover overflow-hidden flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80" alt="Apt" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h5 className="font-bold text-brand-primary text-sm line-clamp-1">Sunny 2-Bed with Balcony</h5>
                        <p className="text-xs text-gray-500 mb-1">Gulshan 2</p>
                        <p className="font-bold text-brand-accent text-xs">৳ 45,000/mo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-400">
                  Type a message...
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
