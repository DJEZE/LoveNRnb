'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CampaignStatus } from '@prisma/client'

type Campaign = {
  id: string
  status: CampaignStatus
  oneSignalId: string | null
}

export function CampaignActions({ campaign }: { campaign: Campaign }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function duplicate() {
    setLoading(true)
    setError(null)
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
          category: data.category,
          audience: data.audience,
          notes: data.notes,
        }),
      })
      if (!createRes.ok) throw new Error('Failed to duplicate')
      const newCampaign = await createRes.json()
      router.push(`/admin/notifications/${newCampaign.id}`)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function cancel() {
    if (!confirm('Cancel this campaign? This cannot be undone.')) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/notifications/campaigns/${campaign.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Cancel failed')
      setSuccess('Campaign cancelled.')
      router.refresh()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-2">{error}</p>}
      {success && <p className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-2">{success}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={duplicate}
          disabled={loading}
          className="h-9 px-5 border border-white/20 hover:border-white/40 text-white/60 hover:text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
        >
          Duplicate Campaign
        </button>

        {(campaign.status === 'DRAFT' || campaign.status === 'SCHEDULED') && (
          <button
            onClick={cancel}
            disabled={loading}
            className="h-9 px-5 border border-red-700/40 hover:border-red-500 text-red-500/60 hover:text-red-400 font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
          >
            {campaign.status === 'SCHEDULED' ? 'Cancel Schedule' : 'Delete Draft'}
          </button>
        )}
      </div>
    </div>
  )
}
