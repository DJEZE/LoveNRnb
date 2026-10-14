import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { getTokensForAudience, sendToTokens } from '@/lib/server/firebase'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.pushCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (campaign.status === 'SENT' || campaign.status === 'CANCELLED') {
    return NextResponse.json({ error: `Campaign is already ${campaign.status.toLowerCase()}` }, { status: 400 })
  }

  try {
    const tokens = await getTokensForAudience(campaign.audience)

    if (!tokens.length) {
      return NextResponse.json({ error: 'No active device tokens for this audience' }, { status: 400 })
    }

    const { success, failure } = await sendToTokens(tokens, {
      title: campaign.title,
      body: campaign.body,
      imageUrl: campaign.imageUrl,
      destinationUrl: campaign.destinationUrl,
    })

    await db.$transaction([
      db.pushCampaign.update({
        where: { id: params.id },
        data: { status: 'SENT', sentAt: new Date(), recipientCount: tokens.length, successCount: success, failureCount: failure },
      }),
      db.pushSend.createMany({
        data: tokens.map((t) => ({ campaignId: params.id, fcmToken: t, status: 'sent', sentAt: new Date() })),
        skipDuplicates: true,
      }),
    ])

    return NextResponse.json({ ok: true, sent: success, failed: failure, total: tokens.length })
  } catch (err: any) {
    await db.pushCampaign.update({ where: { id: params.id }, data: { status: 'FAILED' } })
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
