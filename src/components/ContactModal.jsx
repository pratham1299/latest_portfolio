import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/content";

// Web3Forms access key — get a free one instantly at https://web3forms.com/
// (no login, just verify an email) and drop it into .env as
// VITE_WEB3FORMS_ACCESS_KEY. It's a public client-side key by design, not a
// secret, so it's safe to ship in the bundle.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", required: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
];

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm bg-white/70 outline-none transition-colors duration-200 placeholder:text-[var(--ink-soft)]";

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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

  // Reset to a fresh form each time the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setForm({ name: "", email: "", message: "" });
      setStatus("idle");
    }
  }, [open]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
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
          <motion.div
            className="fixed inset-0"
            style={{ background: "rgba(20,19,18,0.45)", backdropFilter: "blur(4px)", willChange: "opacity" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Scrollable so a modal taller than the viewport is still reachable,
              instead of centering off-screen with no way to scroll to it. */}
          <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md my-8 rounded-[2rem] p-7 sm:p-9 overflow-hidden"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(27,26,26,0.1)",
                boxShadow: "0 40px 90px -30px rgba(27,26,26,0.45)",
                willChange: "transform, opacity",
              }}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1.5px)", backgroundSize: "18px 18px" }}
            />
            <div
              className="absolute -top-16 -right-16 w-48 h-48 pointer-events-none"
              style={{ background: "var(--pill-blue)", borderRadius: "62% 38% 31% 69% / 59% 33% 67% 41%", opacity: 0.6 }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-colors hover:bg-black/5"
              style={{ border: "1px solid rgba(27,26,26,0.12)", background: "#fff" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="var(--ink)" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: "var(--ink-soft)" }}>
                Get In Touch
              </p>
              <h3 className="text-2xl sm:text-3xl mb-2 leading-snug">Let&rsquo;s start a conversation</h3>

              {status === "sent" && (
                <div className="pt-4">
                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--ink-soft)" }}>
                    Thanks, {form.name.split(" ")[0] || "there"} — your message is on its way. I&rsquo;ll reply soon.
                  </p>
                  <button
                    onClick={onClose}
                    className="pill px-5 py-2.5 text-sm font-semibold"
                    style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.1)" }}
                  >
                    Close
                  </button>
                </div>
              )}

              {status === "error" && (
                <div className="pt-4">
                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--ink-soft)" }}>
                    Something went wrong sending that. Please email me directly instead —{" "}
                    <a href={`mailto:${profile.email}`} className="underline hover:opacity-70">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="pill px-5 py-2.5 text-sm font-semibold"
                    style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.1)" }}
                  >
                    Try again
                  </button>
                </div>
              )}

              {(status === "idle" || status === "sending") && (
                <>
                  <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--ink-soft)" }}>
                    Share a few details and I&rsquo;ll get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {FIELDS.map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={field.name}
                          className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                          style={{ color: "var(--ink)" }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={form[field.name]}
                          onChange={handleChange}
                          className={inputClass}
                          style={{ border: "1px solid rgba(27,26,26,0.14)" }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(27,26,26,0.14)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: "var(--ink)" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        placeholder="What would you like to talk about?"
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClass} resize-none`}
                        style={{ border: "1px solid rgba(27,26,26,0.14)" }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--ink)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(27,26,26,0.14)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="pill w-full justify-center px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                      style={{ background: "var(--pill-blue)", border: "1px solid rgba(27,26,26,0.1)" }}
                    >
                      {status === "sending" ? "Sending…" : "Send Message →"}
                    </button>
                  </form>

                  <p className="text-xs text-center mt-5" style={{ color: "var(--ink-soft)" }}>
                    Or reach me directly at{" "}
                    <a href={`mailto:${profile.email}`} className="underline hover:opacity-70">
                      {profile.email}
                    </a>
                  </p>
                </>
              )}
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
