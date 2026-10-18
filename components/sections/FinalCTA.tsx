import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function FinalCTA() {
  return (
    <section className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,0,0,0.18) 0%, rgba(140,0,0,0.08) 45%, transparent 70%), #000`,
        }}
      >
        <AnimatedSection className="container mx-auto px-6 py-20 lg:py-32 text-center">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
            Houston, Are You Ready?
          </p>

          <h2
            className="font-display font-black uppercase text-white leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
          >
            LoveNRnB Fest 2026
          </h2>

          <p
            className="font-display font-bold uppercase text-gold mb-8"
            style={{ fontSize: 'clamp(1.25rem, 3.5vw, 2.5rem)', letterSpacing: '-0.01em' }}
          >
            Headlined by Kaash Paige
          </p>

          <p className="font-body text-base text-white/50 mb-3">
            Saturday, November 21, 2026
          </p>
          <p className="font-body text-base text-white/50 mb-12">
            Rich&apos;s Houston &nbsp;·&nbsp; Houston, TX &nbsp;·&nbsp; 18+
          </p>

          <a
            href="https://posh.vip/e/lovenrnb-festival"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-16 px-14 font-body text-sm font-bold uppercase tracking-[0.25em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
          >
            Get Your Tickets Now
          </a>

          <p className="font-display font-bold uppercase text-white/20 text-sm tracking-[0.15em] mt-16">
            One Night. One Love. One Unforgettable R&amp;B Experience. ❤️
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
