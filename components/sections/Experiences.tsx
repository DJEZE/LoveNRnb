'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'

export function Experiences() {
  return (
    <section id="experiences" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <AnimatedSection className="mb-12 lg:mb-16">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Our Experiences</p>
          <h2
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
          >
            Two Distinct<br /><span className="text-gold">Experiences.</span>
          </h2>
        </AnimatedSection>

        <div className="w-full h-px bg-white/10 mb-12 lg:mb-16" />

        {/* Two experience cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 mb-12 lg:mb-16">
          {/* LoveNRnB Fest */}
          <motion.div
            variants={staggerChild}
            className="bg-black p-10 lg:p-14 flex flex-col group"
          >
            <div className="w-8 h-0.5 bg-gold mb-8 group-hover:w-16 transition-all duration-500" />
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Houston, Texas</p>
            <h3
              className="font-display font-black uppercase text-white leading-none mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              LoveNRnB<br />Fest
            </h3>
            <p className="font-body text-base text-white/50 leading-relaxed mb-3 flex-1">
              Houston&apos;s Ultimate R&amp;B Experience. Our flagship festival bringing together live R&amp;B performances, emerging talent, DJs, and unforgettable moments.
            </p>
            <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-10">Annual festival · Houston, TX</p>
            <a
              href="/fest"
              className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200 w-fit"
            >
              Explore the Fest
            </a>
          </motion.div>

          {/* LoveNRnB Live */}
          <motion.div
            variants={staggerChild}
            className="bg-black p-10 lg:p-14 flex flex-col group border-t lg:border-t-0 border-white/10"
          >
            <div className="w-8 h-0.5 bg-gold mb-8 group-hover:w-16 transition-all duration-500" />
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Touring Nationally</p>
            <h3
              className="font-display font-black uppercase text-white leading-none mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              LoveNRnB<br />Live
            </h3>
            <p className="font-body text-base text-white/50 leading-relaxed mb-3 flex-1">
              The Concert &amp; Party Experience. A traveling R&amp;B experience bringing live performances and nightlife together in cities across the country.
            </p>
            <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] mb-10">New Orleans · Dallas · Atlanta · 2027</p>
            <a
              href="/live"
              className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200 w-fit"
            >
              Explore LoveNRnB Live
            </a>
          </motion.div>
        </StaggerContainer>

        {/* New Orleans Feature */}
        <AnimatedSection className="mb-12 lg:mb-16">
          <div
            className="relative overflow-hidden border border-gold/30 p-10 lg:p-14"
            style={{ background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(204,0,0,0.1) 0%, transparent 70%)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
                  <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">Just Announced</span>
                </div>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">New Orleans, Louisiana · Feb 27, 2027</p>
                <h3
                  className="font-display font-black uppercase text-white leading-none mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.03em' }}
                >
                  LoveNRnB Live<br />New Orleans
                </h3>
                <p className="font-body text-base text-white/50 leading-relaxed mb-8">
                  The Concert &amp; Party Experience comes to New Orleans. Sign up for exclusive early access.
                </p>
                <a
                  href="/live/new-orleans"
                  className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  Get Early Access
                </a>
              </div>
              <div className="hidden lg:flex items-center justify-end">
                <p
                  className="font-display font-black uppercase text-white/5 leading-none select-none text-right"
                  style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.04em' }}
                >
                  FEB<br />27
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* SXSW Feature */}
        <AnimatedSection>
          <div
            className="relative overflow-hidden border border-white/10 p-10 lg:p-14"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(204,0,0,0.08) 0%, transparent 70%)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
                  <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">Featured Upcoming</span>
                </div>
                <div className="mb-6">
                  <Image
                    src="/images/sxsw-logo.png"
                    alt="SXSW"
                    width={2000}
                    height={461}
                    className="w-auto h-8 lg:h-10 object-contain"
                  />
                </div>
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">Austin, Texas · March 2027</p>
                <h3
                  className="font-display font-black uppercase text-white leading-none mb-5"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.03em' }}
                >
                  LoveNRnB Live<br />at SXSW 2027
                </h3>
                <p className="font-body text-base text-white/50 leading-relaxed mb-8">
                  LoveNRnB is officially presenting a music showcase at SXSW 2027, bringing rising R&amp;B talent and unforgettable performances to Austin.
                </p>
                <a
                  href="/events"
                  className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>
              <div className="hidden lg:flex items-center justify-end">
                <div className="text-right">
                  <p
                    className="font-display font-black uppercase text-white/5 leading-none select-none"
                    style={{ fontSize: 'clamp(5rem, 12vw, 12rem)', letterSpacing: '-0.04em' }}
                  >
                    2027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
