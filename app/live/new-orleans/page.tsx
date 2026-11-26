import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { NewOrleansCountdown } from '@/components/sections/NewOrleansCountdown'

export const metadata: Metadata = {
  title: 'LoveNRnB Live: New Orleans — February 27, 2027',
  description:
    'LoveNRnB Live is coming to New Orleans on February 27, 2027. A night dedicated to R&B, culture, community and unforgettable live experiences. Sign up for exclusive early access.',
  openGraph: {
    title: 'LoveNRnB Live: New Orleans — February 27, 2027',
    description:
      "New Orleans, we're coming. LoveNRnB Live brings its Concert & Party Experience to New Orleans on February 27, 2027. Sign up for early access.",
    images: [
      {
        url: '/images/hero-concert.jpg',
        width: 2000,
        height: 1333,
        alt: 'LoveNRnB Live — New Orleans 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoveNRnB Live: New Orleans — February 27, 2027',
    description: "New Orleans, we're coming. LoveNRnB Live · February 27, 2027. Sign up for early access.",
    images: ['/images/hero-concert.jpg'],
  },
}

const FEATURES = ['Early Access to Tickets', 'Event Announcements', 'Exclusive Updates']

export default function NewOrleansPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen">

        {/* ── Cinematic Hero ── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-concert.jpg"
              alt="LoveNRnB Live — New Orleans"
              fill
              className="object-cover object-center opacity-45"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 90% 70% at 50% 40%, rgba(204,0,0,0.18) 0%, rgba(140,0,0,0.06) 55%, transparent 75%),
                  linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, #000 100%)
                `,
              }}
            />
          </div>

          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
          />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-6 pt-32 pb-24">
            <AnimatedSection className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">
                  LoveNRnB Live · New Orleans, Louisiana
                </span>
              </div>

              {/* Date eyebrow */}
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">
                February 27, 2027
              </p>

              {/* Headline */}
              <h1
                className="font-display font-black uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
              >
                New Orleans,<br />
                <span className="text-gold">We&apos;re Coming.</span>
              </h1>

              {/* Tagline */}
              <p className="font-body text-xs text-gold/60 uppercase tracking-[0.3em] mb-4">
                The South&apos;s Premier R&amp;B Experience
              </p>

              {/* Body */}
              <p className="font-body text-base lg:text-lg text-white/55 max-w-2xl leading-relaxed mb-12">
                LoveNRnB Live is bringing its signature Concert &amp; Party Experience to New Orleans on February 27, 2027.
                A night dedicated to R&amp;B, culture, community and unforgettable live experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-20">
                <a
                  href="#register"
                  className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  Get Early Access
                </a>
                <a
                  href="/live"
                  className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-gold border border-gold/50 hover:border-gold hover:bg-gold/5 transition-all duration-200"
                >
                  About LoveNRnB Live
                </a>
              </div>

              {/* Countdown */}
              <div>
                <p className="font-body text-2xs text-white/30 uppercase tracking-[0.2em] mb-6">Time Until the Event</p>
                <NewOrleansCountdown showCountdownOnly />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── Announcement Bar ── */}
        <section className="bg-black">
          <div className="w-full h-px bg-white/10" />
          <div
            className="py-16 lg:py-20"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,0,0,0.08) 0%, transparent 70%), #000',
            }}
          >
            <div className="container mx-auto px-6">
              <AnimatedSection className="max-w-3xl mx-auto text-center">
                <p className="font-body text-base lg:text-lg text-white/55 leading-relaxed mb-10">
                  Sign up for exclusive early access to tickets, event announcements and more.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {FEATURES.map((f) => (
                    <div key={f} className="border border-white/10 px-5 py-2.5">
                      <span className="font-body text-xs text-white/50 uppercase tracking-[0.15em]">{f}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* ── Registration ── */}
        <section id="register" className="bg-black">
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left — copy */}
              <AnimatedSection delay={0.1}>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Early Access</p>
                <h2
                  className="font-display font-black uppercase text-white leading-none mb-6"
                  style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
                >
                  Be First<br />
                  <span className="text-gold">In Line.</span>
                </h2>
                <div className="w-12 h-0.5 bg-gold mb-8" />
                <p className="font-body text-base text-white/50 leading-relaxed mb-10 max-w-sm">
                  LoveNRnB Live: New Orleans is coming February 27, 2027.
                  Sign up now for exclusive early access to tickets, announcements, and everything LoveNRnB has in store.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <p className="font-body text-sm text-white/40">First access when tickets drop</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <p className="font-body text-sm text-white/40">Lineup and event announcements</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <p className="font-body text-sm text-white/40">Exclusive LoveNRnB updates</p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right — form */}
              <AnimatedSection delay={0.2}>
                <NewOrleansCountdown showFormOnly />

                {/* SMS section */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="font-body text-2xs text-white/30 uppercase tracking-[0.2em] mb-4">Also get SMS updates</p>
                  <a
                    href="https://laylo.com/lovenrnb_/OmnUoi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/30 hover:border-gold hover:bg-gold/5 transition-all duration-200"
                  >
                    Get SMS Updates
                  </a>
                  <p className="font-body text-2xs text-white/20 mt-3">
                    By subscribing you agree to receive SMS messages from LoveNRnB. Message &amp; data rates may apply. Reply STOP to unsubscribe.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

      </main>
      <Footer />
    </>
  )
}
