import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale Trade Query & Showroom Onboarding · Direct Loom Rates",
  description:
    "Register your showroom to access direct Surat powerloom rate cards, exclusive territorial designs, and priority wedding season dispatches.",
  alternates: {
    canonical: "https://maasheetla.com/partner",
  },
  openGraph: {
    title: "Wholesale Trade Query & Showroom Onboarding · Direct Loom Rates",
    description:
      "Open an authorized trade counter account with Maa Sheetla Agency & Sunrise Fab Tex (Adat).",
    url: "https://maasheetla.com/partner",
    siteName: "Maa Sheetla Agency",
    locale: "en_IN",
    type: "website",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}