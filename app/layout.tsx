import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

// ─── Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lovenrnb.com'
  ),
  title: {
    default: "LoveNRnB | The South's Premier R&B Experience",
    template: '%s | LoveNRnB',
  },
  description:
    "LoveNRnB is an R&B entertainment brand behind LoveNRnB Fest (Houston's annual R&B festival) and LoveNRnB Live (national touring concert experience). Official SXSW 2027 Music Showcase Presenter.",
  keywords: [
    'LoveNRnB',
    'LoveNRnB Fest',
    'LoveNRnB Live',
    'Houston R&B Festival',
    'R&B Concert Experience',
    'SXSW 2027',
    'Houston R&B Events',
    'R&B Entertainment Brand',
    'Live R&B Music',
    'R&B Festival',
  ],
  authors: [{ name: 'LoveNRnB' }],
  creator: 'LoveNRnB',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'LoveNRnB',
    title: "LoveNRnB | The South's Premier R&B Experience",
    description:
      "LoveNRnB is an R&B entertainment brand behind LoveNRnB Fest (Houston), LoveNRnB Live (national tour), and an Official SXSW 2027 Music Showcase. The South's premier R&B experience.",
    images: [
      {
        url: '/images/hero-concert.jpg',
        width: 2000,
        height: 1333,
        alt: "LoveNRnB — The South's Premier R&B Experience",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "LoveNRnB | The South's Premier R&B Experience",
    description: "LoveNRnB Fest · LoveNRnB Live · SXSW 2027. The South's premier R&B experience, built in Houston.",
    images: ['/images/hero-concert.jpg'],
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

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2069390263954070');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=2069390263954070&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
