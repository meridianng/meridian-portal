'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const [activeTab, setActiveTab]   = useState<'signin' | 'signup'>('signin')

  
  const [siEmail, setSiEmail]       = useState('')
  const [siPassword, setSiPassword] = useState('')
  const [siShowPwd, setSiShowPwd]   = useState(false)
  const [siLoading, setSiLoading]   = useState(false)
  const [siError, setSiError]       = useState('')

 
  const [suName, setSuName]         = useState('')
  const [suEmail, setSuEmail]       = useState('')
  const [suPassword, setSuPassword] = useState('')
  const [suShowPwd, setSuShowPwd]   = useState(false)
  const [suLoading, setSuLoading]   = useState(false)
  const [suError, setSuError]       = useState('')
  const [suSuccess, setSuSuccess]   = useState(false)

 
  const [forgotMsg, setForgotMsg]   = useState('')

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault()
    setSiError('')
    setSiLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email:    siEmail.trim().toLowerCase(),
      password: siPassword,
    })

    if (error) {
      setSiError(
        error.message.toLowerCase().includes('invalid login')
          ? 'Wrong email or password. Double-check and try again.'
          : error.message
      )
      setSiLoading(false)
      return
    }

    
    window.location.href = '/dashboard'
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setSuError('')

    if (suPassword.length < 8) {
      setSuError('Password must be at least 8 characters.')
      return
    }

    setSuLoading(true)

    const { error } = await supabase.auth.signUp({
      email:    suEmail.trim().toLowerCase(),
      password: suPassword,
      options:  { data: { full_name: suName.trim() } },
    })

    if (error) {
      setSuError(
        error.message.includes('already registered')
          ? 'This email already has an account. Switch to Sign in.'
          : error.message
      )
      setSuLoading(false)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      window.location.href = '/dashboard'
    } else {
      setSuSuccess(true)
      setSuLoading(false)
    }
  }

  async function handleForgotPassword() {
    const email = siEmail.trim().toLowerCase()
    if (!email || !email.includes('@')) {
      setSiError('Enter your email address above first, then click Forgot password.')
      return
    }
    setForgotMsg('')
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
   
    setForgotMsg(`Reset link sent to ${email}. Check your inbox and spam folder.`)
  }

  return (
    <div className="auth-page">

      {/* ── LEFT — brand + WOD ── */}
      <div className="auth-left">

        <div className="auth-brand">
          <div className="auth-logo-mark">M</div>
          <div className="auth-logo-text">
            <span className="auth-logo-name">Meridian</span>
            <span className="auth-logo-sub">Finance in plain Nigerian English</span>
          </div>
        </div>

        <div className="auth-quote">
          <div className="auth-eyebrow">Your account</div>
          <h2 className="auth-headline">
            Finance was never too hard for you.
            <em>It was just explained badly.</em>
          </h2>
          <p className="auth-body">
            Sign in to access every Meridian product you have paid for —
            the dictionary, the course, the stock analyser, and business tracker.
            All in one place.
          </p>
        </div>

        {/* Word of the Day */}
        <div className="auth-wod">
          <div className="auth-wod-label">◈ Word of the Day — Free, always</div>
          <div className="auth-wod-term">Liquidity</div>
          <div className="auth-wod-def">
            How quickly you can turn what you own into cash when you actually need it.
          </div>
          <div className="auth-wod-story">
            A woman has saved ₦800,000 — all of it in a plot of land behind her village.
            One night her child wakes up with terrible fever. She needs ₦60,000 for the
            hospital by 6am. She cannot call Oloriebi at 3am to buy land. She cannot
            carry sand to the pharmacy. That ₦800,000 is hers, it is even gaining value,
            but <strong>right now when she needs it — it is completely useless to her.</strong>{' '}
            That is what illiquid means.
          </div>
          <div className="auth-wod-reality">
            <div className="auth-wod-reality-tag">The rule you walk away using</div>
            <div className="auth-wod-reality-body">
              Before you put money anywhere — land, crypto, fixed deposit, a friend&apos;s
              business — ask one question: <strong>&ldquo;If something happens tonight, can
              I get this money back in seven days?&rdquo;</strong> If the answer is no,
              that investment is illiquid. Not automatically bad — but never lock away
              your only money there. Keep at least three months of your expenses
              somewhere you can reach overnight.
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT — form ── */}
      <div className="auth-right">
        <div className="auth-card">

          {suSuccess ? (
          
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56,
                background: 'rgba(10,61,34,0.08)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                color: 'var(--forest)', fontSize: 22,
              }}>✓</div>
              <h2 className="auth-heading" style={{ textAlign: 'center', fontSize: 36, marginBottom: 12 }}>
                Check your email.
              </h2>
              <p className="auth-sub" style={{ textAlign: 'center' }}>
                We sent a confirmation link to{' '}
                <strong style={{ color: 'var(--forest)' }}>{suEmail}</strong>.
                Click it to activate your account, then come back to sign in.
              </p>
              <button
                onClick={() => setActiveTab('signin')}
                className="btn btn-primary"
                style={{ marginTop: 8 }}
              >
                Go to sign in →
              </button>
            </div>
          ) : (
            <>
              <div className="auth-form-eyebrow">Your Meridian account</div>
              <h1 className="auth-heading">
                {activeTab === 'signin' ? 'Welcome back.' : 'Join Meridian.'}
              </h1>
              <p className="auth-sub">
                {activeTab === 'signin'
                  ? 'Sign in to access your products and dashboard.'
                  : 'Start understanding your money — in plain Nigerian English.'}
              </p>

              {/* Tabs */}
              <div className="auth-tabs">
                <button
                  className={`auth-tab${activeTab === 'signin' ? ' active' : ''}`}
                  onClick={() => { setActiveTab('signin'); setSiError(''); setForgotMsg('') }}
                >
                  Sign in
                </button>
                <button
                  className={`auth-tab${activeTab === 'signup' ? ' active' : ''}`}
                  onClick={() => { setActiveTab('signup'); setSuError('') }}
                >
                  Create account
                </button>
              </div>

              {/* ── SIGN IN PANEL ── */}
              {activeTab === 'signin' && (
                <div>
                  <form onSubmit={handleSignin}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="si-email">
                        Email address
                      </label>
                      <input
                        id="si-email"
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={siEmail}
                        onChange={e => setSiEmail(e.target.value)}
                        required
                        autoFocus
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label" htmlFor="si-pwd" style={{ marginBottom: 0 }}>
                          Password
                        </label>
                        <button
                          type="button"
                          className="form-label-link"
                          onClick={handleForgotPassword}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="form-input-wrap">
                        <input
                          id="si-pwd"
                          type={siShowPwd ? 'text' : 'password'}
                          className="form-input"
                          placeholder="Your password"
                          value={siPassword}
                          onChange={e => setSiPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="form-input-eye"
                          onClick={() => setSiShowPwd(p => !p)}
                          tabIndex={-1}
                          aria-label="Toggle password visibility"
                        >
                          {siShowPwd ? '🙈' : '👁'}
                        </button>
                      </div>
                    </div>

                    {forgotMsg && (
                      <div className="sys-msg sys-ok" style={{ marginBottom: 12 }}>
                        {forgotMsg}
                      </div>
                    )}

                    {siError && (
                      <div className="sys-msg sys-error">{siError}</div>
                    )}

                    <div style={{ marginTop: 24 }}>
                      <button
                        type="submit"
                        className={`btn btn-primary${siLoading ? ' btn-loading' : ''}`}
                        disabled={siLoading}
                      >
                        {siLoading ? '' : 'Sign in to my dashboard →'}
                      </button>
                    </div>
                  </form>

                  <div className="auth-link-row">
                    No account yet?{' '}
                    <a onClick={() => setActiveTab('signup')} style={{ cursor: 'pointer' }}>
                      Create one free
                    </a>
                  </div>
                </div>
              )}

              {/* ── SIGN UP PANEL ── */}
              {activeTab === 'signup' && (
                <div>
                  <form onSubmit={handleSignup}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="su-name">Your name</label>
                      <input
                        id="su-name"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Chinedu Okafor"
                        value={suName}
                        onChange={e => setSuName(e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="su-email">Email address</label>
                      <input
                        id="su-email"
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={suEmail}
                        onChange={e => setSuEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="su-pwd">Password</label>
                      <div className="form-input-wrap">
                        <input
                          id="su-pwd"
                          type={suShowPwd ? 'text' : 'password'}
                          className="form-input"
                          placeholder="At least 8 characters"
                          value={suPassword}
                          onChange={e => setSuPassword(e.target.value)}
                          required
                          minLength={8}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="form-input-eye"
                          onClick={() => setSuShowPwd(p => !p)}
                          tabIndex={-1}
                        >
                          {suShowPwd ? '🙈' : '👁'}
                        </button>
                      </div>
                    </div>

                    {suError && (
                      <div className="sys-msg sys-error">{suError}</div>
                    )}

                    <div style={{ marginTop: 24 }}>
                      <button
                        type="submit"
                        className={`btn btn-primary${suLoading ? ' btn-loading' : ''}`}
                        disabled={suLoading}
                      >
                        {suLoading ? '' : 'Create my account →'}
                      </button>
                    </div>
                  </form>

                  <div className="auth-link-row">
                    Already have an account?{' '}
                    <a onClick={() => setActiveTab('signin')} style={{ cursor: 'pointer' }}>
                      Sign in
                    </a>
                  </div>
                </div>
              )}

              <div className="auth-legal">
                By continuing you agree to Meridian&apos;s Terms of Use.
                Meridian does not provide financial advice.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
