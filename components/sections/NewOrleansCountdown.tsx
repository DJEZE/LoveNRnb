'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET = new Date('2027-02-27T20:00:00-06:00')

function getTimeLeft(): TimeLeft {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-surface border border-white/10 px-4 py-5 sm:px-6 sm:py-6 min-w-[72px] sm:min-w-[90px] text-center">
        <p
          className="font-display font-black text-white leading-none tabular-nums"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
        >
          {String(value).padStart(2, '0')}
        </p>
      </div>
      <p className="font-body text-2xs text-white/35 uppercase tracking-[0.2em] mt-3">{label}</p>
    </div>
  )
}

interface Props {
  showCountdownOnly?: boolean
  showFormOnly?: boolean
}

export function NewOrleansCountdown({ showCountdownOnly, showFormOnly }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const countdown = (
    <div className="flex items-start gap-3 sm:gap-5">
      <CountdownUnit value={timeLeft.days} label="Days" />
      <span className="font-display font-black text-gold/50 mt-4 sm:mt-5" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>:</span>
      <CountdownUnit value={timeLeft.hours} label="Hrs" />
      <span className="font-display font-black text-gold/50 mt-4 sm:mt-5" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>:</span>
      <CountdownUnit value={timeLeft.minutes} label="Min" />
      <span className="font-display font-black text-gold/50 mt-4 sm:mt-5" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>:</span>
      <CountdownUnit value={timeLeft.seconds} label="Sec" />
    </div>
  )

  const cta = (
    <div className="max-w-lg w-full space-y-4">
      <a
        href="https://laylo.com/lovenrnb_/OmnUoi"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full h-14 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
      >
        Get Early Access <ArrowUpRight size={16} />
      </a>
      <p className="font-body text-2xs text-white/25 text-center">
        Sign up for early access to tickets, event announcements, and more.
      </p>
    </div>
  )

  if (showCountdownOnly) return countdown
  if (showFormOnly) return cta
  return (
    <div className="space-y-10">
      {countdown}
      {cta}
    </div>
  )
}
