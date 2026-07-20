import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Tanzim Hasan",
      role: "First-time Buyer",
      content: "Sage completely changed how I searched. Instead of endless scrolling, I just told it I wanted a quiet place near my office with good natural light. Found it in 2 days.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    {
      id: 2,
      name: "Sarah Rahman",
      role: "Property Investor",
      content: "The interface is beautiful, but the data is what keeps me here. The AI tags and neighborhood insights help me make decisions much faster.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    }
  ];

  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">Voices from the Grove</h2>
          <p className="text-brand-text/70 text-lg">Hear from people who found their perfect match.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card p-8 bg-white/60 relative">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-accent/20" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-brand-text text-lg italic mb-8 relative z-10">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-brand-primary">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
