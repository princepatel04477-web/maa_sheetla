import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import WebsiteLoader from '../components/WebsiteLoader';
import PageTransition from '../components/PageTransition';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Let the page paint into the notch and home-indicator area; the safe-area
  // padding in globals.css keeps content clear of both.
  viewportFit: 'cover',
  colorScheme: 'light',
  // The old value was near-black (#0C0A0E) while the page background is cream,
  // so Android Chrome painted a black address bar above a light page.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFBF7' },
    { media: '(prefers-color-scheme: dark)', color: '#FCFBF7' },
  ],
};

import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../lib/site';

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    'wholesale textile agency Surat',
    'saree wholesale broker Surat',
    'lehenga manufacturer agent Surat',
    'wholesale textile commission Surat',
    'saree wholesale supplier Lucknow',
    'saree supplier Kanpur',
    'wholesale textile agency Bhopal',
    'wholesale suits Delhi NCR',
    'Sunrise Fab Tex (Adat) Surat',
    'Sunrise Fab Tex Adat Surat',
    'Sunrise Adat Surat',
    'Maa Sheetla Agency',
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/img/social/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sunrise Fab Tex Adat & Maa Sheetla Agency — Two Desks, One Floor, Surat HQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/img/social/og-default.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=solid4', sizes: 'any' },
      { url: '/favicon.png?v=solid4', type: 'image/png' },
      { url: '/favicon-32x32.png?v=solid4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=solid4', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=solid4', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=solid4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [
          'Sunrise Fab Tex (Adat)',
          'Sunrise Fab Tex Pvt Ltd Adat',
          'Sunrise Adat',
          'Sunrise Fab Tex',
          'Maa Sheetla Agency',
          'Maa Sheetla Agency & Sunrise Fab Tex (Adat)'
        ],
        sameAs: [
          'https://sunrisefabtex.com',
          'https://maasheetla.com'
        ],
        url: SITE_URL,
        logo: `${SITE_URL}/logos/sunrise_fab_tex_colored-320.png`,
        foundingDate: '2008',
        founder: {
          '@type': 'Person',
          name: 'Manish Kanodia',
          jobTitle: 'Founder & CEO',
          telephone: '+91-96164-15615'
        },
        description:
          'B2B Wholesale Textile Brokerage & Commission Agency connecting 700+ suppliers around India with 500+ buyers across 70+ trade cities.',
        department: [
          {
            '@type': 'WholesaleStore',
            name: 'Sunrise Fab Tex (Adat)',
            description: 'The volume commercial desk. High-velocity wholesale cartons priced and packed for retail turnover.'
          },
          {
            '@type': 'WholesaleStore',
            name: 'Maa Sheetla Agency',
            description: 'The designer label desk. Curated bridal lehengas, pure silk weaves, and hand-embroidered suits for retail showroom counters.'
          }
        ]
      },
      {
        '@type': 'WholesaleStore',
        '@id': `${SITE_URL}/#surat-hq`,
        name: 'Sunrise Fab Tex (Adat) & Maa Sheetla Agency - Surat Flagship HQ',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        image: `${SITE_URL}/logos/sunrise_fab_tex_colored-320.png`,
        telephone: '+91-91510-03198',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'H-32 India Market, Salabatpura, Ring Road',
          addressLocality: 'Surat',
          addressRegion: 'Gujarat',
          postalCode: '395002',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.1895,
          longitude: 72.8436
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '20:00'
          }
        ]
      },
      {
        '@type': 'WholesaleStore',
        '@id': `${SITE_URL}/#kanpur-office`,
        name: 'Maa Sheetla Agency & Sunrise Fab Tex - Kanpur Regional Office',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        telephone: '+91-91510-60273',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '50/274 Shiv Market, Naughara',
          addressLocality: 'Kanpur',
          addressRegion: 'Uttar Pradesh',
          postalCode: '208001',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 26.4719,
          longitude: 80.3496
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:30'
          }
        ]
      },
      {
        '@type': 'WholesaleStore',
        '@id': `${SITE_URL}/#ahmedabad-floor`,
        name: 'Sunrise Fab Tex (Adat) & Maa Sheetla Agency - Ahmedabad Trade Desk',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        telephone: '+91-95596-50752',
        priceRange: '₹₹',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '300, 1st Floor, New Cloth Market, Sarangpur',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '380002',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 23.0189,
          longitude: 72.5976
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:30',
            closes: '20:00'
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does the wholesale textile commission brokerage work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Maa Sheetla Agency and Sunrise Fab Tex (Adat) act as direct commission brokers connecting showroom owners with verified powerloom weavers in Surat and Ahmedabad at authentic loom rates with zero hidden markups and zero-bad-debt guarantees.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the dispatch timelines to North and Central India?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Consolidated rail and road cargo dispatches depart daily from our Surat floor, reaching 70+ wholesale destinations across Uttar Pradesh, Bihar, Jharkhand, NCR, and Madhya Pradesh within 24 to 48 hours.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the quality control inspection process before dispatch?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every lot undergoes a 4-step physical inspection at our H-32 India Market trading floor, including raw warp density verification, illuminated flaw table screening, embroidery needlework audit, and heavy-duty moisture-barrier packaging.'
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300..600;1,9..40,300..400&family=Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-[100svh] flex flex-col bg-warp text-khadi selection:bg-kumkum selection:text-white antialiased safe-x">
        <WebsiteLoader />
        <Header />
        <main className="flex-1 w-full">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
