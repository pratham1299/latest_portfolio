import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaLightbox from "./MediaLightbox";
import { Reveal } from "./Reveal";

/**
 * 5 Case Study Files — compact tab rail + side detail panel.
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
    images: ["/case-studies/quirks-1.png", "/case-studies/office-2.jpg"],
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
    images: ["/case-studies/office-3.jpg", "/case-studies/office-4.jpg"],
  },
  {
    id: "case-05",
    tab: "05.",
    tabBg: "#cdecef",
    tabColor: "#0e7490",
    title: "Captures",
    subtitle: "Event & BTS Snaps",
    realTitle: "Captures • Event & BTS Snaps",
    titleColor: "#2a8b89",
    gist: "Candid on-ground moments, raw event snaps, and visual production highlights from project execution.",
    images: [
      "/case-studies/office-1.jpg",
      "/case-studies/office-2.jpg",
      "/case-studies/office-3.jpg",
    ],
  },
];

/**
 * Authentic Vintage Retro Camera Sticker Icon
 */
function VintageCameraIcon({ className = "w-11 h-8" }) {
  return (
    <svg
      viewBox="0 0 48 36"
      className={`${className} filter drop-shadow-sm select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="24" cy="34" rx="16" ry="1.5" fill="rgba(0,0,0,0.16)" />
      <rect x="8.5" y="3.5" width="5.5" height="4" rx="1" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
      <path d="M18.5 4.5h11v2.5h-11z" fill="#64748b" stroke="#475569" strokeWidth="0.8" />
      <rect x="22" y="5.2" width="4" height="1.8" rx="0.5" fill="#e2e8f0" />
      <rect x="34.5" y="4" width="5" height="3" rx="1" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
      <rect x="4" y="7" width="40" height="25" rx="4" fill="#242426" stroke="#18181b" strokeWidth="1.2" />
      <path d="M4 11.5V9a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v2.5H4z" fill="url(#silver-grad-cam)" stroke="#94a3b8" strokeWidth="0.8" />
      <rect x="5.5" y="12.5" width="37" height="18" rx="2" fill="#1c1c1e" />
      <rect x="33" y="8.5" width="5.5" height="3.2" rx="0.8" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.6" />
      <rect x="34" y="9.2" width="2" height="1" fill="#ffffff" opacity="0.85" />
      <circle cx="24" cy="21.5" r="9.2" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
      <circle cx="24" cy="21.5" r="7.8" fill="#cbd5e1" />
      <circle cx="24" cy="21.5" r="6.6" fill="#18181b" />
      <circle cx="24" cy="21.5" r="5" fill="#0e7490" />
      <circle cx="24" cy="21.5" r="3.6" fill="#164e63" />
      <path d="M21 18.2a4 4 0 0 1 4.5-1" stroke="#ffffff" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
      <circle cx="26" cy="24" r="0.9" fill="#ffffff" opacity="0.8" />
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

export default function CaseStudies({ className = "max-w-5xl mx-auto" }) {
  const [activeId, setActiveId] = useState(CASE_FILES[0].id);
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const activeFile = CASE_FILES.find((f) => f.id === activeId) || CASE_FILES[0];
  const totalMedia = (activeFile.images?.length || 0) + (activeFile.video ? 1 : 0);

  function openGallery(file) {
    const media = [
      ...(file.video ? [{ type: "video", src: file.video }] : []),
      ...(file.images ? file.images.map((src) => ({ type: "image", src })) : []),
    ];
    if (media.length > 0) {
      setActiveMedia({ title: file.realTitle || file.title, items: media });
      setActiveMediaIndex(0);
    }
  }

  return (
    <div className={className}>
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Reveal blur as="h2" className="font-normal mb-2 block text-center" style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)", color: "var(--ink)", fontFamily: "var(--font-serif)" }}>
          A Peek Behind the Work
        </Reveal>
        <Reveal delay={0.05} as="p" className="text-sm sm:text-base max-w-xl mx-auto block text-center leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          Hover a case to preview it, tap &ldquo;View Gallery&rdquo; to open it in full size.
        </Reveal>
      </div>

      {/* Compact Tab Rail + Detail Panel */}
      <div
        className="relative rounded-[1.75rem] overflow-hidden shadow-xs flex flex-col sm:flex-row"
        style={{
          background: "color-mix(in srgb, var(--surface) 85%, transparent)",
          border: "1.5px solid var(--divider)",
        }}
      >
        {/* Tab Rail */}
        <div
          className="flex sm:flex-col overflow-x-auto sm:overflow-visible sm:w-[230px] flex-shrink-0 border-b sm:border-b-0 sm:border-r"
          style={{ borderColor: "var(--divider)" }}
        >
          {CASE_FILES.map((file) => {
            const isActive = file.id === activeId;
            return (
              <button
                key={file.id}
                type="button"
                onMouseEnter={() => setActiveId(file.id)}
                onFocus={() => setActiveId(file.id)}
                onClick={() => setActiveId(file.id)}
                className="group flex items-center gap-3 px-4 py-3 sm:py-3.5 text-left flex-shrink-0 w-full transition-colors duration-200 cursor-pointer"
                style={{
                  background: isActive ? "var(--bg)" : "transparent",
                  borderBottom: "1px dashed var(--divider)",
                }}
              >
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black"
                  style={{ background: file.tabBg, color: file.tabColor }}
                >
                  {file.tab.replace(".", "")}
                </span>
                {file.id === "case-05" ? (
                  <VintageCameraIcon className="w-6 h-4.5 flex-shrink-0" />
                ) : (
                  <span className="text-base flex-shrink-0">{file.emoji}</span>
                )}
                <span
                  className="text-xs sm:text-sm font-semibold leading-tight whitespace-nowrap sm:whitespace-normal"
                  style={{ color: isActive ? file.titleColor : "var(--ink)" }}
                >
                  {file.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <div className="relative flex-1 min-h-[230px] sm:min-h-[260px] p-5 sm:p-7 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFile.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full"
            >
              <span
                className="inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3"
                style={{ background: activeFile.tabBg, color: activeFile.tabColor }}
              >
                Case {activeFile.tab}
              </span>

              <h4
                className="font-normal text-lg sm:text-xl leading-snug mb-1.5"
                style={{ fontFamily: "var(--font-serif)", color: activeFile.titleColor }}
              >
                {activeFile.realTitle || activeFile.title}
              </h4>

              {activeFile.subtitle && (
                <p className="text-xs font-medium mb-2" style={{ color: "var(--ink-soft)" }}>
                  {activeFile.subtitle}
                </p>
              )}

              <p className="text-sm leading-relaxed mb-4 max-w-md" style={{ color: "var(--ink-soft)" }}>
                {activeFile.gist}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 flex-wrap">
                <div className="flex -space-x-2">
                  {activeFile.video && (
                    <div
                      className="w-11 h-11 rounded-lg border-2 flex items-center justify-center text-white text-xs shadow-sm"
                      style={{ borderColor: "var(--surface)", background: "rgba(0,0,0,0.82)" }}
                    >
                      ▶
                    </div>
                  )}
                  {(activeFile.images || []).slice(0, 3).map((src, i) => (
                    <img
                      key={src + i}
                      src={src}
                      alt=""
                      className="w-11 h-11 rounded-lg object-cover border-2 shadow-sm"
                      style={{ borderColor: "var(--surface)" }}
                    />
                  ))}
                  {totalMedia > 4 && (
                    <div
                      className="w-11 h-11 rounded-lg border-2 flex items-center justify-center text-[11px] font-bold"
                      style={{ borderColor: "var(--surface)", background: "var(--bg)", color: "var(--ink-soft)" }}
                    >
                      +{totalMedia - 3}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openGallery(activeFile)}
                  className="pill px-4 py-2 text-xs sm:text-sm font-semibold text-[#1b1a1a] hover:opacity-80 transition-opacity flex-shrink-0"
                  style={{ background: "var(--accent-amber)", border: "1px solid rgba(27,26,26,0.1)" }}
                >
                  View Gallery →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Media Lightbox */}
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
