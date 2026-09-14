import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maa Sheetla Agency · Curated Designer Label Desk Surat",
  description:
    "Curated bridal lehengas, Banarasi tissue, pure silk weaves, and hand-embroidered suits for premium retail showroom counters.",
  alternates: {
    canonical: "https://maasheetla.com/maa-sheetla",
  },
  openGraph: {
    title: "Maa Sheetla Agency · Curated Designer Label Desk Surat",
    description:
      "Bridal couture, pure silk sarees, and premium retail showroom sourcing directly from Surat weaving mills.",
    url: "https://maasheetla.com/maa-sheetla",
    siteName: "Maa Sheetla Agency",
    locale: "en_IN",
    type: "website",
  },
};

export default function MaaSheetlaLayout({ children }: { children: React.ReactNode }) {
  return children;
}