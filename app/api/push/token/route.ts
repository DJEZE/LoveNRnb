// Called by the native iOS/Android app to register or remove an FCM token.
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'
import { DevicePlatform } from '@prisma/client'

const registerBody = z.object({
  fcmToken: z.string().min(10),
  platform: z.nativeEnum(DevicePlatform),
  appVersion: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  const parsed = registerBody.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { fcmToken, platform, appVersion } = parsed.data

  await db.devicePushToken.upsert({
    where: { fcmToken },
    create: {
      fcmToken,
      platform,
      appVersion: appVersion ?? null,
      userId: session?.user?.id ?? null,
      isActive: true,
    },
    update: {
      isActive: true,
      userId: session?.user?.id ?? undefined,
      appVersion: appVersion ?? undefined,
    },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const { fcmToken } = await req.json()
  if (!fcmToken) return NextResponse.json({ error: 'Missing fcmToken' }, { status: 400 })

  await db.devicePushToken.updateMany({
    where: { fcmToken },
    data: { isActive: false },
  })

  return NextResponse.json({ ok: true })
}
