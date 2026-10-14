'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    })
    if (result?.error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      window.location.href = callbackUrl
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 px-4 py-3 text-center">
          {error}
        </p>
      )}
      <div className="space-y-3">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="w-full h-11 px-4 bg-surface-2 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
        />
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          className="w-full h-11 px-4 bg-surface-2 border border-white/15 text-white text-sm font-body placeholder:text-white/25 focus:outline-none focus:border-gold"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11 bg-gold hover:bg-gold/80 text-white font-body text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-50"
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
