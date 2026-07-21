import Link from 'next/link';
import { Search, Sparkles, MessageSquare, Phone, Home, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Search & Discover",
    description: "Use our smart search with filters for location, budget, type, and more. Browse curated listings with AI-generated summaries and tags.",
    icon: Search,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  },
  {
    id: 2,
    title: "Sage Recommends",
    description: "Sage tracks your browsing patterns and learns what you truly want. It then ranks properties with personalized reasoning — no generic suggestions.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    id: 3,
    title: "Chat & Refine",
    description: "Have a natural conversation with Sage. Describe your dream home in plain language, and watch Sage curate matches in real time.",
    icon: MessageSquare,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80",
  },
  {
    id: 4,
    title: "Contact & Schedule",
    description: "Found the one? Reach out to the listing agent directly through Rooted. Schedule visits, ask questions, negotiate — all in one place.",
    icon: Phone,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    id: 5,
    title: "Move In 🏠",
    description: "Settle into your new home with confidence. You found it through intelligence, not luck. Welcome home — you're officially rooted.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      
      {/* Page Header */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-accent/5" />
        <div className="relative z-10">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-text mb-4">Your Journey Home</h1>
          <p className="text-xl text-brand-text/70 max-w-2xl mx-auto">From the first search to your new front door — here's how Rooted guides you every step of the way.</p>
        </div>
      </section>

      {/* Steps — Alternating Layout */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {steps.map((step, idx) => (
            <div key={step.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
              
              {/* Image */}
              <div className="flex-1 relative">
                <div className="relative h-80 lg:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/30 to-transparent" />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-5 -left-5 w-14 h-14 bg-brand-primary text-white font-heading text-2xl font-bold rounded-2xl flex items-center justify-center shadow-lg border-4 border-brand-bg">
                  {step.id}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-4">
                  <step.icon className="w-4 h-4" />
                  Step {step.id}
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4">{step.title}</h2>
                <p className="text-lg text-brand-text/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-text mb-4">Ready to begin?</h2>
        <p className="text-brand-text/70 text-lg mb-8 max-w-md mx-auto">Your perfect home is just a few clicks away.</p>
        <Link href="/explore" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-md">
          Find Your Match on Explore <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
