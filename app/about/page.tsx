import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'About — LoveNRnB',
  description: 'Founded in Houston in 2022, LoveNRnB is an R&B entertainment and culture brand creating live music experiences, festivals, and community-driven events.',
}

export default function AboutPage() {
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
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">About LoveNRnB</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                Built For<br />
                <span className="text-gold">R&amp;B Lovers.</span>
              </h1>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Story */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <AnimatedSection delay={0.1}>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">Our Story</p>
                <div className="space-y-5 font-body text-base lg:text-lg text-white/55 leading-relaxed">
                  <p>
                    Founded in Houston in 2022, LoveNRnB was built around a simple idea: bringing people together through the music they love.
                  </p>
                  <p>
                    What started as a passion for R&amp;B and nightlife has grown into an entertainment and culture brand creating live music experiences, festivals, and community-driven events.
                  </p>
                  <p>
                    Through LoveNRnB Fest and LoveNRnB Live, we&apos;re creating spaces for established artists, emerging talent, and music lovers to connect.
                  </p>
                  <p>
                    As we expand into new markets, our mission remains the same: deliver unforgettable experiences that celebrate R&amp;B music and culture.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">Our Mission</p>
                <div
                  className="border border-white/10 p-8 lg:p-10"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,0,0,0.05) 0%, transparent 70%)' }}
                >
                  <p
                    className="font-display font-black uppercase text-white leading-none mb-6"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em' }}
                  >
                    More Than<br /><span className="text-gold">Music.</span>
                  </p>
                  <p className="font-body text-base text-white/50 leading-relaxed">
                    We believe live music is one of the most powerful ways to bring people together. Every event we produce is designed to create a moment — something you feel, not just watch.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Two event properties */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Our Experiences</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Two Properties.<br /><span className="text-gold">One Brand.</span>
              </h2>
            </AnimatedSection>

            <div className="w-full h-px bg-white/10 mb-12" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
              {[
                {
                  number: '01',
                  title: 'LoveNRnB Fest',
                  location: 'Houston, Texas',
                  description: 'Our flagship annual R&B festival experience. LoveNRnB Fest brings together established artists, emerging talent, DJs, vendors, and brand activations for an unforgettable weekend in Houston.',
                  href: '/fest',
                  cta: 'Explore the Fest',
                },
                {
                  number: '02',
                  title: 'LoveNRnB Live',
                  location: 'Touring Nationally',
                  description: 'Our traveling concert and party experience. LoveNRnB Live combines the energy of an R&B party with intimate live artist performances, expanding into New Orleans, Dallas, Atlanta, and beyond in 2027.',
                  href: '/live',
                  cta: 'Explore LoveNRnB Live',
                },
              ].map(({ number, title, location, description, href, cta }) => (
                <div key={number} className="bg-black p-10 lg:p-14">
                  <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">{number}</p>
                  <h3
                    className="font-display font-black uppercase text-white leading-none mb-3"
                    style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.02em' }}
                  >
                    {title}
                  </h3>
                  <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-6">{location}</p>
                  <p className="font-body text-base text-white/50 leading-relaxed mb-8">{description}</p>
                  <a
                    href={href}
                    className="inline-flex items-center justify-center h-11 px-7 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                  >
                    {cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Values */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-4xl">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">What We Stand For</p>
              <div className="border-t border-white/10">
                {[
                  'Authentic R&B culture.',
                  'Emerging artists given real platforms.',
                  'Community-first experiences.',
                  'Houston, always.',
                ].map((line) => (
                  <div key={line} className="flex items-center gap-5 py-6 border-b border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <p
                      className="font-display font-black uppercase text-white leading-none"
                      style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
                    >
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
