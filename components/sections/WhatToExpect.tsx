'use client'

import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { motion } from 'framer-motion'

const EXPERIENCES = [
  {
    label: 'Live R&B Performances',
    description:
      'Experience unforgettable live music headlined by Kaash Paige, alongside rising artists and special guests.',
  },
  {
    label: 'Incredible DJs',
    description:
      'Sing and vibe to your favorite R&B records — from timeless classics to today\'s biggest hits.',
  },
  {
    label: 'An Intimate Concert Experience',
    description:
      'Get closer to the music and experience the energy of LoveNRnB Fest in an exciting indoor atmosphere.',
  },
  {
    label: 'VIP Experiences',
    description:
      'Elevate your night with exclusive VIP table reservations and premium experiences.',
  },
  {
    label: 'The R&B Community',
    description:
      'Connect with fellow R&B lovers and celebrate the music and culture that brings Houston together.',
  },
]

export function WhatToExpect() {
  return (
    <section id="experience" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <AnimatedSection className="mb-10 lg:mb-14">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">One Night. All the R&B Vibes.</p>
          <h2
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
          >
            What to Expect
          </h2>
        </AnimatedSection>

        <div className="w-full h-px bg-white/10 mb-10 lg:mb-14" />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {EXPERIENCES.map(({ label, description }) => (
            <motion.div
              key={label}
              variants={staggerChild}
              className="bg-black p-8 lg:p-10 group hover:bg-surface transition-colors duration-300"
            >
              <div className="w-6 h-0.5 bg-gold mb-6 group-hover:w-10 transition-all duration-300" />
              <h3 className="font-display font-black uppercase text-white text-xl lg:text-2xl leading-tight mb-4">
                {label}
              </h3>
              <p className="font-body text-sm text-white/40 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
