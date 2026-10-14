import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/server/db'
import { VendorCategory } from '@prisma/client'
import { notifyVendorApplicationReceived } from '@/lib/server/notifications'

const schema = z.object({
  businessName: z.string().min(2).max(200),
  contactName: z.string().min(2).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(7).max(30),
  website: z.string().url().max(500).optional().or(z.literal('')),
  instagram: z.string().max(100).optional(),
  category: z.nativeEnum(VendorCategory),
  description: z.string().min(10).max(5000),
  spaceRequirements: z.string().max(2000).optional(),
  electricityNeeded: z.boolean().default(false),
  equipmentNotes: z.string().max(2000).optional(),
  activationDesc: z.string().max(5000).optional(),
  permitInfo: z.string().max(2000).optional(),
  additionalNotes: z.string().max(5000).optional(),
  agreeToTerms: z.literal(true, { errorMap: () => ({ message: 'Terms must be accepted' }) }),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data

  try {
    // Find the upcoming event to associate the application with
    const event = await db.event.findFirst({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
    })

    if (!event) {
      // No upcoming event configured — still accept but log warning
      console.warn('No upcoming event found for vendor application. Using fallback.')
    }

    // Find or create the vendor business record (keyed by email)
    let business = await db.vendorBusiness.findFirst({
      where: { email: data.email },
    })

    if (!business) {
      // Create a placeholder user account if one doesn't exist
      let user = await db.user.findUnique({ where: { email: data.email } })

      if (!user) {
        user = await db.user.create({
          data: {
            email: data.email,
            name: data.contactName,
            phone: data.phone,
          },
        })

        // Assign vendor role
        await db.userRole.create({
          data: { userId: user.id, role: 'VENDOR' },
        })
      }

      business = await db.vendorBusiness.create({
        data: {
          userId: user.id,
          businessName: data.businessName,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          website: data.website || null,
          instagram: data.instagram || null,
        },
      })
    }

    // Create the application
    const application = await db.vendorApplication.create({
      data: {
        eventId: event?.id ?? 'pending',
        businessId: business.id,
        category: data.category,
        status: 'SUBMITTED',
        description: data.description,
        spaceRequirements: data.spaceRequirements || null,
        electricityNeeded: data.electricityNeeded,
        equipmentNotes: data.equipmentNotes || null,
        activationDesc: data.activationDesc || null,
        permitInfo: data.permitInfo || null,
        additionalNotes: data.additionalNotes || null,
        submittedAt: new Date(),
      },
    })

    // Record agreement acceptance
    await db.vendorAgreement.create({
      data: {
        applicationId: application.id,
        agreementVersion: '2026-v1',
        ipAddress: req.headers.get('x-forwarded-for') ?? req.ip ?? null,
        userAgent: req.headers.get('user-agent') ?? null,
      },
    })

    // Log the status change
    await db.vendorStatusLog.create({
      data: {
        applicationId: application.id,
        toStatus: 'SUBMITTED',
        changedById: 'system',
        note: 'Application submitted by vendor',
      },
    })

    // Send notification email via Brevo if configured
    await sendVendorNotification(data.email, data.contactName, data.businessName, data.category)

    // Fire-and-forget push notification
    notifyVendorApplicationReceived(application.id, user.id)

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 201 })
  } catch (err) {
    console.error('Vendor application error:', err)
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
  }
}

async function sendVendorNotification(email: string, contactName: string, businessName: string, category: string) {
  const apiKey = process.env.BREVO_API_KEY
  const notifyEmail = process.env.BREVO_NOTIFY_EMAIL
  const senderEmail = process.env.BREVO_SENDER_EMAIL

  if (!apiKey || !senderEmail) return

  const categoryLabel: Record<string, string> = {
    FOOD: 'Food Vendor',
    RETAIL: 'Retail Vendor',
    MERCHANDISE: 'Merchandise Vendor',
    LIFESTYLE: 'Lifestyle Brand',
    BRAND_ACTIVATION: 'Brand Activation',
    PREMIUM_ACTIVATION: 'Premium Activation',
    OTHER: 'Other',
  }

  // Notify ops team
  if (notifyEmail) {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify({
        sender: { name: 'LoveNRnB Platform', email: senderEmail },
        to: [{ email: notifyEmail }],
        subject: `New Vendor Application — ${businessName} (${categoryLabel[category] ?? category})`,
        htmlContent: `
          <div style="background:#000;padding:32px;font-family:sans-serif;color:#fff">
            <p style="color:#CC0000;font-size:11px;letter-spacing:0.3em;text-transform:uppercase">LoveNRnB Vendor Portal</p>
            <h2 style="margin:8px 0 24px">New Application Received</h2>
            <table style="border-collapse:collapse;width:100%;max-width:480px">
              <tr><td style="padding:6px 12px;color:#999;font-size:13px">Business</td><td style="padding:6px 12px;font-size:13px">${businessName}</td></tr>
              <tr><td style="padding:6px 12px;color:#999;font-size:13px">Contact</td><td style="padding:6px 12px;font-size:13px">${contactName}</td></tr>
              <tr><td style="padding:6px 12px;color:#999;font-size:13px">Email</td><td style="padding:6px 12px;font-size:13px">${email}</td></tr>
              <tr><td style="padding:6px 12px;color:#999;font-size:13px">Category</td><td style="padding:6px 12px;font-size:13px">${categoryLabel[category] ?? category}</td></tr>
            </table>
            <p style="margin-top:24px;color:#CC0000;font-size:12px">Review in the admin dashboard → Vendors</p>
          </div>`,
      }),
    }).catch(() => {})
  }

  // Confirm to applicant
  await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'api-key': apiKey },
    body: JSON.stringify({
      sender: { name: 'LoveNRnB Fest', email: senderEmail },
      to: [{ email, name: contactName }],
      subject: 'Your LoveNRnB Vendor Application Was Received',
      htmlContent: `
        <div style="background:#000;padding:32px;font-family:sans-serif;color:#fff">
          <p style="color:#CC0000;font-size:11px;letter-spacing:0.3em;text-transform:uppercase">LoveNRnB Fest · Nov 21, 2026</p>
          <h2 style="margin:8px 0 16px">Application Received, ${contactName}</h2>
          <p style="color:#999;font-size:14px;line-height:1.7">We received your vendor application for <strong style="color:#fff">${businessName}</strong>. Our team will review it and follow up within 3–5 business days.</p>
          <p style="color:#999;font-size:14px;line-height:1.7;margin-top:12px">If you have questions, reply to this email or reach us at <a href="mailto:vendors@lovenrnb.com" style="color:#CC0000">vendors@lovenrnb.com</a>.</p>
          <p style="margin-top:32px;color:#555;font-size:12px">LoveNRnB · Houston, TX · lovenrnb.com</p>
        </div>`,
    }),
  }).catch(() => {})
}
