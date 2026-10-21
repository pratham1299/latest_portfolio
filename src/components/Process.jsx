import { process } from "../data/content";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const STEP_COLORS = [
  { bg: "var(--pill-mint)", ring: "var(--accent-mint)" },
  { bg: "var(--pill-blue)", ring: "var(--accent-sky)" },
  { bg: "var(--pill-yellow)", ring: "var(--accent-amber)" },
];

export default function Process() {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Reveal blur as="h2" className="font-normal mb-5 leading-[1.1] block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
          My Approach to Marketing Impact
        </Reveal>
        <Reveal delay={0.1} as="p" className="text-base sm:text-lg block" style={{ color: "var(--ink-soft)" }}>
          A simple, repeatable process built around research, execution, and optimization.
        </Reveal>
      </div>

      <StaggerGroup className="max-w-5xl mx-auto relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6" stagger={0.12}>
        <div className="hidden md:block absolute left-0 right-0 top-5 h-px" style={{ background: "var(--divider)" }} />

        {process.map((step, i) => (
          <StaggerItem key={step.title} className="relative">
            <span
              className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full mb-4 text-sm font-bold"
              style={{
                background: STEP_COLORS[i % STEP_COLORS.length].bg,
                color: STEP_COLORS[i % STEP_COLORS.length].ring,
                border: `1.5px solid ${STEP_COLORS[i % STEP_COLORS.length].ring}`,
              }}
            >
              0{i + 1}
            </span>
            <h3 className="text-xl sm:text-2xl mb-2">{step.title}</h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {step.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
