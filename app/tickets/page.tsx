import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tickets',
}

export default function TicketsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        <div className="container mx-auto px-6 py-10 lg:py-16">
          <div className="mb-8">
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-3">Secure Your Spot</p>
            <h1
              className="font-display font-black uppercase text-white leading-none"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.03em' }}
            >
              Tickets
            </h1>
            <p className="font-body text-sm text-white/30 mt-3">LoveNRnb Houston · November 21, 2026 · Houston, TX</p>
          </div>
          <div className="w-full h-px bg-white/10 mb-10" />
          <iframe
            src="https://posh.vip/embed/checkout/lovenrnb-festival"
            height="700px"
            width="100%"
            style={{ border: 'none' }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
