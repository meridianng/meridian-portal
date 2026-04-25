'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CopyButton } from '@/components/CopyButton'

// ── SVG Icons — no emojis except 👁 and 🙈 on password fields ──
const IconBook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconGrad = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IconLedger = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="2" y1="9" x2="8" y2="9"/><line x1="2" y1="15" x2="8" y2="15"/></svg>
const IconKey = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>
const IconOut = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const IconLock = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IconCheck = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IconClock = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IconHelp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const IconHome = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconSignout = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const IconGrid = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>

// ── Products ──
const PRODUCTS = [
  { id:'dictionary', name:'MoneySpeak',      tag:'500 terms · Nigerian English',          desc:'Every financial word that has ever confused you — explained with a story you will actually recognise.',          Icon:IconBook,    url:'/dictionary',                                                        selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:false, price:'₦4,500',   accent:'#C8972A' },
  { id:'course',     name:'Stock School',    tag:'Zero to confident investor · 11 phases', desc:'From "what is a share?" to building a real NGX portfolio. No jargon. No assumed knowledge.',                  Icon:IconGrad,   url:process.env.NEXT_PUBLIC_COURSE_URL||'https://learn.meridianng.com',  selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:true,  price:'₦18,000',  accent:'#C8972A' },
  { id:'terminal',   name:'Equity Terminal', tag:'Analyse any company · Owner Earnings',   desc:'Enter numbers from any annual report. Get a plain-English verdict. You input the data. You make the call.',  Icon:IconChart,  url:process.env.NEXT_PUBLIC_TERMINAL_URL||'https://app.meridianng.com', selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:true,  price:'₦15,000',  accent:'#1A7A47' },
  { id:'tradaq',     name:'TraDaq',          tag:'Know your real profit · Coming soon',    desc:'Track your business money in 30 seconds a day. For market traders, IG sellers, and small business owners.', Icon:IconLedger, url:'/tradaq',                                                            selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:false, price:'₦9,000/yr', accent:'#D4891A' },
]

function planLabel(plan: string) {
  const m: Record<string,string> = {
    v2_tool:'Equity Terminal', v2_course:'Stock School', v2_dictionary:'MoneySpeak',
    v2_tradaq:'TraDaq', 'v2_meridian access':'Meridian Access', v2_combo:'Meridian Access', full:'Full Access',
  }
  return m[plan] || plan
}

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

interface Props {
  email:    string
  name:     string
  plan:     string | null
  key_:     string | null
  access:   Set<string>
}

