"use client";

import GlossaryTerm from "@/components/GlossaryTerm";

// Renders the mixed plain-string/term-object array produced by
// lib/glossary.js's highlightText(), used anywhere paragraph text needs
// clickable glossary terms dropped into it.
export default function GlossaryText({ segments, linksEnabled = true }) {
  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      <span key={i}>{seg}</span>
    ) : (
      <GlossaryTerm key={i} term={seg.term} text={seg.text} linksEnabled={linksEnabled} />
    )
  );
}
