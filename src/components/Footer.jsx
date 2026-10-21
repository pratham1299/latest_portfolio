import { footer, profile, instagram } from "../data/content";
import { Reveal } from "./Reveal";

// Drawn from her own established tagline ("Smart with research, sharp with
// outreach...") rather than invented copy — just surfaced as a marquee.
const MARQUEE_ITEMS = ["Smart With Research", "Sharp With Outreach"];

const MailIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const LinkedInIcon = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

// Each pill gets its own accent + hover-fill pairing, cycling through the
// site's mint/blue/yellow family (kept as literal class strings so Tailwind's
// build-time scanner can see them).
const CHANNEL_STYLES = [
  { icon: "text-[var(--accent-mint)]", hover: "hover:bg-[var(--pill-mint)] hover:border-[var(--pill-mint)]" },
  { icon: "text-[var(--accent-sky)]", hover: "hover:bg-[var(--pill-blue)] hover:border-[var(--pill-blue)]" },
  { icon: "text-[var(--accent-amber)]", hover: "hover:bg-[var(--pill-yellow)] hover:border-[var(--pill-yellow)]" },
];

function ChannelPill({ icon, label, value, href, external, styleSet }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex items-center justify-between gap-4 rounded-full px-6 py-4 border border-[var(--divider)] transition-colors duration-300 ${styleSet.hover}`}
    >
      <span className="flex items-center gap-4 min-w-0">
        <span className={`flex-shrink-0 ${styleSet.icon} transition-colors duration-300`}>{icon}</span>
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--ink-soft)" }}>
            {label}
          </span>
          <span className="block text-base sm:text-lg truncate" style={{ color: "var(--ink)" }}>
            {value}
          </span>
        </span>
      </span>
      <svg
        className="w-5 h-5 flex-shrink-0 group-hover:rotate-45 transition-transform duration-300"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10v10M7 17 17 7" />
      </svg>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const channels = [
    { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: LinkedInIcon, label: "LinkedIn", value: "Priyanshi Gupta", href: profile.linkedin, external: true },
    { icon: InstagramIcon, label: "Instagram", value: instagram.handle, href: instagram.url, external: true },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* scrolling marquee, built from her own existing tagline */}
      <div
        className="overflow-hidden py-4"
        style={{ background: "color-mix(in srgb, #B08968 22%, var(--surface))", borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}
      >
        <div className="flex w-max animate-marquee">
          {Array.from({ length: 2 }).map((_, rep) => (
            <span key={rep} className="flex items-center flex-shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="font-bold uppercase px-6 whitespace-nowrap flex-shrink-0"
                  style={
                    i % 2 === 0
                      ? { fontSize: "clamp(1.75rem, 5vw, 3.5rem)", color: "var(--ink)" }
                      : { fontSize: "clamp(1.75rem, 5vw, 3.5rem)", color: "transparent", WebkitTextStroke: "1.5px var(--ink)" }
                  }
                >
                  {MARQUEE_ITEMS[i % 2]}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end mb-16 lg:mb-20">
          <Reveal blur className="lg:col-span-7">
            <h2
              className="uppercase leading-[0.82]"
              style={{
                fontSize: "clamp(3.5rem, 13.5vw, 8.5rem)",
                color: "var(--ink)",
                fontWeight: 700,
                fontFamily: "'Oswald', sans-serif",
                letterSpacing: "-0.025em",
              }}
            >
              Let&rsquo;s
              <br />
              <span style={{ color: "#B08968" }}>Talk</span>
            </h2>
            <p className="italic mt-6 max-w-md text-lg sm:text-xl" style={{ color: "var(--ink-soft)" }}>
              {footer.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-5 w-full space-y-4">
            {channels.map((c, i) => (
              <ChannelPill key={c.label} {...c} styleSet={CHANNEL_STYLES[i % CHANNEL_STYLES.length]} />
            ))}
          </Reveal>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm dashed-rule">
          <div className="flex gap-5 flex-wrap justify-center">
            {footer.quickLinks.map((l) => (
              <a key={l.label} href={l.href} className="hover:opacity-60 transition-opacity">
                {l.label}
              </a>
            ))}
          </div>
          <p style={{ color: "var(--ink-soft)" }}>
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
