import { useEffect } from "react";
import profileImg from "../assets/profile.png";
import cvFile from "../assets/cv.pdf";
import { SOCIAL_LINKS } from "../socialLinks";

export default function HeroSection() {
  useEffect(() => {
    const amount = 20;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      const y = (e.clientY / window.innerHeight - 0.5) * amount;
      const portrait = document.getElementById("hero-portrait");
      if (portrait) portrait.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f8f5f0] dark:bg-background-dark"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="dust-particles"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-float"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: "-3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 items-center relative h-full">
        {/* Portrait */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-4xl opacity-0 animate-[fadeInUp_1.5s_ease-out_forwards]">
            <div className="relative portrait-glow flex justify-center">
              <img
                id="hero-portrait"
                alt="Sijan Katuwal Chhetri"
                className="h-[85vh] w-auto object-contain opacity-90 mix-blend-luminosity grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                src={profileImg}
              />
              <div className="absolute inset-0 hero-gradient"></div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 mt-20">
          <div className="space-y-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
            <span className="uppercase font-serif text-primary text-xs letter-spacing-widest block mb-4">
              Full-Stack Software Engineer
            </span>
            <h1 className="text-5xl md:text-8xl font-display italic tracking-tight text-slate-900 dark:text-[#f8f5f0]">
              Sijan Katuwal Chhetri
            </h1>
            <p className="text-sm md:text-lg font-light tracking-[0.4em] uppercase text-slate-400">
              Python <span className="text-primary mx-2">•</span> Django{" "}
              <span className="text-primary mx-2">•</span> React
            </p>
          </div>

          <div className="max-w-xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
            <p className="text-slate-400 leading-relaxed font-light text-sm md:text-base px-6">
              Building robust, scalable web applications with clean architecture
              and modern tech. Passionate about crafting seamless user experiences
              backed by powerful back-end systems.
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 pt-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards]">
            <a
              href="#projects"
              className="group relative px-10 py-4 bg-primary text-background-dark font-serif uppercase text-xs tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a
              href="#contact"
              className="px-10 py-4 border border-primary/40 text-primary font-serif uppercase text-xs tracking-widest hover:bg-primary/5 transition-all duration-300"
            >
              Hire Me
            </a>
            <a
              href={cvFile}
              target="_blank"
              rel="noreferrer"
              download="Sijan_Katuwal_Chhetri_CV.pdf"
              className="px-10 py-4 border border-primary text-primary font-serif uppercase text-xs tracking-widest hover:bg-primary hover:text-background-dark transition-all duration-300 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.4em] text-primary/60">Scroll</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-primary via-primary/60 to-primary/0 animate-bounce"></div>
        </div>
      </div>

      {/* Left side labels */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 z-20 opacity-30">
        <div className="flex flex-col space-y-24 items-center">
          {["Python", "Django", "React"].map((w) => (
            <span key={w} className="text-[10px] uppercase tracking-[1em] text-slate-700 dark:text-[#f8f5f0] -rotate-90">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Right side social icons */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-8 items-center">
          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-primary/40 hover:text-primary hover:scale-125 transition-all duration-300"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="text-primary/40 hover:text-primary hover:scale-125 transition-all duration-300"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-primary/40 hover:text-primary hover:scale-125 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Mail */}
          <a
            href="#contact"
            className="text-primary/40 hover:text-primary hover:scale-125 transition-all duration-300"
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
