import React, { useState, useEffect } from "react";
import { workExperience } from "../data/content";
import MesqPillarScene from "../components/MesqPillarScene";

const experienceMeta = [
  {
    image: "/case-studies/office-2.jpg",
    sticker: "🌙",
    stickerBg: "var(--pill-yellow)",
    tag: "TRACK OPINION",
    dialogue: "Market Associate at Track Opinion — spearheading B2B outreach, events, and 3 global ISO/HIPAA certifications.",
  },
  {
    image: "/case-studies/quirks-1.png",
    sticker: "🍄",
    stickerBg: "var(--accent-mint)",
    tag: "MEDHAVI GTM",
    dialogue: "Executive Analyst at Medhavi Skill University — architected the B2B GTM strategy, nurturing systems & 500+ SPOCs.",
  },
  {
    image: "/case-studies/quirks-2.jpg",
    sticker: "🛸",
    stickerBg: "var(--pill-blue)",
    tag: "OUTBOUND & CRO",
    dialogue: "Outbound Associate at Seventh Triangle — C-suite LinkedIn campaigns, 45+ CRO audits, and 23%+ deal conversions.",
  },
  {
    image: "/case-studies/office-3.jpg",
    sticker: "⭐",
    stickerBg: "var(--pill-yellow)",
    tag: "PAID MEDIA",
    dialogue: "Marketing Intern at Seventh Triangle — Meta & Google Ads optimization, 200K+ reach, and 25% higher ROAS.",
  },
];

