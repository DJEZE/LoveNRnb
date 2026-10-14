/**
 * Transactional notification triggers — called after key business events.
 * Fire-and-forget safe; errors are logged but never thrown.
 */

import { db } from './db'
import { sendToUser } from './firebase'

async function logAndSend(
  trigger: string,
  userId: string | null,
  resourceId: string | null,
  title: string,
  body: string,
  url?: string
) {
  try {
    if (userId) {
      await sendToUser(userId, { title, body, destinationUrl: url, data: { trigger } })
    }
    await db.pushTransactionLog.create({
      data: { trigger, userId, resourceId, title, body, status: 'sent' },
    })
  } catch (err: any) {
    console.error(`[notifications] ${trigger}:`, err?.message)
    try {
      await db.pushTransactionLog.create({
        data: { trigger, userId, resourceId, title, body, status: 'failed', error: String(err?.message) },
      })
    } catch {}
  }
}

// ─── Vendor ───────────────────────────────────────────────────────────────────

export function notifyVendorApplicationReceived(applicationId: string, userId: string) {
  logAndSend('vendor_application_received', userId, applicationId,
    'Application Received',
    'We got your LoveNRnB vendor application. Our team will follow up within 3–5 business days.')
}

export function notifyVendorApproved(applicationId: string, userId: string, businessName: string) {
  logAndSend('vendor_approved', userId, applicationId,
    'You\'re Approved! 🎊',
    `${businessName} has been approved for LoveNRnB Fest. Check your dashboard for next steps.`)
}

export function notifyVendorPaymentRequired(applicationId: string, userId: string, amountCents: number) {
  const dollars = (amountCents / 100).toFixed(2)
  logAndSend('vendor_payment_required', userId, applicationId,
    'Payment Required',
    `Your vendor invoice of $${dollars} is ready. Complete payment to secure your booth.`)
}

export function notifyVendorPaymentConfirmed(applicationId: string, userId: string) {
  logAndSend('vendor_payment_confirmed', userId, applicationId,
    'Payment Confirmed ✅',
    'Your LoveNRnB vendor payment was received. You\'re all set!')
}

// ─── Merch ────────────────────────────────────────────────────────────────────

export function notifyOrderConfirmed(orderId: string, userId: string | null, orderNumber: string) {
  logAndSend('order_confirmed', userId, orderId,
    'Order Confirmed',
    `Your order ${orderNumber} is confirmed. We'll notify you when it ships.`)
}

export function notifyOrderShipped(orderId: string, userId: string | null, orderNumber: string) {
  logAndSend('order_shipped', userId, orderId,
    'Your Order Shipped 📦',
    `Order ${orderNumber} is on its way!`)
}
