import { Building2, Home, Store, Key } from 'lucide-react';
import Link from 'next/link';

export default function PropertyTypes() {
  const types = [
    { title: 'Apartments', icon: Building2, count: '850+', bg: 'bg-blue-50', color: 'text-blue-600', link: '/explore?type=apartment' },
    { title: 'Villas & Houses', icon: Home, count: '120+', bg: 'bg-green-50', color: 'text-green-600', link: '/explore?type=house' },
    { title: 'Commercial', icon: Store, count: '300+', bg: 'bg-orange-50', color: 'text-orange-600', link: '/explore?type=commercial' },
    { title: 'Ready to Move', icon: Key, count: '540+', bg: 'bg-purple-50', color: 'text-purple-600', link: '/explore?status=ready' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">Branches We Cover</h2>
          <p className="text-brand-text/70 text-lg">Whatever space you need, we have a branch that fits.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, idx) => (
            <Link key={idx} href={type.link} className="group">
              <div className="glass-card hover-lift p-8 flex flex-col items-center text-center bg-white h-full border border-gray-100 group-hover:border-brand-primary/30">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${type.bg} ${type.color}`}>
                  <type.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-brand-primary text-xl mb-2">{type.title}</h3>
                <p className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">{type.count} Listings</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
