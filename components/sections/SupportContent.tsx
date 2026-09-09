'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import { AnimatedSection, StaggerContainer, staggerChild } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

// ── Style tokens (match existing site patterns) ──────────────────────────────
const fieldBase =
  'w-full px-5 font-body text-sm text-white placeholder:text-white/25 bg-surface-2 border border-white/15 focus:outline-none focus:border-gold transition-colors duration-200'
const INPUT = cn(fieldBase, 'h-12 lg:h-14')
const SELECT = cn(fieldBase, 'h-12 lg:h-14 appearance-none cursor-pointer')
const TEXTAREA = cn(fieldBase, 'py-4 resize-none')
const LABEL = 'block font-body text-2xs text-white/40 uppercase tracking-[0.2em] mb-2'

// ── Sponsor Form ─────────────────────────────────────────────────────────────
interface SponsorFields {
  name: string
  company: string
  email: string
  phone: string
  website: string
  budget: string
  interests: string
  message: string
}

function SponsorForm() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SponsorFields>({ defaultValues: { budget: '' } })

  const onSubmit = async (data: SponsorFields) => {
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'sponsor', ...data }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
      reset()
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-6 border border-white/10 bg-surface-2 max-w-2xl"
      >
        <CheckCircle2 size={20} className="text-gold flex-shrink-0" />
        <div>
          <p className="font-display font-black text-xl uppercase text-white">Inquiry received.</p>
          <p className="font-body text-sm text-white/40 mt-0.5">
            We will review and get back to you.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Name *</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Your name"
            autoComplete="name"
            className={cn(INPUT, errors.name && '!border-red-500/60')}
          />
        </div>
        <div>
          <label className={LABEL}>Company *</label>
          <input
            {...register('company', { required: true })}
            type="text"
            placeholder="Company or brand name"
            className={cn(INPUT, errors.company && '!border-red-500/60')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Email *</label>
          <input
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className={cn(INPUT, errors.email && '!border-red-500/60')}
          />
        </div>
        <div>
          <label className={LABEL}>Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            className={INPUT}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Website</label>
          <input
            {...register('website')}
            type="text"
            placeholder="yourwebsite.com"
            className={INPUT}
          />
        </div>
        <div>
          <label className={LABEL}>Estimated Partnership Budget *</label>
          <select
            {...register('budget', { required: true, validate: (v) => v !== '' })}
            className={cn(SELECT, errors.budget && '!border-red-500/60')}
          >
            <option value="" disabled>
              Select a range
            </option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-5k">$1,000 – $5,000</option>
            <option value="5k-15k">$5,000 – $15,000</option>
            <option value="15k-50k">$15,000 – $50,000</option>
            <option value="50k-plus">$50,000+</option>
            <option value="open">Open to discussing</option>
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL}>What are you interested in? *</label>
        <textarea
          {...register('interests', { required: true })}
          rows={3}
          placeholder="Brand activation, stage, hospitality, social media, product sampling, etc."
          className={cn(TEXTAREA, errors.interests && '!border-red-500/60')}
        />
      </div>

      <div>
        <label className={LABEL}>Message</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Anything else you want us to know"
          className={TEXTAREA}
        />
      </div>

      {serverError && (
        <p className="font-body text-xs text-red-400">
          Something went wrong — email us at{' '}
          <a href="mailto:partnerships@lovenrnb.com" className="underline">
            partnerships@lovenrnb.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Submit Inquiry <ArrowRight size={13} />
          </>
        )}
      </button>
    </form>
  )
}

// ── Investor Form ─────────────────────────────────────────────────────────────
interface InvestorFields {
  name: string
  email: string
  phone: string
  company: string
  investorType: string
  range: string
  experience: string
  message: string
}

