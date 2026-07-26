import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube } from 'lucide-react'

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.88a8.2 8.2 0 004.79 1.53V6.96a4.85 4.85 0 01-1.03-.27z" />
    </svg>
  )
}

interface FooterLink {
  label: string
  href: string
  isExternal?: boolean
  highlight?: boolean
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Navigate: [
    { label: 'Events', href: '#events' },
    { label: 'Lineup', href: '#lineup' },
    { label: 'Tickets', href: '#tickets' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'Instagram', href: 'https://instagram.com/lovenrnbfest', isExternal: true },
    { label: 'TikTok', href: 'https://www.tiktok.com/@offthewallexperience', isExternal: true },
    { label: 'YouTube', href: 'https://youtube.com/@lovenrnbfest?si=HI6TibySNAKN3nml', isExternal: true },
  ],
  Partners: [
    { label: 'Become a Sponsor', href: 'mailto:partnerships@lovenrnb.com', isExternal: true },
    { label: 'Vendor Inquiry', href: 'https://docs.google.com/forms/d/e/1FAIpQLSevxsrSzvEGXMIaWvsXwQ7shRLtt-OK_Of8aJcFi4QX56x4ig/viewform?usp=preview', isExternal: true, highlight: true },
    { label: 'Campus Ambassador', href: 'https://forms.gle/2iDK6xdAbVshWvu59', isExternal: true, highlight: true },
    { label: 'Press & Media', href: 'mailto:press@lovenrnb.com', isExternal: true },
  ],
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-6 pt-16 lg:pt-20 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/lovenrnb-logo.png"
                alt="LoveNRnb"
                width={180}
                height={90}
                className="h-16 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
              />
            </Link>

            <p className="font-body text-sm text-white/40 leading-relaxed mb-7 max-w-[220px]">
              The South&apos;s premier R&amp;B music festival. Curated lineups. Unforgettable experiences.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://instagram.com/lovenrnbfest', label: 'Instagram', icon: <Instagram size={15} strokeWidth={1.5} /> },
                { href: 'https://www.tiktok.com/@offthewallexperience', label: 'TikTok', icon: <TikTokIcon size={15} /> },
                { href: 'https://youtube.com/@lovenrnbfest?si=HI6TibySNAKN3nml', label: 'YouTube', icon: <Youtube size={15} strokeWidth={1.5} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="font-body text-2xs text-gold uppercase tracking-[0.25em] mb-5 font-medium">
                {category}
              </p>
              <ul className="flex flex-col gap-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className={link.highlight ? "font-body text-sm text-red-500 hover:text-red-400 font-semibold transition-colors duration-150" : "font-body text-sm text-white/40 hover:text-white transition-colors duration-150"}
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
        <div className="w-full h-px bg-white/10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/20">
            &copy; {year} LoveNRnb. All rights reserved. Houston, TX.
          </p>
          <div className="flex items-center gap-6">
            <a href="/faq" className="font-body text-xs text-white/20 hover:text-white/40 transition-colors">
              FAQ
            </a>
            <a href="/privacy" className="font-body text-xs text-white/20 hover:text-white/40 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="font-body text-xs text-white/20 hover:text-white/40 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
