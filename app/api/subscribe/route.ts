import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// POST /api/subscribe
// Adds an email to your Klaviyo list.
//
// Required env vars (set in Vercel dashboard or .env.local):
//   KLAVIYO_API_KEY   — your private API key (Settings → API Keys)
//   KLAVIYO_LIST_ID   — the List ID to subscribe to (Lists & Segments)
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const apiKey = process.env.KLAVIYO_API_KEY
  const listId = process.env.KLAVIYO_LIST_ID

  if (!apiKey || !listId) {
    console.error('Missing KLAVIYO_API_KEY or KLAVIYO_LIST_ID env vars')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    // 1. Create / update the profile
    const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: { email },
        },
      }),
    })

    // 409 = profile already exists — that's fine, extract the id
    const profileData = await profileRes.json()
    const profileId =
      profileRes.status === 409
        ? profileData.errors[0].meta.duplicate_profile_id
        : profileData.data?.id

    if (!profileId) {
      throw new Error('Could not resolve profile ID')
    }

    // 2. Subscribe profile to list
    await fetch(`https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2024-02-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${apiKey}`,
      },
      body: JSON.stringify({
        data: [{ type: 'profile', id: profileId }],
      }),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Klaviyo subscribe error:', err)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}
