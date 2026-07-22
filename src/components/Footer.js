import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { LogoFacebook, LogoLinkedin } from '@gravity-ui/icons';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Rooted Logo" className="w-8 h-8 object-contain" />
              <span className="font-heading text-2xl font-bold tracking-tight">
                Rooted
              </span>
            </Link>
            <p className="text-brand-bg/80 text-sm leading-relaxed max-w-xs">
              Find where you're meant to grow. Your AI-powered companion for discovering the perfect home.
            </p>
          </div>

          {/* Links - Discover */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-brand-accent">Discover</h3>
            <ul className="space-y-3 text-sm text-brand-bg/80">
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Homes</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/items/add" className="hover:text-white transition-colors">List a Property</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-brand-accent">Support & Legal</h3>
            <ul className="space-y-3 text-sm text-brand-bg/80">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-brand-accent">Stay Rooted</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center">
                <LogoFacebook width="16" height="16" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center"> 
                {/* Twitter SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center">
                {/* Instagram SVG */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center">
                <LogoLinkedin width="16" height="16" />
              </a>
            </div>
            <p className="text-xs text-brand-bg/60">
              © {new Date().getFullYear()} Rooted Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
