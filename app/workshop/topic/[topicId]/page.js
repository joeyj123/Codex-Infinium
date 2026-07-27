import { Suspense } from "react";
import { WORKSHOP_PILOT_TOPIC_IDS } from "@/lib/workshop";
import WorkshopTopicClient from "./WorkshopTopicClient";

export function generateStaticParams() {
  return WORKSHOP_PILOT_TOPIC_IDS.map((topicId) => ({ topicId }));
}

export default function WorkshopTopicPage() {
  return (
    <Suspense fallback={null}>
      <WorkshopTopicClient />
    </Suspense>
  );
}
