'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MeridianLogo } from '@/components/MeridianLogo'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName]   = useState('')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { full_name: fullName.trim() },
        // Email confirmation — set to false in Supabase Auth settings
        // for instant access without email verification
      },
    })

    if (authError) {
      setError(
        authError.message.includes('already registered')
          ? 'This email already has an account. Sign in instead.'
          : authError.message
      )
      setLoading(false)
      return
    }

    // Check if email confirmation is required
    // If Supabase is set to "Confirm email" then show a message.
    // If not required, redirect straight to dashboard.
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 16, display:'flex', justifyContent:'center' }}><svg viewBox='0 0 64 64' width='40' height='40' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M 10 52 A 22 22 0 0 1 54 52' stroke='#C4912A' strokeWidth='5.5' strokeLinecap='round'/><line x1='32' y1='50' x2='32' y2='22' stroke='#C4912A' strokeWidth='4.5' strokeLinecap='round'/><circle cx='32' cy='14' r='8.5' fill='#C4912A'/></svg></div>
          <h2 className="auth-heading" style={{ textAlign: 'center' }}>Check your email.</h2>
          <p className="auth-sub" style={{ textAlign: 'center' }}>
            We sent a confirmation link to <strong style={{ color: 'var(--text-1)' }}>{email}</strong>.
            Click the link to activate your account, then come back to sign in.
          </p>
          <Link href="/login" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 8 }}>
            Go to sign in →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <MeridianLogo variant="mark" theme="light" width={32}/>
          <div className="auth-logo-text">
            <span className="auth-logo-name">MERIDIAN</span>
            <span className="auth-logo-sub">Finance in Plain English</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="auth-heading">Join Meridian.</h1>
        <p className="auth-sub">
          Start understanding your money — in plain Nigerian English.
          No big grammar. No intimidation.
        </p>

        {/* Form */}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Your name</label>
            <input
              id="fullName"
              type="text"
              className="form-input"
              placeholder="e.g. Chinedu Okafor"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email address
              <span style={{ color: 'var(--text-3)', fontWeight: 400, marginLeft: 4 }}>
                — use the same email you bought with on Selar
              </span>
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="At least 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
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
              {loading ? '' : 'Create my account →'}
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="auth-link-row">
          Already have an account?{' '}
          <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