function InvestorForm() {
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InvestorFields>({
    defaultValues: { investorType: '', range: '' },
  })

  const onSubmit = async (data: InvestorFields) => {
    setLoading(true)
    setServerError(false)
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'investor', ...data }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
      reset()
    } catch {
      setServerError(true)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-6 border border-white/10 bg-surface-2 max-w-2xl"
      >
        <CheckCircle2 size={20} className="text-gold flex-shrink-0" />
        <div>
          <p className="font-display font-black text-xl uppercase text-white">Inquiry received.</p>
          <p className="font-body text-sm text-white/40 mt-0.5">
            We will be in touch privately.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Name *</label>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Your name"
            autoComplete="name"
            className={cn(INPUT, errors.name && '!border-red-500/60')}
          />
        </div>
        <div>
          <label className={LABEL}>Email *</label>
          <input
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className={cn(INPUT, errors.email && '!border-red-500/60')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            className={INPUT}
          />
        </div>
        <div>
          <label className={LABEL}>Company or Organization</label>
          <input
            {...register('company')}
            type="text"
            placeholder="Your company"
            className={INPUT}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Investor Type *</label>
          <select
            {...register('investorType', { required: true, validate: (v) => v !== '' })}
            className={cn(SELECT, errors.investorType && '!border-red-500/60')}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="individual">Individual</option>
            <option value="family-office">Family Office</option>
            <option value="vc-pe">VC / PE Firm</option>
            <option value="corporate">Corporate</option>
            <option value="angel">Angel Investor</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={LABEL}>Estimated Investment Range *</label>
          <select
            {...register('range', { required: true, validate: (v) => v !== '' })}
            className={cn(SELECT, errors.range && '!border-red-500/60')}
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="under-50k">Under $50,000</option>
            <option value="50k-250k">$50,000 – $250,000</option>
            <option value="250k-1m">$250,000 – $1,000,000</option>
            <option value="1m-plus">$1,000,000+</option>
            <option value="open">Open to discussing</option>
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL}>Relevant Experience or Strategic Value *</label>
        <textarea
          {...register('experience', { required: true })}
          rows={4}
          placeholder="What do you bring beyond capital? Industry experience, relationships, resources, strategy?"
          className={cn(TEXTAREA, errors.experience && '!border-red-500/60')}
        />
      </div>

      <div>
        <label className={LABEL}>Message</label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Anything else you want to share"
          className={TEXTAREA}
        />
      </div>

      {serverError && (
        <p className="font-body text-xs text-red-400">
          Something went wrong — email us at{' '}
          <a href="mailto:partnerships@lovenrnb.com" className="underline">
            partnerships@lovenrnb.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Submit Inquiry <ArrowRight size={13} />
          </>
        )}
      </button>
    </form>
  )
}

// ── Activation types list ─────────────────────────────────────────────────────
const ACTIVATIONS = [
  'Brand activations',
  'VIP experiences',
  'Stage partnerships',
  'Hospitality',
  'Food and beverage',
  'Beauty and lifestyle',
  'Transportation',
  'Content',
  'Social media',
  'Product sampling',
  'Festival installations',
  'Community activations',
  'Vendor experiences',
  'Custom partnerships',
]

