import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Maa Sheetla Agency Surat - Bridal & Silk Saree Wholesale",
  description:
    "Maa Sheetla Agency, Surat: wholesale bridal lehengas, Banarasi tissue and pure silk sarees, and hand-embroidered suits for premium showroom counters.",
  path: "/maa-sheetla",
  absoluteTitle: true,
});

export default function MaaSheetlaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
