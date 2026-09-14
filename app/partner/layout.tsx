import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Wholesale Trade Query & Showroom Onboarding - Direct Loom Rates",
  description:
    "Register your showroom to access direct Surat powerloom rate cards, exclusive territorial designs, and priority wedding season dispatches.",
  alternates: {
    canonical: `${SITE_URL}/partner`,
  },
  openGraph: {
    title: "Wholesale Trade Query & Showroom Onboarding - Direct Loom Rates",
    description:
      "Open an authorized trade counter account with Maa Sheetla Agency & Sunrise Fab Tex (Adat).",
    url: `${SITE_URL}/partner`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return children;
}