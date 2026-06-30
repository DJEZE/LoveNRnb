'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

interface FormValues {
  email: string
}

// Rolling Loud style marquee ticker content
const TICKER_ITEMS = [
  'Early Access', 'VIP Drops', 'Artist Announcements', 'Presale Codes',
  'Exclusive Offers', 'Lineup Reveals', 'Early Access', 'VIP Drops',
  'Artist Announcements', 'Presale Codes', 'Exclusive Offers', 'Lineup Reveals',
]

export function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
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

  return (
    <section id="contact" className="bg-black">
      <div className="w-full h-px bg-white/10" />

      {/* Marquee ticker — Rolling Loud signature */}
      <div className="overflow-hidden bg-gold py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-5 font-body text-xs text-black font-semibold uppercase tracking-[0.2em]"
            >
              <span className="w-1 h-1 rounded-full bg-black/40" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 lg:py-28">
        <AnimatedSection className="max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">
            Inner Circle
          </p>

          {/* Heading — Rolling Loud massive condensed */}
          <h2
            className="font-display font-black uppercase text-white leading-none mb-6"
            style={{ fontSize: 'clamp(4.5rem, 12vw, 11rem)', letterSpacing: '-0.03em' }}
          >
            Be First.<br />
            <span className="text-gold">Always.</span>
          </h2>

          <div className="w-16 h-0.5 bg-gold mb-8" />

          <p className="font-body text-base text-white/50 mb-12 max-w-md leading-relaxed">
            Join the waitlist for early access to tickets, VIP experiences, lineup announcements, and special offers.
            <br /><br />
            No spam. Just the culture.
          </p>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <CheckCircle2 size={24} className="text-gold" />
                <div>
                  <p className="font-display font-black text-2xl uppercase text-white">You&apos;re in.</p>
                  <p className="font-body text-sm text-white/40 mt-0.5">Welcome to the inner circle.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row gap-0 max-w-lg"
                >
                  <div className="flex-1 relative">
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                      })}
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      className={cn(
                        'w-full h-12 lg:h-14 px-5',
                        'font-body text-sm text-white placeholder:text-white/25',
                        'bg-surface-2 border-y border-l',
                        'focus:outline-none focus:border-gold',
                        'transition-colors duration-200',
                        errors.email ? 'border-red-500/60' : 'border-white/15'
                      )}
                    />
                    {errors.email && (
                      <p className="absolute -bottom-5 left-0 font-body text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-12 lg:h-14 px-6 lg:px-8 inline-flex items-center justify-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
                  >
                    {loading ? (
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>Join the List <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>

                {serverError && (
                  <p className="font-body text-xs text-red-400 mt-4">
                    Something went wrong — please try again or email info@lovenrnb.com.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust line */}
          <p className="font-body text-2xs text-white/20 uppercase tracking-[0.2em] mt-8">
            No spam · Unsubscribe anytime
          </p>
        </AnimatedSection>
      </div>

      <div className="w-full h-px bg-white/10" />
    </section>
  )
}
