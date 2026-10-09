import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact: Surat, Kanpur & Ahmedabad Offices",
  description:
    "Visit or call our wholesale textile offices: Surat HQ at H-32 India Market, Kanpur at Shiv Market Naughara, and Ahmedabad at New Cloth Market.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
