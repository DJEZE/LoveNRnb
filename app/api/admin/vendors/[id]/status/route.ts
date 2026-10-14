import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { ApplicationStatus } from '@prisma/client'
import { z } from 'zod'

const body = z.object({
  toStatus: z.nativeEnum(ApplicationStatus),
  note: z.string().optional(),
})

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const application = await db.vendorApplication.findUnique({ where: { id: params.id } })
  if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { toStatus, note } = parsed.data

  await db.$transaction([
    db.vendorApplication.update({
      where: { id: params.id },
      data: { status: toStatus },
    }),
    db.vendorStatusLog.create({
      data: {
        applicationId: params.id,
        fromStatus: application.status,
        toStatus,
        note: note ?? null,
        changedById: session.user?.id ?? 'admin',
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
