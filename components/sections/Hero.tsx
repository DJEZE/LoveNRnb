'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { formatEventDate } from '@/lib/utils'
import type { Event } from '@/lib/types'

interface HeroProps {
  event: Event
}

const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
}

export function Hero({ event }: HeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Subtle parallax on scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      el.style.transform = `translateY(${scrollY * 0.25}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToLineup = () => {
    document.querySelector('#lineup')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="events"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-background"
    >
      {/* Background image / gradient layer */}
      <div ref={scrollRef} className="absolute inset-0 will-change-transform">
        {/* When you have a real hero image, replace this gradient with:
            <Image src={event.heroImage} alt={event.name} fill className="object-cover object-center" priority /> */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 60% 20%, rgba(120, 60, 20, 0.35) 0%, transparent 70%),
              radial-gradient(ellipse 60% 80% at 20% 70%, rgba(80, 30, 60, 0.3) 0%, transparent 70%),
              radial-gradient(ellipse 100% 100% at 50% 50%, rgba(30, 15, 40, 0.8) 0%, #080808 100%)
            `,
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      {/* Strong bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-section-fade-bottom pointer-events-none" />

      {/* Age badge top-right */}
      <div className="absolute top-24 right-6 lg:right-12 hidden sm:block">
        <div className="flex items-center gap-2 border border-gold-border/60 rounded-sm px-3 py-1.5 bg-gold-faint backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
          <span className="font-body text-2xs text-gold uppercase tracking-[0.2em]">21+ Event</span>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 pb-20 lg:pb-28 pt-32">
        <div className="max-w-5xl">
          {/* Event label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={FADE_UP}
          >
            <span className="w-12 h-px bg-gold" />
            <span className="font-body text-2xs text-gold uppercase tracking-[0.3em]">
              Next Event — Houston, TX
            </span>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={FADE_UP}
          >
            <h1 className="font-display leading-none mb-3">
              <span
                className="block text-display-xl text-cream"
                style={{
                  textShadow: '0 0 80px rgba(201, 168, 76, 0.12)',
                }}
              >
                Love<span className="text-gold">N</span>Rnb
              </span>
            </h1>
          </motion.div>

          {/* Event name + tagline */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.35}
            variants={FADE_UP}
          >
            <p className="font-display text-display-sm text-cream/70 italic font-normal mb-2">
              {event.name}
            </p>
            <p className="font-body text-sm text-cream-muted tracking-wider mb-10">
              {event.tagline}
            </p>
          </motion.div>

          {/* Event meta — date, venue */}
          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10"
            initial="hidden"
            animate="visible"
            custom={0.45}
            variants={FADE_UP}
          >
            <div className="flex items-center gap-2 text-cream">
              <span className="font-body text-sm font-medium">
                {formatEventDate(event.date)}
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gold opacity-60 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-cream-muted">
              <MapPin size={13} strokeWidth={1.5} className="text-gold flex-shrink-0" />
              <span className="font-body text-sm">{event.venue}, {event.city}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-gold opacity-60 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-cream-muted">
              <Clock size={13} strokeWidth={1.5} className="text-gold flex-shrink-0" />
              <span className="font-body text-sm">Doors {event.doorsOpen}</span>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            className="mb-12"
            initial="hidden"
            animate="visible"
            custom={0.55}
            variants={FADE_UP}
          >
            <p className="font-body text-2xs text-cream-muted uppercase tracking-[0.2em] mb-4">
              Countdown to showtime
            </p>
            <CountdownTimer targetISO={event.date} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            custom={0.65}
            variants={FADE_UP}
          >
            <Button
              variant="gold"
              size="lg"
              href={event.ticketTiers[1]?.ticketUrl}
              isExternal
              className="min-w-[180px]"
            >
              Get Tickets
              <span className="ml-1">→</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document.querySelector('#lineup')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="min-w-[160px]"
            >
              View Lineup
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToLineup}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream-muted hover:text-cream transition-colors duration-200 group"
        aria-label="Scroll to lineup"
      >
        <span className="font-body text-2xs uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown
          size={14}
          className="animate-bounce group-hover:text-gold transition-colors duration-200"
        />
      </button>
    </section>
  )
}
