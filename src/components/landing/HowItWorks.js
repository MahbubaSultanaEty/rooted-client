"use client";

import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: "Plant the Seed",
    description: "Start your search by telling us your basic needs—location, budget, and property type.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80"
  },
  {
    id: 2,
    title: "Let Sage Nurture It",
    description: "Our AI assistant learns your preferences and finds hidden gems you might have missed.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80"
  },
  {
    id: 3,
    title: "Grow Roots",
    description: "Connect with verified agents and owners directly, and settle into your new home.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80"
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      
      {/* Decorative SVG */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-5 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="font-heading text-4xl font-bold text-brand-accent mb-6">The Roots of Your Search</h2>
          <p className="text-brand-text/70 text-lg">Finding a home should feel natural. We've simplified the journey into three organic steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent -z-10" />

          {steps.map((step, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              key={step.id} 
              className="flex flex-col items-center text-center group"
            >
              {/* Image Circle */}
              <div className="relative w-60 h-60 mb-8 rounded-full p-2 border border-brand-primary/20 bg-white/50 backdrop-blur-sm group-hover:border-brand-primary transition-colors duration-500">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-accent/20 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-primary text-white font-heading font-bold text-xl rounded-full flex items-center justify-center shadow-lg border-4 border-brand-bg">
                  {step.id}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-brand-accent mb-4 font-heading">{step.title}</h3>
              <p className="text-brand-text/70 max-w-xs text-lg leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
