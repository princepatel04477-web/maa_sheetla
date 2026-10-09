/**
 * Site-wide configuration and SEO canonical domain constants.
 * Supports primary domain (https://sunrisefabtex.com) with fallback.
 */
import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sunrisefabtex.com';
export const ALT_URL = 'https://maasheetla.com';
export const SITE_NAME = 'Sunrise Fab Tex (Adat) & Maa Sheetla Agency';
// Short brand suffix appended to every page title by the root title template.
// The full SITE_NAME pushed titles to 90-115 chars, so Google truncated every one.
export const TITLE_BRAND = 'Sunrise Fab Tex';
export const DEFAULT_TITLE = 'Sunrise Fab Tex & Maa Sheetla | Wholesale Textiles Surat';
export const DEFAULT_DESCRIPTION = 'Sunrise Fab Tex (Adat) & Maa Sheetla Agency: Surat wholesale saree, suit & lehenga commission agency linking 700+ mills with 500+ showrooms since 2008.';

export const OG_IMAGE = {
  url: `${SITE_URL}/img/social/og-default-1200.jpg`,
  width: 1200,
  height: 630,
  alt: 'Sunrise Fab Tex (Adat) & Maa Sheetla Agency - wholesale textile agency, Surat',
};

/**
 * Builds route metadata with canonical, Open Graph and Twitter tags.
 * Next.js replaces (not merges) the openGraph object per route, so every page
 * must restate the image; routing them all through here keeps that consistent.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Skip the " | Sunrise Fab Tex" suffix when the title already leads with the brand. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const socialTitle = absoluteTitle ? title : `${title} | ${TITLE_BRAND}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
