import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const STOP_THEMES = [
  {
    soft: "var(--pill-mint)",
    bold: "#10b981",
    accent: "var(--accent-mint)",
    tape: "#A9E3F7",
    icon: "🏰",
    year: "2003 — ORIGIN",
    subtitle: "Roots & Boundless Curiosity",
  },
  {
    soft: "var(--pill-blue)",
    bold: "#0284c7",
    accent: "var(--accent-sky)",
    tape: "#F3B8CE",
    icon: "🎓",
    year: "2021 — DISCOVERY",
    subtitle: "Delhi University Campus",
  },
  {
    soft: "var(--pill-yellow)",
    bold: "#f59e0b",
    accent: "var(--accent-amber)",
    tape: "#B7EED0",
    icon: "🎪",
    year: "2023 — THE HUSTLE",
    subtitle: "First Campus Pitch",
  },
  {
    soft: "#FBE4EC",
    bold: "#ec4899",
    accent: "#F3B8CE",
    tape: "#E4D875",
    icon: "💼",
    year: "2024 — LAUNCHPAD",
    subtitle: "Corporate Marketing",
  },
];

function cubicAt(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

function buildRoad(points, samplesPerSegment = 28) {
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

/**
 * Custom illustrated adventurer avatar of Priyanshi!
 * Terracotta jacket, cream trousers, dark curly bangs, explorer backpack,
 * and rhythmic swinging legs that walk in time.
 */
function PriyanshiTraveler({ facing = 1, isWalking = true }) {
  return (
    <motion.div
      className="relative select-none pointer-events-none drop-shadow-xl"
      style={{ scaleX: facing }}
      animate={isWalking ? { y: [0, -6, 0] } : { y: 0 }}
      transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
        {/* Soft ground shadow */}
        <ellipse cx="26" cy="65" rx="15" ry="3" fill="rgba(0,0,0,0.24)" />

        {/* Legs with swinging walk cycle */}
        <motion.g
          animate={isWalking ? { rotate: [-18, 18, -18] } : { rotate: 0 }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "23px 40px" }}
        >
          {/* Left leg (cream trousers + dark shoe) */}
          <rect x="21" y="40" width="5" height="19" rx="2.5" fill="#f5f3ee" stroke="#1b1a1a" strokeWidth="1.3" />
          <ellipse cx="22.5" cy="59" rx="4" ry="2.2" fill="#1b1a1a" />
        </motion.g>

        <motion.g
          animate={isWalking ? { rotate: [18, -18, 18] } : { rotate: 0 }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "29px 40px" }}
        >
          {/* Right leg */}
          <rect x="27" y="40" width="5" height="19" rx="2.5" fill="#f5f3ee" stroke="#1b1a1a" strokeWidth="1.3" />
          <ellipse cx="30" cy="59" rx="4" ry="2.2" fill="#1b1a1a" />
        </motion.g>

        {/* Explorer backpack */}
        <rect x="11" y="24" width="8" height="14" rx="3.5" fill="#f7a934" stroke="#1b1a1a" strokeWidth="1.3" />
        <circle cx="15" cy="28" r="1.8" fill="#ffd84d" />

        {/* Torso & Terracotta Jacket */}
        <rect x="19" y="22" width="14" height="19" rx="4.5" fill="#c26d53" stroke="#1b1a1a" strokeWidth="1.5" />
        {/* Inner white tee */}
        <polygon points="23,22 29,22 26,29" fill="#ffffff" />

        {/* Swinging arm */}
        <motion.g
          animate={isWalking ? { rotate: [20, -20, 20] } : { rotate: 0 }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "20px 24px" }}
        >
          <rect x="16" y="23" width="4" height="13" rx="2" fill="#c26d53" stroke="#1b1a1a" strokeWidth="1.3" />
          <circle cx="18" cy="36" r="2.2" fill="#f6c8a7" />
        </motion.g>

        {/* Head and Curls */}
        <ellipse cx="25" cy="14" rx="9" ry="10" fill="#1b1a1a" />
        <circle cx="17" cy="16" r="5" fill="#1b1a1a" />
        <circle cx="18" cy="11" r="4.5" fill="#1b1a1a" />

        {/* Face */}
        <circle cx="27" cy="14" r="6.5" fill="#f6c8a7" stroke="#1b1a1a" strokeWidth="1.3" />
        {/* Rosy blush cheek */}
        <circle cx="30" cy="16.5" r="1.5" fill="#ff4fa6" opacity="0.6" />
        {/* Beady eye with shine */}
        <circle cx="29.5" cy="13.5" r="1.2" fill="#1b1a1a" />
        <circle cx="29.9" cy="13.1" r="0.45" fill="#ffffff" />
        {/* Cheerful smile */}
        <path d="M 29 16.5 Q 30.5 17.5 31.5 16" stroke="#1b1a1a" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* Bangs and yellow hairclip */}
        <path d="M 22 8 C 24 6, 30 7, 31 10 C 29 9, 25 9, 23 11 Z" fill="#1b1a1a" />
        <rect x="25" y="7" width="3.5" height="2" rx="1" fill="#ffd84d" stroke="#1b1a1a" strokeWidth="0.8" />
      </svg>
    </motion.div>
  );
}

