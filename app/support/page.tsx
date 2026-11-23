import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SupportContent } from '@/components/sections/SupportContent'

export const metadata: Metadata = {
  title: 'Partnerships — LoveNRnB',
  description: 'Partner with LoveNRnB — the R&B entertainment brand behind LoveNRnB Fest, LoveNRnB Live, and an official SXSW 2027 showcase.',
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
