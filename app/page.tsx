import { Navigation } from '@/components/Navigation'
import { BrandHero } from '@/components/sections/BrandHero'
import { Experiences } from '@/components/sections/Experiences'
import { ArtistFeature } from '@/components/sections/ArtistFeature'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { Sponsors } from '@/components/sections/Sponsors'
import { Footer } from '@/components/Footer'
import { SPONSORS } from '@/lib/data'

export default function HomePage() {
  return (
    <main className="relative bg-black">
      <Navigation />
      <BrandHero />
      <Experiences />
      <ArtistFeature />
      <EmailCapture />
      <Sponsors sponsors={SPONSORS.filter((s) => s.id === 'spon-002' || s.id === 'spon-003')} />
      <Footer />
    </main>
  )
}
