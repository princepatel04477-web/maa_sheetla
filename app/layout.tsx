import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Maa Sheetla Agency — Wholesale Textiles from Surat', description: 'Two firms. One floor. Wholesale sarees, lehengas, suits and garments for boutiques across India.', metadataBase: new URL('https://maasheetla.com') };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }