import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Sunrise Fab Tex (Adat) Surat - Wholesale Sarees & Suits",
  description:
    "Sunrise Fab Tex (Adat), Surat: wholesale Dola silk and georgette sarees, salwar suits and festive catalogues in 8-12 piece cartons for fast retail turnover.",
  path: "/sunrise-fab-tex",
  absoluteTitle: true,
});

export default function SunriseFabTexLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Sunrise Fab Tex (Adat)", path: "/sunrise-fab-tex" }]} />
      {children}
    </>
  );
}
