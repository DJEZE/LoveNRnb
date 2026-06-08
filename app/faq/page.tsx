'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    category: 'The Event',
    questions: [
      {
        q: 'What is LoveNRnb?',
        a: 'LoveNRnb is a premium R&B concert series based in Houston, TX. We curate intimate, high-energy shows featuring top R&B artists in elevated, production-forward settings. Every event is built around the culture — the music, the fashion, the vibes.',
      },
      {
        q: 'When and where is the next event?',
        a: 'The next LoveNRnb event is November 14, 2026 at Soho Festival Grounds in Houston, TX. Doors open at 5:00 PM.',
      },
      {
        q: 'What time do doors open?',
        a: 'Doors open at 6:00 PM. We recommend arriving early — GA+ and VIP guests receive priority entry.',
      },
      {
        q: 'What should I wear?',
        a: 'This is a premium experience — dress the part. Think elevated, fashion-forward fits. We love to see the people show up and show out.',
      },
      {
        q: 'Is there parking available?',
        a: 'Yes, parking is available at and around 9PM Music Hall. We recommend arriving early or using rideshare to avoid delays. Full parking details will be sent via email closer to the event.',
      },
    ],
  },
  {
    category: 'Tickets',
    questions: [
      {
        q: 'What ticket types are available?',
        a: 'We offer three tiers: General Admission (GA) at $85, GA+ at $125 which includes priority entry and an exclusive wristband, and VIP at $200 which includes priority entry, dedicated VIP section, exclusive merch, and access to the Friday VIP Kickoff Event.',
      },
      {
        q: 'Can I get a refund?',
        a: 'All ticket sales are final and non-refundable. Tickets are non-transferable. In the event of a cancellation or postponement, details will be communicated directly to ticket holders.',
      },
      {
        q: 'What is included with VIP?',
        a: 'VIP includes priority entry (skip the line), access to the dedicated VIP section, and access to the Friday VIP Kickoff Event.',
      },
      {
        q: 'What is GA+ and how is it different from GA?',
        a: 'GA+ includes everything in General Admission plus early entry before the general GA doors open and an exclusive GA+ wristband. It\'s the best middle-ground for guests who want a step up without full VIP.',
      },
      {
        q: 'Where do I purchase tickets?',
        a: 'Tickets are available through Gatekeepers. You can purchase directly from the Tickets section on this site or at gatekeepers.app. Make sure to buy from official links only.',
      },
    ],
  },
  {
    category: 'Venue & Experience',
    questions: [
      {
        q: 'Will there be food and drinks?',
        a: 'Yes. A full cash bar will be available to all attendees. Food vendors will be on-site — follow @lovenrnbfest for updates.',
      },
      {
        q: 'Is re-entry allowed?',
        a: 'Re-entry policy will be communicated at the event. We generally do not allow re-entry once you exit the venue, so plan accordingly.',
      },
      {
        q: 'Can I bring a camera?',
        a: 'Personal phones and small cameras are welcome. Professional cameras with detachable lenses require prior media approval. Contact us at press@lovenrnb.com for media credentials.',
      },
      {
        q: 'Is this an all ages event?',
        a: 'This is an all ages event. Guests must be 21+ to purchase or consume alcohol — valid government-issued ID will be checked at the bar.',
      },
      {
        q: 'What items are not allowed?',
        a: 'Outside food and beverages, weapons of any kind, professional camera equipment (without credentials), and any items deemed unsafe by venue staff are not permitted.',
      },
    ],
  },
  {
    category: 'Partners & Vendors',
    questions: [
      {
        q: 'How do I become a sponsor?',
        a: 'We partner with brands that align with R&B culture and our audience — fashion, lifestyle, beverages, and more. Reach out to partnerships@lovenrnb.com to request our sponsorship deck.',
      },
      {
        q: 'How do I apply as a vendor?',
        a: 'We welcome curated vendors who fit the LoveNRnb aesthetic. Send your vendor inquiry to vendors@lovenrnb.com with details about your brand and what you\'d like to bring to the event.',
      },
      {
        q: 'How do I submit for press coverage?',
        a: 'For press and media inquiries, reach out to press@lovenrnb.com. Include your publication, portfolio, and the type of coverage you\'re looking to do.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className={cn(
          'font-display font-bold text-xl lg:text-2xl uppercase leading-tight transition-colors duration-200',
          open ? 'text-gold' : 'text-white group-hover:text-gold'
        )}>
          {q}
        </span>
        <span className="flex-shrink-0 mt-1">
          {open
            ? <Minus size={18} className="text-gold" />
            : <Plus size={18} className="text-white/40 group-hover:text-gold transition-colors" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-base text-white/50 leading-relaxed pb-6 max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Nav back */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl uppercase text-white hover:text-gold transition-colors">
            LoveN<span className="text-gold">Rnb</span>
          </Link>
          <Link
            href="/#tickets"
            className="inline-flex items-center h-9 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors"
          >
            Get Tickets
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Help Center</p>
          <h1
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
          >
            FAQ
          </h1>
          <div className="w-full h-px bg-white/10 mt-8" />
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {FAQS.map((section) => (
            <div key={section.category}>
              {/* Category label */}
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
                {section.category}
              </p>

              {/* Questions */}
              <div>
                {section.questions.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-20 lg:mt-28 border border-white/10 p-10 lg:p-14">
          <div className="w-full h-px bg-white/10 mb-10 -mt-10 lg:-mt-14 hidden" />
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Still have questions?</p>
          <h2
            className="font-display font-black uppercase text-white leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            We&apos;re Here.
          </h2>
          <p className="font-body text-base text-white/40 max-w-md mb-8">
            Can&apos;t find what you&apos;re looking for? Reach out directly and we&apos;ll get back to you.
          </p>
          <a
            href="mailto:info@lovenrnb.com"
            className="inline-flex items-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  )
}
