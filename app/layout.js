import "./globals.css";
import kb from "@/data/knowledge_base.json";
import { buildKbSummary } from "@/lib/kbSummary";
import { ProgressProvider } from "@/lib/ProgressContext";
import { AppearanceProvider } from "@/lib/AppearanceContext";
import { OnboardingProvider } from "@/lib/OnboardingContext";
import { NotebookProvider } from "@/lib/NotebookContext";
import Sidebar from "@/components/Sidebar";
import UtilityDrawer from "@/components/UtilityDrawer";
import UpdateBanner from "@/components/UpdateBanner";

export const metadata = {
  title: "Codex Infinium",
  description: "A grimoire of code and machine",
};

export default function RootLayout({ children }) {
  const kbSummary = buildKbSummary(kb);
  return (
    <html lang="en">
      <body>
        <AppearanceProvider>
          <OnboardingProvider>
            <ProgressProvider kb={kbSummary}>
              <NotebookProvider>
                <div className="layout">
                  <Sidebar kb={kbSummary} />
                  <main className="main">
                    <UpdateBanner />
                    {children}
                  </main>
                </div>
                <UtilityDrawer />
              </NotebookProvider>
            </ProgressProvider>
          </OnboardingProvider>
        </AppearanceProvider>
      </body>
    </html>
  );
}
