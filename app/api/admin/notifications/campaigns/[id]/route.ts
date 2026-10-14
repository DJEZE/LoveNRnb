import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'
import { PushAudience } from '@prisma/client'

const body = z.object({
  title: z.string().min(1).max(200).optional(),
  body: z.string().min(1).max(1000).optional(),
  imageUrl: z.string().url().optional().nullable(),
  destinationUrl: z.string().optional().nullable(),
  audience: z.nativeEnum(PushAudience).optional(),
  scheduledAt: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.pushCampaign.findUnique({
    where: { id: params.id },
    include: {
      creator: { select: { name: true, email: true } },
      sends: { orderBy: { sentAt: 'desc' }, take: 50 },
    },
  })

  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(campaign)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaign = await db.pushCampaign.findUnique({ where: { id: params.id } })
  if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (campaign.status === 'SENT' || campaign.status === 'CANCELLED') {
    return NextResponse.json({ error: `Cannot edit a ${campaign.status.toLowerCase()} campaign` }, { status: 400 })
  }

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const updated = await db.pushCampaign.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      scheduledAt: parsed.data.scheduledAt !== undefined
        ? parsed.data.scheduledAt ? new Date(parsed.data.scheduledAt) : null
        : undefined,
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await db.pushCampaign.update({
    where: { id: params.id },
    data: { status: 'CANCELLED' },
  })

  return NextResponse.json({ ok: true })
}
