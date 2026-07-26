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

          <div className="w-full h-px bg-white/10 mb-12" />

          {/* Partnership CTA */}
          <div className="w-full max-w-2xl text-center">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Get Involved</p>
            <h3
              className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              Partner With LoveNRnB
            </h3>
            <p className="font-body text-sm text-white/40 mb-10 max-w-md mx-auto leading-relaxed">
              Whether you&apos;re a brand, creator, student leader, vendor, or media outlet — we&apos;d love to work with you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {[
                { label: 'Become a Sponsor', href: 'mailto:partnerships@lovenrnb.com' },
                { label: 'Become a Vendor', href: 'https://docs.google.com/forms/d/e/1FAIpQLSevxsrSzvEGXMIaWvsXwQ7shRLtt-OK_Of8aJcFi4QX56x4ig/viewform?usp=preview' },
                { label: 'Ambassador Program', href: 'https://forms.gle/2iDK6xdAbVshWvu59' },
                { label: 'Creator Program', href: 'https://forms.gle/1W9mX2PjVmkfGNx36' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center h-11 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
