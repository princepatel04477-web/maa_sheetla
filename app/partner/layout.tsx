import type { Metadata } from "next";
import { pageMetadata } from "../../lib/site";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = pageMetadata({
  title: "Showroom Onboarding & Loom Rate Query",
  description:
    "Register your saree or suit showroom for direct Surat loom rate cards, territorial design exclusivity and priority wedding-season dispatch.",
  path: "/partner",
});

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Showroom Onboarding", path: "/partner" }]} />
      {children}
    </>
  );
}
