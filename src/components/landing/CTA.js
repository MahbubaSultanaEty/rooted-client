import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Plant Your Roots?
            </h2>
            <p className="text-brand-bg/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already found their perfect home using Rooted. 
              Start your intelligent search today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/explore" 
                className="px-8 py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-brand-accent/90 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
              >
                Browse Homes <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/register" 
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
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
