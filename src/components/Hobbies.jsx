import { useEffect, useRef, useState } from "react";
import { linkedin, instagram } from "../data/content";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

function LinkedInGlyph({ color = "#fff" }) {
  return (
    <svg className="w-3.5 h-3.5" fill={color} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function LinkedInPostCard({ post, profileUrl }) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      className="group block relative rounded-[1.25rem] bg-white p-3 text-[#1b1a1a] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full"
      style={{
        border: "1px solid rgba(27,26,26,0.12)",
        boxShadow: "0 14px 28px -16px rgba(0,0,0,0.25)",
      }}
    >
      <div>
        {/* Post Author Header */}
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
          <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-slate-200">
            <img
              src="/headshot.png"
              alt="Priyanshi Gupta"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/headshot.jpg";
              }}
            />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-slate-900 truncate">
                Priyanshi G.
              </span>
              <span className="text-[9px] text-[#0a66c2] font-semibold">
                • 1st
              </span>
            </div>
            <p className="text-[9px] text-slate-500 truncate">
              {post.category}
            </p>
          </div>
          <span className="text-[10px] text-[#0a66c2] font-bold opacity-75 group-hover:opacity-100">
            in
          </span>
        </div>

        {/* Post Snippet / Hook */}
        <p className="text-[10.5px] leading-snug text-slate-800 line-clamp-3 mb-2 font-normal">
          {post.headline}
        </p>

        {/* Carousel / Deck Preview Slide */}
        <div
          className="rounded-lg p-2.5 mb-2 relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            background: post.accentBg,
            border: `1px solid ${post.accentColor}33`,
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
              style={{ background: "#ffffff", color: post.accentColor }}
            >
              Deck
            </span>
            <span className="text-[9px] font-medium text-slate-600">
              {post.slideCount}
            </span>
          </div>
          <h4
            className="text-[11px] font-bold leading-tight mb-0.5"
            style={{ color: post.accentColor }}
          >
            {post.previewTitle}
          </h4>
          <p className="text-[9.5px] text-slate-600 line-clamp-2 leading-tight">
            {post.previewSub}
          </p>
        </div>
      </div>

      {/* LinkedIn Post Engagement Bar */}
      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9.5px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <span className="inline-flex -space-x-1">
            <span className="w-3.5 h-3.5 rounded-full bg-[#0a66c2] text-white flex items-center justify-center text-[7px]">
              👍
            </span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#df704d] text-white flex items-center justify-center text-[7px]">
              💡
            </span>
          </span>
          <span className="font-semibold text-slate-700">{post.reactions}</span>
        </span>
        <span>{post.comments} comments</span>
      </div>
    </a>
  );
}

// Instagram's embed script won't render narrower than ~326px, so to get a
// genuinely smaller card we render it at native size inside a scaled-down
// wrapper, then measure the real rendered height so the container can shrink
// to match instead of leaving cropped/blank space.
const REEL_SCALE = 0.37;
const REEL_BASE_WIDTH = 326;

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
    <section className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <Reveal blur as="h2" className="font-normal mb-3 leading-[1.1] block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
            Content Strategy & Channel Growth
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-base sm:text-lg block" style={{ color: "var(--ink-soft)" }}>
            Same curiosity that fuels my campaigns — proven across corporate LinkedIn strategy and personal creator growth.
          </Reveal>
        </div>

        {/* 1. LinkedIn Case Study Showcase Card (Matching the Instagram Card Layout) */}
        <div
          className="relative rounded-[2rem] p-6 sm:p-9 lg:p-11 overflow-hidden transition-colors duration-500 backdrop-blur-md mb-8 sm:mb-10"
          style={{ background: "var(--surface)", border: "1px solid var(--divider)", boxShadow: "0 25px 60px -30px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "18px 18px" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 lg:gap-10 items-start">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full mb-4"
                style={{ background: "color-mix(in srgb, var(--surface) 80%, white 20%)", border: "1px solid var(--divider)" }}
              >
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#0a66c2" }}
                >
                  <LinkedInGlyph />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "var(--ink-soft)" }}>
                  {linkedin.badge}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl leading-snug mb-2">{linkedin.heading}</h3>
              <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--ink-soft)" }}>
                {linkedin.subtext}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {linkedin.tactics.map((tactic) => (
                  <span
                    key={tactic}
                    className="pill px-3.5 py-1.5 text-xs font-semibold text-[#1b1a1a]"
                    style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.12)" }}
                  >
                    {tactic}
                  </span>
                ))}
              </div>

              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="pill px-5 py-2.5 text-sm font-semibold text-[#1b1a1a] bg-white hover:bg-white/90 border border-black/10 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Connect with {linkedin.name}</span>
                <span className="text-xs">↗</span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-3" stagger={0.08}>
                {linkedin.posts.map((post) => (
                  <StaggerItem key={post.id}>
                    <LinkedInPostCard post={post} profileUrl={linkedin.url} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <p className="text-xs text-center mt-2.5" style={{ color: "var(--ink-soft)" }}>
                Tap a post to view on LinkedIn.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 2. Instagram Case Study Showcase Card */}
        <div
          className="relative rounded-[2rem] p-6 sm:p-9 lg:p-11 overflow-hidden transition-colors duration-500 backdrop-blur-md"
          style={{ background: "var(--surface)", border: "1px solid var(--divider)", boxShadow: "0 25px 60px -30px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "18px 18px" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-7 lg:gap-10 items-start">
            <Reveal>
              <div
                className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full mb-4"
                style={{ background: "color-mix(in srgb, var(--surface) 80%, white 20%)", border: "1px solid var(--divider)" }}
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
                    className="pill px-3.5 py-1.5 text-xs font-semibold text-[#1b1a1a]"
                    style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.12)" }}
                  >
                    {tactic}
                  </span>
                ))}
              </div>

              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="pill px-5 py-2.5 text-sm font-semibold text-[#1b1a1a] bg-white hover:bg-white/90 border border-black/10 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Follow {instagram.handle}</span>
                <span className="text-xs">→</span>
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
