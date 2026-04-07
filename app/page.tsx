import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { Lineup } from '@/components/sections/Lineup'
import { Tickets } from '@/components/sections/Tickets'
import { PastEvents } from '@/components/sections/PastEvents'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { Sponsors } from '@/components/sections/Sponsors'
import { Footer } from '@/components/Footer'
import { UPCOMING_EVENT, PAST_EVENTS, SPONSORS } from '@/lib/data'
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

      <PastEvents events={PAST_EVENTS} />

      <EmailCapture />

      <Sponsors sponsors={SPONSORS} />

      <Footer />
    </main>
  )
}
