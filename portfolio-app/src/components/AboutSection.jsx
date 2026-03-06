import profileImg from "../assets/profile.png";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Portrait */}
        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-4 border border-primary/20 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
          <img
            alt="Sijan Katuwal Chhetri"
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 relative z-10 shadow-2xl"
            src={profileImg}
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 -z-0"></div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7 flex flex-col justify-center h-full pt-8 lg:pt-0">
          <span className="text-primary tracking-[0.3em] text-xs font-medium uppercase mb-4 block">
            The Developer
          </span>
          <h2 className="font-display text-5xl md:text-6xl mb-8 leading-tight italic text-slate-800 dark:text-[#f8f5f0]">
            Crafting Scalable Systems &amp;{" "}
            <span className="block font-normal not-italic">
              Elegant Interfaces.
            </span>
          </h2>
          <div className="space-y-6 text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-light">
            <p>
              I'm a full-stack software engineer with a deep focus on Python and
              Django for back-end development, and React for building dynamic,
              responsive front-end experiences. I care deeply about clean code,
              solid architecture, and delivering products that are as performant
              as they are intuitive.
            </p>
            <p>
              From designing RESTful APIs and database schemas to building seamless
              UI components, I bring a holistic approach to every project — bridging
              the gap between server-side logic and user-facing experience with
              precision and care.
            </p>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-3 mt-10">
            {["Python", "Django", "React", "REST APIs", "PostgreSQL", "Docker", "Git", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 border border-primary/30 text-[10px] uppercase tracking-widest text-primary font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Skill grid */}
          <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-stone-200 dark:border-stone-800">
            {[
              { icon: "terminal", title: "Back-End Dev", sub: "Python · Django · APIs" },
              { icon: "web", title: "Front-End Dev", sub: "React · TypeScript · CSS" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {item.icon}
                </span>
                <div>
                  <h4 className="font-display text-xl mb-1 text-slate-800 dark:text-[#f8f5f0]">
                    {item.title}
                  </h4>
                  <p className="text-sm font-light text-stone-500 uppercase tracking-widest">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
