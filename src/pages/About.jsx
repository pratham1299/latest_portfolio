import { useEffect } from "react";
import { motion } from "framer-motion";
import { certificates, education, expertise, personal } from "../data/content";
import AboutIntro from "../components/AboutIntro";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";
import GlobalSkyScene from "../components/GlobalSkyScene";
import MyJourneySection from "../components/MyJourneySection";

const CARD_TINTS = [
  { soft: "var(--pill-mint)", bold: "var(--accent-mint)" },
  { soft: "var(--pill-blue)", bold: "var(--accent-sky)" },
  { soft: "var(--pill-yellow)", bold: "var(--accent-amber)" },
];

const SKILL_TINTS = ["var(--pill-mint)", "var(--pill-blue)", "var(--pill-yellow)"];

function ExpertiseRow({ card, index }) {
  const tint = CARD_TINTS[index % CARD_TINTS.length];
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ x: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 py-5 sm:py-6 ${index === 0 ? "" : "dashed-rule"}`}
      >
        <span
          className="font-normal leading-none flex-shrink-0 transition-colors duration-300"
          style={{
            fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
            color: "transparent",
            WebkitTextStroke: `1.5px ${tint.bold}`,
          }}
        >
          0{index + 1}
        </span>
        <div className="pt-1 sm:pt-2">
          <h3 className="text-xl sm:text-2xl leading-snug mb-2 flex items-center gap-2.5">
            {card.title}
            <svg
              className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300"
              fill="none"
              stroke="var(--ink)"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h3>
          <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--ink-soft)" }}>
            {card.description}
          </p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function About() {
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
        <AboutIntro />
        <div className="pt-16 lg:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* My Journey — Beautiful animated winding route with bespoke adventurer avatar */}
          <MyJourneySection milestones={personal.journey.milestones} />

          {/* What I Do Best */}
          <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <Reveal
                className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full mb-3"
                style={{ background: "var(--surface)", border: "1px solid var(--divider)" }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "var(--ink-soft)" }}>
                  {expertise.badge}
                </span>
              </Reveal>
              <Reveal blur delay={0.05} as="h2" className="font-normal mb-3 block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
                {expertise.heading}
              </Reveal>
              <Reveal delay={0.1} as="p" className="text-base sm:text-lg leading-relaxed block" style={{ color: "var(--ink-soft)" }}>
                {expertise.subtext}
              </Reveal>
            </div>

            <StaggerGroup className="max-w-3xl mx-auto" stagger={0.12}>
              {expertise.cards.map((card, i) => (
                <ExpertiseRow key={card.title} card={card} index={i} />
              ))}
            </StaggerGroup>
          </div>

          {/* How I Work */}
          <div className="max-w-4xl mx-auto mb-16 lg:mb-20">
            <div
              className="relative rounded-[2rem] p-6 sm:p-9 text-center overflow-hidden backdrop-blur-md transition-colors duration-500"
              style={{ background: "var(--surface)", border: "1px solid var(--divider)", boxShadow: "0 30px 65px -32px rgba(0,0,0,0.3)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "16px 16px" }}
              />
              <div
                className="absolute -top-16 -right-16 w-48 h-48 pointer-events-none"
                style={{ background: "var(--pill-yellow)", borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%", opacity: 0.5 }}
              />

              <Reveal className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--ink-soft)" }}>
                  How I Work
                </p>
                <p
                  className="italic leading-snug mb-5"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: "var(--ink)" }}
                >
                  {personal.workingStyle.quote}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {personal.workingStyle.traits.map((trait, i) => (
                    <span
                      key={trait}
                      className="pill px-4 py-2 text-xs sm:text-sm font-semibold text-[#1b1a1a]"
                      style={{ background: SKILL_TINTS[i % SKILL_TINTS.length], border: "1px solid rgba(27,26,26,0.1)" }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="max-w-6xl mx-auto mb-16 lg:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <Reveal>
              <p className="font-bold text-sm tracking-wide mb-6 uppercase">Education</p>
              <div className="relative pl-6" style={{ borderLeft: "2px dashed var(--divider)" }}>
                {education.map((e, i) => (
                  <div key={e.degree} className={i === 0 ? "pb-8" : ""}>
                    <span
                      className="absolute -left-[7px] w-3 h-3 rounded-full"
                      style={{ background: "var(--ink)", marginTop: "0.4rem" }}
                    />
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--ink-soft)" }}>
                      {e.period}
                    </p>
                    <h3 className="text-lg leading-snug mb-1">{e.degree}</h3>
                    <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                      {e.institute} — {e.location}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-bold text-sm tracking-wide mb-6 uppercase">Certifications</p>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 py-2 dashed-rule-b">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--pill-mint)" }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="#1b1a1a" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-base">{cert}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Closing CTA */}
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="font-normal mb-5 leading-[1.1]" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
              Let&rsquo;s build something great together.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#portfolio"
                className="pill px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ background: "var(--ink)", color: "var(--bg)" }}
              >
                View My Work
              </a>
              <a
                href="/#contact"
                className="pill px-6 py-3 text-sm font-semibold text-[#1b1a1a] hover:opacity-70 transition-opacity"
                style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.1)" }}
              >
                Get In Touch
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
