import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { profile, works } from "../data/content";
import { categoryColors } from "../utils/colors";
import MagneticButton from "./MagneticButton";
import ContactModal from "./ContactModal";

// Skip placeholder categories (e.g. Employee Advocacy Campaign) until they
// have real documents — an empty dropdown entry would look broken.
const worksKeys = Object.keys(works).filter((key) => works[key].subcategories.length > 0);

const RESUME_URL = "/Priyanshi-Gupta-Resume.pdf";
const RESUME_FILENAME = "Priyanshi-Gupta-Resume.pdf";

// Resume link opens the PDF in a new tab (default anchor behavior) *and*
// silently triggers a save via a second, download-flagged anchor — so a
// single click both previews and downloads it.
function triggerResumeDownload() {
  const link = document.createElement("a");
  link.href = RESUME_URL;
  link.download = RESUME_FILENAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const linkListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};
const linkItemVariants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

export default function Navbar() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const isExperience = location.pathname === "/experience";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileCategory, setMobileCategory] = useState(null);
  const menuRef = useRef(null);
  const activeCat = activeCategory ? works[activeCategory] : null;
  const activeColor = activeCat ? categoryColors[activeCat.color] : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setWorksOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Every time the mega-menu closes, forget the last hovered category so the
  // next open starts fresh (categories only) rather than pre-selecting one.
  useEffect(() => {
    if (!worksOpen) setActiveCategory(null);
  }, [worksOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-[#f5f3ee]/90 backdrop-blur-md shadow-xs border-b border-black/5" : "py-4 sm:py-5 bg-transparent"
      }`}
    >
      {/* Spotlight scrim behind the open mega-menu */}
      <AnimatePresence>
        {worksOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ background: "rgba(27,26,26,0.08)", backdropFilter: "blur(2px)" }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-50">
        <div className="flex justify-between items-center">
          <a
            href="/#home"
            className="pill px-4 py-2 text-sm sm:text-base font-medium text-[#1b1a1a] shadow-2xs border border-black/10 hover:scale-[1.02] transition-transform"
            style={{ background: "var(--pill-yellow)" }}
          >
            {profile.name}
          </a>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/about"
              className="pill px-5 py-2 text-sm font-medium text-[#1b1a1a] hover:opacity-75 transition-all shadow-2xs border border-black/10"
              style={{ background: isAbout ? "var(--pill-blue)" : "var(--pill-mint)" }}
            >
              About
            </Link>

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setWorksOpen((v) => !v)}
                className="pill relative flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-[#1b1a1a] hover:text-black transition-all shadow-2xs border border-black/10 overflow-hidden"
                style={{ background: "var(--pill-mint)" }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(120deg, var(--pill-blue), var(--pill-yellow), var(--pill-mint))" }}
                  initial={false}
                  animate={{ opacity: worksOpen ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative transition-colors hover:text-black">Works</span>
                <motion.svg
                  className="relative w-3.5 h-3.5 transition-colors hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: worksOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {worksOpen && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ layout: { type: "spring", stiffness: 320, damping: 32 }, default: { type: "spring", stiffness: 340, damping: 28 } }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 max-w-[92vw] rounded-3xl overflow-hidden shadow-[0_30px_70px_-25px_rgba(27,26,26,0.35)]"
                    style={{ background: "#f5f3ee", border: "1px solid rgba(27,26,26,0.12)" }}
                  >
                    <div className="flex relative">
                      {/* Category rail */}
                      <div className="w-60 py-3 relative z-10 flex-shrink-0" style={{ borderRight: activeCat ? "1px dashed rgba(27,26,26,0.2)" : "none" }}>
                        {worksKeys.map((key) => {
                          const cat = works[key];
                          const colors = categoryColors[cat.color];
                          const active = activeCategory === key;
                          return (
                            <button
                              key={key}
                              onMouseEnter={() => setActiveCategory(key)}
                              onClick={() => setActiveCategory(key)}
                              className={`relative w-full flex items-center gap-3 px-4 py-2.5 text-left group transition-colors ${
                                active ? "text-black font-semibold" : "text-[#1b1a1a] hover:text-black"
                              }`}
                            >
                              {active && (
                                <motion.div
                                  layoutId="works-active-pill"
                                  className="absolute inset-y-0.5 inset-x-1.5 rounded-xl border border-black/10"
                                  style={{ background: colors.soft }}
                                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                              )}
                              <span
                                className="relative w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                                style={{ background: colors.soft, transform: active ? "scale(1.08)" : "scale(1)" }}
                              >
                                <svg
                                  className="w-3.5 h-3.5 transition-colors"
                                  fill="none"
                                  stroke="#1b1a1a"
                                  strokeWidth={1.8}
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                                </svg>
                              </span>
                              <span className="relative text-sm font-medium leading-tight transition-colors group-hover:text-black">
                                {key}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Content panel — only exists once a category has been hovered */}
                      <AnimatePresence mode="popLayout">
                        {activeCat && (
                          <motion.div
                            key="panel"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 380, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ width: { type: "spring", stiffness: 320, damping: 32 }, opacity: { duration: 0.2 } }}
                            className="overflow-hidden"
                          >
                            <div className="w-[380px] p-5 max-h-96 overflow-y-auto overflow-x-hidden relative">
                              {/* decorative blob, recolors with active category */}
                              <motion.div
                                key={`blob-${activeCat.color}`}
                                className="absolute -top-14 -right-16 w-40 h-40 pointer-events-none"
                                style={{ background: activeColor.ring, borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.5, scale: 1, rotate: [0, 10, 0] }}
                                transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                              />
                              <div
                                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                                style={{ backgroundImage: "radial-gradient(#1b1a1a 1px, transparent 1.5px)", backgroundSize: "16px 16px" }}
                              />

                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeCategory}
                                  initial="hidden"
                                  animate="show"
                                  exit={{ opacity: 0, x: -6, transition: { duration: 0.12 } }}
                                  variants={linkListVariants}
                                  className="relative z-10 space-y-1"
                                >
                                  <p className="text-xs font-semibold uppercase tracking-wide mb-2 px-1 text-black/60">
                                    {activeCat.subcategories.length} case files
                                  </p>
                                  {activeCat.subcategories.map((sub) => (
                                    <motion.a
                                      key={sub.name}
                                      variants={linkItemVariants}
                                      href={sub.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setWorksOpen(false)}
                                      whileHover={{ x: 4 }}
                                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-[#1b1a1a] hover:text-black hover:bg-black/[0.05] transition-colors group"
                                    >
                                      <span className="transition-colors group-hover:text-black">{sub.name}</span>
                                      <svg
                                        className="w-3.5 h-3.5 flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:text-black transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                      </svg>
                                    </motion.a>
                                  ))}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/experience"
              className="pill px-5 py-2 text-sm font-medium text-[#1b1a1a] hover:opacity-75 transition-all shadow-2xs border border-black/10"
              style={{ background: isExperience ? "var(--pill-blue)" : "var(--pill-mint)" }}
            >
              Experience
            </Link>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerResumeDownload}
              className="pill px-5 py-2 text-sm font-medium text-[#1b1a1a] hover:opacity-75 transition-all shadow-2xs border border-black/10"
              style={{ background: "var(--pill-mint)" }}
            >
              Resume
            </a>
            <Link
              to="/hero-concepts"
              className="pill px-4 py-2 text-xs font-bold text-purple-900 bg-purple-100 hover:bg-purple-200 transition-all shadow-2xs border border-purple-300 flex items-center gap-1.5"
            >
              <span>✨</span>
              <span>Hero Concepts</span>
            </Link>
          </div>

          <MagneticButton
            as="button"
            onClick={() => setContactOpen(true)}
            className="hidden lg:inline-flex pill px-5 py-2.5 text-sm font-semibold text-[#1b1a1a] hover:opacity-85 transition-all shadow-2xs border border-black/10"
            style={{ background: "var(--pill-blue)" }}
          >
            Let&rsquo;s Connect
          </MagneticButton>

          <button
            className="lg:hidden pill w-10 h-10 flex items-center justify-center text-[#1b1a1a] shadow-2xs border border-black/10"
            style={{ background: "var(--pill-mint)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden relative z-50 border-b border-black/10 shadow-lg"
            style={{ background: "#f5f3ee" }}
          >
            <div className="container mx-auto px-4 pb-5 pt-2 flex flex-col gap-2 max-w-6xl max-h-[75vh] overflow-y-auto">
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="pill w-full px-5 py-3 text-sm font-medium text-[#1b1a1a] border border-black/10 shadow-2xs"
                style={{ background: isAbout ? "var(--pill-blue)" : "var(--pill-mint)" }}
              >
                About
              </Link>

              <div className="rounded-3xl overflow-hidden text-[#1b1a1a] border border-black/10 shadow-2xs" style={{ background: "var(--pill-mint)" }}>
                <button
                  onClick={() => setMobileCategory(mobileCategory === "__open" ? null : "__open")}
                  className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-[#1b1a1a] hover:text-black transition-colors"
                >
                  Works
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${mobileCategory ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileCategory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3 space-y-1">
                        {worksKeys.map((key) => {
                          const cat = works[key];
                          const colors = categoryColors[cat.color];
                          const open = mobileCategory === key;
                          return (
                            <div key={key} className="rounded-xl overflow-hidden" style={{ background: "#eaeaea" }}>
                              <button
                                onClick={() => setMobileCategory(open ? "__open" : key)}
                                className="w-full flex items-center gap-3 py-2.5 px-3 text-sm font-medium text-[#1b1a1a] hover:text-black transition-colors group"
                              >
                                <span
                                  className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ background: colors.soft }}
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="#1b1a1a" strokeWidth={1.6} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                                  </svg>
                                </span>
                                <span className="flex-1 text-left transition-colors group-hover:text-black">{key}</span>
                                <svg
                                  className={`w-3 h-3 transition-transform flex-shrink-0 ${open ? "rotate-90" : ""}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                              {open && (
                                <div className="px-3 pb-2 space-y-1">
                                  {cat.subcategories.map((sub) => (
                                    <a
                                      key={sub.name}
                                      href={sub.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 px-2 text-xs text-[#1b1a1a]/75 hover:text-black transition-colors"
                                    >
                                      {sub.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/experience"
                onClick={() => setMobileOpen(false)}
                className="pill w-full px-5 py-3 text-sm font-medium text-[#1b1a1a] border border-black/10 shadow-2xs"
                style={{ background: isExperience ? "var(--pill-blue)" : "var(--pill-mint)" }}
              >
                Experience
              </Link>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  triggerResumeDownload();
                  setMobileOpen(false);
                }}
                className="pill w-full px-5 py-3 text-sm font-medium text-center text-[#1b1a1a] border border-black/10 shadow-2xs"
                style={{ background: "var(--pill-mint)" }}
              >
                Resume
              </a>
              <Link
                to="/hero-concepts"
                onClick={() => setMobileOpen(false)}
                className="pill w-full px-5 py-3 text-sm font-bold text-center text-purple-900 bg-purple-100 border border-purple-300 shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>✨ Preview Hero Concepts</span>
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
                className="pill w-full px-5 py-3 text-sm font-semibold text-[#1b1a1a] border border-black/10 shadow-2xs"
                style={{ background: "var(--pill-blue)" }}
              >
                Let&rsquo;s Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </nav>
  );
}
