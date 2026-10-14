'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ApplicationStatus } from '@prisma/client'

type Props = {
  application: {
    id: string
    status: ApplicationStatus
    boothIdentifier: string | null
    invoices: { id: string; amountDue: number; amountPaid: number; status: string }[]
    business: { email: string; contactName: string; businessName: string }
  }
}

const STATUS_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['UNDER_REVIEW', 'REJECTED'],
  UNDER_REVIEW: ['INFO_REQUESTED', 'APPROVED', 'WAITLISTED', 'REJECTED'],
  INFO_REQUESTED: ['UNDER_REVIEW', 'REJECTED'],
  APPROVED: ['CANCELLED'],
  WAITLISTED: ['UNDER_REVIEW', 'APPROVED', 'REJECTED'],
  REJECTED: [],
  WITHDRAWN: [],
  CANCELLED: [],
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  INFO_REQUESTED: 'Info Requested',
  APPROVED: 'Approved',
  WAITLISTED: 'Waitlisted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
  CANCELLED: 'Cancelled',
}

export function VendorDetailActions({ application }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [booth, setBooth] = useState(application.boothIdentifier ?? '')
  const [invoiceAmount, setInvoiceAmount] = useState('')

  const transitions = STATUS_TRANSITIONS[application.status] ?? []

  async function updateStatus(toStatus: ApplicationStatus) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/vendors/${application.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toStatus, note }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to update status')
      }
      setNote('')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function assignBooth() {
    if (!booth.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/vendors/${application.id}/booth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boothIdentifier: booth.trim() }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to assign booth')
      }
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function generateInvoice() {
    const cents = Math.round(parseFloat(invoiceAmount) * 100)
    if (isNaN(cents) || cents <= 0) {
      setError('Enter a valid invoice amount')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/vendors/${application.id}/invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountDue: cents }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to generate invoice')
      }
      setInvoiceAmount('')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2">
          {error}
        </p>
      )}

      {/* Status actions */}
      {transitions.length > 0 && (
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Update Status</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional note (shown in status history)"
            rows={2}
            className="w-full bg-black/40 border border-white/15 text-white text-sm font-body px-3 py-2 placeholder:text-white/25 focus:outline-none focus:border-gold resize-none"
          />
          <div className="flex flex-wrap gap-3">
            {transitions.map((s) => {
              const isApprove = s === 'APPROVED'
              const isReject = s === 'REJECTED' || s === 'CANCELLED'
              return (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  disabled={loading}
                  className={
                    isApprove
                      ? 'h-9 px-5 bg-green-600 hover:bg-green-500 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50'
                      : isReject
                      ? 'h-9 px-5 bg-red-700 hover:bg-red-600 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50'
                      : 'h-9 px-5 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50'
                  }
                >
                  → {STATUS_LABELS[s]}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Booth assignment */}
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Booth Assignment</p>
          <div className="flex gap-3">
            <input
              value={booth}
              onChange={(e) => setBooth(e.target.value)}
              placeholder="e.g. A-12"
              className="flex-1 h-9 px-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
            />
            <button
              onClick={assignBooth}
              disabled={loading || !booth.trim()}
              className="h-9 px-5 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
            >
              Assign
            </button>
          </div>
        </div>

        {/* Invoice generation */}
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Generate Invoice</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-body text-sm">$</span>
              <input
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                className="w-full h-9 pl-7 pr-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
              />
            </div>
            <button
              onClick={generateInvoice}
              disabled={loading || !invoiceAmount}
              className="h-9 px-5 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
            >
              Create
            </button>
          </div>
          {application.invoices.length > 0 && (
            <p className="font-body text-2xs text-white/30">{application.invoices.length} invoice(s) exist — creating another will add to the total.</p>
          )}
        </div>
      </div>
    </div>
  )
}
