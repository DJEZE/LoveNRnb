import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Lineup } from '@/components/sections/Lineup'
import { WhatToExpect } from '@/components/sections/WhatToExpect'
import { Tickets } from '@/components/sections/Tickets'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { Sponsors } from '@/components/sections/Sponsors'
import { Footer } from '@/components/Footer'
import { UPCOMING_EVENT, SPONSORS } from '@/lib/data'

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

      <WhatToExpect />

      <Tickets
        tiers={UPCOMING_EVENT.ticketTiers}
        eventName={UPCOMING_EVENT.name}
        eventDate="November 21, 2026"
        venue={UPCOMING_EVENT.venue}
      />

      <FinalCTA />

      <EmailCapture />

      <Sponsors sponsors={SPONSORS} />

      <Footer />
    </main>
  )
}
