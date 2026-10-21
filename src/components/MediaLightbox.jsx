import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

// A full-size viewer for a mixed set of images/video — object-contain so each
// item shows uncropped, with left/right arrows (and arrow keys) sliding
// through every item regardless of type. Rendered through a portal straight
// into document.body: the flip card it's triggered from sits inside a
// 3D-transformed ancestor (rotateY), and a CSS transform on an ancestor
// creates a new containing block for `position: fixed` — without the
// portal, the overlay gets trapped inside that card's small box instead of
// covering the full viewport.
//
// `media` is [{ type: "image" | "video", src }], `index` the one showing.
export default function MediaLightbox({ media, index, alt, onClose, onIndexChange }) {
  const hasMultiple = media.length > 1;
  const item = media[index];

  function goPrev() {
    onIndexChange((index - 1 + media.length) % media.length);
  }

  function goNext() {
    onIndexChange((index + 1) % media.length);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && hasMultiple) goPrev();
      else if (e.key === "ArrowRight" && hasMultiple) goNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, index, hasMultiple]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div className="absolute inset-0" style={{ background: "rgba(13,12,12,0.8)" }} />

      <AnimatePresence mode="wait" initial={false}>
        {item.type === "video" ? (
          <motion.video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            className="relative max-w-full max-h-full rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <motion.img
            key={item.src}
            src={item.src}
            alt={alt}
            className="relative max-w-full max-h-full object-contain rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="var(--ink)" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="var(--ink)" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <span
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.9)", color: "var(--ink)" }}
          >
            {index + 1} / {media.length}
          </span>
        </>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.9)" }}
      >
        <svg className="w-4 h-4" fill="none" stroke="var(--ink)" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </motion.div>,
    document.body
  );
}
