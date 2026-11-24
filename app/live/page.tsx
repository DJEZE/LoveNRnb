import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'LoveNRnB Live — Touring Concert Experience',
  description: 'LoveNRnB Live is a traveling R&B concert and party experience coming to New Orleans, Dallas, Atlanta, and beyond in 2027. Plus, an official SXSW 2027 Music Showcase.',
}

const MARKETS_2027 = [
  {
    city: 'New Orleans',
    state: 'LA',
    status: 'Coming 2027',
    description: 'The city that runs on music. We&apos;re bringing LoveNRnB energy to the culture capital of the South.',
  },
  {
    city: 'Dallas',
    state: 'TX',
    status: 'Coming 2027',
    description: 'Deep in the heart of Texas. R&B, nightlife, and an experience the DFW crowd won\'t forget.',
  },
  {
    city: 'Atlanta',
    state: 'GA',
    status: 'Coming 2027',
    description: 'The home of R&B&apos;s next chapter. LoveNRnB Live in ATL.',
  },
]

const FORMAT = [
  { step: '01', label: 'DJ Sets', description: 'High-energy DJ performances setting the tone before artists hit the stage.' },
  { step: '02', label: 'Live Performance', description: 'Intimate live artist performances in a concert-party format unlike any other.' },
  { step: '03', label: 'Nightlife', description: 'The party continues. R&B, good people, and unforgettable moments.' },
]

export default function LivePage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">

        {/* Hero */}
        <section className="relative overflow-hidden min-h-[60vh] flex flex-col justify-end">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-concert.jpg"
              alt="LoveNRnB Live"
              fill
              className="object-cover object-center opacity-40"
              priority
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.85) 100%)' }} />
          </div>
          <div className="relative z-10 container mx-auto px-6 py-20 lg:py-28">
            <AnimatedSection>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">LoveNRnB Live</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                The Concert<br />
                <span className="text-gold">Party Experience.</span>
              </h1>
              <p className="font-body text-base lg:text-lg text-white/60 max-w-xl leading-relaxed">
                Our traveling concert and nightlife experience, bringing R&amp;B artists and unforgettable nights to cities across the country.
              </p>
            </AnimatedSection>
          </div>
          <div className="relative z-10 w-full h-px bg-white/10" />
        </section>

        {/* What is LoveNRnB Live */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <AnimatedSection delay={0.1}>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">What It Is</p>
                <div className="space-y-5 font-body text-base lg:text-lg text-white/55 leading-relaxed">
                  <p>
                    LoveNRnB Live is a traveling R&amp;B concert and party experience, blending the energy of a nightlife event with the soul of a live music performance.
                  </p>
                  <p>
                    Think intimate venue, top-tier sound, R&amp;B artists performing live alongside DJ sets that keep the energy going all night.
                  </p>
                  <p>
                    After proving the concept in Houston, we&apos;re taking it on the road. New Orleans, Dallas, and Atlanta are first up in 2027.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">The Format</p>
                <div className="space-y-0 border-t border-white/10">
                  {FORMAT.map(({ step, label, description }) => (
                    <div key={step} className="py-6 border-b border-white/10">
                      <div className="flex items-start gap-5">
                        <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mt-1 flex-shrink-0 w-7">{step}</p>
                        <div>
                          <p
                            className="font-display font-black uppercase text-white leading-none mb-2"
                            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)', letterSpacing: '-0.02em' }}
                          >
                            {label}
                          </p>
                          <p className="font-body text-sm text-white/40 leading-relaxed">{description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* 2027 Markets */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">2027 Tour</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Hitting the<br /><span className="text-gold">Road.</span>
              </h2>
            </AnimatedSection>

            <div className="w-full h-px bg-white/10 mb-0" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10">
              {MARKETS_2027.map(({ city, state, status, description }) => (
                <div key={city} className="bg-black p-10 lg:p-12">
                  <p className="font-body text-2xs text-white/25 uppercase tracking-[0.2em] mb-3">{state} · {status}</p>
                  <h3
                    className="font-display font-black uppercase text-white leading-none mb-5"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', letterSpacing: '-0.02em' }}
                  >
                    {city}
                  </h3>
                  <p
                    className="font-body text-sm text-white/45 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              ))}
            </div>
            <div className="border border-t-0 border-white/10 p-8 lg:p-10 text-center">
              <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em]">
                Exact dates and venues to be announced · Be the first to know
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* SXSW 2027 */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection>
              <div className="border border-white/10 p-10 lg:p-16"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(204,0,0,0.06) 0%, transparent 70%)' }}
              >
                <div className="mb-8">
                  <Image
                    src="/images/sxsw-logo.png"
                    alt="SXSW"
                    width={2000}
                    height={461}
                    className="w-auto h-10 lg:h-14 object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">Official Music Showcase Presenter</span>
                </div>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Austin, TX · March 2027</p>
                <h2
                  className="font-display font-black uppercase text-white leading-none mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
                >
                  LoveNRnB<br />at SXSW 2027
                </h2>
                <p className="font-body text-base text-white/50 leading-relaxed max-w-2xl mb-10">
                  LoveNRnB is officially headed to South by Southwest as an Official Music Showcase Presenter. A curated showcase of emerging R&amp;B talent, fresh sounds, and artists shaping the future of the genre.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://laylo.com/lovenrnb_/X16P9f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                  >
                    Get Notified
                  </a>
                  <a
                    href="mailto:eze@lovenrnb.com"
                    className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15 hover:border-white/40 hover:text-white transition-colors duration-200"
                  >
                    Partnership Inquiries
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
