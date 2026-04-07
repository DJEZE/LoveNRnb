import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Lineup } from '@/components/sections/Lineup'
import { Tickets } from '@/components/sections/Tickets'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { Footer } from '@/components/Footer'
import { UPCOMING_EVENT } from '@/lib/data'
import { formatEventDate } from '@/lib/utils'

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />

      <Hero event={UPCOMING_EVENT} />

      <Lineup
        artists={UPCOMING_EVENT.lineup}
        eventName={UPCOMING_EVENT.name}
      />

      <Tickets
        tiers={UPCOMING_EVENT.ticketTiers}
        eventName={UPCOMING_EVENT.name}
        eventDate={formatEventDate(UPCOMING_EVENT.date)}
        venue={`${UPCOMING_EVENT.venue}, ${UPCOMING_EVENT.city}`}
      />

      <EmailCapture />

      <Footer />
    </main>
  )
}
