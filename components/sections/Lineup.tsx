'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
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
      className="relative col-span-full overflow-hidden group"
      style={{ aspectRatio: '21/9' }}
    >
      {artist.tba ? (
        // TBA headliner — pure black with gold treatment
        <div className="absolute inset-0 bg-surface-2 flex flex-col items-center justify-center gap-6 border border-white/10">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, #CC0000 0px, #CC0000 1px, transparent 1px, transparent 50px)`,
            }}
          />
          <p className="font-body text-xs text-gold uppercase tracking-[0.3em] relative z-10">Headliner</p>
          <p
            className="font-display font-black uppercase text-white/20 relative z-10"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: '0.9', letterSpacing: '-0.03em' }}
          >
            To Be<br />Announced
          </p>
          <a
            href="https://instagram.com/lovenrnbfest"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-2 font-body text-xs text-gold uppercase tracking-[0.2em] hover:text-gold-light transition-colors"
          >
            <Instagram size={13} strokeWidth={1.5} />
            Follow @lovenrnbfest for the reveal
          </a>
        </div>
      ) : (
        <>
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 artist-overlay" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 flex items-end justify-between">
            <div>
              <p className="font-body text-xs text-gold uppercase tracking-[0.3em] mb-2">Headliner</p>
              <h3
                className="font-display font-black uppercase text-white leading-none"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', letterSpacing: '-0.03em' }}
              >
                {artist.name}
              </h3>
            </div>
            {artist.instagram && (
              <a
                href={artist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}

function ArtistCard({ artist }: { artist: Artist }) {
  if (artist.tba) {
    return (
      <motion.div
        variants={staggerChild}
        className="relative overflow-hidden bg-surface-2 border border-white/10 flex flex-col items-center justify-center group"
        style={{ aspectRatio: '3/4' }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-black text-white/5 uppercase select-none"
            style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', letterSpacing: '-0.02em' }}
          >
            TBA
          </span>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
          <div className="w-12 h-12 border border-dashed border-white/20 flex items-center justify-center">
            <span className="font-display font-black text-white/20 text-2xl">?</span>
          </div>
          <p className="font-body text-2xs text-white/40 uppercase tracking-[0.25em]">Coming Soon</p>
        </div>
        {/* Gold bottom border on hover */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gold transition-all duration-500" />
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={staggerChild}
      className="relative overflow-hidden group cursor-pointer"
      style={{ aspectRatio: '3/4' }}
    >
      <Image
        src={artist.image}
        alt={artist.name}
        fill
        className="object-cover object-top group-hover:scale-105 transition-transform duration-600"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 artist-overlay" />

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <p className={cn(
          'font-body text-2xs uppercase tracking-[0.25em] mb-1.5',
          artist.role === 'featured' ? 'text-gold' : 'text-white/50'
        )}>
          {artist.role === 'featured' ? 'Featured' : artist.role === 'dj' ? 'DJ' : artist.role === 'mc' ? 'MC' : 'Supporting'}
        </p>
        <h3 className="font-display font-black uppercase text-white leading-none text-2xl lg:text-3xl">
          {artist.name}
        </h3>
        <p className="font-body text-xs text-white/50 mt-1 uppercase tracking-wide">{artist.genre}</p>
      </div>

      {/* Instagram on hover */}
      {artist.instagram && (
        <a
          href={artist.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-gold"
        >
          <Instagram size={14} strokeWidth={1.5} />
        </a>
      )}

      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gold transition-all duration-500" />
    </motion.div>
  )
}

export function Lineup({ artists, eventName }: LineupProps) {
  const headliner = artists.find((a) => a.role === 'headliner')

  return (
    <section id="lineup" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      {/* Section header */}
      <div className="container mx-auto px-6">
        <AnimatedSection className="flex items-end justify-between py-10 lg:py-14">
          <div>
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              {eventName} · Nov 21, 2026
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              The Lineup
            </h2>
          </div>
          <p className="font-body text-xs text-white/40 uppercase tracking-[0.2em] hidden lg:block pb-3">
            Announcements Coming
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* ── Artists ── */}
      <StaggerContainer className="container mx-auto px-6 pt-8 lg:pt-10 pb-8 lg:pb-12">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
          Artists
        </p>
        <div className="grid grid-cols-1 gap-4 lg:gap-5">
          {headliner && <HeadlinerCard artist={headliner} />}
        </div>
      </StaggerContainer>

      {/* Footer note */}
      <div className="container mx-auto px-6 pb-10">
        <div className="w-full h-px bg-white/10 mb-6" />
        <p className="font-body text-xs text-white/30 uppercase tracking-[0.2em] text-center">
          Lineup subject to change · Follow{' '}
          <a href="https://instagram.com/lovenrnbfest" target="_blank" rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors">
            @lovenrnbfest
          </a>{' '}
          for announcements
        </p>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
