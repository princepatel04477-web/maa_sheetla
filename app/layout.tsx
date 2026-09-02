import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

export const viewport: Viewport = {
  themeColor: '#0C0A0E',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Maa Sheetla Agency · Wholesale Textile Agency Surat',
    template: '%s | Maa Sheetla Agency',
  },
  description: 'Maa Sheetla Agency & Sunrise Fab Tex. B2B Wholesale Textile Brokerage & Commission Agency connecting 700+ suppliers around India with 500+ buyers.',
  metadataBase: new URL('https://maasheetla.com'),
  keywords: [
    'wholesale textile agency Surat',
    'saree wholesale broker Surat',
    'lehenga manufacturer agent Surat',
    'wholesale textile commission Surat',
    'saree wholesale supplier Lucknow',
    'saree supplier Kanpur',
    'wholesale textile agency Bhopal',
    'wholesale suits Delhi NCR',
    'Maa Sheetla Agency',
    'Sunrise Fab Tex Surat'
  ],
  authors: [{ name: 'Maa Sheetla Agency' }],
  openGraph: {
    title: 'Maa Sheetla Agency · B2B Wholesale Textile Agency',
    description: 'Wholesale textile commission agency established 2010 in Surat, connecting 700+ suppliers with 500+ buyers across India.',
    url: 'https://maasheetla.com',
    siteName: 'Maa Sheetla Agency',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://maasheetla.com/img/social/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Maa Sheetla Agency & Sunrise Fab Tex — Two Desks, One Floor, Surat HQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maa Sheetla Agency · Surat Textile Agency',
    description: 'B2B Wholesale textile brokerage in Surat connecting 700+ suppliers with 500+ buyers across India.',
    images: ['https://maasheetla.com/img/social/og-default.jpg'],
  },
  alternates: {
    canonical: 'https://maasheetla.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Maa Sheetla Agency',
    alternateName: ['Sunrise Fab Tex Pvt Ltd', 'Sunrise Fab Tex'],
    url: 'https://maasheetla.com',
    foundingDate: '2010',
    founder: {
      '@type': 'Person',
      name: 'Manish Kanodia',
      jobTitle: 'Founder & CEO',
      telephone: '+91-96164-15615'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'H-32 India Market, Salabatpura, Ring Road',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      postalCode: '395002',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-91510-03198',
        contactType: 'sales & trading floor',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'gu'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-91510-60273',
        contactType: 'kanpur office',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-95596-50752',
        contactType: 'ahmedabad office & sales',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'gu'],
      }
    ],
    subOrganization: [
      {
        '@type': 'Organization',
        name: 'Maa Sheetla Agency',
        description: 'The designer label desk. Curated bridal lehengas, pure silk weaves, and hand-embroidered suits for retail showroom counters.',
      },
      {
        '@type': 'Organization',
        name: 'Sunrise Fab Tex Pvt Ltd',
        description: 'The volume commercial desk. High-velocity wholesale cartons priced and packed for retail turnover.',
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300..600;1,9..40,300..400&family=Fraunces:ital,opsz,wght@0,9..144,300..500;1,9..144,300..400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warp text-khadi selection:bg-kumkum selection:text-white antialiased">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
