'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const PLAN_LABELS: Record<string, string> = {
  v2_tool:   'Equity Terminal',
  v2_course: 'Stock School',
  v2_combo:  'Equity Terminal + Stock School',
  full:      'Full Meridian Access',
}

export default function ActivatePage() {
  const router = useRouter()

  const [key, setKey]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState<{
    plan: string
    products: string[]
  } | null>(null)

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    if (!key.trim()) return
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.')
        setLoading(false)
        return
      }

      setSuccess({ plan: data.plan, products: data.products })
    } catch {
      setError('Connection error. Check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    const planLabel = PLAN_LABELS[success.plan] || success.plan
    return (
      <div className="activate-page">
        <div className="dash-body" style={{ maxWidth: 660, margin: '0 auto' }}>
          <div className="activate-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 44, color: 'var(--green)', marginBottom: 20 }}>◎</div>
            <h1 className="activate-heading" style={{ textAlign: 'center', marginBottom: 12 }}>
              You&apos;re in.
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 28 }}>
              Your key is linked. You now have access to{' '}
              <strong style={{ color: 'var(--text-1)' }}>{planLabel}</strong>.
              Everything is ready on your dashboard.
            </p>
            <div className="success-box" style={{ marginBottom: 24, textAlign: 'left' }}>
              <div className="success-box-title">Products unlocked</div>
              <div className="success-box-text">
                {success.products.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: 'var(--green)' }}>✓</span>
                    <span style={{ textTransform: 'capitalize' }}>
                      {p === 'terminal' ? 'Equity Terminal'
                       : p === 'course' ? 'Stock School'
                       : p === 'dictionary' ? 'MoneySpeak'
                       : p === 'bizbooks' ? 'BizBooks'
                       : p}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/dashboard')}
            >
              Go to my dashboard →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="activate-page">
      <div className="dash-body" style={{ maxWidth: 660, margin: '0 auto' }}>

        {/* Back link */}
        <Link href="/dashboard" className="activate-back">
          ← Back to dashboard
        </Link>

        <div className="activate-card">
          {/* Heading */}
          <h1 className="activate-heading">Activate your access.</h1>
          <p className="activate-sub">
            Drop your Meridian key here.{' '}
            <strong>You got it in your purchase confirmation email</strong> — subject line:
            &ldquo;Your Meridian access is ready.&rdquo;
          </p>

          <form onSubmit={handleActivate}>
            <div className="form-group">
              <label className="form-label" htmlFor="key">
                Your Meridian key
              </label>
              <input
                id="key"
                type="text"
                className="form-input key-input"
                placeholder="e.g. ABcDef-12345-XyZqRs-..."
                value={key}
                onChange={e => setKey(e.target.value)}
                required
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
              <div className="form-error">
                {error}
              </div>
            </div>

            {/* Help text */}
            <div style={{
              padding: '12px 14px',
              background: 'rgba(58,84,112,0.15)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              marginBottom: 20,
              fontSize: 13,
              color: 'var(--text-3)',
              lineHeight: 1.65,
            }}>
              <strong style={{ color: 'var(--text-2)', display: 'block', marginBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Where is my key?
              </strong>
              Check the email you used to buy on Selar.
              The key was in the subject line &ldquo;Your Meridian access is ready.&rdquo;
              It looks like: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold)', fontSize: 12 }}>ABcDef-12Rsx-7hJqWp-...</span>
              <br /><br />
              Can&apos;t find it? Email{' '}
              <a href="mailto:hello@meridianng.com" style={{ color: 'var(--text-2)' }}>
                hello@meridianng.com
              </a>{' '}
              and we will sort it out quickly.
            </div>

            <button
              type="submit"
              className={`btn btn-primary${loading ? ' btn-loading' : ''}`}
              disabled={loading || !key.trim()}
            >
              {loading ? '' : 'Unlock my products →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
