"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import {
  Users, Home, BarChart2, Trash2, ShieldCheck, LoaderCircle, TrendingUp, Eye,
} from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];

/* ──────────────────────────────────────────────────── */
/* Stat card */
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="glass-card p-6 bg-white/80 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold font-heading text-brand-text">{value ?? '—'}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

/* ──────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [properties, setProperties] = useState([]);
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session)                         { router.push('/login'); return; }
    if (session.user?.role !== 'admin')   { router.push('/'); toast.error('Admin access only'); return; }
    fetchAll();
  }, [session, isPending]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [propRes, userRes] = await Promise.all([
        fetch(`${API}/api/properties/admin/all`, { credentials: 'include' }),
        fetch(`${API}/api/users`,                 { credentials: 'include' }),
      ]);
      const propData = await propRes.json();
      const userData = await userRes.json();
      if (propRes.ok) setProperties(propData.data || []);
      if (userRes.ok) setUsers(userData.data || []);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!confirm('Delete this property?')) return;
    try {
      const res  = await fetch(`${API}/api/properties/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProperties(prev => prev.filter(p => p._id !== id));
      toast.success('Property deleted');
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      const res  = await fetch(`${API}/api/users/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(prev => prev.filter(u => u._id !== id && u.id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  /* ── Chart data ── */
  const typeCount = properties.reduce((acc, p) => {
    acc[p.propertyType] = (acc[p.propertyType] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

  const cityCount = properties.reduce((acc, p) => {
    const city = p.location?.city || 'Unknown';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([city, count]) => ({ city, count }));

  const listingCount = properties.reduce((acc, p) => {
    const t = p.listingType || 'unknown';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  const listingBarData = Object.entries(listingCount).map(([name, count]) => ({ name, count }));

  const activeCount = properties.filter(p => p.status === 'active').length;

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-brand-primary" />
          <div>
            <h1 className="font-heading text-3xl font-bold text-brand-text">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Full platform overview and management</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Home}      label="Total Properties"  value={properties.length} color="bg-brand-primary" />
          <StatCard icon={TrendingUp} label="Active Listings"  value={activeCount}       color="bg-green-500" />
          <StatCard icon={Users}     label="Registered Users"  value={users.length}      color="bg-brand-accent" />
          <StatCard icon={BarChart2} label="Property Types"    value={Object.keys(typeCount).length} color="bg-purple-500" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Bar: Properties by City */}
          <div className="lg:col-span-2 glass-card p-6 bg-white/80">
            <h2 className="font-heading font-bold text-brand-text mb-4">Properties by City</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie: Property Types */}
          <div className="glass-card p-6 bg-white/80">
            <h2 className="font-heading font-bold text-brand-text mb-4">By Property Type</h2>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Listing Type Bar */}
        <div className="glass-card p-6 bg-white/80 mb-8">
          <h2 className="font-heading font-bold text-brand-text mb-4">Sale vs Rent Distribution</h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={listingBarData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 13 }} width={60} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Properties Table */}
        <div className="glass-card bg-white/80 mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-heading font-bold text-brand-text">All Properties ({properties.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">#</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Title</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Type</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">City</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Price</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Listed By</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Status</th>
                  <th className="text-right px-6 py-3 text-gray-500 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p, i) => (
                  <tr key={p._id} className="border-b border-gray-50 hover:bg-brand-bg/40 transition-colors">
                    <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-3 font-semibold text-brand-text max-w-[180px] truncate">{p.title}</td>
                    <td className="px-6 py-3 capitalize text-gray-600">{p.propertyType}</td>
                    <td className="px-6 py-3 text-gray-600">{p.location?.city || '—'}</td>
                    <td className="px-6 py-3 text-brand-primary font-semibold">৳{p.price?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-600 max-w-[140px] truncate">{p.listedBy?.name || p.listedBy?.email || '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize
                        ${p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <a href={`/property/${p.slug}`} target="_blank" rel="noreferrer" className="p-1.5 text-gray-400 hover:text-brand-primary transition-colors">
                          <Eye className="w-4 h-4" />
                        </a>
                        <button onClick={() => deleteProperty(p._id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {properties.length === 0 && (
              <p className="text-center text-gray-400 py-8">No properties found.</p>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-card bg-white/80 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-brand-text">All Users ({users.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">#</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Name</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Email</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Role</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-semibold">Joined</th>
                  <th className="text-right px-6 py-3 text-gray-500 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id || u.id} className="border-b border-gray-50 hover:bg-brand-bg/40 transition-colors">
                    <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-6 py-3 font-semibold text-brand-text">{u.name || '—'}</td>
                    <td className="px-6 py-3 text-gray-600">{u.email}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize
                        ${u.role === 'admin' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : '—'}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => deleteUser(u._id || u.id)}
                        disabled={u.id === session?.user?.id}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30"
                        title={u.id === session?.user?.id ? "Can't delete yourself" : 'Delete user'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center text-gray-400 py-8">No users found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
