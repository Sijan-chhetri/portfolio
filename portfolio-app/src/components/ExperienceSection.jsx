const experiences = [
  {
    period: "Dec 2025 — Present",
    company: "Elevate Tech",
    title: "Software Engineer",
    desc: "Designing and developing scalable web applications and APIs for production environments. Responsible for implementing backend services, optimizing database performance, and collaborating with front-end teams to deliver high-quality features for modern web platforms.",
    label: "Tech Focus",
    detail: "Python, Django REST Framework, React, PostgreSQL, Docker, AWS.",
    reverse: false,
  },
  {
    period: "Nov 2024 — Feb 2025",
    company: "Xdezo",
    title: "Software Engineering Intern",
    desc: "Completed a software engineering internship at Xdezo where I contributed to backend development and API integrations. Assisted in building RESTful services, debugging application issues, and collaborating with senior developers on real-world production systems.",
    label: "Key Skills",
    detail: "Python, Django, REST APIs, Git, Debugging, Agile development.",
    reverse: true,
  },
  {
    period: "2023 — 2024",
    company: "Self-Employed",
    title: "Freelance Web Developer",
    desc: "Worked with small businesses and startups to develop responsive websites and web applications. Delivered custom solutions including website design, backend integrations, and deployment while managing projects independently.",
    label: "Core Skills",
    detail: "React, JavaScript, Django, Website Development, Client Projects.",
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
                  <h3 className="text-2xl font-display mb-1 text-slate-800 dark:text-[#f8f5f0]">
                    {exp.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-stone-400 dark:text-stone-500 mb-3 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                    {exp.company}
                  </span>
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
