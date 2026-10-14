import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/server/db'
import { z } from 'zod'
import { nanoid } from 'nanoid'

const body = z.object({ amountDue: z.number().int().positive() })

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const parsed = body.safeParse(await req.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const application = await db.vendorApplication.findUnique({ where: { id: params.id } })
  if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const count = await db.vendorInvoice.count({ where: { applicationId: params.id } })
  const invoiceNumber = `VND-${Date.now().toString(36).toUpperCase()}-${(count + 1).toString().padStart(2, '0')}`

  const invoice = await db.vendorInvoice.create({
    data: {
      applicationId: params.id,
      invoiceNumber,
      amountDue: parsed.data.amountDue,
      amountPaid: 0,
      status: 'UNPAID',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  })

  return NextResponse.json({ ok: true, invoiceNumber: invoice.invoiceNumber })
}
