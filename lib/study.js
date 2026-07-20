// Splits a long explanation into as many physical pages as it naturally
// needs — no fixed cap. Always breaks at a paragraph boundary, never
// mid-sentence or mid-subsection, by greedily packing paragraphs into a
// page until the next paragraph would push it past the target size.
const PAGE_CHAR_TARGET = 900;

export function splitExplanation(text) {
  if (!text) return [""];

  const paras = text.split(/\n\n+/).filter(Boolean);
  if (paras.length <= 1) return [text];

  const pages = [];
  let current = [];
  let currentLen = 0;

  for (const para of paras) {
    const wouldBe = currentLen + para.length + (current.length ? 2 : 0);
    if (current.length && wouldBe > PAGE_CHAR_TARGET) {
      pages.push(current.join("\n\n"));
      current = [para];
      currentLen = para.length;
    } else {
      current.push(para);
      currentLen = wouldBe;
    }
  }
  if (current.length) pages.push(current.join("\n\n"));

  return pages;
}

// Flattens a tier's (or language track's) topic list into physical pages.
// The topic's title/section/page_intro are only meant to be rendered on
// the first physical page (pageNum === 1) — later pages of the same topic
// are plain continuations, not repeated headers.
export function buildBookPages(topics) {
  const pages = [];
  for (const topic of topics) {
    const chunks = splitExplanation(topic.explanation);
    chunks.forEach((chunk, idx) => {
      pages.push({
        topicId: topic.id,
        topic,
        section: topic.section,
        text: chunk,
        pageNum: idx + 1,
        totalPages: chunks.length,
        isFirstPage: idx === 0,
        isLastPage: idx === chunks.length - 1,
      });
    });
  }
  return pages;
}

// Ordered list of unique section keys as they appear in the topic list.
export function buildChapterList(topics) {
  const seen = [];
  for (const t of topics) {
    if (!seen.includes(t.section)) seen.push(t.section);
  }
  return seen;
}
