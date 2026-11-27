import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Events — LoveNRnB',
  description:
    'Upcoming and past LoveNRnB events — LoveNRnB Fest, LoveNRnB Live tour, SXSW 2027 Official Showcase, and more R&B experiences across the country.',
}

export default function EventsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        {/* ── Header ── */}
        <section className="bg-black">
          <div
            className="relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,0,0,0.15) 0%, rgba(140,0,0,0.06) 45%, transparent 70%), #000`,
            }}
          >
            <AnimatedSection className="container mx-auto px-6 py-20 lg:py-28">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
                Events
              </p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
              >
                What&apos;s<br />Happening
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-xl leading-relaxed">
                Upcoming experiences and a look back at where we&apos;ve been.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* ── More Upcoming Experiences ── */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl mx-auto">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-10">
                More Upcoming
              </p>

              <div className="space-y-0">
                {/* New Orleans — specific announced date */}
                <div className="border-t border-white/10 py-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                        <span className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Just Announced</span>
                      </div>
                      <h3
                        className="font-display font-black uppercase text-white leading-none mb-4"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                      >
                        LoveNRnB Live: New Orleans
                      </h3>
                      <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-3">
                        New Orleans, LA · February 27, 2027
                      </p>
                      <p className="font-body text-base text-white/50 leading-relaxed mb-5">
                        The Concert &amp; Party Experience comes to New Orleans. Early access registration is open now.
                      </p>
                      <a href="/live/new-orleans" className="font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors">
                        Get Early Access →
                      </a>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex items-center border border-gold/30 px-3 py-1.5">
                      <span className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Feb 27</span>
                    </div>
                  </div>
                </div>

                {/* LoveNRnB Live — general */}
                <div className="border-t border-white/10 py-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="font-display font-black uppercase text-white leading-none mb-4"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                      >
                        LoveNRnB Live 2027
                      </h3>
                      <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-3">
                        Dallas · Atlanta · More Cities TBA
                      </p>
                      <p className="font-body text-base text-white/50 leading-relaxed mb-5">
                        Our traveling concert-party experience hits the road in 2027.
                      </p>
                      <a href="/live" className="font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors">
                        Learn More →
                      </a>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex items-center border border-gold/30 px-3 py-1.5">
                      <span className="font-body text-2xs text-gold uppercase tracking-[0.2em]">2027</span>
                    </div>
                  </div>
                </div>

                {/* LoveNRnB Fest */}
                <div className="border-t border-white/10 py-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3
                        className="font-display font-black uppercase text-white leading-none mb-4"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                      >
                        LoveNRnB Fest 2027
                      </h3>
                      <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-3">
                        Houston, TX
                      </p>
                      <p className="font-body text-base text-white/50 leading-relaxed mb-5">
                        Our annual Houston R&amp;B festival returns. Date and lineup coming soon.
                      </p>
                      <a href="https://laylo.com/lovenrnb_/X16P9f" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors">
                        Get Notified →
                      </a>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex items-center border border-gold/30 px-3 py-1.5">
                      <span className="font-body text-2xs text-gold uppercase tracking-[0.2em]">2027</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── SXSW 2027 ── */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl mx-auto">
              {/* SXSW Logo */}
              <div className="mb-10">
                <Image
                  src="/images/sxsw-logo.png"
                  alt="SXSW"
                  width={2000}
                  height={461}
                  className="w-auto h-10 lg:h-14 object-contain"
                />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
                <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">
                  Official SXSW Music Showcase Presenter
                </span>
              </div>

              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                Austin, Texas · March 15–21, 2027
              </p>
              <h2
                className="font-display font-black uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                LoveNRnB<br />at SXSW 2027
              </h2>

              <div className="space-y-5 mb-12">
                <p className="font-body text-base text-white/60 leading-relaxed">
                  LoveNRnB is officially headed to South by Southwest.
                </p>
                <p className="font-body text-base text-white/60 leading-relaxed">
                  Since 2022, we&apos;ve been creating experiences that bring R&amp;B lovers together while providing a platform for the next generation of artists. In 2027, we&apos;re taking that mission to Austin as an official SXSW Music Showcase Presenter.
                </p>
                <p className="font-body text-base text-white/60 leading-relaxed">
                  Expect a curated showcase highlighting emerging R&amp;B talent, fresh sounds, and artists shaping the future of the genre.
                </p>
                <p className="font-body text-sm text-white/40 leading-relaxed">
                  Official showcase date, venue, and artist lineup coming soon.
                </p>
              </div>

              <div className="border border-white/10 p-8 lg:p-10">
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
                  Sponsorship &amp; Partnership Opportunities
                </p>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                  Interested in partnering with LoveNRnB at SXSW 2027? For sponsorships, artist submissions, brand partnerships, and general inquiries:
                </p>
                <a
                  href="mailto:eze@lovenrnb.com"
                  className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  eze@lovenrnb.com
                </a>
              </div>
            </AnimatedSection>
          </div>

          <div className="w-full h-px bg-white/10" />
        </section>

        {/* ── Past Events ── */}
        <section className="bg-black">
          <div className="w-full h-px bg-white/10" />
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Past Events</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                Where We&apos;ve<br /><span className="text-gold">Been.</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-0 max-w-3xl">
              <div className="border-t border-white/10 py-10 flex items-start justify-between gap-6">
                <div>
                  <h3
                    className="font-display font-black uppercase text-white leading-none mb-3"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                  >
                    LoveNRnB Fest 2026
                  </h3>
                  <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-4">
                    November 21, 2026 · Rich&apos;s Houston
                  </p>
                  <p className="font-body text-sm text-white/40 leading-relaxed mb-5">
                    1,000+ attendees · 1M+ social media views · Jacquees, Kaash Paige &amp; more
                  </p>
                  <a href="/recaps" className="font-body text-xs text-gold uppercase tracking-[0.15em] hover:text-gold-light transition-colors">
                    View Recap →
                  </a>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <div className="border border-white/10 px-4 py-2">
                    <p className="font-body text-2xs text-white/25 uppercase tracking-[0.2em]">Nov 2026</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
