import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
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

        {/* Amplitude */}
        <Script src="https://cdn.amplitude.com/script/b62c1eec1c46d2963a218a94de0163ea.js" strategy="afterInteractive" />
        <Script id="amplitude-init" strategy="afterInteractive">{`
          window.amplitude.init("b62c1eec1c46d2963a218a94de0163ea", undefined, {
            autocapture: {
              attribution: true,
              pageViews: true,
              sessions: true,
              formInteractions: true,
              fileDownload: true,
              elementInteractions: true,
              frustrationInteractions: true,
              networkTracking: true,
              webVitals: true
            }
          });
        `}</Script>

        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ygwwg2nuso");
        `}</Script>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L914X2JP6G" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L914X2JP6G');
        `}</Script>
      </body>
    </html>
  )
}
