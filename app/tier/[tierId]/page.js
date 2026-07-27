import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import TierPageClient from "./TierPageClient";

export function generateStaticParams() {
  return kb.tiers.map((t) => ({ tierId: t.id }));
}

export default function TierPage() {
  return (
    <Suspense fallback={null}>
      <TierPageClient />
    </Suspense>
  );
}
