"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

// Wraps one highlighted glossary term in the reading text. Click/tap is the
// primary interaction (works on touch) and pins the popover open; hovering
// with a mouse shows the same popover as an additive preview on desktop,
// closing automatically once the pointer leaves.
const POPOVER_WIDTH = 260;

export default function GlossaryTerm({ term, text }) {
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState(null);
  const wrapRef = useRef(null);
  const router = useRouter();
  const visible = pinned || hovering;

  useEffect(() => {
    if (!pinned) return;
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setPinned(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setPinned(false);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  // The popover used to be positioned absolutely inside the reading column,
  // which has overflow-y: auto — that implicitly makes overflow-x auto too,
  // so any popover that would extend past the column's right edge got its
  // text clipped instead of wrapping. Computing a fixed (viewport-relative)
  // position and clamping it fixes that, but the popover also has to be
  // portaled to document.body (below) rather than rendered inline: the
  // book's page-flip container has `transform-style: preserve-3d`, and any
  // transformed/preserve-3d ancestor becomes the containing block for its
  // `position: fixed` descendants instead of the viewport — without the
  // portal, "fixed" would actually be positioned relative to that spinning
  // book container, not the screen, making the clamp math meaningless.
  useEffect(() => {
    if (!visible || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const margin = 12;
    let left = rect.left;
    if (left + POPOVER_WIDTH > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - POPOVER_WIDTH);
    }
    const top = Math.min(rect.bottom + 8, window.innerHeight - margin);
    setPos({ top, left });
  }, [visible]);

  function goToTopic() {
    setPinned(false);
    router.push(`/tier/${term.tier_introduced}/study?topic=${term.topic_id}`);
  }

  return (
    <span
      ref={wrapRef}
      className="glossary-term"
      onClick={(e) => {
        e.stopPropagation();
        setPinned((p) => !p);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="button"
      tabIndex={0}
      aria-expanded={visible}
    >
      {text}
      {visible &&
        pos &&
        createPortal(
          <span
            className="glossary-popover"
            style={{ position: "fixed", top: pos.top, left: pos.left }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="glossary-popover-term">{term.technical_term}</span>
            <span className="glossary-popover-def">{term.definition}</span>
            <button className="btn glossary-popover-link" onClick={goToTopic}>
              Read full page →
            </button>
          </span>,
          document.body
        )}
    </span>
  );
}
