"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { User, Mail, ShieldCheck, LogOut, LoaderCircle, Home, CalendarDays, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState({ total: 0, active: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [savedProps, setSavedProps] = useState([]);

  useEffect(() => {
    if (isPending) return;
    if (!session) { router.push('/login'); return; }
    fetchStats();
  }, [session, isPending]);

  useEffect(() => {
    const loadSaved = () => {
      const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      setSavedProps(saved);
    };
    loadSaved();
    window.addEventListener('savedPropertiesUpdated', loadSaved);
    return () => window.removeEventListener('savedPropertiesUpdated', loadSaved);
  }, []);

  const fetchStats = async () => {
    try {
      const res  = await fetch(`${API}/api/properties/manage/me`, { credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        const props = data.data || [];
        setStats({
          total:  props.length,
          active: props.filter(p => p.status === 'active').length,
        });
      }
    } catch (_) {}
    finally { setStatsLoading(false); }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast.success('Logged out successfully 👋');
      router.push('/');
    } catch {
      toast.error('Logout failed');
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  const user = session?.user;
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div className="min-h-screen bg-brand-bg py-12">
      <div className="max-w-3xl mx-auto px-4">

        {/* Page Title */}
        <h1 className="font-heading text-3xl font-bold text-brand-text mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="glass-card p-8 bg-white/80 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 shadow-lg">
              {user?.image
                ? <img src={user.image} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
                : user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-2xl font-bold text-brand-text mb-1">{user?.name || 'Unknown User'}</h2>
              <div className="flex flex-col sm:flex-row gap-3 text-gray-500 text-sm mt-2">
                <span className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-4 h-4" /> {user?.email}
                </span>
                <span className="flex items-center justify-center sm:justify-start gap-1.5">
                  <CalendarDays className="w-4 h-4" /> Joined {joinedDate}
                </span>
              </div>
              {user?.role === 'admin' && (
                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass-card p-6 bg-white/80 text-center">
            <Home className="w-7 h-7 text-brand-primary mx-auto mb-2" />
            <p className="font-heading text-3xl font-bold text-brand-text">
              {statsLoading ? '—' : stats.total}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Listings</p>
          </div>
          <div className="glass-card p-6 bg-white/80 text-center">
            <ShieldCheck className="w-7 h-7 text-green-500 mx-auto mb-2" />
            <p className="font-heading text-3xl font-bold text-brand-text">
              {statsLoading ? '—' : stats.active}
            </p>
            <p className="text-sm text-gray-500 mt-1">Active Listings</p>
          </div>
        </div>

        {/* Actions */}
        <div className="glass-card p-6 bg-white/80 space-y-3">
          <h3 className="font-heading font-bold text-brand-text mb-4">Quick Actions</h3>

          <Link href="/items/manage" className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-gray-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group">
            <Home className="w-5 h-5 text-brand-primary" />
            <span className="font-semibold text-brand-text group-hover:text-brand-primary transition-colors">Manage My Listings</span>
          </Link>

          <Link href="/items/add" className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-gray-200 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all group">
            <User className="w-5 h-5 text-brand-accent" />
            <span className="font-semibold text-brand-text group-hover:text-brand-accent transition-colors">Add New Property</span>
          </Link>

          {user?.role === 'admin' && (
            <Link href="/admin" className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-brand-primary/30 bg-brand-primary/5 hover:bg-brand-primary/10 transition-all group">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              <span className="font-semibold text-brand-primary">Admin Dashboard</span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all font-semibold disabled:opacity-60"
          >
            <LogOut className="w-5 h-5" />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        {/* Saved Properties */}
        <div className="glass-card p-6 bg-white/80 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-5 h-5 text-brand-primary" />
            <h3 className="font-heading font-bold text-brand-text">Saved Properties</h3>
          </div>
          {savedProps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedProps.map(prop => <PropertyCard key={prop._id} property={prop} />)}
            </div>
          ) : (
            <div className="text-center py-6 bg-brand-bg rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm">You haven't saved any properties yet.</p>
              <Link href="/explore" className="text-brand-primary text-sm font-semibold hover:underline mt-2 inline-block">
                Explore Homes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
