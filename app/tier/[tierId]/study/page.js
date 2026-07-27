import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import StudyPageClient from "./StudyPageClient";

export function generateStaticParams() {
  return kb.tiers.map((t) => ({ tierId: t.id }));
}

export default function StudyPage() {
  return (
    <Suspense fallback={null}>
      <StudyPageClient />
    </Suspense>
  );
}
