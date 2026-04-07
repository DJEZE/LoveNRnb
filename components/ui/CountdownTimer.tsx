'use client'

import { useEffect, useState } from 'react'
import { getCountdownParts, formatCountdownUnit } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetISO: string
  className?: string
}

interface TimeUnit {
  value: string
  label: string
}

export function CountdownTimer({ targetISO, className }: CountdownTimerProps) {
  const [parts, setParts] = useState(() => getCountdownParts(targetISO))

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(targetISO))
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetISO])

  if (parts.expired) {
    return (
      <p className={cn('font-mono text-gold text-sm tracking-widest uppercase', className)}>
        Happening Now
      </p>
    )
  }

  const units: TimeUnit[] = [
    { value: formatCountdownUnit(parts.days), label: 'Days' },
    { value: formatCountdownUnit(parts.hours), label: 'Hours' },
    { value: formatCountdownUnit(parts.minutes), label: 'Min' },
    { value: formatCountdownUnit(parts.seconds), label: 'Sec' },
  ]

  return (
    <div className={cn('flex items-start gap-3 sm:gap-4', className)}>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-start gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'relative flex items-center justify-center',
                'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
                'bg-surface border border-gold-border rounded-sm',
                'shadow-card'
              )}
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-sm bg-gold-faint" />
              <span className="relative font-mono text-2xl sm:text-3xl lg:text-4xl font-light text-cream tabular-nums">
                {unit.value}
              </span>
            </div>
            <span className="mt-2 font-body text-2xs text-cream-muted uppercase tracking-[0.2em]">
              {unit.label}
            </span>
          </div>

          {/* Separator — hidden after last item */}
          {i < units.length - 1 && (
            <span className="font-mono text-2xl sm:text-3xl lg:text-4xl text-gold-dark mt-3 sm:mt-4 lg:mt-5 leading-none select-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
