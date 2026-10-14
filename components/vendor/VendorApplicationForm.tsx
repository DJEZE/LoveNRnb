'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CheckCircle2, Loader2, Upload, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const schema = z.object({
  businessName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  website: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  category: z.enum(['FOOD', 'RETAIL', 'MERCHANDISE', 'LIFESTYLE', 'BRAND_ACTIVATION', 'PREMIUM_ACTIVATION', 'OTHER']),
  description: z.string().min(50),
  spaceRequirements: z.string().optional(),
  electricityNeeded: z.boolean().default(false),
  equipmentNotes: z.string().optional(),
  activationDesc: z.string().optional(),
  permitInfo: z.string().optional(),
  additionalNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, 'You must agree to the terms'),
})

type FormData = z.infer<typeof schema>

const CATEGORIES = [
  { value: 'FOOD', label: 'Food Vendor', price: '$1,000+' },
  { value: 'RETAIL', label: 'Retail Vendor', price: '$500+' },
  { value: 'MERCHANDISE', label: 'Merchandise Vendor', price: '$500+' },
  { value: 'LIFESTYLE', label: 'Lifestyle Brand', price: '$500+' },
  { value: 'BRAND_ACTIVATION', label: 'Brand Activation', price: '$3,500+' },
  { value: 'PREMIUM_ACTIVATION', label: 'Premium Activation', price: '$5,000+' },
  { value: 'OTHER', label: 'Other', price: 'TBD' },
]

const fieldBase = 'w-full px-4 py-3 font-body text-sm text-white placeholder:text-white/25 bg-surface-2 border border-white/15 focus:outline-none focus:border-gold transition-colors duration-200'
const LABEL = 'block font-body text-2xs text-white/40 uppercase tracking-[0.2em] mb-2'
const ERROR = 'mt-1.5 font-body text-2xs text-red-400'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className={ERROR}>
      <AlertCircle size={10} className="inline mr-1" />
      {message}
    </p>
  )
}

