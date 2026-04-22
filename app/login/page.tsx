'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (authError) {
      setError(
        authError.message.includes('Invalid login')
          ? 'Email or password is wrong. Try again.'
          : authError.message
      )
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span className="auth-logo-mark">◈</span>
          <div className="auth-logo-text">
            <span className="auth-logo-name">MERIDIAN</span>
            <span className="auth-logo-sub">Finance in Plain English</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="auth-heading">Welcome back.</h1>
        <p className="auth-sub">Your financial education is waiting.</p>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="sys-msg sys-error">{error}</div>
          )}

          <div style={{ marginTop: 24 }}>
            <button
              type="submit"
              className={`btn btn-primary${loading ? ' btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? '' : 'Sign in →'}
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="auth-link-row">
          New here?{' '}
          <Link href="/signup">Create your account</Link>
        </div>

        {/* Legal */}
        <div style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--text-3)',
          lineHeight: 1.65,
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
        }}>
          By signing in you agree to our{' '}
          <a href="https://meridianng.com" style={{ color: 'var(--text-3)' }}>Terms of Use</a>.
          All investments carry risk.
        </div>
      </div>
    </div>
  )
}
