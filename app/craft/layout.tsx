import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piece-by-Piece Quality Inspection Floor - Surat HQ",
  description:
    "Rigorous 4-step textile floor audit: raw warp density checks, flaw screening on illuminated tables, and moisture-barrier packaging for safe transit.",
  alternates: {
    canonical: "https://maasheetla.com/craft",
  },
  openGraph: {
    title: "Piece-by-Piece Quality Inspection Floor - Surat HQ",
    description:
      "Flaw screening and loom quality control at Maa Sheetla Agency & Sunrise Fab Tex (Adat).",
    url: "https://maasheetla.com/craft",
    siteName: "Maa Sheetla Agency",
    locale: "en_IN",
    type: "website",
  },
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}