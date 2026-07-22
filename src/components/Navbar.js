"use client";

import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { LogOut, PlusCircle, User as UserIcon, Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully!');
          setTimeout(() => { window.location.href = '/'; }, 500);
        },
      },
    });
  };

  const isAdmin = session?.user?.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-brand-primary tracking-tight">
              Rooted
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 font-medium text-brand-text">
            <Link href="/explore" className="hover:text-brand-accent transition-colors">Explore</Link>
            <Link href="/about" className="hover:text-brand-accent transition-colors">About</Link>
            <Link href="/how-it-works" className="hover:text-brand-accent transition-colors">How It Works</Link>
          </div>

          {/* Auth / User Section */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <Link href="/items/add" className="flex items-center gap-1 text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors">
                  <PlusCircle className="w-4 h-4" /> Add Property
                </Link>
                <Link href="/items/manage" className="text-sm font-semibold text-brand-text hover:text-brand-accent transition-colors">
                  My Listings
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                    <Shield className="w-4 h-4" /> Dashboard
                  </Link>
                )}
                
                <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                  <Link href="/profile" className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden hover:ring-2 ring-brand-primary/30 transition-all">
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-4 h-4 text-brand-primary" />
                    )}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-brand-text hover:text-brand-accent transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-full bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 hover:-translate-y-0.5 transition-all shadow-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-brand-primary p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--background)] border-b border-brand-primary/10">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col font-medium text-brand-text">
            <Link href="/explore" onClick={toggleMenu} className="block py-2">Explore</Link>
            <Link href="/about" onClick={toggleMenu} className="block py-2">About</Link>
            <Link href="/how-it-works" onClick={toggleMenu} className="block py-2">How It Works</Link>
            
            {session ? (
              <>
                <Link href="/items/add" onClick={toggleMenu} className="block py-2 text-brand-primary font-semibold">Add Property</Link>
                <Link href="/items/manage" onClick={toggleMenu} className="block py-2">My Listings</Link>
                <Link href="/profile" onClick={toggleMenu} className="block py-2">Profile</Link>
                {isAdmin && (
                  <Link href="/admin" onClick={toggleMenu} className="block py-2 text-amber-600 font-semibold">Admin Dashboard</Link>
                )}
                <button 
                  onClick={() => { toggleMenu(); handleLogout(); }}
                  className="block py-2 text-red-500 text-left w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/login" onClick={toggleMenu} className="block py-2 text-center border border-brand-primary rounded-full text-brand-primary">
                  Login
                </Link>
                <Link href="/register" onClick={toggleMenu} className="block py-2 text-center bg-brand-primary rounded-full text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
