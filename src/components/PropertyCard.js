"use client";

import Link from 'next/link';
import { Bookmark, MapPin, Bed, Maximize, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PropertyCard({ property, aiMatchScore = null }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setIsSaved(saved.some(p => p._id === property._id));
  }, [property._id]);

  const toggleSave = (e) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter(p => p._id !== property._id);
    } else {
      newSaved = [...saved, property];
    }
    localStorage.setItem('savedProperties', JSON.stringify(newSaved));
    setIsSaved(!isSaved);
    window.dispatchEvent(new Event('savedPropertiesUpdated'));
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const displayImage = property.images?.[0] || fallbackImage;

  return (
    <div className="glass-card hover-lift group overflow-hidden flex flex-col min-h-[360px] relative">
      
      {/* AI Match Badge */}
      {aiMatchScore && (
        <div className="absolute top-3 left-3 z-10 bg-brand-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {aiMatchScore}% Match
        </div>
      )}

      {/* Save Button */}
      <button 
        onClick={toggleSave}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-brand-primary transition-all shadow-sm"
      >
        <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
      </button>

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        <img 
          src={displayImage} 
          alt={property.title} 
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status Badge */}
        <div className="absolute bottom-3 left-3 bg-brand-primary/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider">
          For {property.listingType}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-heading font-bold text-lg text-brand-primary line-clamp-1">
            {property.title}
          </h3>
          <p className="font-bold text-brand-primary whitespace-nowrap">
            ৳{property.price.toLocaleString()}
            {property.priceUnit === 'per_month' && <span className="text-xs text-gray-500 font-normal">/mo</span>}
          </p>
        </div>
        
        <p className="flex items-center gap-1 text-sm text-gray-600 mb-4 line-clamp-1">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          {property.location?.area}, {property.location?.city}
        </p>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 mt-auto">
          {property.specs?.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.specs.bedrooms} Beds</span>
            </div>
          )}
          {property.specs?.size && (
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.specs.size} sqft</span>
            </div>
          )}
          <div className="text-xs px-2 py-1 bg-brand-primary/5 rounded-md capitalize font-medium">
            {property.propertyType}
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/property/${property.slug || property._id}`}
          className="w-full py-2.5 rounded-lg border border-brand-primary text-brand-primary text-center font-semibold text-sm hover:bg-brand-primary hover:text-white transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
