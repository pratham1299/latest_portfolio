import { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { certificates, education, expertise, personal } from "../data/content";
import AboutIntro from "../components/AboutIntro";
import { Reveal, StaggerGroup, StaggerItem } from "../components/Reveal";

const CARD_TINTS = [
  { soft: "var(--pill-mint)", bold: "var(--accent-mint)" },
  { soft: "var(--pill-blue)", bold: "var(--accent-sky)" },
  { soft: "var(--pill-yellow)", bold: "var(--accent-amber)" },
];

const SKILL_TINTS = ["var(--pill-mint)", "var(--pill-blue)", "var(--pill-yellow)"];

const STOP_COLORS = [
  { soft: "var(--pill-mint)", bold: "var(--accent-mint)" },
  { soft: "var(--pill-blue)", bold: "var(--accent-sky)" },
  { soft: "var(--pill-yellow)", bold: "var(--accent-amber)" },
  { soft: "#FBE4EC", bold: "#F3B8CE" },
];

const STOP_ICONS = [
  // home / roots
  "M3 11.5L12 4l9 7.5M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9",
  // graduation cap
  "M12 4l9 4.5-9 4.5-9-4.5L12 4zM6.5 10.7v4.8c0 1.5 2.46 3 5.5 3s5.5-1.5 5.5-3v-4.8",
  // shopping bag / stall
  "M6 8h12l1.2 12H4.8L6 8zM9 8a3 3 0 016 0",
  // briefcase
  "M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8zM9 8V6a2 2 0 012-2h2a2 2 0 012 2v2",
];

function cubicAt(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

// Builds a smooth S-curve "road" through a list of {x,y} waypoints (0-100
// coordinate space) that flows left-to-right, plus a dense sample of points
// along that exact curve — used to move the traveler in perfect sync with
// the rendered path instead of jumping in a straight line between stops.
function buildRoad(points, samplesPerSegment = 24) {
  let d = `M ${points[0].x} ${points[0].y}`;
  const samples = [{ x: points[0].x, y: points[0].y }];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const midX = (p0.x + p1.x) / 2;
    d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`;
    for (let s = 1; s <= samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      samples.push({
        x: cubicAt(p0.x, midX, midX, p1.x, t),
        y: cubicAt(p0.y, p0.y, p1.y, p1.y, t),
      });
    }
  }
  return { d, samples };
}

// A scroll-driven, winding "road" map — a walking traveler follows the exact
// curve left-to-right as you scroll, colorful stop badges mark each
// waypoint, and every stop's card pops in with a bounce as it arrives.
function JourneyPath({ milestones }) {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.7", "end 0.4"] });

  const roadPoints = useMemo(
    () =>
      milestones.map((_, i) => ({
        x: 9 + (82 * i) / Math.max(milestones.length - 1, 1),
        y: i % 2 === 0 ? 30 : 70,
      })),
    [milestones]
  );
  const { d: roadD, samples } = useMemo(() => buildRoad(roadPoints), [roadPoints]);

  const sampleStops = samples.map((_, i) => i / (samples.length - 1));
  const travelerLeft = useTransform(scrollYProgress, sampleStops, samples.map((p) => `${p.x}%`));
  const travelerTop = useTransform(scrollYProgress, sampleStops, samples.map((p) => `${p.y}%`));

  // Scrolling down moves progress forward (face right, walk stop 1 -> 4);
  // scrolling up moves it backward (face left, walk stop 4 -> 1). Raw scroll
  // velocity is noisy frame to frame, so it's smoothed first, and "facing"
  // only updates past a small threshold — otherwise it holds its last value
  // instead of flickering or snapping to a default the moment scrolling stops.
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 260, damping: 50 });
  const facing = useMotionValue(-1);
  useMotionValueEvent(smoothVelocity, "change", (v) => {
    if (v > 0.03) facing.set(-1);
    else if (v < -0.03) facing.set(1);
  });

  return (
    <>
      {/* Desktop — full winding road, left to right */}
      <div ref={trackRef} className="hidden lg:block relative max-w-6xl mx-auto h-[460px] mb-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={roadD}
            fill="none"
            stroke="var(--divider)"
            strokeWidth="18"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={roadD}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="18"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* traveler — mirrored so she faces the direction of travel (left to right) */}
        <motion.div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={{ left: travelerLeft, top: travelerTop }}>
          <motion.span
            className="block text-6xl leading-none drop-shadow-lg"
            style={{ scaleX: facing }}
            animate={{ y: [0, -8, 0], rotate: [-6, 6, -6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            🚶🏽‍♀️
          </motion.span>
        </motion.div>

        {milestones.map((m, i) => {
          const pt = roadPoints[i];
          const color = STOP_COLORS[i % STOP_COLORS.length];
          const isUp = pt.y < 50;
          return (
            <div key={m.place} className="contents">
              <motion.div
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: color.soft, border: `4px solid ${color.bold}`, boxShadow: "0 15px 30px -12px rgba(27,26,26,0.4)" }}
                >
                  <svg className="w-7 h-7" fill="none" stroke="var(--ink)" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={STOP_ICONS[i % STOP_ICONS.length]} />
                  </svg>
                </div>
                <span
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "var(--ink)", color: "var(--surface)" }}
                >
                  {i + 1}
                </span>
              </motion.div>

              <motion.div
                className="absolute z-10 -translate-x-1/2 w-56"
                style={
                  isUp
                    ? { left: `${pt.x}%`, bottom: `${100 - pt.y + 11}%` }
                    : { left: `${pt.x}%`, top: `${pt.y + 11}%` }
                }
                initial={{ opacity: 0, scale: 0.7, y: isUp ? 14 : -14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.08 }}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: `color-mix(in srgb, ${color.soft} 35%, var(--surface))`,
                    border: "1px solid rgba(27,26,26,0.08)",
                    boxShadow: "0 20px 40px -24px rgba(27,26,26,0.3)",
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color: "var(--ink-soft)" }}>
                    Stop 0{i + 1}
                  </p>
                  <h3 className="text-base leading-snug mb-1.5">{m.place}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {m.caption}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Mobile / tablet fallback — simple stacked stops, same color language.
          The horizontal road needs real desktop width to not feel cramped. */}
      <div className="lg:hidden relative max-w-md mx-auto pl-14">
        <div
          className="absolute left-4 top-2 bottom-2 w-0.5"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--divider) 0 6px, transparent 6px 13px)" }}
        />
        <StaggerGroup stagger={0.12}>
          {milestones.map((m, i) => {
            const color = STOP_COLORS[i % STOP_COLORS.length];
            return (
              <StaggerItem key={m.place} className="relative mb-12 last:mb-0">
                <span className="absolute -left-14 top-0 w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: color.soft, border: `3px solid ${color.bold}` }}>
                  <svg className="w-5 h-5" fill="none" stroke="var(--ink)" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={STOP_ICONS[i % STOP_ICONS.length]} />
                  </svg>
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color: "var(--ink-soft)" }}>
                  Stop 0{i + 1} — {m.place}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {m.caption}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </>
  );
}

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
  return (
    <>
      <AboutIntro />
      <div className="pt-16 lg:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* My Journey */}
      <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Reveal blur as="h2" className="font-normal mb-3 block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
            {personal.journey.heading}
          </Reveal>
          <Reveal delay={0.05} as="p" className="text-base sm:text-lg leading-relaxed block" style={{ color: "var(--ink-soft)" }}>
            {personal.journey.subtext}
          </Reveal>
        </div>

        <JourneyPath milestones={personal.journey.milestones} />
      </div>

      {/* What I Do Best */}
      <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Reveal
            className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full mb-3"
            style={{ background: "var(--surface)", border: "1px solid rgba(27,26,26,0.08)" }}
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
          className="relative rounded-[2rem] p-6 sm:p-9 text-center overflow-hidden"
          style={{ background: "var(--surface)", border: "1px solid rgba(27,26,26,0.08)", boxShadow: "0 30px 65px -32px rgba(27,26,26,0.28)" }}
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
                  className="pill px-4 py-2 text-xs sm:text-sm font-semibold"
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
                  <svg className="w-3 h-3" fill="none" stroke="var(--ink)" strokeWidth={2.5} viewBox="0 0 24 24">
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
            style={{ background: "var(--ink)", color: "var(--surface)" }}
          >
            View My Work
          </a>
          <a
            href="/#contact"
            className="pill px-6 py-3 text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.1)" }}
          >
            Get In Touch
          </a>
        </div>
      </Reveal>
      </div>
    </>
  );
}
