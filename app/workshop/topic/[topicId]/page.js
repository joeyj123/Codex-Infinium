import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import { allWorkshopTopicIds } from "@/lib/workshop";
import WorkshopTopicClient from "./WorkshopTopicClient";

export function generateStaticParams() {
  // Only topicId is part of the static path — lang/tier are runtime query
  // params, same as Forge B's /forge/expert/topic/[topicId]?lang= pattern.
  // Generated for every topic in the whole knowledge base, not just ones
  // with Workshop content yet — WorkshopTopicClient already renders a
  // "no challenges forged yet" banner for topics with none, same
  // convention Forge's topic route uses.
  return allWorkshopTopicIds(kb).map((topicId) => ({ topicId }));
}

export default function WorkshopTopicPage() {
  return (
    <Suspense fallback={null}>
      <WorkshopTopicClient />
    </Suspense>
  );
}
