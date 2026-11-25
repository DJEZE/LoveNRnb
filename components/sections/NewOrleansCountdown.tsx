'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormValues {
  firstName: string
  email: string
  phone: string
}

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
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.firstName, email: data.email, phone: data.phone }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      reset()
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

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

  const form = (
    <div className="max-w-lg w-full">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-black text-2xl uppercase text-white leading-none mb-2">
                  You&apos;re on the list.
                </p>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  We&apos;ll see you in New Orleans. Watch your inbox for early access details.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="font-body text-2xs text-white/30 uppercase tracking-[0.2em] mb-4">Also get SMS updates</p>
              <a
                href="https://laylo.com/lovenrnb_/OmnUoi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/30 hover:border-gold hover:bg-gold/5 transition-all duration-200"
              >
                Get SMS Updates
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* First Name */}
            <div className="relative">
              <input
                {...register('firstName', { required: 'First name is required' })}
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                className={cn(
                  'w-full h-14 px-5',
                  'font-body text-sm text-white placeholder:text-white/25',
                  'bg-surface-2 border',
                  'focus:outline-none focus:border-gold',
                  'transition-colors duration-200',
                  errors.firstName ? 'border-red-500/60' : 'border-white/15'
                )}
              />
              {errors.firstName && (
                <p className="absolute -bottom-5 left-0 font-body text-xs text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative mt-1">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                className={cn(
                  'w-full h-14 px-5',
                  'font-body text-sm text-white placeholder:text-white/25',
                  'bg-surface-2 border',
                  'focus:outline-none focus:border-gold',
                  'transition-colors duration-200',
                  errors.email ? 'border-red-500/60' : 'border-white/15'
                )}
              />
              {errors.email && (
                <p className="absolute -bottom-5 left-0 font-body text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="relative mt-1">
              <input
                {...register('phone', { required: 'Phone number is required' })}
                type="tel"
                placeholder="Phone number"
                autoComplete="tel"
                className={cn(
                  'w-full h-14 px-5',
                  'font-body text-sm text-white placeholder:text-white/25',
                  'bg-surface-2 border',
                  'focus:outline-none focus:border-gold',
                  'transition-colors duration-200',
                  errors.phone ? 'border-red-500/60' : 'border-white/15'
                )}
              />
              {errors.phone && (
                <p className="absolute -bottom-5 left-0 font-body text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-14 inline-flex items-center justify-center gap-2 font-body text-sm font-bold uppercase tracking-[0.2em] text-black bg-gold hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>Get Early Access <ArrowRight size={16} /></>
              )}
            </button>

            {serverError && (
              <p className="font-body text-xs text-red-400 mt-1">
                Something went wrong — please try again or email eze@lovenrnb.com.
              </p>
            )}

            <p className="font-body text-2xs text-white/20 mt-1">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )

  if (showCountdownOnly) return countdown
  if (showFormOnly) return form
  return (
    <div className="space-y-10">
      {countdown}
      {form}
    </div>
  )
}
