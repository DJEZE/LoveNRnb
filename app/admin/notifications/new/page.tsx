import type { Metadata } from 'next'
import { PushComposer } from '@/components/notifications/PushComposer'

export const metadata: Metadata = { title: 'New Campaign' }

export default function NewCampaignPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <a href="/admin/notifications" className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] hover:text-white transition-colors">
          ← Push Notifications
        </a>
        <h1 className="font-display font-black uppercase text-white text-4xl mt-3">New Campaign</h1>
      </div>
      <PushComposer />
    </div>
  )
}
