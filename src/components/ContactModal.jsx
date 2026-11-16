import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { profile } from "../data/content";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const QUICK_TOPICS = [
  {
    icon: "🎯",
    label: "B2B Outbound",
    text: "Hi Priyanshi, I was impressed by your outbound campaigns and would love to chat about a growth strategy for our brand.",
  },
  {
    icon: "📈",
    label: "CRO & Research",
    text: "Hi Priyanshi, let's explore ways to optimize market intelligence and conversion rates for our team.",
  },
  {
    icon: "💼",
    label: "Project Collab",
    text: "Hi Priyanshi, I have an exciting collaboration in mind and would love to discuss working together.",
  },
  {
    icon: "☕",
    label: "Saying Hi",
    text: "Hi Priyanshi, loved exploring your portfolio! Just dropping by to say hello and connect.",
  },
];

/**
 * Hand-drawn paper airplane matching the portfolio's whimsical aesthetic
 */
function ShadedAirplane({ className = "w-14 h-14" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Main left wing */}
      <polygon
        points="60,4 4,32 28,38"
        fill="#ffffff"
        stroke="#1b1a1a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Right wing fold */}
      <polygon
        points="60,4 28,38 38,60"
        fill="#f5efc0"
        stroke="#1b1a1a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Underfold keel shadow */}
      <polygon
        points="28,38 38,60 34,44"
        fill="#a9e3f7"
        stroke="#1b1a1a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Center spine */}
      <line
        x1="60"
        y1="4"
        x2="28"
        y2="38"
        stroke="#1b1a1a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [activeTopic, setActiveTopic] = useState(null);
  // idle -> sending -> sent | error
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Reset to fresh state on open
  useEffect(() => {
    if (open) {
      setForm({ name: "", email: "", message: "" });
      setActiveTopic(null);
      setStatus("idle");
    }
  }, [open]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSelectTopic(topic) {
    if (activeTopic === topic.label) {
      setActiveTopic(null);
      setForm((prev) => ({ ...prev, message: "" }));
    } else {
      setActiveTopic(topic.label);
      setForm((prev) => ({
        ...prev,
        message: topic.text,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const startTime = Date.now();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Air Mail Inquiry from ${form.name}${activeTopic ? ` [${activeTopic}]` : ""}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();

      // Ensure the flight takeoff animation runs smoothly for at least 1100ms
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1100 - elapsed);

      setTimeout(() => {
        if (data.success) {
          setStatus("sent");
          // Multi-cannon pastel confetti explosion!
          confetti({
            particleCount: 55,
            spread: 65,
            origin: { x: 0.35, y: 0.55 },
            colors: ["#ffd84d", "#b7eed0", "#a9e3f7", "#ff4fa6", "#ffffff"],
          });
          confetti({
            particleCount: 55,
            spread: 65,
            origin: { x: 0.65, y: 0.55 },
            colors: ["#ffd84d", "#b7eed0", "#a9e3f7", "#ff4fa6", "#ffffff"],
          });
        } else {
          setStatus("error");
        }
      }, remaining);
    } catch {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1100 - elapsed);
      setTimeout(() => {
        setStatus("error");
      }, remaining);
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          {/* Backdrop with frosted blur */}
          <motion.div
            className="fixed inset-0"
            style={{
              background: "rgba(15, 13, 38, 0.68)",
              backdropFilter: "blur(8px)",
              willChange: "opacity",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <div
            className="fixed inset-0 overflow-y-auto flex items-center justify-center p-3 sm:p-4"
            onClick={onClose}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg my-6 sm:my-8 rounded-[2.2rem] overflow-hidden backdrop-blur-md transition-colors duration-150 shadow-2xl"
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--divider)",
                boxShadow: "0 40px 100px -25px rgba(0,0,0,0.55)",
                willChange: "transform, opacity",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Delicate Pastel Accent Stripe */}
              <div
                className="h-1.5 w-full select-none"
                style={{
                  background: "linear-gradient(90deg, #b7eed0 0%, #a9e3f7 50%, #f5efc0 100%)",
                }}
              />

              {/* Subtle dot grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Decorative corner glow */}
              <div
                className="absolute -top-16 -right-16 w-52 h-52 pointer-events-none"
                style={{
                  background: "var(--pill-blue)",
                  borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%",
                  opacity: 0.35,
                }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                style={{
                  border: "1px solid var(--divider)",
                  background: "var(--bg)",
                  color: "var(--ink)",
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Card Content Wrapper */}
              <div className="p-6 sm:p-8 relative">
                {/* FLIGHT TAKEOFF ANIMATION OVERLAY (Active when sending) */}
                <AnimatePresence>
                  {status === "sending" && (
                    <motion.div
                      key="flight-overlay"
                      className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Atmospheric flight trail arc */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 400 480"
                        fill="none"
                      >
                        <motion.path
                          d="M 60 410 C 130 400, 190 350, 240 250 C 280 170, 320 100, 390 30"
                          stroke="#0284c7"
                          strokeWidth="3.5"
                          strokeDasharray="6 6"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
                          transition={{ duration: 1.1, ease: "easeInOut" }}
                        />
                      </svg>

                      {/* Swooping Paper Airplane */}
                      <motion.div
                        className="absolute"
                        initial={{ x: 50, y: 400, scale: 0.75, rotate: -15, opacity: 0 }}
                        animate={{
                          x: [50, 140, 240, 380],
                          y: [400, 330, 200, 20],
                          scale: [0.75, 1.25, 1.15, 0.45],
                          rotate: [-15, -35, -52, -62],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
                      >
                        <ShadedAirplane className="w-16 h-16 drop-shadow-xl" />
                      </motion.div>

                      {/* Sparkles bursting along the route */}
                      {[0, 1, 2].map((idx) => (
                        <motion.span
                          key={idx}
                          className="absolute text-xl select-none"
                          style={{
                            left: `${30 + idx * 26}%`,
                            top: `${72 - idx * 24}%`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6, delay: 0.2 + idx * 0.22 }}
                        >
                          ✨
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  {/* 1. SUCCESS / AIR MAIL DELIVERED STATE */}
                  {status === "sent" && (
                    <motion.div
                      key="sent-view"
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="pt-2 text-center"
                    >
                      {/* Animated Seal Badge */}
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <motion.div
                          initial={{ scale: 0, rotate: -40 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.08 }}
                          className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-[var(--ink)] shadow-[4px_4px_0px_0px_var(--ink)]"
                          style={{ background: "var(--accent-mint)" }}
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.3, 1] }}
                            transition={{ delay: 0.2, duration: 0.35 }}
                            className="text-4xl leading-none"
                          >
                            💌
                          </motion.span>
                        </motion.div>

                        {/* Verified Badge */}
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
                          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black border-2 border-[var(--surface)] shadow-sm"
                        >
                          ✓
                        </motion.span>
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl font-normal leading-tight mb-2 text-[var(--ink)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Message In Flight! ✈️
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-5"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Thanks{" "}
                        <strong className="text-[var(--ink)]">
                          {form.name.split(" ")[0] || "there"}
                        </strong>
                        ! Your note has been dispatched straight to Priyanshi&rsquo;s inbox. She will get back to you shortly at{" "}
                        <span className="font-semibold text-[var(--ink)]">{form.email}</span>.
                      </p>

                      {/* Summary Slip */}
                      <div
                        className="rounded-2xl p-4 mb-6 text-left relative overflow-hidden backdrop-blur-md"
                        style={{
                          background: "var(--bg)",
                          border: "1.5px dashed var(--divider)",
                        }}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--divider)]">
                          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--pill-yellow)] text-[#1b1a1a] border border-black/10">
                            AIR MAIL • DISPATCHED
                          </span>
                          <span
                            className="text-[11px] font-semibold"
                            style={{ color: "var(--ink-soft)" }}
                          >
                            Status: Delivered
                          </span>
                        </div>
                        <p
                          className="text-xs italic leading-relaxed line-clamp-2"
                          style={{ color: "var(--ink-soft)" }}
                        >
                          &ldquo;{form.message}&rdquo;
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            setForm({ name: "", email: "", message: "" });
                            setActiveTopic(null);
                            setStatus("idle");
                          }}
                          className="pill flex-1 justify-center px-5 py-3 text-sm font-semibold text-[#1b1a1a] hover:opacity-85 transition-opacity cursor-pointer"
                          style={{
                            background: "var(--pill-mint)",
                            border: "1px solid rgba(27,26,26,0.12)",
                          }}
                        >
                          ↺ Send Another Note
                        </button>
                        <button
                          onClick={onClose}
                          className="pill flex-1 justify-center px-5 py-3 text-sm font-semibold text-white bg-[var(--ink)] hover:opacity-85 transition-opacity cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. ERROR STATE */}
                  {status === "error" && (
                    <motion.div
                      key="error-view"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-2 text-center"
                    >
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center bg-red-100 text-red-600 text-2xl font-bold border border-red-300">
                        !
                      </div>
                      <h3
                        className="text-xl sm:text-2xl mb-2 font-normal text-[var(--ink)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        Could not dispatch message
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-6"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Something went wrong with the submission. Please reach out to Priyanshi directly via email:
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="pill inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold mb-6 text-[#1b1a1a]"
                        style={{ background: "var(--pill-yellow)", border: "1px solid rgba(27,26,26,0.12)" }}
                      >
                        <span>{profile.email} ✉</span>
                      </a>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setStatus("idle")}
                          className="pill flex-1 justify-center px-5 py-2.5 text-sm font-semibold text-[#1b1a1a] cursor-pointer"
                          style={{ background: "var(--pill-mint)", border: "1px solid rgba(27,26,26,0.12)" }}
                        >
                          Try Again
                        </button>
                        <button
                          onClick={onClose}
                          className="pill flex-1 justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[var(--ink)] cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* 3. ELEVATED EDITORIAL CONTACT FORM */}
                  {(status === "idle" || status === "sending") && (
                    <div>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4 pr-8">
                        <div>
                          <div
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-xs mb-2.5"
                            style={{
                              background: "var(--pill-blue)",
                              color: "#1b1a1a",
                              border: "1px solid rgba(27, 26, 26, 0.12)",
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse" />
                            <span>Let&rsquo;s Connect</span>
                          </div>
                          <h3
                            className="text-2xl sm:text-3xl font-normal leading-[1.15] text-[var(--ink)]"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            Start a conversation <span className="italic font-light" style={{ color: "#B08968" }}>with Priyanshi</span>
                          </h3>
                          <p
                            className="text-xs sm:text-sm leading-relaxed mt-1"
                            style={{ color: "var(--ink-soft)" }}
                          >
                            Have a project, role, or growth challenge in mind? Drop a line below.
                          </p>
                        </div>

                        {/* Whimsical Hand-Drawn Airplane Emblem */}
                        <div className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-2xl border border-[var(--divider)] bg-[var(--bg)] shadow-xs">
                          <ShadedAirplane className="w-8 h-8 drop-shadow-xs" />
                        </div>
                      </div>

                      {/* Interactive Topic / Intent Starters */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: "var(--ink-soft)" }}
                          >
                            What&rsquo;s on your mind?
                          </span>
                          {activeTopic && (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveTopic(null);
                                setForm((f) => ({ ...f, message: "" }));
                              }}
                              className="text-[11px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                            >
                              Clear Selection ✕
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {QUICK_TOPICS.map((topic) => {
                            const isSelected = activeTopic === topic.label;
                            return (
                              <button
                                key={topic.label}
                                type="button"
                                onClick={() => handleSelectTopic(topic)}
                                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 text-left ${
                                  isSelected
                                    ? "shadow-sm scale-[1.02]"
                                    : "hover:scale-[1.01]"
                                }`}
                                style={{
                                  background: isSelected ? "var(--pill-yellow)" : "var(--bg)",
                                  color: isSelected ? "#1b1a1a" : "var(--ink)",
                                  border: isSelected ? "1.5px solid #1b1a1a" : "1px solid var(--divider)",
                                  fontWeight: isSelected ? 600 : 500,
                                }}
                              >
                                <span className="text-sm">{topic.icon}</span>
                                <span className="truncate">{topic.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Compact, Beautiful Form */}
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Sender Name */}
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-xs font-medium mb-1"
                              style={{ color: "var(--ink)" }}
                            >
                              Your Name <span className="text-[#e11d48]">*</span>
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              disabled={status === "sending"}
                              placeholder="e.g. Alex Morgan"
                              value={form.name}
                              onChange={handleChange}
                              className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 placeholder:opacity-40 font-sans"
                              style={{
                                background: "var(--bg)",
                                color: "var(--ink)",
                                border: "1px solid var(--divider)",
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#B08968";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(176, 137, 104, 0.18)";
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = "var(--divider)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            />
                          </div>

                          {/* Reply Destination */}
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-xs font-medium mb-1"
                              style={{ color: "var(--ink)" }}
                            >
                              Email Address <span className="text-[#e11d48]">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              disabled={status === "sending"}
                              placeholder="alex@company.com"
                              value={form.email}
                              onChange={handleChange}
                              className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 placeholder:opacity-40 font-sans"
                              style={{
                                background: "var(--bg)",
                                color: "var(--ink)",
                                border: "1px solid var(--divider)",
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.borderColor = "#B08968";
                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(176, 137, 104, 0.18)";
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor = "var(--divider)";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label
                              htmlFor="message"
                              className="block text-xs font-medium"
                              style={{ color: "var(--ink)" }}
                            >
                              Your Message <span className="text-[#e11d48]">*</span>
                            </label>
                            <span className="text-[10px]" style={{ color: "var(--ink-soft)" }}>
                              {form.message.length > 0 ? `${form.message.length} chars` : "Tell me about your idea"}
                            </span>
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            required
                            disabled={status === "sending"}
                            placeholder="Write your note or question here… Priyanshi personally reads and replies to every message."
                            value={form.message}
                            onChange={handleChange}
                            className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all duration-200 resize-none leading-relaxed placeholder:opacity-40 font-sans"
                            style={{
                              background: "var(--bg)",
                              color: "var(--ink)",
                              border: "1px solid var(--divider)",
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = "#B08968";
                              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(176, 137, 104, 0.18)";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "var(--divider)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          />
                        </div>

                        {/* Interactive Dispatch Button */}
                        <div className="pt-1">
                          <button
                            type="submit"
                            disabled={status === "sending"}
                            className="relative w-full group overflow-hidden rounded-full py-3.5 px-6 font-bold text-sm text-[#1b1a1a] shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-85 cursor-pointer flex items-center justify-center"
                            style={{
                              background:
                                status === "sending"
                                  ? "var(--pill-mint)"
                                  : "linear-gradient(135deg, #f5efc0 0%, #a9e3f7 100%)",
                              border: "1.5px solid rgba(27, 26, 26, 0.2)",
                            }}
                          >
                            <AnimatePresence mode="wait">
                              {status === "sending" ? (
                                <motion.div
                                  key="sending-text"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  className="flex items-center gap-2.5 font-bold"
                                >
                                  <motion.span
                                    animate={{ x: [0, 8, 0], y: [0, -3, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                                    className="inline-block"
                                  >
                                    ✈️
                                  </motion.span>
                                  <span>Launching Note into Flight…</span>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="idle-text"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  className="flex items-center gap-2 font-bold tracking-wide"
                                >
                                  <span>Send Air Mail Note</span>
                                  <motion.span
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                    className="inline-block text-base"
                                  >
                                    ✈️
                                  </motion.span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>

                        {/* Guarantee Footer */}
                        <div className="flex items-center justify-between pt-1 text-[11px]" style={{ color: "var(--ink-soft)" }}>
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Direct to personal inbox</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>⚡</span>
                            <span>Avg response &lt; 24h</span>
                          </span>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
