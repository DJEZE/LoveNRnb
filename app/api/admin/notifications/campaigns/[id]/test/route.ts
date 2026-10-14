import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { sendCampaign } from '@/lib/server/onesignal'
import { NotificationAudience } from '@prisma/client'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.notificationCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Send only to TEST_ONLY segment
  const result = await sendCampaign({
    title: `[TEST] ${campaign.title}`,
    body: campaign.body,
    imageUrl: campaign.imageUrl,
    destinationUrl: campaign.destinationUrl,
    audience: 'TEST_ONLY' as NotificationAudience,
    category: campaign.category,
  })

  await db.notificationSend.create({
    data: {
      campaignId: campaign.id,
      userId: session.user.id,
      oneSignalId: result.oneSignalId,
      status: 'sent',
      sentAt: new Date(),
    },
  })

  return NextResponse.json({ ok: true, oneSignalId: result.oneSignalId, recipients: result.recipients })
}
