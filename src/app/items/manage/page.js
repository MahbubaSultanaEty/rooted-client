"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { PlusCircle, Trash2, Eye, Pencil, LayoutGrid, LayoutList, LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const STATUS_STYLES = {
  active:  'bg-green-100 text-green-700',
  draft:   'bg-gray-100  text-gray-600',
  sold:    'bg-red-100   text-red-600',
  rented:  'bg-blue-100  text-blue-600',
};

export default function ManageListingsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [listings, setListings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [viewMode, setViewMode]   = useState('table');
  const [deleteId, setDeleteId]   = useState(null);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session) { router.push('/login'); return; }
    fetchListings();
  }, [session, isPending]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/properties/manage/me`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setListings(data.data || []);
    } catch (err) {
      toast.error(err.message || 'Could not load your listings');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/properties/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setListings(prev => prev.filter(l => l._id !== deleteId));
      toast.success('Property deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Could not delete property');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <LoaderCircle className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-brand-text">Your Listings</h1>
            <p className="text-gray-500 mt-1">{listings.length} properties listed</p>
          </div>
          <div className="flex gap-3">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setViewMode('table')} className={`p-2.5 ${viewMode === 'table' ? 'bg-brand-primary text-white' : 'bg-white text-gray-500'}`}>
                <LayoutList className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-brand-primary text-white' : 'bg-white text-gray-500'}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <Link href="/items/add" className="px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-xl flex items-center gap-2 hover:bg-brand-primary/90 transition-all shadow-md">
              <PlusCircle className="w-4 h-4" /> Add New
            </Link>
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-24 glass-card bg-white/80">
            <p className="text-5xl mb-4">🏠</p>
            <h2 className="font-heading text-2xl font-bold text-brand-text mb-2">No listings yet</h2>
            <p className="text-gray-500 mb-6">Start by adding your first property!</p>
            <Link href="/items/add" className="px-6 py-3 bg-brand-primary text-white rounded-xl font-semibold hover:bg-brand-primary/90 transition-all">
              + Add a Property
            </Link>
          </div>
        ) : viewMode === 'table' ? (
          <div className="glass-card overflow-hidden bg-white/80">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">#</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Image</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Price</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((item, idx) => (
                    <tr key={item._id} className="border-b border-gray-50 hover:bg-brand-bg/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <img
                          src={item.images?.[0] || 'https://placehold.co/80x56?text=No+Image'}
                          alt={item.title}
                          className="w-14 h-10 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-brand-text text-sm truncate max-w-[200px]">{item.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{item.propertyType}</p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-brand-primary text-sm">
                        ৳{item.price?.toLocaleString()}
                        {item.priceUnit === 'per_month' && <span className="text-gray-400 font-normal">/mo</span>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[item.status] || STATUS_STYLES.draft}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/property/${item.slug}`} className="p-2 text-gray-500 hover:text-brand-primary transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/items/edit/${item._id}`} className="p-2 text-gray-500 hover:text-brand-accent transition-colors" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => setDeleteId(item._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(item => (
              <div key={item._id} className="glass-card overflow-hidden bg-white/80 group relative">
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={item.images?.[0] || 'https://placehold.co/400x300?text=No+Image'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-brand-text mb-1 truncate">{item.title}</h3>
                  <p className="font-bold text-brand-primary">৳{item.price?.toLocaleString()}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[item.status] || STATUS_STYLES.draft}`}>
                      {item.status}
                    </span>
                    <div className="flex gap-2">
                      <Link href={`/property/${item.slug}`} className="p-2 text-gray-500 hover:text-brand-primary"><Eye className="w-4 h-4" /></Link>
                      <Link href={`/items/edit/${item._id}`} className="p-2 text-gray-500 hover:text-brand-accent"><Pencil className="w-4 h-4" /></Link>
                      <button onClick={() => setDeleteId(item._id)} className="p-2 text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-sm w-full bg-white text-center shadow-2xl">
              <Trash2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold text-brand-text mb-2">Delete Listing?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} disabled={deleting} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={deleting} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-60">
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
