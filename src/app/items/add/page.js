"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'office', 'plot', 'shop'];
const LISTING_TYPES = ['sale', 'rent'];
const FURNISHING = ['furnished', 'semi-furnished', 'unfurnished'];

const AMENITY_LIST = [
  'lift', 'generator', 'security', 'cctv', 'gym', 'pool',
  'garden', 'rooftopAccess', 'gasLine', 'waterSupply', 'internetReady', 'petFriendly',
];

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [form, setForm] = useState({
    title: '', shortDescription: '', description: '',
    price: '', priceUnit: 'total', listingType: 'rent', propertyType: 'apartment',
    isNegotiable: false,
    bedrooms: '', bathrooms: '', size: '', furnishing: '', floorNumber: '', yearBuilt: '',
    address: '', area: '', city: '',
    imageUrl: '',
    amenities: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && AMENITY_LIST.includes(name)) {
      setForm(prev => ({ ...prev, amenities: { ...prev.amenities, [name]: checked } }));
    } else {
      setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleAIGenerate = async () => {
    if (!form.title) return;
    setAiLoading(true);
    // Simulated AI generation (will connect to Groq backend)
    setTimeout(() => {
      setForm(prev => ({
        ...prev,
        shortDescription: `A stunning ${prev.propertyType} in ${prev.city || 'Dhaka'} — modern design meets everyday comfort.`,
        description: `This beautifully designed ${prev.propertyType} titled "${prev.title}" offers an exceptional living experience. Located in a prime area, it features modern architecture with attention to natural lighting and ventilation. The space is thoughtfully planned to maximize comfort while maintaining an elegant aesthetic. Perfect for families or professionals seeking quality urban living.`,
      }));
      setAiLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Will connect to backend API
    setTimeout(() => {
      router.push('/items/manage');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-bg py-10">
      <div className="max-w-2xl mx-auto px-4">
        
        <h1 className="font-heading text-3xl font-bold text-brand-text mb-2">List a New Property</h1>
        <div className="text-sm text-gray-500 mb-8">
          <span>Home</span> {'>'} <span>My Listings</span> {'>'} <span className="text-brand-primary font-medium">Add New</span>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 bg-white/80 space-y-8">
          
          {/* Section A — Basic Info */}
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-text mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Title *</label>
                <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Modern 2-Bed Apartment in Gulshan" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Short Description *</label>
                <input name="shortDescription" value={form.shortDescription} onChange={handleChange} required placeholder="One-liner about this property" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Full Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={4} placeholder="Detailed description..." className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30 resize-none" />
              </div>
              <button
                type="button"
                onClick={handleAIGenerate}
                disabled={!form.title || aiLoading}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-accent/10 text-brand-accent font-semibold rounded-xl border border-brand-accent/30 hover:bg-brand-accent/20 transition-all disabled:opacity-50 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                {aiLoading ? 'Generating...' : '✨ Generate with AI'}
              </button>
            </div>
          </div>

          {/* Section B — Property Details */}
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-text mb-4 pb-2 border-b border-gray-100">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Price (৳) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Type *</label>
                <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl capitalize cursor-pointer">
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Listing *</label>
                <select name="listingType" value={form.listingType} onChange={handleChange} className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl capitalize cursor-pointer">
                  {LISTING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Bedrooms</label>
                <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Bathrooms</label>
                <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-text mb-1 block">Size (sqft)</label>
                <input name="size" type="number" value={form.size} onChange={handleChange} className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
            </div>
          </div>

          {/* Section C — Location */}
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-text mb-4 pb-2 border-b border-gray-100">Location</h2>
            <div className="space-y-4">
              <input name="address" value={form.address} onChange={handleChange} required placeholder="Full address" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              <div className="grid grid-cols-2 gap-4">
                <input name="area" value={form.area} onChange={handleChange} placeholder="Area (e.g. Gulshan 2)" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
                <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
              </div>
            </div>
          </div>

          {/* Section D — Media */}
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-text mb-4 pb-2 border-b border-gray-100">Media</h2>
            <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/30" />
            {form.imageUrl && (
              <div className="mt-3 w-32 h-24 rounded-lg overflow-hidden border border-gray-100">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {/* Section E — Amenities */}
          <div>
            <h2 className="font-heading text-lg font-bold text-brand-text mb-4 pb-2 border-b border-gray-100">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITY_LIST.map(a => (
                <label key={a} className="flex items-center gap-3 px-3 py-2.5 bg-brand-bg rounded-lg border border-gray-100 cursor-pointer hover:border-brand-primary/30 transition-colors">
                  <input type="checkbox" name={a} checked={form.amenities[a] || false} onChange={handleChange} className="accent-brand-primary w-4 h-4" />
                  <span className="text-sm capitalize text-brand-text">{a.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => router.back()} className="flex-1 py-3.5 border border-gray-200 text-brand-text font-semibold rounded-xl hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-3.5 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 shadow-md">
              {loading ? 'Submitting...' : 'Submit Listing →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