export default function DashboardClient({ email, name, plan, key_, access }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activating,  setActivating]  = useState(false)
  const [keyVal,      setKeyVal]      = useState('')
  const [keyMsg,      setKeyMsg]      = useState('')
  const [keyMsgType,  setKeyMsgType]  = useState<'ok'|'err'|''>('')
  const supabase = createClient()

  const firstName   = name?.split(' ')[0] || email?.split('@')[0] || 'there'
  const hasKey      = !!key_
  const planDisplay = plan ? planLabel(plan) : null

  async function handleSignOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  async function handleActivate() {
    const k = keyVal.trim()
    if (!k) { setKeyMsg('Paste your access key first.'); setKeyMsgType('err'); return }
    setActivating(true); setKeyMsg('Verifying…'); setKeyMsgType('')
    try {
      const res  = await fetch('/api/activate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ key: k }) })
      const data = await res.json()
      if (data.success) {
        setKeyMsg('Access unlocked! Reloading your dashboard…'); setKeyMsgType('ok')
        setTimeout(() => window.location.reload(), 1200)
      } else {
        setKeyMsg(data.error || 'Key not recognised. Check your purchase email.'); setKeyMsgType('err')
      }
    } catch {
      setKeyMsg('Connection error. Please try again.'); setKeyMsgType('err')
    } finally { setActivating(false) }
  }

  return (
    <div style={{ display:'flex', minHeight:'100vh', position:'relative', zIndex:1 }}>

      {/* ── SIDEBAR OVERLAY (mobile) ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(10,61,34,0.5)', zIndex:98, backdropFilter:'blur(4px)' }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 252,
        background: 'var(--forest)',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        overflowY: 'auto',
        transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.18)',
        // Desktop always visible
        ...({} as Record<string,string>)
      }} className="sb-main">

        {/* Grain on sidebar */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, opacity:.45, pointerEvents:'none', zIndex:0 }} />
        {/* Giant M watermark */}
        <div style={{ position:'absolute', bottom:-80, right:-60, fontFamily:'var(--font-serif)', fontSize:400, fontWeight:900, color:'rgba(255,255,255,0.025)', userSelect:'none', pointerEvents:'none', lineHeight:1, zIndex:0 }}>M</div>

        {/* Brand */}
        <div style={{ padding:'28px 22px 20px', borderBottom:'1px solid rgba(249,246,239,0.08)', flexShrink:0, position:'relative', zIndex:1 }}>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:'rgba(249,246,239,0.1)', border:'1px solid rgba(249,246,239,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-serif)', fontSize:16, fontWeight:900, color:'var(--gold-light)', flexShrink:0 }}>M</div>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:13, fontWeight:500, letterSpacing:'0.2em', color:'var(--cream)', lineHeight:1 }}>MERIDIAN</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:8, letterSpacing:'0.18em', color:'rgba(249,246,239,0.35)', marginTop:3, textTransform:'uppercase' }}>Financial Intelligence</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(249,246,239,0.07)', flexShrink:0, position:'relative', zIndex:1 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(249,246,239,0.35)', marginBottom:4 }}>Signed in as</div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(249,246,239,0.6)', marginBottom:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{email}</div>
          {planDisplay && (
            <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', background:'rgba(200,151,42,0.18)', border:'1px solid rgba(200,151,42,0.28)', borderRadius:100, fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold-light)' }}>
              <span>◈</span> {planDisplay}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'16px 10px', display:'flex', flexDirection:'column', gap:2, position:'relative', zIndex:1 }}>
          <SBLabel>Overview</SBLabel>
          <SBItem icon={<IconGrid />} label="Dashboard" active />
          <SBItem icon={<IconKey />} label="Activate key" href="/activate" />

          <SBLabel style={{ marginTop:8 }}>My Products</SBLabel>
          {PRODUCTS.map(p => (
            <SBItem
              key={p.id}
              icon={<p.Icon />}
              label={p.name}
              locked={!access.has(p.id) && p.id !== 'tradaq'}
              soon={p.id === 'tradaq'}
              badge={p.id === 'tradaq' ? 'Soon' : undefined}
            />
          ))}
        </nav>

        {/* Upgrade prompt */}
        {!planDisplay && (
          <div style={{ margin:'0 10px 12px', background:'rgba(200,151,42,0.1)', border:'1px solid rgba(200,151,42,0.2)', borderRadius:8, padding:'16px', flexShrink:0, position:'relative', zIndex:1 }}>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:16, fontWeight:700, color:'var(--gold-light)', marginBottom:6, letterSpacing:'-0.01em' }}>Get everything.</div>
            <div style={{ fontSize:12, color:'rgba(249,246,239,0.45)', lineHeight:1.6, marginBottom:12 }}>All 4 products for ₦35,000. Save ₦11,500.</div>
            <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ display:'block', width:'100%', padding:9, background:'var(--gold)', color:'white', borderRadius:4, fontSize:12, fontWeight:600, textAlign:'center', textDecoration:'none' }}>
              Meridian Access →
            </a>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding:'14px 10px 20px', borderTop:'1px solid rgba(249,246,239,0.07)', flexShrink:0, display:'flex', flexDirection:'column', gap:2, position:'relative', zIndex:1 }}>
          <SBFooterLink icon={<IconHome />} label="Back to website" href="/" />
          <SBFooterLink icon={<IconMail />} label="Get help" href="mailto:hello@meridianng.com" />
          <button onClick={handleSignOut} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:6, fontSize:13, color:'rgba(249,246,239,0.45)', cursor:'pointer', transition:'all .18s', background:'none', border:'none', fontFamily:'var(--font)', width:'100%', textAlign:'left' }}>
            <span style={{ width:20, display:'flex', justifyContent:'center', color:'rgba(249,246,239,0.45)' }}><IconSignout /></span>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minHeight:'100vh' }} className="dash-main-content">

        {/* ── TOP BAR ── */}
        <header style={{ background:'rgba(249,246,239,0.96)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(10,61,34,0.1)', padding:'0 28px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(o => !o)}
              style={{ background:'none', border:'1.5px solid rgba(10,61,34,0.15)', borderRadius:6, padding:'6px 8px', cursor:'pointer', display:'flex', flexDirection:'column', gap:4, flexShrink:0 }}
              aria-label="Toggle menu"
            >
              <span style={{ width:18, height:1.5, background:'var(--forest)', display:'block' }} />
              <span style={{ width:18, height:1.5, background:'var(--forest)', display:'block' }} />
              <span style={{ width:18, height:1.5, background:'var(--forest)', display:'block' }} />
            </button>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)' }}>
              Dashboard / <strong style={{ color:'var(--forest)', fontWeight:500 }}>Overview</strong>
            </div>
          </div>

          {/* WOD pill — topbar right */}
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 16px', background:'rgba(10,61,34,0.07)', borderRadius:100, border:'1px solid rgba(10,61,34,0.12)', cursor:'pointer', flexShrink:0 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--gold)' }}>Word of the Day</span>
            <span style={{ fontFamily:'var(--font-serif)', fontSize:15, fontWeight:700, color:'var(--forest)' }}>Liquidity</span>
          </div>
        </header>

        {/* ── BODY ── */}
        <main style={{ padding:'40px 32px 80px', flex:1 }}>

          {/* ── WELCOME BANNER (green, editorial) ── */}
          <div style={{ background:'var(--forest)', borderRadius:12, padding:'40px 44px', marginBottom:32, position:'relative', overflow:'hidden' }}>
            {/* M watermark */}
            <div style={{ position:'absolute', right:-50, top:'50%', transform:'translateY(-50%)', fontFamily:'var(--font-serif)', fontSize:340, fontWeight:900, color:'rgba(255,255,255,0.025)', pointerEvents:'none', lineHeight:1, userSelect:'none' }}>M</div>
            {/* Grain */}
            <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`, pointerEvents:'none', opacity:.5 }} />

            <div style={{ position:'relative', zIndex:1 }}>
              {/* Eyebrow */}
              <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(228,185,74,0.65)', marginBottom:14, display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ display:'block', width:24, height:1, background:'rgba(228,185,74,0.45)', flexShrink:0 }} />
                {greeting()}
              </div>

              {/* Name — bold serif, no period */}
              <div style={{ fontFamily:'var(--font-mono)', fontSize:15, color:'rgba(249,246,239,0.5)', marginBottom:6, letterSpacing:'0.02em' }}>Welcome back,</div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(36px,4vw,56px)', fontWeight:900, color:'var(--cream)', lineHeight:1.04, letterSpacing:'-0.02em', marginBottom:14 }}>
                <span style={{ color:'var(--gold-light)' }}>{firstName.toUpperCase()}</span>
              </div>

              <div style={{ fontSize:16, color:'rgba(249,246,239,0.58)', fontWeight:300, lineHeight:1.7, maxWidth:480 }}>
                {access.size > 0
                  ? `You have ${access.size} product${access.size > 1 ? 's' : ''} active and ready. Open any of them below.`
                  : 'Your dashboard is ready. Paste your access key from your Selar purchase email to unlock your products.'}
              </div>

              {/* Quick stats */}
              {access.size > 0 && (
                <div style={{ display:'flex', gap:20, marginTop:24, flexWrap:'wrap' }}>
                  <div style={{ padding:'10px 18px', background:'rgba(249,246,239,0.07)', border:'1px solid rgba(249,246,239,0.12)', borderRadius:8 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(228,185,74,0.6)', marginBottom:4 }}>Products Active</div>
                    <div style={{ fontFamily:'var(--font-serif)', fontSize:28, fontWeight:700, color:'var(--gold-light)', lineHeight:1 }}>{access.size}</div>
                  </div>
                  <div style={{ padding:'10px 18px', background:'rgba(249,246,239,0.07)', border:'1px solid rgba(249,246,239,0.12)', borderRadius:8 }}>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(228,185,74,0.6)', marginBottom:4 }}>Plan</div>
                    <div style={{ fontFamily:'var(--font-serif)', fontSize:18, fontWeight:700, color:'var(--cream)', lineHeight:1 }}>{planDisplay || 'Free'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── KEY DISPLAY ── */}
          {hasKey && (
            <div style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 22px', background:'rgba(200,151,42,0.06)', border:'1px solid rgba(200,151,42,0.3)', borderLeft:'4px solid var(--gold)', borderRadius:'0 10px 10px 0', marginBottom:28, flexWrap:'wrap' }}>
              <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(200,151,42,0.12)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', flexShrink:0 }}><IconKey /></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:4 }}>Your access key</div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--gold)', letterSpacing:'0.06em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginBottom:5 }}>{key_}</div>
                {planDisplay && (
                  <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:'rgba(26,122,71,0.1)', border:'1px solid rgba(26,122,71,0.22)', borderRadius:4, fontFamily:'var(--font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#1A7A47' }}>
                    <IconCheck /> {planDisplay} — active
                  </div>
                )}
              </div>
              <CopyButton text={key_!} />
            </div>
          )}

          {/* ── ACTIVATE BANNER ── */}
          {!hasKey && (
            <div style={{ background:'white', borderRadius:10, border:'1px solid rgba(10,61,34,0.1)', borderLeft:'4px solid var(--gold)', borderRadius2:'0 10px 10px 0', padding:'22px 26px', marginBottom:28 }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:14, flexWrap:'wrap' }}>
                <div style={{ width:40, height:40, borderRadius:'50%', background:'rgba(200,151,42,0.1)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', flexShrink:0, marginTop:2 }}><IconKey /></div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontFamily:'var(--font-serif)', fontSize:18, fontWeight:700, color:'var(--forest)', marginBottom:4 }}>Activate your access key</div>
                  <div style={{ fontSize:14, color:'var(--muted)', lineHeight:1.6, marginBottom:16 }}>Already bought a Meridian product? Paste your key here. Your key was emailed to you right after your Selar purchase.</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <input
                      type="text"
                      value={keyVal}
                      onChange={e => setKeyVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleActivate()}
                      placeholder="Paste your key: XXXXX-XXXXX-XXXXXX-XXXXX"
                      style={{ flex:1, minWidth:220, padding:'11px 14px', border:'1.5px solid rgba(10,61,34,0.18)', borderRadius:6, fontFamily:'var(--font-mono)', fontSize:13, color:'var(--charcoal)', outline:'none', background:'var(--cream)', letterSpacing:'0.04em' }}
                    />
                    <button
                      onClick={handleActivate}
                      disabled={activating}
                      style={{ padding:'11px 22px', background:'var(--forest)', color:'var(--cream)', border:'none', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'var(--font)', whiteSpace:'nowrap', opacity:activating?0.7:1 }}
                    >
                      {activating ? 'Checking…' : 'Activate →'}
                    </button>
                  </div>
                  {keyMsg && (
                    <div style={{ marginTop:10, fontSize:13, color:keyMsgType==='ok'?'var(--green-ok)':keyMsgType==='err'?'var(--red)':'var(--muted)', lineHeight:1.5 }}>{keyMsg}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          <div style={{ fontFamily:'var(--font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--muted-light)', marginBottom:18, display:'flex', alignItems:'center', gap:10 }}>
            Your products
            <span style={{ flex:1, height:1, background:'rgba(10,61,34,0.1)', display:'block' }} />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:18, marginBottom:40 }} className="products-grid">
            {PRODUCTS.map(p => {
              const unlocked = access.has(p.id)
              const soon     = p.id === 'tradaq'
              let   href     = p.url
              if (unlocked && p.id === 'terminal' && key_) href = `${p.url}?k=${key_}`
              if (unlocked && p.id === 'course'   && key_) href = `${p.url}?k=${key_}`

              return (
                <div key={p.id} style={{ background:'white', border:`1px solid ${unlocked ? 'rgba(200,151,42,0.3)' : 'rgba(10,61,34,0.1)'}`, borderRadius:10, overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:unlocked?'0 4px 20px rgba(200,151,42,0.12)':'none', opacity:soon?0.55:unlocked?1:0.8, transition:'transform .22s, box-shadow .22s' }} className="product-card">
                  {/* Accent bar */}
                  <div style={{ height:4, background:`linear-gradient(90deg, ${p.accent}, rgba(${p.accent==='#1A7A47'?'26,122,71':'200,151,42'},0.2))` }} />

                  <div style={{ padding:'20px 22px', flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 }}>
                      <div style={{ width:42, height:42, background:unlocked?'rgba(200,151,42,0.1)':'rgba(10,61,34,0.06)', border:`1px solid ${unlocked?'rgba(200,151,42,0.25)':'rgba(10,61,34,0.08)'}`, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:unlocked?'var(--gold)':'var(--muted)' }}>
                        <p.Icon />
                      </div>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:4, padding:'4px 9px', borderRadius:4, fontFamily:'var(--font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', background:soon?'rgba(212,137,26,0.1)':unlocked?'rgba(26,122,71,0.1)':'rgba(10,61,34,0.06)', border:`1px solid ${soon?'rgba(212,137,26,0.2)':unlocked?'rgba(26,122,71,0.22)':'rgba(10,61,34,0.1)'}`, color:soon?'#D4891A':unlocked?'#1A7A47':'var(--muted)' }}>
                        {soon?<><IconClock />&nbsp;Soon</>:unlocked?<><IconCheck />&nbsp;Active</>:<><IconLock />&nbsp;Locked</>}
                      </div>
                    </div>

                    <div style={{ fontFamily:'var(--font-serif)', fontSize:22, fontWeight:800, color:'var(--forest)', letterSpacing:'-0.01em', marginBottom:3 }}>{p.name}</div>
                    <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.06em', textTransform:'uppercase', color:unlocked?'var(--gold)':'var(--muted-light)', marginBottom:10 }}>{p.tag}</div>
                    <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.7, flex:1, marginBottom:18 }}>{p.desc}</div>

                    <div style={{ paddingTop:14, borderTop:'1px solid rgba(10,61,34,0.08)' }}>
                      {soon ? (
                        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'#D4891A', letterSpacing:'0.04em' }}>{p.price} — in development</div>
                      ) : unlocked ? (
                        <a href={href} target={p.url.startsWith('http')?'_blank':undefined} rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, width:'100%', padding:'12px 16px', background:'var(--forest)', color:'var(--cream)', border:'none', borderRadius:7, fontSize:14, fontWeight:600, cursor:'pointer', textDecoration:'none', fontFamily:'var(--font)' }}>
                          Open {p.name} <IconOut />
                        </a>
                      ) : (
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--gold)', letterSpacing:'0.04em' }}>{p.price}</div>
                          <a href={p.selar} target="_blank" rel="noopener noreferrer" style={{ padding:'9px 16px', background:'transparent', color:'var(--forest)', border:'1.5px solid rgba(10,61,34,0.2)', borderRadius:6, fontSize:13, fontWeight:600, cursor:'pointer', textDecoration:'none', fontFamily:'var(--font)' }}>
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

          {/* ── WORD OF THE DAY (full section) ── */}
          <div style={{ fontFamily:'var(--font-mono)', fontSize:9, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--muted-light)', marginBottom:18, display:'flex', alignItems:'center', gap:10 }}>
            Word of the Day — always free
            <span style={{ flex:1, height:1, background:'rgba(10,61,34,0.1)', display:'block' }} />
          </div>

          <div style={{ background:'var(--forest)', borderRadius:12, padding:'36px 40px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', bottom:-20, right:20, fontFamily:'var(--font-serif)', fontSize:180, color:'rgba(255,255,255,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>❝</div>
            <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E")`, pointerEvents:'none', opacity:.4 }} />

            <div style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }} className="wod-inner">
              {/* Left: story */}
              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(228,185,74,0.7)', marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
                  ◈ MoneySpeak — Today&apos;s Term
                  <span style={{ flex:1, height:1, background:'rgba(228,185,74,0.2)', display:'block' }} />
                </div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(32px,3.5vw,48px)', fontWeight:900, color:'var(--cream)', letterSpacing:'-0.02em', marginBottom:10 }}>Liquidity</div>
                <div style={{ fontSize:16, color:'rgba(249,246,239,0.68)', fontWeight:300, lineHeight:1.75, marginBottom:18 }}>
                  How quickly you can turn what you own into cash when you actually need it.
                </div>
                <div style={{ fontSize:14, color:'rgba(249,246,239,0.5)', fontStyle:'italic', lineHeight:1.8, borderTop:'1px solid rgba(249,246,239,0.08)', paddingTop:14 }}>
                  A woman has saved ₦800,000 — all of it in a plot of land behind her village. One Thursday night, her child wakes with terrible fever. She needs ₦60,000 for the hospital by 6am. She cannot call Oloriebi to buy land at 3am. <strong style={{ fontStyle:'normal', color:'rgba(249,246,239,0.82)' }}>That ₦800,000 is hers, it is even gaining value, but right now it is completely useless to her.</strong> That is what illiquid means.
                </div>
              </div>

              {/* Right: reality decode */}
              <div style={{ padding:'22px 24px', background:'rgba(249,246,239,0.06)', border:'1px solid rgba(249,246,239,0.1)', borderRadius:8, display:'flex', flexDirection:'column' }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--gold-light)', opacity:.8, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                  The rule you walk away using
                  <span style={{ flex:1, height:1, background:'rgba(228,185,74,0.2)', display:'block' }} />
                </div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:17, fontWeight:700, color:'var(--gold-light)', fontStyle:'italic', marginBottom:12, lineHeight:1.35 }}>
                  &ldquo;Always check the liquidity of an investment before you put your money in.&rdquo;
                </div>
                <div style={{ fontSize:13, color:'rgba(249,246,239,0.68)', lineHeight:1.8, flex:1 }}>
                  That phrase is just asking one question: <strong style={{ color:'rgba(249,246,239,0.9)' }}>&ldquo;If something happens and I need this back in seven days — can I get it out?&rdquo;</strong>
                  <br /><br />
                  If the answer is no, that investment is illiquid. Not automatically bad — land and long-term shares are supposed to be illiquid. The mistake is locking away your only money there. <strong style={{ color:'rgba(249,246,239,0.9)' }}>Keep at least three months of your expenses somewhere you can reach overnight.</strong> The woman&apos;s problem was not that she owned land. It was that she had nothing else.
                </div>
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ marginTop:18, paddingTop:14, borderTop:'1px solid rgba(249,246,239,0.08)', fontSize:12, color:'rgba(228,185,74,0.7)', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontWeight:600, textDecoration:'none', fontFamily:'var(--font)' }}>
                  See all 500 terms in MoneySpeak →
                </a>
              </div>
            </div>
          </div>

          {/* ── HELP ── */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, padding:'20px 24px', background:'var(--cream-dark)', border:'1px solid rgba(10,61,34,0.1)', borderRadius:10, marginTop:28, flexWrap:'wrap' }}>
            <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ color:'var(--muted)', marginTop:2 }}><IconHelp /></div>
              <div>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:17, fontWeight:700, color:'var(--forest)', marginBottom:4 }}>Need help?</div>
                <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.55 }}>Key not working · Wrong products unlocked · Didn&apos;t receive your key after purchase</div>
              </div>
            </div>
            <a href="mailto:hello@meridianng.com" style={{ padding:'10px 20px', background:'transparent', color:'var(--forest)', border:'1.5px solid rgba(10,61,34,0.18)', borderRadius:7, fontSize:14, fontWeight:600, textDecoration:'none', fontFamily:'var(--font)', whiteSpace:'nowrap' }}>
              Email us →
            </a>
          </div>

        </main>
      </div>

      <style>{`
        .sb-main { } /* desktop always visible */
        @media (min-width: 769px) {
          .sb-main { transform: translateX(0) !important; }
          .dash-main-content { margin-left: 252px; }
        }
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: 1fr !important; }
          .wod-inner { grid-template-columns: 1fr !important; gap: 24px !important; }
          .dash-main-content { margin-left: 0; }
        }
        .product-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(10,61,34,0.12) !important; }
      `}</style>
    </div>
  )
}

