'use client'

import { Check, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { getAvailabilityLabel, cn } from '@/lib/utils'
import type { TicketTier } from '@/lib/types'

interface TicketsProps {
  tiers: TicketTier[]
  eventName: string
  eventDate: string
  venue: string
}

function TierCard({ tier }: { tier: TicketTier }) {
  const { label: availLabel, urgent } = getAvailabilityLabel(tier.available, tier.total)
  const soldOut = tier.soldOut || tier.available === 0
  const fillPct = Math.round(((tier.total - tier.available) / tier.total) * 100)

  return (
    <motion.div
      variants={staggerChild}
      className={cn(
        'relative flex flex-col border transition-all duration-300',
        tier.isHighlighted
          ? 'border-gold bg-surface-2'
          : 'border-white/10 bg-surface hover:border-white/25'
      )}
    >
      {/* Popular badge */}
      {tier.isHighlighted && (
        <div className="absolute -top-px left-0 right-0 h-0.5 bg-gold" />
      )}
      {tier.isHighlighted && (
        <div className="absolute -top-8 left-0">
          <span className="font-body text-2xs bg-gold text-black px-3 py-1.5 uppercase tracking-[0.15em] font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 lg:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-7">
          <p className={cn(
            'font-body text-2xs uppercase tracking-[0.25em] font-medium mb-3',
            tier.isHighlighted ? 'text-gold' : 'text-white/50'
          )}>
            {tier.name}
          </p>

          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-3xl lg:text-4xl text-gold uppercase leading-none">
              Pricing TBA
            </span>
          </div>
        </div>

        {/* Rule */}
        <div className={cn('h-px mb-6', tier.isHighlighted ? 'bg-gold/30' : 'bg-white/10')} />

        {/* Perks */}
        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <Check
                size={13}
                strokeWidth={2.5}
                className={cn('flex-shrink-0 mt-0.5', tier.isHighlighted ? 'text-gold' : 'text-white/40')}
              />
              <span className="font-body text-sm text-white/70 leading-snug">{perk}</span>
            </li>
          ))}
        </ul>

        {/* Availability bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-2xs text-white/30 uppercase tracking-widest">Availability</span>
            <div className="flex items-center gap-1.5">
              {urgent && !soldOut && <AlertCircle size={11} className="text-amber-400" />}
              <span className={cn(
                'font-body text-2xs uppercase tracking-widest',
                soldOut ? 'text-white/20' : urgent ? 'text-amber-400' : 'text-white/40'
              )}>
                {availLabel}
              </span>
            </div>
          </div>
          <div className="h-0.5 bg-white/10">
            <div
              className={cn('h-full transition-all duration-500', soldOut ? 'bg-white/20' : tier.isHighlighted ? 'bg-gold' : 'bg-white/40')}
              style={{ width: `${Math.min(fillPct, 100)}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <a
          href={soldOut ? undefined : '/experience'}
          className={cn(
            'flex items-center justify-center h-12 font-body text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200',
            soldOut
              ? 'border border-white/10 text-white/20 cursor-not-allowed pointer-events-none'
              : tier.isHighlighted
              ? 'bg-gold text-black hover:bg-gold-light'
              : 'border border-white/20 text-white hover:bg-white/5 hover:border-white/40'
          )}
        >
          {soldOut ? 'Sold Out' : tier.ctaLabel}
        </a>
      </div>
    </motion.div>
  )
}

export function Tickets({ tiers, eventName, eventDate, venue }: TicketsProps) {
  const vipTier = tiers.find((t) => t.id === 'tier-vip')

  return (
    <section id="tickets" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimatedSection className="py-10 lg:py-14">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
            Secure Your Spot
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Tickets
            </h2>
            <div className="lg:pb-3 space-y-1">
              <p className="font-body text-sm text-white/50">{eventName}</p>
              <p className="font-body text-sm text-white/30">{eventDate} · {venue}</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="w-full h-px bg-white/10 mb-10 lg:mb-14" />

        {/* Urgency banner */}
        {vipTier && vipTier.available > 0 && (
          <AnimatedSection className="flex items-center gap-3 border border-amber-500/25 bg-amber-500/5 p-4 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot flex-shrink-0" />
            <p className="font-body text-xs text-amber-300 uppercase tracking-wide">
              Only {vipTier.available} VIP spots remaining — selling fast
            </p>
          </AnimatedSection>
        )}

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-14 lg:pb-20 mt-8">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </StaggerContainer>

        {/* Fine print */}
        <AnimatedSection className="pb-10 lg:pb-14" delay={0.2}>
          <div className="w-full h-px bg-white/10 mb-6" />
          <p className="font-body text-xs text-white/25 max-w-lg">
            All sales final · Non-transferable ·{' '}
            <a href="/terms" className="hover:text-white/50 underline underline-offset-2 transition-colors">Terms apply</a>
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
