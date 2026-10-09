import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Textile Quality Inspection Floor, Surat",
  description:
    "How every saree, suit and lehenga lot is checked before dispatch: warp density checks, illuminated flaw tables, needlework audit and moisture-proof packing.",
  path: "/craft",
});

export default function CraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Quality Inspection", path: "/craft" }]} />
      {children}
    </>
  );
}
