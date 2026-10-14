import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/server/db'

// OneSignal delivery webhooks — tracks delivery and click events
// Configure in OneSignal Dashboard → Settings → Webhooks
export async function POST(req: NextRequest) {
  const payload = await req.json()

  // Idempotency check
  const eventId = `onesignal_${payload.event}_${payload.notification_id}_${payload.external_user_id ?? payload.player_id ?? Date.now()}`

  try {
    await db.webhookEvent.create({
      data: {
        provider: 'onesignal',
        eventType: payload.event ?? 'unknown',
        eventId,
        payload,
      },
    })
  } catch {
    // Duplicate — already processed
    return NextResponse.json({ ok: true })
  }

  const notificationId = payload.notification_id

  if (notificationId) {
    const updateData: Record<string, any> = {}

    if (payload.event === 'notification.displayed') {
      updateData.status = 'delivered'
      updateData.deliveredAt = new Date()
    } else if (payload.event === 'notification.clicked') {
      updateData.status = 'clicked'
      updateData.clickedAt = new Date()
    }

    if (Object.keys(updateData).length > 0) {
      await db.notificationSend.updateMany({
        where: { oneSignalId: notificationId },
        data: updateData,
      })
    }
  }

  await db.webhookEvent.update({
    where: { eventId },
    data: { processed: true, processedAt: new Date() },
  })

  return NextResponse.json({ ok: true })
}