// ── Statement phrase component ────────────────────────────────────────────────
function ImpactStatement({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="flex items-center gap-5 py-5 border-b border-white/10 last:border-b-0">
        <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
        <p
          className="font-display font-black uppercase text-white leading-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
        >
          {text}
        </p>
      </div>
    </AnimatedSection>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function SupportContent() {
  const [showSponsorForm, setShowSponsorForm] = useState(false)
  const [showInvestorForm, setShowInvestorForm] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>

      {/* ────────────────── HERO ────────────────── */}
      <section className="container mx-auto px-6 pb-14 lg:pb-20">
        <AnimatedSection>
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">
            An Independent R&amp;B Festival · Houston, TX
          </p>
          <h1
            className="font-display font-black uppercase text-white leading-none mb-8"
            style={{ fontSize: 'clamp(4rem, 11vw, 11rem)', letterSpacing: '-0.03em' }}
          >
            Built<br />
            Independently.<br />
            <span className="text-gold">Powered By</span><br />
            Community.
          </h1>
        </AnimatedSection>

        <div className="w-full h-px bg-white/10 mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
              <p>
                LoveNRnB Fest is an independently owned R&amp;B festival being built right here
                in Houston.
              </p>
              <p>
                We are building this from the ground up without a major festival company or
                national promoter behind us.
              </p>
              <p>
                That means every person who supports, sponsors, partners with, or invests in
                LoveNRnB is helping us build something that is truly ours.
              </p>
              <p>
                Our goal is simple. Create one of the best R&amp;B festival experiences in the
                country while keeping the brand rooted in Houston, the culture, and the community
                that helped us grow.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-3 lg:pt-2">
              <a
                href="https://donate.stripe.com/bJeaEX3dxdYj7g46ac9sk00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                Support the Festival
              </a>
              <button
                onClick={() => scrollTo('sponsor')}
                className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
              >
                Become a Sponsor
              </button>
              <button
                onClick={() => scrollTo('invest')}
                className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                Investor Inquiries
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── COMMUNITY SUPPORT ────────────────── */}
      <section id="support" className="bg-black">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              Community Support
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Support<br />LoveNRnB
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  LoveNRnB has grown because people continue to believe in the vision.
                </p>
                <p>
                  Now we are taking the next step and building a full scale independent festival.
                </p>
                <p>
                  Community support starts at $50. Every contribution helps us keep pushing the
                  festival forward.
                </p>
                <p>
                  That support can go toward things like artist bookings, production, marketing,
                  infrastructure, guest experience, staffing, and everything else it takes to put on
                  a festival at this level.
                </p>
                <p>
                  We are not asking people to just watch us build it. We are giving our community a
                  chance to be part of building it with us.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="border border-white/10 p-8 bg-surface-2">
                <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                  Community Support
                </p>
                <p
                  className="font-display font-black uppercase text-white leading-none mb-1"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.02em' }}
                >
                  $50
                </p>
                <p className="font-body text-sm text-white/30 mb-8">Minimum contribution</p>

                <a
                  href="https://donate.stripe.com/bJeaEX3dxdYj7g46ac9sk00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
                >
                  Support LoveNRnB
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── WHY SUPPORT ────────────────── */}
      <section className="bg-surface">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              The Case For Independence
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.03em' }}
            >
              Why Support An<br />Independent Festival?
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>Because independent festivals are built differently.</p>
                <p>
                  We do not have a huge corporation writing a check behind the scenes. Every move
                  matters. Every partnership matters. Every supporter matters.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  LoveNRnB is being built by people who genuinely care about R&amp;B, live music,
                  Houston, and creating something that can last for years.
                </p>
                <p>
                  The goal is bigger than one event. We want LoveNRnB to become something Houston
                  is proud to call its own.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Impact statements */}
          <div className="max-w-3xl border-t border-white/10">
            <ImpactStatement text="Every move matters." delay={0.1} />
            <ImpactStatement text="Every partnership matters." delay={0.2} />
            <ImpactStatement text="Every supporter matters." delay={0.3} />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── SPONSORSHIP ────────────────── */}
      <section id="sponsor" className="bg-black">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              Brand Partnerships
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Sponsor<br />LoveNRnB
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  We are looking for brands and businesses that want to be part of the experience —
                  not just put a logo on a flyer.
                </p>
                <p>
                  LoveNRnB gives brands the opportunity to connect with an audience that cares
                  about music, R&amp;B, fashion, beauty, food, nightlife, hospitality, culture, and
                  entertainment.
                </p>
                <p>There are opportunities across the entire festival.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">
                Opportunities include
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {ACTIVATIONS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                    <span className="font-body text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} className="mb-10">
            <p className="font-body text-base text-white/55 leading-relaxed max-w-2xl">
              Every brand is different, so we are open to building partnerships that actually make
              sense for both sides.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="flex flex-wrap gap-3 mb-10">
            <a
              href="mailto:partnerships@lovenrnb.com"
              className="inline-flex items-center justify-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
            >
              Become a Sponsor
            </a>
            <button
              onClick={() => {
                setShowSponsorForm(!showSponsorForm)
                if (!showSponsorForm) {
                  setTimeout(() => document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
                }
              }}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
            >
              Request Sponsorship Information
              <ChevronDown size={13} className={cn('transition-transform duration-200', showSponsorForm && 'rotate-180')} />
            </button>
          </AnimatedSection>

          <AnimatePresence>
            {showSponsorForm && (
              <motion.div
                id="sponsor-form"
                key="sponsor-form"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="border-t border-white/10 pt-10">
                  <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
                    Sponsorship Inquiry
                  </p>
                  <SponsorForm />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── INVESTORS ────────────────── */}
      <section id="invest" className="bg-surface">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              Investment
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Invest In<br />LoveNRnB
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>We are building LoveNRnB to be bigger than one festival.</p>
                <p>
                  The long term vision is to grow this into a real entertainment platform around
                  R&amp;B, live events, culture, hospitality, media, and experiences.
                </p>
                <p>
                  We are open to conversations with investors and strategic partners who understand
                  what we are building and see the long term opportunity.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  We are especially interested in people who can bring more than just money to the
                  table.
                </p>
                <p>
                  Experience, relationships, resources, strategy, and connections all matter.
                </p>
                <p>Investment conversations are handled privately.</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2} className="mb-10">
            <button
              onClick={() => {
                setShowInvestorForm(!showInvestorForm)
                if (!showInvestorForm) {
                  setTimeout(() => document.getElementById('investor-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
                }
              }}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
            >
              Investor Inquiries
              <ChevronDown size={13} className={cn('transition-transform duration-200', showInvestorForm && 'rotate-180')} />
            </button>
          </AnimatedSection>

          <AnimatePresence>
            {showInvestorForm && (
              <motion.div
                id="investor-form"
                key="investor-form"
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="border-t border-white/10 pt-10">
                  <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
                    Investor Inquiry
                  </p>
                  <InvestorForm />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── BUILT IN HOUSTON ────────────────── */}
      <section className="bg-black relative overflow-hidden">
        {/* Background treatment */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, #CC0000 0px, #CC0000 1px, transparent 1px, transparent 60px)`,
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-14 lg:py-20 relative">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              The Foundation
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Built In<br />
              <span className="text-gold">Houston</span>
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  Houston has one of the strongest music and cultural communities in the country.
                </p>
                <p>LoveNRnB is being built here for a reason.</p>
                <p>
                  We want to create something that feels like Houston, brings people into the city,
                  creates opportunities for local businesses and creatives, and gives R&amp;B fans
                  an experience they can look forward to every year.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>The goal is to grow nationally.</p>
                <p>But Houston will always be the foundation.</p>
                <div className="pt-4 border-t border-white/10">
                  <p
                    className="font-display font-black uppercase text-gold leading-none"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
                  >
                    Houston.<br />Always.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── MORE THAN A FESTIVAL ────────────────── */}
      <section className="bg-surface">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-10">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              The Vision
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', letterSpacing: '-0.03em' }}
            >
              More Than<br />A Festival
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12">
            <AnimatedSection delay={0.1}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>
                  LoveNRnB started with events built around one thing. People genuinely loving
                  R&amp;B.
                </p>
                <p>Now we are taking that energy and building something bigger.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="space-y-4 font-body text-base text-white/55 leading-relaxed">
                <p>We are still early.</p>
                <p>But that is also what makes this the best time to be part of it.</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Emphasized platform phrases */}
          <StaggerContainer className="max-w-2xl">
            {['A festival.', 'A community.', 'A platform.'].map((phrase) => (
              <motion.div
                key={phrase}
                variants={staggerChild}
                className="flex items-baseline gap-4 py-4 border-b border-white/10 last:border-b-0"
              >
                <span className="font-body text-2xs text-gold uppercase tracking-[0.3em] w-16 flex-shrink-0 pt-1">
                  {phrase === 'A festival.' ? '01' : phrase === 'A community.' ? '02' : '03'}
                </span>
                <p
                  className="font-display font-black uppercase text-white leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-0.02em' }}
                >
                  {phrase}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* ────────────────── FINAL CTA ────────────────── */}
      <section className="bg-black">
        <div className="container mx-auto px-6 py-14 lg:py-20">
          <AnimatedSection className="mb-12">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">
              Get Involved
            </p>
            <h2
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.03em' }}
            >
              Be Part Of What<br />We Are Building
            </h2>
          </AnimatedSection>

          <div className="w-full h-px bg-white/10 mb-12" />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {/* Support */}
            <motion.div
              variants={staggerChild}
              className="bg-black p-8 lg:p-10 flex flex-col"
            >
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                Community
              </p>
              <h3
                className="font-display font-black uppercase text-white leading-none mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
              >
                Support
              </h3>
              <p className="font-body text-sm text-white/50 leading-relaxed mb-8 flex-1">
                Help us continue building LoveNRnB from the ground up. Community support begins
                at $50.
              </p>
              <a
                href="https://donate.stripe.com/bJeaEX3dxdYj7g46ac9sk00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-6 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                Support the Festival
              </a>
            </motion.div>

            {/* Sponsor */}
            <motion.div
              variants={staggerChild}
              className="bg-black p-8 lg:p-10 flex flex-col border-t md:border-t-0 border-white/10"
            >
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                Brands
              </p>
              <h3
                className="font-display font-black uppercase text-white leading-none mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
              >
                Sponsor
              </h3>
              <p className="font-body text-sm text-white/50 leading-relaxed mb-8 flex-1">
                Put your brand in front of the LoveNRnB community and become part of the
                festival experience.
              </p>
              <a
                href="mailto:partnerships@lovenrnb.com"
                className="inline-flex items-center justify-center h-11 px-6 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold border border-gold/40 hover:bg-gold/10 transition-colors duration-200"
              >
                Become a Sponsor
              </a>
            </motion.div>

            {/* Invest */}
            <motion.div
              variants={staggerChild}
              className="bg-black p-8 lg:p-10 flex flex-col border-t md:border-t-0 border-white/10"
            >
              <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
                Long Term
              </p>
              <h3
                className="font-display font-black uppercase text-white leading-none mb-5"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
              >
                Invest
              </h3>
              <p className="font-body text-sm text-white/50 leading-relaxed mb-8 flex-1">
                Talk with us about the long term vision and growth of LoveNRnB.
              </p>
              <button
                onClick={() => {
                  scrollTo('invest')
                  setShowInvestorForm(true)
                }}
                className="inline-flex items-center justify-center h-11 px-6 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white/60 border border-white/15 hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                Investor Inquiries
              </button>
            </motion.div>
          </StaggerContainer>

          {/* Final brand statement */}
          <AnimatedSection delay={0.3} className="mt-16 lg:mt-20 border-t border-white/10 pt-12">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-6">
              This Is LoveNRnB
            </p>
            <div className="max-w-2xl space-y-2">
              {[
                'We are independent.',
                'We are building this in Houston.',
                'We are doing it our way.',
                'And we are just getting started.',
              ].map((line, i) => (
                <p
                  key={i}
                  className="font-display font-black uppercase text-white/80 leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', letterSpacing: '-0.02em' }}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="font-body text-sm text-gold/70 uppercase tracking-[0.25em] mt-8">
              Built Independently. Powered by Community.
            </p>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}
