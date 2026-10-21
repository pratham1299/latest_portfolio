import { motion } from "framer-motion";

// A handful of soft, slow-floating dots used as a recurring decorative motif
// that bookends the page (hero + footer), echoing without copying the
// reference template's floating orb accents.
export default function FloatingDots({ dots }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            background: dot.color,
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            right: dot.right,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{
            duration: dot.duration || 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay || 0,
          }}
        />
      ))}
    </div>
  );
}
