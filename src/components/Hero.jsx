import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { hero, profile } from "../data/content";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.video
        ref={videoRef}
        src="/hero-banner.mp4"
        poster="/hero-banner-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ objectPosition: "center", filter: "saturate(0.95) contrast(1.02)" }}
      />

      {/* Unmute toggle — browsers block autoplay with sound, so it starts muted */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background video" : "Mute background video"}
        className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/25 bg-black/35 backdrop-blur-md hover:bg-black/50 transition-colors"
      >
        {muted ? (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 9l5 6m0-6l-5 6" />
          </svg>
        ) : (
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" />
          </svg>
        )}
      </button>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(27,26,26,0.5) 0%, rgba(27,26,26,0.32) 32%, rgba(27,26,26,0.1) 58%, rgba(27,26,26,0.22) 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="max-w-md">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-5 text-white/80"
          >
            {profile.name} — {hero.badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="uppercase font-light leading-[1.02] tracking-tight mb-6 text-white"
            style={{ fontSize: "clamp(1.6rem, 3.8vw, 2.5rem)", letterSpacing: "-0.02em" }}
          >
            {hero.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base sm:text-lg mb-8 leading-relaxed text-white/80"
          >
            {hero.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <MagneticButton
              as="a"
              href={hero.ctaPrimary.href}
              className="inline-flex flex-col items-start gap-2 group"
            >
              <span className="w-full pb-2 px-1" style={{ borderBottom: "1px dashed rgba(255,255,255,0.45)" }} />
              <span className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-white">
                View My Work
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="w-full pt-2 px-1" style={{ borderTop: "1px dashed rgba(255,255,255,0.45)" }} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
