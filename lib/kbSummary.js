// A lightweight structural summary of the knowledge base: tier/topic
// identity only (id/name/icon), no topic content (explanation/hint/
// examples/page_intro). Sidebar, ProgressContext, and achievements only
// ever need to know WHICH topics exist and their ids for
// progress/unlock/achievement checks, never the teaching content itself.
//
// Passing the full ~6.4MB knowledge_base.json as a prop from the root
// layout (a Server Component) into these Client Components was getting
// serialized directly into every single statically exported page's own
// HTML - including pages with no topic content at all, like 404.html and
// settings.html - inflating the ~628-page static export to ~3.7GB and
// crashing Tauri's release build with an out-of-memory error while
// embedding it. Study/Forge topic pages still import the full JSON
// directly themselves (they genuinely need the content for their own
// topic), which Next.js correctly dedupes into a shared JS chunk instead
// of duplicating per-page, since that's a plain module import inside a
// Client Component rather than a server-to-client prop.
export function buildKbSummary(kb) {
  return {
    tiers: kb.tiers.map((tier) => {
      if (tier.id === "expert") {
        return {
          id: tier.id,
          name: tier.name,
          icon: tier.icon,
          language_tracks: Object.fromEntries(
            Object.entries(tier.language_tracks).map(([lang, track]) => [
              lang,
              { topics: track.topics.map((t) => ({ id: t.id })) },
            ])
          ),
        };
      }
      return {
        id: tier.id,
        name: tier.name,
        icon: tier.icon,
        topics: (tier.topics || []).map((t) => ({ id: t.id })),
      };
    }),
  };
}
