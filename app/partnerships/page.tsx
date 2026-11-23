import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SupportContent } from '@/components/sections/SupportContent'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Partnerships — LoveNRnB',
  description: 'Partner with LoveNRnB — the R&B entertainment brand behind LoveNRnB Fest, LoveNRnB Live, and an official SXSW 2027 showcase. Sponsorships, artist bookings, and brand collaborations.',
}

const PARTNERSHIP_TYPES = [
  {
    title: 'Event Sponsorship',
    description: 'Get your brand in front of R&B music fans at LoveNRnB Fest, LoveNRnB Live tour stops, and our SXSW 2027 showcase.',
  },
  {
    title: 'Artist Bookings',
    description: 'Submit talent for LoveNRnB stages across Houston, the national Live tour, and our SXSW 2027 lineup.',
  },
  {
    title: 'Brand Collaborations',
    description: 'Co-branded activations, digital campaigns, content partnerships, and more with the LoveNRnB community.',
  },
  {
    title: 'Media & Press',
    description: 'Press access, event coverage, and media partnerships. Reach us at info@lovenrnb.com.',
  },
]

export default function PartnershipsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(204,0,0,0.12) 0%, rgba(140,0,0,0.05) 50%, transparent 70%), #000`,
          }}
        >
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <AnimatedSection>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Partnerships</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                Let&apos;s Build<br />
                <span className="text-gold">Together.</span>
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-xl leading-relaxed">
                LoveNRnB is growing — from Houston&apos;s R&amp;B festival scene to a national entertainment brand. Partner with us and reach our community of R&amp;B fans.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Partnership Types */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">How We Work Together</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                Partnership<br /><span className="text-gold">Opportunities</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 mb-16">
              {PARTNERSHIP_TYPES.map(({ title, description }) => (
                <div key={title} className="bg-black p-10">
                  <p
                    className="font-display font-black uppercase text-white leading-none mb-4"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', letterSpacing: '-0.02em' }}
                  >
                    {title}
                  </p>
                  <p className="font-body text-sm text-white/45 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            {/* Quick contact CTA */}
            <div
              className="border border-white/10 p-8 lg:p-12 text-center"
              style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(204,0,0,0.05) 0%, transparent 70%)' }}
            >
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Get in Touch</p>
              <h3
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.02em' }}
              >
                Ready to Partner?
              </h3>
              <p className="font-body text-base text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
                Use the form below to tell us about your brand and how you&apos;d like to partner with LoveNRnB — or reach us directly.
              </p>
              <a
                href="mailto:eze@lovenrnb.com"
                className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                eze@lovenrnb.com
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Sponsor/Partner Form */}
        <SupportContent />

      </main>
      <Footer />
    </>
  )
}
