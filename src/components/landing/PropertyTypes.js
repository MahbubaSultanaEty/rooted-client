import Link from 'next/link';

export default function PropertyTypes() {
  const types = [
    { 
      title: 'Apartments', 
      count: '850+', 
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      link: '/explore?type=apartment' 
    },
    { 
      title: 'Villas & Houses', 
      count: '120+', 
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      link: '/explore?type=house' 
    },
    { 
      title: 'Commercial', 
      count: '300+', 
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      link: '/explore?type=commercial' 
    },
    { 
      title: 'Ready to Move', 
      count: '540+', 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
      link: '/explore?status=ready' 
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl font-bold text-brand-accent mb-4">Branches We Cover</h2>
            <p className="text-brand-text/70 text-lg">Whatever space you need, we have a branch that fits. Explore our curated categories.</p>
          </div>
          <Link href="/explore" className="text-brand-primary font-bold hover:text-brand-accent transition-colors flex items-center gap-2">
            View all categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, idx) => (
            <Link key={idx} href={type.link} className="group relative h-80 rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 block">
              <img 
                src={type.image} 
                alt={type.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/90 via-brand-accent/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-heading font-bold text-white text-2xl mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {type.title}
                </h3>
                <p className="text-sm font-medium text-white/80 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {type.count} Listings
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
