import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperience } from "../data/content";
import { categoryColors } from "../utils/colors";
import { Reveal } from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

// `html, body` has global `overflow-x: hidden` (needed to keep decorative
// elements that intentionally bleed past their containers from creating a
// horizontal scrollbar), and that alone breaks native CSS `position: sticky`
// for every descendant — any ancestor with overflow other than visible does.
// GSAP's pin uses `position: fixed` under the hood instead, which isn't
// affected, so it's the one piece of JS-driven layout this page still needs.
const NAVBAR_CLEARANCE = 96; // clears the fixed navbar

function JobCard({ job }) {
  const colors = categoryColors[job.color];

  return (
    <div
      className="relative rounded-[2rem] p-6 sm:p-8 overflow-hidden mx-auto max-w-2xl h-[400px] sm:h-[380px] flex flex-col"
      style={{
        background: `color-mix(in srgb, ${colors.soft} 55%, var(--surface))`,
        border: "1px solid rgba(27,26,26,0.08)",
        boxShadow: "0 40px 80px -30px rgba(27,26,26,0.4)",
      }}
    >
      {/* decorative blob — static, not animated, so it doesn't read as
          flicker while cards slide past each other */}
      <div
        className="absolute -top-14 -right-10 w-48 h-48 pointer-events-none"
        style={{
          background: colors.ring,
          borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%",
          opacity: 0.45,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "16px 16px" }}
      />

      <div className="relative z-10 flex items-center gap-3 mb-4 flex-shrink-0">
        <motion.span
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: colors.ring }}
          whileHover={{ rotate: -10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="var(--ink)" strokeWidth={1.75} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={job.icon} />
          </svg>
        </motion.span>
        <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--ink-soft)" }}>
          {job.period}
        </p>
      </div>

      <div className="relative z-10 mb-1 flex-shrink-0" style={{ minHeight: "2.5em" }}>
        <h3
          className="text-2xl sm:text-3xl leading-snug"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {job.role}
        </h3>
      </div>
      <p className="relative z-10 text-sm sm:text-base mb-4 flex-shrink-0" style={{ color: "var(--ink-soft)" }}>
        {job.company} — {job.location}
        {job.current && (
          <span className="ml-2 pill px-2.5 py-0.5 text-xs font-semibold relative" style={{ background: "var(--pill-mint)" }}>
            <span className="relative flex h-1.5 w-1.5 mr-1 inline-flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--ink)" }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "var(--ink)" }} />
            </span>
            Current
          </span>
        )}
      </p>

      <div className="relative z-10 mb-4 max-w-xl flex-1 min-h-0 overflow-hidden">
        <p
          className="text-sm sm:text-base leading-relaxed"
          style={{
            color: "var(--ink-soft)",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
            overflow: "hidden",
          }}
        >
          {job.summary}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 flex-shrink-0">
        {job.metrics.map((metric) => (
          <span
            key={metric}
            className="pill px-3 py-1.5 text-xs font-semibold"
            style={{ background: "var(--bg)", border: `1px solid ${colors.ring}` }}
          >
            {metric}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heading = document.querySelector(".experience-heading");
      const cards = gsap.utils.toArray(".stack-card");
      const last = cards[cards.length - 1];

      // The heading pins once it clears the navbar and stays there for the
      // whole stack, acting as a persistent sub-header above the cards.
      if (heading && last) {
        ScrollTrigger.create({
          trigger: heading,
          start: `top top+=${NAVBAR_CLEARANCE}`,
          endTrigger: last,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      }

      cards.forEach((card, i) => {
        const next = cards[i + 1];

        // Pin each card only until the *next* card reaches the same point
        // and takes over. The next card, being later in the DOM, naturally
        // stacks on top and fully covers this one — no fade needed, just a
        // clean handoff.
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${NAVBAR_CLEARANCE}`,
          ...(next ? { endTrigger: next, end: `top top+=${NAVBAR_CLEARANCE}` } : { end: "bottom top" }),
          pin: true,
          pinSpacing: false,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24 pb-24" ref={containerRef}>
      <div className="experience-heading relative z-20 pb-10 px-4" style={{ background: "var(--bg)" }}>
        <Reveal blur as="h1" className="text-center font-normal leading-[1.1] block" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
          Experience
        </Reveal>
      </div>

      <div className="relative">
        {workExperience.map((job, i) => (
          <div key={`${job.company}-${job.period}`} className="stack-card relative px-4 sm:px-6 lg:px-8 pb-[45vh]">
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
