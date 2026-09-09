import { NextRequest, NextResponse } from 'next/server'

// POST /api/inquiry
// Handles sponsorship and investor inquiry form submissions.
//
// To receive email notifications, add these env vars in Vercel:
//   BREVO_API_KEY        — your existing Brevo key
//   BREVO_NOTIFY_EMAIL   — the address that receives submissions (e.g. partnerships@lovenrnb.com)
//   BREVO_SENDER_EMAIL   — a verified sender in your Brevo account (same domain, e.g. noreply@lovenrnb.com)
//
// Without those vars the submission is still logged to Vercel's function logs.

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { type, email, name, ...fields } = body

  if (!type || !email || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const label = type === 'investor' ? 'Investor Inquiry' : 'Sponsorship Inquiry'
  console.log(`[${label}] from ${name} <${email}>`, fields)

  const apiKey = process.env.BREVO_API_KEY
  const notifyEmail = process.env.BREVO_NOTIFY_EMAIL
  const senderEmail = process.env.BREVO_SENDER_EMAIL

  if (apiKey && notifyEmail && senderEmail) {
    const rows = Object.entries({ name, email, ...fields })
      .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#999;font-size:13px;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#fff;font-size:13px">${v ?? '—'}</td></tr>`)
      .join('')

    const htmlContent = `
      <div style="background:#000;padding:32px;font-family:sans-serif">
        <p style="color:#CC0000;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px">LoveNRnB Fest</p>
        <h2 style="color:#fff;margin:0 0 24px;font-size:22px">${label}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          ${rows}
        </table>
      </div>`

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'LoveNRnB Website', email: senderEmail },
        to: [{ email: notifyEmail }],
        subject: `${label} — ${name}`,
        htmlContent,
      }),
    }).catch((err) => console.error('Brevo send error:', err))
  }

  return NextResponse.json({ success: true })
}
