import * as OneSignal from '@onesignal/node-onesignal'
import { NotificationAudience, NotificationCategory } from '@prisma/client'

const APP_ID = process.env.ONESIGNAL_APP_ID ?? ''
const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY ?? ''

function getClient() {
  const config = OneSignal.createConfiguration({
    restApiKey: REST_API_KEY,
  })
  return new OneSignal.DefaultApi(config)
}

export interface SendOptions {
  title: string
  body: string
  imageUrl?: string | null
  destinationUrl?: string | null
  audience: NotificationAudience
  category: NotificationCategory
  externalUserIds?: string[]  // when targeting specific users
  scheduledAt?: Date | null
}

export interface SendResult {
  oneSignalId: string | null
  recipients: number
  errors: string[]
}

// Maps our audience enum to OneSignal segment names or filters
function buildAudienceTarget(audience: NotificationAudience, externalUserIds?: string[]) {
  if (externalUserIds && externalUserIds.length > 0) {
    return { include_external_user_ids: externalUserIds }
  }

  const SEGMENT_MAP: Partial<Record<NotificationAudience, string>> = {
    ALL_SUBSCRIBERS: 'Subscribed Users',
    MERCH_CUSTOMERS: 'Merch Customers',
    APPROVED_VENDORS: 'Approved Vendors',
    VENDORS_OUTSTANDING_BALANCE: 'Vendors Outstanding Balance',
    ARTIST_ANNOUNCEMENTS: 'Artist Announcements',
    FUTURE_EVENTS: 'Future Events',
    HOUSTON_AREA: 'Houston Area',
    VIP_TICKET_HOLDERS: 'VIP Ticket Holders',
    GA_TICKET_HOLDERS: 'GA Ticket Holders',
    TEST_ONLY: 'Test Segment',
  }

  const segment = SEGMENT_MAP[audience]
  if (segment) return { included_segments: [segment] }

  // Fallback: all subscribers
  return { included_segments: ['Subscribed Users'] }
}

export async function sendCampaign(opts: SendOptions): Promise<SendResult> {
  if (!APP_ID || !REST_API_KEY) {
    throw new Error('OneSignal credentials not configured (ONESIGNAL_APP_ID, ONESIGNAL_REST_API_KEY)')
  }

  const client = getClient()
  const audienceTarget = buildAudienceTarget(opts.audience, opts.externalUserIds)

  const notification: OneSignal.Notification = {
    app_id: APP_ID,
    headings: { en: opts.title },
    contents: { en: opts.body },
    ...audienceTarget,
  }

  if (opts.imageUrl) {
    notification.big_picture = opts.imageUrl
    notification.chrome_web_image = opts.imageUrl
  }

  if (opts.destinationUrl) {
    notification.url = opts.destinationUrl
  }

  if (opts.scheduledAt) {
    // OneSignal expects ISO 8601 with timezone
    notification.send_after = opts.scheduledAt.toISOString()
  }

  // Tag by category so we can filter analytics
  notification.data = { category: opts.category }

  const response = await client.createNotification(notification)

  return {
    oneSignalId: response.id ?? null,
    recipients: response.recipients ?? 0,
    errors: (response.errors as string[]) ?? [],
  }
}

export async function sendToUser(
  externalUserId: string,
  title: string,
  body: string,
  data?: Record<string, string>,
  url?: string
): Promise<SendResult> {
  if (!APP_ID || !REST_API_KEY) {
    console.warn('[OneSignal] Credentials not set — skipping push')
    return { oneSignalId: null, recipients: 0, errors: ['Credentials not configured'] }
  }

  const client = getClient()

  const notification: OneSignal.Notification = {
    app_id: APP_ID,
    include_external_user_ids: [externalUserId],
    headings: { en: title },
    contents: { en: body },
    channel_for_external_user_ids: 'push',
  }

  if (url) notification.url = url
  if (data) notification.data = data

  const response = await client.createNotification(notification)

  return {
    oneSignalId: response.id ?? null,
    recipients: response.recipients ?? 0,
    errors: (response.errors as string[]) ?? [],
  }
}

export async function cancelScheduledNotification(oneSignalId: string): Promise<void> {
  if (!APP_ID || !REST_API_KEY) return
  const client = getClient()
  await client.cancelNotification(APP_ID, oneSignalId)
}

export async function getNotificationStats(oneSignalId: string) {
  if (!APP_ID || !REST_API_KEY) return null
  const client = getClient()
  try {
    const result = await client.getNotification(APP_ID, oneSignalId)
    return {
      recipients: result.successful ?? 0,
      failed: result.failed ?? 0,
      errored: result.errored ?? 0,
      converted: result.converted ?? 0,
      remaining: result.remaining ?? 0,
    }
  } catch {
    return null
  }
}

export async function estimateAudience(audience: NotificationAudience): Promise<number> {
  // Returns an estimate — in production this would query the DB for segment counts
  // For now we return -1 (unknown) unless OneSignal API supports segment counts
  return -1
}
