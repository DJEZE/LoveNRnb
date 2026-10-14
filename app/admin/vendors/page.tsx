import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/server/db'
import { cn } from '@/lib/utils'
import { ApplicationStatus, VendorCategory } from '@prisma/client'

export const metadata: Metadata = { title: 'Vendors' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  DRAFT: 'text-white/30 border-white/20',
  SUBMITTED: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  UNDER_REVIEW: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  INFO_REQUESTED: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  APPROVED: 'text-green-400 border-green-400/30 bg-green-400/5',
  WAITLISTED: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  REJECTED: 'text-red-400 border-red-400/30 bg-red-400/5',
  WITHDRAWN: 'text-white/30 border-white/20',
  CANCELLED: 'text-red-300 border-red-300/20',
}

const CATEGORY_LABELS: Record<VendorCategory, string> = {
  FOOD: 'Food',
  RETAIL: 'Retail',
  MERCHANDISE: 'Merchandise',
  LIFESTYLE: 'Lifestyle',
  BRAND_ACTIVATION: 'Brand Activation',
  PREMIUM_ACTIVATION: 'Premium Activation',
  OTHER: 'Other',
}

export default async function AdminVendorsPage({
  searchParams,
}: {
  searchParams: { status?: string; category?: string; q?: string }
}) {
  const where: any = {}

  if (searchParams.status && searchParams.status !== 'ALL') {
    where.status = searchParams.status as ApplicationStatus
  }
  if (searchParams.category && searchParams.category !== 'ALL') {
    where.category = searchParams.category as VendorCategory
  }
  if (searchParams.q) {
    where.business = {
      OR: [
        { businessName: { contains: searchParams.q, mode: 'insensitive' } },
        { email: { contains: searchParams.q, mode: 'insensitive' } },
        { contactName: { contains: searchParams.q, mode: 'insensitive' } },
      ],
    }
  }

  const [applications, counts] = await Promise.all([
    db.vendorApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        business: { select: { businessName: true, contactName: true, email: true, phone: true } },
        invoices: { select: { amountDue: true, amountPaid: true, status: true } },
      },
    }),
    db.vendorApplication.groupBy({ by: ['status'], _count: true }),
  ])

  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count]))

  function cents(n: number) {
    return `$${(n / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-2">Vendor Management</p>
          <h1 className="font-display font-black uppercase text-white text-4xl">Vendors</h1>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {(['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'WAITLISTED', 'REJECTED'] as ApplicationStatus[]).map((s) => (
          <Link
            key={s}
            href={`/admin/vendors?status=${s}`}
            className={cn(
              'border p-3 text-center cursor-pointer transition-colors',
              searchParams.status === s ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-white/25'
            )}
          >
            <p className={cn('font-display font-black text-2xl', STATUS_COLORS[s].split(' ')[0])}>
              {countMap[s] ?? 0}
            </p>
            <p className="font-body text-2xs text-white/40 uppercase tracking-[0.1em] mt-1">
              {s.replace(/_/g, ' ')}
            </p>
          </Link>
        ))}
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search business, email..."
          className="flex-1 min-w-48 h-10 px-4 bg-surface-2 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
        />
        <select name="status" defaultValue={searchParams.status ?? 'ALL'} className="h-10 px-3 bg-surface-2 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold">
          <option value="ALL">All Statuses</option>
          {Object.values(ApplicationStatus).map((s) => (
            <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <select name="category" defaultValue={searchParams.category ?? 'ALL'} className="h-10 px-3 bg-surface-2 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold">
          <option value="ALL">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
        <button type="submit" className="h-10 px-5 bg-gold text-white font-body text-xs uppercase tracking-[0.15em] hover:bg-gold-light transition-colors">
          Filter
        </button>
        <Link href="/admin/vendors" className="h-10 px-5 border border-white/15 text-white/40 font-body text-xs uppercase tracking-[0.15em] flex items-center hover:text-white transition-colors">
          Clear
        </Link>
      </form>

      {/* Table */}
      <div className="bg-surface-2 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Business', 'Category', 'Contact', 'Status', 'Invoice', 'Applied', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-body text-2xs text-white/30 uppercase tracking-[0.15em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center font-body text-sm text-white/25">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const totalDue = app.invoices.reduce((s, i) => s + i.amountDue, 0)
                  const totalPaid = app.invoices.reduce((s, i) => s + i.amountPaid, 0)
                  return (
                    <tr key={app.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-body text-sm text-white">{app.business.businessName}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-body text-xs text-white/50">{CATEGORY_LABELS[app.category]}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-body text-xs text-white/50">{app.business.contactName}</p>
                        <p className="font-body text-2xs text-white/25">{app.business.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn('font-body text-2xs uppercase tracking-[0.1em] border px-2 py-0.5', STATUS_COLORS[app.status])}>
                          {app.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {totalDue > 0 ? (
                          <div>
                            <p className="font-body text-xs text-white">{cents(totalPaid)} / {cents(totalDue)}</p>
                            <p className="font-body text-2xs text-white/30">{totalPaid >= totalDue ? 'Paid' : `${cents(totalDue - totalPaid)} due`}</p>
                          </div>
                        ) : (
                          <p className="font-body text-2xs text-white/25">No invoice</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-body text-xs text-white/40">
                          {app.createdAt.toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/vendors/${app.id}`}
                          className="font-body text-xs text-gold hover:text-gold-light transition-colors uppercase tracking-[0.1em]"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
