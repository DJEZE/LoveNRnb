'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import type { Event } from '@/lib/types'

interface HeroProps {
  event: Event
}

export function Hero({ event }: HeroProps) {
  const confirmedArtists = event.lineup.filter((a) => !a.tba).map((a) => a.name)
  const marqueeItems = [...confirmedArtists, ...confirmedArtists, ...confirmedArtists, ...confirmedArtists]

  return (
    <section
      id="events"
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 65% at 50% 45%, rgba(204,0,0,0.28) 0%, rgba(180,0,0,0.12) 40%, transparent 70%),
              #000000
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Main content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-28 pb-10">

        {/* Event info pill */}
        <motion.div
          className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-10 lg:mb-14"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot flex-shrink-0" />
          <span className="font-body text-2xs text-gold uppercase tracking-[0.25em]">
            Nov 14, 2026 &nbsp;·&nbsp; Soho Festival Grounds &nbsp;·&nbsp; Houston, TX
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="mb-10 lg:mb-14"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/lovenrnb-logo.png"
            alt="LoveNRnb"
            width={900}
            height={450}
            className="w-[220px] sm:w-[340px] lg:w-[480px] xl:w-[600px] h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mb-10 lg:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CountdownTimer targetISO={event.date} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-xs sm:max-w-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a
            href={event.ticketTiers[1]?.ticketUrl ?? '#tickets'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
          >
            Get Tickets
          </a>
          <button
            onClick={() => document.querySelector('#lineup')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center h-14 px-10 font-body text-sm font-bold uppercase tracking-[0.2em] text-gold border border-gold/50 hover:border-gold hover:bg-gold/5 transition-all duration-200"
          >
            Full Lineup
          </button>
        </motion.div>
      </div>

      {/* Scrolling artist marquee */}
      {confirmedArtists.length > 0 && (
        <div className="relative z-10 border-t border-white/10 py-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {marqueeItems.map((name, i) => (
              <span
                key={i}
                className="font-display font-black uppercase text-sm text-white/40 tracking-[0.2em] mx-5"
              >
                {name}
                <span className="text-gold mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
