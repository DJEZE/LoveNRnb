/**
 * Automated notification triggers.
 * Called from API routes after key business events.
 * All functions are fire-and-forget safe — they log errors but never throw.
 */

import { db } from './db'
import { sendToUser } from './onesignal'
import { NotificationCategory } from '@prisma/client'

async function logAndSend(
  trigger: string,
  category: NotificationCategory,
  userId: string | null,
  resourceId: string | null,
  title: string,
  body: string,
  url?: string
) {
  try {
    // Check user preference before sending
    if (userId) {
      const prefs = await db.notificationPreference.findUnique({ where: { userId } })
      if (prefs) {
        if (!prefs.pushEnabled) return
        if (category === 'MARKETING' && !prefs.marketingPush) return
        if (category === 'VENDOR_OPS' && !prefs.vendorOpsPush) return
        if (category === 'FESTIVAL_UPDATE' && !prefs.festivalUpdatePush) return
      }
    }

    let oneSignalId: string | null = null
    if (userId) {
      const result = await sendToUser(userId, title, body, { trigger, category }, url)
      oneSignalId = result.oneSignalId
    }

    await db.automatedNotificationLog.create({
      data: { trigger, category, userId, resourceId, title, body, oneSignalId, status: 'sent' },
    })
  } catch (err: any) {
    console.error(`[notifications] ${trigger} failed:`, err?.message)
    try {
      await db.automatedNotificationLog.create({
        data: { trigger, category, userId, resourceId, title, body, status: 'failed', error: String(err?.message) },
      })
    } catch {}
  }
}

// ─── Vendor Operations ────────────────────────────────────────────────────────

export async function notifyVendorApplicationReceived(applicationId: string, userId: string) {
  await logAndSend(
    'vendor_application_received',
    'VENDOR_OPS',
    userId,
    applicationId,
    'Application Received 🎉',
    'We received your LoveNRnB vendor application. Our team will review it shortly.',
    '/vendor/dashboard'
  )
}

export async function notifyVendorApproved(applicationId: string, userId: string, businessName: string) {
  await logAndSend(
    'vendor_approved',
    'VENDOR_OPS',
    userId,
    applicationId,
    'You\'re Approved! 🎊',
    `Congratulations! ${businessName} has been approved for LoveNRnB Fest. Check your dashboard for next steps.`,
    '/vendor/dashboard'
  )
}

export async function notifyVendorPaymentRequired(applicationId: string, userId: string, amount: number) {
  const dollars = (amount / 100).toFixed(2)
  await logAndSend(
    'vendor_payment_required',
    'VENDOR_OPS',
    userId,
    applicationId,
    'Payment Required',
    `Your vendor invoice of $${dollars} is ready. Complete payment to secure your booth.`,
    '/vendor/dashboard'
  )
}

export async function notifyVendorPaymentConfirmed(applicationId: string, userId: string) {
  await logAndSend(
    'vendor_payment_confirmed',
    'VENDOR_OPS',
    userId,
    applicationId,
    'Payment Confirmed ✅',
    'Your LoveNRnB vendor payment was received. You\'re all set!',
    '/vendor/dashboard'
  )
}

export async function notifyVendorBalanceDue(applicationId: string, userId: string, amount: number) {
  const dollars = (amount / 100).toFixed(2)
  await logAndSend(
    'vendor_balance_reminder',
    'VENDOR_OPS',
    userId,
    applicationId,
    'Balance Due Reminder',
    `You have an outstanding balance of $${dollars} on your LoveNRnB vendor account.`,
    '/vendor/dashboard'
  )
}

export async function notifyVendorSetupInstructions(applicationId: string, userId: string) {
  await logAndSend(
    'vendor_setup_instructions',
    'VENDOR_OPS',
    userId,
    applicationId,
    'Festival Setup Instructions',
    'Your LoveNRnB Fest setup instructions are ready. Review load-in times and booth details.',
    '/vendor/dashboard'
  )
}

// ─── Merchandise ──────────────────────────────────────────────────────────────

export async function notifyOrderConfirmed(orderId: string, userId: string | null, orderNumber: string) {
  await logAndSend(
    'order_confirmed',
    'MERCH_TRANSACTIONAL',
    userId,
    orderId,
    'Order Confirmed',
    `Your order ${orderNumber} is confirmed. We\'ll notify you when it ships.`,
    `/account/orders/${orderId}`
  )
}

export async function notifyOrderShipped(orderId: string, userId: string | null, orderNumber: string) {
  await logAndSend(
    'order_shipped',
    'MERCH_TRANSACTIONAL',
    userId,
    orderId,
    'Your Order Shipped 📦',
    `Order ${orderNumber} is on its way! Tap to track your shipment.`,
    `/account/orders/${orderId}`
  )
}

export async function notifyOrderReady(orderId: string, userId: string | null, orderNumber: string) {
  await logAndSend(
    'order_ready_pickup',
    'MERCH_TRANSACTIONAL',
    userId,
    orderId,
    'Ready for Pickup',
    `Order ${orderNumber} is ready for pickup at the festival.`,
    `/account/orders/${orderId}`
  )
}

// ─── Festival Marketing ───────────────────────────────────────────────────────

// These are triggered via the campaign system, not directly from events.
// Listed here as reference trigger names for the automated log.
export const FESTIVAL_TRIGGERS = {
  ARTIST_ANNOUNCEMENT: 'artist_announcement',
  SCHEDULE_RELEASE: 'schedule_release',
  MERCH_DROP: 'merch_drop',
  PRESALE_ACCESS: 'presale_access',
  FESTIVAL_REMINDER: 'festival_reminder',
  EVENT_UPDATE: 'event_update',
} as const
