'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PushCampaignStatus } from '@prisma/client'

type Campaign = { id: string; status: PushCampaignStatus }

export function PushCampaignActions({ campaign }: { campaign: Campaign }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<{ type: 'error' | 'ok'; text: string } | null>(null)

  async function duplicate() {
    setLoading(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/admin/notifications/campaigns/${campaign.id}`)
      const data = await res.json()
      const createRes = await fetch('/api/admin/notifications/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `[Copy] ${data.title}`,
          body: data.body,
          imageUrl: data.imageUrl,
          destinationUrl: data.destinationUrl,
          audience: data.audience,
          notes: data.notes,
        }),
      })
      const newCampaign = await createRes.json()
      router.push(`/admin/notifications/${newCampaign.id}`)
    } catch {
      setMsg({ type: 'error', text: 'Failed to duplicate.' })
      setLoading(false)
    }
  }

  async function cancel() {
    if (!confirm('Cancel this campaign?')) return
    setLoading(true)
    setMsg(null)
    try {
      await fetch(`/api/admin/notifications/campaigns/${campaign.id}`, { method: 'DELETE' })
      setMsg({ type: 'ok', text: 'Cancelled.' })
      router.refresh()
    } catch {
      setMsg({ type: 'error', text: 'Failed to cancel.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {msg && (
        <p className={`font-body text-xs px-4 py-2 border ${msg.type === 'error' ? 'text-red-400 bg-red-400/10 border-red-400/20' : 'text-green-400 bg-green-400/10 border-green-400/20'}`}>
          {msg.text}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button onClick={duplicate} disabled={loading} className="h-9 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50">
          Duplicate
        </button>
        {(campaign.status === 'DRAFT' || campaign.status === 'SCHEDULED') && (
          <button onClick={cancel} disabled={loading} className="h-9 px-5 border border-red-700/40 hover:border-red-500 text-red-500/60 hover:text-red-400 font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50">
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
