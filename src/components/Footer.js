import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-brand-accent" />
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
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-primary transition-colors">
                <Linkedin className="w-4 h-4" />
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
