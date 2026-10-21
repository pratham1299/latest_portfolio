import { motion } from "framer-motion";

export function Reveal({
  children,
  as: Component = "div",
  delay = 0,
  y = 28,
  once = true,
  blur = false,
  className = "",
  ...rest
}) {
  const MotionComponent = motion[Component] || motion.div;
  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: blur ? 0.9 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

export function StaggerGroup({ children, as: Component = "div", className = "", stagger = 0.12, once = true, ...rest }) {
  const MotionComponent = motion[Component] || motion.div;
  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

export function StaggerItem({ children, as: Component = "div", className = "", y = 24, ...rest }) {
  const MotionComponent = motion[Component] || motion.div;
  return (
    <MotionComponent
      className={className}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
