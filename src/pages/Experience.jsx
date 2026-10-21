import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workExperience } from "../data/content";
import { categoryColors } from "../utils/colors";
import { Reveal } from "../components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const PIN_OFFSET = 96; // clears the fixed navbar

function JobCard({ job }) {
  const colors = categoryColors[job.color];

  return (
    <div
      className="relative rounded-[2rem] p-7 sm:p-10 overflow-hidden mx-auto max-w-3xl"
      style={{
        background: `color-mix(in srgb, ${colors.soft} 55%, var(--surface))`,
        border: "1px solid rgba(27,26,26,0.08)",
        boxShadow: "0 40px 80px -30px rgba(27,26,26,0.4)",
      }}
    >
      {/* decorative blob */}
      <motion.div
        className="absolute -top-14 -right-10 w-48 h-48 pointer-events-none"
        style={{
          background: colors.ring,
          borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%",
        }}
        animate={{ opacity: [0.35, 0.55, 0.35], rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "16px 16px" }}
      />

      <div className="relative z-10 flex items-center gap-3 mb-5">
        <motion.span
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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

      <h3 className="relative z-10 text-2xl sm:text-3xl leading-snug mb-1">{job.role}</h3>
      <p className="relative z-10 text-sm sm:text-base mb-5" style={{ color: "var(--ink-soft)" }}>
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

      <p className="relative z-10 text-base leading-relaxed mb-6 max-w-xl" style={{ color: "var(--ink-soft)" }}>
        {job.summary}
      </p>

      <div className="relative z-10 flex flex-wrap gap-2">
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
      const cards = gsap.utils.toArray(".stack-card");
      const last = cards[cards.length - 1];

      cards.forEach((card, i) => {
        // Pin every card in place from the moment it reaches the top until
        // the very last card also reaches it — so earlier cards stay put,
        // stacked underneath, while later ones scroll up over them.
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${PIN_OFFSET}`,
          endTrigger: last,
          end: `top top+=${PIN_OFFSET}`,
          pin: true,
          pinSpacing: false,
        });

        // Soft depth cue: as the next card arrives and slides over this one,
        // ease this card down to a slightly smaller scale and lower opacity.
        if (i < cards.length - 1) {
          gsap.fromTo(
            card,
            { scale: 1, opacity: 1 },
            {
              scale: 0.97,
              opacity: 0.6,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: `top top+=${PIN_OFFSET}`,
                scrub: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 lg:pt-40 pb-24" ref={containerRef}>
      <Reveal blur as="h1" className="text-center font-normal leading-[1.1] mb-16 block px-4" style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}>
        Experience
      </Reveal>

      <div className="relative">
        {workExperience.map((job, i) => (
          <div
            key={`${job.company}-${job.period}`}
            className="stack-card relative px-4 sm:px-6 lg:px-8 pb-[45vh]"
            style={{ transformOrigin: "center top" }}
          >
            <JobCard job={job} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
