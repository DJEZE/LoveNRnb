import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'

const body = z.object({
  oneSignalId: z.string().min(1),
  deviceType: z.string().optional(),
  browserName: z.string().optional(),
  platform: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { oneSignalId, deviceType, browserName, platform } = parsed.data

  await db.pushSubscription.upsert({
    where: { oneSignalId },
    create: {
      oneSignalId,
      userId: session?.user?.id ?? null,
      deviceType: deviceType ?? null,
      browserName: browserName ?? null,
      platform: platform ?? null,
      isActive: true,
      lastSeenAt: new Date(),
    },
    update: {
      isActive: true,
      userId: session?.user?.id ?? undefined,
      lastSeenAt: new Date(),
      unsubscribedAt: null,
    },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { oneSignalId } = await req.json()
  if (!oneSignalId) return NextResponse.json({ error: 'Missing oneSignalId' }, { status: 400 })

  await db.pushSubscription.updateMany({
    where: { oneSignalId },
    data: { isActive: false, unsubscribedAt: new Date() },
  })

  return NextResponse.json({ ok: true })
}
