import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "70+ City Wholesale Trade Network - Surat Direct Dispatches",
  description:
    "Direct powerloom rail and road freight network connecting 700+ mills with 500+ verified showroom counters across 70+ Indian trade cities.",
  alternates: {
    canonical: `${SITE_URL}/reach`,
  },
  openGraph: {
    title: "70+ City Wholesale Trade Network - Surat Direct Dispatches",
    description:
      "Consolidated 24-to-48 hour dispatches connecting 700+ suppliers with 500+ verified showrooms across 10 states.",
    url: `${SITE_URL}/reach`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
};

export default function ReachLayout({ children }: { children: React.ReactNode }) {
  return children;
}