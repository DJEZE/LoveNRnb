import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Tickets } from '@/components/sections/Tickets'
import { UPCOMING_EVENT } from '@/lib/data'
import { formatEventDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tickets',
}

export default function TicketsPage() {
  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen pt-20">
        <Tickets
          tiers={UPCOMING_EVENT.ticketTiers}
          eventName={UPCOMING_EVENT.name}
          eventDate={formatEventDate(UPCOMING_EVENT.date)}
          venue={UPCOMING_EVENT.venue}
        />
      </main>
      <Footer />
    </>
  )
}
