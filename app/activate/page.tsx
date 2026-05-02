'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MeridianLogo } from '@/components/MeridianLogo'

export default function ActivatePage() {
  const [keyInput, setKeyInput] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [msg,      setMsg]      = useState('')
  const [msgOk,    setMsgOk]    = useState(false)
  const [done,     setDone]     = useState(false)

  async function handleActivate() {
    const k = keyInput.trim()
    if (!k) { setMsg('Paste your access key first.'); setMsgOk(false); return }
    setLoading(true); setMsg(''); 
    try {
      const res  = await fetch('/api/activate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k }) })
      const data = await res.json()
      if (data.success) {
        setMsg(`Products unlocked — ${(data.products || []).join(', ') || 'access granted'}. Redirecting to your dashboard.`)
        setMsgOk(true)
        setDone(true)
        setTimeout(() => { window.location.href = '/dashboard' }, 2000)
      } else {
        setMsg(data.error || 'Key not recognised. Double-check your purchase email or contact hello@meridianng.com.')
        setMsgOk(false)
      }
    } catch { setMsg('Connection error. Please try again in a moment.'); setMsgOk(false) }
    finally  { setLoading(false) }
  }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%}
        body{font-family:'Instrument Sans',system-ui,sans-serif;background:#F8F4EC;color:#1A1A1A;-webkit-font-smoothing:antialiased}
        /* Grain */
        body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.032'/%3E%3C/svg%3E");pointer-events:none;z-index:9998;mix-blend-mode:multiply}
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', zIndex:1 }}>

        {/* Nav */}
        <nav style={{ padding:'0 5vw', height:68, display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(248,244,236,0.94)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(10,59,31,0.1)', position:'sticky', top:0, zIndex:100 }}>
          <Link href="/" style={{ textDecoration:'none' }}>
            <MeridianLogo variant="full" theme="light" width={160}/>
          </Link>
          <Link href="/dashboard" style={{ fontFamily:'inherit', fontSize:14, fontWeight:600, color:'#0A3B1F', textDecoration:'none', padding:'9px 18px', border:'1.5px solid rgba(10,61,34,0.2)', borderRadius:4, transition:'all .2s' }}>
            Dashboard →
          </Link>
        </nav>

        {/* Main */}
        <main style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 68px)' }}>

          {/* Left — dark editorial panel */}
          <div style={{ background:'#0A3B1F', padding:'64px 56px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            {/* Giant key symbol watermark */}
            <div style={{ position:'absolute', bottom:-80, right:-60, fontSize:420, color:'rgba(255,255,255,0.025)', pointerEvents:'none', userSelect:'none', lineHeight:1, fontFamily:'monospace' }}>⌘</div>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#0A3B1F,#B8922A,#0A3B1F)' }}/>

            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, fontFamily:'monospace', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(240,216,150,0.6)', marginBottom:24 }}>
                <span style={{ display:'block', width:28, height:1, background:'rgba(240,216,150,0.4)', flexShrink:0 }}/>
                One last step
              </div>
              <h1 style={{ fontFamily:'Cormorant,Georgia,serif', fontSize:'clamp(38px,4vw,58px)', fontWeight:700, color:'#F8F4EC', lineHeight:1.06, letterSpacing:'-.015em', marginBottom:20 }}>
                Your key unlocks<br/>
                <em style={{ fontStyle:'italic', color:'#D4A83C' }}>everything.</em>
              </h1>
              <p style={{ fontSize:17, color:'rgba(248,244,236,0.58)', lineHeight:1.8, marginBottom:40, maxWidth:380 }}>
                When you bought a Meridian product on Selar, a unique access key was emailed to you immediately. Paste that key on the right and your products unlock right away — no waiting, no approval.
              </p>

              {/* Steps */}
              {[
                { n:'1', t:'Find your key', d:'Check the email you used on Selar. The subject line will say "Your Meridian access key". It is not your Selar login — it is a separate key inside the email.' },
                { n:'2', t:'Copy it exactly', d:'The key looks like this: XXXXX-XXXXX-XXXXXX-XXXXX. Copy the whole thing, including the dashes.' },
                { n:'3', t:'Paste and unlock', d:'Paste it into the field on the right and click Unlock. Your products appear in your dashboard immediately.' },
              ].map((s,i)=>(
                <div key={s.n} style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:i<2?24:0 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(248,244,236,0.08)', border:'1px solid rgba(248,244,236,0.16)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'monospace', fontSize:14, fontWeight:600, color:'rgba(212,168,60,0.8)', flexShrink:0 }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:600, color:'rgba(248,244,236,0.88)', marginBottom:4 }}>{s.t}</div>
                    <div style={{ fontSize:14, color:'rgba(248,244,236,0.45)', lineHeight:1.7 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ padding:'64px 56px', display:'flex', flexDirection:'column', justifyContent:'center', background:'#F8F4EC' }}>
            <div style={{ maxWidth:440 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, fontFamily:'monospace', fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'#B8922A', marginBottom:24 }}>
                <span style={{ display:'block', width:28, height:1, background:'#B8922A', flexShrink:0 }}/>
                Your Meridian account
              </div>
              <h2 style={{ fontFamily:'Cormorant,Georgia,serif', fontSize:'clamp(36px,3.5vw,52px)', fontWeight:700, color:'#0A3B1F', lineHeight:1.04, letterSpacing:'-.02em', marginBottom:12 }}>
                Activate<br/>your key.
              </h2>
              <p style={{ fontSize:16, color:'#6E6860', lineHeight:1.75, marginBottom:40 }}>
                Paste your Selar purchase key below and click Unlock. Your products unlock immediately.
              </p>

              {done ? (
                <div style={{ padding:'32px', background:'rgba(26,122,71,0.06)', border:'1px solid rgba(26,122,71,0.2)', borderRadius:10, textAlign:'center' }}>
                  <div style={{ width:52, height:52, background:'rgba(26,122,71,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#1A7A47', fontSize:22 }}>✓</div>
                  <div style={{ fontFamily:'Cormorant,Georgia,serif', fontSize:24, fontWeight:700, color:'#1A7A47', marginBottom:8 }}>Products unlocked.</div>
                  <div style={{ fontSize:14, color:'#6E6860', lineHeight:1.65 }}>{msg}<br/>Redirecting to your dashboard…</div>
                </div>
              ) : (
                <div style={{ background:'white', borderRadius:10, border:'1px solid rgba(10,61,34,0.1)', padding:'40px', boxShadow:'0 4px 24px rgba(10,61,34,0.07)' }}>
                  <label style={{ display:'block', fontFamily:'monospace', fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:'#6E6860', marginBottom:10 }}>
                    Your access key
                  </label>
                  <input
                    type="text"
                    value={keyInput}
                    onChange={e=>setKeyInput(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&handleActivate()}
                    placeholder="e.g. ABCDE-FGHIJ-KLMNO-PQRST"
                    autoFocus
                    style={{ width:'100%', padding:'14px 16px', background:'#F8F4EC', border:'1.5px solid rgba(10,61,34,0.15)', borderRadius:6, fontFamily:'monospace', fontSize:15, color:'#1A1A1A', outline:'none', letterSpacing:'0.06em', marginBottom:8, transition:'border-color .2s, box-shadow .2s' }}
                    onFocus={e=>{ e.currentTarget.style.borderColor='#0A3B1F'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(10,59,31,0.08)'; e.currentTarget.style.background='white' }}
                    onBlur={e=>{ e.currentTarget.style.borderColor='rgba(10,61,34,0.15)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='#F8F4EC' }}
                  />
                  <div style={{ fontSize:12, color:'#A8A8A8', marginBottom:28, lineHeight:1.6 }}>
                    Your key looks like: <span style={{ fontFamily:'monospace', color:'#B8922A', fontSize:11 }}>XXXXX-XXXXX-XXXXXX-XXXXX</span>. It was emailed to you right after your Selar purchase. Check your inbox and spam folder.
                  </div>

                  <button
                    onClick={handleActivate}
                    disabled={loading}
                    style={{ width:'100%', padding:'16px', background:'#0A3B1F', color:'#F8F4EC', border:'none', borderRadius:6, fontFamily:'inherit', fontSize:16, fontWeight:600, cursor:loading?'not-allowed':'pointer', opacity:loading?.7:1, letterSpacing:'.01em', transition:'all .22s' }}
                    onMouseEnter={e=>{ if (!loading) { (e.currentTarget as HTMLElement).style.background='#145C31'; (e.currentTarget as HTMLElement).style.transform='translateY(-1px)' } }}
                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background='#0A3B1F'; (e.currentTarget as HTMLElement).style.transform='none' }}
                  >
                    {loading ? 'Verifying your key…' : 'Unlock my products →'}
                  </button>

                  {msg && !msgOk && (
                    <div style={{ marginTop:16, padding:'12px 16px', borderRadius:6, fontSize:14, lineHeight:1.6, background:'rgba(192,57,43,0.06)', border:'1px solid rgba(192,57,43,0.18)', color:'#C0392B' }}>
                      {msg}
                    </div>
                  )}
                </div>
              )}

              {/* Help */}
              <div style={{ marginTop:24, display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ padding:'16px 20px', background:'var(--cream-2,#EDE8DE)', borderRadius:8, border:'1px solid rgba(10,61,34,0.08)' }}>
                  <div style={{ fontWeight:600, color:'#0A3B1F', fontSize:15, marginBottom:4 }}>Did not receive your key?</div>
                  <div style={{ fontSize:14, color:'#6E6860', lineHeight:1.65 }}>
                    Check your spam folder first. If it is not there, email <a href="mailto:hello@meridianng.com" style={{ color:'#0A3B1F', fontWeight:600 }}>hello@meridianng.com</a> with your Selar payment reference. We will sort it within the hour.
                  </div>
                </div>
                <div style={{ padding:'16px 20px', background:'var(--cream-2,#EDE8DE)', borderRadius:8, border:'1px solid rgba(10,61,34,0.08)' }}>
                  <div style={{ fontWeight:600, color:'#0A3B1F', fontSize:15, marginBottom:4 }}>Have not bought a product yet?</div>
                  <div style={{ fontSize:14, color:'#6E6860', lineHeight:1.65 }}>
                    <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{ color:'#0A3B1F', fontWeight:600 }}>Visit our Selar store →</a> MoneySpeak starts at ₦4,500. One-time payment, lifetime access.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile: stack panels vertically */}
        <style>{`
          @media(max-width:768px){
            main{grid-template-columns:1fr!important}
            main>div:first-child{padding:48px 24px!important}
            main>div:last-child{padding:40px 24px 60px!important}
          }
        `}</style>
      </div>
    </>
  )
}
