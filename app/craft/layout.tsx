import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Piece-by-Piece Quality Inspection Floor - Surat HQ",
  description:
    "Rigorous 4-step textile floor audit: raw warp density checks, flaw screening on illuminated tables, and moisture-barrier packaging for safe transit.",
  alternates: {
    canonical: `${SITE_URL}/craft`,
  },
  openGraph: {
    title: "Piece-by-Piece Quality Inspection Floor - Surat HQ",
    description:
      "Flaw screening and loom quality control at Maa Sheetla Agency & Sunrise Fab Tex (Adat).",
    url: `${SITE_URL}/craft`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
};

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}