import { useState, useEffect } from "react";

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Portfolio", href: "#projects" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-8 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "bg-background-dark/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="text-xl font-serif tracking-[0.2em] uppercase text-primary">
        Portfolio
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-12 items-center uppercase text-[10px] tracking-[0.3em] font-medium text-slate-300">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="hover:text-primary transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="hover:text-primary transition-colors border border-primary/30 px-6 py-2"
        >
          Contact
        </a>
      </nav>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        className="p-2 border border-primary/20 hover:border-primary transition-colors text-primary ml-4"
        aria-label="Toggle dark mode"
      >
        <span className="material-symbols-outlined text-[20px]">
          {darkMode ? "light_mode" : "dark_mode"}
        </span>
      </button>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-primary ml-2"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Menu"
      >
        <span className="material-icons-outlined">
          {menuOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-background-dark/95 backdrop-blur-md py-6 flex flex-col items-center space-y-6 md:hidden">
          {[...links, { label: "Contact", href: "#contact" }].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="uppercase text-[10px] tracking-[0.3em] text-slate-300 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
