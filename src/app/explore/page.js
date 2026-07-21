"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import SkeletonCard from '@/components/SkeletonCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Most Viewed', value: 'views' },
  { label: 'Top Rated', value: 'rating' },
];

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'office', 'plot', 'shop'];
const CITIES = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal'];
const BEDROOMS = [1, 2, 3, 4, '5+'];

// Mock data for demonstration
const MOCK_PROPERTIES = [
  {
    _id: '1', title: 'Sunny 2-Bed with Lake View', slug: 'sunny-2-bed-lake-view',
    price: 45000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { area: 'Gulshan 2', city: 'Dhaka' },
    specs: { bedrooms: 2, size: 1200 },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'],
  },
  {
    _id: '2', title: 'Modern Studio in Banani', slug: 'modern-studio-banani',
    price: 25000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { area: 'Banani', city: 'Dhaka' },
    specs: { bedrooms: 1, size: 650 },
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'],
  },
  {
    _id: '3', title: 'Spacious Villa with Garden', slug: 'spacious-villa-garden',
    price: 15000000, priceUnit: 'total', listingType: 'sale', propertyType: 'villa',
    location: { area: 'Uttara', city: 'Dhaka' },
    specs: { bedrooms: 4, size: 3200 },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80'],
  },
  {
    _id: '4', title: 'Corner Office Space — Prime', slug: 'corner-office-prime',
    price: 60000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'office',
    location: { area: 'Motijheel', city: 'Dhaka' },
    specs: { bedrooms: 0, size: 1800 },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'],
  },
  {
    _id: '5', title: 'Cozy Family Apartment in Dhanmondi', slug: 'cozy-family-dhanmondi',
    price: 35000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { area: 'Dhanmondi', city: 'Dhaka' },
    specs: { bedrooms: 3, size: 1500 },
    images: ['https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=600&q=80'],
  },
  {
    _id: '6', title: 'Luxury Penthouse with Rooftop', slug: 'luxury-penthouse-rooftop',
    price: 85000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment',
    location: { area: 'Gulshan 1', city: 'Dhaka' },
    specs: { bedrooms: 3, size: 2400 },
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'],
  },
  {
    _id: '7', title: 'Commercial Shop in Gazipur', slug: 'commercial-shop-gazipur',
    price: 18000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'shop',
    location: { area: 'Tongi', city: 'Dhaka' },
    specs: { bedrooms: 0, size: 400 },
    images: ['https://images.unsplash.com/photo-1604014237800-1c9102c19b4a?w=600&q=80'],
  },
  {
    _id: '8', title: 'New Build Plot in Purbachal', slug: 'new-build-plot-purbachal',
    price: 5000000, priceUnit: 'total', listingType: 'sale', propertyType: 'plot',
    location: { area: 'Purbachal', city: 'Dhaka' },
    specs: { bedrooms: 0, size: 5000 },
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'],
  },
];

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import SkeletonCard from '@/components/SkeletonCard';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const SORT_OPTIONS = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Price: Low–High', value: 'price' },
  { label: 'Price: High–Low', value: '-price' },
  { label: 'Most Viewed', value: '-stats.views' },
  { label: 'Top Rated', value: '-stats.avgRating' },
];

const PROPERTY_TYPES = ['apartment', 'house', 'villa', 'office', 'plot', 'shop'];
const CITIES = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal'];
const BEDROOMS = [1, 2, 3, 4, '5+'];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [page, setPage] = useState(1);
  const limit = 9;

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('type') || '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (filters.city) params.append('city', filters.city);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) {
      if (filters.bedrooms === '5+') {
        params.append('minBedrooms', '5');
      } else {
        params.append('bedrooms', filters.bedrooms);
      }
    }
    params.append('sort', sortBy);
    params.append('page', page);
    params.append('limit', limit);
    return params.toString();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['properties', filters, searchQuery, sortBy, page],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/properties?${buildQueryParams()}`);
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
    keepPreviousData: true
  });

  const properties = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset page on filter change
  };

  const clearFilters = () => {
    setFilters({ city: '', propertyType: '', minPrice: '', maxPrice: '', bedrooms: '' });
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Search Bar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 items-center">
            <div className="flex-1 flex items-center gap-3 bg-brand-bg rounded-xl px-4 py-3 border border-gray-100 focus-within:ring-2 ring-brand-primary/20">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, area, city..."
                className="bg-transparent border-none outline-none w-full text-brand-text placeholder-gray-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-all ${showFilters ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-200 text-brand-text hover:border-brand-primary'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-brand-text text-sm font-medium cursor-pointer hidden md:block"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          
          {/* Filter Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
            <div className="glass-card p-6 sticky top-40 bg-white/80">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-lg text-brand-text">Filters</h3>
                <button onClick={clearFilters} className="text-sm text-brand-primary font-semibold hover:underline">
                  Clear All
                </button>
              </div>

              {/* City */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-brand-text mb-2 block">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-3 py-2.5 bg-brand-bg border border-gray-100 rounded-lg text-sm cursor-pointer"
                >
                  <option value="">All Cities</option>
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-brand-text mb-2 block">Type</label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => handleFilterChange('propertyType', filters.propertyType === type ? '' : type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all border ${filters.propertyType === type ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-text border-gray-200 hover:border-brand-primary'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-brand-text mb-2 block">Price Range (৳)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e) => handleFilterChange('minPrice', e.target.value)} className="w-1/2 px-3 py-2.5 bg-brand-bg border border-gray-100 rounded-lg text-sm" />
                  <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e) => handleFilterChange('maxPrice', e.target.value)} className="w-1/2 px-3 py-2.5 bg-brand-bg border border-gray-100 rounded-lg text-sm" />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-brand-text mb-2 block">Bedrooms</label>
                <div className="flex gap-2">
                  {BEDROOMS.map(bed => (
                    <button
                      key={bed}
                      onClick={() => handleFilterChange('bedrooms', filters.bedrooms === bed ? '' : bed)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all border ${filters.bedrooms === bed ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-text border-gray-200 hover:border-brand-primary'}`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile: close button */}
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden w-full py-3 bg-brand-primary text-white font-semibold rounded-xl mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>

            {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-brand-text/70 text-sm font-medium">
                {isLoading ? 'Loading...' : `${pagination.total} properties found`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                : properties.map(prop => <PropertyCard key={prop._id} property={prop} />)
              }
            </div>

            {!isLoading && properties.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-bold text-gray-400">No properties found.</h3>
                <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-brand-text hover:border-brand-primary disabled:opacity-50"
                >
                  ← Prev
                </button>
                {Array.from({ length: pagination.pages }).map((_, idx) => {
                  const n = idx + 1;
                  return (
                    <button 
                      key={n} 
                      onClick={() => setPage(n)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold ${n === page ? 'bg-brand-primary text-white' : 'border border-gray-200 text-brand-text hover:border-brand-primary'}`}
                    >
                      {n}
                    </button>
                  );
                })}
                <button 
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-brand-text hover:border-brand-primary disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
