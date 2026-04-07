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

export function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      // TODO: Replace with your Klaviyo / Mailchimp API endpoint
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email: data.email }),
      //   headers: { 'Content-Type': 'application/json' },
      // })

      // Simulate API call for now
      await new Promise((r) => setTimeout(r, 900))
      setSubmitted(true)
      reset()
    } catch {
      // Handle error silently — in production, surface this to the user
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-surface py-24 lg:py-36"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left blur */}
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(201, 168, 76, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Right blur */}
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(120, 40, 80, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Marquee ticker */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-3 border-b border-gold-border/30 bg-gold-faint">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 font-body text-2xs text-gold uppercase tracking-[0.3em]"
            >
              <span className="w-1 h-1 rounded-full bg-gold" />
              Early Access
              <span className="w-1 h-1 rounded-full bg-gold" />
              VIP Drops
              <span className="w-1 h-1 rounded-full bg-gold" />
              Exclusive Offers
              <span className="w-1 h-1 rounded-full bg-gold" />
              Presale Access
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
            Join the Inner Circle
          </p>

          {/* Heading */}
          <h2 className="font-display text-display-md text-cream mb-6">
            Be First.
            <br />
            <span
              className="bg-gold-shimmer bg-clip-text text-transparent animate-shimmer"
              style={{ backgroundSize: '400% 100%' }}
            >
              Always.
            </span>
          </h2>

          <p className="font-body text-base text-cream-muted mb-12 max-w-md mx-auto leading-relaxed">
            Get presale access, VIP drops, and insider updates before anyone else.
            No spam. Just culture.
          </p>

          {/* Form */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1 relative">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={cn(
                      'w-full h-12 sm:h-14 px-5',
                      'font-body text-sm text-cream placeholder:text-dim',
                      'bg-surface-3 border rounded-sm',
                      'focus:outline-none focus:ring-1 focus:ring-gold',
                      'transition-all duration-200',
                      errors.email
                        ? 'border-red-500/60 focus:ring-red-500/40'
                        : 'border-gold-border/40 focus:border-gold-border'
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
                  className={cn(
                    'h-12 sm:h-14 px-7',
                    'inline-flex items-center justify-center gap-2',
                    'font-body text-xs uppercase tracking-widest text-background',
                    'bg-gold-gradient rounded-sm',
                    'hover:brightness-110 hover:shadow-gold-md',
                    'active:brightness-95',
                    'transition-all duration-300',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                    'flex-shrink-0 whitespace-nowrap'
                  )}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin"
                      />
                      Joining...
                    </span>
                  ) : (
                    <>
                      Join the List
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-gold-faint border border-gold-border flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-gold" />
                </div>
                <div>
                  <p className="font-display text-xl text-cream">You&apos;re in.</p>
                  <p className="font-body text-sm text-cream-muted mt-1">
                    Welcome to the inner circle. Check your inbox.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {['No spam, ever', 'Unsubscribe anytime', '21+ community'].map((text) => (
              <span
                key={text}
                className="font-body text-2xs text-dim uppercase tracking-widest hidden sm:block"
              >
                {text}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
