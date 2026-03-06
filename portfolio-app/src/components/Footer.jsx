export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-primary/10 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Sijan Katuwal Chhetri. All Rights Reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-slate-400">
          {["LinkedIn", "GitHub", "Contact"].map((link) => (
            <a
              key={link}
              href={link === "Contact" ? "#contact" : "#"}
              className="hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 hidden sm:block">
          Built with Python · Django · React
        </p>
      </div>
    </footer>
  );
}
