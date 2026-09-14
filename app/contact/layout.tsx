import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Trading Floors & Offices - Surat - Kanpur - Ahmedabad",
  description:
    "Direct contact details and addresses for our Surat Flagship HQ at H-32 India Market, Kanpur Regional Office at Shiv Market, and Ahmedabad New Cloth Market floor.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Trading Floors & Offices - Surat - Kanpur - Ahmedabad",
    description:
      "Connect with key personnel, trade desks, and visit our 3 trading floors across India.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}