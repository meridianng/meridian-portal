'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MeridianLogo } from '@/components/MeridianLogo'
import { createClient } from '@/lib/supabase/client'

// WOD rotates by day of week — same array as landing page
const DAILY_WORDS = [
  { term:'Liquidity',    ph:'lik · wid · i · tee',     def:'How quickly you can turn what you own into cash when you actually need it.',                      story:'A woman has saved ₦800,000 — all in a plot of land. One Thursday night, her child gets sick. She needs ₦60,000 by 6am Friday. She cannot call Oloriebi at 3am to buy land. That ₦800,000 is hers, but right now when she needs it — it is completely useless to her.', rule:'"Always check the liquidity of an investment before you commit your money."' },
  { term:'Inflation',    ph:'in · flay · shun',         def:'The quiet thief that makes your money buy less every year — even when you do nothing wrong.',       story:'In 2015, your ₦500 was a bodybuilder — jollof, two meats, cold Malt, change left. Today? That same ₦500 is a lanky secondary school boy. Same paper. Same number. The spirit of the money has traveled. That ghost is inflation.',                           rule:'"If your savings pays 8% and inflation is 22%, you are getting poorer even while saving."' },
  { term:'Compounding',  ph:'kom · pown · ding',        def:'When your money earns returns — and then those returns start earning returns too.',                 story:"One male goat. One female goat. They have kids. You don't kill them for pepper soup. The kids grow up and have more kids. Before you know it, your backyard has 50 goats from just two. The goats built each other. That is compounding.",                          rule:'"Start early. Even small amounts compound into serious wealth over 10–20 years."' },
  { term:'Dividend',     ph:'div · ih · dend',          def:"A share of a company's profits paid to shareholders simply for owning the shares.",                 story:'You bought Zenith Bank shares. At year end, the board says: "We made good profit — let us share thank-you money with our owners." You get a credit alert while eating suya. You did nothing. That alert is your dividend.',                                       rule:'"A company that pays consistent dividends for 10+ years is usually stable and trustworthy."' },
  { term:'Equity',       ph:'ek · wi · tee',            def:'What you actually own — the value that is truly yours after all debts are removed.',               story:'Uncle Emeka bought a house for ₦25M. He paid ₦5M cash and took a ₦20M mortgage. His equity is only ₦5M — because the bank owns ₦20M of it. Equity is real ownership.',                                                                                              rule:'"Before celebrating an asset\'s value, subtract what you owe. What remains is your equity."' },
  { term:'ROI',          ph:'ar · oh · eye',            def:'The percentage of profit you made compared to how much you originally put in.',                     story:'Mama Chioma buys 20 crates of eggs for ₦80,000 and sells them for ₦100,000. Her ROI is 25%. Her neighbour invests the same in a "digital forex platform" and gets back ₦84,000 after six months — a 5% ROI. ROI lets you compare these two on the same scale.',  rule:'"Always ask: what is my ROI, and how long will it take? Both numbers matter."' },
  { term:'Bull Market',  ph:'bool · mar · ket',         def:'A period when prices in the stock market are rising broadly and investor confidence is high.',      story:'Detty December vibes in the stock market. Your barber is recommending shares. The Uber driver has three investment apps. Prices are going up. Everyone is happy. That season of rising prices and contagious excitement — that is a bull market.',                    rule:'"A bull market is when to be careful, not when to abandon caution."' },
]

