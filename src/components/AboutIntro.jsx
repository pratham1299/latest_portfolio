import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { heroBadges, heroStat, personal, profile } from "../data/content";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

// The three most senior-reading skills, surfaced as floating credentials
// around the portrait rather than buried in a list.
const FLOATING_BADGES = heroBadges.slice(0, 3);

// Subtle cursor-driven 3D tilt on the portrait card — the one place on the
// page that rewards a mouse instead of just scrolling past it.
function TiltCard({ children }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 250, damping: 22, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 22, mass: 0.5 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(-py * 16);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

// Scalloped cloud silhouette (traced from the reference site's decorative
// frame) that sits behind the inline headshot — the photo itself stays a
// plain rectangle, the blob is what reads as the "shape".
const PHOTO_BLOB_PATH =
  "M5.5 64.005c1.293 3.363 7.5 18-5.5 18V184.5h121V82.005c-13 0-6.793-14.637-5.5-18 5-13.005-3.5-24.505-11.5-23 2.333-8.167 1.7-23.802-19.5-21.002C85 16.17 83.8 8.2 75 7c-3.941-.537-9.5 1-14.5-7-5 8-10.559 6.463-14.5 7-8.8 1.2-10 9.169-9.5 13.003-21.2-2.8-21.833 12.835-19.5 21.002C9 39.5.5 51 5.5 64.005";

// The inline "photo + greeting" widget from the reference: the bubble is
// clipped out of view at rest and springs into place on hover, while the
// photo itself scales up slightly — same interaction, reimplemented with
// framer-motion instead of Framer's proprietary hover-variant CSS.
function NamasteBadge() {
  return (
    <motion.span
      className="relative z-10 inline-flex items-end justify-center self-center shrink-0 cursor-pointer select-none"
      style={{ width: "3.75rem", height: "6.6rem" }}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
    >
      <svg viewBox="0 0 121 185" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path fill="#B3A6ED" stroke="#7C6AE0" strokeWidth="3" strokeLinejoin="round" d={PHOTO_BLOB_PATH} />
      </svg>

      {/* Photo, shrunk in evenly on every side so it settles inside the
          curve of the dome instead of poking past it at the corners. A
          stacked drop-shadow traces the cutout's own silhouette for a
          sticker-style outline, rather than just a rectangular edge. */}
      <motion.img
        src="/namaste-badge-crop.png"
        alt="Priyanshi Gupta"
        className="relative object-contain object-bottom"
        style={{
          width: "68%",
          height: "68%",
          zIndex: 1,
          filter:
            "drop-shadow(1.4px 0 0 #fff) drop-shadow(-1.4px 0 0 #fff) drop-shadow(0 1.4px 0 #fff) drop-shadow(0 -1.4px 0 #fff) drop-shadow(1px 1px 0 #fff) drop-shadow(-1px -1px 0 #fff) drop-shadow(1px -1px 0 #fff) drop-shadow(-1px 1px 0 #fff)",
        }}
        variants={{ rest: { y: -4 }, hover: { y: 2 } }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
      />

      {/* Folded-hands icon fixed in the arch peak, but pops a little
          alongside the speech bubble on hover. */}
      <motion.span
        className="absolute pointer-events-none leading-none"
        style={{ top: "0rem", left: "50%", fontSize: "1.1rem", zIndex: 2 }}
        variants={{
          rest: { scale: 1, x: "-50%", rotate: 0 },
          hover: { scale: 1.25, x: "-50%", rotate: -8 },
        }}
        transition={{ type: "spring", stiffness: 360, damping: 12 }}
      >
        🙏
      </motion.span>

      {/* Speech-bubble "cloud" — pops in next to the icon on hover, with a
          small tail pointing back at it. */}
      <motion.span
        className="absolute pointer-events-none"
        style={{ top: "-0.2rem", left: "100%", marginLeft: "0.5rem", zIndex: 2 }}
        variants={{
          rest: { opacity: 0, x: -6, y: 4, scale: 0.8 },
          hover: { opacity: 1, x: 0, y: 0, scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 340, damping: 16 }}
      >
        <span
          className="relative block whitespace-nowrap text-[11px] font-bold px-3 py-1.5 rounded-2xl"
          style={{
            background: "#fff",
            border: "1px solid rgba(27,26,26,0.12)",
            color: "var(--ink)",
            boxShadow: "0 10px 20px -10px rgba(27,26,26,0.35)",
          }}
        >
          Namaste!
          <span
            className="absolute w-2 h-2"
            style={{
              left: "-0.3rem",
              bottom: "0.6rem",
              background: "#fff",
              borderLeft: "1px solid rgba(27,26,26,0.12)",
              borderBottom: "1px solid rgba(27,26,26,0.12)",
              transform: "rotate(45deg)",
            }}
          />
        </span>
      </motion.span>
    </motion.span>
  );
}

// The "Hello, I'm Priyanshi" portrait + intro block — originally the About
// page's first section, now reused as Home's first section (see AboutIntro
// <-> Hero swap between Home.jsx and pages/About.jsx).
export default function AboutIntro() {
  const firstName = profile.name.split(" ")[0];

  return (
    <section className="pt-32 lg:pt-40 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-20 items-start">
        {/* Portrait */}
        <Reveal blur className="relative mx-auto lg:mx-0 max-w-xs sm:max-w-sm w-full">
          <div
            className="absolute -top-8 -left-8 w-40 h-40 pointer-events-none"
            style={{ background: "var(--pill-yellow)", borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%", opacity: 0.7 }}
          />
          <div
            className="absolute -bottom-10 -right-6 w-32 h-32 pointer-events-none"
            style={{ background: "var(--pill-blue)", borderRadius: "38% 62% 66% 34% / 47% 62% 38% 53%", opacity: 0.7 }}
          />

          <TiltCard>
            <div
              className="relative rounded-[2.25rem] overflow-hidden"
              style={{
                border: "1px solid rgba(27,26,26,0.1)",
                boxShadow: "0 35px 70px -30px rgba(27,26,26,0.4)",
              }}
            >
              <span
                className="absolute -top-3 left-10 w-20 h-7 rounded-sm z-10 opacity-90 pointer-events-none"
                style={{ background: "#F3B8CE", transform: "rotate(-5deg)" }}
              />
              <img
                src="/headshot.jpg"
                alt={`${profile.name} portrait`}
                className="w-full aspect-[4/5] object-cover select-none"
                style={{ filter: "saturate(0.97) contrast(1.02)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 60px 10px rgba(27,26,26,0.08)" }}
              />
            </div>
          </TiltCard>

          {/* Floating skill credentials */}
          {FLOATING_BADGES.map((badge, i) => (
            <span
              key={badge.label}
              className="animate-float-slow absolute hidden sm:flex items-center gap-2 pl-2 pr-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                background: "#fff",
                border: "1px solid rgba(27,26,26,0.1)",
                boxShadow: "0 15px 30px -15px rgba(27,26,26,0.35)",
                animationDelay: `${i * 0.7}s`,
                ...[
                  { top: "8%", left: "-14%", transform: "rotate(-4deg)" },
                  { top: "42%", right: "-16%", transform: "rotate(3deg)" },
                  { bottom: "10%", left: "-10%", transform: "rotate(-3deg)" },
                ][i],
              }}
            >
              <span className="text-base leading-none">{badge.emoji}</span>
              {badge.label}
            </span>
          ))}

          {/* Tenure stamp */}
          <div
            className="animate-float-slow absolute -bottom-7 -right-7 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center z-20"
            style={{
              background: "var(--ink)",
              color: "var(--surface)",
              border: "3px solid var(--surface)",
              boxShadow: "0 20px 40px -18px rgba(27,26,26,0.5)",
              transform: "rotate(6deg)",
              animationDelay: "0.4s",
            }}
          >
            <span className="text-2xl font-normal leading-none">{heroStat.value}</span>
            <span className="text-[9px] uppercase tracking-wide leading-tight mt-1 px-2">{heroStat.label}</span>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="relative">
          <span
            className="absolute -top-10 -left-2 sm:-left-6 font-normal select-none pointer-events-none leading-none"
            style={{ fontSize: "10rem", color: "var(--ink)", opacity: 0.05 }}
          >
            {firstName[0]}
          </span>

          <div className="relative">
            <Reveal
              className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full mb-6"
              style={{ background: "var(--surface)", border: "1px solid rgba(27,26,26,0.08)" }}
            >
              <span className="text-sm">✦</span>
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "var(--ink-soft)" }}>
                About Me
              </span>
            </Reveal>

            <StaggerGroup
              as="h1"
              stagger={0.18}
              className="font-normal leading-[1.25] mb-6 block"
              style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}
            >
              <StaggerItem as="span" y={16} className="inline-flex items-center align-middle gap-1.5">
                <span>Hello, I&rsquo;m {firstName}</span>
                <NamasteBadge />
              </StaggerItem>{" "}
              <StaggerItem as="span" y={16} className="inline-block">
                a strategic {profile.role}
              </StaggerItem>{" "}
              <StaggerItem as="span" y={16} className="inline-block">
                who blends{" "}
                <span className="font-semibold" style={{ color: "#5B4FCF" }}>
                  research, outreach, and performance marketing
                </span>{" "}
                into growth-focused campaigns.
              </StaggerItem>
            </StaggerGroup>

            <Reveal delay={0.1} as="p" className="text-base sm:text-lg leading-relaxed mb-6 block" style={{ color: "var(--ink-soft)" }}>
              {personal.intro}
            </Reveal>

            <Reveal
              delay={0.15}
              as="p"
              className="italic text-lg sm:text-xl leading-relaxed pl-5 block"
              style={{ borderLeft: "3px solid var(--pill-blue)", color: "var(--ink)" }}
            >
              &ldquo;{personal.motto}&rdquo;
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
