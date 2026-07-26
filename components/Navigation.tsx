'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/data'
import type { NavLink } from '@/lib/types'

function DropdownMenu({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 font-body text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-150"
      >
        {link.label}
        <ChevronDown size={12} className={cn('transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 min-w-[200px] bg-black border border-white/10 py-2 z-50">
          {link.children?.map((child) => (
            <a
              key={child.label}
              href={child.href}
              target={child.href.startsWith('http') || child.href.startsWith('mailto') ? '_blank' : undefined}
              rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="block px-5 py-2.5 font-body text-xs uppercase tracking-[0.12em] text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-150"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20 lg:h-[144px]">

            {/* Logo */}
            <Link href="/" aria-label="LoveNRnb">
              <Image
                src="/images/lovenrnb-logo.png"
                alt="LoveNRnb"
                width={240}
                height={120}
                className="h-20 lg:h-24 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <DropdownMenu key={link.label} link={link} />
                ) : link.href.startsWith('/') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-xs font-medium uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </button>
                )
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="/experience"
                className="inline-flex items-center h-9 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
              >
                Join Waitlist
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close' : 'Menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden bg-black transition-opacity duration-300 overflow-y-auto',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col justify-center items-center min-h-full py-20 gap-8">
          <Image
            src="/images/lovenrnb-logo.png"
            alt="LoveNRnb"
            width={180}
            height={90}
            className="h-20 w-auto object-contain"
          />

          <nav className="flex flex-col items-center gap-5 w-full px-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="w-full text-center">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                    className="flex items-center justify-center gap-2 w-full font-display font-black text-3xl uppercase text-white hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                    <ChevronDown size={20} className={cn('transition-transform duration-200', mobileExpanded === link.label && 'rotate-180')} />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="mt-3 flex flex-col items-center gap-3">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          target={child.href.startsWith('http') || child.href.startsWith('mailto') ? '_blank' : undefined}
                          rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={() => setMobileOpen(false)}
                          className="font-body text-sm uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.href.startsWith('/') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-black text-3xl uppercase text-white hover:text-gold transition-colors duration-150"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-display font-black text-3xl uppercase text-white hover:text-gold transition-colors duration-150"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          <a
            href="/experience"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center h-12 px-8 font-body text-sm font-semibold uppercase tracking-widest text-black bg-gold hover:bg-gold-light transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </>
  )
}
