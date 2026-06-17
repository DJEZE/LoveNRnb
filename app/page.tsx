import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Lineup } from '@/components/sections/Lineup'
import { Tickets } from '@/components/sections/Tickets'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { Sponsors } from '@/components/sections/Sponsors'
import { Footer } from '@/components/Footer'
import { UPCOMING_EVENT, SPONSORS } from '@/lib/data'
import { formatEventDate } from '@/lib/utils'

export default function HomePage() {
  return (
    <main className="relative bg-black">
      <Navigation />

      <Hero event={UPCOMING_EVENT} />

      <About />

      <Lineup
        artists={UPCOMING_EVENT.lineup}
        eventName={UPCOMING_EVENT.name}
      />

      <Tickets
        tiers={UPCOMING_EVENT.ticketTiers}
        eventName={UPCOMING_EVENT.name}
        eventDate="November 14, 2026"
        venue={`${UPCOMING_EVENT.venue}, ${UPCOMING_EVENT.city}`}
      />

      <EmailCapture />

      <Sponsors sponsors={SPONSORS} />

      <Footer />
    </main>
  )
}
