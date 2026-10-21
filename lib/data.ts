import type { Event, PastEvent, Sponsor, NavLink } from './types'

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS: NavLink[] = [
  { label: 'Lineup', href: '/lineup' },
  { label: 'Tickets', href: '/tickets' },
  { label: 'Waitlist', href: '/experience' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Support & Partner', href: '/support' },
]

// ---------------------------------------------------------------------------
// Upcoming Event
// Replace image URLs with your own once you have assets.
// For real deployment: pull this from Sanity CMS.
// ---------------------------------------------------------------------------
export const UPCOMING_EVENT: Event = {
  id: 'evt-001',
  slug: 'lovenrnb-fest-2026',
  name: 'LoveNRnB Fest 2026',
  tagline: 'One Night. One Love. One Unforgettable R&B Experience.',
  date: '2026-11-21T19:30:00-06:00',
  doorsOpen: '6:30 PM',
  showTime: '7:30 PM',
  venue: "Rich's Houston",
  address: 'Houston, TX',
  city: 'Houston',
  state: 'TX',
  heroImage: '/images/hero-placeholder.jpg',
  description:
    "LoveNRnB Fest is bringing Houston's R&B community together for an unforgettable night of live music, incredible energy, and shared experiences. Headlined by Kaash Paige, featuring rising talent and DJs bringing your favorite sounds to life.",
  ageRestriction: '18+',
  isUpcoming: true,
  isSoldOut: false,
  lineup: [
    {
      id: 'artist-001',
      name: 'Kaash Paige',
      role: 'headliner',
      image: '/images/artists/Kaash.jpg',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/kaashpaige/',
      spotify: '0f2YkMXwFNJNSX7MymevKE',
      tba: false,
    },
    // Houston Rising Stars
    {
      id: 'artist-002',
      name: 'More Artists & Special Guests',
      role: 'featured',
      image: '',
      genre: 'R&B',
      tba: true,
    },
    {
      id: 'rising-001',
      name: 'Aaron Page',
      role: 'rising',
      image: '/images/artists/Aaron Page.jpg',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/whoisaaronpage/',
      spotify: '3VDL2INkcXTUD91WQ5qqEJ',
      tba: false,
    },
    {
      id: 'rising-002',
      name: 'Bolaji',
      role: 'rising',
      image: '/images/artists/Bolaji.jpeg',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/bolajiswrld/',
      spotify: '0Dw8cYZ9ZIYIsVszVP1oLW',
      tba: false,
    },
    {
      id: 'rising-003',
      name: 'Shelby Ruger',
      role: 'rising',
      image: '/images/artists/shelby ruger.PNG',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/realshelbyruger/',
      spotify: '5wuTCMXCmLGpOk5eVnKBsx',
      tba: false,
    },
    {
      id: 'rising-004',
      name: 'Sunnyside',
      role: 'rising',
      image: '/images/artists/SunnySide.jpeg',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/sunnyside.offcl/',
      spotify: '62Rii7Xj5Zbdws2nj7iVxw',
      tba: false,
    },
    {
      id: 'rising-005',
      name: 'Carro',
      role: 'rising',
      image: '/images/artists/CARRO.JPG',
      genre: 'R&B',
      instagram: 'https://www.instagram.com/rockstarcarro/',
      spotify: '5wiu17ewKd2PQ7nEIrFe4P',
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
      id: 'dj-004',
      name: 'Free Ohso',
      role: 'dj',
      image: '/images/artists/FreeOhso.JPG',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/freeohso',
      tba: false,
    },
    {
      id: 'dj-005',
      name: 'Sound Orientation',
      role: 'dj',
      image: '/images/artists/Sound%20Orientation.JPG',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/soundorientation/',
      tba: false,
    },
    {
      id: 'dj-002',
      name: 'ALIST',
      role: 'dj',
      image: '/images/artists/alist.JPG',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/makealistt',
      tba: false,
    },
    {
      id: 'dj-006',
      name: 'Yobi',
      role: 'dj',
      image: '/images/artists/Yobi.jpeg',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/omgitsyobi/',
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
      id: 'dj-007',
      name: 'Thomas The Square',
      role: 'dj',
      image: '/images/artists/ThomasTheSquare .jpeg',
      genre: 'DJ Set',
      instagram: 'https://www.instagram.com/thomasthesquare',
      tba: false,
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
      price: 30,
      perks: [
        'Full concert access',
        'Live performances & incredible DJs',
        'Access to all bar areas',
        'An unforgettable R&B experience',
      ],
      available: 400,
      total: 500,
      isHighlighted: false,
      ctaLabel: 'Get GA Tickets',
      stripePriceId: 'price_1TwtvcDfa6xjnJVQyFzjYDXB',
    },
    {
      id: 'tier-vip',
      name: 'VIP',
      price: 75,
      perks: [
        'VIP section access',
        'Elevated R&B concert atmosphere',
        'Dedicated VIP entry',
        'Premium bar access',
        'Limited availability',
      ],
      available: 75,
      total: 100,
      isHighlighted: true,
      ctaLabel: 'Get VIP Tickets',
      stripePriceId: 'price_1TwtwMDfa6xjnJVQe8soeG7c',
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
    id: 'spon-002',
    name: '5ifity Boys',
    logo: '/images/sponsors/5ifity-BOYS.png',
    tier: 'presenting',
    url: 'https://www.instagram.com/fiftyhospitality/',
  },
  {
    id: 'spon-003',
    name: 'DJEZE',
    logo: '/images/sponsors/DJEZELogo.png',
    tier: 'presenting',
    url: 'https://www.instagram.com/djeze__/',
    logoSize: 'h-52 lg:h-72',
  },
  {
    id: 'spon-004',
    name: 'Zane Weeks',
    logo: '/images/sponsors/Zane Weeks.PNG',
    tier: 'presenting',
    url: 'https://zweekslaw.com/',
    logoSize: 'h-20 lg:h-28',
  },
]
