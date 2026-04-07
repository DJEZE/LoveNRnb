'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Music } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import type { Artist } from '@/lib/types'

interface LineupProps {
  artists: Artist[]
  eventName: string
}

function HeadlinerCard({ artist }: { artist: Artist }) {
  return (
    <motion.div
      variants={staggerChild}
      className="group relative col-span-full overflow-hidden rounded-md bg-surface border border-gold-border/30 shadow-card hover:shadow-card-hover transition-all duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px] lg:min-h-[440px]">
        {/* Image / TBA side */}
        <div className="relative overflow-hidden bg-surface-3">
          {artist.image && !artist.tba ? (
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-smooth"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{
                background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
              }}
            >
              <div className="w-20 h-20 rounded-full border border-dashed border-gold-border flex items-center justify-center">
                <span className="font-display text-3xl text-gold/40">?</span>
              </div>
              <p className="font-body text-2xs text-dim uppercase tracking-[0.3em]">Announcement Coming</p>
            </div>
          )}
          {/* Image gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface opacity-80 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent lg:hidden" />
        </div>

        {/* Info side */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-16 relative">
          <div className="mb-3">
            <span className="inline-block font-body text-2xs text-gold uppercase tracking-[0.3em] border border-gold-border rounded-sm px-2.5 py-1">
              Headliner
            </span>
          </div>

          <h3 className="font-display text-display-md text-cream/40 leading-none mb-3 italic">
            {artist.tba ? 'To Be Announced' : artist.name}
          </h3>

          <p className="font-body text-sm text-cream-muted tracking-wide mb-8">
            {artist.tba ? 'Follow us for the reveal' : artist.genre}
          </p>

          <div className="flex items-center gap-4">
            {artist.tba && (
              <a
                href="https://instagram.com/lovenrnb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-200 text-xs uppercase tracking-widest"
              >
                <Instagram size={14} strokeWidth={1.5} />
                <span>@lovenrnb</span>
              </a>
            )}
            {!artist.tba && artist.instagram && (
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream-muted hover:text-gold transition-colors duration-200 text-xs uppercase tracking-widest"
              >
                <Instagram size={14} strokeWidth={1.5} />
                <span>Follow</span>
              </a>
            )}
            {artist.spotify && (
              <a
                href={artist.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream-muted hover:text-gold transition-colors duration-200 text-xs uppercase tracking-widest"
              >
                <Music size={14} strokeWidth={1.5} />
                <span>Listen</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-60" />
    </motion.div>
  )
}

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  if (artist.tba) {
    return (
      <motion.div
        variants={staggerChild}
        className="relative flex flex-col items-center justify-center rounded-md bg-surface border border-gold-border/20 min-h-[280px] lg:min-h-[320px] group hover:border-gold-border/50 transition-all duration-300"
      >
        <div className="w-16 h-16 rounded-full border border-dashed border-dim flex items-center justify-center mb-4">
          <span className="text-dim text-2xl font-display">?</span>
        </div>
        <p className="font-display text-xl text-dim italic">TBA</p>
        <p className="font-body text-2xs text-dim uppercase tracking-widest mt-2">
          Coming Soon
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerChild}
      className="group relative overflow-hidden rounded-md bg-surface border border-gold-border/20 hover:border-gold-border/50 shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-3">
        {artist.image ? (
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-smooth"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl text-dim font-bold">{artist.name[0]}</span>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/60 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300" />

        {/* Social links on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {artist.instagram && (
            <a
              href={artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 flex items-center justify-center rounded-sm bg-background/80 backdrop-blur-sm text-cream hover:text-gold transition-colors"
            >
              <Instagram size={14} strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-1">
          <span className="font-body text-2xs text-gold-dark uppercase tracking-[0.2em]">
            {artist.role === 'featured' ? 'Featured' : 'Supporting'}
          </span>
        </div>
        <h3 className="font-display text-xl text-cream leading-tight">
          {artist.name}
        </h3>
        <p className="font-body text-xs text-cream-muted mt-1 tracking-wide">
          {artist.genre}
        </p>
      </div>

      {/* Bottom accent on hover */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold-gradient transition-all duration-500 ease-smooth" />
    </motion.div>
  )
}

export function Lineup({ artists, eventName }: LineupProps) {
  const headliner = artists.find((a) => a.role === 'headliner')
  const rest = artists.filter((a) => a.role !== 'headliner')

  return (
    <section id="lineup" className="relative bg-background py-24 lg:py-36 overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #C9A84C 0px,
            #C9A84C 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <SectionLabel align="center" className="mb-6">
            {eventName}
          </SectionLabel>
          <h2 className="font-display text-display-md text-cream">
            The Lineup
          </h2>
          <p className="font-body text-sm text-cream-muted mt-4 max-w-md">
            Curated artists. Curated energy. One night you won&apos;t forget.
          </p>
        </div>

        {/* Artist grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Headliner — full width */}
          {headliner && <HeadlinerCard artist={headliner} />}

          {/* Supporting artists — 3 col */}
          {rest.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </StaggerContainer>

        {/* More TBA note */}
        <div className="flex justify-center mt-12">
          <p className="font-body text-xs text-cream-muted uppercase tracking-[0.2em]">
            More artists to be announced — follow{' '}
            <a
              href="https://instagram.com/lovenrnb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              @lovenrnb
            </a>{' '}
            for updates
          </p>
        </div>
      </div>
    </section>
  )
}
