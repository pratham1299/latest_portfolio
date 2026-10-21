import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { hobbies, instagram } from "../data/content";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

// Instagram's embed script won't render narrower than ~326px, so to get a
// genuinely smaller card we render it at native size inside a scaled-down
// wrapper, then measure the real rendered height so the container can shrink
// to match instead of leaving cropped/blank space.
const REEL_SCALE = 0.37;
const REEL_BASE_WIDTH = 326;

function HobbyCard({ hobby }) {
  return (
    <StaggerItem>
      <motion.div
        initial={{ rotate: hobby.rotate }}
        whileHover={{ rotate: 0, y: -10, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="relative rounded-[1.5rem] p-6 sm:p-7 h-full"
        style={{
          background: hobby.bg,
          border: "1px solid rgba(27,26,26,0.08)",
          boxShadow: "0 18px 40px -22px rgba(27,26,26,0.35)",
        }}
      >
        <span
          className="absolute -top-3 left-6 w-14 h-5 rounded-sm opacity-80 pointer-events-none"
          style={{ background: hobby.tape, transform: "rotate(-6deg)" }}
        />
        <span className="text-3xl block mb-2 leading-none" role="img" aria-label={hobby.title}>
          {hobby.emoji}
        </span>
        <h3 className="text-lg mb-1.5">{hobby.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          {hobby.description}
        </p>
      </motion.div>
    </StaggerItem>
  );
}

function InstagramGlyph({ color = "#fff" }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke={color} strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill={color} stroke="none" />
    </svg>
  );
}

function PhoneFrame({ children }) {
  return (
    <div
      className="relative rounded-[1.75rem] pt-5 pb-2 px-2"
      style={{ background: "#fff", border: "1px solid rgba(27,26,26,0.12)", boxShadow: "0 20px 40px -24px rgba(27,26,26,0.25)" }}
    >
      <span
        className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1.5 rounded-full"
        style={{ background: "rgba(27,26,26,0.15)" }}
      />
      <div className="rounded-[1.25rem] overflow-hidden">{children}</div>
    </div>
  );
}

function ReelEmbed({ url, scale = REEL_SCALE }) {
  const wrapperRef = useRef(null);
  const [height, setHeight] = useState(REEL_BASE_WIDTH * scale * 1.7);

  useEffect(() => {
    let cancelled = false;
    let pollId;
    let observer;

    // Instagram resizes its embed iframe asynchronously (placeholder height
    // first, real height after the post loads), so track it continuously
    // rather than measuring once.
    const attach = () => {
      if (cancelled) return;
      const iframe = wrapperRef.current?.querySelector("iframe");
      if (!iframe) {
        pollId = setTimeout(attach, 300);
        return;
      }
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const h = entry.contentRect.height;
          if (h > 50) setHeight(h * scale);
        }
      });
      observer.observe(iframe);
    };
    attach();

    return () => {
      cancelled = true;
      clearTimeout(pollId);
      observer?.disconnect();
    };
  }, [scale]);

  return (
    <div
      className="flex-shrink-0 snap-center overflow-hidden rounded-2xl"
      style={{ width: REEL_BASE_WIDTH * scale, height }}
    >
      <div ref={wrapperRef} style={{ width: REEL_BASE_WIDTH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ background: "#FFF", border: 0, borderRadius: "1rem", margin: 0, width: `${REEL_BASE_WIDTH}px` }}
        />
      </div>
    </div>
  );
}

export default function Hobbies() {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds?.process();

    if (window.instgrm) {
      process();
      return;
    }

    const existing = document.getElementById("instagram-embed-script");
    if (existing) {
      existing.addEventListener("load", process);
      return () => existing.removeEventListener("load", process);
    }

    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8" style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Reveal blur as="h2" className="font-normal mb-3 leading-[1.1] block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
            The Chaotic-Creative Side of Me
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-base sm:text-lg block" style={{ color: "var(--ink-soft)" }}>
            Same curiosity that fuels my campaigns — just pointed at kitchens, cameras, and plane tickets.
          </Reveal>
        </div>

        <StaggerGroup
          className="grid grid-cols-1 gap-5 sm:[grid-template-columns:repeat(3,calc(33.333%_-_0.5in))] sm:gap-[0.75in] mb-10"
          stagger={0.12}
        >
          {hobbies.map((hobby) => (
            <HobbyCard key={hobby.title} hobby={hobby} />
          ))}
        </StaggerGroup>

        <div
          className="relative rounded-[2rem] p-6 sm:p-9 lg:p-11 overflow-hidden"
          style={{ background: "var(--bg)", border: "1px solid rgba(27,26,26,0.08)", boxShadow: "0 25px 60px -30px rgba(27,26,26,0.22)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "18px 18px" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 lg:gap-10 items-start">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full mb-4"
                style={{ background: "#fff", border: "1px solid rgba(27,26,26,0.08)" }}
              >
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #FEDA75 0%, #FA7E1E 30%, #D62976 55%, #962FBF 80%, #4F5BD5 100%)" }}
                >
                  <InstagramGlyph />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "var(--ink-soft)" }}>
                  {instagram.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl leading-snug mb-2">{instagram.heading}</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                {instagram.subtext}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {instagram.tactics.map((tactic) => (
                  <span
                    key={tactic}
                    className="pill px-3.5 py-1.5 text-xs font-semibold"
                    style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.08)" }}
                  >
                    {tactic}
                  </span>
                ))}
              </div>

              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="pill px-5 py-2.5 text-sm font-semibold"
                style={{ background: "#fff", border: "1px solid rgba(27,26,26,0.12)" }}
              >
                Follow {instagram.handle} →
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <StaggerGroup className="grid grid-cols-3 gap-3" stagger={0.08}>
                {instagram.reels.map((url) => (
                  <StaggerItem key={url}>
                    <PhoneFrame>
                      <ReelEmbed url={url} />
                    </PhoneFrame>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <p className="text-xs text-center mt-2.5" style={{ color: "var(--ink-soft)" }}>
                Tap a reel to watch on Instagram.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
