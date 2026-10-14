import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'

const body = z.object({ boothIdentifier: z.string().min(1) })

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  await db.vendorApplication.update({
    where: { id: params.id },
    data: { boothIdentifier: parsed.data.boothIdentifier },
  })

  return NextResponse.json({ ok: true })
}
