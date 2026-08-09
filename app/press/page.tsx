import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Press & Media Credentials',
}

export default function PressPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Nav bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl uppercase text-white hover:text-gold transition-colors">
            LoveN<span className="text-gold">Rnb</span>
          </Link>
          <a
            href="https://posh.vip/e/lovenrnb-festival"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-9 px-5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors"
          >
            Get Tickets
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-4">Official Credentials</p>
          <h1
            className="font-display font-black uppercase text-white leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', letterSpacing: '-0.03em' }}
          >
            Media &amp;<br />Press
          </h1>
          <div className="w-full h-px bg-white/10 mt-8" />
        </div>

        {/* Body */}
        <div className="max-w-3xl space-y-10">

          {/* Intro */}
          <div>
            <p className="font-body text-base text-white/60 leading-relaxed">
              LoveNRnB Fest invites established media outlets, journalists, photographers, videographers, radio and television representatives, digital publications, podcasts, and select media platforms to apply for official festival credentials.
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <div className="w-full h-px bg-white/10 mb-8" />
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Eligibility</p>
            <p className="font-body text-base text-white/60 leading-relaxed mb-5">
              Due to limited media access, credentials are reserved for applicants who can demonstrate:
            </p>
            <ul className="space-y-3">
              {[
                'An active audience and consistent, original coverage',
                'Professional quality work',
                'A clear editorial or content plan surrounding LoveNRnB Fest',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-2" />
                  <span className="font-body text-sm text-white/50 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-white/40 leading-relaxed mt-5">
              Priority consideration will be given to recognized local, regional, and national outlets; R&amp;B and music-focused platforms; culture and lifestyle publications; and media partners providing meaningful pre-festival and post-festival coverage.
            </p>
          </div>

          {/* How to Apply */}
          <div>
            <div className="w-full h-px bg-white/10 mb-8" />
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">How to Apply</p>
            <p className="font-body text-base text-white/60 leading-relaxed mb-5">
              Email our Media &amp; Press team with the following:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Full name',
                'Outlet or platform name',
                'Role',
                'Website',
                'Social media links',
                'Current audience and reach',
                'Examples of previous music or event coverage',
                'Requested credential type',
                'A brief coverage plan explaining how you intend to cover LoveNRnB Fest',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0 mt-2" />
                  <span className="font-body text-sm text-white/50 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm text-white/40 leading-relaxed">
              Freelance photographers and videographers should also include a portfolio and identify the outlet or platform they will be representing.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <div className="w-full h-px bg-white/10 mb-8" />
            <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-5">Important Notice</p>
            <p className="font-body text-sm text-white/40 leading-relaxed">
              All applications are subject to review and approval. Submission does not guarantee credentials, artist access, photo pit access, interviews, backstage access, or any other restricted festival areas. Approved applicants will receive official credential instructions, access levels, media guidelines, and check-in information prior to the festival.
            </p>
          </div>

          {/* CTA */}
          <div>
            <div className="w-full h-px bg-white/10 mb-8" />
            <a
              href="mailto:press@lovenrnb.com"
              className="inline-flex items-center h-12 px-8 font-body text-xs font-semibold uppercase tracking-[0.15em] text-black bg-gold hover:bg-gold-light transition-colors duration-200"
            >
              Apply at press@lovenrnb.com
            </a>
          </div>

        </div>
      </div>
    </main>
  )
}
