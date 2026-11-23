import type { Metadata } from 'next'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const GALLERY = [
  { src: '/images/fest-jacquees-jump.jpg', alt: 'Jacquees performing at LoveNRnB Fest 2026' },
  { src: '/images/fest-jacquees-stage2.jpg', alt: 'Jacquees on stage at LoveNRnB Fest 2026' },
  { src: '/images/fest-jacquees-stage.jpg', alt: 'Jacquees performing on stage at LoveNRnB Fest 2026' },
  { src: '/images/fest-kaash-crowd.jpg', alt: 'Kaash Paige in the crowd at LoveNRnB Fest 2026' },
  { src: '/images/fest-sunnyside-carro.jpg', alt: 'Sunnyside & Carro performing at LoveNRnB Fest 2026' },
  { src: '/images/fest-fans-selfie.jpg', alt: 'Fans at LoveNRnB Fest 2026' },
  { src: '/images/elmusico-fest.jpg', alt: 'elMusico Tequila Blanco at LoveNRnB Fest 2026' },
  { src: '/images/hero-concert.jpg', alt: 'LoveNRnB Fest 2026 crowd' },
]

export const metadata: Metadata = {
  title: 'Recaps — LoveNRnB',
  description: 'Relive the moments from LoveNRnB Fest 2026 and all LoveNRnB events. 1,000+ attendees, 1M+ social media views, and performances from Jacquees, Kaash Paige, and more.',
}

const FEST_2026_PERFORMERS = [
  'Jacquees',
  'Kaash Paige',
  'Aaron Page',
  'Bōlají',
  'Shelby Ruger',
  'K2icyy',
  'SAMKNIGHT',
  'Sunnyside & Carro',
]

const METRICS = [
  { value: '1,000+', label: 'Attendees' },
  { value: '1M+', label: 'Social Media Views' },
  { value: '8+', label: 'Performers' },
]

export default function RecapsPage() {
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
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Recaps</p>
              <h1
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
              >
                You Had<br />
                <span className="text-gold">To Be There.</span>
              </h1>
              <p className="font-body text-base lg:text-lg text-white/50 max-w-xl leading-relaxed">
                Relive the moments that made LoveNRnB what it is.
              </p>
            </AnimatedSection>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* Fest 2026 Recap */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="mb-12">
              <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 mb-8">
                <span className="font-body text-2xs text-white/40 uppercase tracking-[0.25em]">November 21, 2026 · Rich&apos;s Houston</span>
              </div>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">LoveNRnB Fest 2026</p>
              <h2
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Houston,<br /><span className="text-gold">Year One Done Right.</span>
              </h2>
            </AnimatedSection>

            {/* Stats */}
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

            {/* Video placeholder */}
            <div className="border border-white/10 w-full aspect-video flex items-center justify-center mb-16 bg-surface">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white/40 ml-1" />
                </div>
                <p className="font-body text-xs text-white/25 uppercase tracking-[0.2em]">Recap Video Coming Soon</p>
              </div>
            </div>

            {/* Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">The Lineup</p>
                <div className="border-t border-white/10">
                  {FEST_2026_PERFORMERS.map((name) => (
                    <div key={name} className="py-4 border-b border-white/10">
                      <p
                        className="font-display font-black uppercase text-white leading-none"
                        style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.8rem)', letterSpacing: '-0.02em' }}
                      >
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">The Moment</p>
                <div className="space-y-5 font-body text-base text-white/50 leading-relaxed">
                  <p>
                    LoveNRnB Fest 2026 brought over a thousand R&amp;B fans together in Houston for a night of live music, rising talent, and culture.
                  </p>
                  <p>
                    With over a million social media views and performances from some of the genre&apos;s most exciting voices, Fest 2026 proved there&apos;s a real hunger for this kind of experience in Houston.
                  </p>
                  <p>
                    This was just the beginning.
                  </p>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://instagram.com/lovenrnbfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-7 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                  >
                    See Photos on Instagram
                  </a>
                  <a
                    href="https://youtube.com/@lovenrnbfest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-7 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15 hover:border-white/40 hover:text-white transition-colors duration-200"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-white/10" />
        </section>

        {/* More events coming */}
        <section className="bg-black">
          <div className="container mx-auto px-6 py-16 lg:py-24">
            <AnimatedSection className="max-w-3xl">
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">More Coming</p>
              <h2
                className="font-display font-black uppercase text-white leading-none mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
              >
                The Story<br /><span className="text-gold">Is Still Being Written.</span>
              </h2>
              <p className="font-body text-base text-white/50 leading-relaxed mb-10 max-w-lg">
                LoveNRnB Live 2027. SXSW 2027. LoveNRnB Fest 2027. More recaps are on the way — stay connected so you don&apos;t miss them.
              </p>
              <a
                href="/events"
                className="inline-flex items-center justify-center h-12 px-10 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                See Upcoming Events
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
