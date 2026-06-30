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
  const { email } = await req.json()

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
        listIds: [Number(listId)],
        updateEnabled: true, // update existing contact instead of throwing error
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Brevo API error:', JSON.stringify(err))
      const alreadyExists = err?.code === 'duplicate_parameter'
      if (!alreadyExists) throw new Error(err?.message ?? 'Brevo error')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Brevo subscribe error:', err)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
