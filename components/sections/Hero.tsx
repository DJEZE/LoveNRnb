'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { formatEventDate } from '@/lib/utils'
import type { Event } from '@/lib/types'

interface HeroProps {
  event: Event
}

export function Hero({ event }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.2}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="events"
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      {/* Background — replace div with <Image> once you have hero photo */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 70% 30%, rgba(160,0,0,0.35) 0%, transparent 65%),
              radial-gradient(ellipse 60% 60% at 20% 80%, rgba(120,0,0,0.25) 0%, transparent 65%),
              #000000
            `,
          }}
        />
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* Strong bottom fade to black */}
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 container mx-auto px-6 pb-16 lg:pb-24 pt-28">

        {/* Event badge */}
        <motion.div
          className="flex items-center gap-3 mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
          <span className="font-body text-2xs text-gold uppercase tracking-[0.3em] font-medium">
            Upcoming — Houston, TX
          </span>
        </motion.div>

        {/* Brand logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="sr-only">LoveNRnb</h1>
          <Image
            src="/images/lovenrnb_logo_red.png"
            alt="LoveNRnb"
            width={900}
            height={450}
            className="w-full max-w-[min(90vw,700px)] h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Thin rule */}
        <motion.div
          className="w-full h-px bg-white/15 my-5 lg:my-7"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Event meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 lg:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <span className="font-display font-bold text-xl lg:text-2xl uppercase text-white tracking-wide">
            {formatEventDate(event.date)}
          </span>
          <span className="text-white/30 hidden sm:block">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} strokeWidth={2} className="text-gold" />
            <span className="font-display font-bold text-xl lg:text-2xl uppercase text-white tracking-wide">
              {event.venue}, {event.city}
            </span>
          </div>
          <span className="text-white/30 hidden sm:block">·</span>
          <div className="flex items-center gap-1.5">
            <Clock size={13} strokeWidth={2} className="text-gold" />
            <span className="font-display font-bold text-xl lg:text-2xl uppercase text-white tracking-wide">
              Doors {event.doorsOpen}
            </span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mb-10 lg:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <CountdownTimer targetISO={event.date} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <a
            href={event.ticketTiers[1]?.ticketUrl ?? '#tickets'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-12 lg:h-14 px-8 lg:px-10 font-body text-sm font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
          >
            Get Tickets →
          </a>
          <button
            onClick={() => document.querySelector('#lineup')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center h-12 lg:h-14 px-8 lg:px-10 font-body text-sm font-semibold uppercase tracking-[0.15em] text-white border border-white/30 hover:border-white/70 hover:bg-white/5 transition-all duration-200"
          >
            View Lineup
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-6 lg:right-8 z-10 hidden lg:flex items-center gap-2">
        <span className="font-body text-2xs text-white/30 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-8 h-px bg-white/20" />
      </div>
    </section>
  )
}
