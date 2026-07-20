export default function Stats() {
  const stats = [
    { label: "Homes Listed", value: "1,200+" },
    { label: "Cities Covered", value: "15" },
    { label: "Happy Roots", value: "3,200+" },
    { label: "Average Rating", value: "4.8/5" },
  ];

  return (
    <section className="py-16 bg-brand-primary text-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
          {stats.map((stat, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'border-l border-white/10 md:border-l' : 'border-l-0 md:border-l'}`}>
              <span className="font-heading text-4xl md:text-5xl font-bold text-brand-accent mb-2 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-widest text-brand-bg/70 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
