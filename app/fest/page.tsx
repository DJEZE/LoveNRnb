import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const GALLERY = [
  { src: '/images/fest-jacquees-jump.jpg', alt: 'Jacquees performing at LoveNRnB Fest 2026' },
  { src: '/images/fest-jacquees-stage2.jpg', alt: 'Jacquees on stage at LoveNRnB Fest 2026' },
  { src: '/images/fest-jacquees-stage.jpg', alt: 'Jacquees on stage at LoveNRnB Fest 2026' },
  { src: '/images/fest-kaash-crowd.jpg', alt: 'Kaash Paige in the crowd' },
  { src: '/images/fest-sunnyside-carro.jpg', alt: 'Sunnyside & Carro performing' },
  { src: '/images/fest-fans-selfie.jpg', alt: 'Fans at LoveNRnB Fest 2026' },
  { src: '/images/elmusico-fest.jpg', alt: 'elMusico Tequila Blanco at LoveNRnB Fest 2026' },
  { src: '/images/hero-concert.jpg', alt: 'LoveNRnB Fest 2026 crowd' },
]

export const metadata: Metadata = {
  title: 'LoveNRnB Fest — Houston R&B Festival',
  description: 'LoveNRnB Fest is the flagship annual R&B festival experience in Houston, TX. 1,000+ attendees, 1M+ social media views, and performances from Jacquees, Kaash Paige, and more.',
}

const FEST_2026_PERFORMERS = [
  { name: 'Jacquees', role: 'Headliner' },
  { name: 'Kaash Paige', role: 'Featured Artist' },
  { name: 'Aaron Page', role: 'Live Performance' },
  { name: 'Bōlají', role: 'Live Performance' },
  { name: 'Shelby Ruger', role: 'Live Performance' },
  { name: 'K2icyy', role: 'Live Performance' },
  { name: 'SAMKNIGHT', role: 'Live Performance' },
  { name: 'Sunnyside & Carro', role: 'Live Performance' },
]

const METRICS = [
  { value: '1,000+', label: 'Attendees' },
  { value: '1M+', label: 'Social Media Views' },
  { value: '8+', label: 'Performers' },
]

export default function FestPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">

        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(204,0,0,0.14) 0%, rgba(140,0,0,0.05) 50%, transparent 70%), #000`,
          }}
        >
          <div className="container mx-auto px-6 py-20 lg:py-28">
            <AnimatedSection>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">LoveNRnB Fest</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                The Houston<br />
                <span className="text-gold">R&amp;B Festival.</span>
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-xl leading-relaxed">
                Our flagship annual festival experience. Live music, rising talent, and R&amp;B culture — all in Houston.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* 2026 Recap */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-8">
                <span className="font-body text-2xs text-white/40 uppercase tracking-[0.25em]">November 21, 2026 · Rich&apos;s Houston</span>
              </div>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">2026 Recap</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Houston, Y&apos;all<br /><span className="text-gold">Showed Out.</span>
              </h2>
            </AnimatedSection>

            <div className="w-full h-px bg-white/10 mb-12" />

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-px bg-white/10 mb-16">
              {METRICS.map(({ value, label }) => (
                <div key={label} className="bg-black px-8 py-10 text-center">
                  <p
                    className="font-display font-black uppercase text-gold leading-none mb-2"
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
                  >
                    {value}
                  </p>
                  <p className="font-body text-xs text-white/40 uppercase tracking-[0.2em]">{label}</p>
                </div>
              ))}
            </div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mb-16">
              {GALLERY.map(({ src, alt }) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-surface">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>

          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Performers */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">2026 Lineup</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                The Artists
              </h2>
            </AnimatedSection>

            <div className="border-t border-white/10">
              {FEST_2026_PERFORMERS.map(({ name, role }) => (
                <div
                  key={name}
                  className="flex items-center justify-between py-5 border-b border-white/10 group"
                >
                  <p
                    className="font-display font-black uppercase text-white group-hover:text-gold transition-colors duration-150 leading-none"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {name}
                  </p>
                  <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] text-right ml-4 flex-shrink-0">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Future Festivals CTA */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl mx-auto text-center">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">What&apos;s Next</p>
              <h2
                className="font-display font-black uppercase text-white leading-none mb-8"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Fest<br /><span className="text-gold">2027.</span>
              </h2>
              <p className="font-body text-base text-white/50 leading-relaxed mb-10 max-w-lg mx-auto">
                LoveNRnB Fest returns to Houston in 2027. Be the first to know when tickets drop, the lineup drops, and everything in between.
              </p>
              <a
                href="https://laylo.com/lovenrnb_/X16P9f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-10 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                Get Notified
              </a>
            </AnimatedSection>
          </div>
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