export default function MyJourneySection({ milestones }) {
  const trackRef = useRef(null);
  const [activeStop, setActiveStop] = useState(0);

  // Generous scroll trigger window for smooth, pleasant journey progression
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.82", "end 0.22"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const roadPoints = useMemo(
    () =>
      milestones.map((_, i) => ({
        x: 10 + (80 * i) / Math.max(milestones.length - 1, 1),
        y: i % 2 === 0 ? 32 : 68,
      })),
    [milestones]
  );

  const { d: roadD, samples } = useMemo(() => buildRoad(roadPoints), [roadPoints]);
  const sampleStops = samples.map((_, i) => i / (samples.length - 1));

  const travelerLeft = useTransform(smoothProgress, sampleStops, samples.map((p) => `${p.x}%`));
  const travelerTop = useTransform(smoothProgress, sampleStops, samples.map((p) => `${p.y}%`));

  // Walking direction & smoothed facing
  const scrollVelocity = useVelocity(smoothProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 220, damping: 40 });
  const facing = useMotionValue(1);

  useMotionValueEvent(smoothVelocity, "change", (v) => {
    if (v > 0.02) facing.set(1);
    else if (v < -0.02) facing.set(-1);
  });

  // Track active milestone as traveler passes each coordinate
  useMotionValueEvent(smoothProgress, "change", (p) => {
    const idx = Math.min(Math.floor(p * milestones.length), milestones.length - 1);
    setActiveStop(idx);
  });

  return (
    <div className="max-w-6xl mx-auto mb-16 lg:mb-24">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span
          className="pill px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-3 inline-flex text-[#1b1a1a]"
          style={{ background: "var(--pill-yellow)", border: "1px solid rgba(27,26,26,0.12)" }}
        >
          Career Story • Step by Step
        </span>
        <h2
          className="font-normal mb-3 text-[var(--ink)]"
          style={{ fontSize: "clamp(1.75rem, 3.8vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          My Journey
        </h2>
        <p className="text-base sm:text-lg leading-relaxed text-[var(--ink-soft)]">
          From small-town Jhansi to a Delhi University stall — the accidental, passionate start of a marketing career.
        </p>
      </div>

      {/* DESKTOP WINDING ROAD (lg+) */}
      <div ref={trackRef} className="hidden lg:block relative max-w-6xl mx-auto h-[500px] mb-8 select-none">
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="journeyGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="35%" stopColor="#0284c7" />
              <stop offset="70%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Soft Dotted Track */}
          <path
            d={roadD}
            fill="none"
            stroke="var(--divider)"
            strokeWidth="5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.6"
          />

          {/* Colorful Active Journey Ribbon */}
          <motion.path
            d={roadD}
            fill="none"
            stroke="url(#journeyGlowGradient)"
            strokeWidth="5.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothProgress }}
            filter="url(#trailGlow)"
          />

          {/* Secondary bright highlight core line */}
          <motion.path
            d={roadD}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="6 14"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothProgress }}
            opacity="0.8"
          />
        </svg>

        {/* CUSTOM ANIMATED TRAVELER PRIYANSHI */}
        <motion.div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: travelerLeft, top: travelerTop }}
        >
          <PriyanshiTraveler facing={facing} isWalking={true} />
        </motion.div>

        {/* MILESTONE NODES & VINTAGE POSTCARDS */}
        {milestones.map((m, i) => {
          const pt = roadPoints[i];
          const theme = STOP_THEMES[i % STOP_THEMES.length];
          const isUp = pt.y < 50;
          const isReached = i <= activeStop;

          return (
            <div key={m.place} className="contents">
              {/* Station Circle Node on Track */}
              <motion.div
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                initial={{ scale: 0, rotate: -25 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Concentric pulse ring when active */}
                {isReached && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-40"
                    style={{ background: theme.bold }}
                  />
                )}

                <div
                  className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-center shadow-lg transition-transform"
                  style={{
                    background: theme.soft,
                    border: `3.5px solid ${theme.bold}`,
                    boxShadow: "0 14px 28px -10px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="text-xl leading-none">{theme.icon}</span>
                </div>

                {/* Station Number Badge */}
                <span
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-[#1b1a1a] shadow"
                  style={{
                    background: theme.accent,
                    border: "1.5px solid #1b1a1a",
                  }}
                >
                  0{i + 1}
                </span>
              </motion.div>

              {/* Connecting Dashed Line from Node to Card */}
              <div
                className="absolute w-px border-l-2 border-dashed pointer-events-none"
                style={{
                  left: `${pt.x}%`,
                  borderColor: theme.bold,
                  opacity: 0.45,
                  ...(isUp
                    ? { top: `${pt.y + 4}%`, height: "42px" }
                    : { bottom: `${100 - pt.y + 4}%`, height: "42px" }),
                }}
              />

              {/* Rich Passport Memory Card */}
              <motion.div
                className="absolute z-10 -translate-x-1/2 w-64"
                style={
                  isUp
                    ? { left: `${pt.x}%`, bottom: `${100 - pt.y + 11}%` }
                    : { left: `${pt.x}%`, top: `${pt.y + 11}%` }
                }
                initial={{ opacity: 0, scale: 0.8, y: isUp ? 16 : -16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                whileHover={{ y: isUp ? -6 : 6, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
              >
                <div
                  className="relative rounded-2xl p-4 text-left backdrop-blur-md overflow-hidden transition-all duration-300"
                  style={{
                    background: `color-mix(in srgb, ${theme.soft} 25%, var(--surface))`,
                    border: `1.5px solid ${isReached ? theme.bold : "var(--divider)"}`,
                    boxShadow: isReached
                      ? `0 20px 45px -20px ${theme.bold}55`
                      : "0 20px 40px -24px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Washi Tape Header */}
                  <span
                    className="absolute -top-3 left-6 w-14 h-5 rounded-sm opacity-85 pointer-events-none"
                    style={{ background: theme.tape, transform: "rotate(-4deg)" }}
                  />

                  {/* Header Tag */}
                  <div className="flex items-center justify-between mb-2 pt-1">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: theme.soft, color: theme.bold }}
                    >
                      {theme.year}
                    </span>
                    <span className="text-xs font-bold text-[var(--ink-soft)]">
                      Stop 0{i + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold leading-tight mb-1 text-[var(--ink)]">
                    {m.place}
                  </h3>
                  <p className="text-xs font-semibold mb-2" style={{ color: theme.bold }}>
                    {theme.subtitle}
                  </p>

                  {/* Descriptive memory quote */}
                  <p className="text-xs leading-relaxed text-[var(--ink-soft)] italic">
                    &ldquo;{m.caption}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* MOBILE / TABLET STACKED TIMELINE (<lg) */}
      <div className="lg:hidden relative max-w-md mx-auto pl-16 pr-4">
        {/* Animated vertical gradient rail */}
        <div
          className="absolute left-6 top-3 bottom-3 w-1 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #10b981, #0284c7, #f59e0b, #ec4899)",
          }}
        />

        <div className="space-y-10">
          {milestones.map((m, i) => {
            const theme = STOP_THEMES[i % STOP_THEMES.length];
            return (
              <motion.div
                key={m.place}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Station circle icon */}
                <span
                  className="absolute -left-16 top-1 w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-md"
                  style={{
                    background: theme.soft,
                    border: `2.5px solid ${theme.bold}`,
                  }}
                >
                  {theme.icon}
                </span>

                {/* Card */}
                <div
                  className="rounded-2xl p-4 backdrop-blur-md"
                  style={{
                    background: `color-mix(in srgb, ${theme.soft} 20%, var(--surface))`,
                    border: "1px solid var(--divider)",
                    boxShadow: "0 15px 35px -20px rgba(0,0,0,0.25)",
                  }}
                >
                  <span
                    className="inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5"
                    style={{ background: theme.soft, color: theme.bold }}
                  >
                    {theme.year} • Stop 0{i + 1}
                  </span>
                  <h3 className="text-base font-bold mb-1 text-[var(--ink)]">{m.place}</h3>
                  <p className="text-xs font-semibold mb-1.5" style={{ color: theme.bold }}>
                    {theme.subtitle}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--ink-soft)] italic">
                    &ldquo;{m.caption}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
