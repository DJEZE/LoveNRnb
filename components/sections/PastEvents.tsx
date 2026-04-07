'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Users, ChevronRight } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { formatEventDate, cn } from '@/lib/utils'
import type { PastEvent } from '@/lib/types'

interface PastEventsProps {
  events: PastEvent[]
}

function EventRecapCard({ event }: { event: PastEvent }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.article
        variants={staggerChild}
        className="group relative overflow-hidden rounded-md bg-surface border border-gold-border/20 hover:border-gold-border/50 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Cover image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-3">
          {event.coverImage ? (
            <Image
              src={event.coverImage}
              alt={event.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-smooth"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            // Placeholder gradient when no image
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg,
                  rgba(80, 30, 60, 0.9) 0%,
                  rgba(30, 15, 40, 0.95) 50%,
                  rgba(20, 10, 30, 1) 100%
                )`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-6xl text-cream/20 font-bold">
                  {event.name[0]}
                </span>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/20 to-transparent" />

          {/* Play button if recap video */}
          {event.recapVideoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center group-hover:bg-gold/30 transition-colors duration-300 backdrop-blur-sm">
                <Play size={18} className="text-gold fill-gold ml-0.5" />
              </div>
            </div>
          )}

          {/* Photo count badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm rounded-sm px-2.5 py-1">
            <span className="font-body text-2xs text-cream uppercase tracking-widest">
              {event.images.length} Photos
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mb-1.5">
                {formatEventDate(event.date)} · {event.city}
              </p>
              <h3 className="font-display text-xl text-cream leading-tight mb-1">
                {event.name}
              </h3>
              <p className="font-body text-sm text-cream-muted">{event.venue}</p>
            </div>

            {event.attendees && (
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="flex items-center gap-1.5 text-cream-muted">
                  <Users size={12} strokeWidth={1.5} />
                  <span className="font-body text-xs tabular-nums">
                    {event.attendees.toLocaleString()}
                  </span>
                </div>
                <span className="font-body text-2xs text-dim uppercase tracking-wider">attended</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-4 text-gold text-xs uppercase tracking-widest group-hover:gap-2.5 transition-all duration-200">
            <span>View Recap</span>
            <ChevronRight size={12} />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold-gradient transition-all duration-500 ease-smooth" />
      </motion.article>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 lg:p-12"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-sm bg-surface border border-gold-border/30 text-cream hover:text-gold hover:border-gold-border transition-all duration-200"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <p className="font-body text-2xs text-gold uppercase tracking-[0.25em] mb-1">
                  {formatEventDate(event.date)} · {event.venue}
                </p>
                <h2 className="font-display text-3xl text-cream">{event.name}</h2>
              </div>

              {/* Photo grid */}
              <div
                className={cn(
                  'grid gap-3',
                  event.images.length === 1 ? 'grid-cols-1' :
                  event.images.length === 2 ? 'grid-cols-2' :
                  event.images.length === 3 ? 'grid-cols-2 lg:grid-cols-3' :
                  'grid-cols-2 lg:grid-cols-4'
                )}
              >
                {event.images.map((img, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative overflow-hidden rounded-sm bg-surface-3',
                      i === 0 && event.images.length >= 3 ? 'aspect-video col-span-2' : 'aspect-square'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${event.name} photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}

                {/* Placeholder tiles when images aren't set */}
                {event.images.length === 0 && (
                  <div className="aspect-video col-span-full bg-surface-3 rounded-sm flex items-center justify-center">
                    <span className="text-dim font-body text-sm">Photos coming soon</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function PastEvents({ events }: PastEventsProps) {
  return (
    <section id="experience" className="relative bg-background py-24 lg:py-36 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 168, 76, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 168, 76, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <SectionLabel align="center" className="mb-6">
            The Experience
          </SectionLabel>
          <h2 className="font-display text-display-md text-cream mb-4">
            Past Events
          </h2>
          <p className="font-body text-sm text-cream-muted max-w-sm">
            Every event is a moment. Here&apos;s proof we know how to create them.
          </p>
        </AnimatedSection>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventRecapCard key={event.id} event={event} />
          ))}
        </StaggerContainer>

        {/* Stats bar */}
        <AnimatedSection
          className="mt-20 grid grid-cols-3 divide-x divide-gold-border/30 border border-gold-border/30 rounded-md bg-surface shadow-card"
          delay={0.2}
        >
          {[
            { value: '3', label: 'Events Hosted' },
            { value: '1,150+', label: 'Attendees' },
            { value: '100%', label: 'Sold Out Shows' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-display text-3xl lg:text-4xl text-gold leading-none mb-2">
                {stat.value}
              </span>
              <span className="font-body text-2xs text-cream-muted uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
