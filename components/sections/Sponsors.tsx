import Image from 'next/image'
import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { Sponsor, SponsorTier } from '@/lib/types'

interface SponsorsProps {
  sponsors: Sponsor[]
}

const TIER_CONFIG: Record<SponsorTier, { label: string; size: string; opacity: string }> = {
  presenting: {
    label: 'Presenting Sponsor',
    size: 'h-10 lg:h-14',
    opacity: 'opacity-90 hover:opacity-100',
  },
  partner: {
    label: 'Partners',
    size: 'h-7 lg:h-9',
    opacity: 'opacity-70 hover:opacity-90',
  },
  community: {
    label: 'Community Partners',
    size: 'h-5 lg:h-7',
    opacity: 'opacity-50 hover:opacity-75',
  },
}

function SponsorLogo({ sponsor }: { sponsor: Sponsor }) {
  const config = TIER_CONFIG[sponsor.tier]

  const inner = (
    <div
      className={cn(
        'relative flex items-center justify-center px-6',
        config.size,
        config.opacity,
        'grayscale hover:grayscale-0 transition-all duration-500 ease-smooth',
        'filter brightness-150'
      )}
    >
      {sponsor.logo ? (
        <Image
          src={sponsor.logo}
          alt={sponsor.name}
          fill
          className="object-contain object-center"
          sizes="200px"
        />
      ) : (
        // Fallback text logo when SVG not present
        <span
          className={cn(
            'font-display font-bold text-cream-muted tracking-tight whitespace-nowrap',
            sponsor.tier === 'presenting' ? 'text-2xl' : sponsor.tier === 'partner' ? 'text-xl' : 'text-base'
          )}
        >
          {sponsor.name}
        </span>
      )}
    </div>
  )

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={sponsor.name}
      >
        {inner}
      </a>
    )
  }

  return inner
}

function TierGroup({ tier, sponsors }: { tier: SponsorTier; sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="font-body text-2xs text-dim uppercase tracking-[0.25em]">
        {TIER_CONFIG[tier].label}
      </span>
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-8 lg:gap-14',
          tier !== 'presenting' && 'border-t border-gold-border/20 pt-6'
        )}
      >
        {sponsors.map((sponsor) => (
          <SponsorLogo key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  )
}

export function Sponsors({ sponsors }: SponsorsProps) {
  const presenting = sponsors.filter((s) => s.tier === 'presenting')
  const partners = sponsors.filter((s) => s.tier === 'partner')
  const community = sponsors.filter((s) => s.tier === 'community')

  return (
    <section className="relative bg-background py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center mb-16">
          <SectionLabel align="center" className="mb-6">
            Partners & Sponsors
          </SectionLabel>
          <h2 className="font-display text-display-sm text-cream mb-4">
            Trusted By The Best
          </h2>
          <p className="font-body text-sm text-cream-muted max-w-sm">
            Brands that believe in the culture and show up for the community.
          </p>
        </AnimatedSection>

        {/* Logos */}
        <StaggerContainer className="flex flex-col gap-10 max-w-4xl mx-auto">
          <TierGroup tier="presenting" sponsors={presenting} />
          <TierGroup tier="partner" sponsors={partners} />
          <TierGroup tier="community" sponsors={community} />
        </StaggerContainer>

        {/* Partnership CTA */}
        <AnimatedSection className="mt-20 mx-auto max-w-2xl" delay={0.15}>
          <div className="relative overflow-hidden rounded-md border border-gold-border/40 bg-surface p-10 text-center shadow-card">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />

            <p className="font-body text-2xs text-gold uppercase tracking-[0.25em] mb-4">
              Brand Partnerships
            </p>
            <h3 className="font-display text-2xl text-cream mb-4">
              Partner With LoveNRnb
            </h3>
            <p className="font-body text-sm text-cream-muted mb-8 max-w-md mx-auto leading-relaxed">
              Reach a curated audience of fashion-forward, music-loving professionals.
              We offer tailored sponsorship packages across activation, media, and experience.
            </p>
            <Button
              variant="gold-outline"
              size="md"
              href="mailto:partnerships@lovenrnb.com"
            >
              Get Partnership Deck
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
