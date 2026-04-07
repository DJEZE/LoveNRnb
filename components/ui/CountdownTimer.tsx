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
    { value: formatCountdownUnit(parts.hours), label: 'Hrs' },
    { value: formatCountdownUnit(parts.minutes), label: 'Min' },
    { value: formatCountdownUnit(parts.seconds), label: 'Sec' },
  ]

  return (
    <div className={cn('flex items-start gap-2 sm:gap-3', className)}>
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-start gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            {/* Number block — Rolling Loud sharp box style */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-surface-2 border border-white/10 flex items-center justify-center">
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tabular-nums leading-none">
                {unit.value}
              </span>
            </div>
            <span className="mt-2 font-body text-2xs text-white/30 uppercase tracking-[0.2em]">
              {unit.label}
            </span>
          </div>

          {i < units.length - 1 && (
            <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-gold/40 mt-4 sm:mt-5 lg:mt-6 leading-none select-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
