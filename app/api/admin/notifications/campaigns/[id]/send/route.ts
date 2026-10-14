import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { sendCampaign } from '@/lib/server/onesignal'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.notificationCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (campaign.status === 'SENT' || campaign.status === 'SENDING' || campaign.status === 'CANCELLED') {
    return NextResponse.json({ error: `Campaign is already ${campaign.status.toLowerCase()}` }, { status: 400 })
  }

  await db.notificationCampaign.update({
    where: { id: params.id },
    data: { status: 'SENDING', updatedBy: session.user.id },
  })

  try {
    const result = await sendCampaign({
      title: campaign.title,
      body: campaign.body,
      imageUrl: campaign.imageUrl,
      destinationUrl: campaign.destinationUrl,
      audience: campaign.audience,
      category: campaign.category,
      scheduledAt: campaign.scheduledAt,
    })

    const isScheduled = !!campaign.scheduledAt && campaign.scheduledAt > new Date()

    await db.notificationCampaign.update({
      where: { id: params.id },
      data: {
        status: isScheduled ? 'SCHEDULED' : 'SENT',
        sentAt: isScheduled ? null : new Date(),
        oneSignalId: result.oneSignalId,
        actualRecipients: result.recipients,
        updatedBy: session.user.id,
      },
    })

    return NextResponse.json({
      ok: true,
      oneSignalId: result.oneSignalId,
      recipients: result.recipients,
      scheduled: isScheduled,
    })
  } catch (err: any) {
    await db.notificationCampaign.update({
      where: { id: params.id },
      data: { status: 'FAILED', updatedBy: session.user.id },
    })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
