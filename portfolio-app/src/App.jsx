import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("sijan-dark-mode");
    return saved === null ? true : saved === "true";
  });
  const [loaded, setLoaded] = useState(false);

  const toggleDark = () => {
    setDarkMode((d) => {
      const next = !d;
      localStorage.setItem("sijan-dark-mode", String(next));
      return next;
    });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-[#f8f5f0] font-sans antialiased overflow-x-hidden">
        <Navbar darkMode={darkMode} toggleDark={toggleDark} />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
