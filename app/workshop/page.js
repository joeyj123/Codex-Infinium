"use client";

import { useRouter } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { WORKSHOP_PILOT_TOPIC_IDS, getWorkshopTopic } from "@/lib/workshop";

// The Workshop's hub, pilot version: a flat list of the handful of Expert
// Python topics that have real reorder/fix challenges authored so far,
// rather than a full tier/language selector like The Forge has — there's
// only one language track in this pilot, so an extra selection layer would
// just be a click for no reason.
export default function WorkshopPage() {
  const router = useRouter();

  return (
    <div>
      <h1>🛠️ The Workshop</h1>
      <p style={{ color: "var(--muted)" }}>
        Reorder scrambled code into a working program, or fix a broken one — graded by really running your code
        (Python, via Pyodide). Pilot batch: a handful of Expert Python topics.
      </p>

      <div className="lang-grid" style={{ marginTop: 20 }}>
        {WORKSHOP_PILOT_TOPIC_IDS.map((topicId) => {
          const topic = getWorkshopTopic(kb, topicId);
          if (!topic) return null;
          const count = topic.workshop_challenges?.length || 0;
          return (
            <div
              key={topicId}
              className="card"
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => router.push(`/workshop/topic/${topicId}`)}
            >
              <h4>{topic.title}</h4>
              <p className="stat-line">{count} challenges forged</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
