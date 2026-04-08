import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
}

const SECTIONS = [
  {
    title: 'Ticket Purchases',
    body: [
      'All ticket sales are final. No refunds or exchanges will be issued under any circumstances, including personal scheduling conflicts or changes in lineup.',
      'Tickets are non-transferable and may not be resold for profit. LoveNRnb reserves the right to cancel any ticket obtained through unauthorized channels.',
      'In the event of a cancellation or postponement due to circumstances beyond our control (weather, venue issues, etc.), ticket holders will be notified via the email provided at purchase. Options for credit or rescheduling will be communicated at that time.',
    ],
  },
  {
    title: 'Entry & Conduct',
    body: [
      'This is an 18+ event. Valid government-issued photo ID is required for entry. Guests must be 21+ to purchase or consume alcohol — ID will be checked at the bar.',
      'LoveNRnb reserves the right to refuse entry or remove any guest who displays disruptive, threatening, or unsafe behavior without refund.',
      'Re-entry is not permitted once you exit the venue. Plan accordingly.',
    ],
  },
  {
    title: 'Prohibited Items',
    body: [
      'The following items are strictly prohibited: outside food and beverages, weapons of any kind, professional camera equipment without prior media credentials, laser pointers, and any items deemed unsafe by venue staff.',
      'All bags are subject to search upon entry.',
    ],
  },
  {
    title: 'Lineup & Schedule',
    body: [
      'The lineup and performance schedule are subject to change without notice. Artist substitutions or cancellations do not constitute grounds for a refund.',
      'Set times and stage assignments may be adjusted on the day of the event.',
    ],
  },
  {
    title: 'Photography & Media',
    body: [
      'By attending LoveNRnb, you consent to being photographed or filmed for promotional purposes. Images or video may be used on our social media platforms and marketing materials without compensation.',
      'Professional cameras with detachable lenses require prior media approval. Contact press@lovenrnb.com for credentials.',
    ],
  },
  {
    title: 'Liability',
    body: [
      'LoveNRnb and its organizers are not liable for any loss, theft, injury, or damage incurred during the event. Attend at your own risk.',
      'LoveNRnb is not responsible for any third-party content, vendors, or services present at the event.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions regarding these terms, reach out to us at info@lovenrnb.com or follow @lovenrnbfest on Instagram.',
    ],
  },
]

export default function TermsPage() {
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
          Terms &amp; Conditions
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