// ── Small sidebar components ──
function SBLabel({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return <div style={{ fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(249,246,239,0.28)', padding:'8px 12px 6px', ...style }}>{children}</div>
}

function SBItem({ icon, label, active, locked, soon, badge, href }: { icon:React.ReactNode, label:string, active?:boolean, locked?:boolean, soon?:boolean, badge?:string, href?:string }) {
  const base: React.CSSProperties = { display:'flex', alignItems:'center', gap:10, padding:'11px 12px', borderRadius:6, fontSize:13, fontWeight:500, color:active?'var(--cream)':'rgba(249,246,239,0.6)', cursor:locked?'default':'pointer', background:active?'rgba(249,246,239,0.1)':'transparent', transition:'all .18s', borderLeft:`3px solid ${active?'var(--gold-light)':'transparent'}`, opacity:locked&&!soon?0.7:1, textDecoration:'none' }
  const inner = <>
    <span style={{ width:20, display:'flex', justifyContent:'center', flexShrink:0 }}>{icon}</span>
    <span style={{ flex:1 }}>{label}</span>
    {locked && !soon && <span style={{ fontSize:11, opacity:.4 }}><IconLock /></span>}
    {soon   && <span style={{ marginLeft:'auto', background:'rgba(200,151,42,0.18)', color:'var(--gold-light)', fontFamily:'var(--font-mono)', fontSize:8, padding:'2px 7px', borderRadius:100, letterSpacing:'0.08em' }}>Soon</span>}
    {badge  && <span style={{ marginLeft:'auto', background:'rgba(200,151,42,0.18)', color:'var(--gold-light)', fontFamily:'var(--font-mono)', fontSize:8, padding:'2px 7px', borderRadius:100, letterSpacing:'0.08em' }}>{badge}</span>}
  </>
  if (href) return <a href={href} style={base}>{inner}</a>
  return <div style={base}>{inner}</div>
}

function SBFooterLink({ icon, label, href }: { icon:React.ReactNode, label:string, href:string }) {
  return <a href={href} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:6, fontSize:13, color:'rgba(249,246,239,0.45)', cursor:'pointer', transition:'all .18s', textDecoration:'none', fontFamily:'var(--font)' }}>
    <span style={{ width:20, display:'flex', justifyContent:'center' }}>{icon}</span>
    {label}
  </a>
}
