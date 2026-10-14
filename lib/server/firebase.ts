import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getMessaging } from 'firebase-admin/messaging'
import { db } from './db'
import { PushAudience } from '@prisma/client'

function getMessagingInstance() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Firebase credentials not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.')
    }

    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  }
  return getMessaging()
}

export interface PushPayload {
  title: string
  body: string
  imageUrl?: string | null
  destinationUrl?: string | null
  data?: Record<string, string>
}

// Send to a single FCM token
export async function sendToToken(token: string, payload: PushPayload): Promise<boolean> {
  try {
    await getMessagingInstance().send({
      token,
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl ?? undefined,
      },
      data: {
        ...(payload.destinationUrl ? { url: payload.destinationUrl } : {}),
        ...payload.data,
      },
      apns: {
        payload: { aps: { sound: 'default', badge: 1 } },
      },
      android: {
        notification: { sound: 'default', channelId: 'default' },
      },
    })
    return true
  } catch (err: any) {
    // Mark token stale on registration errors
    if (err?.errorInfo?.code === 'messaging/registration-token-not-registered') {
      await db.devicePushToken.updateMany({ where: { fcmToken: token }, data: { isActive: false } })
    }
    console.error('[FCM] sendToToken failed:', err?.errorInfo?.code ?? err?.message)
    return false
  }
}

// Send to multiple tokens (uses FCM batch API)
export async function sendToTokens(
  tokens: string[],
  payload: PushPayload
): Promise<{ success: number; failure: number }> {
  if (!tokens.length) return { success: 0, failure: 0 }

  // FCM sendEachForMulticast allows up to 500 tokens per call
  const chunks: string[][] = []
  for (let i = 0; i < tokens.length; i += 500) chunks.push(tokens.slice(i, i + 500))

  let success = 0
  let failure = 0
  const staleTokens: string[] = []

  for (const chunk of chunks) {
    const response = await getMessagingInstance().sendEachForMulticast({
      tokens: chunk,
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl ?? undefined,
      },
      data: {
        ...(payload.destinationUrl ? { url: payload.destinationUrl } : {}),
        ...payload.data,
      },
      apns: { payload: { aps: { sound: 'default', badge: 1 } } },
      android: { notification: { sound: 'default', channelId: 'default' } },
    })

    success += response.successCount
    failure += response.failureCount

    response.responses.forEach((r, i) => {
      if (!r.success && r.error?.code === 'messaging/registration-token-not-registered') {
        staleTokens.push(chunk[i])
      }
    })
  }

  // Clean up stale tokens
  if (staleTokens.length) {
    await db.devicePushToken.updateMany({
      where: { fcmToken: { in: staleTokens } },
      data: { isActive: false },
    })
  }

  return { success, failure }
}

// Resolve audience to FCM tokens
export async function getTokensForAudience(audience: PushAudience): Promise<string[]> {
  if (audience === 'TEST_ONLY') {
    // Only return tokens for users with SUPER_ADMIN or VENDOR_MANAGER roles
    const adminUsers = await db.userRole.findMany({
      where: { role: { in: ['SUPER_ADMIN', 'VENDOR_MANAGER'] } },
      select: { userId: true },
    })
    const ids = adminUsers.map((u) => u.userId)
    const tokens = await db.devicePushToken.findMany({
      where: { isActive: true, userId: { in: ids } },
      select: { fcmToken: true },
    })
    return tokens.map((t) => t.fcmToken)
  }

  if (audience === 'ALL') {
    const tokens = await db.devicePushToken.findMany({
      where: { isActive: true },
      select: { fcmToken: true },
    })
    return tokens.map((t) => t.fcmToken)
  }

  if (audience === 'MERCH_CUSTOMERS') {
    const orders = await db.merchandiseOrder.findMany({
      where: { status: { in: ['PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED'] }, userId: { not: null } },
      select: { userId: true },
      distinct: ['userId'],
    })
    const ids = orders.map((o) => o.userId!)
    const tokens = await db.devicePushToken.findMany({
      where: { isActive: true, userId: { in: ids } },
      select: { fcmToken: true },
    })
    return tokens.map((t) => t.fcmToken)
  }

  if (audience === 'APPROVED_VENDORS') {
    const apps = await db.vendorApplication.findMany({
      where: { status: 'APPROVED' },
      include: { business: { select: { userId: true } } },
    })
    const ids = apps.map((a) => a.business.userId)
    const tokens = await db.devicePushToken.findMany({
      where: { isActive: true, userId: { in: ids } },
      select: { fcmToken: true },
    })
    return tokens.map((t) => t.fcmToken)
  }

  if (audience === 'VENDORS_OUTSTANDING_BALANCE') {
    const invoices = await db.vendorInvoice.findMany({
      where: { status: 'UNPAID' },
      include: { application: { include: { business: { select: { userId: true } } } } },
    })
    const ids = [...new Set(invoices.map((i) => i.application.business.userId))]
    const tokens = await db.devicePushToken.findMany({
      where: { isActive: true, userId: { in: ids } },
      select: { fcmToken: true },
    })
    return tokens.map((t) => t.fcmToken)
  }

  // ARTIST_ANNOUNCEMENTS, HOUSTON_AREA — stored as user tag/preference
  // Return all active tokens as fallback until user tagging is implemented
  const tokens = await db.devicePushToken.findMany({
    where: { isActive: true },
    select: { fcmToken: true },
  })
  return tokens.map((t) => t.fcmToken)
}

// Transactional: send to a specific user's devices
export async function sendToUser(
  userId: string,
  payload: PushPayload
): Promise<{ success: number; failure: number }> {
  const tokens = await db.devicePushToken.findMany({
    where: { userId, isActive: true },
    select: { fcmToken: true },
  })
  if (!tokens.length) return { success: 0, failure: 0 }
  return sendToTokens(tokens.map((t) => t.fcmToken), payload)
}
