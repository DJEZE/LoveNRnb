import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lovenrnb.com'
  ),
  title: {
    default: 'LoveNRnb — Premium R&B Experience | Houston, TX',
    template: '%s | LoveNRnb',
  },
  description:
    'LoveNRnb is Houston\'s premier curated R&B concert series. Intimate shows, headlining artists, elevated atmosphere.',
  keywords: [
    'R&B concert Houston',
    'LoveNRnb',
    'Houston music events',
    'R&B festival Texas',
    'VIP music experience Houston',
    'R&B night Houston',
  ],
  authors: [{ name: 'LoveNRnb' }],
  creator: 'LoveNRnb',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'LoveNRnb',
    title: 'LoveNRnb — Premium R&B Experience | Houston, TX',
    description:
      'Houston\'s most curated R&B concert series. Headlining artists, VIP access, and an atmosphere built for the culture.',
    images: [
      {
        url: '/eze-back-lovernb.jpg',
        width: 1200,
        height: 630,
        alt: 'LoveNRnb — Premium R&B Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveNRnb — Premium R&B Experience',
    description: 'Houston\'s most curated R&B concert series.',
    images: ['/eze-back-lovernb.jpg'],
    creator: '@lovenrnbfest',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ─── Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
