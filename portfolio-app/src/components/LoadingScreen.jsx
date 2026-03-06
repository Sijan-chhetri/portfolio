import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar quickly, then wait for window load
    const interval = setInterval(() => {
      setProgress((p) => {
        // Slow down near 90% — wait for real load
        if (p >= 90) { clearInterval(interval); return p; }
        return p + Math.random() * 12;
      });
    }, 80);

    const finish = () => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onDone, 600);
      }, 300);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", finish);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070d18] transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Name */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-serif">
            Portfolio
          </p>
          <h1 className="font-display italic text-4xl md:text-6xl text-[#f8f5f0] tracking-tight">
            Sijan Katuwal Chhetri
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-light">
            Full-Stack Software Engineer
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 space-y-3">
          <div className="w-full h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600">Loading</span>
            <span className="text-[9px] text-primary/60 font-mono">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
