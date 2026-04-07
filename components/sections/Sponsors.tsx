import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Sponsor } from '@/lib/types'

interface SponsorsProps {
  sponsors: Sponsor[]
}

export function Sponsors({ sponsors }: SponsorsProps) {
  return (
    <section className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-16 lg:py-20">
        <AnimatedSection className="flex flex-col items-center text-center">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-10">
            Presented With
          </p>

          {/* Sponsor logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 mb-12 lg:mb-16">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                className="relative flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
              >
                {sponsor.logo ? (
                  <div className="relative h-10 lg:h-14 w-28 lg:w-40">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                      sizes="160px"
                    />
                  </div>
                ) : (
                  // Text fallback — used until you add the SVG
                  <span className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">
                    {sponsor.name}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 mb-10" />

          {/* Partnership CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="font-body text-sm text-white/40">
              Interested in partnering with LoveNRnb?
            </p>
            <a
              href="mailto:partnerships@lovenrnb.com"
              className="inline-flex items-center h-9 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
            >
              Get Partnership Deck
            </a>
          </div>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