export function VendorApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { electricityNeeded: false, agreeToTerms: false } })

  const category = watch('category')
  const selectedCategory = CATEGORIES.find((c) => c.value === category)
  const isFood = category === 'FOOD'

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/vendor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Submission failed')
      setSubmitted(true)
    } catch (err: any) {
      setServerError(err.message ?? 'Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <CheckCircle2 size={48} className="text-gold mx-auto mb-6" strokeWidth={1.5} />
        <h2 className="font-display font-black uppercase text-white text-3xl mb-4">Application Received</h2>
        <p className="font-body text-sm text-white/50 max-w-md mx-auto leading-relaxed">
          Thank you for applying. Our team will review your application and reach out within 3–5 business days. Check your email for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">

      {/* Business Info */}
      <section className="space-y-6">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em]">Business Information</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>Business Name *</label>
            <input {...register('businessName', { required: 'Required' })} className={fieldBase} placeholder="Your Business LLC" />
            <FieldError message={errors.businessName?.message} />
          </div>
          <div>
            <label className={LABEL}>Contact Name *</label>
            <input {...register('contactName', { required: 'Required' })} className={fieldBase} placeholder="First Last" />
            <FieldError message={errors.contactName?.message} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>Email Address *</label>
            <input type="email" {...register('email', { required: 'Required' })} className={fieldBase} placeholder="you@yourbusiness.com" />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <label className={LABEL}>Phone Number *</label>
            <input type="tel" {...register('phone', { required: 'Required' })} className={fieldBase} placeholder="(713) 000-0000" />
            <FieldError message={errors.phone?.message} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL}>Website</label>
            <input type="url" {...register('website')} className={fieldBase} placeholder="https://yourbusiness.com" />
            <FieldError message={errors.website?.message} />
          </div>
          <div>
            <label className={LABEL}>Instagram Handle</label>
            <input {...register('instagram')} className={fieldBase} placeholder="@yourbusiness" />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* Vendor Type */}
      <section className="space-y-6">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em]">Vendor Category *</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.value
            return (
              <label
                key={cat.value}
                className={cn(
                  'flex items-start gap-3 border p-4 cursor-pointer transition-colors duration-150',
                  isSelected ? 'border-gold bg-gold/5' : 'border-white/10 hover:border-white/25'
                )}
              >
                <input
                  type="radio"
                  value={cat.value}
                  {...register('category', { required: 'Please select a category' })}
                  className="mt-0.5 accent-red-600"
                />
                <div>
                  <p className="font-body text-sm text-white">{cat.label}</p>
                  <p className="font-body text-2xs text-gold mt-0.5">{cat.price}</p>
                </div>
              </label>
            )
          })}
        </div>
        <FieldError message={errors.category?.message} />

        {selectedCategory && (
          <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em]">
            Starting fee: {selectedCategory.price} — exact amount confirmed upon approval
          </p>
        )}
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* Activation Details */}
      <section className="space-y-6">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.3em]">Activation Details</p>

        <div>
          <label className={LABEL}>Describe your products / services *</label>
          <textarea
            {...register('description', { required: 'Required', minLength: { value: 50, message: 'Please provide at least 50 characters' } })}
            rows={4}
            className={fieldBase}
            placeholder="Tell us about what you'll be selling or offering at the festival..."
          />
          <FieldError message={errors.description?.message} />
        </div>

        <div>
          <label className={LABEL}>Space & Booth Requirements</label>
          <textarea {...register('spaceRequirements')} rows={2} className={fieldBase} placeholder="10x10 tent, table and chairs needed, etc." />
        </div>

        <div>
          <label className={LABEL}>Proposed Activation Description</label>
          <textarea {...register('activationDesc')} rows={2} className={fieldBase} placeholder="How will you engage festival attendees?" />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" {...register('electricityNeeded')} className="accent-red-600 w-4 h-4" />
          <span className="font-body text-sm text-white/60">I require access to electricity</span>
        </label>

        {watch('electricityNeeded') && (
          <div>
            <label className={LABEL}>Electricity / Equipment Notes</label>
            <textarea {...register('equipmentNotes')} rows={2} className={fieldBase} placeholder="Generator watts needed, number of outlets, equipment list..." />
          </div>
        )}

        {isFood && (
          <div>
            <label className={LABEL}>Food Service Permits & Certifications</label>
            <textarea {...register('permitInfo')} rows={2} className={fieldBase} placeholder="Food handler permit #, health department info, etc." />
          </div>
        )}

        <div>
          <label className={LABEL}>Additional Notes</label>
          <textarea {...register('additionalNotes')} rows={2} className={fieldBase} placeholder="Anything else you'd like us to know..." />
        </div>
      </section>

      <div className="w-full h-px bg-white/10" />

      {/* Agreement */}
      <section className="space-y-4">
        <div className="border border-white/10 bg-surface-2 p-5">
          <p className="font-body text-2xs text-white/40 uppercase tracking-[0.2em] mb-3">Vendor Agreement</p>
          <p className="font-body text-sm text-white/50 leading-relaxed">
            By submitting this application, you confirm that all provided information is accurate. Approval is not guaranteed. Once approved, you will receive an invoice for the applicable vendor fee. Payment must be received by the stated deadline to secure your space. LoveNRnB reserves the right to reject any application or cancel approved vendors for violations of our policies.
          </p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('agreeToTerms', { required: 'You must agree to continue' })}
            className="accent-red-600 w-4 h-4 mt-0.5"
          />
          <span className="font-body text-sm text-white/60">
            I have read and agree to the vendor terms and conditions above.
          </span>
        </label>
        <FieldError message={errors.agreeToTerms?.message} />
      </section>

      {serverError && (
        <div className="border border-red-500/30 bg-red-500/10 p-4">
          <p className="font-body text-sm text-red-400">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-gold text-white font-body text-sm uppercase tracking-[0.2em] font-semibold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>

      <p className="font-body text-2xs text-white/25 text-center uppercase tracking-[0.15em]">
        Applications reviewed within 3–5 business days
      </p>
    </form>
  )
}
