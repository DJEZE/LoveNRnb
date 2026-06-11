'use client'

import { useEffect, useState } from 'react'
import { getCountdownParts, formatCountdownUnit } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetISO: string
  className?: string
}

export function CountdownTimer({ targetISO, className }: CountdownTimerProps) {
  const [parts, setParts] = useState(() => getCountdownParts(targetISO))

  useEffect(() => {
    const interval = setInterval(() => setParts(getCountdownParts(targetISO)), 1000)
    return () => clearInterval(interval)
  }, [targetISO])

  if (parts.expired) {
    return (
      <p className={cn('font-display font-black text-3xl uppercase text-gold tracking-wide', className)}>
        Happening Now
      </p>
    )
  }

  const units = [
    { value: formatCountdownUnit(parts.days), label: 'Days' },
    { value: formatCountdownUnit(parts.hours), label: 'Hours' },
    { value: formatCountdownUnit(parts.minutes), label: 'Minutes' },
    { value: formatCountdownUnit(parts.seconds), label: 'Seconds' },
  ]

  return (
    <div className={cn('flex items-start gap-4 sm:gap-6 lg:gap-8', className)}>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-start gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tabular-nums leading-none">
              {unit.value}
            </span>
            <span className="mt-2 font-body text-2xs text-white/30 uppercase tracking-[0.25em]">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-gold/30 leading-none select-none mt-0.5">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