function FlipJobCard({ job, meta, index }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-[420px] [perspective:1200px]">
      <div className="relative">
        {/* Top-Right Sticker Badge */}
        <div
          className="absolute -top-3.5 -right-2.5 z-30 w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 border-[var(--ink)] shadow-[2px_2px_0px_0px_var(--ink)] transform rotate-12 transition-transform hover:scale-125"
          style={{ background: meta.stickerBg }}
        >
          {meta.sticker}
        </div>

        {/* Billboard Frame tilted in 3D perspective toward the pillar & signs */}
        <div
          className="relative rounded-[1.8rem] border-3 border-[var(--ink)] bg-[var(--surface)] p-2.5 sm:p-3 shadow-[5px_5px_0px_0px_var(--ink)] transition-transform [transform:rotateY(6deg)_rotateZ(-0.5deg)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className={`relative w-full min-h-[380px] sm:min-h-[400px] rounded-[1.4rem] transition-transform duration-700 [transform-style:preserve-3d] ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          >
            {/* FRONT FACE: Image Showcase & Flip Prompt */}
            <div className="absolute inset-0 w-full h-full rounded-[1.4rem] bg-[#1a1918] border-2 border-[var(--ink)] overflow-hidden flex flex-col [backface-visibility:hidden]">
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#252321] border-b-2 border-[var(--ink)]">
                <span className="px-2 py-0.5 rounded-full bg-[var(--pill-yellow)] text-[var(--ink)] font-bold text-[11px] tracking-wider border border-[var(--ink)]">
                  0{index + 1} / 0{workExperience.length}
                </span>
                <span className="text-[11px] font-semibold text-[var(--accent-mint)] uppercase tracking-wider">
                  {meta.tag}
                </span>
              </div>

              {/* Showcase Image */}
              <div className="relative h-44 sm:h-48 bg-black/60 overflow-hidden group flex-shrink-0">
                <img
                  src={meta.image}
                  alt={job.company}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1918] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--ink)] text-[11px] font-bold shadow-[2px_2px_0px_0px_var(--ink)]">
                    {job.company} ↗
                  </span>
                </div>
              </div>

              {/* Action Footer: Flip Prompt */}
              <div className="p-3.5 bg-[#252321] border-t-2 border-[var(--ink)] flex items-center justify-between flex-1">
                <div className="pr-2">
                  <h4 className="text-sm sm:text-base font-normal text-white leading-tight">
                    {job.role}
                  </h4>
                  <p className="text-[11px] text-white/70">{job.period}</p>
                </div>

                <button
                  onClick={() => setIsFlipped(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pill-mint)] text-[var(--ink)] font-bold text-[11px] uppercase tracking-wider border-2 border-[var(--ink)] shadow-[2px_2px_0px_0px_var(--ink)] hover:scale-105 active:scale-95 transition-transform cursor-pointer flex-shrink-0"
                >
                  <span>Flip to Read</span>
                  <svg className="w-3.5 h-3.5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* BACK FACE: Detailed Experience */}
            <div className="absolute inset-0 w-full h-full rounded-[1.4rem] bg-[var(--surface)] text-[var(--ink)] p-4 sm:p-5 overflow-y-auto flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-[var(--ink)]">
              <div>
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[var(--divider)]">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--ink-soft)]">
                      {job.period} • {job.location}
                    </p>
                    <h3 className="text-lg sm:text-xl font-normal leading-tight text-[var(--ink)]">
                      {job.role}
                    </h3>
                    <p className="text-xs font-medium text-[var(--ink-soft)]">
                      {job.company}
                    </p>
                  </div>

                  {job.current && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--pill-mint)] text-emerald-800 border border-emerald-400 font-semibold text-[10px]">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-xs leading-relaxed mb-3 text-[var(--ink-soft)]">
                  {job.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {job.metrics.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-full bg-[var(--bg)] border border-[var(--divider)] text-[var(--ink)] font-semibold text-[10px]"
                    >
                      ★ {m}
                    </span>
                  ))}
                </div>

                {job.bullets && (
                  <div className="space-y-1 text-[11px] text-[var(--ink-soft)]">
                    {job.bullets.slice(0, 3).map((b, i) => (
                      <p key={i} className="flex items-start gap-1.5">
                        <span className="text-[var(--ink)] font-bold">•</span>
                        <span>{b}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 mt-2 border-t border-[var(--divider)] flex justify-end">
                <button
                  onClick={() => setIsFlipped(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--ink)] text-white font-semibold text-[11px] border border-[var(--ink)] hover:opacity-85 transition-opacity cursor-pointer"
                >
                  <span>↺ Flip Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Speech bubble caption */}
      <div className="mt-3.5 rounded-2xl bg-[var(--surface)] text-[var(--ink)] p-3 border-2 border-[var(--ink)] shadow-[2px_2px_0px_0px_var(--ink)]">
        <p className="text-[10px] font-bold text-[var(--ink-soft)] uppercase tracking-wider mb-0.5">
          PRIYANSHI'S LOG
        </p>
        <p className="text-xs leading-relaxed text-[var(--ink)]">
          {meta.dialogue}
        </p>
      </div>
    </div>
  );
}

export default function Experience() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
      // Switch to crisp white text only when scrolling deep into the night section
      document.documentElement.classList.toggle("dark-sky", progress >= 0.70);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("dark-sky");
    };
  }, []);

  return (
    <div className="relative min-h-[600vh] transition-colors duration-150 bg-gradient-to-b from-[#f7f5f0] via-[#f1e9dd] via-[#e8956d] via-[#322659] to-[#14112e] text-[var(--ink)]">
      {/* FULL-PAGE 3D PILLAR & BIRDS (Fixed full screen, rotating on scroll) */}
      <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden">
        <MesqPillarScene scrollProgress={scrollProgress} />
      </div>

      {/* FOREGROUND SECTIONS: 6 STAGES */}
      <div className="relative z-10 pointer-events-none">
        {/* STAGE 0: HERO INTRO with Traffic Light Mast (Heart, Smiley, Down Arrow) */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-full lg:w-5/12 max-w-md pointer-events-auto pt-16">
            <span
              className="pill px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4 inline-flex"
              style={{ background: "var(--pill-yellow)", border: "1px solid rgba(27,26,26,0.15)" }}
            >
              Career Milestone Map
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight mb-5 text-[var(--ink)]">
              Work Experience
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] mb-7">
              Look at the street mast on the right with the traffic lights and birds! Hover over the birds to watch them fly, then scroll down to explore each milestone!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border-2 border-[var(--ink)] shadow-[3px_3px_0px_0px_var(--ink)] text-xs font-bold uppercase tracking-wider">
              <span>Scroll down to start</span>
              <span className="animate-bounce">⬇</span>
            </div>
          </div>
        </section>

        {/* STAGE 1: FIRST EXPERIENCE CARD (Track Opinion) */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-5/12 pointer-events-auto">
            <FlipJobCard job={workExperience[0]} meta={experienceMeta[0]} index={0} />
          </div>
        </section>

        {/* STAGE 2: SECOND EXPERIENCE CARD (Medhavi Skill University) */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-5/12 pointer-events-auto">
            <FlipJobCard job={workExperience[1]} meta={experienceMeta[1]} index={1} />
          </div>
        </section>

        {/* STAGE 3: THIRD EXPERIENCE CARD (Seventh Triangle - Outbound & CRO) */}
        {/* Sky transitions to evening orangish/sunset */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-5/12 pointer-events-auto">
            <FlipJobCard job={workExperience[2]} meta={experienceMeta[2]} index={2} />
          </div>
        </section>

        {/* STAGE 4: FOURTH EXPERIENCE CARD (Seventh Triangle - Paid Media) */}
        {/* Sky transitions to night/dusk */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
          <div className="w-full lg:w-5/12 pointer-events-auto">
            <FlipJobCard job={workExperience[3]} meta={experienceMeta[3]} index={3} />
          </div>
        </section>

        {/* STAGE 5: THE FINALE "THE END" (Night sky + Disco ball + Let's Connect) */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 text-white">
          <div className="w-full lg:w-5/12 max-w-[430px] pointer-events-auto">
            <div className="relative rounded-[2rem] border-3 border-white/60 bg-[#16142e]/90 backdrop-blur-md p-6 sm:p-7 shadow-[6px_6px_0px_0px_#ffd84d]">
              {/* Top Bunting mini flag icon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4fa6] text-white text-xs font-black uppercase tracking-wider mb-4 border border-white">
                <span>🎉 THE END</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-normal leading-tight mb-3 text-white">
                That's the Journey So Far!
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-white/80 mb-6 font-medium">
                From campus hair-braiding stalls to C-suite B2B outreach, growth systems, and flagship events. Ready to build something impactful together?
              </p>

              {/* Action buttons matching site's theme */}
              {/* <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#f5efc0] text-[#1b1a1a] font-bold text-xs uppercase tracking-wider border-2 border-[#1b1a1a] shadow-[3px_3px_0px_0px_#ff4fa6] hover:scale-105 transition-transform"
                >
                  <span>Get in Touch (Email) ✉</span>
                </a>

                <div className="flex gap-2">
                  <a
                    href="/Priyanshi-Gupta-Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/30 transition-colors"
                  >
                    <span>Resume PDF ↗</span>
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#1f63f2] hover:bg-blue-600 text-white font-semibold text-xs border border-white/40 transition-colors"
                  >
                    <span>LinkedIn ↗</span>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
