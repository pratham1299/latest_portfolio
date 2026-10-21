import { hero, profile, spec } from "../data/content";
import { Reveal } from "./Reveal";

function SpecRow({ label, values, first = false }) {
  return (
    <div className={`flex justify-between items-start gap-6 py-4 ${first ? "" : "dashed-rule"}`}>
      <span className="font-bold text-sm sm:text-base flex-shrink-0">{label}</span>
      <span className="text-right text-sm sm:text-base" style={{ color: "var(--ink-soft)" }}>
        {values.map((v) => (
          <span key={v} className="block">
            {v}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <Reveal blur as="h2" className="font-normal leading-[1.1] mb-6 block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
            I&rsquo;m {profile.name.split(" ")[0]}, a marketing generalist who believes in insight,
            innovation, and execution.
          </Reveal>
          <Reveal delay={0.1} as="p" className="text-base sm:text-lg leading-relaxed block" style={{ color: "var(--ink-soft)" }}>
            {hero.paragraph}
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <p className="font-bold text-sm tracking-wide mb-1">Creative Profile</p>
          <SpecRow label="Role" values={spec.role} first />
          <SpecRow label="Focus" values={spec.focus} />
          <SpecRow label="Works With" values={[spec.worksWith]} />
          <SpecRow label="Education" values={spec.education} />
          <div className="dashed-rule pt-0" />
        </Reveal>
      </div>
    </section>
  );
}
