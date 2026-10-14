'use client'

import { useEffect } from 'react'

// Initializes OneSignal web push SDK.
// Must be rendered inside a client boundary, ideally in app/layout.tsx.
export function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID
    if (!appId) return

    // Load OneSignal SDK
    const script = document.createElement('script')
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js'
    script.defer = true
    script.onload = () => {
      window.OneSignalDeferred = window.OneSignalDeferred ?? []
      window.OneSignalDeferred.push(async function (OneSignal: any) {
        await OneSignal.init({
          appId,
          serviceWorkerPath: '/OneSignalSDKWorker.js',
          // Prompt is manual — we use PushPermissionPrompt component
          promptOptions: { slidedown: { prompts: [] } },
          notifyButton: { enable: false },
          allowLocalhostAsSecureOrigin: process.env.NODE_ENV === 'development',
        })

        // Record subscription ID when user subscribes
        OneSignal.User.PushSubscription.addEventListener('change', async (event: any) => {
          if (event.current.id && event.current.optedIn) {
            try {
              await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  oneSignalId: event.current.id,
                  deviceType: /mobile/i.test(navigator.userAgent) ? 'mobile_web' : 'web',
                  browserName: navigator.userAgent.split('/')[0],
                  platform: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
                }),
              })
            } catch {}
          }
        })
      })
    }
    document.head.appendChild(script)
  }, [])

  return null
}

declare global {
  interface Window {
    OneSignalDeferred?: any[]
  }
}
