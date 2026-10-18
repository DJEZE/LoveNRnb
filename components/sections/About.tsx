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
            More Than a Concert.<br />It&apos;s a Celebration of <span className="text-gold">R&amp;B.</span>
          </h2>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed mb-6">
            LoveNRnB Fest is bringing Houston&apos;s R&amp;B community together for an unforgettable night of live music, incredible energy, and shared experiences. From the songs we know word for word to the artists shaping the future of R&amp;B, this is a celebration of the music and culture that connects us.
          </p>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed mb-6">
            Headlined by R&amp;B sensation Kaash Paige, LoveNRnB Fest will feature incredible live performances, rising talent, and DJs bringing your favorite sounds to life.
          </p>

          <p className="font-body text-base lg:text-lg text-white/60 leading-relaxed">
            Whether you&apos;re coming to sing your heart out, discover your next favorite artist, or experience R&amp;B with people who love it just as much as you do — this is where you belong. One night. One love. One unforgettable R&amp;B experience.
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
