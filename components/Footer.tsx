import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

// TikTok doesn't have a lucide icon — custom SVG
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.2 8.2 0 004.79 1.53V6.96a4.85 4.85 0 01-1.03-.27z" />
    </svg>
  )
}

interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Navigate: [
    { label: 'Events', href: '#events' },
    { label: 'Lineup', href: '#lineup' },
    { label: 'Tickets', href: '#tickets' },
    { label: 'Experience', href: '#experience' },
  ],
  Connect: [
    { label: 'Instagram', href: 'https://instagram.com/lovenrnb', isExternal: true },
    { label: 'TikTok', href: 'https://tiktok.com/@lovenrnb', isExternal: true },
    { label: 'Spotify Playlist', href: 'https://open.spotify.com', isExternal: true },
    { label: 'YouTube', href: 'https://youtube.com', isExternal: true },
  ],
  Partners: [
    { label: 'Become a Sponsor', href: 'mailto:partnerships@lovenrnb.com', isExternal: true },
    { label: 'Vendor Inquiry', href: 'mailto:vendors@lovenrnb.com', isExternal: true },
    { label: 'Press & Media', href: 'mailto:press@lovenrnb.com', isExternal: true },
    { label: 'Artist Bookings', href: 'mailto:bookings@lovenrnb.com', isExternal: true },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-surface border-t border-gold-border/20 overflow-hidden">
      {/* Top gold line */}
      <div className="h-px w-full bg-gold-gradient opacity-40" />

      <div className="container mx-auto px-6 py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="font-display text-2xl font-bold text-cream hover:text-gold transition-colors duration-300">
                Love<span className="text-gold">N</span>Rnb
              </span>
            </Link>
            <p className="font-body text-sm text-cream-muted leading-relaxed mb-6 max-w-[220px]">
              A premium R&B experience. Curated lineups. Elevated atmosphere.
              Houston&apos;s finest night out.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  href: 'https://instagram.com/lovenrnb',
                  label: 'Instagram',
                  icon: <Instagram size={16} strokeWidth={1.5} />,
                },
                {
                  href: 'https://tiktok.com/@lovenrnb',
                  label: 'TikTok',
                  icon: <TikTokIcon size={16} />,
                },
                {
                  href: 'https://youtube.com',
                  label: 'YouTube',
                  icon: <Youtube size={16} strokeWidth={1.5} />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-gold-border/30 text-cream-muted hover:text-gold hover:border-gold-border transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.25em] mb-5">
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="font-body text-sm text-cream-muted hover:text-cream transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gold-border/20">
          <p className="font-body text-xs text-dim">
            &copy; {currentYear} LoveNRnb. All rights reserved. Houston, TX.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="font-body text-xs text-dim hover:text-cream-muted transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="font-body text-xs text-dim hover:text-cream-muted transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
