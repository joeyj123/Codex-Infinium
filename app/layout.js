import "./globals.css";
import kb from "@/data/knowledge_base.json";
import { ProgressProvider } from "@/lib/ProgressContext";
import { AppearanceProvider } from "@/lib/AppearanceContext";
import { OnboardingProvider } from "@/lib/OnboardingContext";
import { NotebookProvider } from "@/lib/NotebookContext";
import Sidebar from "@/components/Sidebar";
import UtilityDrawer from "@/components/UtilityDrawer";

export const metadata = {
  title: "Codex Infinium",
  description: "A grimoire of code and machine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppearanceProvider>
          <OnboardingProvider>
            <ProgressProvider kb={kb}>
              <NotebookProvider>
                <div className="layout">
                  <Sidebar kb={kb} />
                  <main className="main">{children}</main>
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
