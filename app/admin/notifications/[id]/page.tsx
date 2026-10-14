import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { db } from '@/lib/server/db'
import { cn } from '@/lib/utils'
import { CampaignStatus } from '@prisma/client'
import { NotificationComposer } from '@/components/notifications/NotificationComposer'
import { CampaignActions } from '@/components/notifications/CampaignActions'

export const metadata: Metadata = { title: 'Campaign' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<CampaignStatus, string> = {
  DRAFT: 'text-white/40',
  SCHEDULED: 'text-blue-400',
  SENDING: 'text-yellow-400',
  SENT: 'text-green-400',
  CANCELLED: 'text-white/30',
  FAILED: 'text-red-400',
}

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = await db.notificationCampaign.findUnique({
    where: { id: params.id },
    include: {
      creator: { select: { name: true, email: true } },
      sends: { orderBy: { createdAt: 'desc' }, take: 50 },
    },
  })

  if (!campaign) notFound()

  const isEditable = campaign.status === 'DRAFT' || campaign.status === 'SCHEDULED'
  const isSent = campaign.status === 'SENT'

  const deliveredCount = campaign.sends.filter((s) => s.status === 'delivered' || s.status === 'clicked').length
  const clickedCount = campaign.sends.filter((s) => s.status === 'clicked').length
  const ctr = deliveredCount > 0 ? ((clickedCount / deliveredCount) * 100).toFixed(1) : '—'

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <a href="/admin/notifications" className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] hover:text-white transition-colors">
            ← Push Notifications
          </a>
          <h1 className="font-display font-black uppercase text-white text-4xl mt-3 leading-none">{campaign.title}</h1>
          <p className={cn('font-body text-sm mt-2 uppercase tracking-[0.15em]', STATUS_COLORS[campaign.status])}>
            {campaign.status}
          </p>
        </div>
      </div>

      {/* Actions */}
      <CampaignActions campaign={campaign} />

      {/* Analytics (if sent) */}
      {isSent && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Recipients', value: campaign.actualRecipients?.toLocaleString() ?? '—' },
            { label: 'Delivered', value: deliveredCount.toLocaleString() },
            { label: 'CTR', value: ctr === '—' ? '—' : `${ctr}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface-2 border border-white/10 p-5">
              <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] mb-2">{label}</p>
              <p className="font-display font-black text-3xl text-gold">{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Composer (editable if draft/scheduled) */}
      {isEditable ? (
        <NotificationComposer campaign={campaign} />
      ) : (
        <div className="bg-surface-2 border border-white/10 p-6 space-y-4">
          <p className="font-body text-2xs text-gold uppercase tracking-[0.2em]">Campaign Details</p>
          {[
            ['Category', campaign.category.replace(/_/g, ' ')],
            ['Audience', campaign.audience.replace(/_/g, ' ')],
            ['Body', campaign.body],
            ['Destination', campaign.destinationUrl ?? '—'],
            ['Image', campaign.imageUrl ?? '—'],
            ['Sent At', campaign.sentAt?.toLocaleString() ?? campaign.scheduledAt?.toLocaleString() ?? '—'],
            ['Created By', campaign.creator.name ?? campaign.creator.email],
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
