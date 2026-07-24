"use client";

import Link from 'next/link';

const CITIES = [
  {
    name: 'Dhaka',
    properties: '12,500+',
    image: 'https://images.unsplash.com/photo-1590608897129-79da98d15969?w=800&q=80',
    colSpan: 'md:col-span-2 md:row-span-2'
  },
  {
    name: 'Chittagong',
    properties: '4,200+',
    image: 'https://images.unsplash.com/photo-1616190419596-e2839e7380d7?w=800&q=80',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    name: 'Sylhet',
    properties: '2,100+',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    colSpan: 'md:col-span-1 md:row-span-1'
  },
  {
    name: 'Rajshahi',
    properties: '1,800+',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    colSpan: 'md:col-span-2 md:row-span-1'
  }
];

export default function FeaturedCities() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-heading text-4xl font-bold text-brand-text mb-4">Explore by City</h2>
            <p className="text-brand-text/70 max-w-xl text-lg">
              Find your next home in the most popular cities across Bangladesh. From the bustling streets of Dhaka to the serene hills of Sylhet.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="text-brand-primary font-semibold hover:text-brand-accent transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            View all locations →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
          {CITIES.map((city) => (
            <Link 
              href={`/explore?city=${city.name}`} 
              key={city.name} 
              className={`relative rounded-2xl overflow-hidden group cursor-pointer ${city.colSpan}`}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
              <img 
                src={city.image} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="font-heading text-2xl font-bold text-white mb-1 drop-shadow-md">{city.name}</h3>
                <p className="text-white/90 text-sm font-medium drop-shadow">{city.properties} Properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
