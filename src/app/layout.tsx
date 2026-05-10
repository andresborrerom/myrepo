import type { Metadata, Viewport } from 'next';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/config';
import BottomNav from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME
  },
  formatDetection: { telephone: false }
};

export const viewport: Viewport = {
  themeColor: '#B05F40',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-cream-50 text-ink-900 font-sans pb-24">
        <main className="mx-auto max-w-xl px-5 pt-6">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
