import type { Metadata } from 'next';
import { brand } from '../../brand.config';
import './globals.css';

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.heroSubheadline,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.heroSubheadline,
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
