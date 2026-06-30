import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// POST /api/subscribe
// Adds an email to your Brevo (formerly Sendinblue) contact list.
//
// Required env vars (set in Vercel dashboard or .env.local):
//   BREVO_API_KEY   — Brevo dashboard → SMTP & API → API Keys
//   BREVO_LIST_ID   — Brevo dashboard → Contacts → Lists → pick your list → ID in the URL
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const { email, name, phone } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID

  if (!apiKey || !listId) {
    console.error('Missing BREVO_API_KEY or BREVO_LIST_ID env vars')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: { FIRSTNAME: name ?? '', SMS: phone ?? '' },
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    })

    const body = res.status !== 204 ? await res.json().catch(() => null) : null
    console.log('Brevo response:', res.status, JSON.stringify(body))

    if (!res.ok) {
      const alreadyExists = body?.code === 'duplicate_parameter'
      if (!alreadyExists) throw new Error(body?.message ?? 'Brevo error')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Brevo subscribe error:', err)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
