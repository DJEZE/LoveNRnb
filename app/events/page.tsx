import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Upcoming Events — LoveNRnB',
  description:
    'From Houston to stages across the country, LoveNRnB continues to create unforgettable R&B experiences through live music, emerging talent, and community.',
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
            <AnimatedSection className="container mx-auto px-6 py-20 lg:py-28 text-center">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
                Upcoming Events
              </p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
              >
                What&apos;s Next
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-4">
                The music. The people. The experience.
              </p>
              <p className="font-body text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
                From Houston to stages across the country, LoveNRnB continues to create unforgettable R&amp;B experiences through live music, emerging talent, and community.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* ── Love In This Club ── */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
                <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">
                  LoveNRnB Weekend Kickoff · Free Entry
                </span>
              </div>

              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                Friday, November 20, 2026 · 9 PM – 2 AM · Houston, TX
              </p>
              <h2
                className="font-display font-black uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                Love In<br />This Club
              </h2>

              <div className="space-y-5 mb-10">
                <p className="font-body text-base text-white/60 leading-relaxed">
                  Kick off LoveNRnB Weekend with us at LOVE IN THIS CLUB — a free R&amp;B and Hip-Hop party bringing good music, good people, and good vibes together before LoveNRnB Fest 2026.
                </p>
                <p className="font-body text-base text-white/60 leading-relaxed">
                  Presented by Unscripted &amp; DJEZE, we&apos;re taking over Tikila&apos;s for a night of nonstop music and energy to set the tone for the weekend.
                </p>
              </div>

              {/* Music by */}
              <div className="mb-10">
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Music By</p>
                <div className="flex flex-col gap-2">
                  {['The AM', 'SuperJay', 'Jazzie Rose'].map((artist) => (
                    <p key={artist} className="font-display font-black uppercase text-white text-xl lg:text-2xl tracking-tight">
                      {artist}
                    </p>
                  ))}
                </div>
              </div>

              {/* Event details */}
              <div className="border border-white/10 p-8 mb-10">
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Event Details</p>
                <div className="space-y-2">
                  {[
                    { label: 'Date', value: 'Friday, November 20, 2026' },
                    { label: 'Time', value: '9:00 PM – 2:00 AM' },
                    { label: 'Venue', value: "Tikila's" },
                    { label: 'Address', value: '2708 N Shepherd Dr, Houston, TX' },
                    { label: 'Admission', value: 'FREE with RSVP' },
                    { label: 'Age', value: '21+' },
                    { label: 'Sponsored by', value: 'El Musico Tequila' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4">
                      <span className="font-body text-xs text-white/30 uppercase tracking-widest w-24 flex-shrink-0 pt-0.5">{label}</span>
                      <span className="font-body text-sm text-white/70">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://posh.vip/e/loveinthisclub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-14 px-12 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                Free RSVP
              </a>
              <p className="font-body text-xs text-white/25 mt-4">
                Free admission subject to venue capacity. RSVP does not guarantee entry.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
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
                  href="mailto:info@lovenrnb.com"
                  className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  info@lovenrnb.com
                </a>
              </div>
            </AnimatedSection>
          </div>

          <div className="w-full h-px bg-white/10" />
        </section>

        {/* ── More Upcoming Experiences ── */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl mx-auto">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-10">
                More Upcoming Experiences
              </p>

              <div className="space-y-0">
                {/* LoveNRnB Live */}
                <div className="border-t border-white/10 py-10">
                  <h3
                    className="font-display font-black uppercase text-white leading-none mb-4"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                  >
                    LoveNRnB Live
                  </h3>
                  <p className="font-body text-base text-white/50 leading-relaxed mb-3">
                    Our concert-party experience bringing R&amp;B artists, DJs, and unforgettable nights to cities across the country.
                  </p>
                  <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em]">
                    Upcoming dates to be announced
                  </p>
                </div>

                {/* LoveNRnB Fest */}
                <div className="border-t border-white/10 py-10">
                  <h3
                    className="font-display font-black uppercase text-white leading-none mb-4"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
                  >
                    LoveNRnB Fest
                  </h3>
                  <p className="font-body text-base text-white/50 leading-relaxed mb-3">
                    Our signature Houston R&amp;B festival experience.
                  </p>
                  <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em]">
                    Future festival announcements coming soon
                  </p>
                </div>

                <div className="border-t border-white/10" />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
