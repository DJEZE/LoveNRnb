'use client'

import { Check, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
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
        'relative flex flex-col rounded-md border transition-all duration-500',
        'shadow-card hover:shadow-card-hover',
        tier.isHighlighted
          ? 'border-gold bg-surface-2 scale-[1.02] lg:scale-[1.04]'
          : 'border-gold-border/30 bg-surface hover:border-gold-border/60'
      )}
    >
      {/* Featured badge */}
      {tier.isHighlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 font-body text-2xs text-background bg-gold-gradient px-4 py-1.5 rounded-sm uppercase tracking-widest whitespace-nowrap shadow-gold-sm">
            <span className="w-1 h-1 rounded-full bg-background/60" />
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 lg:p-8 flex flex-col flex-1">
        {/* Tier name */}
        <div className="mb-6">
          <p
            className={cn(
              'font-body text-2xs uppercase tracking-[0.25em] mb-2',
              tier.isHighlighted ? 'text-gold' : 'text-cream-muted'
            )}
          >
            {tier.name}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            {tier.priceLabel ? (
              <p className="font-display text-3xl text-cream">{tier.priceLabel}</p>
            ) : (
              <>
                <span className="font-body text-lg text-cream-muted">$</span>
                <span className="font-display text-5xl text-cream leading-none">
                  {tier.price}
                </span>
                <span className="font-body text-xs text-cream-muted">/ person</span>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className={cn(
            'h-px mb-6',
            tier.isHighlighted ? 'bg-gold-border' : 'bg-cream-faint'
          )}
        />

        {/* Perks */}
        <ul className="flex flex-col gap-3.5 mb-8 flex-1">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3">
              <Check
                size={14}
                strokeWidth={2.5}
                className={cn(
                  'flex-shrink-0 mt-0.5',
                  tier.isHighlighted ? 'text-gold' : 'text-cream-muted'
                )}
              />
              <span className="font-body text-sm text-cream/80 leading-snug">{perk}</span>
            </li>
          ))}
        </ul>

        {/* Availability indicator */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-2xs text-cream-muted uppercase tracking-widest">
              Availability
            </span>
            <div className="flex items-center gap-1.5">
              {urgent && !soldOut && (
                <AlertCircle size={11} className="text-amber-400" />
              )}
              <span
                className={cn(
                  'font-body text-2xs uppercase tracking-widest',
                  soldOut
                    ? 'text-dim'
                    : urgent
                    ? 'text-amber-400'
                    : 'text-cream-muted'
                )}
              >
                {availLabel}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 rounded-full bg-surface-3 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                soldOut
                  ? 'bg-dim'
                  : tier.isHighlighted
                  ? 'bg-gold-gradient'
                  : 'bg-cream/30'
              )}
              style={{ width: `${Math.min(fillPct, 100)}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Button
          variant={tier.isHighlighted ? 'gold' : 'outline'}
          size="md"
          href={soldOut ? undefined : tier.ticketUrl}
          isExternal={!soldOut}
          disabled={soldOut}
          className="w-full justify-center"
        >
          {soldOut ? 'Sold Out' : tier.ctaLabel}
        </Button>
      </div>

      {/* Bottom glow for highlighted */}
      {tier.isHighlighted && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-gradient rounded-b-md" />
      )}
    </motion.div>
  )
}

export function Tickets({ tiers, eventName, eventDate, venue }: TicketsProps) {
  return (
    <section
      id="tickets"
      className="relative bg-surface py-24 lg:py-36 overflow-hidden"
    >
      {/* Section fade edges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-section-fade-top pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-section-fade-bottom pointer-events-none" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(201, 168, 76, 0.5) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <AnimatedSection className="flex flex-col items-center text-center mb-16 lg:mb-20">
          <SectionLabel align="center" className="mb-6">
            Secure Your Spot
          </SectionLabel>
          <h2 className="font-display text-display-md text-cream mb-4">
            Tickets
          </h2>
          <p className="font-body text-sm text-cream-muted max-w-sm">
            {eventName} · {venue}
          </p>

          {/* Urgency banner */}
          <div className="mt-6 flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 rounded-sm px-4 py-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-dot flex-shrink-0" />
            <span className="font-body text-xs text-amber-300 tracking-wide">
              VIP spots are filling fast — only {tiers.find(t => t.isHighlighted)?.available} remaining
            </span>
          </div>
        </AnimatedSection>

        {/* Tier cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start mt-8">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </StaggerContainer>

        {/* Fine print */}
        <AnimatedSection className="flex flex-col items-center gap-2 mt-12 text-center" delay={0.2}>
          <p className="font-body text-xs text-dim max-w-lg">
            All sales are final. This is a 21+ event — valid ID required at entry.
            Tickets are non-transferable. By purchasing, you agree to our{' '}
            <a href="/terms" className="text-cream-muted hover:text-gold underline underline-offset-2 transition-colors">
              Terms of Service
            </a>
            .
          </p>
          <p className="font-body text-2xs text-dim/70 uppercase tracking-widest">
            Secured by Tixr · 256-bit encryption
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
