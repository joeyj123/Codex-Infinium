// Removes Next.js's per-page RSC prefetch payload files (__next.*.txt) from the
// static export. They're only used for client-side soft-navigation prefetch;
// without them Next.js falls back to a normal full page load of the target
// route's own static HTML, which is what a Tauri-embedded static export does
// anyway. Left in place, these ~6,200 extra small files make Tauri's asset
// embedding step (tauri::generate_context!) take hours instead of minutes.
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

function walk(dir) {
  let removed = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removed += walk(full);
      if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
    } else if (entry.name.endsWith(".txt")) {
      fs.unlinkSync(full);
      removed++;
    }
  }
  return removed;
}

const removed = walk(outDir);
console.log(`prune-export: removed ${removed} RSC prefetch payload file(s) from out/`);