export default function LoginPage() {
  const supabase = createClient()
  const todayWord = DAILY_WORDS[new Date().getDay()]

  const [activeTab, setActiveTab] = useState<'signin'|'signup'>('signin')
  const [siEmail,   setSiEmail]   = useState('')
  const [siPwd,     setSiPwd]     = useState('')
  const [siShowPwd, setSiShowPwd] = useState(false)
  const [siLoading, setSiLoading] = useState(false)
  const [siError,   setSiError]   = useState('')
  const [suName,    setSuName]    = useState('')
  const [suEmail,   setSuEmail]   = useState('')
  const [suPwd,     setSuPwd]     = useState('')
  const [suShowPwd, setSuShowPwd] = useState(false)
  const [suLoading, setSuLoading] = useState(false)
  const [suError,   setSuError]   = useState('')
  const [suSuccess, setSuSuccess] = useState(false)
  const [forgotMsg, setForgotMsg] = useState('')

  async function handleSignin(e: React.FormEvent) {
    e.preventDefault(); setSiError(''); setSiLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: siEmail.trim().toLowerCase(), password: siPwd })
    if (error) { setSiError(error.message.toLowerCase().includes('invalid') ? 'Wrong email or password. Double-check and try again.' : error.message); setSiLoading(false); return }
    window.location.href = '/dashboard'
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault(); setSuError('')
    if (suPwd.length < 8) { setSuError('Password must be at least 8 characters.'); return }
    setSuLoading(true)
    const { error } = await supabase.auth.signUp({ email: suEmail.trim().toLowerCase(), password: suPwd, options: { data: { full_name: suName.trim() } } })
    if (error) { setSuError(error.message.includes('already registered') ? 'This email already has an account. Switch to Sign in.' : error.message); setSuLoading(false); return }
    const { data: { session } } = await supabase.auth.getSession()
    if (session) { window.location.href = '/dashboard' } else { setSuSuccess(true); setSuLoading(false) }
  }

  async function handleForgot() {
    const email = siEmail.trim().toLowerCase()
    if (!email || !email.includes('@')) { setSiError('Enter your email address above first, then click Forgot password.'); return }
    setForgotMsg('')
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    setForgotMsg(`Reset link sent to ${email}. Check your inbox and spam folder.`)
  }

  const inputStyle = (focused: boolean = false): React.CSSProperties => ({
    width:'100%', padding:'13px 16px',
    background:'#F8F4EC',
    border:`1.5px solid ${focused ? '#0A3B1F' : 'rgba(10,59,31,0.18)'}`,
    borderRadius:6, fontFamily:'inherit', fontSize:16,
    color:'#1A1A1A', outline:'none', letterSpacing:'0.01em',
    transition:'border-color .2s, box-shadow .2s',
    boxShadow: focused ? '0 0 0 3px rgba(10,59,31,0.08)' : 'none',
  })

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%}
        body{font-family:'Instrument Sans',system-ui,sans-serif;background:#F8F4EC;color:#1A1A1A;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        .auth-wrap{display:flex;min-height:100vh}

        /* LEFT — green editorial panel */
        .auth-left{
          width:46%;flex-shrink:0;
          background:#0A3B1F;overflow:hidden;
          padding:52px 56px;
          display:flex;flex-direction:column;justify-content:space-between;
          position:relative;overflow:hidden;
        }
        /* Giant M watermark */
        .auth-left::before{
          content:'M';
          position:absolute;
          bottom:-120px;right:-60px;
          font-family:'Cormorant',Georgia,serif;
          font-size:min(680px,160vw);font-weight:900;
          color:rgba(255,255,255,0.028);
          pointer-events:none;line-height:1;user-select:none;
          animation:m-breathe 7s ease-in-out infinite;
        }
        /* Subtle top accent line */
        .auth-left::after{
          content:'';
          position:absolute;top:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,#0A3B1F,#B8922A,#0A3B1F);
        }
        @keyframes m-breathe{0%,100%{opacity:.028}50%{opacity:.044}}

        .auth-brand{position:relative;z-index:1}
        .auth-copy{position:relative;z-index:1;padding:40px 0 32px}
        .auth-eyebrow{
          display:inline-flex;align-items:center;gap:10px;
          font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
          color:rgba(240,216,150,0.65);margin-bottom:20px;
        }
        .auth-eyebrow::before{content:'';display:block;width:28px;height:1px;background:rgba(240,216,150,0.4);flex-shrink:0}
        .auth-headline{
          font-family:'Cormorant',Georgia,serif;
          font-size:clamp(34px,3.2vw,50px);font-weight:700;
          color:#F8F4EC;line-height:1.1;letter-spacing:-.015em;
          margin-bottom:20px;
        }
        .auth-headline em{font-style:italic;color:#D4A83C;display:block}
        .auth-body{font-size:16px;color:rgba(248,244,236,0.58);line-height:1.8}
        .auth-body strong{color:rgba(248,244,236,0.85);font-weight:600}

        /* WOD card in left panel */
        .auth-wod{
          position:relative;z-index:1;
          background:rgba(248,244,236,0.06);
          border:1px solid rgba(248,244,236,0.1);
          border-radius:10px;
          padding:24px 28px;
          overflow:hidden;
        }
        .auth-wod::before{
          content:'';position:absolute;top:0;left:0;right:0;height:2px;
          background:linear-gradient(90deg,#B8922A,#D4A83C,transparent);
          animation:wod-shimmer 4s linear infinite;background-size:200% auto;
        }
        @keyframes wod-shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .auth-wod-lbl{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:rgba(212,168,60,0.7);margin-bottom:12px;display:flex;align-items:center;gap:8px}
        .auth-wod-lbl::after{content:'';flex:1;height:1px;background:rgba(212,168,60,0.2)}
        .auth-wod-term{font-family:'Cormorant',Georgia,serif;font-size:28px;font-weight:700;color:#F8F4EC;margin-bottom:4px;letter-spacing:-.01em}
        .auth-wod-ph{font-family:'DM Mono',monospace;font-size:11px;color:rgba(248,244,236,0.32);margin-bottom:10px}
        .auth-wod-def{font-size:14px;color:rgba(248,244,236,0.68);line-height:1.7;margin-bottom:12px}
        .auth-wod-story{font-size:13px;color:rgba(248,244,236,0.42);font-style:italic;line-height:1.75;border-top:1px solid rgba(248,244,236,0.08);padding-top:12px}
        .auth-wod-rule{margin-top:10px;padding:10px 14px;background:rgba(212,168,60,0.08);border-radius:4px;font-family:'DM Mono',monospace;font-size:11px;color:rgba(212,168,60,0.75);line-height:1.6;font-style:normal}

        /* RIGHT — form */
        .auth-right{
          flex:1;
          display:flex;align-items:center;justify-content:center;
          padding:60px 5vw;
          background:#F8F4EC;
          position:relative;
        }
        /* Subtle grain */
        .auth-right::before{
          content:'';position:fixed;inset:0;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events:none;z-index:0;mix-blend-mode:multiply;
        }
        .auth-card{
          width:100%;max-width:460px;
          position:relative;z-index:1;
        }
        .auth-form-eyebrow{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#B8922A;margin-bottom:14px;display:flex;align-items:center;gap:10px}
        .auth-form-eyebrow::before{content:'';display:block;width:28px;height:1px;background:#B8922A;flex-shrink:0}
        .auth-heading{font-family:'Cormorant',Georgia,serif;font-size:clamp(38px,4vw,52px);font-weight:700;color:#0A3B1F;letter-spacing:-.02em;margin-bottom:10px;line-height:1.04}
        .auth-sub{font-size:16px;color:#6E6860;line-height:1.7;margin-bottom:32px}

        .auth-tabs{display:flex;border:1px solid rgba(10,59,31,0.15);border-radius:8px;overflow:hidden;margin-bottom:32px}
        .auth-tab{flex:1;padding:11px 20px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;border:none;background:transparent;color:#6E6860;transition:all .2s}
        .auth-tab.active{background:#0A3B1F;color:#F8F4EC}
        .auth-tab:not(.active):hover{background:rgba(10,59,31,0.05);color:#0A3B1F}

        .form-group{margin-bottom:20px}
        .form-label{display:block;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#6E6860;margin-bottom:8px}
        .form-label-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .form-label-link{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;color:#B8922A;background:none;border:none;cursor:pointer;transition:color .2s;padding:0}
        .form-label-link:hover{color:#D4A83C}
        .form-input{
          display:block;width:100%;padding:13px 16px;
          background:#F8F4EC;border:1.5px solid rgba(10,59,31,0.18);
          border-radius:6px;font-family:inherit;font-size:16px;
          color:#1A1A1A;outline:none;transition:all .2s;
        }
        .form-input:focus{
          border-color:#0A3B1F;
          box-shadow:0 0 0 3px rgba(10,59,31,0.08);
          border-left-color:#B8922A;border-left-width:2.5px;
          background:white;
        }
        .form-input-wrap{position:relative}
        .form-input-wrap .form-input{padding-right:44px}
        .form-input-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#A8A8A8;display:flex;align-items:center;padding:2px;transition:color .2s}
        .form-input-toggle:hover{color:#0A3B1F}

        .btn-primary{
          display:flex;align-items:center;justify-content:center;gap:8px;
          width:100%;padding:15px;
          background:#0A3B1F;color:#F8F4EC;
          border:none;border-radius:6px;
          font-family:inherit;font-size:16px;font-weight:600;
          cursor:pointer;transition:all .22s;letter-spacing:.01em;
          margin-top:8px;
        }
        .btn-primary:hover:not(:disabled){background:#145C31;transform:translateY(-1px);box-shadow:0 8px 24px rgba(10,59,31,0.22)}
        .btn-primary:disabled{opacity:.65;cursor:not-allowed}

        .auth-error{
          padding:12px 16px;background:rgba(192,57,43,0.06);
          border:1px solid rgba(192,57,43,0.18);border-radius:6px;
          font-size:14px;color:#C0392B;line-height:1.6;margin-top:12px;
        }
        .auth-success{
          padding:12px 16px;background:rgba(26,122,71,0.07);
          border:1px solid rgba(26,122,71,0.2);border-radius:6px;
          font-size:14px;color:#1A7A47;line-height:1.6;margin-top:12px;
        }
        .auth-bottom-link{
          margin-top:28px;text-align:center;
          font-size:14px;color:#6E6860;
        }
        .auth-bottom-link a{color:#0A3B1F;font-weight:600;cursor:pointer;transition:color .2s}
        .auth-bottom-link a:hover{color:#145C31}

        @media(max-width:820px){
          .auth-wrap{flex-direction:column}
          input,select,textarea{font-size:16px!important}
          .auth-left{width:100%;padding:36px 24px 32px}
          .auth-wod{display:none}
          .auth-right{padding:48px 24px 60px}
        }
      `}</style>

      <div className="auth-wrap">

        {/* ── LEFT PANEL ── */}
        <div className="auth-left">
          {/* Brand */}
          <div className="auth-brand">
            <Link href="/" style={{ textDecoration:'none', display:'block' }}>
              <MeridianLogo variant="full" theme="dark" width={200}/>
            </Link>
          </div>

          {/* Editorial copy */}
          <div className="auth-copy">
            <div className="auth-eyebrow">Your account</div>
            <h2 className="auth-headline">
              Finance was never too hard for you.
              <em>It was just explained badly.</em>
            </h2>
            <p className="auth-body">
              Sign in to access every Meridian product you have paid for — the dictionary, the course, the stock analyser, and the business tracker. <strong>All in one place.</strong>
            </p>
          </div>

          {/* WOD — visible on laptop, hidden on mobile */}
          <div className="auth-wod">
            <div className="auth-wod-lbl">MoneySpeak · Word of the Day · Free</div>
            <div className="auth-wod-term">{todayWord.term}</div>
            <div className="auth-wod-ph">{todayWord.ph}</div>
            <div className="auth-wod-def">{todayWord.def}</div>
            <div className="auth-wod-story">{todayWord.story}</div>
            <div className="auth-wod-rule">{todayWord.rule}</div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="auth-right">
          <div className="auth-card">
            {suSuccess ? (
              <div style={{ textAlign:'center' }}>
                <div style={{ width:56, height:56, background:'rgba(10,59,31,0.08)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#0A3B1F', fontSize:22 }}>✓</div>
                <h2 className="auth-heading" style={{ textAlign:'center', fontSize:36, marginBottom:12 }}>Check your email.</h2>
                <p className="auth-sub" style={{ textAlign:'center' }}>We sent a confirmation link to <strong style={{ color:'#0A3B1F' }}>{suEmail}</strong>. Click it to activate your account, then come back to sign in.</p>
                <button onClick={()=>setActiveTab('signin')} className="btn-primary" style={{ marginTop:8 }}>Go to sign in →</button>
              </div>
            ) : (
              <>
                <div className="auth-form-eyebrow">Your Meridian account</div>
                <h1 className="auth-heading">{activeTab==='signin' ? 'Welcome back.' : 'Join Meridian.'}</h1>
                <p className="auth-sub">{activeTab==='signin' ? 'Sign in to access your products and dashboard.' : 'Start understanding your money — in plain Nigerian English.'}</p>

                <div className="auth-tabs">
                  <button className={`auth-tab${activeTab==='signin'?' active':''}`} onClick={()=>{ setActiveTab('signin'); setSiError(''); setForgotMsg('') }}>Sign in</button>
                  <button className={`auth-tab${activeTab==='signup'?' active':''}`} onClick={()=>{ setActiveTab('signup'); setSuError('') }}>Create account</button>
                </div>

                {/* ── SIGN IN FORM ── */}
                {activeTab==='signin' && (
                  <form onSubmit={handleSignin}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="si-email">Email address</label>
                      <input id="si-email" type="email" className="form-input" placeholder="you@example.com" value={siEmail} onChange={e=>setSiEmail(e.target.value)} required autoFocus autoComplete="email"/>
                    </div>
                    <div className="form-group">
                      <div className="form-label-row">
                        <label className="form-label" htmlFor="si-pwd" style={{ marginBottom:0 }}>Password</label>
                        <button type="button" className="form-label-link" onClick={handleForgot}>Forgot password?</button>
                      </div>
                      <div className="form-input-wrap">
                        <input id="si-pwd" type={siShowPwd?'text':'password'} className="form-input" placeholder="Your password" value={siPwd} onChange={e=>setSiPwd(e.target.value)} required autoComplete="current-password"/>
                        <button type="button" className="form-input-toggle" onClick={()=>setSiShowPwd(v=>!v)} aria-label={siShowPwd?'Hide password':'Show password'}>
                          {siShowPwd
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          }
                        </button>
                      </div>
                    </div>
                    {siError && <div className="auth-error">{siError}</div>}
                    {forgotMsg && <div className="auth-success">{forgotMsg}</div>}
                    <button type="submit" className="btn-primary" disabled={siLoading}>{siLoading?'Signing in…':'Sign in →'}</button>
                    <div className="auth-bottom-link">
                      Don&apos;t have an account?&nbsp;
                      <a onClick={()=>setActiveTab('signup')}>Create one free →</a>
                    </div>
                    <div className="auth-bottom-link" style={{ marginTop:12 }}>
                      <a href="/activate" style={{ color:'#B8922A', fontWeight:600 }}>Already bought a product? Activate your key →</a>
                    </div>
                  </form>
                )}

                {/* ── SIGN UP FORM ── */}
                {activeTab==='signup' && (
                  <form onSubmit={handleSignup}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="su-name">Full name</label>
                      <input id="su-name" type="text" className="form-input" placeholder="e.g. Chinedu Okafor" value={suName} onChange={e=>setSuName(e.target.value)} required autoFocus autoComplete="name"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="su-email">Email address</label>
                      <input id="su-email" type="email" className="form-input" placeholder="you@example.com" value={suEmail} onChange={e=>setSuEmail(e.target.value)} required autoComplete="email"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="su-pwd">Password</label>
                      <div className="form-input-wrap">
                        <input id="su-pwd" type={suShowPwd?'text':'password'} className="form-input" placeholder="At least 8 characters" value={suPwd} onChange={e=>setSuPwd(e.target.value)} required autoComplete="new-password"/>
                        <button type="button" className="form-input-toggle" onClick={()=>setSuShowPwd((v: boolean)=>!v)} aria-label="Toggle password">
                          {suShowPwd
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          }
                        </button>
                      </div>
                    </div>
                    {suError && <div className="auth-error">{suError}</div>}
                    <button type="submit" className="btn-primary" disabled={suLoading}>{suLoading?'Creating account…':'Create free account →'}</button>
                    <div className="auth-bottom-link">
                      Already have an account?&nbsp;
                      <a onClick={()=>setActiveTab('signin')}>Sign in →</a>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
