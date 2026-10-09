import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Textile Dispatch to 70+ Indian Cities",
  description:
    "Daily rail and road textile dispatch from Surat to 500+ showrooms in 70+ cities across UP, Bihar, MP, Rajasthan, Delhi NCR, Punjab and more.",
  path: "/reach",
});

export default function ReachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
