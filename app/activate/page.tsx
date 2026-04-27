'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MeridianLogo } from '@/components/MeridianLogo'

export default function ActivatePage() {
  const [keyInput,  setKeyInput]  = useState('')
  const [loading,   setLoading]   = useState(false)
  const [msg,       setMsg]       = useState('')
  const [msgOk,     setMsgOk]     = useState(false)

  async function handleActivate() {
    const k = keyInput.trim()
    if (!k) { setMsg('Paste your access key first.'); setMsgOk(false); return }
    setLoading(true); setMsg(''); 
    try {
      const res  = await fetch('/api/activate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k }) })
      const data = await res.json()
      if (data.success) {
        setMsg(`Your products are now unlocked — ${(data.products || []).join(', ') || 'access granted'}. Redirecting to your dashboard.`)
        setMsgOk(true)
        setTimeout(() => { window.location.href = '/dashboard' }, 1800)
      } else {
        setMsg(data.error || 'Key not recognised. Double-check your purchase email or contact hello@meridianng.com.')
        setMsgOk(false)
      }
    } catch { setMsg('Connection error. Please try again in a moment.'); setMsgOk(false) }
    finally  { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F4EC', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>

      {/* Grain */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: 'none', zIndex: 0, opacity: .4 }} />

      {/* Nav */}
      <nav style={{ padding: '0 5vw', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(248,244,236,0.94)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(10,59,31,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <MeridianLogo variant="full" theme="light" width={180} />
        </Link>
        <Link href="/dashboard" style={{ fontFamily: 'var(--font)', fontSize: 14, fontWeight: 600, color: '#0A3D22', textDecoration: 'none', padding: '9px 18px', border: '1.5px solid rgba(10,61,34,0.2)', borderRadius: 4 }}>
          Dashboard →
        </Link>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 5vw 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 560 }}>

          {/* Eyebrow */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8972A', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'block', width: 28, height: 1, background: '#C8972A', flexShrink: 0 }} />
            Your Meridian account
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,5vw,58px)', fontWeight: 700, color: '#0A3D22', lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Activate<br />your key.
          </h1>
          <p style={{ fontSize: 17, color: '#6B6B6B', lineHeight: 1.75, marginBottom: 40 }}>
            When you bought a Meridian product on Selar, a key was sent to your email immediately after payment. Paste that key below and your products unlock right away — no waiting.
          </p>

          {/* Card */}
          <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(10,61,34,0.1)', padding: '40px', boxShadow: '0 4px 24px rgba(10,61,34,0.07)', marginBottom: 24 }}>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 10 }}>
              Your access key
            </label>
            <input
              type="text"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleActivate()}
              placeholder="e.g. ABCDE-FGHIJ-KLMNO-PQRST"
              autoFocus
              style={{ width: '100%', padding: '14px 16px', background: '#F8F4EC', border: '1.5px solid rgba(10,61,34,0.15)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 15, color: '#1A1A1A', outline: 'none', letterSpacing: '0.06em', marginBottom: 6 }}
            />
            <div style={{ fontSize: 12, color: '#A8A8A8', marginBottom: 24, lineHeight: 1.6 }}>
              Your key looks like this: <span style={{ fontFamily: 'var(--font-mono)', color: '#C8972A', fontSize: 11 }}>XXXXX-XXXXX-XXXXXX-XXXXX</span>. It was emailed to you right after you paid on Selar. Check your inbox and spam folder.
            </div>

            <button
              onClick={handleActivate}
              disabled={loading}
              style={{ width: '100%', padding: '16px', background: '#0A3D22', color: '#F8F4EC', border: 'none', borderRadius: 6, fontFamily: 'var(--font)', fontSize: 16, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, letterSpacing: '0.01em', transition: 'all .22s' }}
            >
              {loading ? 'Verifying your key…' : 'Unlock my products →'}
            </button>

            {msg && (
              <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 6, fontSize: 14, lineHeight: 1.6, background: msgOk ? 'rgba(26,122,71,0.07)' : 'rgba(192,57,43,0.06)', border: `1px solid ${msgOk ? 'rgba(26,122,71,0.2)' : 'rgba(192,57,43,0.18)'}`, color: msgOk ? '#1A7A47' : '#C0392B' }}>
                {msg}
              </div>
            )}
          </div>

          {/* Help section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: '16px 20px', background: '#EDE8DE', borderRadius: 8, border: '1px solid rgba(10,61,34,0.08)' }}>
              <div style={{ fontWeight: 600, color: '#0A3D22', fontSize: 15, marginBottom: 4 }}>Did not receive your key?</div>
              <div style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.65 }}>
                Check your spam folder first. If it is not there, email <a href="mailto:hello@meridianng.com" style={{ color: '#0A3D22', fontWeight: 600 }}>hello@meridianng.com</a> with your Selar payment reference number. We will sort it within the hour.
              </div>
            </div>
            <div style={{ padding: '16px 20px', background: '#EDE8DE', borderRadius: 8, border: '1px solid rgba(10,61,34,0.08)' }}>
              <div style={{ fontWeight: 600, color: '#0A3D22', fontSize: 15, marginBottom: 4 }}>Have not bought a product yet?</div>
              <div style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.65 }}>
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ color: '#0A3D22', fontWeight: 600 }}>Visit our Selar store →</a> MoneySpeak starts at ₦4,500. One-time payment, lifetime access.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
