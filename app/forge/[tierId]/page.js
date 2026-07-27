import { Suspense } from "react";
import kb from "@/data/knowledge_base.json";
import ForgeTierClient from "./ForgeTierClient";

export function generateStaticParams() {
  return kb.tiers.map((t) => ({ tierId: t.id }));
}

export default function ForgeTierPage() {
  return (
    <Suspense fallback={null}>
      <ForgeTierClient />
    </Suspense>
  );
}
