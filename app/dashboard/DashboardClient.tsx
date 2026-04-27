'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MeridianLogo } from '@/components/MeridianLogo'
import { createClient } from '@/lib/supabase/client'

// ── SVG Icons — no emojis ──────────────────────────────────
const IBook    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IGrad    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
const IChart   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const ILedger  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="2" y1="9" x2="8" y2="9"/><line x1="2" y1="15" x2="8" y2="15"/></svg>
const IKey     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>
const IOut     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const ILock    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const ICheck   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IClock   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IGrid    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
const ISignout = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const IHome    = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IMail    = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const ICopy    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
const IEye     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const IEyeOff  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
const IInsta   = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>

// ── Product definitions ──────────────────────────────────────
const PRODUCTS = [
  { id:'dictionary', name:'MoneySpeak',      tag:'500 terms · Nigerian English',           desc:'Every financial word that has ever confused you — explained with a Nigerian story you will actually recognise.',           Icon:IBook,   color:'#0A3D22', url:'/dictionary',                                                            selar:'https://selar.com/m/meridian_ng', live:false, price:'₦4,500'   },
  { id:'course',     name:'Stock School',    tag:'Zero to confident investor · 11 phases',  desc:'From "what is a share?" to building a real NGX portfolio. No jargon. No assumed knowledge. Nigerian examples throughout.', Icon:IGrad,   color:'#115C33', url:process.env.NEXT_PUBLIC_COURSE_URL||'https://learn.meridianng.com',   selar:'https://selar.com/m/meridian_ng', live:true,  price:'₦18,000'  },
  { id:'terminal',   name:'Equity Terminal', tag:'Analyse any company · Owner Earnings',    desc:'Enter numbers from any annual report. Get a plain-English verdict. You input the data. You make the call.',               Icon:IChart,  color:'#1A7A47', url:process.env.NEXT_PUBLIC_TERMINAL_URL||'https://app.meridianng.com', selar:'https://selar.com/m/meridian_ng', live:true,  price:'₦15,000'  },
  { id:'tradaq',     name:'TraDaq',          tag:'Know your real profit · Coming soon',     desc:'Track your business money in 30 seconds a day. For market traders, IG sellers, and small business owners.',               Icon:ILedger, color:'#8B5A18', url:'/tradaq',                                                                selar:'https://selar.com/m/meridian_ng', live:false, price:'₦9,000/yr'},
]

function planLabel(p: string) {
  const m: Record<string,string> = {
    v2_tool:'Equity Terminal', v2_course:'Stock School', v2_dictionary:'MoneySpeak',
    v2_tradaq:'TraDaq', 'v2_meridian access':'Meridian Access', v2_combo:'Meridian Access', full:'Full Access',
  }
  return m[p] || p
}

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

interface Props {
  email:  string
  name:   string
  plan:   string | null
  key_:   string | null
  access: Set<string>
}

