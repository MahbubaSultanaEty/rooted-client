import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Stats from '@/components/landing/Stats';
import SagePreview from '@/components/landing/SagePreview';
import PropertyTypes from '@/components/landing/PropertyTypes';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <Stats />
      <SagePreview />
      <PropertyTypes />
      <Testimonials />
      <CTA />
    </div>
  );
}
