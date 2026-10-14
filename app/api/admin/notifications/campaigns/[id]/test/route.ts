import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { getTokensForAudience, sendToTokens } from '@/lib/server/firebase'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.pushCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const tokens = await getTokensForAudience('TEST_ONLY')

  if (!tokens.length) {
    return NextResponse.json({
      error: 'No test devices registered. Install the app on a device and log in as an admin to register a test device.'
    }, { status: 400 })
  }

  const { success, failure } = await sendToTokens(tokens, {
    title: `[TEST] ${campaign.title}`,
    body: campaign.body,
    imageUrl: campaign.imageUrl,
    destinationUrl: campaign.destinationUrl,
  })

  return NextResponse.json({ ok: true, sent: success, failed: failure })
}
