import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import type { Sponsor } from '@/lib/types'

interface SponsorsProps {
  sponsors: Sponsor[]
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={sponsor.name}
      className="flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300"
    >
      {sponsor.logo ? (
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          width={320}
          height={120}
          className={`object-contain w-auto ${sponsor.logoSize ?? 'h-40 lg:h-56'}`}
        />
      ) : (
        <span className="font-display font-black text-3xl lg:text-4xl text-white uppercase tracking-tight">
          {sponsor.name}
        </span>
      )}
    </a>
  )
}

export function Sponsors({ sponsors }: SponsorsProps) {
  return (
    <section className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-16 lg:py-20">
        <AnimatedSection className="flex flex-col items-center text-center">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-10">
            Presented By
          </p>

          {/* Sponsor logos — all on one row, same size */}
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 mb-12 lg:mb-16">
            {sponsors.map((sponsor) => (
              <SponsorLogo key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>

          <div className="w-full h-px bg-white/10 mb-10" />

          {/* Partnership CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <p className="font-body text-sm text-white/40">
              Interested in being a part of LoveNRnb?
            </p>
            <a
              href="mailto:partnerships@lovenrnb.com"
              className="inline-flex items-center h-9 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
            >
              Become a Partner
            </a>
          </div>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
