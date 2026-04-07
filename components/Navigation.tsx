'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/data'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 48)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-smooth',
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-gold-border/50 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="LoveNRnb home"
          >
            <span
              className={cn(
                'font-display font-bold tracking-tight leading-none',
                'text-xl text-cream group-hover:text-gold transition-colors duration-300',
                scrolled ? 'text-xl' : 'text-xl'
              )}
            >
              Love
              <span className="text-gold">N</span>
              Rnb
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'font-body text-xs uppercase tracking-[0.18em]',
                    'text-cream-muted hover:text-cream',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:text-gold'
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              href="#tickets"
              onClick={() => handleNavClick('#tickets')}
            >
              Get Tickets
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-cream hover:text-gold transition-colors duration-200 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden',
          'transition-all duration-400 ease-smooth',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <div
          className={cn(
            'relative flex flex-col justify-center items-center h-full gap-10',
            'transition-transform duration-400 ease-spring',
            mobileOpen ? 'translate-y-0' : '-translate-y-8'
          )}
        >
          {/* Logo in menu */}
          <span className="font-display text-2xl font-bold text-cream mb-4">
            Love<span className="text-gold">N</span>Rnb
          </span>

          {/* Nav links */}
          <ul className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="font-body text-xl text-cream hover:text-gold transition-colors duration-200 uppercase tracking-widest"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            variant="gold"
            size="lg"
            onClick={() => {
              setMobileOpen(false)
              handleNavClick('#tickets')
            }}
          >
            Get Tickets
          </Button>

          {/* Social */}
          <div className="flex gap-6 mt-4">
            <a
              href="https://instagram.com/lovenrnb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-muted hover:text-gold text-xs uppercase tracking-widest transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@lovenrnb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-muted hover:text-gold text-xs uppercase tracking-widest transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
