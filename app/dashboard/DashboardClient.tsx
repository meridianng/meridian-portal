'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CopyButton } from '@/components/CopyButton'


const IconBook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IconGrad = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const IconLedger = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="2" y1="9" x2="8" y2="9"/><line x1="2" y1="15" x2="8" y2="15"/></svg>
const IconKey = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2l-9.6 9.6"/><path d="M15.5 7.5l3 3L22 7l-3-3"/></svg>
const IconOut = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const IconLock = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IconCheck = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IconHelp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
const IconHome = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IconSignout = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const IconGrid = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>


const PRODUCTS = [
  { id:'dictionary', name:'MoneySpeak',      tag:'500 terms · Nigerian English',           desc:'Every financial word that has ever confused you — explained with a story you will actually recognise.',         Icon:IconBook,    url:'/dictionary',                                                         selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:false, price:'₦4,500',    accent:'#C8972A' },
  { id:'course',     name:'Stock School',    tag:'Zero to confident investor · 11 phases',  desc:'From "what is a share?" to building a real NGX portfolio. No jargon. No assumed knowledge.',                 Icon:IconGrad,    url:process.env.NEXT_PUBLIC_COURSE_URL||'https://learn.meridianng.com',   selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:true,  price:'₦18,000',   accent:'#C8972A' },
  { id:'terminal',   name:'Equity Terminal', tag:'Analyse any company · Owner Earnings',    desc:'Enter numbers from any annual report. Get a plain-English verdict. You input the data. You make the call.', Icon:IconChart,   url:process.env.NEXT_PUBLIC_TERMINAL_URL||'https://app.meridianng.com',  selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:true,  price:'₦15,000',   accent:'#1A7A47' },
  { id:'tradaq',     name:'TraDaq',          tag:'Know your real profit · Coming soon',     desc:'Track your business money in 30 seconds a day. For market traders, IG sellers, and small business owners.',  Icon:IconLedger,  url:'/tradaq',                                                             selar:process.env.NEXT_PUBLIC_SELAR_URL||'https://selar.com/m/meridian_ng', live:false, price:'₦9,000/yr', accent:'#D4891A' },
]

function planLabel(plan: string) {
  const m: Record<string, string> = {
    v2_tool: 'Equity Terminal', v2_course: 'Stock School', v2_dictionary: 'MoneySpeak',
    v2_tradaq: 'TraDaq', 'v2_meridian access': 'Meridian Access', v2_combo: 'Meridian Access', full: 'Full Access',
  }
  return m[plan] || plan
}

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
}

function nairaWisdom() {
  const h = new Date().getHours()
  if (h < 12) return 'Sapa no dey rest. But now, neither do you.'
  if (h < 17) return 'Your money should be working while you chop right now.'
  return 'Every naira you understand is one nobody can steal from you.'
}

function wodCounter() {
  const start = new Date('2025-01-01').getTime()
  const day = Math.floor((Date.now() - start) / 86_400_000)
  return (day % 500) + 1
}


function barGradient(accent: string) {
  if (accent === '#1A7A47') return `linear-gradient(90deg, #1A7A47, rgba(26,122,71,0.15))`
  if (accent === '#D4891A') return `linear-gradient(90deg, #D4891A, rgba(212,137,26,0.15))`
  return `linear-gradient(90deg, #C8972A, rgba(200,151,42,0.15))`
}

interface Props {
  email:  string
  name:   string
  plan:   string | null
  key_:   string | null
  access: Set<string>
}

