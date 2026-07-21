"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { MapPin, Bed, Bath, Maximize, CalendarDays, Compass, Car, Star, Send, Leaf, ChevronLeft, Bookmark } from 'lucide-react';

// Mock property detail
const MOCK_PROPERTY = {
  _id: '1',
  title: 'Sunny 2-Bed Apartment with Lake View',
  slug: 'sunny-2-bed-lake-view',
  shortDescription: 'A beautifully designed apartment overlooking Gulshan Lake with modern amenities.',
  description: 'This stunning 2-bedroom apartment sits on the 12th floor of a premium residential tower in Gulshan 2, offering breathtaking views of Gulshan Lake. The spacious living area features floor-to-ceiling windows that flood the space with natural light. The modern kitchen comes fully equipped with premium appliances. Both bedrooms are generously sized with built-in closets, and the master bedroom includes an en-suite bathroom. Building amenities include a rooftop pool, fitness center, and 24/7 security.',
  price: 45000,
  priceUnit: 'per_month',
  isNegotiable: true,
  listingType: 'rent',
  propertyType: 'apartment',
  status: 'active',
  location: {
    address: 'Tower 7, Road 35, Gulshan 2',
    area: 'Gulshan 2',
    city: 'Dhaka',
    division: 'Dhaka',
    country: 'Bangladesh',
  },
  specs: {
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    floorNumber: 12,
    parkingSpots: 1,
    yearBuilt: 2022,
    furnishing: 'semi-furnished',
    facing: 'south',
  },
  amenities: {
    lift: true, generator: true, security: true, cctv: true,
    gym: true, pool: true, garden: false, rooftopAccess: true,
    gasLine: true, waterSupply: true, internetReady: true, petFriendly: true,
  },
  images: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=600&q=80',
  ],
  aiTags: ['Lake View', 'Pet Friendly', 'Modern', 'Sunny'],
  aiSummary: 'A premium 2-bedroom apartment with stunning lake views, modern design, and top-tier building amenities including pool and gym.',
  stats: { views: 342, saves: 28, avgRating: 4.6, reviewCount: 12 },
  listedBy: { name: 'Agent Rahman' },
};

const MOCK_REVIEWS = [
  { _id: 'r1', userId: { name: 'Arif Mahmud' }, rating: 5, title: 'Excellent location', body: 'Perfect for families. The lake view is absolutely breathtaking, especially during sunset.', createdAt: '2026-06-15' },
  { _id: 'r2', userId: { name: 'Nadia Islam' }, rating: 4, title: 'Great value', body: 'Good apartment overall. The gym and pool are well maintained. Parking can be tight sometimes.', createdAt: '2026-05-20' },
];

const MOCK_RELATED = [
  { _id: '2', title: 'Modern Studio in Banani', slug: 'modern-studio-banani', price: 25000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment', location: { area: 'Banani', city: 'Dhaka' }, specs: { bedrooms: 1, size: 650 }, images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80'] },
  { _id: '5', title: 'Cozy Family Apartment', slug: 'cozy-family-dhanmondi', price: 35000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment', location: { area: 'Dhanmondi', city: 'Dhaka' }, specs: { bedrooms: 3, size: 1500 }, images: ['https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?w=600&q=80'] },
  { _id: '6', title: 'Luxury Penthouse', slug: 'luxury-penthouse-rooftop', price: 85000, priceUnit: 'per_month', listingType: 'rent', propertyType: 'apartment', location: { area: 'Gulshan 1', city: 'Dhaka' }, specs: { bedrooms: 3, size: 2400 }, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80'] },
];

export default function PropertyDetailPage() {
  const params = useParams();
  const property = MOCK_PROPERTY;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const amenityList = Object.entries(property.amenities).filter(([, v]) => v).map(([k]) => k);

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-primary">Home</Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-brand-primary">Explore</Link>
          <span>/</span>
          <span className="text-brand-text font-medium truncate">{property.title}</span>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
            <img 
              src={property.images[selectedImage]} 
              alt={property.title} 
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.aiTags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-brand-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">{tag}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx + 1)}
                className={`relative h-36 lg:h-[140px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all bg-gray-200 ${selectedImage === idx + 1 ? 'border-brand-primary shadow-lg' : 'border-transparent hover:border-brand-primary/50'}`}
              >
                <img 
                  src={img} 
                  alt={`View ${idx + 2}`} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'; }}
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left — Main Details */}
          <div className="flex-1">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-3">{property.title}</h1>
            <p className="flex items-center gap-2 text-gray-500 text-lg mb-6">
              <MapPin className="w-5 h-5 text-brand-primary" />
              {property.location.address}, {property.location.city}
            </p>

            {/* AI Summary */}
            {property.aiSummary && (
              <div className="glass-card p-5 mb-8 bg-brand-primary/5 border-brand-primary/20">
                <div className="flex items-center gap-2 mb-2 text-brand-primary">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Sage's Take</span>
                </div>
                <p className="text-brand-text/80 leading-relaxed">{property.aiSummary}</p>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-brand-text mb-4">About This Property</h2>
              <p className="text-brand-text/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Specs Table */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-brand-text mb-4">Key Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Bed, label: 'Bedrooms', value: property.specs.bedrooms },
                  { icon: Bath, label: 'Bathrooms', value: property.specs.bathrooms },
                  { icon: Maximize, label: 'Area', value: `${property.specs.size} sqft` },
                  { icon: CalendarDays, label: 'Year Built', value: property.specs.yearBuilt },
                  { icon: Compass, label: 'Facing', value: property.specs.facing },
                  { icon: Car, label: 'Parking', value: `${property.specs.parkingSpots} spot(s)` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <item.icon className="w-5 h-5 text-brand-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-medium">{item.label}</p>
                      <p className="font-semibold text-brand-text capitalize">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-brand-text mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                {amenityList.map((a, i) => (
                  <span key={i} className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm font-medium text-brand-text capitalize">
                    ✓ {a.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-bold text-brand-text">
                  Reviews ({property.stats.reviewCount})
                </h2>
                <div className="flex items-center gap-1 text-brand-primary font-bold">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  {property.stats.avgRating}
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {MOCK_REVIEWS.map(review => (
                  <div key={review._id} className="glass-card p-5 bg-white/70">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-brand-text">{review.userId.name}</h4>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.createdAt}</span>
                    </div>
                    <h5 className="font-semibold text-brand-text mb-1">{review.title}</h5>
                    <p className="text-brand-text/70 text-sm">{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Sticky Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="glass-card p-6 sticky top-24 bg-white/80 shadow-xl">
              <p className="font-heading text-3xl font-bold text-brand-primary mb-1">
                ৳{property.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {property.priceUnit === 'per_month' ? 'per month' : 'total'} {property.isNegotiable && <span className="text-brand-primary font-semibold">· Negotiable</span>}
              </p>

              <div className="space-y-3 mb-6">
                <button className="w-full py-3.5 bg-brand-accent text-white font-bold rounded-xl hover:bg-brand-accent/90 transition-all shadow-md flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Contact Agent
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full py-3.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 border ${isSaved ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-text border-gray-200 hover:border-brand-primary'}`}
                >
                  <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
                  {isSaved ? 'Saved' : 'Save Property'}
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 mb-2">Listed by</p>
                <p className="font-bold text-brand-text">{property.listedBy.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-brand-text mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_RELATED.map(prop => <PropertyCard key={prop._id} property={prop} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
