"use client";

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchParams.get('search') || '');

  const limit = 6;

  // Derive state from URL
  const filters = {
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    sort: searchParams.get('sort') || '-createdAt',
    page: parseInt(searchParams.get('page')) || 1,
    search: searchParams.get('search') || ''
  };

  const updateQuery = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset page to 1 if filters change, unless page itself is being updated
    if (!('page' in updates)) {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key, value) => {
    updateQuery({ [key]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery({ search: localSearch });
  };

  const clearFilters = () => {
    router.push(pathname);
    setLocalSearch('');
  };

  const buildApiUrl = () => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
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
    params.append('sort', filters.sort);
    params.append('page', filters.page);
    params.append('limit', limit);
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/properties?${params.toString()}`;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const res = await fetch(buildApiUrl());
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
    keepPreviousData: true
  });

  const properties = data?.data || [];
  const pagination = data?.pagination || { total: 0, pages: 1 };

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Search Bar */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-3 items-center">
            <div className="flex-1 flex items-center gap-3 bg-brand-bg rounded-xl px-4 py-3 border border-gray-100 focus-within:ring-2 ring-brand-primary/20">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by title, area, city..."
                className="bg-transparent border-none outline-none w-full text-brand-text placeholder-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border font-semibold text-sm flex items-center gap-2 transition-all ${showFilters ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white border-gray-200 text-brand-text hover:border-brand-primary'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-brand-text text-sm font-medium cursor-pointer hidden md:block"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </form>
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
                  onClick={() => updateQuery({ page: Math.max(1, filters.page - 1) })}
                  disabled={filters.page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-brand-text hover:border-brand-primary disabled:opacity-50"
                >
                  ← Prev
                </button>
                {Array.from({ length: pagination.pages }).map((_, idx) => {
                  const n = idx + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => updateQuery({ page: n })}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold ${n === filters.page ? 'bg-brand-primary text-white' : 'border border-gray-200 text-brand-text hover:border-brand-primary'}`}
                    >
                      {n}
                    </button>
                  );
                })}
                <button
                  onClick={() => updateQuery({ page: Math.min(pagination.pages, filters.page + 1) })}
                  disabled={filters.page === pagination.pages}
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

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-bg" />}>
      <ExploreContent />
    </Suspense>
  );
}