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
        q: 'Where is LoveNRnB Fest 2026 taking place?',
        a: "LoveNRnB Fest 2026 will take place at Rich's Houston in Houston, Texas.",
      },
      {
        q: 'When is LoveNRnB Fest?',
        a: 'Saturday, November 21, 2026. Doors open at 6:30 PM, with live performances beginning at 7:30 PM.',
      },
      {
        q: 'Who is headlining LoveNRnB Fest?',
        a: 'R&B artist Kaash Paige is the official headliner for LoveNRnB Fest 2026, with more artists and special guests to be announced.',
      },
      {
        q: 'Is there an age requirement?',
        a: 'Yes. LoveNRnB Fest is an 18+ event. All attendees must present a valid government-issued ID. You must be 21 or older to purchase alcohol.',
      },
      {
        q: 'Will more artists be announced?',
        a: 'Yes! Additional artists and special guests will be announced leading up to the event. Follow @lovenrnbfest on Instagram for official updates.',
      },
    ],
  },
  {
    category: 'Tickets',
    questions: [
      {
        q: 'What ticket types are available?',
        a: 'General Admission gives you full access to LoveNRnB Fest 2026, featuring live performances, incredible DJs, and an unforgettable R&B concert atmosphere.\n\nVIP Table Reservations are also available for guests looking to elevate their experience with reserved seating and exclusive table experiences. Limited availability — bottle service minimums may apply.',
      },
      {
        q: 'Are VIP tables available?',
        a: 'Yes. Limited VIP table reservations are available. Bottle service minimums may apply. Purchase through the official ticket link.',
      },
      {
        q: 'Are payment plans available?',
        a: 'Yes! Eligible guests can select Affirm at checkout to view available payment options. Payment plans are subject to eligibility and applicable terms.',
      },
      {
        q: 'Will tickets be available at the door?',
        a: 'Door tickets may be available depending on capacity. We strongly encourage purchasing your tickets in advance to guarantee admission.',
      },
      {
        q: 'Are tickets refundable?',
        a: 'All ticket sales are final except where required by law or otherwise stated by the organizer.',
      },
      {
        q: 'Where do I purchase tickets?',
        a: 'Tickets are available now through our official ticketing page. Click the Get Tickets button on this site.',
        cta: { label: 'Get Tickets Now', href: 'https://posh.vip/e/lovenrnb-festival' },
      },
    ],
  },
  {
    category: 'Venue & Experience',
    questions: [
      {
        q: 'Does VIP include meeting the artists?',
        a: 'No. VIP purchases do not include backstage access or artist meet and greets unless explicitly stated.',
      },
      {
        q: 'Can I leave and come back?',
        a: 'Reentry is subject to venue policy.',
      },
      {
        q: 'Can I bring a camera?',
        a: 'Personal phones and small cameras are welcome. Professional cameras with detachable lenses require prior media approval. Contact us at press@lovenrnb.com for media credentials.',
      },
      {
        q: 'What items are not allowed?',
        a: 'Outside food and beverages, weapons of any kind, professional camera equipment (without credentials), and any items deemed unsafe by venue staff are not permitted. All guests must comply with venue security procedures and event policies.',
      },
      {
        q: 'How can I stay updated?',
        a: 'Follow @lovenrnbfest on Instagram and visit www.lovenrnb.com for event announcements and updates.',
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
        a: 'For sponsorship, media, and partnership inquiries, please use our official contact form or reach out directly.',
        cta: { label: 'Submit Vendor Application', href: 'https://docs.google.com/forms/d/e/1FAIpQLSevxsrSzvEGXMIaWvsXwQ7shRLtt-OK_Of8aJcFi4QX56x4ig/viewform?usp=preview' },
      },
      {
        q: 'How do I submit for press coverage?',
        a: "For press and media inquiries, reach out to press@lovenrnb.com. Include your publication, portfolio, and the type of coverage you're looking to do.",
      },
    ],
  },
]

function FAQItem({ q, a, cta }: { q: string; a: string; cta?: { label: string; href: string } }) {
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
            <p className="font-body text-base text-white/50 leading-relaxed mb-5 max-w-3xl whitespace-pre-line">
              {a}
            </p>
            {cta && (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-6 mb-6 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                {cta.label}
              </a>
            )}
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
            href="https://posh.vip/e/lovenrnb-festival"
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
                  <FAQItem key={item.q} q={item.q} a={item.a} cta={'cta' in item ? item.cta : undefined} />
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
