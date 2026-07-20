import glossaryData from "@/data/glossary.json";

const ALL_TERMS = glossaryData.terms;

// Every term + alias becomes one candidate string to search for, sorted
// longest-first so that at any given position in the text, a longer phrase
// (e.g. "central processing unit") is checked — and claimed — before a
// shorter one (e.g. "processor") gets a chance to match a sub-span of it.
const MATCH_LIST = ALL_TERMS.flatMap((term) => {
  const variants = [term.term, ...(term.aliases || [])];
  return variants.map((text) => ({ term, text, lower: text.toLowerCase() }));
}).sort((a, b) => b.text.length - a.text.length);

function isWordChar(ch) {
  return !!ch && /[a-zA-Z0-9]/.test(ch);
}

function findMatchAt(text, pos) {
  for (const candidate of MATCH_LIST) {
    const len = candidate.text.length;
    if (pos + len > text.length) continue;
    if (text.substr(pos, len).toLowerCase() !== candidate.lower) continue;
    const before = text[pos - 1];
    const after = text[pos + len];
    if (isWordChar(before) || isWordChar(after)) continue;
    return { term: candidate.term, len };
  }
  return null;
}

// Splits one block of text into a mix of plain strings and
// { term, text } segments. `seenIds` is a Set shared across everything
// rendered on the same logical "page" so a term is only ever highlighted
// once per page, not on every repetition.
export function highlightText(text, seenIds) {
  if (!text) return [text];
  const segments = [];
  let i = 0;
  let bufferStart = 0;

  while (i < text.length) {
    const match = findMatchAt(text, i);
    if (!match) {
      i += 1;
      continue;
    }
    if (i > bufferStart) segments.push(text.slice(bufferStart, i));
    const matchedText = text.slice(i, i + match.len);
    if (seenIds.has(match.term.id)) {
      segments.push(matchedText);
    } else {
      seenIds.add(match.term.id);
      segments.push({ term: match.term, text: matchedText });
    }
    i += match.len;
    bufferStart = i;
  }

  if (bufferStart < text.length) segments.push(text.slice(bufferStart));
  return segments;
}

// Convenience for rendering a list of paragraph strings that together make
// up one page/pane — pass a shared Set (or omit to start fresh) so
// first-occurrence tracking spans every paragraph on that page.
export function highlightParagraphs(paragraphs, seenIds = new Set()) {
  return paragraphs.map((para) => highlightText(para, seenIds));
}
