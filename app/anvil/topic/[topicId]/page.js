import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import { allAnvilTopicIds } from "@/lib/anvil";
import AnvilTopicClient from "./AnvilTopicClient";

export function generateStaticParams() {
  // Only topicId is part of the static path — lang/tier are runtime query
  // params, same as Forge B's /forge/expert/topic/[topicId]?lang= pattern.
  // Generated for every topic in the whole knowledge base, not just ones
  // with Anvil content yet — AnvilTopicClient already renders a
  // "no challenges forged yet" banner for topics with none, same
  // convention Forge's topic route uses.
  return allAnvilTopicIds(kb).map((topicId) => ({ topicId }));
}

export default function AnvilTopicPage() {
  return (
    <Suspense fallback={null}>
      <AnvilTopicClient />
    </Suspense>
  );
}
