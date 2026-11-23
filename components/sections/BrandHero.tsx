'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function BrandHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/eze-back-lovernb.jpg"
          alt="LoveNRnB"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 50% 40%, rgba(204,0,0,0.22) 0%, rgba(140,0,0,0.08) 50%, transparent 75%),
              linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 60%, #000 100%)
            `,
          }}
        />
      </div>

      {/* Noise grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 pt-32 pb-16">

        {/* Logo */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/lovenrnb-logo.png"
            alt="LoveNRnb"
            width={900}
            height={450}
            className="w-[180px] sm:w-[260px] lg:w-[360px] h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          className="mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
          >
            More Than Music.<br />
            <span className="text-gold">It&apos;s An Experience.</span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="font-body text-base lg:text-lg text-white/50 max-w-2xl leading-relaxed mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          LoveNRnB is where R&amp;B, culture, and unforgettable experiences come together. From Houston to cities across the country, we&apos;re bringing people closer through the music they love.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-xs sm:max-w-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <a
            href="#experiences"
            className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
          >
            Explore Our Experiences
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-gold border border-gold/50 hover:border-gold hover:bg-gold/5 transition-all duration-200"
          >
            Join the Community
          </a>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-20 border-t border-white/10 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(8)].flatMap((_, i) => [
            <span key={`a${i}`} className="font-display font-black uppercase text-sm text-white/30 tracking-[0.2em] mx-5">LoveNRnB Fest<span className="text-gold mx-4">·</span></span>,
            <span key={`b${i}`} className="font-display font-black uppercase text-sm text-white/30 tracking-[0.2em] mx-5">LoveNRnB Live<span className="text-gold mx-4">·</span></span>,
            <span key={`c${i}`} className="font-display font-black uppercase text-sm text-white/30 tracking-[0.2em] mx-5">SXSW 2027<span className="text-gold mx-4">·</span></span>,
          ])}
        </div>
      </div>
    </section>
  )
}
