import { useEffect } from "react";
import profileImg from "../assets/profile.png";

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
      className="relative min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-background-dark">
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
            <h1 className="text-5xl md:text-8xl font-display italic tracking-tight text-[#f8f5f0]">
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
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-bounce"></div>
          <span className="text-[8px] uppercase tracking-[0.5em] text-primary/60 rotate-90 origin-left mt-8">
            Scroll
          </span>
        </div>
      </div>

      {/* Left side labels */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 z-20 opacity-30">
        <div className="flex flex-col space-y-24 items-center">
          {["Python", "Django", "React"].map((w) => (
            <span key={w} className="text-[10px] uppercase tracking-[1em] text-[#f8f5f0] -rotate-90">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Right side social icons */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20 opacity-30">
        <div className="flex flex-col space-y-8 items-center text-primary">
          {["public", "code", "mail_outline"].map((icon) => (
            <a key={icon} href="#" className="hover:scale-125 transition-transform">
              <i className="material-icons-outlined text-sm">{icon}</i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
