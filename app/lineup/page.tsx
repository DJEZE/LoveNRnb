import type { Metadata } from 'next'
import { Lineup } from '@/components/sections/Lineup'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { UPCOMING_EVENT } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Lineup',
}

export default function LineupPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        <Lineup artists={UPCOMING_EVENT.lineup} eventName={UPCOMING_EVENT.name} showAll />
      </main>
      <Footer />
    </>
  )
}
