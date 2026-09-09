import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SupportContent } from '@/components/sections/SupportContent'

export const metadata: Metadata = {
  title: 'Support & Partner',
  description:
    'Support, sponsor, or invest in LoveNRnB Fest — an independently owned R&B festival built in Houston, Texas.',
}

export default function SupportPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20 lg:pt-36">
        <SupportContent />
      </main>
      <Footer />
    </>
  )
}
