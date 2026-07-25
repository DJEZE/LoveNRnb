export type ArtistRole = 'headliner' | 'featured' | 'supporting' | 'opener' | 'dj' | 'mc'

export interface Artist {
  id: string
  name: string
  role: ArtistRole
  image: string
  genre: string
  instagram?: string
  spotify?: string
  tba?: boolean
}

export type TicketTierName = 'General Admission' | 'GA+' | 'VIP Access'

export interface TicketTier {
  id: string
  name: TicketTierName
  price: number
  priceLabel?: string
  perks: string[]
  available: number
  total: number
  soldOut?: boolean
  isHighlighted?: boolean
  ctaLabel: string
  stripePriceId?: string
}

export type SponsorTier = 'presenting' | 'partner' | 'community'

export interface Sponsor {
  id: string
  name: string
  logo: string
  tier: SponsorTier
  url?: string
  logoSize?: string // optional Tailwind classes to override default logo container size
}

export interface PastEvent {
  id: string
  name: string
  date: string
  venue: string
  city: string
  attendees?: number
  images: string[]
  recapVideoUrl?: string
  coverImage: string
}

export interface Event {
  id: string
  slug: string
  name: string
  tagline: string
  date: string // ISO string
  doorsOpen: string // e.g. "9:00 PM"
  showTime: string  // e.g. "10:00 PM"
  venue: string
  address: string
  city: string
  state: string
  heroImage: string
  heroVideo?: string
  description: string
  lineup: Artist[]
  ticketTiers: TicketTier[]
  isUpcoming: boolean
  isSoldOut?: boolean
  ageRestriction: string
}

export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}
