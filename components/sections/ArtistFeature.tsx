'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const ARTISTS = [
  {
    name: 'Jacquees',
    label: 'LoveNRnB Fest 2026',
    image: '/images/fest-jacquees-stage.jpg',
    position: 'object-top',
  },
  {
    name: 'Kaash Paige',
    label: 'LoveNRnB Fest 2026',
    image: '/images/fest-kaash-crowd.jpg',
    position: 'object-center',
  },
]

export function ArtistFeature() {
  return (
    <section className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6 py-16 lg:py-24">
        <motion.p
          className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          LoveNRnB Fest 2026
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {ARTISTS.map((artist, i) => (
            <motion.div
              key={artist.name}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '3/4' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className={`object-cover ${artist.position} group-hover:scale-105 transition-transform duration-700`}
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)' }}
              />
              {/* Name */}
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <p className="font-body text-2xs text-gold/70 uppercase tracking-[0.25em] mb-1">{artist.label}</p>
                <p
                  className="font-display font-black uppercase text-white leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.02em' }}
                >
                  {artist.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
