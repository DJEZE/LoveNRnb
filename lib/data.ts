import type { Event, PastEvent, Sponsor, NavLink } from './types'

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS: NavLink[] = [
  { label: 'Events', href: '/' },
  { label: 'Lineup', href: '/lineup' },
  { label: 'Tickets', href: '/tickets' },
  { label: 'Experience', href: '/experience' },
  { label: 'FAQ', href: '/faq' },
]

// ---------------------------------------------------------------------------
// Upcoming Event
// Replace image URLs with your own once you have assets.
// For real deployment: pull this from Sanity CMS.
// ---------------------------------------------------------------------------
export const UPCOMING_EVENT: Event = {
  id: 'evt-001',
  slug: 'lovenrnb-houston-2026',
  name: 'LoveNRnb Houston',
  tagline: 'An Evening of Soul & Desire',
  date: '2026-08-15T21:00:00-05:00',
  doorsOpen: '5:00 PM',
  showTime: '10:00 PM',
  venue: '9PM Music Hall',
  address: 'Houston, TX',
  city: 'Houston',
  state: 'TX',
  // Swap with your hero image — high-res, portrait works best
  heroImage: '/images/hero-placeholder.jpg',
  description:
    'One night. Curated sounds. The R&B experience Houston has been waiting for. LoveNRnb returns with its most intimate show yet — live performances, exclusive VIP access, and an atmosphere built for the culture.',
  ageRestriction: '',
  isUpcoming: true,
  isSoldOut: false,
  lineup: [
    // Artists (3–4)
    {
      id: 'artist-001',
      name: 'TBA',
      role: 'headliner',
      image: '',
      genre: 'R&B',
      tba: true,
    },
    {
      id: 'artist-002',
      name: 'TBA',
      role: 'featured',
      image: '',
      genre: 'R&B',
      tba: true,
    },
    {
      id: 'artist-004',
      name: 'Aaron Page',
      role: 'supporting',
      image: '/images/artists/aaron page.jpeg',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/whoisaaronpage/',
      tba: false,
    },
    // DJs (3–4)
    {
      id: 'dj-001',
      name: 'DJEZE',
      role: 'dj',
      image: '/images/artists/djeze.jpg',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/djeze__',
      tba: false,
    },
    {
      id: 'dj-002',
      name: 'ALIST',
      role: 'dj',
      image: '/images/artists/alist.JPG',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/alistsounds/',
      tba: false,
    },
    {
      id: 'dj-003',
      name: 'DJ A.Y.',
      role: 'dj',
      image: '/images/artists/djA.y.jpg',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/dja.y_/',
      tba: false,
    },
    {
      id: 'dj-004',
      name: 'TBA',
      role: 'dj',
      image: '',
      genre: 'DJ Set',
      tba: true,
    },
    // MC
    {
      id: 'mc-001',
      name: 'MCWAZZ',
      role: 'mc',
      image: '/images/artists/mcwazz.jpeg',
      genre: 'MC',
      instagram: 'https://www.instagram.com/wazodunbaku/',
      tba: false,
    },
  ],
  ticketTiers: [
    {
      id: 'tier-ga',
      name: 'General Admission',
      price: 40,
      perks: [
        'General floor access',
        'Live performances',
        'Vendor Village access',
      ],
      available: 400,
      total: 500,
      isHighlighted: false,
      ctaLabel: 'Get GA Tickets',
      ticketUrl: 'https://www.gatekeepers.app/events/lovenrnb-concert-vol-1',
    },
    {
      id: 'tier-ga-plus',
      name: 'GA+',
      price: 55,
      perks: [
        'General floor access',
        'Live performances',
        'Priority entry',
        'Exclusive GA+ wristband',
      ],
      available: 200,
      total: 250,
      isHighlighted: true,
      ctaLabel: 'Get GA+ Tickets',
      ticketUrl: 'https://www.gatekeepers.app/events/lovenrnb-concert-vol-1',
    },
    {
      id: 'tier-vip',
      name: 'VIP Access',
      price: 120,
      perks: [
        'Priority entry — skip the line',
        'Dedicated VIP section',
        'Access to Friday VIP Kickoff Event',
        'Exclusive VIP merch',
      ],
      available: 75,
      total: 100,
      isHighlighted: false,
      ctaLabel: 'Secure VIP',
      ticketUrl: 'https://www.gatekeepers.app/events/lovenrnb-concert-vol-1',
    },
  ],
}

// ---------------------------------------------------------------------------
// Past Events
// ---------------------------------------------------------------------------
export const PAST_EVENTS: PastEvent[] = [
  {
    id: 'past-001',
    name: "Valentine's Affair",
    date: '2025-02-14',
    venue: 'The Ballroom at Bayou Place',
    city: 'Houston',
    attendees: 420,
    coverImage: '/images/past/valentines-cover.jpg',
    images: [
      '/images/past/valentines-1.jpg',
      '/images/past/valentines-2.jpg',
      '/images/past/valentines-3.jpg',
      '/images/past/valentines-4.jpg',
    ],
    recapVideoUrl: '',
  },
  {
    id: 'past-002',
    name: 'Autumn Serenade',
    date: '2024-10-19',
    venue: 'Revention Music Center',
    city: 'Houston',
    attendees: 380,
    coverImage: '/images/past/autumn-cover.jpg',
    images: [
      '/images/past/autumn-1.jpg',
      '/images/past/autumn-2.jpg',
      '/images/past/autumn-3.jpg',
    ],
  },
  {
    id: 'past-003',
    name: 'Summer Solstice',
    date: '2024-06-21',
    venue: 'House of Blues Houston',
    city: 'Houston',
    attendees: 350,
    coverImage: '/images/past/summer-cover.jpg',
    images: [
      '/images/past/summer-1.jpg',
      '/images/past/summer-2.jpg',
    ],
  },
]

// ---------------------------------------------------------------------------
// Sponsors
// ---------------------------------------------------------------------------
export const SPONSORS: Sponsor[] = [
  {
    id: 'spon-001',
    name: 'Red Bull',
    logo: '/images/sponsors/redbull_transparent.png',
    tier: 'presenting',
  },
  {
    id: 'spon-002',
    name: '5ifity Boys',
    logo: '/images/sponsors/5ifity-BOYS.png',
    tier: 'presenting',
    url: 'https://www.instagram.com/fiftyhospitality/',
  },
]
