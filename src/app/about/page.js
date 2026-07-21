import Link from 'next/link';
import { Leaf, Heart, Users, Target, ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Mahbuba Sultana Ety',
    role: 'Founder & Developer',
    bio: 'Full-stack developer passionate about building AI-powered solutions for real-world problems.',
    image: 'https://i.ibb.co/ymk7s4ht/github-profile-pic.jpg',
  },
  {
    name: 'Sage AI',
    role: 'AI Home Guide',
    bio: 'Powered by Groq\'s Llama 3.3 70B, Sage understands natural language to find your perfect match.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=80',
  },
  {
    name: 'The Community',
    role: 'Agents & Users',
    bio: 'A growing network of verified agents and happy homeowners who make Rooted possible.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      
      {/* Hero Statement */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-brand-primary/5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-text mb-6 leading-tight">
            We believe everyone deserves to feel <span className="text-brand-primary italic">rooted</span>
          </h1>
          <p className="text-xl text-brand-text/70 max-w-2xl mx-auto">
            Rooted is more than a platform — it's a philosophy. Home isn't just four walls; it's where you grow.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-accent mb-6">Our Story</h2>
              <p className="text-brand-text/70 text-lg leading-relaxed mb-6">
                Rooted was born out of frustration with generic, impersonal property platforms. We wanted to build something that truly understands people — their lifestyle, their needs, their dreams.
              </p>
              <p className="text-brand-text/70 text-lg leading-relaxed mb-8">
                By combining modern full-stack engineering with AI-powered intelligence, we created a platform where finding a home feels less like a chore and more like a conversation.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Heart, label: 'Human First' },
                  { icon: Target, label: 'AI Precision' },
                  { icon: Users, label: 'Community Trust' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold text-brand-text">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="About us" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-brand-accent text-center mb-16">The People Behind Rooted</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="glass-card p-8 bg-white/70 text-center group hover-lift">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 border-4 border-brand-primary/20 group-hover:border-brand-primary transition-colors">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-text mb-1">{member.name}</h3>
                <p className="text-brand-primary font-semibold text-sm mb-4">{member.role}</p>
                <p className="text-brand-text/70 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="font-heading text-3xl font-bold text-brand-text mb-4">Ready to find your roots?</h2>
        <Link href="/explore" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-md">
          Start Your Search <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