export default function DashboardClient({ email, name, plan, key_, access }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activating,  setActivating]  = useState(false)
  const [keyVal,      setKeyVal]      = useState('')
  const [keyMsg,      setKeyMsg]      = useState('')
  const [keyMsgType,  setKeyMsgType]  = useState<'ok' | 'err' | ''>('')
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
      const res  = await fetch('/api/activate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k }) })
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

  function scrollToActivate() {
    document.getElementById('activate-strip')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => (document.getElementById('key-input') as HTMLInputElement | null)?.focus(), 400)
  }

  return (
    <div className="dashboard">

      {/* Overlay — mobile */}
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ══════════════════════════════════
          SIDEBAR
      ══════════════════════════════════ */}
      <aside className={`sb-main${sidebarOpen ? ' sb-open' : ''}`}>

        {/* Brand */}
        <div className="sb-brand">
          <Link href="/" className="sb-brand-row">
            <div className="sb-mark">M</div>
            <div>
              <div className="sb-name">MERIDIAN</div>
              <div className="sb-tagline">Financial Intelligence</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="sb-user">
          <div className="sb-user-greeting">Signed in as</div>
          <div className="sb-user-email">{email}</div>
          {planDisplay && (
            <div className="sb-plan-pill"><span>◈</span> {planDisplay}</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sb-nav">
          <div className="sb-nav-label">Overview</div>

          <div className="nav-item nav-item--active">
            <span className="nav-icon"><IconGrid /></span>
            <span className="nav-label-text">Dashboard</span>
          </div>

          <Link href="/activate" className="nav-item">
            <span className="nav-icon"><IconKey /></span>
            <span className="nav-label-text">Activate key</span>
          </Link>

          <div className="sb-nav-label">My Products</div>

          {PRODUCTS.map(p => (
            <div
              key={p.id}
              className={`nav-item${
                p.id === 'tradaq'
                  ? ' nav-item--soon'
                  : !access.has(p.id)
                  ? ' nav-item--locked'
                  : ''
              }`}
            >
              <span className="nav-icon"><p.Icon /></span>
              <span className="nav-label-text">{p.name}</span>
              {p.id === 'tradaq' && <span className="nav-badge">Soon</span>}
              {!access.has(p.id) && p.id !== 'tradaq' && (
                <span className="nav-lock"><IconLock /></span>
              )}
            </div>
          ))}
        </nav>

        {/* Upgrade prompt — shown only if no plan active */}
        {!planDisplay && (
          <div className="sb-upgrade">
            <div className="sb-upgrade-title">Get everything.</div>
            <div className="sb-upgrade-desc">All 4 products for ₦35,000. Save ₦11,500.</div>
            <a
              href="https://selar.com/m/meridian_ng"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-upgrade-btn"
            >
              Meridian Access →
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="sb-footer">
          <Link href="/" className="sb-footer-link">
            <IconHome /> Back to website
          </Link>
          <a href="mailto:hello@meridianng.com" className="sb-footer-link">
            <IconMail /> Get help
          </a>
          <button onClick={handleSignOut} className="sb-footer-link sb-footer-btn">
            <IconSignout /> Sign out
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="dash-main-content">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="topbar-hamburger"
              onClick={() => setSidebarOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
            <div className="topbar-crumb">
              Dashboard / <strong>Overview</strong>
            </div>
          </div>
          <div className="topbar-wod-pill">
            <span className="topbar-wod-dot">◈</span>
            <span className="topbar-wod-term">Liquidity</span>
          </div>
        </header>

        {/* Main body */}
        <main className="dash-content">

          {/* ── WELCOME BANNER ── */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <div className="welcome-eyebrow">{greeting()}</div>
              <div className="welcome-name-label">Welcome back,</div>
              <div className="welcome-headline">{firstName.toUpperCase()}</div>
              <p className="welcome-sub">
                {access.size > 0
                  ? `You have ${access.size} product${access.size > 1 ? 's' : ''} active and ready. Open any of them below.`
                  : 'Your dashboard is ready. Paste your access key from your Selar purchase email to unlock your products.'}
              </p>
              <p className="naira-wisdom">&ldquo;{nairaWisdom()}&rdquo;</p>
            </div>

            <div className="welcome-right">
              {access.size > 0 && (
                <div className="welcome-stats">
                  <div className="welcome-stat">
                    <div className="welcome-stat-label">Products Active</div>
                    <div className="welcome-stat-num">{access.size}</div>
                  </div>
                  <div className="welcome-stat">
                    <div className="welcome-stat-label">Plan</div>
                    <div className="welcome-stat-val">{planDisplay || 'Free'}</div>
                  </div>
                </div>
              )}
              <div className="welcome-actions">
                <button className="btn-gold-dash" onClick={scrollToActivate}>
                  ◈ Activate your key
                </button>
                <a
                  href="https://selar.com/m/meridian_ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-cream"
                >
                  Buy a product →
                </a>
              </div>
            </div>
          </div>

          {/* ── KEY STRIP — neutral borders ── */}
          {hasKey && (
            <div className="key-strip">
              <div className="key-strip-icon"><IconKey /></div>
              <div className="key-strip-body">
                <div className="key-strip-label">Your access key</div>
                <div className="key-strip-value">{key_}</div>
                {planDisplay && (
                  <div className="key-strip-plan">
                    <IconCheck /> {planDisplay} — active
                  </div>
                )}
              </div>
              <CopyButton text={key_!} />
            </div>
          )}

          {/* ── ACTIVATE STRIP ── */}
          {!hasKey && (
            <div className="activate-strip" id="activate-strip">
              <div className="activate-strip-icon"><IconKey /></div>
              <div className="activate-strip-copy">
                <div className="activate-strip-title">Have a key from Selar?</div>
                <div className="activate-strip-desc">
                  Paste it here to instantly unlock your products. Your key arrived by email after your purchase.
                </div>
                <div className="activate-strip-row">
                  <input
                    id="key-input"
                    type="text"
                    value={keyVal}
                    onChange={e => setKeyVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleActivate()}
                    placeholder="Paste your key: XXXXX-XXXXX-XXXXXX-XXXXX"
                    className="activate-input"
                  />
                  <button
                    onClick={handleActivate}
                    disabled={activating}
                    className="btn-activate"
                  >
                    {activating ? 'Checking…' : 'Activate →'}
                  </button>
                </div>
                {keyMsg && (
                  <div
                    className={`activate-msg${
                      keyMsgType === 'ok' ? ' activate-msg--ok' : keyMsgType === 'err' ? ' activate-msg--err' : ''
                    }`}
                  >
                    {keyMsg}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          <div className="sec-label">Your products</div>

          <div className="products-grid">
            {PRODUCTS.map(p => {
              const unlocked = access.has(p.id)
              const soon     = p.id === 'tradaq'

              let href = p.url
              if (unlocked && p.id === 'terminal' && key_) href = `${p.url}?k=${key_}`
              if (unlocked && p.id === 'course'   && key_) href = `${p.url}?k=${key_}`

              return (
                <div
                  key={p.id}
                  className={`product-card${unlocked ? ' product-card--unlocked' : ' product-card--locked'}${soon ? ' product-card--soon' : ''}`}
                >
                  {/* Colour bar — one inline style allowed since value is dynamic */}
                  <div className="pc-bar" style={{ background: barGradient(p.accent) }} />

                  <div className="pc-body">
                    <div className="pc-top">
                      <div className={`pc-icon${unlocked ? ' pc-icon--unlocked' : ''}`}>
                        <p.Icon />
                      </div>
                      <div className={`pc-status${soon ? ' pc-s-soon' : unlocked ? ' pc-s-unlocked' : ' pc-s-locked'}`} />
                    </div>

                    <div className="pc-name">{p.name}</div>
                    <div className={`pc-tagline${unlocked ? ' pc-tagline--active' : ''}`}>{p.tag}</div>
                    <div className="pc-pitch">{p.desc}</div>

                    <div className="pc-footer">
                      {soon ? (
                        <div className="pc-soon-label">{p.price} — in development</div>
                      ) : unlocked ? (
                        <a
                          href={href}
                          target={p.url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="btn-open-product"
                        >
                          Open {p.name} <IconOut />
                        </a>
                      ) : (
                        <div className="pc-locked-row">
                          <span className="pc-price">{p.price}</span>
                          <a
                            href={p.selar}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-get-access"
                          >
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

          {/* ── WORD OF THE DAY ── */}
          <div className="sec-label" id="wod-anchor">Word of the Day — always free</div>

          <div className="wod-section">
            <div className="wod-inner">

              {/* Left — story */}
              <div className="wod-left">
                <div className="wod-meta-label">◈ MoneySpeak — Today&apos;s Term</div>
                <div className="wod-counter">Term {wodCounter()} of 500</div>
                <div className="wod-term">Liquidity</div>
                <div className="wod-def">
                  How quickly you can turn what you own into cash when you actually need it.
                </div>
                <div className="wod-story">
                  A woman keeps her savings in half a plot of land somewhere behind her village.
                  One night, her child wakes up burning with fever. She needs ₦60,000 for the hospital at 2am.
                  She cannot call Oloriebi to buy land tonight. She cannot carry sand to the pharmacy.{' '}
                  <strong>That land is illiquid.</strong> The ₦60,000 in her account? She grabs it and runs.
                </div>
              </div>

              {/* Right — reality decode */}
              <div className="wod-reality-col">
                <div className="wod-reality-tag">The rule you walk away using</div>
                <div className="wod-reality-jargon">
                  &ldquo;Always check the liquidity of an investment before you put your money in.&rdquo;
                </div>
                <div className="wod-reality-body">
                  That phrase is just asking one question:{' '}
                  <strong>&ldquo;If something happens and I need this back in seven days — can I get it out?&rdquo;</strong>
                  <br /><br />
                  If the answer is no, that investment is illiquid. Not automatically bad — land and long-term shares
                  are supposed to be illiquid. The mistake is locking away your only money there.{' '}
                  <strong>Keep at least three months of your expenses somewhere you can reach overnight.</strong>{' '}
                  The woman&apos;s problem was not that she owned land. It was that she had nothing else.
                </div>
                <a
                  href="https://selar.com/m/meridian_ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wod-reality-link"
                >
                  See all 500 terms in MoneySpeak →
                </a>
              </div>
            </div>
          </div>

          {/* ── HELP STRIP ── */}
          <div className="help-strip">
            <div className="help-strip-left">
              <div className="help-strip-icon"><IconHelp /></div>
              <div className="help-strip-text">
                <div className="help-strip-title">Something no dey work?</div>
                <div className="help-strip-desc">
                  Key not working · Wrong products unlocked · Payment went through but nothing opened ·
                  You didn&apos;t receive your key after purchase. Email us your Selar payment reference
                  and we sort it within the hour. No long talk.
                </div>
              </div>
            </div>
            <a href="mailto:hello@meridianng.com" className="btn-help-email">
              Email us directly →
            </a>
          </div>

        </main>
      </div>
    </div>
  )
}
