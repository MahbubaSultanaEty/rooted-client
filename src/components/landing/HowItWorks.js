import { Search, Sparkles, Home } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Plant the Seed",
    description: "Start your search by telling us your basic needs—location, budget, and property type.",
    icon: Search,
  },
  {
    id: 2,
    title: "Let Sage Nurture It",
    description: "Our AI assistant learns your preferences and finds hidden gems you might have missed.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Grow Roots",
    description: "Connect with verified agents and owners directly, and settle into your new home.",
    icon: Home,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">The Roots of Your Search</h2>
          <p className="text-brand-text/70 text-lg">Finding a home should feel natural. We've simplified the journey into three organic steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-bg via-brand-accent/30 to-brand-bg -z-10" />

          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center relative group">
              <div className="w-24 h-24 bg-brand-bg rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-accent/10 group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-300">
                <step.icon className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-3 font-heading">{step.id}. {step.title}</h3>
              <p className="text-brand-text/70 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
