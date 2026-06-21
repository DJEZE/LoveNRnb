import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { EmailCapture } from '@/components/sections/EmailCapture'

export const metadata: Metadata = {
  title: 'Waitlist',
}

export default function ExperiencePage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        <EmailCapture />
      </main>
      <Footer />
    </>
  )
}
