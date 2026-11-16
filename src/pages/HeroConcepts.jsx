import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { hero, profile, personal } from "../data/content";
import Hero from "../components/Hero";

/* =========================================================================
   COMMON HERO TEXT PROPS (VERBATIM ACCORDING TO USER REQUIREMENT)
   ========================================================================= */
const HERO_DATA = {
  badge: `${profile.name} — ${hero.badge}`,
  heading: hero.heading,
  paragraph: hero.paragraph,
  motto: personal.motto,
  primaryCta: "View My Work ↓",
  secondaryCta: "Connect on LinkedIn ↗",
};

/* =========================================================================
   CONCEPT 1: The Interactive Polaroid Shuffle & Studio Desk
   (Awwwards Drag & Click Polaroid Stack + Washi Tape Accents)
   ========================================================================= */
function Concept1PolaroidShuffle() {
  const initialCards = [
    {
      id: "card-1",
      title: "Priyanshi Gupta",
      subtitle: "Market Associate @ Track Opinion",
      tag: "STRATEGY & OPS",
      tagBg: "#ebfff4",
      img: "/hero-bg.png",
      rotate: -4,
      tapeColor: "linear-gradient(135deg, rgba(254, 205, 211, 0.9), rgba(253, 230, 138, 0.9))",
    },
    {
      id: "card-2",
      title: "LinkedIn Employee Advocacy",
      subtitle: "+3x Organic Reach Lift",
      tag: "SOCIAL GROWTH",
      tagBg: "#e0f6ff",
      img: "/case-studies/brand-awareness-1.jpg",
      rotate: 5,
      tapeColor: "linear-gradient(135deg, rgba(186, 230, 253, 0.9), rgba(254, 215, 170, 0.9))",
    },
    {
      id: "card-3",
      title: "2.8M+ Self-Run SMM",
      subtitle: "Viral Hook Scripting & Reels",
      tag: "VIRAL REACH",
      tagBg: "#f5efc0",
      img: "/case-studies/brand-awareness-2.jpg",
      rotate: -6,
      tapeColor: "linear-gradient(135deg, rgba(254, 240, 138, 0.9), rgba(253, 186, 116, 0.9))",
    },
    {
      id: "card-4",
      title: "Quirks Expo Kits",
      subtitle: "Flagship Event Brand Collaterals",
      tag: "EVENTS & EXPO",
      tagBg: "#fce7f3",
      img: "/case-studies/event-collaterals-1.jpg",
      rotate: 3,
      tapeColor: "linear-gradient(135deg, rgba(244, 114, 182, 0.85), rgba(253, 230, 138, 0.85))",
    },
  ];

  const [cards, setCards] = useState(initialCards);

  const shuffleTopCard = () => {
    setCards((prev) => {
      const copy = [...prev];
      const popped = copy.shift();
      copy.push(popped);
      return copy;
    });
  };

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Exact Headline with Staggered Kinetic Highlights */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Status Capsule */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-[var(--divider)] bg-[var(--surface)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span style={{ color: "var(--ink-soft)" }}>{HERO_DATA.badge}</span>
            <span className="text-stone-300">•</span>
            <span className="text-emerald-700 font-mono text-[11px]">Open to Roles</span>
          </div>

          {/* Heading with Kinetic Highlighter & Accents */}
          <h1
            className="font-normal tracking-tight leading-[1.12] text-[var(--ink)]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
            }}
          >
            <span>Driving Brand Growth </span>
            <span className="relative inline-block px-1">
              <span className="relative z-10 font-medium">Through Strategic Content,</span>
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-3 -z-0 pointer-events-none rounded-sm"
                style={{ background: "var(--pill-yellow)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
            <br className="hidden sm:inline" />
            <span className="relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[var(--pill-blue)] border border-sky-200 text-sky-900 text-[0.88em] font-semibold my-1 align-middle">
              <span>📱</span>
              <span>LinkedIn Marketing,</span>
            </span>{" "}
            <span>and </span>
            <span className="italic font-normal" style={{ color: "#B08968" }}>
              Marketing Operations
            </span>
          </h1>

          {/* Exact Paragraph */}
          <p className="text-base sm:text-lg leading-relaxed max-w-xl text-[var(--ink-soft)]">
            {HERO_DATA.paragraph}
          </p>

          {/* Washi-Tape Motto Note */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: 0 }}
            className="relative inline-block p-3 sm:p-3.5 rounded-xl bg-white border border-[var(--divider)] shadow-md -rotate-1 cursor-pointer max-w-lg"
          >
            <div
              className="absolute -top-2.5 left-6 w-20 h-5 -rotate-2 rounded-[2px] opacity-85 shadow-sm"
              style={{
                background: "linear-gradient(135deg, rgba(254, 205, 211, 0.9), rgba(253, 230, 138, 0.9))",
              }}
            />
            <p
              className="text-sm sm:text-base text-[var(--ink)] leading-snug"
              style={{ fontFamily: "var(--font-hand), 'Patrick Hand', cursive" }}
            >
              📌 &ldquo;{HERO_DATA.motto}&rdquo;
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg transition-transform hover:-translate-y-0.5 text-white bg-[var(--ink)]"
            >
              {HERO_DATA.primaryCta}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[var(--divider)] hover:bg-white transition-colors flex items-center gap-2"
            >
              <span>{HERO_DATA.secondaryCta}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Draggable / Clickable Polaroid Card Stack */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center pt-6 lg:pt-0">
          <div className="relative w-[280px] sm:w-[320px] h-[400px]">
            <AnimatePresence mode="popLayout">
              {cards.map((card, idx) => {
                const isTop = idx === 0;
                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{
                      scale: 1 - idx * 0.04,
                      y: idx * 10,
                      rotate: card.rotate,
                      opacity: 1,
                      zIndex: cards.length - idx,
                    }}
                    exit={{ scale: 1.1, opacity: 0, x: 120, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    drag={isTop}
                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (Math.abs(info.offset.x) > 60 || Math.abs(info.offset.y) > 60) {
                        shuffleTopCard();
                      }
                    }}
                    onClick={isTop ? shuffleTopCard : undefined}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
                  >
                    {/* Polaroid Card Body */}
                    <div className="relative w-full h-full bg-white p-3.5 pb-6 rounded-2xl shadow-2xl border border-[rgba(27,26,26,0.12)] flex flex-col justify-between">
                      {/* Realistic Washi Tape Clip */}
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-[2px] shadow-sm rotate-1 z-20 pointer-events-none opacity-90"
                        style={{ background: card.tapeColor }}
                      />

                      {/* Image Area */}
                      <div className="relative w-full h-[260px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: "85% 15%" }}
                        />
                        <span
                          className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
                          style={{ background: card.tagBg }}
                        >
                          {card.tag}
                        </span>
                      </div>

                      {/* Handwritten Caption Strip */}
                      <div className="mt-3 px-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-[var(--ink)] leading-tight">
                            {card.title}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-400">
                            0{idx + 1}/0{cards.length}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5 font-medium">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Shuffle Cue */}
          <button
            onClick={shuffleTopCard}
            className="mt-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[var(--divider)] bg-[var(--surface)] hover:bg-white transition-colors text-stone-600 shadow-sm"
          >
            <span>✨ Tap or Drag to Shuffle Cards</span>
            <span className="text-stone-400 font-mono">↻</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPT 2: The Interactive "Dual-Engine" Mode Switcher
   (Creative Strategy vs. Operations Dial with Dynamic Card Morph)
   ========================================================================= */
function Concept2DualEngineMorph() {
  const [activeMode, setActiveMode] = useState("creative"); // "creative" | "operations"

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Exact Text + Dynamic Dial Highlights */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Dial Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--divider)] shadow-inner">
            <button
              onClick={() => setActiveMode("creative")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeMode === "creative"
                  ? "bg-[var(--ink)] text-white shadow-md"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <span>📱 Creative & LinkedIn Strategy</span>
            </button>
            <button
              onClick={() => setActiveMode("operations")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeMode === "operations"
                  ? "bg-[#B08968] text-white shadow-md"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <span>⚙️ Marketing Operations & CRO</span>
            </button>
          </div>

          {/* Exact Headline with Dynamic Focus State */}
          <h1
            className="font-normal tracking-tight leading-[1.12] text-[var(--ink)]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
            }}
          >
            <span>Driving Brand Growth Through </span>
            <span
              className={`transition-all duration-300 ${
                activeMode === "creative"
                  ? "bg-[var(--pill-yellow)] px-2 py-0.5 rounded-lg font-semibold"
                  : "opacity-70"
              }`}
            >
              Strategic Content, LinkedIn Marketing,
            </span>{" "}
            <span>and </span>
            <span
              className={`italic transition-all duration-300 ${
                activeMode === "operations"
                  ? "text-[#B08968] font-semibold underline decoration-wavy decoration-[#B08968]"
                  : "opacity-70"
              }`}
            >
              Marketing Operations
            </span>
          </h1>

          {/* Exact Paragraph */}
          <p className="text-base sm:text-lg leading-relaxed max-w-xl text-[var(--ink-soft)]">
            {HERO_DATA.paragraph}
          </p>

          {/* Motto Note */}
          <div className="p-3.5 rounded-xl bg-white border border-[var(--divider)] shadow-sm max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
              Guiding Principle:
            </span>
            <p
              className="text-base text-[var(--ink)]"
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              &ldquo;{HERO_DATA.motto}&rdquo;
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase text-white shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ background: activeMode === "creative" ? "var(--ink)" : "#B08968" }}
            >
              {HERO_DATA.primaryCta}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[var(--divider)] hover:bg-white transition-colors"
            >
              {HERO_DATA.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right Column: Morphing Mode Visualizer */}
        <div className="lg:col-span-5 flex justify-center">
          <AnimatePresence mode="wait">
            {activeMode === "creative" ? (
              <motion.div
                key="creative-panel"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md p-6 rounded-3xl bg-white border border-[var(--divider)] shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    📱 VIRAL CREATIVE ENGINE
                  </span>
                  <span className="text-xs font-mono text-stone-400">Live Case Studies</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-[var(--pill-yellow)] border border-amber-200">
                    <span className="text-3xl font-bold text-[var(--ink)] block" style={{ fontFamily: "var(--font-serif)" }}>
                      2.8M+
                    </span>
                    <span className="text-xs text-stone-700 font-medium">Organic Reel Impressions</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--pill-blue)] border border-sky-200">
                    <span className="text-3xl font-bold text-[var(--ink)] block" style={{ fontFamily: "var(--font-serif)" }}>
                      3x
                    </span>
                    <span className="text-xs text-stone-700 font-medium">LinkedIn Employee Reach Lift</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                    Strategic Focus:
                  </span>
                  <ul className="text-xs text-stone-700 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Hook-first video scripting & trendjacking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Thought leadership carousels for Track Opinion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span> Employee Advocacy campaign pitched to leadership
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="ops-panel"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md p-6 rounded-3xl bg-[#1b1a1a] text-white border border-stone-800 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B08968]/30 text-[#e5b887] border border-[#B08968]/50">
                    ⚙️ MARKETING OPS COMMAND
                  </span>
                  <span className="text-xs font-mono text-stone-400">Audits & Certs</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
                    <span className="text-3xl font-bold text-amber-300 block" style={{ fontFamily: "var(--font-serif)" }}>
                      45+
                    </span>
                    <span className="text-xs text-stone-400 font-medium">B2B CRO Funnel Audits</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
                    <span className="text-3xl font-bold text-amber-300 block" style={{ fontFamily: "var(--font-serif)" }}>
                      3 Key
                    </span>
                    <span className="text-xs text-stone-400 font-medium">ISO & HIPAA Certifications</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                    Operations Governance:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-[11px] font-mono text-emerald-400">
                      ISO 20252
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-[11px] font-mono text-emerald-400">
                      ISO 27001
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-[11px] font-mono text-emerald-400">
                      HIPAA
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-stone-800 text-[11px] font-mono text-sky-400">
                      Vendor Coordination
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPT 3: The Interactive Bento Desk (Godly / ReadCV Bento Trend)
   ========================================================================= */
function Concept3BentoDesk() {
  const [activeMetric, setActiveMetric] = useState(0);

  const rotatingMetrics = [
    { label: "Viral Reel Impressions", val: "2.8M+", highlight: "Self-Run SMM Channel" },
    { label: "Organic Reach Growth", val: "3x", highlight: "LinkedIn Employee Advocacy" },
    { label: "Outbound CRO Audits", val: "45+", highlight: "B2B Enterprise Pipeline" },
    { label: "Experience in Growth", val: "2+ Yrs", highlight: "Brand Strategy & Ops" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % rotatingMetrics.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotatingMetrics.length]);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Top Bento Header Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main 2x2 Bento Tile: Exact Text */}
          <motion.div
            whileHover={{ y: -2 }}
            className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white border border-[var(--divider)] shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{HERO_DATA.badge}</span>
              </div>

              <h1
                className="font-normal tracking-tight text-[var(--ink)] leading-[1.12]"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
                }}
              >
                Driving Brand Growth Through{" "}
                <span className="bg-[var(--pill-yellow)] px-2 py-0.5 rounded-lg font-medium">
                  Strategic Content,
                </span>{" "}
                <span className="bg-[var(--pill-blue)] px-2 py-0.5 rounded-lg font-medium">
                  LinkedIn Marketing,
                </span>{" "}
                and{" "}
                <span className="italic" style={{ color: "#B08968" }}>
                  Marketing Operations
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[var(--ink-soft)] max-w-xl">
                {HERO_DATA.paragraph}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase text-white bg-[var(--ink)] shadow-md transition-transform hover:-translate-y-0.5"
              >
                {HERO_DATA.primaryCta}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[var(--divider)] hover:bg-stone-50 transition-colors"
              >
                {HERO_DATA.secondaryCta}
              </a>
            </div>
          </motion.div>

          {/* Right Column: Headshot Polaroid Bento Tile */}
          <motion.div
            whileHover={{ y: -2 }}
            className="lg:col-span-4 p-5 rounded-3xl bg-[var(--surface)] border border-[var(--divider)] shadow-xl flex flex-col justify-between"
          >
            <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
              <img
                src="/hero-bg.png"
                alt="Priyanshi Gupta"
                className="w-full h-full object-cover"
                style={{ objectPosition: "85% 15%" }}
              />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md text-stone-800 shadow">
                Gurgaon, IN 📍
              </span>
            </div>

            <div className="pt-4 px-1">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Primary Base
              </span>
              <h3 className="font-bold text-base text-[var(--ink)]">
                Track Opinion & Opinionest
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Market Research & Brand Intelligence
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bento Row: Live Split-Flap Ticker & Tactile Motto Sticky */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Animated Metric Split-Flap Ticker */}
          <motion.div
            whileHover={{ y: -2 }}
            className="md:col-span-6 p-6 rounded-3xl bg-white border border-[var(--divider)] shadow-lg flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Live Portfolio Metric:
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMetric}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span
                    className="text-4xl font-bold text-[var(--ink)] block"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {rotatingMetrics[activeMetric].val}
                  </span>
                  <span className="text-sm font-semibold text-stone-700 block mt-0.5">
                    {rotatingMetrics[activeMetric].label}
                  </span>
                  <span className="text-xs text-emerald-600 font-medium">
                    ✦ {rotatingMetrics[activeMetric].highlight}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-1">
              {rotatingMetrics.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMetric(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeMetric ? "bg-[var(--ink)] scale-125" : "bg-stone-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Sticky Motto Note */}
          <motion.div
            whileHover={{ y: -2 }}
            className="md:col-span-6 p-6 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-lg relative flex flex-col justify-between"
          >
            <div
              className="absolute -top-3 left-8 w-20 h-5 -rotate-1 rounded-[2px] opacity-80"
              style={{
                background: "linear-gradient(135deg, rgba(254, 205, 211, 0.9), rgba(253, 230, 138, 0.9))",
              }}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800/60 block mb-2">
              Personal Philosophy:
            </span>
            <p
              className="text-lg text-amber-950 leading-snug"
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              &ldquo;{HERO_DATA.motto}&rdquo;
            </p>
            <div className="pt-3 text-right">
              <span className="text-xs font-bold text-amber-900/60">— Priyanshi Gupta</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPT 4: The Kinetic Typewriter & Word Lens Popover
   (Awwwards Word Hover Expansion + Continuous Marquee Ticker)
   ========================================================================= */
function Concept4KineticLens() {
  const [hoveredWord, setHoveredWord] = useState(null);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-5xl w-full mx-auto space-y-8 text-center sm:text-left">
        {/* Top Status Capsule */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold border border-[var(--divider)] bg-[var(--surface)] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{HERO_DATA.badge}</span>
        </div>

        {/* Massive Interactive Headline with Word Lens Popovers */}
        <h1
          className="font-normal tracking-tight text-[var(--ink)] leading-[1.12]"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
            fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
          }}
        >
          <span>Driving Brand Growth Through </span>

          {/* Interactive Word 1: Strategic Content */}
          <span
            onMouseEnter={() => setHoveredWord("content")}
            onMouseLeave={() => setHoveredWord(null)}
            className="relative inline-block underline decoration-amber-400 decoration-wavy decoration-2 cursor-pointer hover:text-amber-700 transition-colors"
          >
            <span>Strategic Content,</span>
            {hoveredWord === "content" && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 -top-16 px-3 py-1.5 rounded-xl bg-[var(--ink)] text-white text-xs whitespace-nowrap shadow-2xl z-30 pointer-events-none"
              >
                ✨ High-Retention Hooks & Thought Leadership Carousels
              </motion.span>
            )}
          </span>{" "}

          {/* Interactive Word 2: LinkedIn Marketing */}
          <span
            onMouseEnter={() => setHoveredWord("linkedin")}
            onMouseLeave={() => setHoveredWord(null)}
            className="relative inline-block text-sky-700 cursor-pointer hover:underline"
          >
            <span>LinkedIn Marketing,</span>
            {hoveredWord === "linkedin" && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 -top-16 px-3 py-1.5 rounded-xl bg-[#0A66C2] text-white text-xs whitespace-nowrap shadow-2xl z-30 pointer-events-none"
              >
                📱 3x Reach Lift via Employee Advocacy Campaigns
              </motion.span>
            )}
          </span>{" "}

          <span>and </span>

          {/* Interactive Word 3: Marketing Operations */}
          <span
            onMouseEnter={() => setHoveredWord("ops")}
            onMouseLeave={() => setHoveredWord(null)}
            className="relative inline-block italic cursor-pointer hover:text-amber-800"
            style={{ color: "#B08968" }}
          >
            <span>Marketing Operations</span>
            {hoveredWord === "ops" && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-1/2 -translate-x-1/2 -top-16 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs whitespace-nowrap shadow-2xl z-30 pointer-events-none"
              >
                ⚙️ ISO 20252, 27001, HIPAA & 45+ CRO Funnels
              </motion.span>
            )}
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-lg sm:text-xl leading-relaxed text-[var(--ink-soft)] max-w-3xl">
          {HERO_DATA.paragraph}
        </p>

        {/* Washi Motto Strip */}
        <div className="inline-block p-4 rounded-2xl bg-white border border-[var(--divider)] shadow-md">
          <p
            className="text-base sm:text-lg text-[var(--ink)]"
            style={{ fontFamily: "var(--font-hand), cursive" }}
          >
            📌 &ldquo;{HERO_DATA.motto}&rdquo;
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <a
            href="#projects"
            className="px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase text-white bg-[var(--ink)] shadow-xl transition-transform hover:-translate-y-0.5"
          >
            {HERO_DATA.primaryCta}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-full text-sm font-semibold tracking-wide border border-[var(--divider)] hover:bg-white transition-colors flex items-center gap-2"
          >
            <span>{HERO_DATA.secondaryCta}</span>
          </a>
        </div>

        {/* Live Marquee Ticker */}
        <div className="pt-10 overflow-hidden border-t border-[var(--divider)]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold mx-6">
                ✦ PRIYANSHI GUPTA ✦ LINKEDIN STRATEGY ✦ 2.8M+ VIEWS ✦ CRO FUNNELS ✦ MARKETING OPERATIONS ✦
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CONCEPT 5: The Interactive Creative Envelope Vault
   (Matching User's Favorite Envelope Mechanic: Click to Fan Out Cards)
   ========================================================================= */
function Concept5EnvelopeVault() {
  const [isOpen, setIsOpen] = useState(false);

  const vaultCards = [
    { title: "LinkedIn Designs", emoji: "📱", stat: "+3x Reach", bg: "var(--pill-blue)", rot: -16, x: -60, y: -40 },
    { title: "Viral SMM Reels", emoji: "🎬", stat: "2.8M+ Views", bg: "var(--pill-yellow)", rot: -5, x: -20, y: -70 },
    { title: "Quirks Expo Kits", emoji: "🎪", stat: "Flagship", bg: "var(--pill-mint)", rot: 6, x: 20, y: -70 },
    { title: "ISO Operations", emoji: "🤝", stat: "ISO 20252", bg: "#fce7f3", rot: 17, x: 60, y: -40 },
  ];

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Exact Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[var(--divider)] bg-[var(--surface)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{HERO_DATA.badge}</span>
          </div>

          <h1
            className="font-normal tracking-tight text-[var(--ink)] leading-[1.12]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
            }}
          >
            Driving Brand Growth Through{" "}
            <span className="bg-[var(--pill-yellow)] px-2 py-0.5 rounded-lg font-semibold">
              Strategic Content,
            </span>{" "}
            <span className="bg-[var(--pill-blue)] px-2 py-0.5 rounded-lg font-semibold">
              LinkedIn Marketing,
            </span>{" "}
            and{" "}
            <span className="italic" style={{ color: "#B08968" }}>
              Marketing Operations
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[var(--ink-soft)] max-w-xl">
            {HERO_DATA.paragraph}
          </p>

          <div className="p-3.5 rounded-xl bg-white border border-[var(--divider)] shadow-md max-w-lg -rotate-1">
            <p
              className="text-base text-[var(--ink)]"
              style={{ fontFamily: "var(--font-hand), cursive" }}
            >
              📌 &ldquo;{HERO_DATA.motto}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase text-white bg-[var(--ink)] shadow-lg"
            >
              {HERO_DATA.primaryCta}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-[var(--divider)] hover:bg-white transition-colors"
            >
              {HERO_DATA.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Envelope / Vault */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center pt-8 lg:pt-0">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-[300px] h-[220px] cursor-pointer select-none group"
          >
            {/* Cards sneak out / fan out */}
            {vaultCards.map((card, i) => (
              <motion.div
                key={i}
                animate={
                  isOpen
                    ? {
                        x: card.x * 2.2,
                        y: card.y * 1.6,
                        rotate: card.rot,
                        scale: 1,
                        opacity: 1,
                      }
                    : {
                        x: (i - 1.5) * 8,
                        y: -30,
                        rotate: (i - 1.5) * 4,
                        scale: 0.9,
                        opacity: 0.9,
                      }
                }
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute left-1/2 -translate-x-1/2 top-4 w-44 p-3 rounded-2xl border border-black/10 shadow-xl flex items-center justify-between"
                style={{ background: card.bg, zIndex: isOpen ? 30 + i : 5 + i }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{card.emoji}</span>
                  <div>
                    <h5 className="text-xs font-bold text-[#1b1a1a]">{card.title}</h5>
                    <span className="text-[10px] text-stone-600 font-medium">{card.stat}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Purple Creative Vault Envelope */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 shadow-2xl flex flex-col justify-between z-20 transition-transform group-hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-indigo-200">
                  CREATIVE VAULT
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-mono">
                  {isOpen ? "TAP TO CLOSE" : "TAP TO OPEN"}
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-bold tracking-tight">CONTENT</h4>
                <p className="text-xs text-indigo-200 mt-0.5 font-medium">
                  Priyanshi&apos;s Strategy Deck
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-indigo-500/50">
                <span className="text-[11px] text-indigo-300 font-mono">
                  {isOpen ? "✦ 4 Decks Unlocked" : "✦ Hover or click to open"}
                </span>
                <span className="text-base">{isOpen ? "📂" : "📁"}</span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs font-semibold text-stone-500 uppercase tracking-wider text-center">
            {isOpen ? "✨ Click vault again to tuck cards back" : "✨ Click purple vault to fan out work cards"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN COMPARISON PAGE WITH TAB SWITCHER
   ========================================================================= */
export default function HeroConcepts() {
  const [selectedConcept, setSelectedConcept] = useState("current-enhanced");

  const concepts = [
    {
      id: "current-enhanced",
      label: "✨ 1. 3D Swarm & Parallax (Live on Home)",
      tag: "Active on Home",
    },
    {
      id: "option-1",
      label: "🃏 2. Polaroid Deck Shuffle",
      tag: "Awwwards Drag & Click",
    },
    {
      id: "option-2",
      label: "🎛️ 3. Dual-Engine Switcher",
      tag: "Creative vs Ops Morph",
    },
    {
      id: "option-3",
      label: "🍱 4. Interactive Bento Desk",
      tag: "Godly / ReadCV Bento",
    },
    {
      id: "option-4",
      label: "🔍 5. Kinetic Word Lens",
      tag: "Hover Popover & Marquee",
    },
    {
      id: "option-5",
      label: "💌 6. Creative Vault Envelope",
      tag: "Fan-Out Card Deck",
    },
    {
      id: "stacked",
      label: "📜 View All 6 Stacked",
      tag: "Side-by-Side Comparison",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-transparent text-[var(--ink)]">
      {/* Sticky Top Control Bar */}
      <div className="sticky top-20 z-50 max-w-6xl mx-auto px-4 mb-8">
        <div className="p-2 sm:p-3 rounded-2xl bg-[var(--surface)] border border-[var(--divider)] shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-[var(--divider)] hover:bg-white transition-colors"
            >
              ← Back to Home
            </Link>
            <span className="text-xs font-semibold hidden sm:inline" style={{ color: "var(--ink-soft)" }}>
              Animated Hero Variations:
            </span>
          </div>

          {/* Switcher Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {concepts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedConcept(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedConcept === c.id
                    ? "bg-[var(--ink)] text-[var(--surface)] shadow-md"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-white/50"
                }`}
              >
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Selected View */}
      {selectedConcept === "stacked" ? (
        <div className="space-y-24">
          <section className="border-b-4 border-dashed border-[var(--divider)] pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-widest">
                Design 1: 3D Swarm & Parallax (Currently Active on Home)
              </span>
            </div>
            <Hero />
          </section>

          <section className="border-b-4 border-dashed border-[var(--divider)] pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 uppercase tracking-widest">
                Design 2: Interactive Polaroid Shuffle (Drag or Click to Cycle)
              </span>
            </div>
            <Concept1PolaroidShuffle />
          </section>

          <section className="border-b-4 border-dashed border-[var(--divider)] pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 uppercase tracking-widest">
                Design 3: Dual-Engine Switcher (Creative Strategy vs. Operations Dial)
              </span>
            </div>
            <Concept2DualEngineMorph />
          </section>

          <section className="border-b-4 border-dashed border-[var(--divider)] pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-widest">
                Design 4: Interactive Bento Desk (Godly / ReadCV Bento Grid)
              </span>
            </div>
            <Concept3BentoDesk />
          </section>

          <section className="border-b-4 border-dashed border-[var(--divider)] pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 uppercase tracking-widest">
                Design 5: Kinetic Word Lens (Hover Word Popovers & Marquee Ticker)
              </span>
            </div>
            <Concept4KineticLens />
          </section>

          <section className="pb-16">
            <div className="max-w-6xl mx-auto px-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 uppercase tracking-widest">
                Design 6: Creative Vault Envelope (Fan-Out Card Deck on Click)
              </span>
            </div>
            <Concept5EnvelopeVault />
          </section>
        </div>
      ) : (
        <div>
          {selectedConcept === "current-enhanced" && <Hero />}
          {selectedConcept === "option-1" && <Concept1PolaroidShuffle />}
          {selectedConcept === "option-2" && <Concept2DualEngineMorph />}
          {selectedConcept === "option-3" && <Concept3BentoDesk />}
          {selectedConcept === "option-4" && <Concept4KineticLens />}
          {selectedConcept === "option-5" && <Concept5EnvelopeVault />}
        </div>
      )}
    </div>
  );
}
