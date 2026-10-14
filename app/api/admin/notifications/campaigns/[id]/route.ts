import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'
import { NotificationAudience, NotificationCategory } from '@prisma/client'
import { cancelScheduledNotification, getNotificationStats } from '@/lib/server/onesignal'

const body = z.object({
  title: z.string().min(1).max(200).optional(),
  body: z.string().min(1).max(1000).optional(),
  imageUrl: z.string().url().optional().nullable(),
  destinationUrl: z.string().optional().nullable(),
  category: z.nativeEnum(NotificationCategory).optional(),
  audience: z.nativeEnum(NotificationAudience).optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.notificationCampaign.findUnique({
    where: { id: params.id },
    include: {
      creator: { select: { name: true, email: true } },
      sends: { orderBy: { createdAt: 'desc' }, take: 100 },
    },
  })

  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Refresh analytics from OneSignal if campaign was sent
  let stats = null
  if (campaign.oneSignalId && campaign.status === 'SENT') {
    stats = await getNotificationStats(campaign.oneSignalId)
  }

  return NextResponse.json({ ...campaign, liveStats: stats })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.notificationCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (campaign.status === 'SENT' || campaign.status === 'SENDING') {
    return NextResponse.json({ error: 'Cannot edit a campaign that has been sent' }, { status: 400 })
  }

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const updated = await db.notificationCampaign.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      scheduledAt: parsed.data.scheduledAt !== undefined
        ? parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null
        : undefined,
      updatedBy: session.user.id,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.notificationCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Cancel in OneSignal if scheduled
  if (campaign.oneSignalId && campaign.status === 'SCHEDULED') {
    try {
      await cancelScheduledNotification(campaign.oneSignalId)
    } catch {}
  }

  if (campaign.status === 'SENDING') {
    return NextResponse.json({ error: 'Cannot cancel a notification that is currently sending' }, { status: 400 })
  }

  await db.notificationCampaign.update({
    where: { id: params.id },
    data: { status: 'CANCELLED', cancelledAt: new Date(), updatedBy: session.user.id },
  })

  return NextResponse.json({ ok: true })
}
