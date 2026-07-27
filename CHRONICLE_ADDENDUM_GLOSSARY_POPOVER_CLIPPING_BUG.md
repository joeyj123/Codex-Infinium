## Session: Bug found — Glossary popover clips text at box edge

**Bug**: the click/tap glossary popover (`components/GlossaryTerm.js`, Forge C mechanism) is clipping definition text at the right edge of the box — words are being cut off mid-word ("comp[uter]", "m[emory]", "bei[ng]", "va[ry]", "fragil[e]" observed in a live screenshot on a RAM-related term), and the header term itself is truncated too. Text is not wrapping/reflowing inside the popover, it's being visually cut off — a width, `overflow`, or `white-space`/word-wrap CSS issue on the popover container, not a content problem.

**Status**: confirmed via screenshot, not yet fixed. Logged to bundle into the next Study-rework session (pagination redesign / textbook content expansion / reading-timer removal) since all of these touch the same page-rendering and popover-adjacent CSS. Flagged as a real readability bug, not cosmetic polish — the popover is currently not usable as intended.
