import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaLightbox from "./MediaLightbox";
import { Reveal } from "./Reveal";

/**
 * 5 Case Study File Cards matching the exact layout, styling,
 * colors, and proportions of Image 2.
 */
const CASE_FILES = [
  {
    id: "case-01",
    tab: "01.",
    tabBg: "#e2e8f0",
    tabColor: "#334155",
    emoji: "🏢",
    title: "Office Inauguration Event",
    subtitle: "Flagship Office Launch",
    realTitle: "Office Inauguration Event",
    titleColor: "#1e293b",
    gist: "Coordinated the flagship office launch end-to-end — vendors, signage, experiential design, and on-ground flow.",
    images: [
      "/case-studies/office-2.jpg",
      "/case-studies/office-3.jpg",
      "/case-studies/office-1.jpg",
      "/case-studies/office-4.jpg",
    ],
  },
  {
    id: "case-02",
    tab: "02.",
    tabBg: "#dcfce7",
    tabColor: "#166534",
    emoji: "🎪",
    title: "Quirks Event Collaterals",
    subtitle: "Expo Branding & Video",
    realTitle: "Quirks Event Collaterals",
    titleColor: "#059669",
    gist: "Designed the collateral set for Quirks — banners, booth signage, video promo, and on-site brand creative.",
    images: ["/case-studies/quirks-1.png", "/case-studies/quirks-2.jpg"],
    video: "/case-studies/quirks-video.mp4",
  },
  {
    id: "case-03",
    tab: "03.",
    tabBg: "#fef3c7",
    tabColor: "#92400e",
    emoji: "🏷️",
    title: "LinkedIn Marketing Designs",
    subtitle: "High-Engagement Visuals",
    realTitle: "LinkedIn Marketing Designs",
    titleColor: "#d97706",
    gist: "Visual design for high-engagement LinkedIn posts, carousel decks, and employee advocacy brand campaigns.",
    images: [
      "/case-studies/quirks-1.png",
      "/case-studies/office-2.jpg",
    ],
  },
  {
    id: "case-04",
    tab: "04.",
    tabBg: "#fce7f3",
    tabColor: "#9d174d",
    emoji: "🎨",
    title: "Instagram Stories",
    subtitle: "Interactive Story Creatives",
    realTitle: "Instagram Creative Series",
    titleColor: "#db2777",
    gist: "Story-format creative for Instagram — interactive stickers, behind-the-scenes, and visual announcements.",
    images: [
      "/case-studies/office-3.jpg",
      "/case-studies/office-4.jpg",
    ],
  },
  {
    id: "case-05",
    tab: "05.",
    tabBg: "#cdecef", // Exact soft powder aqua / icy cyan pastel from reference image
    tabColor: "#0e7490", // Deep muted cyan tab text from reference image
    title: "Captures",
    realTitle: "Captures • Event & BTS Snaps",
    titleColor: "#2a8b89", // Exact soft muted teal from reference image
    gist: "Candid on-ground moments, raw event snaps, and visual production highlights from project execution.",
    images: [
      "/case-studies/office-1.jpg",
      "/case-studies/office-2.jpg",
      "/case-studies/office-3.jpg",
    ],
  },
];

/**
 * Authentic Vintage Retro Camera Sticker Icon matching Image 2
 */
