import { useEffect, useState } from "react";

// ─── Check if Material Symbols font is loaded ─────────────────
function waitForFontsAndIcons() {
  return new Promise((resolve) => {
    // document.fonts.ready resolves when all @font-face fonts are loaded
    const fontsReady = document.fonts.ready;

    // Also wait for the Material Symbols stylesheet to be applied
    // by checking if a test icon renders at the expected size
    const checkIconsLoaded = () => {
      const testEl = document.createElement("span");
      testEl.className = "material-symbols-outlined";
      testEl.style.cssText = "position:absolute;visibility:hidden;font-size:24px;";
      testEl.textContent = "check";
      document.body.appendChild(testEl);

      const check = () => {
        const width = testEl.getBoundingClientRect().width;
        if (width > 0 && width < 100) {
          // Icon font rendered correctly (not fallback text)
          document.body.removeChild(testEl);
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };
      requestAnimationFrame(check);
    };

    fontsReady.then(checkIconsLoaded);

    // Safety timeout — never block more than 5s
    setTimeout(resolve, 5000);
  });
}

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar: 0→70% quickly, then wait for real load
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 70) { clearInterval(interval); return p; }
        return p + Math.random() * 10;
      });
    }, 80);

    const finish = async () => {
      clearInterval(interval);

      // Bump to 85% while waiting for fonts/icons
      setProgress(85);
      await waitForFontsAndIcons();

      // Also wait for window load (images, scripts)
      if (document.readyState !== "complete") {
        await new Promise((r) => window.addEventListener("load", r, { once: true }));
      }

      setProgress(100);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onDone, 600);
      }, 400);
    };

    finish();

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070d18] transition-opacity duration-[600ms] ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
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
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600">
              {progress < 85 ? "Loading assets…" : progress < 100 ? "Loading icons…" : "Ready"}
            </span>
            <span className="text-[9px] text-primary/60 font-mono">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
