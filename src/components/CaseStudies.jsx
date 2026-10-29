import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudies } from "../data/content";
import MediaLightbox from "./MediaLightbox";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const AUTO_FLIP_BACK_MS = 5 * 1000;

const TINTS = [
  { soft: "var(--pill-mint)", bold: "var(--accent-mint)" },
  { soft: "var(--pill-blue)", bold: "var(--accent-sky)" },
  { soft: "var(--pill-yellow)", bold: "var(--accent-amber)" },
  { soft: "#FBE4EC", bold: "#F3B8CE" },
];

// A real 3D flip card — click flips it on its Y axis to reveal the work
// behind it, like turning over an index card. Each card is independent, so
// several can be open at once; tapping an image opens the full-size viewer
// without also flipping the card back.
function FlipCard({ study, index }) {
  const [flipped, setFlipped] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(null);
  const tint = TINTS[index % TINTS.length];
  const autoFlipTimer = useRef(null);

  // Video first, then images — one combined, orderable set so the lightbox
  // can slide left/right across every item regardless of type.
  const media = [
    ...(study.video ? [{ type: "video", src: study.video }] : []),
    ...study.images.map((src) => ({ type: "image", src })),
  ];

  // Flipping the card open starts a 5-second "no activity" clock that flips
  // it back automatically; opening an image/video or sliding through the
  // lightbox counts as activity and restarts the clock.
  function bumpAutoFlipTimer() {
    if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);
    autoFlipTimer.current = setTimeout(() => setFlipped(false), AUTO_FLIP_BACK_MS);
  }

  useEffect(() => {
    if (flipped) {
      bumpAutoFlipTimer();
    } else if (autoFlipTimer.current) {
      clearTimeout(autoFlipTimer.current);
    }
    return () => {
      if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  return (
    <StaggerItem>
      <div style={{ perspective: 1800 }}>
        <motion.div
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setFlipped((f) => !f)}
          className="relative w-full cursor-pointer select-none outline-none h-[270px] sm:h-[300px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-[1.75rem] p-6 flex flex-col justify-between"
            style={{
              background: tint.soft,
              border: "1px solid rgba(27,26,26,0.1)",
              backfaceVisibility: "hidden",
              boxShadow: "0 20px 45px -24px rgba(27,26,26,0.35)",
            }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: tint.bold }}>
              Case 0{index + 1}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl leading-snug mb-2">{study.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--ink-soft)" }}>
                Flip to open
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0113-5.3M20 15a8 8 0 01-13 5.3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-[1.75rem] p-5 flex flex-col"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(27,26,26,0.1)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 20px 45px -24px rgba(27,26,26,0.35)",
            }}
          >
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--ink-soft)" }}>
              {study.gist}
            </p>
            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto content-start">
              {media.length > 0
                ? media.map((item, mi) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        bumpAutoFlipTimer();
                        setMediaIndex(mi);
                      }}
                      className="group relative rounded-lg overflow-hidden cursor-pointer"
                    >
                      {item.type === "video" ? (
                        <>
                          <video
                            src={item.src}
                            muted
                            loop
                            autoPlay
                            playsInline
                            className="w-full h-20 sm:h-24 object-cover pointer-events-none"
                          />
                          <span
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: "rgba(13,12,12,0.25)" }}
                          >
                            <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                              <svg className="w-3.5 h-3.5 ml-0.5" fill="var(--ink)" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </span>
                        </>
                      ) : (
                        <img src={item.src} alt={study.title} className="w-full h-20 sm:h-24 object-cover" />
                      )}
                    </button>
                  ))
                : [0, 1].map((n) => (
                    <div
                      key={n}
                      className="h-20 sm:h-24 rounded-lg flex items-center justify-center"
                      style={{ background: tint.soft, border: "1px dashed rgba(27,26,26,0.18)" }}
                    >
                      {n === 0 && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--ink-soft)" }}>
                          Soon
                        </span>
                      )}
                    </div>
                  ))}
            </div>
            <span className="text-[11px] mt-2 flex-shrink-0" style={{ color: "var(--ink-soft)" }}>
              Tap card to flip back
            </span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {mediaIndex !== null && (
          <MediaLightbox
            media={media}
            index={mediaIndex}
            alt={study.title}
            onClose={() => setMediaIndex(null)}
            onIndexChange={(i) => {
              bumpAutoFlipTimer();
              setMediaIndex(i);
            }}
          />
        )}
      </AnimatePresence>
    </StaggerItem>
  );
}

export default function CaseStudies({ className = "max-w-5xl mx-auto" }) {
  return (
    <div className={className}>
      <Reveal blur as="h2" className="font-normal mb-3 block text-center" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
        A Peek Behind the Work
      </Reveal>
      <Reveal delay={0.05} as="p" className="text-base sm:text-lg mb-8 block text-center" style={{ color: "var(--ink-soft)" }}>
        Flip a card to see what&rsquo;s inside.
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
        {caseStudies.map((study, i) => (
          <FlipCard key={study.title} study={study} index={i} />
        ))}
      </StaggerGroup>
    </div>
  );
}
