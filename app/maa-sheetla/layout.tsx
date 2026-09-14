import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Maa Sheetla Agency - Curated Designer Label Desk Surat",
  description:
    "Curated bridal lehengas, Banarasi tissue, pure silk weaves, and hand-embroidered suits for premium retail showroom counters.",
  alternates: {
    canonical: `${SITE_URL}/maa-sheetla`,
  },
  openGraph: {
    title: "Maa Sheetla Agency - Curated Designer Label Desk Surat",
    description:
      "Bridal couture, pure silk sarees, and premium retail showroom sourcing directly from Surat weaving mills.",
    url: `${SITE_URL}/maa-sheetla`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
};

export default function MaaSheetlaLayout({ children }: { children: React.ReactNode }) {
  return children;
}