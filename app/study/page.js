import { Suspense } from "react";
import StudyHomeClient from "./StudyHomeClient";

export default function StudyHomePage() {
  return (
    <Suspense fallback={null}>
      <StudyHomeClient />
    </Suspense>
  );
}
