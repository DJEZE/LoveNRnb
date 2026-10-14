'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NotificationAudience, NotificationCategory, CampaignStatus } from '@prisma/client'
import { NotificationPreview } from './NotificationPreview'

type Campaign = {
  id: string
  title: string
  body: string
  imageUrl: string | null
  destinationUrl: string | null
  category: NotificationCategory
  audience: NotificationAudience
  scheduledAt: Date | null
  notes: string | null
  status: CampaignStatus
}

type Props = { campaign?: Campaign }

const AUDIENCE_LABELS: Record<NotificationAudience, string> = {
  ALL_SUBSCRIBERS: 'All Subscribers',
  MERCH_CUSTOMERS: 'Merchandise Customers',
  ABANDONED_CART: 'Abandoned Cart (with consent)',
  APPROVED_VENDORS: 'Approved Vendors',
  VENDORS_OUTSTANDING_BALANCE: 'Vendors — Outstanding Balance',
  ARTIST_ANNOUNCEMENTS: 'Artist Announcement Subscribers',
  FUTURE_EVENTS: 'Future Events Interest',
  HOUSTON_AREA: 'Houston Area Subscribers',
  VIP_TICKET_HOLDERS: 'VIP Ticket Holders (2027)',
  GA_TICKET_HOLDERS: 'GA Ticket Holders (2027)',
  TEST_ONLY: 'Test Only (internal)',
}

const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  MARKETING: 'Marketing',
  VENDOR_OPS: 'Vendor Operations',
  MERCH_TRANSACTIONAL: 'Merch — Transactional',
  FESTIVAL_UPDATE: 'Festival Update',
  TICKETING: 'Ticketing (2027)',
  SYSTEM: 'System',
}

export function NotificationComposer({ campaign }: Props) {
  const router = useRouter()
  const isEdit = !!campaign

  const [title, setTitle] = useState(campaign?.title ?? '')
  const [body, setBody] = useState(campaign?.body ?? '')
  const [imageUrl, setImageUrl] = useState(campaign?.imageUrl ?? '')
  const [destinationUrl, setDestinationUrl] = useState(campaign?.destinationUrl ?? '')
  const [category, setCategory] = useState<NotificationCategory>(campaign?.category ?? 'MARKETING')
  const [audience, setAudience] = useState<NotificationAudience>(campaign?.audience ?? 'ALL_SUBSCRIBERS')
  const [scheduledAt, setScheduledAt] = useState(
    campaign?.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : ''
  )
  const [notes, setNotes] = useState(campaign?.notes ?? '')
  const [sendNow, setSendNow] = useState(!campaign?.scheduledAt)

  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [testing, setTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function buildPayload() {
    return {
      title,
      body,
      imageUrl: imageUrl || null,
      destinationUrl: destinationUrl || null,
      category,
      audience,
      scheduledAt: !sendNow && scheduledAt ? new Date(scheduledAt).toISOString() : null,
      notes: notes || null,
    }
  }

  async function saveDraft() {
    setSaving(true)
    setError(null)
    try {
      const url = isEdit ? `/api/admin/notifications/campaigns/${campaign.id}` : '/api/admin/notifications/campaigns'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildPayload()) })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Save failed')
      const data = await res.json()
      setSuccess('Saved as draft.')
      if (!isEdit) router.push(`/admin/notifications/${data.id}`)
      else router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function sendTest() {
    if (!isEdit) {
      await saveDraft()
      return
    }
    setTesting(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/notifications/campaigns/${campaign.id}/test`, { method: 'POST' })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Test send failed')
      setSuccess('Test notification sent to the Test Segment.')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setTesting(false)
    }
  }

  async function sendCampaign() {
    // Save first, then send
    setSending(true)
    setError(null)
    try {
      let id = campaign?.id
      if (!id) {
        const res = await fetch('/api/admin/notifications/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildPayload()),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? 'Save failed')
        const data = await res.json()
        id = data.id
      } else {
        const res = await fetch(`/api/admin/notifications/campaigns/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildPayload()),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? 'Update failed')
      }

      const sendRes = await fetch(`/api/admin/notifications/campaigns/${id}/send`, { method: 'POST' })
      if (!sendRes.ok) throw new Error((await sendRes.json()).error ?? 'Send failed')
      const result = await sendRes.json()

      const msg = result.scheduled
        ? `Scheduled for ${new Date(scheduledAt).toLocaleString()}.`
        : `Sent to ${result.recipients?.toLocaleString() ?? '?'} subscribers.`
      setSuccess(msg)
      router.push(`/admin/notifications/${id}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: form */}
      <div className="space-y-5">
        {error && (
          <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3">{error}</p>
        )}
        {success && (
          <p className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-3">{success}</p>
        )}

        {/* Title */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Notification Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Kaash Paige Added to the Lineup 🎤"
            maxLength={200}
            className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
          />
          <p className="font-body text-2xs text-white/25 mt-1 text-right">{title.length}/200</p>
        </div>

        {/* Body */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Message Body *</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your notification message..."
            maxLength={1000}
            rows={3}
            className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold resize-none"
          />
          <p className="font-body text-2xs text-white/25 mt-1 text-right">{body.length}/1000</p>
        </div>

        {/* Image URL */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Image URL (optional)</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
          />
        </div>

        {/* Destination URL */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Destination URL (optional)</label>
          <input
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="https://lovenrnb.com/..."
            className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
          />
        </div>

        {/* Category + Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NotificationCategory)}
              className="w-full h-10 px-3 bg-black/40 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold"
            >
              {(Object.entries(CATEGORY_LABELS) as [NotificationCategory, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as NotificationAudience)}
              className="w-full h-10 px-3 bg-black/40 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold"
            >
              {(Object.entries(AUDIENCE_LABELS) as [NotificationAudience, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Send Timing</label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={sendNow} onChange={() => setSendNow(true)} className="accent-gold" />
              <span className="font-body text-sm text-white/70">Send immediately</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={!sendNow} onChange={() => setSendNow(false)} className="accent-gold" />
              <span className="font-body text-sm text-white/70">Schedule</span>
            </label>
          </div>
          {!sendNow && (
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold"
            />
          )}
        </div>

        {/* Internal notes */}
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Internal Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes visible only to admins"
            rows={2}
            className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={saveDraft}
            disabled={saving || !title || !body}
            className="h-10 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            onClick={sendTest}
            disabled={testing || !title || !body}
            className="h-10 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40"
          >
            {testing ? 'Sending…' : 'Send Test'}
          </button>
          <button
            onClick={sendCampaign}
            disabled={sending || !title || !body}
            className="h-10 px-5 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40"
          >
            {sending ? 'Sending…' : sendNow ? 'Send Now' : 'Schedule'}
          </button>
        </div>
      </div>

      {/* Right: preview */}
      <div className="lg:sticky lg:top-8 h-fit">
        <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] mb-4">Live Preview</p>
        <NotificationPreview
          title={title || 'Notification Title'}
          body={body || 'Your notification message will appear here.'}
          imageUrl={imageUrl || null}
          audience={AUDIENCE_LABELS[audience]}
        />
      </div>
    </div>
  )
}
