'use client'

import { useState } from 'react'

type Sport = 'Football' | 'Basketball' | 'Both'

interface WaitlistFormProps {
  variant: 'hero' | 'section'
  queueCount?: number
}

export default function WaitlistForm({ variant, queueCount }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [sport, setSport] = useState<Sport>('Football')
  const [otherSport, setOtherSport] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorIsDuplicate, setErrorIsDuplicate] = useState(false)
  const [position, setPosition] = useState<number | null>(null)

  const displayBase = queueCount ?? 0

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setErrorIsDuplicate(false)
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: variant === 'section' ? firstName : undefined,
          sportPreference: sport.toUpperCase(),
          otherSport: otherSport || undefined,
        }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setErrorIsDuplicate(true)
        setError(data.message || "You're already on the waitlist!")
        return
      }
      if (!res.ok) { setError(data.message || 'Something went wrong.'); return }
      setPosition(data.position)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (position !== null) {
    const displayPosition = position.toLocaleString()
    return (
      <div className="py-2">
        <div className="text-5xl mb-4">🏆</div>
        <p
          className="text-5xl text-gradient mb-2 leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          YOU&apos;RE #{displayPosition} IN LINE
        </p>
        <hr style={{ borderColor: 'var(--border)', margin: '16px 0' }} />
        <div className="flex flex-col gap-2.5">
          {[
            { icon: '📱', text: 'Follow us for live updates' },
            { icon: '🗣', text: 'Tell a friend — move up the list' },
            { icon: '📧', text: 'Check your inbox for confirmation' },
          ].map(({ icon, text }) => (
            <span
              key={text}
              className="text-xs flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              <span>{icon}</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div>
        <form onSubmit={submit} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            />
            <button
              type="submit"
              disabled={loading}
              className="shimmer-btn px-5 py-2.5 rounded-lg text-sm font-semibold text-[#07090F] whitespace-nowrap transition-opacity disabled:opacity-50"
            >
              {loading ? '...' : 'Get Early Access'}
            </button>
          </div>
          {error && (
            <p
              className="mt-2 text-xs"
              style={{ color: errorIsDuplicate ? 'rgba(212, 160, 23, 0.6)' : '#f87171' }}
            >
              {error}
            </p>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block flex-shrink-0" />
            EU Regulated
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            🛡 Licensed &amp; Secure
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            🎮 Free in beta
          </span>
        </div>

        <p className="mt-2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {displayBase > 0 ? `Join ${displayBase.toLocaleString()}+ fans already waiting` : 'Be among the first to get access'}
        </p>
      </div>
    )
  }

  // Section variant
  return (
    <form onSubmit={submit} className="space-y-3 w-full max-w-sm">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
        required
        className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      />
      <div className="flex gap-2">
        {(['Football', 'Basketball', 'Both'] as Sport[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSport(s)}
            className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors"
            style={
              sport === s
                ? { background: 'var(--gold-light)', color: '#07090F' }
                : { background: 'var(--surface)', border: '1px solid var(--border)', color: '#94a3b8' }
            }
          >
            {s === 'Football' ? '⚽ Football' : s === 'Basketball' ? '🏀 Basketball' : '🏆 Both'}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={otherSport}
        onChange={(e) => setOtherSport(e.target.value)}
        placeholder="Any other sport you'd like to see? (optional)"
        className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      />
      {error && (
        <p
          className="text-xs"
          style={{ color: errorIsDuplicate ? 'rgba(212, 160, 23, 0.6)' : '#f87171' }}
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="shimmer-btn w-full py-2.5 rounded-lg text-sm font-semibold text-[#07090F] transition-opacity disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Secure My Spot →'}
      </button>
      {displayBase > 0 && (
        <p className="text-xs font-mono text-center" style={{ color: 'rgba(212, 160, 23, 0.6)' }}>
          ⚡ {displayBase.toLocaleString()} people ahead of you — join now
        </p>
      )}
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
        No spam. No payment. Unsubscribe anytime.
      </p>
    </form>
  )
}