export default function DashboardClient({ email, name, plan, key_, access }: Props) {
  const [sbOpen,      setSbOpen]      = useState(false)
  const [activating,  setActivating]  = useState(false)
  const [keyInput,    setKeyInput]    = useState('')
  const [keyMsg,      setKeyMsg]      = useState('')
  const [keyMsgOk,    setKeyMsgOk]    = useState(false)
  const [showKey,     setShowKey]     = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [countdown,   setCountdown]   = useState<number|null>(null)
  const wodRef    = useRef<HTMLDivElement>(null)
  const supabase  = createClient()

  const firstName   = name?.split(' ')[0] || email?.split('@')[0] || 'there'
  const planDisplay = plan ? planLabel(plan) : null
  const INACTIVITY  = 30 * 60 * 1000 // 30 min

  // ── Inactivity logout ───────────────────────────────────────
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let warnTimer: ReturnType<typeof setTimeout>

    const reset = () => {
      clearTimeout(timer)
      clearTimeout(warnTimer)
      setCountdown(null)
      warnTimer = setTimeout(() => {
        // 2 min warning
        let secs = 120
        setCountdown(secs)
        const iv = setInterval(() => {
          secs--
          setCountdown(secs)
          if (secs <= 0) clearInterval(iv)
        }, 1000)
      }, INACTIVITY - 2 * 60 * 1000)
      timer = setTimeout(async () => {
        await supabase.auth.signOut()
        window.location.href = '/login?reason=timeout'
      }, INACTIVITY)
    }

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(e => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      clearTimeout(timer)
      clearTimeout(warnTimer)
      events.forEach(e => window.removeEventListener(e, reset))
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  async function handleActivate() {
    const k = keyInput.trim()
    if (!k) { setKeyMsg('Please paste your access key first.'); setKeyMsgOk(false); return }
    setActivating(true); setKeyMsg('Verifying…'); setKeyMsgOk(false)
    try {
      const res  = await fetch('/api/activate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ key: k }) })
      const data = await res.json()
      if (data.success) {
        setKeyMsg('Your products are now unlocked. The page will reload.'); setKeyMsgOk(true)
        setTimeout(() => window.location.reload(), 1400)
      } else {
        setKeyMsg(data.error || 'Key not recognised. Check your purchase email.'); setKeyMsgOk(false)
      }
    } catch { setKeyMsg('Connection error. Please try again.'); setKeyMsgOk(false) }
    finally  { setActivating(false) }
  }

  function copyKey() {
    if (!key_) return
    navigator.clipboard.writeText(key_).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  function scrollToWOD() {
    wodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── Sidebar nav item ────────────────────────────────────────
  function NavItem({ icon, label, active, locked, soon, href, onClick }: {
    icon: React.ReactNode, label: string, active?: boolean,
    locked?: boolean, soon?: boolean, href?: string, onClick?: () => void
  }) {
    const style: React.CSSProperties = {
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 16px', borderRadius: 7,
      fontSize: 14, fontWeight: 500,
      color: active ? '#F8F4EC' : 'rgba(248,244,236,0.58)',
      cursor: locked ? 'default' : 'pointer',
      background: active ? 'rgba(248,244,236,0.09)' : 'transparent',
      transition: 'all .18s', textDecoration: 'none',
      opacity: locked && !soon ? 0.6 : 1,
      position: 'relative' as const,
    }
    const inner = (
      <>
        {/* Gold left-edge accent — partial height, edge only */}
        {active && (
          <span style={{
            position: 'absolute', left: 0, top: '22%', bottom: '22%',
            width: 3, background: '#C8972A',
            borderRadius: '0 2px 2px 0',
          }} />
        )}
        <span style={{ width: 22, display: 'flex', justifyContent: 'center', flexShrink: 0, color: active ? '#C8972A' : 'rgba(248,244,236,0.5)' }}>
          {icon}
        </span>
        <span style={{ flex: 1 }}>{label}</span>
        {soon && <span style={{ fontSize: 9, padding: '2px 7px', background: 'rgba(200,151,42,0.18)', color: '#E4B94A', borderRadius: 100, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>Soon</span>}
        {locked && !soon && <span style={{ opacity: .35, display: 'flex' }}><ILock /></span>}
      </>
    )
    if (href && !locked) return <a href={href} style={style} onClick={() => setSbOpen(false)}>{inner}</a>
    return <div style={style} onClick={locked ? undefined : onClick}>{inner}</div>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* Inactivity warning */}
      {countdown !== null && (
        <div style={{ position: 'fixed', top: 80, right: 24, zIndex: 9000, background: '#0A3D22', color: '#F8F4EC', padding: '14px 20px', borderRadius: 8, fontSize: 14, fontWeight: 500, boxShadow: '0 8px 28px rgba(0,0,0,0.25)', border: '1px solid rgba(200,151,42,0.3)' }}>
          You will be signed out in {countdown}s due to inactivity.{' '}
          <button onClick={() => setCountdown(null)} style={{ color: '#C8972A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' }}>Stay signed in</button>
        </div>
      )}

      {/* Sidebar overlay (mobile) */}
      {sbOpen && <div onClick={() => setSbOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,61,34,0.5)', zIndex: 98, backdropFilter: 'blur(3px)' }} />}

      {/* ── SIDEBAR ── */}
      <aside
        className="meridian-sidebar"
        style={{
          width: 255,
          background: '#0A3D22',
          position: 'fixed', top: 0, left: 0, bottom: 0,
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto', overflowX: 'hidden',
          transition: 'transform .28s cubic-bezier(.4,0,.2,1)',
          boxShadow: '6px 0 32px rgba(0,0,0,0.3), 2px 0 8px rgba(0,0,0,0.15)',
        }}
      >
        {/* M watermark */}
        <div style={{ position: 'absolute', bottom: -60, right: -50, fontFamily: 'var(--font-serif)', fontSize: 380, fontWeight: 900, color: 'rgba(255,255,255,0.025)', userSelect: 'none', pointerEvents: 'none', lineHeight: 1 }}>M</div>

        {/* Brand */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(248,244,236,0.08)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <MeridianLogo variant="full" theme="dark" width={180} />
          </Link>
        </div>

        {/* User */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(248,244,236,0.07)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(248,244,236,0.32)', marginBottom: 3 }}>Signed in as</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(248,244,236,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 8 }}>{email}</div>
          {planDisplay && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(200,151,42,0.18)', border: '1px solid rgba(200,151,42,0.28)', borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4B94A' }}>
              ◈ {planDisplay}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,244,236,0.26)', padding: '6px 12px 4px', marginTop: 2 }}>Overview</div>
          <NavItem icon={<IGrid />} label="Dashboard" active onClick={() => setSbOpen(false)} />
          <NavItem icon={<IKey />}  label="Activate key" href="/activate" />

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,244,236,0.26)', padding: '6px 12px 4px', marginTop: 8 }}>My Products</div>

          {PRODUCTS.map(p => {
            const unlocked = access.has(p.id)
            let href: string | undefined
            if (unlocked && p.live) {
              href = p.id === 'terminal' && key_ ? `${p.url}?k=${key_}` :
                     p.id === 'course'   && key_ ? `${p.url}?k=${key_}` :
                     p.url
            }
            return (
              <NavItem
                key={p.id}
                icon={<p.Icon />}
                label={p.name}
                locked={!unlocked && !p.live === false && p.id !== 'tradaq' ? false : !unlocked}
                soon={p.id === 'tradaq'}
                href={href}
                onClick={() => setSbOpen(false)}
              />
            )
          })}
        </nav>

        {/* Upgrade */}
        {!planDisplay && (
          <div style={{ margin: '0 10px 12px', background: 'rgba(200,151,42,0.1)', border: '1px solid rgba(200,151,42,0.2)', borderRadius: 8, padding: '14px 16px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: '#E4B94A', marginBottom: 5 }}>Get everything.</div>
            <div style={{ fontSize: 12, color: 'rgba(248,244,236,0.42)', lineHeight: 1.6, marginBottom: 11 }}>All 4 products — ₦35,000. Save ₦11,500.</div>
            <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '9px', background: '#C8972A', color: 'white', borderRadius: 5, fontSize: 12, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>Meridian Access →</a>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '12px 10px 18px', borderTop: '1px solid rgba(248,244,236,0.07)', flexShrink: 0, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, fontSize: 13, color: 'rgba(248,244,236,0.42)', textDecoration: 'none' }}>
            <IHome /> Back to website
          </a>
          <a href="https://instagram.com/meridianng_" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, fontSize: 13, color: 'rgba(248,244,236,0.42)', textDecoration: 'none' }}>
            <IInsta /> @meridianng_
          </a>
          <a href="mailto:hello@meridianng.com" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, fontSize: 13, color: 'rgba(248,244,236,0.42)', textDecoration: 'none' }}>
            <IMail /> hello@meridianng.com
          </a>
          <button onClick={handleSignOut} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6, fontSize: 13, color: 'rgba(248,244,236,0.38)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}>
            <ISignout /> Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="dash-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* ── TOP BAR ── */}
        <header style={{ background: 'rgba(248,244,236,0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(10,61,34,0.1)', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 3-line hamburger — shows sidebar is collapsible */}
            <button
              onClick={() => setSbOpen(o => !o)}
              aria-label="Toggle navigation"
              style={{ background: 'none', border: '1.5px solid rgba(10,61,34,0.14)', borderRadius: 6, padding: '7px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}
            >
              <span style={{ width: 18, height: 1.5, background: '#0A3D22', display: 'block', borderRadius: 1 }} />
              <span style={{ width: 18, height: 1.5, background: '#0A3D22', display: 'block', borderRadius: 1 }} />
              <span style={{ width: 18, height: 1.5, background: '#0A3D22', display: 'block', borderRadius: 1 }} />
            </button>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B6B6B' }}>
              Dashboard / <strong style={{ color: '#0A3D22', fontWeight: 500 }}>Overview</strong>
            </div>
          </div>

          {/* WOD pill — click scrolls to WOD section */}
          <button
            onClick={scrollToWOD}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', background: 'rgba(10,61,34,0.07)', borderRadius: 100, border: '1px solid rgba(10,61,34,0.12)', cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8972A' }}>WOD</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700, color: '#0A3D22', fontStyle: 'italic' }}>Liquidity</span>
          </button>
        </header>

        {/* ── BODY ── */}
        <main style={{ padding: '36px 32px 80px', flex: 1 }}>

          {/* ── WELCOME BANNER ── */}
          <div style={{ background: '#0A3D22', borderRadius: 12, padding: '40px 44px', marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
            {/* M watermark */}
            <div style={{ position: 'absolute', right: -40, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-serif)', fontSize: 320, fontWeight: 900, color: 'rgba(255,255,255,0.025)', pointerEvents: 'none', lineHeight: 1, userSelect: 'none' }}>M</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Eyebrow */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(228,185,74,0.65)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(228,185,74,0.45)', flexShrink: 0 }} />
                {greeting()}
              </div>

              {/* Welcome back + name — same font/color as landing page HTML */}
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(14px,1.4vw,17px)', color: 'rgba(248,244,236,0.55)', marginBottom: 4, fontWeight: 400 }}>Welcome back,</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px,4.5vw,62px)', fontWeight: 700, color: '#F8F4EC', lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 14 }}>
                <em style={{ fontStyle: 'italic', color: '#C8972A' }}>{firstName}</em>
              </div>

              <div style={{ fontSize: 16, color: 'rgba(248,244,236,0.55)', fontWeight: 300, lineHeight: 1.75, maxWidth: 500 }}>
                {access.size > 0
                  ? `You have ${access.size} product${access.size > 1 ? 's' : ''} active and ready. Open any one from below.`
                  : 'Your dashboard is ready. Paste your access key from your Selar purchase email to unlock your products.'}
              </div>

              {/* Quick stats */}
              {access.size > 0 && planDisplay && (
                <div style={{ display: 'flex', gap: 16, marginTop: 22, flexWrap: 'wrap' }}>
                  <div style={{ padding: '8px 16px', background: 'rgba(248,244,236,0.07)', border: '1px solid rgba(248,244,236,0.11)', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(228,185,74,0.6)', marginBottom: 3 }}>Products Active</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: '#C8972A', lineHeight: 1 }}>{access.size}</div>
                  </div>
                  <div style={{ padding: '8px 16px', background: 'rgba(248,244,236,0.07)', border: '1px solid rgba(248,244,236,0.11)', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(228,185,74,0.6)', marginBottom: 3 }}>Plan</div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#F8F4EC', lineHeight: 1 }}>{planDisplay}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── ACCESS KEY — hidden, behind toggle ── */}
          {key_ && (
            <div style={{ padding: '16px 22px', background: 'rgba(200,151,42,0.05)', border: '1px solid rgba(200,151,42,0.22)', borderLeft: '3px solid #C8972A', borderRadius: '0 10px 10px 0', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6B6B' }}>Access key</span>
              {showKey
                ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#C8972A', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{key_}</span>
                : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#A8A8A8', letterSpacing: '0.1em' }}>{'•'.repeat(Math.min(key_.length, 32))}</span>
              }
              <button onClick={() => setShowKey(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'none', border: '1px solid rgba(10,61,34,0.18)', borderRadius: 5, cursor: 'pointer', fontSize: 12, color: '#6B6B6B', fontFamily: 'inherit' }}>
                {showKey ? <IEyeOff /> : <IEye />} {showKey ? 'Hide' : 'Show'}
              </button>
              {showKey && (
                <button onClick={copyKey} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: copied ? 'rgba(26,122,71,0.1)' : 'none', border: '1px solid rgba(10,61,34,0.18)', borderRadius: 5, cursor: 'pointer', fontSize: 12, color: copied ? '#1A7A47' : '#6B6B6B', fontFamily: 'inherit' }}>
                  <ICopy /> {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>
          )}

          {/* ── ACTIVATE STRIP ── */}
          {!key_ && (
            <div style={{ background: 'white', borderRadius: 10, border: '1px solid rgba(10,61,34,0.1)', borderLeft: '4px solid #C8972A', padding: '22px 26px', marginBottom: 28 }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: '#0A3D22', marginBottom: 6 }}>Activate your access key</div>
              <div style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.65, marginBottom: 16 }}>Already bought a Meridian product? Paste your key here to unlock it immediately. Your key was emailed to you right after your Selar purchase.</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <input type="text" value={keyInput} onChange={e => setKeyInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleActivate()} placeholder="Paste your key: XXXXX-XXXXX-XXXXXX-XXXXX" style={{ flex: 1, minWidth: 200, padding: '11px 14px', border: '1.5px solid rgba(10,61,34,0.16)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 13, color: '#1A1A1A', outline: 'none', background: '#F9F6EF', letterSpacing: '0.04em' }} />
                <button onClick={handleActivate} disabled={activating} style={{ padding: '11px 22px', background: '#0A3D22', color: '#F8F4EC', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', opacity: activating ? 0.7 : 1 }}>
                  {activating ? 'Checking…' : 'Unlock products →'}
                </button>
              </div>
              {keyMsg && <div style={{ marginTop: 10, fontSize: 13, color: keyMsgOk ? '#1A7A47' : '#C0392B', lineHeight: 1.5 }}>{keyMsg}</div>}
            </div>
          )}

          {/* ── PRODUCTS ── */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            Your products
            <span style={{ flex: 1, height: 1, background: 'rgba(10,61,34,0.1)', display: 'block' }} />
          </div>

          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginBottom: 40 }}>
            {PRODUCTS.map((p, idx) => {
              const unlocked = access.has(p.id)
              const soon     = p.id === 'tradaq'
              let href = p.url
              if (unlocked && p.id === 'terminal' && key_) href = `${p.url}?k=${key_}`
              if (unlocked && p.id === 'course'   && key_) href = `${p.url}?k=${key_}`

              // Alternating icon background — greens
              const iconBg = idx % 2 === 0 ? '#0A3D22' : '#115C33'

              return (
                <div key={p.id} style={{ background: 'white', border: `1px solid ${unlocked ? 'rgba(200,151,42,0.3)' : 'rgba(10,61,34,0.09)'}`, borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: unlocked ? '0 4px 20px rgba(200,151,42,0.1)' : '0 2px 8px rgba(10,61,34,0.04)', opacity: soon ? 0.55 : 1, transition: 'transform .22s, box-shadow .22s' }} className="pc-hover">
                  {/* Top accent bar */}
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${p.color}, rgba(200,151,42,0.3))` }} />

                  <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                      {/* Circular icon with green bg, gold symbol */}
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: unlocked ? iconBg : 'rgba(10,61,34,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: unlocked ? '#C8972A' : '#A8A8A8', border: unlocked ? 'none' : '1px solid rgba(10,61,34,0.12)', flexShrink: 0, boxShadow: unlocked ? '0 2px 12px rgba(10,61,34,0.2)' : 'none' }}>
                        <p.Icon />
                      </div>
                      {/* Status badge */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: soon ? 'rgba(212,137,26,0.1)' : unlocked ? 'rgba(26,122,71,0.1)' : 'rgba(10,61,34,0.06)', border: `1px solid ${soon ? 'rgba(212,137,26,0.2)' : unlocked ? 'rgba(26,122,71,0.22)' : 'rgba(10,61,34,0.1)'}`, color: soon ? '#D4891A' : unlocked ? '#1A7A47' : '#A8A8A8' }}>
                        {soon ? <><IClock />&nbsp;Soon</> : unlocked ? <><ICheck />&nbsp;Active</> : <><ILock />&nbsp;Locked</>}
                      </div>
                    </div>

                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: '#0A3D22', letterSpacing: '-0.01em', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: unlocked ? '#C8972A' : '#A8A8A8', marginBottom: 10 }}>{p.tag}</div>
                    <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{p.desc}</div>

                    <div style={{ paddingTop: 14, borderTop: '1px solid rgba(10,61,34,0.08)' }}>
                      {soon ? (
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#D4891A' }}>{p.price} — in development</div>
                      ) : unlocked ? (
                        <a href={href} target={p.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '12px 16px', background: '#0A3D22', color: '#F8F4EC', borderRadius: 7, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'var(--font)' }}>
                          Open {p.name} <IOut />
                        </a>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C8972A' }}>{p.price}</div>
                          <a href={p.selar} target="_blank" rel="noopener noreferrer" style={{ padding: '9px 16px', background: 'transparent', color: '#0A3D22', border: '1.5px solid rgba(10,61,34,0.2)', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'var(--font)' }}>
                            Get access
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── WOD SECTION ── */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }} ref={wodRef}>
            Word of the Day — always free
            <span style={{ flex: 1, height: 1, background: 'rgba(10,61,34,0.1)', display: 'block' }} />
          </div>

          <div style={{ background: '#0A3D22', borderRadius: 12, padding: '36px 40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: -16, right: 20, fontFamily: 'var(--font-serif)', fontSize: 160, color: 'rgba(255,255,255,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>❝</div>

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }} className="wod-grid">
              {/* Story */}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(228,185,74,0.7)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  ◈ MoneySpeak — Today&apos;s Term
                  <span style={{ flex: 1, height: 1, background: 'rgba(228,185,74,0.2)', display: 'block' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,3.2vw,44px)', fontWeight: 700, color: '#F8F4EC', letterSpacing: '-0.02em', marginBottom: 8 }}>Liquidity</div>
                <div style={{ fontSize: 16, color: 'rgba(248,244,236,0.65)', fontWeight: 300, lineHeight: 1.75, marginBottom: 16 }}>How quickly you can turn what you own into cash when you actually need it.</div>
                <div style={{ fontSize: 14, color: 'rgba(248,244,236,0.48)', fontStyle: 'italic', lineHeight: 1.8, borderTop: '1px solid rgba(248,244,236,0.08)', paddingTop: 14 }}>
                  A woman has saved ₦800,000 — all of it in a plot of land behind her village. One Thursday night, her child gets sick. Fever. She needs ₦60,000 by 6am Friday. She cannot call Oloriebi at 3am to buy land. She cannot package sand and carry it to the pharmacy. That ₦800,000 is hers, it is even gaining value, but <strong style={{ fontStyle: 'normal', color: 'rgba(248,244,236,0.82)' }}>right now when she needs it — it is completely useless to her.</strong> That is what illiquid means.
                </div>
              </div>

              {/* Reality decode */}
              <div style={{ padding: '20px 22px', background: 'rgba(248,244,236,0.06)', border: '1px solid rgba(248,244,236,0.1)', borderRadius: 8, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E4B94A', opacity: .8, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  The rule you walk away using
                  <span style={{ flex: 1, height: 1, background: 'rgba(228,185,74,0.2)', display: 'block' }} />
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 700, color: '#E4B94A', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.35 }}>
                  &ldquo;Always check the liquidity of an investment before you commit your money.&rdquo;
                </div>
                <div style={{ fontSize: 13, color: 'rgba(248,244,236,0.65)', lineHeight: 1.82, flex: 1 }}>
                  That phrase is just asking one question in a fancy way:<br /><br />
                  <strong style={{ color: 'rgba(248,244,236,0.9)' }}>&ldquo;If something happens and I need this back in seven days — can I get it out without losing money or waiting months?&rdquo;</strong><br /><br />
                  If the answer is no, the investment is illiquid. That is not automatically wrong. Land and long-term shares are supposed to be illiquid. The mistake is locking away your only money there and having nothing left for emergencies.<br /><br />
                  The woman did not make a bad investment. She made the mistake of having <strong style={{ color: 'rgba(248,244,236,0.9)' }}>no liquid money at all.</strong> Keep at least three months of your living expenses somewhere you can reach overnight. Invest the rest.
                </div>
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ marginTop: 16, paddingTop: 13, borderTop: '1px solid rgba(248,244,236,0.08)', fontSize: 12, color: 'rgba(228,185,74,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font)' }}>
                  See all 500 terms in MoneySpeak →
                </a>
              </div>
            </div>
          </div>

          {/* Help */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', background: '#EDE8DE', border: '1px solid rgba(10,61,34,0.1)', borderRadius: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#0A3D22', marginBottom: 4 }}>Need assistance?</div>
              <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.55 }}>Key not working · Wrong products unlocked · Did not receive your key after purchase</div>
            </div>
            <a href="mailto:hello@meridianng.com" style={{ padding: '10px 20px', background: 'transparent', color: '#0A3D22', border: '1.5px solid rgba(10,61,34,0.18)', borderRadius: 7, fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}>
              Email us →
            </a>
          </div>
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .meridian-sidebar { transform: translateX(0) !important; }
          .dash-main { margin-left: 255px; }
        }
        @media (max-width: 768px) {
          .meridian-sidebar { transform: translateX(-100%); }
          .meridian-sidebar.open-sb { transform: translateX(0); }
          .dash-main { margin-left: 0; }
          .products-grid { grid-template-columns: 1fr !important; }
          .wod-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        .pc-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(10,61,34,0.12) !important; }
        .pc-hover { transition: transform .22s, box-shadow .22s; }
      `}</style>
    </div>
  )
}
