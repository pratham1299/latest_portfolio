import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import CaseStudies from "../components/CaseStudies";
import Process from "../components/Process";
import Hobbies from "../components/Hobbies";
import Footer from "../components/Footer";
import GlobalSkyScene from "../components/GlobalSkyScene";

export default function Home() {
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (maxScroll > 0) {
            const progress = window.scrollY / maxScroll;
            document.documentElement.classList.toggle("dark-sky", progress >= 0.72);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("dark-sky");
    };
  }, []);

  return (
    <div className="relative min-h-screen transition-colors duration-150 bg-gradient-to-b from-[#f7f5f0] via-[#f1e9dd] via-[#e8956d] via-[#322659] to-[#0f0d26] text-[var(--ink)]">
      {/* 3D Global Sky Canvas (Clouds, Cruising Airplanes, Twinkling Night Stars) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <GlobalSkyScene />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 pointer-events-auto">
        <Hero />
        <About />
        <Portfolio />
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <CaseStudies />
        </section>
        <Process />
        <Hobbies />
        <Footer />
      </div>
    </div>
  );
}
