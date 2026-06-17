import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function About() {
  return (
    <section id="about" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-20 lg:py-28">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
            About
          </p>

          <h2
            className="font-display font-black uppercase text-white leading-none mb-10"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Our Story
          </h2>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed mb-6">
            LoveNRnB is Houston&apos;s premier R&amp;B music festival, created to give one of the world&apos;s most influential genres the stage it deserves. From rising stars to chart topping headliners, LoveNRnB delivers a festival experience centered around exceptional live performances and a deep appreciation for R&amp;B music and culture.
          </p>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed">
            Our vision is to become the premier R&amp;B festival in the South and one of the leading music festivals in North America.
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
