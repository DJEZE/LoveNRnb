import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: [
      'When you purchase a ticket or sign up for our email list, we collect your name, email address, and payment information (processed securely through our ticketing partner — we do not store payment details).',
      'We may also collect general usage data when you visit our website, including pages visited, time spent, and device type. This data is anonymous and used solely to improve the site experience.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'Your email address is used to send event updates, lineup announcements, and promotional communications from LoveNRnb. You can unsubscribe at any time via the link in any email we send.',
      'We do not sell, rent, or share your personal information with third parties for their marketing purposes.',
      'We may share limited data with service providers (email platforms, ticketing systems) solely to operate our business.',
    ],
  },
  {
    title: 'Email Communications',
    body: [
      'By submitting your email on our site, you agree to receive marketing communications from LoveNRnb. Every email includes an unsubscribe link.',
      'We use Brevo to manage our email list. Your data is stored securely and processed in accordance with their privacy policy.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Our website may use cookies to improve your browsing experience. These are small files stored on your device that help us understand how visitors use our site.',
      'You can disable cookies in your browser settings at any time. Some site features may not function correctly without them.',
    ],
  },
  {
    title: 'Photography & Media Consent',
    body: [
      'By attending a LoveNRnb event, you acknowledge that photos and video may be taken and used for promotional purposes including social media, advertising, and press. If you have concerns, contact us before attending.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We take reasonable precautions to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You have the right to request access to, correction of, or deletion of any personal data we hold about you. To make a request, email us at info@lovenrnb.com.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'If you have any questions about this Privacy Policy, contact us at info@lovenrnb.com or reach out via @lovenrnbfest on Instagram.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-xs text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors mb-12"
        >
          ← Back
        </Link>

        {/* Header */}
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Legal</p>
        <h1
          className="font-display font-black uppercase text-white leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
        >
          Privacy Policy
        </h1>
        <p className="font-body text-sm text-white/30 mb-12">
          Last updated: April 2026 · LoveNRnb, Houston, TX
        </p>

        <div className="w-full h-px bg-white/10 mb-12" />

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display font-black uppercase text-white text-2xl lg:text-3xl mb-4 tracking-tight">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.body.map((para, i) => (
                  <p key={i} className="font-body text-sm text-white/50 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
