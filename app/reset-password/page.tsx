'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MeridianLogo } from '@/components/MeridianLogo'
import { createClient } from '@/lib/supabase/client'

function ResetPasswordForm() {
  const supabase      = createClient()
  const searchParams  = useSearchParams()

  const [pwd,      setPwd]      = useState('')
  const [pwd2,     setPwd2]     = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)
  const [ready,    setReady]    = useState(false)

  // Supabase puts the tokens in the URL hash after the redirect.
  // We need to call exchangeCodeForSession (PKCE) or let the client
  // pick up the session from the hash automatically.
  useEffect(() => {
    // Supabase JS v2 automatically exchanges the code/token in the hash
    // and fires onAuthStateChange with PASSWORD_RECOVERY event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setReady(true)
        }
      }
    )

    // Also handle the case where the hash token was already consumed
    // and the session is present — check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (pwd.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (pwd !== pwd2) {
      setError('The two passwords do not match. Please check and try again.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password: pwd })

    if (updateError) {
      setError(
        updateError.message.includes('same password')
          ? 'Your new password cannot be the same as your old one.'
          : updateError.message.includes('expired')
          ? 'This reset link has expired. Go back and request a new one.'
          : 'Something went wrong. Please request a new reset link.'
      )
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)

    // Redirect to dashboard after 2 seconds
    setTimeout(() => { window.location.href = '/dashboard' }, 2200)
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          font-family: 'Instrument Sans', system-ui, sans-serif;
          background: #F8F4EC;
          color: #1A1A1A;
          -webkit-font-smoothing: antialiased;
        }
        .rp-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .rp-card {
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          border: 1px solid rgba(10,59,31,0.1);
          border-radius: 12px;
          padding: 48px 44px;
          box-shadow: 0 8px 40px rgba(10,61,34,0.09);
        }
        .rp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #B8922A;
          margin-bottom: 16px;
        }
        .rp-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: #B8922A;
          flex-shrink: 0;
        }
        .rp-heading {
          font-family: 'Cormorant', Georgia, serif;
          font-size: 42px;
          font-weight: 700;
          color: #0A3B1F;
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .rp-sub {
          font-size: 15px;
          color: #6E6860;
          line-height: 1.75;
          margin-bottom: 36px;
        }
        .form-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6E6860;
          margin-bottom: 8px;
        }
        .form-group { margin-bottom: 20px; }
        .form-input-wrap { position: relative; }
        .form-input {
          display: block;
          width: 100%;
          padding: 13px 44px 13px 16px;
          background: #F8F4EC;
          border: 1.5px solid rgba(10,59,31,0.18);
          border-radius: 6px;
          font-family: inherit;
          font-size: 15px;
          color: #1A1A1A;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: #0A3B1F;
          box-shadow: 0 0 0 3px rgba(10,59,31,0.08);
          border-left-color: #B8922A;
          border-left-width: 2.5px;
          background: white;
        }
        .toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #A8A8A8;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.2s;
        }
        .toggle-btn:hover { color: #0A3B1F; }
        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px;
          background: #0A3B1F;
          color: #F8F4EC;
          border: none;
          border-radius: 6px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s;
          letter-spacing: 0.01em;
          margin-top: 8px;
        }
        .btn-primary:hover:not(:disabled) {
          background: #145C31;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(10,59,31,0.22);
        }
        .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
        .rp-error {
          padding: 12px 16px;
          background: rgba(192,57,43,0.06);
          border: 1px solid rgba(192,57,43,0.18);
          border-radius: 6px;
          font-size: 14px;
          color: #C0392B;
          line-height: 1.6;
          margin-top: 12px;
        }
        .rp-success {
          text-align: center;
        }
        .rp-success-icon {
          width: 56px;
          height: 56px;
          background: rgba(10,59,31,0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #0A3B1F;
          font-size: 22px;
        }
        .rp-not-ready {
          text-align: center;
          padding: 20px 0;
        }
        .rp-not-ready p {
          font-size: 15px;
          color: #6E6860;
          line-height: 1.75;
          margin-bottom: 20px;
        }
        .rp-back-link {
          font-size: 14px;
          color: #0A3B1F;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .rp-back-link:hover { color: #145C31; text-decoration: underline; }
        @media (max-width: 520px) {
          .rp-card { padding: 36px 24px; }
          .rp-heading { font-size: 34px; }
        }
      `}</style>

      <div className="rp-wrap">
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <MeridianLogo variant="full" theme="light" width={160} />
          </Link>
        </div>

        <div className="rp-card">
          {success ? (
            /* ── SUCCESS STATE ── */
            <div className="rp-success">
              <div className="rp-success-icon">✓</div>
              <h2 style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: 32, fontWeight: 700, color: '#0A3B1F', marginBottom: 10 }}>
                Password updated.
              </h2>
              <p style={{ fontSize: 15, color: '#6E6860', lineHeight: 1.75 }}>
                Your new password is set. Taking you to your dashboard now.
              </p>
            </div>

          ) : !ready ? (
            /* ── LINK EXPIRED / NO SESSION STATE ── */
            <div className="rp-not-ready">
              <div className="rp-eyebrow">Reset link</div>
              <h2 style={{ fontFamily: "'Cormorant', Georgia, serif", fontSize: 36, fontWeight: 700, color: '#0A3B1F', lineHeight: 1.1, marginBottom: 12 }}>
                This link has expired.
              </h2>
              <p>
                Password reset links expire after one hour. Go back to the sign-in page and request a new one — it takes five seconds.
              </p>
              <Link href="/login" className="rp-back-link">
                Back to sign in →
              </Link>
            </div>

          ) : (
            /* ── RESET FORM ── */
            <>
              <div className="rp-eyebrow">Reset your password</div>
              <h1 className="rp-heading">Choose a<br />new password.</h1>
              <p className="rp-sub">
                Pick something you will actually remember. At least 8 characters.
              </p>

              <form onSubmit={handleReset}>
                <div className="form-group">
                  <label className="form-label" htmlFor="pwd">New password</label>
                  <div className="form-input-wrap">
                    <input
                      id="pwd"
                      type={showPwd ? 'text' : 'password'}
                      className="form-input"
                      placeholder="At least 8 characters"
                      value={pwd}
                      onChange={e => setPwd(e.target.value)}
                      required
                      autoFocus
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={() => setShowPwd(v => !v)}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                    >
                      {showPwd
                        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      }
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pwd2">Confirm new password</label>
                  <div className="form-input-wrap">
                    <input
                      id="pwd2"
                      type={showPwd ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Type it again"
                      value={pwd2}
                      onChange={e => setPwd2(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {error && <div className="rp-error">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Updating password…' : 'Set new password →'}
                </button>
              </form>

              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Link href="/login" className="rp-back-link" style={{ fontSize: 14, color: '#6E6860' }}>
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// Wrap in Suspense because useSearchParams requires it in Next.js 13+
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F4EC' }}>
        <div style={{ fontFamily: 'inherit', fontSize: 15, color: '#6E6860' }}>Loading…</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
