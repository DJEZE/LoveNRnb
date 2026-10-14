import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/server/db'
import { cn } from '@/lib/utils'
import { PushCampaignStatus } from '@prisma/client'
import { Bell, Plus, Smartphone } from 'lucide-react'

export const metadata: Metadata = { title: 'Push Notifications' }
export const dynamic = 'force-dynamic'

const STATUS_COLORS: Record<PushCampaignStatus, string> = {
  DRAFT: 'text-white/40 border-white/20',
  SCHEDULED: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  SENT: 'text-green-400 border-green-400/30 bg-green-400/5',
  CANCELLED: 'text-white/30 border-white/20',
  FAILED: 'text-red-400 border-red-400/30 bg-red-400/5',
}

export default async function NotificationsPage() {
  const [campaigns, deviceStats, statusCounts] = await Promise.all([
    db.pushCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { creator: { select: { name: true } } },
    }),
    db.devicePushToken.groupBy({ by: ['platform'], where: { isActive: true }, _count: true }),
    db.pushCampaign.groupBy({ by: ['status'], _count: true }),
  ])

  const deviceMap = Object.fromEntries(deviceStats.map((d) => [d.platform, d._count]))
  const statusMap = Object.fromEntries(statusCounts.map((s) => [s.status, s._count]))
  const totalDevices = deviceStats.reduce((n, d) => n + d._count, 0)

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-2xs text-gold uppercase tracking-[0.3em] mb-2">Marketing</p>
          <h1 className="font-display font-black uppercase text-white text-4xl">Push Notifications</h1>
          <p className="font-body text-sm text-white/30 mt-1">iOS & Android native app</p>
        </div>
        <Link
          href="/admin/notifications/new"
          className="flex items-center gap-2 h-10 px-5 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors"
        >
          <Plus size={14} />
          New Campaign
        </Link>
      </div>

      {/* Device stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-surface-2 border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={13} className="text-white/30" />
            <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em]">Total Devices</p>
          </div>
          <p className="font-display font-black text-3xl text-gold">{totalDevices.toLocaleString()}</p>
        </div>
        <div className="bg-surface-2 border border-white/10 p-4">
          <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] mb-2">iOS</p>
          <p className="font-display font-black text-3xl text-white/70">{(deviceMap['IOS'] ?? 0).toLocaleString()}</p>
        </div>
        <div className="bg-surface-2 border border-white/10 p-4">
          <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] mb-2">Android</p>
          <p className="font-display font-black text-3xl text-white/70">{(deviceMap['ANDROID'] ?? 0).toLocaleString()}</p>
        </div>
        <div className="bg-surface-2 border border-white/10 p-4">
          <p className="font-body text-2xs text-white/40 uppercase tracking-[0.15em] mb-2">Sent</p>
          <p className="font-display font-black text-3xl text-green-400">{statusMap['SENT'] ?? 0}</p>
        </div>
      </div>

      {/* Campaign table */}
      <div className="bg-surface-2 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Title', 'Audience', 'Status', 'Delivered', 'Sent', ''].map((h) => (
                  <th key={h} className="text-left px-5 py-3 font-body text-2xs text-white/30 uppercase tracking-[0.15em]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Bell size={24} className="mx-auto text-white/20 mb-3" />
                    <p className="font-body text-sm text-white/25">No campaigns yet.</p>
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-body text-sm text-white truncate">{c.title}</p>
                      <p className="font-body text-2xs text-white/30 truncate mt-0.5">{c.body}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-xs text-white/50">{c.audience.replace(/_/g, ' ')}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn('font-body text-2xs uppercase tracking-[0.1em] border px-2 py-0.5', STATUS_COLORS[c.status])}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-xs text-white/50">
                        {c.successCount != null ? `${c.successCount.toLocaleString()} / ${c.recipientCount?.toLocaleString()}` : '—'}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-body text-xs text-white/40">{c.sentAt?.toLocaleDateString() ?? '—'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/notifications/${c.id}`}
                        className="font-body text-xs text-gold hover:text-gold/80 transition-colors uppercase tracking-[0.1em]"
                      >
                        {c.status === 'DRAFT' ? 'Edit →' : 'View →'}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