function VintageCameraIcon({ className = "w-11 h-8" }) {
  return (
    <svg
      viewBox="0 0 48 36"
      className={`${className} filter drop-shadow-sm select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop shadow ground */}
      <ellipse cx="24" cy="34" rx="16" ry="1.5" fill="rgba(0,0,0,0.16)" />

      {/* Top shutter button (metallic cylinder) */}
      <rect x="8.5" y="3.5" width="5.5" height="4" rx="1" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />

      {/* Top flash prism / hot shoe */}
      <path d="M18.5 4.5h11v2.5h-11z" fill="#64748b" stroke="#475569" strokeWidth="0.8" />
      <rect x="22" y="5.2" width="4" height="1.8" rx="0.5" fill="#e2e8f0" />

      {/* Top right winding dial */}
      <rect x="34.5" y="4" width="5" height="3" rx="1" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />

      {/* Main Camera Body (Dark charcoal with rounded corners) */}
      <rect x="4" y="7" width="40" height="25" rx="4" fill="#242426" stroke="#18181b" strokeWidth="1.2" />

      {/* Metallic Silver Top Plate */}
      <path d="M4 11.5V9a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v2.5H4z" fill="url(#silver-grad-cam)" stroke="#94a3b8" strokeWidth="0.8" />

      {/* Leatherette Body Textured Inset */}
      <rect x="5.5" y="12.5" width="37" height="18" rx="2" fill="#1c1c1e" />

      {/* Small Optical Viewfinder Window on top right */}
      <rect x="33" y="8.5" width="5.5" height="3.2" rx="0.8" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.6" />
      <rect x="34" y="9.2" width="2" height="1" fill="#ffffff" opacity="0.85" />

      {/* Center Circular Lens Bezel (Silver Chrome) */}
      <circle cx="24" cy="21.5" r="9.2" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
      <circle cx="24" cy="21.5" r="7.8" fill="#cbd5e1" />

      {/* Inner Lens Barrel (Dark Slate & Deep Cyan Core) */}
      <circle cx="24" cy="21.5" r="6.6" fill="#18181b" />
      <circle cx="24" cy="21.5" r="5" fill="#0e7490" />
      <circle cx="24" cy="21.5" r="3.6" fill="#164e63" />

      {/* Specular Curved Reflection on Glass */}
      <path d="M21 18.2a4 4 0 0 1 4.5-1" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
      <circle cx="26" cy="24" r="0.9" fill="#ffffff" opacity="0.8" />

      {/* Small Red Logo Dot (classic retro badge) */}
      <circle cx="10" cy="15.5" r="1.6" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.4" />

      <defs>
        <linearGradient id="silver-grad-cam" x1="4" y1="7" x2="44" y2="11.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Spacious cloud speech bubble SVG paths with outward-bulging scalloped lobes
 * and directional pointer tails directing focus to each card quadrant.
 * Scaled at 520x260 with generous, equal margins and padding for all card details.
 */
const CLOUD_PATHS = {
  "up-left":
    "M 260.0 224.6 C 237.0 237.7 202.9 234.7 182.6 218.0 C 159.9 227.5 130.2 219.6 115.1 200.3 C 94.2 206.5 71.7 195.3 64.2 174.8 C 45.0 174.8 33.4 160.2 37.6 141.6 C 22.7 132.0 22.7 116.9 37.6 107.3 C 33.5 88.8 45.3 74.7 64.2 75.2 C 71.5 54.5 93.9 42.9 115.1 48.7 Q 114.6 29.8 114.0 3.3 Q 154.0 19.5 182.6 31.0 C 203.1 14.5 237.2 12.1 260.0 25.4 C 282.8 12.1 316.9 14.5 337.4 31.0 C 360.1 21.5 389.8 29.3 404.9 48.7 C 425.8 42.5 448.3 53.7 455.8 74.1 C 475.0 74.1 486.6 88.7 482.4 107.3 C 497.3 116.9 497.3 132.0 482.4 141.6 C 486.6 160.2 475.0 174.8 455.8 174.8 C 448.3 195.3 425.8 206.5 404.9 200.3 C 389.8 219.6 360.1 227.5 337.4 218.0 C 317.1 234.7 283.0 237.7 260.0 224.6 Z",
  "up-right":
    "M 260.0 224.6 C 237.0 237.7 202.9 234.7 182.6 218.0 C 159.9 227.5 130.2 219.6 115.1 200.3 C 94.2 206.5 71.7 195.3 64.2 174.8 C 45.0 174.8 33.4 160.2 37.6 141.6 C 22.7 132.0 22.7 116.9 37.6 107.3 C 33.5 88.8 45.3 74.7 64.2 75.2 C 71.5 54.5 93.9 42.9 115.1 48.7 C 130.2 29.3 159.9 21.5 182.6 31.0 C 203.1 14.5 237.2 12.1 260.0 25.4 Q 320.9 16.3 406.0 3.3 Q 366.0 19.5 337.4 31.0 C 360.1 21.5 389.8 29.3 404.9 48.7 C 425.8 42.5 448.3 53.7 455.8 74.1 C 475.0 74.1 486.6 88.7 482.4 107.3 C 497.3 116.9 497.3 132.0 482.4 141.6 C 486.6 160.2 475.0 174.8 455.8 174.8 C 448.3 195.3 425.8 206.5 404.9 200.3 C 389.8 219.6 360.1 227.5 337.4 218.0 C 317.1 234.7 283.0 237.7 260.0 224.6 Z",
  "down-left":
    "M 260.0 224.6 C 237.0 237.7 202.9 234.7 182.6 218.0 C 159.9 227.5 130.2 219.6 115.1 200.3 Q 70.8 197.0 8.9 192.5 Q 41.2 182.2 64.2 174.8 C 45.0 174.8 33.4 160.2 37.6 141.6 C 22.7 132.0 22.7 116.9 37.6 107.3 C 33.5 88.8 45.3 74.7 64.2 75.2 C 71.5 54.5 93.9 42.9 115.1 48.7 C 130.2 29.3 159.9 21.5 182.6 31.0 C 203.1 14.5 237.2 12.1 260.0 25.4 C 282.8 12.1 316.9 14.5 337.4 31.0 C 360.1 21.5 389.8 29.3 404.9 48.7 C 425.8 42.5 448.3 53.7 455.8 74.1 C 475.0 74.1 486.6 88.7 482.4 107.3 C 497.3 116.9 497.3 132.0 482.4 141.6 C 486.6 160.2 475.0 174.8 455.8 174.8 C 448.3 195.3 425.8 206.5 404.9 200.3 C 389.8 219.6 360.1 227.5 337.4 218.0 C 317.1 234.7 283.0 237.7 260.0 224.6 Z",
  "down-right":
    "M 260.0 224.6 C 237.0 237.7 202.9 234.7 182.6 218.0 C 159.9 227.5 130.2 219.6 115.1 200.3 C 94.2 206.5 71.7 195.3 64.2 174.8 C 45.0 174.8 33.4 160.2 37.6 141.6 C 22.7 132.0 22.7 116.9 37.6 107.3 C 33.5 88.8 45.3 74.7 64.2 75.2 C 71.5 54.5 93.9 42.9 115.1 48.7 C 130.2 29.3 159.9 21.5 182.6 31.0 C 203.1 14.5 237.2 12.1 260.0 25.4 C 282.8 12.1 316.9 14.5 337.4 31.0 C 360.1 21.5 389.8 29.3 404.9 48.7 C 425.8 42.5 448.3 53.7 455.8 74.1 C 475.0 74.1 486.6 88.7 482.4 107.3 C 497.3 116.9 497.3 132.0 482.4 141.6 C 486.6 160.2 475.0 174.8 455.8 174.8 Q 478.8 182.2 511.1 192.5 Q 449.2 197.0 404.9 200.3 C 389.8 219.6 360.1 227.5 337.4 218.0 C 317.1 234.7 283.0 237.7 260.0 224.6 Z",
  bottom:
    "M 260.0 224.6 C 237.0 237.7 202.9 234.7 182.6 218.0 C 159.9 227.5 130.2 219.6 115.1 200.3 C 94.2 206.5 71.7 195.3 64.2 174.8 C 45.0 174.8 33.4 160.2 37.6 141.6 C 22.7 132.0 22.7 116.9 37.6 107.3 C 33.5 88.8 45.3 74.7 64.2 75.2 C 71.5 54.5 93.9 42.9 115.1 48.7 C 130.2 29.3 159.9 21.5 182.6 31.0 C 203.1 14.5 237.2 12.1 260.0 25.4 C 282.8 12.1 316.9 14.5 337.4 31.0 C 360.1 21.5 389.8 29.3 404.9 48.7 C 425.8 42.5 448.3 53.7 455.8 74.1 C 475.0 74.1 486.6 88.7 482.4 107.3 C 497.3 116.9 497.3 132.0 482.4 141.6 C 486.6 160.2 475.0 174.8 455.8 174.8 C 448.3 195.3 425.8 206.5 404.9 200.3 C 389.8 219.6 360.1 227.5 337.4 218.0 Q 314.4 234.1 282.1 256.7 Q 269.2 238.0 260.0 224.6 Z",
};

const DIRECTION_OFFSETS = {
  "up-left": { x: -8, y: -6 },
  "up-right": { x: 8, y: -6 },
  "down-left": { x: -8, y: 6 },
  "down-right": { x: 8, y: 6 },
  bottom: { x: 0, y: 4 },
};

/**
 * Central "Spotlight" Cloud Speech Bubble in the Open Center Beam.
 * Generously sized (520x260) with perfect, equal gaps on both sides so all
 * card text and action cues sit comfortably inside the cloud belly.
 */
function CentralSpotlightCloud({
  file,
  direction = "bottom",
  deliverableLabel,
  mediaCount,
  onOpen,
  onMouseEnter,
  onMouseLeave,
}) {
  const countText =
    deliverableLabel ||
    (mediaCount !== undefined
      ? `${mediaCount} ${mediaCount === 1 ? "deliverable" : "deliverables"}`
      : null);

  const path = CLOUD_PATHS[direction] || CLOUD_PATHS.bottom;
  const offset = DIRECTION_OFFSETS[direction] || { x: 0, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: offset.x, y: offset.y + 6 }}
      animate={{ opacity: 1, scale: 1, x: offset.x, y: offset.y }}
      exit={{ opacity: 0, scale: 0.92, x: offset.x, y: offset.y + 6 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="absolute top-[65px] left-1/2 -translate-x-1/2 z-40 w-[460px] sm:w-[520px] select-none cursor-pointer"
      onClick={onOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full h-[230px] sm:h-[260px]">
        {/* Cloud Speech Bubble SVG Contour with Directed Tail */}
        <svg
          viewBox="0 0 520 260"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 18px 36px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.04))",
          }}
        >
          <path
            d={path}
            fill="rgba(253, 251, 247, 0.98)"
            stroke="rgba(27, 26, 26, 0.16)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>

        {/* Content Nested Safely in the Center of the Cloud with Equal Generous Gaps */}
        <div className="relative z-10 px-12 sm:px-[82px] py-6 text-left flex flex-col justify-center h-full">
          {/* Category Pill Tag & Media Count */}
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-2xs"
              style={{
                background: file.tabBg,
                color: file.tabColor,
                border: "1px solid rgba(27, 26, 26, 0.1)",
              }}
            >
              Case {file.tab}
            </span>
            {countText && (
              <span className="text-[11px] font-medium text-slate-500">
                {countText}
              </span>
            )}
          </div>

          {/* Title in Signature Editorial Serif */}
          <h5
            className="font-normal text-[15.5px] sm:text-[16px] leading-snug mb-1"
            style={{
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
              color: file.titleColor,
            }}
          >
            {file.realTitle || file.title}
          </h5>

          {/* Description in Warm Ink */}
          <p className="text-[11.5px] sm:text-[12px] text-[#1b1a1a]/85 leading-relaxed font-normal">
            {file.gist}
          </p>

          {/* Bottom Callout: Tap to see images & deliverables */}
          <div className="mt-2.5 pt-2 border-t border-[rgba(27,26,26,0.08)] flex items-center justify-between">
            <span
              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#7c5cfc] tracking-wide"
              style={{
                fontFamily: "'Patrick Hand', 'Chalkboard SE', cursive, sans-serif",
              }}
            >
              <span>✨ Tap to see images & deliverables</span>
              <span className="text-[10px] opacity-90">↗</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              Click to open
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Horizontal Folder Card for outer 4 cards (01, 02, 03, 04)
 */
function HorizontalFolderCard({ file, isHovered, onHover, onLeave, onOpen, arcRotation = 0 }) {
  return (
    <div
      className="relative select-none"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => onOpen(file)}
    >
      <motion.div
        animate={{
          y: isHovered ? -7 : 0,
          rotate: isHovered ? 0 : arcRotation,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="relative group cursor-pointer"
      >
        {/* Top Folder Tab (Curved tab with only number, matching Image 2) */}
        <div className="flex">
          <div
            className="inline-flex items-center justify-center px-4 py-1 rounded-t-xl text-xs font-black shadow-2xs"
            style={{
              background: file.tabBg,
              color: file.tabColor,
              borderTop: "1.5px solid rgba(27,26,26,0.12)",
              borderLeft: "1.5px solid rgba(27,26,26,0.12)",
              borderRight: "1.5px solid rgba(27,26,26,0.12)",
              marginBottom: "-1.5px",
            }}
          >
            <span>{file.tab}</span>
          </div>
        </div>

        {/* Card Body - Increased Length for Full Content Display */}
        <div
          className="relative rounded-2xl rounded-tl-none bg-white flex items-center gap-4 px-5 py-3.5 sm:py-4 transition-shadow duration-300 shadow-md group-hover:shadow-2xl"
          style={{
            width: "100%",
            minWidth: 240,
            maxWidth: 290,
            border: "1.5px solid rgba(27,26,26,0.12)",
            boxShadow: isHovered
              ? "0 20px 35px -10px rgba(124, 92, 252, 0.28), 0 4px 10px rgba(0,0,0,0.06)"
              : "0 8px 20px -6px rgba(100, 80, 200, 0.12), 0 2px 4px rgba(0,0,0,0.03)",
          }}
        >
          {/* Sticker on Left: Vintage Camera Icon for 05, Emoji for 01-04 */}
          <div className="select-none flex-shrink-0 filter drop-shadow-xs flex items-center justify-center">
            {file.id === "case-05" ? (
              <VintageCameraIcon className="w-10 h-7.5" />
            ) : (
              <span className="text-2xl sm:text-3xl leading-none">{file.emoji}</span>
            )}
          </div>

          {/* Title and Subtitle Stacked on Right - Full Display Without Truncation */}
          <div className="min-w-0 flex-1">
            <h4
              className="font-bold leading-snug"
              style={{
                color: file.titleColor,
                fontFamily: file.id === "case-05" ? "'Patrick Hand', 'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif" : "var(--font-serif), Georgia, serif",
                fontSize: file.id === "case-05" ? "1.45rem" : "15.5px",
                letterSpacing: file.id === "case-05" ? "0.02em" : "-0.01em",
              }}
            >
              {file.title}
            </h4>
            {file.subtitle && (
              <p className="text-[12px] text-slate-500 font-medium leading-tight mt-0.5">
                {file.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Purple Cursor & Pill Tooltip on Hover (Exact representation from Image 2) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 4 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="absolute -bottom-11 -right-3 z-50 pointer-events-none flex items-center gap-1.5"
            >
              {/* Cute Purple Pointer Arrow (matching Image 2) */}
              {/* <svg className="w-5 h-5 text-[#7c5cfc] filter drop-shadow-sm rotate-[-15deg]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg> */}

              {/* Purple "Open this" Pill (exact text & shape from Image 2) */}
              {/* <div
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #7c5cfc 0%, #6355d8 100%)",
                  boxShadow: "0 10px 25px -4px rgba(124, 92, 252, 0.6)",
                  fontFamily: "'Patrick Hand', 'Chalkboard SE', cursive, sans-serif",
                }}
              >
                <span>Open this</span>
                <span className="text-[10px] opacity-80">↗</span>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function CaseStudies({ className = "max-w-5xl mx-auto" }) {
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);
  const stageRef = useRef(null);
  const [stageWidth, setStageWidth] = useState(928);

  useEffect(() => {
    if (!stageRef.current) return;
    const updateWidth = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const activeHoveredFile = CASE_FILES.find((f) => f.id === hoveredId);

  function handleOpenCard(file) {
    const media = [
      ...(file.video ? [{ type: "video", src: file.video }] : []),
      ...(file.images ? file.images.map((src) => ({ type: "image", src })) : []),
    ];
    if (media.length > 0) {
      setActiveMedia({
        title: file.realTitle || file.title,
        items: media,
      });
      setActiveMediaIndex(0);
    }
  }

  // Base offsets from resting position to center of envelope pocket
  const cardW = 275;
  const halfCardW = cardW / 2;
  const pocketY = 440;

  const baseOffsets = {
    "case-01": {
      x: 0.49 * stageWidth - halfCardW,
      y: pocketY - 12,
    },
    "case-02": {
      x: -(0.49 * stageWidth - halfCardW),
      y: pocketY - 20,
    },
    "case-03": {
      x: 0.50 * stageWidth - halfCardW,
      y: pocketY - 290,
    },
    "case-04": {
      x: -(0.50 * stageWidth - halfCardW),
      y: pocketY - 302,
    },
  };

  function getCardMotionProps(cardId, restingRotation, openDelay = 0) {
    const base = baseOffsets[cardId] || { x: 0, y: 0 };

    if (isEnvelopeOpen) {
      return {
        animate: {
          x: 0,
          y: 0,
          rotate: restingRotation,
          scale: 1,
          opacity: 1,
        },
        transition: {
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.85,
          delay: openDelay,
        },
      };
    }

    if (isEnvelopeHovered) {
      // SNEAK PEEK on envelope hover: Cards peek up and fan out from the envelope pocket!
      const sneakConfigs = {
        "case-01": { dx: -65, dy: -70, rotate: -14, scale: 0.88 },
        "case-02": { dx: -32, dy: -86, rotate: -7, scale: 0.89 },
        "case-03": { dx: 0, dy: -100, rotate: 0, scale: 0.90 },
        "case-04": { dx: 32, dy: -86, rotate: 7, scale: 0.89 },
      };
      const cfg = sneakConfigs[cardId] || { dx: 0, dy: 0, rotate: 0, scale: 0.88 };
      return {
        animate: {
          x: base.x + cfg.dx,
          y: base.y + cfg.dy,
          rotate: cfg.rotate,
          scale: cfg.scale,
          opacity: 1,
        },
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 24,
        },
      };
    }

    // CLOSED: Cards rest tucked inside the envelope pocket, tabs subtly peeking
    const closedConfigs = {
      "case-01": { dx: -24, dy: 24, rotate: -8, scale: 0.84 },
      "case-02": { dx: -12, dy: 18, rotate: -4, scale: 0.84 },
      "case-03": { dx: 0, dy: 14, rotate: 0, scale: 0.85 },
      "case-04": { dx: 12, dy: 18, rotate: 4, scale: 0.84 },
    };
    const cfg = closedConfigs[cardId] || { dx: 0, dy: 0, rotate: 0, scale: 0.84 };
    return {
      animate: {
        x: base.x + cfg.dx,
        y: base.y + cfg.dy,
        rotate: cfg.rotate,
        scale: cfg.scale,
        opacity: 1,
      },
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 26,
      },
    };
  }

  function getCard05MotionProps() {
    if (isEnvelopeOpen) {
      return {
        animate: {
          x: 0,
          y: hoveredId === CASE_FILES[4].id ? -24 : 0,
          rotate: 0,
          scale: hoveredId === CASE_FILES[4].id ? 1.03 : 1,
          opacity: 1,
        },
        transition: {
          type: "spring",
          stiffness: 380,
          damping: 24,
        },
      };
    }

    if (isEnvelopeHovered) {
      return {
        animate: {
          x: 65,
          y: -16, // Relative to -top-16 (-64px), so it's ~80px above folder top!
          rotate: 14,
          scale: 0.88,
          opacity: 1,
        },
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 24,
        },
      };
    }

    // CLOSED
    return {
      animate: {
        x: 24,
        y: 65,
        rotate: 8,
        scale: 0.84,
        opacity: 1,
      },
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 26,
      },
    };
  }

  return (
    <div className={className}>
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <Reveal blur as="h2" className="font-normal mb-2.5 block text-center" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--ink)", fontFamily: "var(--font-serif)" }}>
          A Peek Behind the Work
        </Reveal>
        <Reveal delay={0.05} as="p" className="text-sm sm:text-base max-w-xl mx-auto block text-center leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          A curated collection of campaign deliverables, event collaterals, and brand assets. Click the envelope to explore.
        </Reveal>
      </div>

      {/* Main Canvas Stage with Graph Grid & Conical Spotlight Beam */}
      <div
        className="relative rounded-[2.5rem] p-6 sm:p-10 lg:p-12 overflow-visible shadow-xs"
        style={{
          background: "color-mix(in srgb, var(--surface) 80%, transparent)",
          border: "1.5px solid var(--divider)",
          backgroundImage:
            "linear-gradient(to right, rgba(27,26,26,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,26,26,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        {/* Soft Lavender Conical Beam radiating upward from the folder (matching Image 2) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[640px] h-[480px] pointer-events-none select-none opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 88%, rgba(124, 92, 252, 0.32) 0%, rgba(124, 92, 252, 0.08) 50%, transparent 80%)",
          }}
        />

        {/* DESKTOP FAN/HORSESHOE ARC STAGE */}
        <div ref={stageRef} className="hidden md:block relative w-full h-[580px]">
          {/* Card 01: Top Left */}
          <motion.div
            {...getCardMotionProps("case-01", -11, 0.00)}
            className="absolute left-[1%] top-[2%]"
            style={{ zIndex: isEnvelopeOpen ? (hoveredId === "case-01" ? 35 : 20) : 12 }}
          >
            <HorizontalFolderCard
              file={CASE_FILES[0]}
              arcRotation={0}
              isHovered={isEnvelopeOpen && hoveredId === CASE_FILES[0].id}
              onHover={() => {
                if (isEnvelopeOpen) setHoveredId(CASE_FILES[0].id);
              }}
              onLeave={() => {
                if (isEnvelopeOpen) setHoveredId(null);
              }}
              onOpen={() => {
                if (isEnvelopeOpen) {
                  handleOpenCard(CASE_FILES[0]);
                } else {
                  setIsEnvelopeOpen(true);
                }
              }}
            />
          </motion.div>

          {/* Card 02: Top Right */}
          <motion.div
            {...getCardMotionProps("case-02", 11, 0.05)}
            className="absolute right-[1%] top-[3.5%]"
            style={{ zIndex: isEnvelopeOpen ? (hoveredId === "case-02" ? 35 : 20) : 13 }}
          >
            <HorizontalFolderCard
              file={CASE_FILES[1]}
              arcRotation={0}
              isHovered={isEnvelopeOpen && hoveredId === CASE_FILES[1].id}
              onHover={() => {
                if (isEnvelopeOpen) setHoveredId(CASE_FILES[1].id);
              }}
              onLeave={() => {
                if (isEnvelopeOpen) setHoveredId(null);
              }}
              onOpen={() => {
                if (isEnvelopeOpen) {
                  handleOpenCard(CASE_FILES[1]);
                } else {
                  setIsEnvelopeOpen(true);
                }
              }}
            />
          </motion.div>

          {/* Card 03: Mid Left */}
          <motion.div
            {...getCardMotionProps("case-03", -14, 0.10)}
            className="absolute left-[0%] top-[50%]"
            style={{ zIndex: isEnvelopeOpen ? (hoveredId === "case-03" ? 35 : 20) : 14 }}
          >
            <HorizontalFolderCard
              file={CASE_FILES[2]}
              arcRotation={0}
              isHovered={isEnvelopeOpen && hoveredId === CASE_FILES[2].id}
              onHover={() => {
                if (isEnvelopeOpen) setHoveredId(CASE_FILES[2].id);
              }}
              onLeave={() => {
                if (isEnvelopeOpen) setHoveredId(null);
              }}
              onOpen={() => {
                if (isEnvelopeOpen) {
                  handleOpenCard(CASE_FILES[2]);
                } else {
                  setIsEnvelopeOpen(true);
                }
              }}
            />
          </motion.div>

          {/* Card 04: Mid Right */}
          <motion.div
            {...getCardMotionProps("case-04", 14, 0.15)}
            className="absolute right-[0%] top-[52%]"
            style={{ zIndex: isEnvelopeOpen ? (hoveredId === "case-04" ? 35 : 20) : 13 }}
          >
            <HorizontalFolderCard
              file={CASE_FILES[3]}
              arcRotation={0}
              isHovered={isEnvelopeOpen && hoveredId === CASE_FILES[3].id}
              onHover={() => {
                if (isEnvelopeOpen) setHoveredId(CASE_FILES[3].id);
              }}
              onLeave={() => {
                if (isEnvelopeOpen) setHoveredId(null);
              }}
              onOpen={() => {
                if (isEnvelopeOpen) {
                  handleOpenCard(CASE_FILES[3]);
                } else {
                  setIsEnvelopeOpen(true);
                }
              }}
            />
          </motion.div>

          {/* Central Spotlight Cloud Bubble (In the Open Beam Area - Active When Envelope Open) */}
          <AnimatePresence>
            {isEnvelopeOpen && activeHoveredFile && (
              <CentralSpotlightCloud
                key={activeHoveredFile.id}
                file={activeHoveredFile}
                direction={
                  activeHoveredFile.id === "case-01"
                    ? "up-left"
                    : activeHoveredFile.id === "case-02"
                    ? "up-right"
                    : activeHoveredFile.id === "case-03"
                    ? "down-left"
                    : activeHoveredFile.id === "case-04"
                    ? "down-right"
                    : "bottom"
                }
                deliverableLabel={
                  activeHoveredFile.id === "case-05" ? "3 Photo Snaps" : undefined
                }
                mediaCount={
                  (activeHoveredFile.images?.length || 0) +
                  (activeHoveredFile.video ? 1 : 0)
                }
                onOpen={() => handleOpenCard(activeHoveredFile)}
                onMouseEnter={() => setHoveredId(activeHoveredFile.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            )}
          </AnimatePresence>

          {/* FOLDER BACK FLAP (Layer 1: Behind cards) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-80 sm:w-92 h-40 sm:h-44 pointer-events-none select-none">
            <div
              className="absolute inset-0 rounded-t-2xl rounded-b-[2.2rem]"
              style={{ background: "#4e32bf" }}
            >
              <div
                className="absolute -top-4 left-5 w-28 h-5 rounded-t-xl"
                style={{ background: "#4328a6" }}
              />
            </div>
          </div>

          {/* CARD 05: CAPTURES (Layer 2: Inside envelope pocket) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-80 sm:w-92 h-40 sm:h-44 pointer-events-none"
            style={{ zIndex: isEnvelopeOpen ? (hoveredId === CASE_FILES[4].id ? 35 : 18) : 12 }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-16 cursor-pointer pointer-events-auto"
              onMouseEnter={() => {
                if (isEnvelopeOpen) setHoveredId(CASE_FILES[4].id);
              }}
              onMouseLeave={() => {
                if (isEnvelopeOpen) setHoveredId(null);
              }}
              onClick={() => {
                if (isEnvelopeOpen) {
                  handleOpenCard(CASE_FILES[4]);
                } else {
                  setIsEnvelopeOpen(true);
                }
              }}
            >
              <motion.div
                {...getCard05MotionProps()}
                className="relative group w-[212px] h-[122px] select-none"
              >
                {/* Folder Silhouette SVG (Exact match to Image 2) */}
                <svg
                  viewBox="0 0 212 122"
                  className="absolute inset-0 w-full h-full overflow-visible filter drop-shadow-md group-hover:drop-shadow-xl transition-all"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <clipPath id="card05-clip">
                      <path d="M 16,0 L 122,0 C 130,0 136,4 141,9 L 162,24 C 167,27 172,28 179,28 L 196,28 C 205,28 212,35 212,44 L 212,108 C 212,116 205,122 196,122 L 16,122 C 7,122 0,116 0,108 L 0,16 C 0,7 7,0 16,0 Z" />
                    </clipPath>
                  </defs>

                  {/* White Folder Body */}
                  <path
                    d="M 16,0 L 122,0 C 130,0 136,4 141,9 L 162,24 C 167,27 172,28 179,28 L 196,28 C 205,28 212,35 212,44 L 212,108 C 212,116 205,122 196,122 L 16,122 C 7,122 0,116 0,108 L 0,16 C 0,7 7,0 16,0 Z"
                    fill="#ffffff"
                    stroke="rgba(27,26,26,0.14)"
                    strokeWidth="1.5"
                  />

                  {/* Soft Cyan Pastel Tab Header Strip with Diagonal Slope */}
                  <g clipPath="url(#card05-clip)">
                    <rect x="0" y="0" width="212" height="30" fill="#cdecef" />
                    <line x1="0" y1="30" x2="212" y2="30" stroke="rgba(14,116,144,0.12)" strokeWidth="1" />
                  </g>

                  {/* Redraw top contour for crisp border */}
                  <path
                    d="M 16,0 L 122,0 C 130,0 136,4 141,9 L 162,24 C 167,27 172,28 179,28 L 196,28 C 205,28 212,35 212,44 L 212,108 C 212,116 205,122 196,122 L 16,122 C 7,122 0,116 0,108 L 0,16 C 0,7 7,0 16,0 Z"
                    fill="none"
                    stroke="rgba(27,26,26,0.14)"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Tab Number '05.' */}
                <div className="absolute top-[5px] left-[18px] z-10 font-black text-xs text-[#0e7490] tracking-wider select-none">
                  <span>05.</span>
                </div>

                {/* Content on the Left (Camera Sticker + 'Captures' Title, matching Image 2) */}
                <div className="absolute top-[34px] left-0 right-0 bottom-0 z-10 px-5 pt-1.5 flex flex-col items-start select-none">
                  {/* Vintage Retro Camera Sticker (Left-aligned, matching Image 2) */}
                  <div className="select-none flex-shrink-0 mb-0.5">
                    <VintageCameraIcon className="w-11 h-7.5" />
                  </div>

                  {/* 'Captures' Title in Upright Hand-Drawn Print Font (Left-aligned, matching Image 2) */}
                  <h4
                    className="font-bold text-[24px] sm:text-[26px] leading-tight select-none tracking-wide text-[#2a8b89]"
                    style={{
                      fontFamily: "'Patrick Hand', 'Chalkboard SE', 'Comic Sans MS', cursive, sans-serif",
                    }}
                  >
                    Captures
                  </h4>
                </div>

                {/* Purple Cursor & Pill Tooltip on Card 05 Hover */}
                <AnimatePresence>
                  {isEnvelopeOpen && hoveredId === CASE_FILES[4].id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 4 }}
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                      className="absolute -bottom-8 -right-6 z-50 pointer-events-none flex items-center gap-1.5"
                    >
                      <svg className="w-5 h-5 text-[#7c5cfc] filter drop-shadow-sm rotate-[-15deg]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 3l7 18 3-7 7-3L3 3z" />
                      </svg>
                      <div
                        className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white shadow-xl flex items-center gap-1.5 whitespace-nowrap"
                        style={{
                          background: "linear-gradient(135deg, #7c5cfc 0%, #6355d8 100%)",
                          boxShadow: "0 10px 25px -4px rgba(124, 92, 252, 0.6)",
                          fontFamily: "'Patrick Hand', 'Chalkboard SE', cursive, sans-serif",
                        }}
                      >
                        <span>Open this</span>
                        <span className="text-[10px] opacity-80">↗</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* FOLDER FRONT FLAP (Layer 3: In front of pocket) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-80 sm:w-92 h-32 sm:h-36 rounded-b-[2.2rem] rounded-t-xl p-5 sm:p-6 flex items-end justify-between overflow-hidden shadow-2xl cursor-pointer select-none pointer-events-auto"
            style={{
              background: "linear-gradient(145deg, #7c5cfc 0%, #5835d4 100%)",
              border: "2px solid rgba(255, 255, 255, 0.25)",
              boxShadow:
                "0 25px 60px -15px rgba(88, 53, 212, 0.6), 0 10px 20px -5px rgba(0,0,0,0.2)",
            }}
            onClick={() => {
              setIsEnvelopeOpen((prev) => !prev);
              if (isEnvelopeOpen) setHoveredId(null);
            }}
          >
            {/* Folder Inner Rim Shadow */}
            <div
              className="absolute inset-x-0 top-0 h-6 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.22), transparent)",
              }}
            />

            {/* Hand-Drawn / Chalk "CONTENT" Heading (matching Image 2) */}
            <div className="relative z-10 mb-0.5">
              <span
                className="font-black text-3xl sm:text-4xl uppercase tracking-wider text-white block drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                style={{
                  fontFamily: "'Patrick Hand', 'Chalkboard SE', cursive, system-ui",
                  letterSpacing: "0.06em",
                }}
              >
                CONTENT
              </span>
              <span className="text-[10px] font-bold text-white/75 tracking-wider uppercase block">
                Priyanshi&rsquo;s Creative Vault 📂
              </span>
              {isEnvelopeOpen && (
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white/95 border border-white/30 tracking-wide hover:bg-white/30 transition-colors">
                  📁 Click to pack cases
                </span>
              )}
            </div>

            {/* Cartoon Avatar Sticker with Sparkles ✨ & Exclamation ! (matching Image 2) */}
            <div className="relative z-10 flex-shrink-0 mb-0.5">
              <motion.span
                animate={{ y: [0, -3, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3.5 -left-2.5 text-base leading-none select-none text-white drop-shadow-sm"
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ y: [0, -4, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute -top-2.5 -right-1.5 text-sm font-black leading-none select-none text-white drop-shadow-sm"
              >
                !
              </motion.span>

              {/* Circular Sticker Badge */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-3 sm:border-4 border-white shadow-xl overflow-hidden bg-[#a881e6] flex items-center justify-center">
                <img
                  src="/headshot.png"
                  alt="Priyanshi Gupta"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </div>

          {/* SNEAK PEEK HOVER OVERLAY (Active when closed) */}
          {!isEnvelopeOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 z-25 w-[420px] h-[280px] cursor-pointer"
              onMouseEnter={() => setIsEnvelopeHovered(true)}
              onMouseLeave={() => setIsEnvelopeHovered(false)}
              onClick={() => setIsEnvelopeOpen(true)}
            >
              {/* Floating Pill Tag Prompt */}
              <motion.div
                initial={false}
                animate={{
                  y: isEnvelopeHovered ? -12 : 0,
                  scale: isEnvelopeHovered ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
              >
                <div
                  className="px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 transition-all duration-300"
                  style={{
                    background: isEnvelopeHovered
                      ? "linear-gradient(135deg, #7c5cfc 0%, #5835d4 100%)"
                      : "rgba(255, 255, 255, 0.95)",
                    color: isEnvelopeHovered ? "#ffffff" : "#4e32bf",
                    border: "1.5px solid rgba(124, 92, 252, 0.3)",
                    boxShadow: isEnvelopeHovered
                      ? "0 12px 28px -4px rgba(124, 92, 252, 0.5)"
                      : "0 6px 18px -2px rgba(0, 0, 0, 0.08)",
                    fontFamily: "'Patrick Hand', cursive, sans-serif",
                    fontSize: "13px",
                  }}
                >
                  <span>
                    {isEnvelopeHovered
                      ? "✨ Click to open envelope & scatter cards"
                      : "📂 5 Cases inside envelope • Hover to peek"}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* MOBILE RESPONSIVE STACK (< md screens) */}
        <div className="md:hidden flex flex-col gap-5 items-center">
          {/* Mobile Folder Banner with Toggle */}
          <div
            className="w-full max-w-sm rounded-2xl p-5 flex items-center justify-between text-white shadow-xl cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7c5cfc 0%, #5835d4 100%)",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
            }}
            onClick={() => setIsEnvelopeOpen((prev) => !prev)}
          >
            <div>
              <span className="font-black text-2xl uppercase tracking-wider block" style={{ fontFamily: "'Oswald', sans-serif" }}>
                CONTENT
              </span>
              <p className="text-xs text-white/80">
                {isEnvelopeOpen ? "Tap to pack cases ✕" : "Tap to open vault (5 cases) 📂"}
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border-3 border-white shadow-md overflow-hidden bg-[#fed7aa]">
              <img src="/headshot.png" alt="Priyanshi" className="w-full h-full object-cover scale-110" />
            </div>
          </div>

          <AnimatePresence>
            {isEnvelopeOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4 w-full max-w-sm overflow-hidden"
              >
                {CASE_FILES.map((file) => (
                  <HorizontalFolderCard
                    key={file.id}
                    file={file}
                    isHovered={hoveredId === file.id}
                    onHover={() => setHoveredId(file.id)}
                    onLeave={() => setHoveredId(null)}
                    onOpen={handleOpenCard}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Media Lightbox (when any card is tapped) */}
      <AnimatePresence>
        {activeMedia && (
          <MediaLightbox
            media={activeMedia.items}
            index={activeMediaIndex}
            alt={activeMedia.title}
            onClose={() => setActiveMedia(null)}
            onIndexChange={setActiveMediaIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
