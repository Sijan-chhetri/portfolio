const experiences = [
  {
    period: "2023 — Present",
    title: "Full-Stack Software Engineer",
    desc: "Building and maintaining production-grade web applications using Python, Django REST Framework, and React. Architecting scalable APIs, optimizing database queries, and leading front-end feature development for a SaaS platform.",
    label: "Tech Focus",
    detail: "Django REST Framework, React, PostgreSQL, Docker, AWS deployment.",
    reverse: false,
  },
  {
    period: "2022 — 2023",
    title: "Back-End Developer",
    desc: "Developed robust RESTful APIs with Django for multiple client projects. Worked closely with front-end teams to integrate APIs, improve system performance, and implement automated testing pipelines using pytest.",
    label: "Key Skills",
    detail: "Python, Django ORM, pytest, CI/CD pipelines, Redis caching.",
    reverse: true,
  },
  {
    period: "2021 — 2022",
    title: "Junior React Developer",
    desc: "Contributed to front-end development of responsive web applications using React and TypeScript. Built reusable component libraries, integrated third-party APIs, and collaborated in an agile team environment.",
    label: "Achievement",
    detail: "Delivered 3 client projects on schedule, improving team velocity by 30% through component standardization.",
    reverse: false,
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-stone-50/50 dark:bg-[#080e1a]">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Heading */}
        <div className="text-center mb-24">
          <span className="text-primary tracking-[0.3em] text-xs font-medium uppercase mb-4 block">
            Chronicle
          </span>
          <h2 className="font-display text-5xl italic text-slate-800 dark:text-[#f8f5f0]">
            Work Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 timeline-line -translate-x-1/2 opacity-30"></div>

          <div className="space-y-24 relative">
            {experiences.map((exp) => (
              <div
                key={exp.title}
                className={`flex flex-col ${exp.reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-0`}
              >
                {/* Text side */}
                <div
                  className={`w-full md:w-1/2 ${
                    exp.reverse
                      ? "md:pl-16 text-left"
                      : "md:pr-16 md:text-right"
                  }`}
                >
                  <span className="text-primary font-display italic text-lg mb-2 block">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-display mb-3 text-slate-800 dark:text-[#f8f5f0]">
                    {exp.title}
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                {/* Diamond dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-background-light dark:bg-background-dark border-2 border-primary rotate-45 z-10"></div>

                {/* Card side */}
                <div
                  className={`w-full md:w-1/2 ${
                    exp.reverse ? "md:pr-16 text-right" : "md:pl-16"
                  }`}
                >
                  <div className="p-6 luxury-border bg-stone-50/50 dark:bg-stone-900/50 inline-block text-left w-full">
                    <span className="text-xs tracking-widest uppercase text-stone-400">
                      {exp.label}
                    </span>
                    <p className="text-sm mt-2 italic font-serif text-slate-700 dark:text-slate-300">
                      {exp.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
