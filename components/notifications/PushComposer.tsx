'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PushAudience, PushCampaignStatus } from '@prisma/client'

type Campaign = {
  id: string
  title: string
  body: string
  imageUrl: string | null
  destinationUrl: string | null
  audience: PushAudience
  scheduledAt: Date | null
  notes: string | null
  status: PushCampaignStatus
}

const AUDIENCE_LABELS: Record<PushAudience, string> = {
  ALL: 'All Devices',
  MERCH_CUSTOMERS: 'Merchandise Customers',
  APPROVED_VENDORS: 'Approved Vendors',
  VENDORS_OUTSTANDING_BALANCE: 'Vendors — Outstanding Balance',
  ARTIST_ANNOUNCEMENTS: 'Artist Announcement Opt-ins',
  HOUSTON_AREA: 'Houston Area',
  TEST_ONLY: 'Test Only (admin devices)',
}

export function PushComposer({ campaign }: { campaign?: Campaign }) {
  const router = useRouter()
  const isEdit = !!campaign

  const [title, setTitle] = useState(campaign?.title ?? '')
  const [body, setBody] = useState(campaign?.body ?? '')
  const [imageUrl, setImageUrl] = useState(campaign?.imageUrl ?? '')
  const [destinationUrl, setDestinationUrl] = useState(campaign?.destinationUrl ?? '')
  const [audience, setAudience] = useState<PushAudience>(campaign?.audience ?? 'ALL')
  const [scheduledAt, setScheduledAt] = useState(
    campaign?.scheduledAt ? new Date(campaign.scheduledAt).toISOString().slice(0, 16) : ''
  )
  const [sendNow, setSendNow] = useState(!campaign?.scheduledAt)
  const [notes, setNotes] = useState(campaign?.notes ?? '')

  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [testing, setTesting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function payload() {
    return {
      title,
      body,
      imageUrl: imageUrl || null,
      destinationUrl: destinationUrl || null,
      audience,
      scheduledAt: !sendNow && scheduledAt ? new Date(scheduledAt).toISOString() : null,
      notes: notes || null,
    }
  }

  async function save(): Promise<string | null> {
    const url = isEdit ? `/api/admin/notifications/campaigns/${campaign.id}` : '/api/admin/notifications/campaigns'
    const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) })
    if (!res.ok) throw new Error((await res.json()).error ?? 'Save failed')
    const data = await res.json()
    return data.id ?? campaign?.id ?? null
  }

  async function saveDraft() {
    setSaving(true)
    setError(null)
    try {
      const id = await save()
      setSuccess('Draft saved.')
      if (!isEdit && id) router.push(`/admin/notifications/${id}`)
      else router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function sendTest() {
    if (!isEdit) { await saveDraft(); return }
    setTesting(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/notifications/campaigns/${campaign.id}/test`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Test failed')
      setSuccess(`Test sent to ${data.sent} admin device(s).`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setTesting(false)
    }
  }

  async function send() {
    setSending(true)
    setError(null)
    try {
      const id = await save()
      const res = await fetch(`/api/admin/notifications/campaigns/${id}/send`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Send failed')
      setSuccess(`Sent to ${data.sent?.toLocaleString()} device(s).`)
      router.push(`/admin/notifications/${id}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSending(false)
    }
  }

  const busy = saving || sending || testing

  return (
    <div className="space-y-5">
      {error && <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3">{error}</p>}
      {success && <p className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-3">{success}</p>}

      <div>
        <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="e.g. Kaash Paige Added to the Lineup 🎤"
          className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
        />
        <p className="font-body text-2xs text-white/25 mt-1 text-right">{title.length}/200</p>
      </div>

      <div>
        <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Message *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Your notification message..."
          className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold resize-none"
        />
        <p className="font-body text-2xs text-white/25 mt-1 text-right">{body.length}/1000</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Destination URL</label>
          <input
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="https://lovenrnb.com/..."
            className="w-full h-10 px-4 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Audience</label>
        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value as PushAudience)}
          className="w-full h-10 px-3 bg-black/40 border border-white/15 text-white text-sm font-body focus:outline-none focus:border-gold"
        >
          {(Object.entries(AUDIENCE_LABELS) as [PushAudience, string][]).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Send Timing</label>
        <div className="flex gap-5 mb-3">
          {(['now', 'schedule'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={opt === 'now' ? sendNow : !sendNow} onChange={() => setSendNow(opt === 'now')} className="accent-gold" />
              <span className="font-body text-sm text-white/70">{opt === 'now' ? 'Send immediately' : 'Schedule'}</span>
            </label>
          ))}
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

      <div>
        <label className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] block mb-2">Internal Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Visible only to admins"
          className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
        <button onClick={saveDraft} disabled={busy || !title || !body} className="h-10 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40">
          {saving ? 'Saving…' : 'Save Draft'}
        </button>
        <button onClick={sendTest} disabled={busy || !title || !body} className="h-10 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40">
          {testing ? 'Sending…' : 'Send Test'}
        </button>
        <button onClick={send} disabled={busy || !title || !body} className="h-10 px-5 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-40">
          {sending ? 'Sending…' : sendNow ? 'Send Now' : 'Schedule'}
        </button>
      </div>
    </div>
  )
}
