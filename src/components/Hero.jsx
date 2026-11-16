import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { hero, profile, heroBadges, heroStat, personal } from "../data/content";
import MagneticButton from "./MagneticButton";
import HeroButterflyDisperse from "./HeroButterflyDisperse";

export default function Hero() {
  const { scrollY } = useScroll();
  const [activeBadge, setActiveBadge] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse parallax tracking on desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Organic radial dissolution centered on the portrait silhouette (75% 42%)
  // The portrait itself dissolves outwards into the breaking swarm of butterflies!
  const maskCutout = useTransform(scrollY, [0, 480], [0, 115]);
  const maskStyle = useTransform(maskCutout, (val) => {
    if (val <= 1) return "none";
    return `radial-gradient(circle at 75% 42%, transparent ${Math.max(0, val - 10)}%, rgba(0,0,0,0.5) ${val}%, black ${val + 24}%)`;
  });

  const imgOpacity = useTransform(scrollY, [360, 520], [1, 0]);
  const imgScale = useTransform(scrollY, [0, 480], [1, 1.04]);
  const imgBlur = useTransform(scrollY, [180, 480], ["blur(0px)", "blur(8px)"]);

  // Floating badges with custom coordinates and theme pills
  const floatingBadges = [
    {
      id: "b1",
      emoji: heroBadges[0]?.emoji || "📱",
      label: heroBadges[0]?.label || "LinkedIn Strategy",
      detail: "Track Opinion & Opinionest Advocacy",
      bg: "var(--pill-blue)",
      pos: "top-[14%] right-[6%] xl:right-[10%]",
      rotate: -5,
      duration: 4.8,
      delay: 0.2,
    },
    {
      id: "b2",
      emoji: heroBadges[1]?.emoji || "📝",
      label: heroBadges[1]?.label || "Content Strategy",
      detail: "High-retention editorial & viral carousels",
      bg: "var(--pill-yellow)",
      pos: "top-[32%] right-[2%] xl:right-[4%]",
      rotate: 4,
      duration: 5.4,
      delay: 0.5,
    },
    {
      id: "b3",
      emoji: heroBadges[2]?.emoji || "🎯",
      label: heroBadges[2]?.label || "Event Management",
      detail: "Quirks Expo Kits & Flagship Launch",
      bg: "var(--pill-mint)",
      pos: "top-[58%] right-[8%] xl:right-[12%]",
      rotate: -3,
      duration: 5.1,
      delay: 0.7,
    },
    {
      id: "b4",
      emoji: heroBadges[4]?.emoji || "🤝",
      label: heroBadges[4]?.label || "Vendor & Certifications",
      detail: "ISO 20252, ISO 27001 & HIPAA",
      bg: "#fce7f3",
      pos: "top-[78%] right-[16%] xl:right-[20%]",
      rotate: 3.5,
      duration: 4.6,
      delay: 0.9,
    },
    {
      id: "b5",
      emoji: heroBadges[3]?.emoji || "🔍",
      label: heroBadges[3]?.label || "Market Intelligence",
      detail: "45+ B2B funnels & buyer research",
      bg: "#fef3c7",
      pos: "top-[48%] left-[54%] hidden xl:flex",
      rotate: -2,
      duration: 5.8,
      delay: 1.1,
    },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Portrait with 3D Parallax & Scroll Dissolution */}
      <motion.div
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{
          opacity: imgOpacity,
          scale: imgScale,
          filter: imgBlur,
          WebkitMaskImage: maskStyle,
          maskImage: maskStyle,
          x: mouseOffset.x * 0.4,
          y: mouseOffset.y * 0.4,
        }}
      >
        <motion.img
          src="/hero-bg.png"
          alt={`${profile.name} portrait`}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          style={{ objectPosition: "85% 15%", filter: "saturate(0.96) contrast(1.02)" }}
        />
      </motion.div>

      {/* 3D Swarm of butterflies that breaks away from the portrait on scroll */}
      <HeroButterflyDisperse />

      {/* Atmospheric Editorial Gradient: provides contrast for typography while keeping portrait clear */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(108deg, rgba(20,18,22,0.88) 0%, rgba(20,18,22,0.72) 38%, rgba(20,18,22,0.3) 68%, rgba(20,18,22,0.2) 100%)",
        }}
      />

      {/* Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Top Status Capsule: Live Availability & Name/Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/20 bg-black/40 backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white/90">
              {profile.name} — {hero.badge}
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-emerald-300/90 text-[11px] font-mono tracking-normal hidden sm:inline">
              Available for Strategic Roles
            </span>
          </motion.div>

          {/* Headline with Staggered Kinetic Typography & Theme Accents (Exact Text Preserved) */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-normal tracking-tight text-white mb-6 select-text"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              lineHeight: 1.12,
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
            }}
          >
            <span className="block font-medium drop-shadow-sm">
              Driving Brand Growth
            </span>

            <span className="block mt-1 sm:mt-1.5">
              <span className="italic font-light text-white/80 font-serif mr-2.5">
                Through
              </span>
              <span className="relative inline-block px-1">
                <span className="relative z-10 font-semibold text-[#fef9c3] drop-shadow-sm">
                  Strategic Content,
                </span>
                {/* Organic Hand-Drawn Highlighter Stroke */}
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full h-3.5 -z-0 pointer-events-none"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 13 Q 28 6, 52 12 T 98 9"
                    fill="none"
                    stroke="#F5EFC0"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.85, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </span>

            <span className="block mt-1.5 sm:mt-2">
              {/* LinkedIn Marketing in Tactile Brand Pill */}
              <span className="relative inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#0A66C2]/30 border border-[#0A66C2]/50 backdrop-blur-sm text-sky-100 font-semibold align-middle text-[0.88em] shadow-sm">
                <span className="text-xs sm:text-sm">📱</span>
                <span>LinkedIn Marketing,</span>
                {/* Micro Squiggly Underline */}
                <motion.svg
                  className="absolute -bottom-2 left-2 right-2 w-[calc(100%-16px)] h-2 pointer-events-none"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 6 Q 25 1, 50 6 T 100 6"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>

              <span className="italic font-light text-white/80 font-serif mx-2.5">
                and
              </span>

              {/* Marketing Operations in Signature Terracotta Italic */}
              <span className="relative inline-block italic font-normal text-[#E5B887]" style={{ fontFamily: "var(--font-serif)" }}>
                Marketing Operations
                {/* Hand-Drawn Terracotta Curved Underline */}
                <motion.svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 pointer-events-none"
                  viewBox="0 0 120 16"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 2 9 C 35 15, 85 15, 118 5"
                    fill="none"
                    stroke="#B08968"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>
            </span>
          </motion.h1>

          {/* Paragraph (Exact Text Preserved) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base sm:text-lg mb-6 leading-relaxed text-white/85 max-w-xl"
          >
            {hero.paragraph}
          </motion.p>

          {/* Pinned Washi-Tape Motto Note (Playful Studio Desk Vibe) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02, rotate: 0, y: -2 }}
            className="relative inline-block mb-8 p-3 sm:p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl max-w-lg cursor-default group"
          >
            {/* Translucent Washi Tape Strip */}
            <div
              className="absolute -top-2.5 left-8 w-22 h-5 -rotate-2 rounded-[2px] opacity-90 shadow-sm pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(254, 205, 211, 0.85) 0%, rgba(253, 230, 138, 0.85) 100%)",
                backdropFilter: "blur(2px)",
              }}
            />
            <p
              className="text-sm sm:text-base text-amber-100/95 tracking-wide leading-snug"
              style={{ fontFamily: "var(--font-hand), 'Patrick Hand', 'Caveat', cursive" }}
            >
              📌 &ldquo;{personal.motto}&rdquo;
            </p>
          </motion.div>

          {/* Interactive CTAs & Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* Primary Magnetic Button */}
            <MagneticButton
              as="a"
              href={hero.ctaPrimary.href}
              className="inline-flex flex-col items-start gap-1.5 group"
            >
              <span className="w-full pb-1 px-1" style={{ borderBottom: "1px dashed rgba(255,255,255,0.45)" }} />
              <span className="flex items-center gap-2.5 px-1 text-sm font-bold tracking-wider uppercase text-white group-hover:text-amber-200 transition-colors">
                <span>View My Work</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </span>
              <span className="w-full pt-1 px-1" style={{ borderTop: "1px dashed rgba(255,255,255,0.45)" }} />
            </MagneticButton>

            {/* Secondary Connect Button */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-md transition-all duration-200 hover:border-white/40 shadow-sm"
            >
              <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Connect on LinkedIn</span>
              <span className="text-white/60">↗</span>
            </a>

            {/* Quick Experience Ticket Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-white/25 text-[11px] text-white/75 bg-black/20 backdrop-blur-sm">
              <span className="font-bold text-amber-200">{heroStat.value} {heroStat.label}</span>
              <span className="text-white/30">•</span>
              <span>2.8M+ Organic Reach</span>
            </div>
          </motion.div>

          {/* Mobile Badge Strip (Visible only on smaller screens) */}
          <div className="mt-8 pt-6 border-t border-white/10 flex lg:hidden flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold w-full block mb-1">
              Key Focus Areas:
            </span>
            {heroBadges.slice(0, 4).map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#1b1a1a] shadow-sm border border-black/10"
                style={{
                  background:
                    i === 0
                      ? "var(--pill-blue)"
                      : i === 1
                      ? "var(--pill-yellow)"
                      : i === 2
                      ? "var(--pill-mint)"
                      : "#fce7f3",
                }}
              >
                <span>{b.emoji}</span>
                <span>{b.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Floating Badges around the Portrait with Sine Floating Loops & Parallax */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {floatingBadges.map((badge) => (
            <motion.div
              key={badge.id}
              className={`absolute ${badge.pos} pointer-events-auto cursor-pointer select-none`}
              style={{
                x: mouseOffset.x * 0.75,
                y: mouseOffset.y * 0.75,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
                rotate: [badge.rotate, badge.rotate + 2.5, badge.rotate],
              }}
              transition={{
                opacity: { duration: 0.6, delay: badge.delay },
                scale: { duration: 0.6, delay: badge.delay },
                y: {
                  duration: badge.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: badge.duration * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.12, rotate: 0 }}
              onMouseEnter={() => setActiveBadge(badge.id)}
              onMouseLeave={() => setActiveBadge(null)}
            >
              <div
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1b1a1a] flex items-center gap-2 shadow-lg border border-black/10 backdrop-blur-md transition-shadow hover:shadow-xl"
                style={{ background: badge.bg }}
              >
                <span className="text-sm">{badge.emoji}</span>
                <span>{badge.label}</span>
              </div>

              {/* Hover Detail Tooltip */}
              <AnimatePresence>
                {activeBadge === badge.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg bg-[#1b1a1a]/95 text-white text-[11px] whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-30"
                  >
                    <span className="font-medium text-amber-200">✨ {badge.detail}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
