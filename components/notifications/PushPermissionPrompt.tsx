'use client'

import { useEffect, useState } from 'react'
import { Bell, Smartphone, X } from 'lucide-react'

type State = 'idle' | 'checking' | 'needs_ios_install' | 'requesting' | 'granted' | 'denied' | 'unsupported'

function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isIOSStandalone() {
  return isIOS() && (navigator as any).standalone === true
}

function isPushSupported() {
  return typeof window !== 'undefined' && 'PushManager' in window && 'serviceWorker' in navigator
}

export function PushPermissionPrompt() {
  const [state, setState] = useState<State>('idle')
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem('push_dismissed') === '1') {
        setDismissed(true)
        return
      }
    } catch {}

    if (!isPushSupported()) {
      if (isIOS() && !isIOSStandalone()) {
        setState('needs_ios_install')
      } else {
        setState('unsupported')
      }
      return
    }

    if (Notification.permission === 'granted') {
      setState('granted')
      return
    }
    if (Notification.permission === 'denied') {
      setState('denied')
      return
    }

    setState('idle')
  }, [])

  function dismiss() {
    try { localStorage.setItem('push_dismissed', '1') } catch {}
    setDismissed(true)
  }

  async function requestPermission() {
    setState('requesting')
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        // OneSignal SDK handles actual subscription — just record state
        setState('granted')
        try { localStorage.setItem('push_granted', '1') } catch {}
      } else {
        setState('denied')
      }
    } catch {
      setState('denied')
    }
  }

  if (dismissed || state === 'unsupported' || state === 'granted') return null

  if (state === 'needs_ios_install') {
    return (
      <div className="relative bg-surface-2 border border-white/10 p-5 rounded-none">
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/30 hover:text-white">
          <X size={16} />
        </button>
        <div className="flex gap-4">
          <Smartphone size={20} className="text-gold shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-body text-sm text-white font-semibold">Get LoveNRnB Notifications on iPhone</p>
            <p className="font-body text-xs text-white/50 leading-relaxed">
              To receive push notifications on iPhone, add this site to your Home Screen:
            </p>
            <ol className="font-body text-xs text-white/50 space-y-1 list-decimal list-inside">
              <li>Tap the Share button in Safari</li>
              <li>Tap <strong className="text-white/70">Add to Home Screen</strong></li>
              <li>Open the app from your Home Screen</li>
              <li>Tap Enable Notifications when prompted</li>
            </ol>
            <p className="font-body text-2xs text-white/30">Requires iOS 16.4 or later.</p>
          </div>
        </div>
      </div>
    )
  }

  if (state === 'denied') {
    return (
      <div className="relative bg-surface-2 border border-white/10 p-4">
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/30 hover:text-white">
          <X size={14} />
        </button>
        <p className="font-body text-xs text-white/40 pr-6">
          Notifications are blocked. Enable them in your browser settings to stay updated on lineup announcements and more.
        </p>
      </div>
    )
  }

  if (state === 'idle') {
    return (
      <div className="relative bg-surface-2 border border-white/10 p-5">
        <button onClick={dismiss} className="absolute top-3 right-3 text-white/30 hover:text-white">
          <X size={16} />
        </button>
        <div className="flex gap-4">
          <Bell size={20} className="text-gold shrink-0 mt-0.5" />
          <div className="space-y-3">
            <div>
              <p className="font-body text-sm text-white font-semibold">Stay in the Loop</p>
              <p className="font-body text-xs text-white/50 mt-1 leading-relaxed">
                Get notified about lineup announcements, merch drops, and festival updates. You can opt out any time.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={requestPermission}
                disabled={state !== 'idle'}
                className="h-8 px-4 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
              >
                {state === 'requesting' ? 'Enabling…' : 'Enable Notifications'}
              </button>
              <button
                onClick={dismiss}
                className="h-8 px-4 border border-white/15 text-white/40 font-body text-xs uppercase tracking-[0.15em] hover:text-white transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
