import { ForgeProvider } from "@/lib/ForgeContext";

// Reuses the same ForgeProvider as /app/forge/layout.js — the Guided /
// Challenge / Gauntlet exposure level is a shared, session-wide stance per
// the Workshop A spec ("shared across both modes"), not a separate setting.
export default function WorkshopLayout({ children }) {
  return <ForgeProvider>{children}</ForgeProvider>;
}
