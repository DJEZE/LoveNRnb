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
            Where <span className="text-gold">R&amp;B</span><br />Comes Alive.
          </h2>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed mb-6">
            A live R&amp;B experience bringing together the artists you love, the next generation of R&amp;B talent, and the DJs who keep the culture moving.
          </p>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed">
            Whether you&apos;re coming to sing your heart out, discover your next favorite artist, or experience R&amp;B with people who love it just as much as you do — this is where you belong.
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
