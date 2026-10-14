import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/server/db'
import { cn } from '@/lib/utils'
import { PushCampaignStatus } from '@prisma/client'
import { PushComposer } from '@/components/notifications/PushComposer'
import { PushCampaignActions } from '@/components/notifications/PushCampaignActions'

export const metadata: Metadata = { title: 'Campaign' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<PushCampaignStatus, string> = {
  DRAFT: 'text-white/40',
  SCHEDULED: 'text-blue-400',
  SENT: 'text-green-400',
  CANCELLED: 'text-white/30',
  FAILED: 'text-red-400',
}

export default async function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = await db.pushCampaign.findUnique({
    where: { id: params.id },
    include: { creator: { select: { name: true, email: true } } },
  })

  if (!campaign) notFound()

  const isEditable = campaign.status === 'DRAFT'

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <a href="/admin/notifications" className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] hover:text-white transition-colors">
          ← Push Notifications
        </a>
        <h1 className="font-display font-black uppercase text-white text-4xl mt-3 leading-none">{campaign.title}</h1>
        <p className={cn('font-body text-sm mt-2 uppercase tracking-[0.15em]', STATUS_COLORS[campaign.status])}>
          {campaign.status}
        </p>
      </div>

      <PushCampaignActions campaign={campaign} />

      {campaign.status === 'SENT' && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Devices Reached', value: campaign.recipientCount?.toLocaleString() ?? '—' },
            { label: 'Delivered', value: campaign.successCount?.toLocaleString() ?? '—' },
            { label: 'Failed', value: campaign.failureCount?.toLocaleString() ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface-2 border border-white/10 p-5">
              <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] mb-2">{label}</p>
              <p className="font-display font-black text-3xl text-gold">{value}</p>
            </div>
          ))}
        </div>
      )}

      {isEditable ? (
        <PushComposer campaign={campaign} />
      ) : (
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Campaign Details</p>
          {[
            ['Audience', campaign.audience.replace(/_/g, ' ')],
            ['Body', campaign.body],
            ['Destination', campaign.destinationUrl ?? '—'],
            ['Sent', campaign.sentAt?.toLocaleString() ?? '—'],
            ['Created by', campaign.creator.name ?? campaign.creator.email],
            ['Notes', campaign.notes ?? '—'],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <span className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] w-28 shrink-0 pt-0.5">{label}</span>
              <span className="font-body text-sm text-white/70">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
