import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Dot + trailing ring cursor, desktop-only (hidden on touch via Tailwind's
// md: breakpoint plus the CSS media-query hiding the OS cursor in index.css).
export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, [data-cursor-hover]"));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mx, my]);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{ x: mx, y: my, translateX: "-50%", translateY: "-50%", width: 7, height: 7, background: "var(--ink)" }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", border: "1px solid var(--ink)" }}
        animate={{
          width: hovering ? 60 : 30,
          height: hovering ? 60 : 30,
          opacity: visible ? (hovering ? 0.6 : 0.3) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
}
