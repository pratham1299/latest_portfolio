import { useState } from "react";
import { motion } from "framer-motion";
import { projects, works } from "../data/content";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";

const projectToWorksKey = {
  "Employee Advocacy Campaign": "Employee Advocacy Campaign",
  "Certification & Vendor Management": "Certification & Vendor Management",
  "LinkedIn Outreach Campaigns": "LinkedIn Outreach",
  "Competitor & Market Research": "Market Research",
  "Account-Based Marketing": "Account-Based Marketing",
  "Lead Generation Workflows (Outbound)": "Lead Generation",
};

const tints = ["var(--pill-mint)", "var(--pill-blue)", "var(--pill-yellow)"];
const bolds = ["var(--accent-mint)", "var(--accent-sky)", "var(--accent-amber)"];
const tilts = [-2, 1.5, -1, 2, -1.5, 1];

const blobShapes = [
  "62% 38% 31% 69% / 59% 33% 67% 41%",
  "38% 62% 66% 34% / 47% 62% 38% 53%",
  "68% 32% 47% 53% / 32% 58% 42% 68%",
];

function ProjectCard({ project, index }) {
  const [flipped, setFlipped] = useState(false);
  const worksKey = projectToWorksKey[project.title];
  const worksCatRaw = worksKey ? works[worksKey] : null;
  // A works entry can exist as a placeholder (see Employee Advocacy Campaign
  // and Certification & Vendor Management) before real documents are added —
  // treat it as "no case files yet" until subcategories is actually populated.
  const worksCat = worksCatRaw?.subcategories?.length ? worksCatRaw : null;
  const tint = tints[index % tints.length];
  const bold = bolds[index % bolds.length];
  const tilt = tilts[index % tilts.length];
  const blobRadius = blobShapes[index % blobShapes.length];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="flip-card h-72 group"
      onHoverStart={() => worksCat && setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      initial={{ rotate: tilt }}
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="flip-card-face absolute inset-0 rounded-2xl p-6 flex flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_20px_45px_-20px_rgba(27,26,26,0.28)]"
          style={{ background: `color-mix(in srgb, ${tint} 22%, var(--surface))`, border: "1px solid rgba(27,26,26,0.08)" }}
        >
          {/* decorative blob */}
          <motion.div
            className="absolute -top-12 -right-14 w-44 h-44 pointer-events-none"
            style={{
              background: `color-mix(in srgb, ${tint} 85%, var(--ink) 8%)`,
              borderRadius: blobRadius,
            }}
            animate={{ rotate: [0, 12, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* dot-grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* oversized ghost folio number */}
          <span
            className="absolute -bottom-6 -right-1 font-normal select-none pointer-events-none leading-none"
            style={{ fontSize: "6.5rem", color: "var(--ink)", opacity: 0.09 }}
          >
            {num}
          </span>

          <div className="relative z-10 flex flex-col h-full">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mb-3"
              style={{ background: bold }}
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="var(--ink)" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={project.icon} />
              </svg>
            </motion.div>

            <h3 className="text-lg leading-snug mb-2">{project.title}</h3>
            <p className="text-sm leading-relaxed flex-1 overflow-hidden" style={{ color: "var(--ink-soft)" }}>
              {project.description}
            </p>

            {worksCat && (
              <div className="dashed-rule pt-3 text-xs font-semibold uppercase tracking-wide">
                <span>Case files ({worksCat.subcategories.length})</span>
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="flip-card-face flip-card-back absolute inset-0 rounded-2xl p-5 flex flex-col"
          style={{ background: tint, border: "1px solid rgba(27,26,26,0.08)" }}
        >
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 flex-shrink-0">
            {project.title} — Case Files
          </h4>
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {worksCat?.subcategories.map((sub) => (
              <a
                key={sub.name}
                href={sub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 text-xs py-1.5 px-2 rounded-lg bg-white/40 hover:bg-white/70 transition-colors"
              >
                <span>{sub.name}</span>
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Reveal blur as="h2" className="font-normal mb-4 block" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.25rem)" }}>
          Selected Work
        </Reveal>
        <Reveal delay={0.1} as="p" className="text-base sm:text-lg leading-relaxed block" style={{ color: "var(--ink-soft)" }}>
          Delivered marketing initiatives spanning LinkedIn strategy, content, outreach, vendor &amp; certification
          management, and SEO — pairing research with hands-on execution to fuel growth.
        </Reveal>
      </div>

      <StaggerGroup className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {projects.map((project, i) => (
          <StaggerItem key={project.title}>
            <ProjectCard project={project} index={i} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
