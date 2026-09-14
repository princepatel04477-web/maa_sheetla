import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunrise Fab Tex (Adat) - Volume Commercial Saree & Suit Desk",
  description:
    "High-velocity wholesale commercial cartons, Dola silk, printed georgettes, and festive salwar suits packed for fast retail turnover.",
  alternates: {
    canonical: "https://maasheetla.com/sunrise-fab-tex",
  },
  openGraph: {
    title: "Sunrise Fab Tex (Adat) - Volume Commercial Saree & Suit Desk",
    description:
      "Volume textile adat and commercial cartons directly from Surat trading floors.",
    url: "https://maasheetla.com/sunrise-fab-tex",
    siteName: "Maa Sheetla Agency",
    locale: "en_IN",
    type: "website",
  },
};

export default function SunriseFabTexLayout({ children }: { children: React.ReactNode }) {
  return children;
}