import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'
import { NotificationAudience, NotificationCategory } from '@prisma/client'

const body = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(1000),
  imageUrl: z.string().url().optional().nullable(),
  destinationUrl: z.string().optional().nullable(),
  category: z.nativeEnum(NotificationCategory),
  audience: z.nativeEnum(NotificationAudience),
  scheduledAt: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100)

  const campaigns = await db.notificationCampaign.findMany({
    where: status ? { status: status as any } : undefined,
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      creator: { select: { name: true, email: true } },
      _count: { select: { sends: true } },
    },
  })

  return NextResponse.json(campaigns)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const campaign = await db.notificationCampaign.create({
    data: {
      ...parsed.data,
      scheduledAt: parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null,
      createdBy: session.user.id,
    },
  })

  return NextResponse.json(campaign, { status: 201 })
}
