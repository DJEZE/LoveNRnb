import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/server/db'
import { auth } from '@/auth'
import { VendorDetailActions } from '@/components/admin/VendorDetailActions'
import { cn } from '@/lib/utils'
import { ApplicationStatus } from '@prisma/client'

export const metadata: Metadata = { title: 'Vendor Detail' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  DRAFT: 'text-white/30',
  SUBMITTED: 'text-yellow-400',
  UNDER_REVIEW: 'text-blue-400',
  INFO_REQUESTED: 'text-orange-400',
  APPROVED: 'text-green-400',
  WAITLISTED: 'text-purple-400',
  REJECTED: 'text-red-400',
  WITHDRAWN: 'text-white/30',
  CANCELLED: 'text-red-300',
}

export default async function VendorDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()

  const application = await db.vendorApplication.findUnique({
    where: { id: params.id },
    include: {
      business: true,
      invoices: { include: { payments: true } },
      statusLogs: { orderBy: { changedAt: 'desc' } },
      documents: true,
      agreement: true,
      event: { select: { name: true, date: true } },
    },
  })

  if (!application) notFound()

  function cents(n: number) {
    return `$${(n / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
  }

  const fields = [
    ['Business Name', application.business.businessName],
    ['Contact', application.business.contactName],
    ['Email', application.business.email],
    ['Phone', application.business.phone ?? '—'],
    ['Website', application.business.website ?? '—'],
    ['Instagram', application.business.instagram ?? '—'],
    ['Category', application.category.replace(/_/g, ' ')],
    ['Electricity Needed', application.electricityNeeded ? 'Yes' : 'No'],
    ['Booth Identifier', application.boothIdentifier ?? 'Not assigned'],
    ['Submitted', application.submittedAt?.toLocaleString() ?? '—'],
  ]

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <a href="/admin/vendors" className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] hover:text-white transition-colors">
            ← Vendors
          </a>
          <h1 className="font-display font-black uppercase text-white text-4xl mt-3">
            {application.business.businessName}
          </h1>
          <p className={cn('font-body text-sm mt-2 uppercase tracking-[0.15em]', STATUS_COLORS[application.status])}>
            {application.status.replace(/_/g, ' ')}
          </p>
        </div>
      </div>

      {/* Actions panel */}
      <VendorDetailActions application={application} />

      {/* Info grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Application details */}
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mb-4">Application Details</p>
          {fields.map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <span className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] w-32 shrink-0 pt-0.5">{label}</span>
              <span className="font-body text-sm text-white/80">{value}</span>
            </div>
          ))}
        </div>

        {/* Invoices */}
        <div className="bg-surface-2 border border-white/10 p-6">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mb-4">Invoices & Payments</p>
          {application.invoices.length === 0 ? (
            <p className="font-body text-sm text-white/30">No invoices yet. Generate one after approval.</p>
          ) : (
            <div className="space-y-4">
              {application.invoices.map((inv) => (
                <div key={inv.id} className="border border-white/10 p-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="font-body text-xs text-white font-mono">{inv.invoiceNumber}</p>
                    <p className="font-body text-xs text-white/40">{inv.status.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="font-body text-2xs text-white/30">Due</p>
                      <p className="font-body text-sm text-white">{cents(inv.amountDue)}</p>
                    </div>
                    <div>
                      <p className="font-body text-2xs text-white/30">Paid</p>
                      <p className="font-body text-sm text-green-400">{cents(inv.amountPaid)}</p>
                    </div>
                    <div>
                      <p className="font-body text-2xs text-white/30">Balance</p>
                      <p className="font-body text-sm text-white">{cents(inv.amountDue - inv.amountPaid)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-surface-2 border border-white/10 p-6 space-y-5">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Vendor Description</p>
        <p className="font-body text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{application.description}</p>

        {application.spaceRequirements && (
          <>
            <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em]">Space Requirements</p>
            <p className="font-body text-sm text-white/70 leading-relaxed">{application.spaceRequirements}</p>
          </>
        )}

        {application.activationDesc && (
          <>
            <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em]">Activation Description</p>
            <p className="font-body text-sm text-white/70 leading-relaxed">{application.activationDesc}</p>
          </>
        )}

        {application.additionalNotes && (
          <>
            <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em]">Additional Notes</p>
            <p className="font-body text-sm text-white/70 leading-relaxed">{application.additionalNotes}</p>
          </>
        )}
      </div>

      {/* Status history */}
      <div className="bg-surface-2 border border-white/10 p-6">
        <p className="font-body text-2xs text-gold uppercase tracking-[0.2em] mb-4">Status History</p>
        <div className="space-y-3">
          {application.statusLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 py-2 border-b border-white/5 last:border-0">
              <span className="font-body text-2xs text-white/30 w-36 shrink-0">
                {log.changedAt.toLocaleString()}
              </span>
              <div>
                <p className="font-body text-sm text-white">
                  {log.fromStatus ? `${log.fromStatus.replace(/_/g, ' ')} → ` : ''}
                  <span className={STATUS_COLORS[log.toStatus]}>{log.toStatus.replace(/_/g, ' ')}</span>
                </p>
                {log.note && <p className="font-body text-2xs text-white/30 mt-0.5">{log.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
