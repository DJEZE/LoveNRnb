'use client'

import { Bell } from 'lucide-react'

type Props = {
  title: string
  body: string
  imageUrl: string | null
  audience?: string
}

export function NotificationPreview({ title, body, imageUrl, audience }: Props) {
  return (
    <div className="space-y-4">
      {/* Desktop Chrome-style preview */}
      <div>
        <p className="font-body text-2xs text-white/25 uppercase tracking-[0.15em] mb-2">Desktop (Chrome)</p>
        <div className="bg-[#2d2d2d] rounded-lg p-4 flex gap-3 shadow-xl max-w-sm">
          {/* Icon */}
          <div className="w-10 h-10 shrink-0 rounded bg-black flex items-center justify-center">
            <Bell size={18} className="text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate leading-tight">{title}</p>
            <p className="text-white/60 text-xs mt-0.5 leading-snug line-clamp-2">{body}</p>
            <p className="text-white/30 text-xs mt-1">lovenrnb.com</p>
          </div>
          {imageUrl && (
            <img src={imageUrl} alt="" className="w-12 h-12 rounded object-cover shrink-0" />
          )}
        </div>
      </div>

      {/* Mobile Android-style preview */}
      <div>
        <p className="font-body text-2xs text-white/25 uppercase tracking-[0.15em] mb-2">Android / Home Screen PWA</p>
        <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-xl max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-sm bg-black flex items-center justify-center">
              <Bell size={10} className="text-gold" />
            </div>
            <p className="text-white/40 text-xs">LoveNRnB · now</p>
          </div>
          <p className="text-white text-sm font-semibold leading-tight">{title}</p>
          <p className="text-white/60 text-xs mt-1 leading-snug line-clamp-3">{body}</p>
          {imageUrl && (
            <img src={imageUrl} alt="" className="w-full mt-3 rounded-lg object-cover max-h-32" />
          )}
        </div>
      </div>

      {/* Audience note */}
      {audience && (
        <div className="bg-surface-2 border border-white/10 p-4">
          <p className="font-body text-2xs text-white/30 uppercase tracking-[0.15em] mb-1">Target Audience</p>
          <p className="font-body text-sm text-white/70">{audience}</p>
        </div>
      )}

      {/* iPhone caveat */}
      <div className="border border-yellow-500/20 bg-yellow-500/5 p-4">
        <p className="font-body text-2xs text-yellow-500 uppercase tracking-[0.15em] mb-1">iPhone Note</p>
        <p className="font-body text-xs text-white/40 leading-relaxed">
          iPhone users must add LoveNRnB to their Home Screen via Safari before they can receive push notifications.
          Requires iOS 16.4+. Regular Safari on iPhone does not support web push.
        </p>
      </div>
    </div>
  )
}
