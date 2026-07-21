import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Background Image & Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80" 
              alt="Beautiful home" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay using the new accent color (Petrol Blue) */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/95 via-brand-accent/80 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-brand-primary/30 mix-blend-color-burn" />
          </div>
          
          <div className="relative z-10 p-12 md:p-20 lg:w-2/3">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Plant <br/>Your Roots?
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl font-medium">
              Join thousands of users who have already found their perfect home using Rooted. 
              Start your intelligent search today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/explore" 
                className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all hover:shadow-[0_10px_20px_-10px_rgba(135,138,80,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Browse Homes <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/30 backdrop-blur-md flex items-center justify-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
