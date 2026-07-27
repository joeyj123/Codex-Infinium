import { ForgeProvider } from "@/lib/ForgeContext";

export default function ForgeLayout({ children }) {
  return <ForgeProvider>{children}</ForgeProvider>;
}
