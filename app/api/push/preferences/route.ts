import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const prefs = await db.notificationPreference.findUnique({
    where: { userId: session.user.id },
  })

  return NextResponse.json(prefs ?? {
    pushEnabled: true,
    marketingPush: true,
    vendorOpsPush: true,
    festivalUpdatePush: true,
    artistAnnouncePush: true,
  })
}

const body = z.object({
  pushEnabled: z.boolean().optional(),
  marketingPush: z.boolean().optional(),
  vendorOpsPush: z.boolean().optional(),
  festivalUpdatePush: z.boolean().optional(),
  artistAnnouncePush: z.boolean().optional(),
})

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const prefs = await db.notificationPreference.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, ...parsed.data },
    update: { ...parsed.data },
  })

  return NextResponse.json(prefs)
}
