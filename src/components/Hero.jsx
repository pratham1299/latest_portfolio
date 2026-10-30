import { motion, useScroll, useTransform } from "framer-motion";
import { hero, profile } from "../data/content";
import MagneticButton from "./MagneticButton";
import HeroButterflyDisperse from "./HeroButterflyDisperse";

export default function Hero() {
  const { scrollY } = useScroll();
  // Silky smooth dissolve as scroll begins, seamlessly breaking into the flock of butterflies
  const imgOpacity = useTransform(scrollY, [0, 280], [1, 0]);
  const imgScale = useTransform(scrollY, [0, 280], [1, 1.05]);
  const imgBlur = useTransform(scrollY, [0, 280], ["blur(0px)", "blur(6px)"]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{ opacity: imgOpacity, scale: imgScale, filter: imgBlur }}
      >
        <motion.img
          src="/hero-bg.png"
          alt={`${profile.name} portrait`}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
          style={{ objectPosition: "85% 15%", filter: "saturate(0.95) contrast(1.02)" }}
        />
      </motion.div>

      {/* 3D Swarm of butterflies that breaks away from the portrait on scroll */}
      <HeroButterflyDisperse />

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
