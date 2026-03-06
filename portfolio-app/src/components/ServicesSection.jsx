const services = [
  {
    icon: "terminal",
    title: "Back-End Development",
    desc: "Scalable, secure server-side applications built with Python and Django — from RESTful APIs to complex business logic and database design.",
  },
  {
    icon: "web",
    title: "Front-End Development",
    desc: "Responsive, performant user interfaces with React and TypeScript, designed for clarity, speed, and an exceptional user experience.",
  },
  {
    icon: "hub",
    title: "Full-Stack Integration",
    desc: "End-to-end feature delivery — connecting Django back-ends to React front-ends with clean API contracts, authentication, and deployment pipelines.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <span className="text-primary tracking-[0.3em] text-xs font-medium uppercase mb-4 block">
          What I Do
        </span>
        <h2 className="font-display text-4xl italic text-slate-800 dark:text-[#f8f5f0]">
          Services
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((s) => (
          <div
            key={s.title}
            className="group p-8 border-l border-stone-200 dark:border-stone-800 hover:border-primary transition-colors duration-500"
          >
            <span className="material-symbols-outlined text-stone-300 group-hover:text-primary text-4xl mb-6 transition-colors duration-500 block">
              {s.icon}
            </span>
            <h4 className="font-display text-2xl mb-4 text-slate-800 dark:text-[#f8f5f0]">
              {s.title}
            </h4>
            <p className="text-sm text-stone-500 leading-loose">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
