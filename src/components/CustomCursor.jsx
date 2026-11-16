import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Hand-drawn paper airplane matching the portfolio's whimsical aesthetic
 * Designed with the nose oriented at (2, 2) for exact pointer click accuracy!
 */
function PaperAirplaneCursor({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="cursorShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      <g filter="url(#cursorShadow)">
        {/* Right Wing Fold */}
        <polygon
          points="2,2 24,10 14,15"
          fill="#f5efc0"
          stroke="#1b1a1a"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Left Wing Main Fold */}
        <polygon
          points="2,2 14,15 10,24"
          fill="#ffffff"
          stroke="#1b1a1a"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        {/* Underfold Keel Shadow (Sky Blue) */}
        <polygon
          points="14,15 10,24 8,17"
          fill="#a9e3f7"
          stroke="#1b1a1a"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Center Spine Crease */}
        <line
          x1="2"
          y1="2"
          x2="14"
          y2="15"
          stroke="#1b1a1a"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Precision pointer click dot at exact tip (0, 0) */}
        <circle cx="2" cy="2" r="1.4" fill="#e11d48" stroke="#1b1a1a" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mouse coordinates (plane tip anchored directly at cursor)
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Aerodynamic trailing ring coordinates with spring physics
  const ringX = useSpring(mx, { stiffness: 280, damping: 26, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 280, damping: 26, mass: 0.5 });

  // Aerodynamic banking rotation based on horizontal movement
  const bankAngle = useMotionValue(0);
  const smoothBank = useSpring(bankAngle, { stiffness: 220, damping: 18 });
  const prevX = useRef(-100);
  const bankTimeoutRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      mx.set(currentX);
      my.set(currentY);
      setVisible(true);

      // Calculate velocity banking
      if (prevX.current !== -100) {
        const dx = currentX - prevX.current;
        // Bank into the turn: moving right banks clockwise, moving left banks counter-clockwise
        const targetAngle = Math.max(-22, Math.min(22, dx * 1.8));
        bankAngle.set(targetAngle);

        if (bankTimeoutRef.current) clearTimeout(bankTimeoutRef.current);
        bankTimeoutRef.current = setTimeout(() => {
          bankAngle.set(0);
        }, 120);
      }
      prevX.current = currentX;
    };

    const handleOver = (e) => {
      const target = e.target;
      const isInteractive = !!target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      );
      setHovering(isInteractive);
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (bankTimeoutRef.current) clearTimeout(bankTimeoutRef.current);
    };
  }, [mx, my, bankAngle]);

  return (
    <div className="hidden md:block pointer-events-none select-none">
      {/* 1. FLUID TRAILING FLIGHT RETICLE RING */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          opacity: visible ? (hovering ? 0.85 : 0.45) : 0,
          scale: clicking ? 0.75 : 1,
          backgroundColor: hovering
            ? "rgba(245, 239, 192, 0.45)" // Warm pastel yellow halo on interactive hover
            : "rgba(169, 227, 247, 0.18)", // Soft sky blue aura on idle
          border: hovering
            ? "1.5px solid #1b1a1a"
            : "1.5px dashed rgba(27, 26, 26, 0.38)",
          boxShadow: hovering ? "0 4px 16px rgba(0,0,0,0.12)" : "none",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        {/* Tiny rotating celestial star sparkle in the trailing ring */}
        <AnimatePresence>
          {!hovering && visible && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.65, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" } }}
              className="text-[9px] text-[#1b1a1a] select-none font-bold"
            >
              ✦
            </motion.span>
          )}
        </AnimatePresence>

        {/* "Tap" invitation label when hovering interactive elements */}
        <AnimatePresence>
          {hovering && visible && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[9px] font-black uppercase tracking-wider text-[#1b1a1a] select-none"
            >
              ✦
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. THE SIGNATURE PAPER AIRPLANE POINTER */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mx,
          y: my,
          rotate: smoothBank,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.88 : hovering ? 1.22 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 20 },
          opacity: { duration: 0.15 },
        }}
      >
        <PaperAirplaneCursor clicking={clicking} />
      </motion.div>
    </div>
  );
}
