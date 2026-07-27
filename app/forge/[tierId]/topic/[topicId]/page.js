import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import ForgeTopicClient from "./ForgeTopicClient";

export function generateStaticParams() {
  const params = [];
  for (const tier of kb.tiers) {
    if (tier.language_tracks) {
      const seen = new Set();
      for (const track of Object.values(tier.language_tracks)) {
        for (const topic of track.topics) {
          if (seen.has(topic.id)) continue;
          seen.add(topic.id);
          params.push({ tierId: tier.id, topicId: topic.id });
        }
      }
    } else {
      for (const topic of tier.topics || []) {
        params.push({ tierId: tier.id, topicId: topic.id });
      }
    }
  }
  return params;
}

export default function ForgeTopicPage() {
  return (
    <Suspense fallback={null}>
      <ForgeTopicClient />
    </Suspense>
  );
}
