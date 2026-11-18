import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const COMPLIMENTS = [
  { src: "/compliments/compliment-01.png", rotate: -3 },
  { src: "/compliments/compliment-02.png", rotate: 2 },
  { src: "/compliments/compliment-03.png", rotate: -2 },
  { src: "/compliments/compliment-04.png", rotate: 3 },
  { src: "/compliments/compliment-05.png", rotate: -2.5 },
  { src: "/compliments/compliment-06.png", rotate: 2.5 },
  { src: "/compliments/compliment-07.png", rotate: -1.5 },
  { src: "/compliments/compliment-08.png", rotate: 1.5 },
  { src: "/compliments/compliment-09.png", rotate: -3 },
  { src: "/compliments/compliment-10.png", rotate: 2 },
  { src: "/compliments/compliment-11.png", rotate: -2 },
];

const TAPE_COLORS = [
  "linear-gradient(135deg, rgba(254, 205, 211, 0.85) 0%, rgba(253, 230, 138, 0.85) 100%)",
  "linear-gradient(135deg, rgba(183, 238, 208, 0.9) 0%, rgba(169, 227, 247, 0.9) 100%)",
  "linear-gradient(135deg, rgba(229, 184, 135, 0.85) 0%, rgba(254, 205, 211, 0.85) 100%)",
];

function ComplimentCard({ src, rotate, index }) {
  const tape = TAPE_COLORS[index % TAPE_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: rotate * 1.4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      className="relative break-inside-avoid mb-5 bg-white rounded-lg p-2.5 pt-4 shadow-md cursor-default"
      style={{ border: "1px solid rgba(27,26,26,0.08)", boxShadow: "0 14px 30px -18px rgba(27,26,26,0.35)" }}
    >
      {/* Washi Tape Corner */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 -rotate-2 rounded-[2px] opacity-90 shadow-sm pointer-events-none"
        style={{ background: tape }}
      />
      <img
        src={src}
        alt="A compliment Priyanshi received"
        className="w-full h-auto rounded-sm select-none"
        loading="lazy"
      />
    </motion.div>
  );
}

export default function ComplimentsWall({ className = "max-w-5xl mx-auto" }) {
  return (
    <div className={className}>
      <div className="text-center mb-8 sm:mb-10">
        <Reveal
          className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full mb-3"
          style={{ background: "var(--surface)", border: "1px solid var(--divider)" }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "var(--ink-soft)" }}>
            Unsolicited Praise 🙈
          </span>
        </Reveal>
        <Reveal blur as="h2" className="font-normal mb-2.5 block" style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)", fontFamily: "var(--font-serif)" }}>
          Nice Things People Said
        </Reveal>
        <Reveal delay={0.05} as="p" className="text-sm sm:text-base max-w-xl mx-auto block leading-relaxed" style={{ color: "var(--ink-soft)" }}>
          Real screenshots, zero editing — just the compliments I quietly screenshotted because they made my day.
        </Reveal>
      </div>

      <div className="columns-2 sm:columns-3 lg:columns-4 gap-5">
        {COMPLIMENTS.map((c, i) => (
          <ComplimentCard key={c.src} src={c.src} rotate={c.rotate} index={i} />
        ))}
      </div>
    </div>
  );
}
