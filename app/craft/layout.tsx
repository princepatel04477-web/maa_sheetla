import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Textile Quality Inspection Floor, Surat",
  description:
    "How every saree, suit and lehenga lot is checked before dispatch: warp density checks, illuminated flaw tables, needlework audit and moisture-proof packing.",
  path: "/craft",
});

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return children;
}
