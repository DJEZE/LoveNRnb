import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { VendorApplicationForm } from '@/components/vendor/VendorApplicationForm'

export const metadata: Metadata = {
  title: 'Vendor Application',
  description: 'Apply to be a vendor at LoveNRnB Fest 2026 — Houston, TX',
}

export default function VendorApplyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20 lg:pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">

          {/* Header */}
          <div className="mb-14">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">
              LoveNRnB Fest · Nov 21, 2026 · Houston, TX
            </p>
            <h1
              className="font-display font-black uppercase text-white leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
            >
              Vendor Application
            </h1>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-xl">
              Join Houston&apos;s premier R&B festival as a vendor. Applications are reviewed on a rolling basis. Approved vendors will receive an invoice for the applicable fee.
            </p>
          </div>

          {/* Pricing grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14">
            {[
              { label: 'Food Vendors', price: '$1,000+' },
              { label: 'Retail Vendors', price: '$500+' },
              { label: 'Brand Activations', price: '$3,500+' },
            ].map((tier) => (
              <div key={tier.label} className="border border-white/10 p-5">
                <p className="font-body text-2xs text-white/40 uppercase tracking-[0.2em] mb-2">{tier.label}</p>
                <p className="font-display font-black text-gold text-2xl">{tier.price}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/10 mb-14" />

          <VendorApplicationForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
