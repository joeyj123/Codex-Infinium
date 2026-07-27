import { Suspense } from "react";
import { allWorkshopTopicIds } from "@/lib/workshop";
import WorkshopTopicClient from "./WorkshopTopicClient";

export function generateStaticParams() {
  // Only topicId is part of the static path — lang is a runtime query
  // param, same as Forge B's /forge/expert/topic/[topicId]?lang= pattern.
  return allWorkshopTopicIds().map((topicId) => ({ topicId }));
}

export default function WorkshopTopicPage() {
  return (
    <Suspense fallback={null}>
      <WorkshopTopicClient />
    </Suspense>
  );
}
