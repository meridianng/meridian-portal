'use client'

import { useState, useEffect, useRef } from 'react'
import { MeridianLogo } from '@/components/MeridianLogo'
import './LandingPage.css'

const IBook   =({s=20}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
const IGrad   =({s=20}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
const IChart  =({s=20}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const ILedger =({s=20}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="8" y1="3" x2="8" y2="21"/><line x1="2" y1="9" x2="8" y2="9"/><line x1="2" y1="15" x2="8" y2="15"/></svg>
const ILock   =({s=16}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
const IMail   =({s=18}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const IFlag   =({s=18}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
const ICard   =({s=18}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
const ICheck  =({s=12}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
const IArrow  =({s=16}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
const ITarget =({s=22}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
const IUsers  =({s=22}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
const ICompass=({s=22}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
const IZap    =({s=22}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
const IWA     =()=><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>

const DAILY_WORDS = [
  { term:'Liquidity',   ph:'lik · wid · i · tee  ·  noun',       def:'How quickly you can turn what you own into cash when you actually need it.',                                                                                          story:'A woman has saved ₦800,000 — all of it in a plot of land behind her village. One Thursday night, her child gets sick. She needs ₦60,000 by 6am Friday. She cannot call Oloriebi at 3am to buy land. That ₦800,000 is hers, it is even gaining value — but right now when she needs it, it is completely useless to her.',                                                                  rule:'"Always check the liquidity of an investment before you commit your money."',  reality:'Before you put money anywhere, ask one question: "If something happens tonight, can I get this money back in seven days?" If the answer is no, that investment is illiquid. Keep at least three months of expenses somewhere you can reach overnight. Invest the rest.' },
  { term:'Inflation',   ph:'in · flay · shun  ·  noun',           def:'The quiet thief that makes your money buy less every single year — even when you do nothing wrong.',                                                                   story:'In 2015, your ₦500 was a bodybuilder — it carried jollof rice, two pieces of meat, and a cold Malt with change left. Today? That same ₦500 is a lanky secondary school boy. Same paper. Same number. The spirit of the money has traveled. That ghost is inflation.',                              rule:'"If your savings pays 8% and inflation is 22%, you are getting poorer even while saving."',        reality:'Keeping all your money in a regular savings account in Nigeria is a mistake. If your money is not growing faster than inflation, you are losing real value every year — even with a full balance. The goal is not to save. The goal is to grow faster than inflation shrinks.' },
  { term:'Compounding', ph:'kom · pown · ding  ·  noun',          def:'When your money earns returns — and then those returns start earning returns too.',                                                                                    story:'One male goat. One female goat. You keep them. They have kids. You do not kill the kids for pepper soup. The kids grow up and also have kids. Before you know it, your backyard has 50 goats from just two. You fed them, yes. But you did not build 50 goats one by one. The goats built each other.',  rule:'"Start early. Even small amounts compound into serious wealth over 10–20 years."',                 reality:'₦50,000 invested at 18% annual return becomes ₦862,000 in 15 years without adding a kobo. The most important word in this definition is time. Compounding needs time more than it needs a large starting amount.' },
  { term:'Dividend',    ph:'div · ih · dend  ·  noun',            def:"A share of a company's profits paid directly to shareholders — simply for owning the shares.",                                                                        story:"You bought 500 shares of Zenith Bank on the NGX. You did not go into work. At year end, the board says: 'We made good profit — let us share thank-you money with our owners.' You get a credit alert while eating suya at a roadside spot. Money entered your account while you were chewing. You did absolutely nothing. That alert is your dividend.",                                                       rule:'"A company that pays consistent dividends for 10+ years is usually stable and trustworthy."',      reality:"Dividend-paying stocks like Zenith Bank, GTBank, and MTNN are worth understanding for investors who want regular cash from their investments. Always check a company's dividend history before you buy." },
  { term:'Equity',      ph:'ek · wi · tee  ·  noun',              def:'What you actually own — the value that is truly yours after all debts are removed.',                                                                                  story:"Uncle Emeka bought a house in Lekki for ₦25 million. He paid ₦5 million cash and took a ₦20 million mortgage. His equity is not ₦25 million. It is only ₦5 million — because the bank owns ₦20 million of it. Every month he pays down the mortgage, his equity grows.",                                 rule:'"Before celebrating an asset\'s value, subtract what you owe. What remains is your equity."',       reality:'A business with ₦10 million in assets but ₦9 million in debts has only ₦1 million in equity. Understanding equity stops you from being impressed by big numbers that are mostly borrowed.' },
  { term:'ROI',         ph:'ar · oh · eye  ·  noun · abbrev',     def:'The percentage of profit you made compared to how much you originally put in.',                                                                                       story:'Mama Chioma buys 20 crates of eggs for ₦80,000. She sells them all for ₦100,000. Her ROI is 25%. Her neighbour invests ₦80,000 in a "digital forex platform" and gets back ₦84,000 after six months — a 5% ROI. Same amount invested. ROI lets you compare these two on the same scale.',               rule:'"Always ask: what is my ROI, and how long will it take? Both numbers matter."',                    reality:"A 100% ROI sounds incredible — until you realise it took 10 years. A 30% monthly ROI sounds amazing — until you realise it is statistically impossible for a legitimate business to sustain." },
  { term:'Bull Market', ph:'bool mar · ket  ·  noun',             def:'A period when prices in the stock market are rising broadly and investor confidence is high.',                                                                        story:"December vibes in the stock market. Everywhere you turn, people are talking about making money from stocks. Your barber is recommending shares. The Uber driver has three investment apps. Even your auntie who never mentioned the NGX is asking how to buy Dangote shares. Prices are going up. Everyone is happy. That is a bull market.",                                                                         rule:'"A bull market is when to be careful, not when to abandon caution."',                              reality:'The dangerous thing about bull markets is that they make everyone look like a genius. When prices go up, almost every decision feels right. This is exactly when poor investments hide behind rising tides. Bull markets end. Only investors who understood what they owned survive intact.' },
]

const Eyebrow = ({ children, center, light }: { children: React.ReactNode, center?: boolean, light?: boolean }) => {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', fontFamily:'var(--mono)', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase' as const, color: light ? 'rgba(240,216,150,0.65)' : 'var(--gold)', justifyContent: center ? 'center' : undefined }}>
      <span style={{ display:'block', width:'28px', height:'1px', background: light ? 'rgba(240,216,150,0.4)' : 'var(--gold)', flexShrink:0 }}/>
      {children}
    </div>
  )
}

export default function LandingPage({ isSignedIn }: { isSignedIn?: boolean }) {
  const [page,           setPage]           = useState<'home'|'about'|'products'|'contact'>('home')
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [termsOpen,      setTermsOpen]      = useState(false)
  const [navHidden,      setNavHidden]      = useState(false)
  const [activeProd,     setActiveProd]     = useState(0)
  const [toast,          setToast]          = useState('')
  const [toastShow,      setToastShow]      = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [cName,          setCName]          = useState('')
  const [cEmail,         setCEmail]         = useState('')
  const [cSubject,       setCSubject]       = useState('General question')
  const [cMsg,           setCMsg]           = useState('')
  const lastY = useRef(0)
  const todayWord = DAILY_WORDS[new Date().getDay()]

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setNavHidden(y > lastY.current && y > 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
    }), { threshold: 0.07 })
    document.querySelectorAll('.reveal:not(.in)').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [page])

  const showPage = (p: string) => { setPage(p as 'home'|'about'|'products'|'contact'); setMenuOpen(false); window.scrollTo({ top: 0 }) }
  const toast_ = (msg: string) => { setToast(msg); setToastShow(true); setTimeout(() => setToastShow(false), 3500) }

  function scrollToHow(e: React.MouseEvent) {
    e.preventDefault()
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => document.getElementById('how-steps')?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      document.getElementById('how-steps')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  async function sendContact(e: React.MouseEvent) {
    e.preventDefault()
    if (!cName.trim() || !cEmail.trim() || !cMsg.trim()) { toast_('Please fill in name, email, and message.'); return }
    setContactLoading(true)
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name:cName, email:cEmail, subject:cSubject, message:cMsg }) })
      if (r.ok) { toast_("Message sent ✓  We'll reply within a few hours."); setCName(''); setCEmail(''); setCMsg('') }
      else        toast_('Something went wrong. Email us directly: hello@meridianng.com')
    } catch     { toast_('Connection error. Please email hello@meridianng.com') }
    finally     { setContactLoading(false) }
  }

  return (
    <>
      <nav className={`mn${navHidden ? ' hidden' : ''}`}>
        <div className="logo-wrap" onClick={() => showPage('home')}>
          <MeridianLogo variant="full" theme="light" width={148} />
        </div>
        <ul className="nav-links">
          <li><a className={page==='home' ? 'act' : ''} onClick={() => showPage('home')}>Home</a></li>
          <li><a className={page==='about' ? 'act' : ''} onClick={() => showPage('about')}>About</a></li>
          <li><a className={page==='products' ? 'act' : ''} onClick={() => showPage('products')}>Products</a></li>
          <li><a className={page==='contact' ? 'act' : ''} onClick={() => showPage('contact')}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          {isSignedIn
            ? <a href="/dashboard" className="btn btn-f btn-sm">My Dashboard →</a>
            : <>
                <a href="/login" className="btn btn-o btn-sm">Sign in</a>
                <a href="#how-steps" className="btn btn-f btn-sm" onClick={scrollToHow}>Get started →</a>
              </>
          }
        </div>
        <div className="hbg" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span/><span/><span/>
        </div>
      </nav>

      <div className={`mmenu${menuOpen ? ' open' : ''}`}>
        <a onClick={() => showPage('home')}>Home</a>
        <a onClick={() => showPage('about')}>About</a>
        <a onClick={() => showPage('products')}>Products</a>
        <a onClick={() => showPage('contact')}>Contact</a>
        <div className="mm-actions">
          {isSignedIn ? (
            <a href="/dashboard" className="btn btn-f">My Dashboard →</a>
          ) : (
            <>
              <a href="/login" className="btn btn-o">Sign in</a>
              <a href="#how-steps" className="btn btn-f" onClick={scrollToHow}>Get started →</a>
            </>
          )}
        </div>
      </div>

      <div className="wa-float">
        <div className="wa-lbl">Chat on WhatsApp</div>
        <a href="https://wa.me/2348148818179?text=Hi%2C%20I%20have%20a%20question%20about%20Meridian" target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp">
          <IWA/>
        </a>
      </div>

      {/* ══════════════════════════ HOME ══════════════════════════ */}
      <div className={`page pt${page === 'home' ? ' active' : ''}`}>

        <section className="hero">
          <div className="hero-l">
            <div className="reveal" style={{marginBottom:'24px'}}>
              <Eyebrow>Finance in plain Nigerian English</Eyebrow>
            </div>
            <h1 className="hero-hl reveal d1">
              Stop guessing<br/>with your money.
              <em>Confusion is expensive.</em>
            </h1>
            <p className="hero-sub reveal d2">
              Built for Nigerian <strong>investors, traders, and business owners</strong> who are tired of nodding along.
              Meridian explains what is happening to your money — in language that respects your intelligence and actually fits your reality.
            </p>
            <div className="hero-acts reveal d3">
              <a href="#how-steps" className="btn btn-f btn-lg" onClick={scrollToHow}>Get started →</a>
              <button className="btn btn-o btn-lg" onClick={() => showPage('products')}>See our products</button>
            </div>
            <div className="hero-trust reveal d4">
              <div className="trust-dots"><span>K</span><span>A</span><span>T</span><span>F</span></div>
              <div className="trust-txt"><strong>500+ Nigerians</strong> already making<br/>smarter money decisions</div>
            </div>
          </div>

          <div className="hero-r">
            <div className="wod reveal">
              <div className="wod-lbl">◈ MoneySpeak · Word of the Day · Always Free</div>
              <div className="wod-term">{todayWord.term}</div>
              <div className="wod-ph">{todayWord.ph}</div>
              <div className="wod-def">{todayWord.def}</div>
              <div className="wod-div"/>
              <div className="wod-story-lbl">The Nigerian story</div>
              <div className="wod-story">{todayWord.story}</div>
              <div className="wod-reality">
                <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'8px'}}>The rule you walk away using</div>
                <div style={{fontStyle:'italic',color:'var(--forest-mid)',fontWeight:600,marginBottom:'8px'}}>&ldquo;{todayWord.rule}&rdquo;</div>
                <div style={{fontSize:'13px'}}>{todayWord.reality}</div>
                <div style={{marginTop:'12px',fontSize:'13px',color:'var(--gold)',fontWeight:600,cursor:'pointer'}} onClick={() => showPage('products')}>See all 500 terms in MoneySpeak →</div>
              </div>
            </div>
            <div className="mini-grid reveal d1">
              {[
                {Icon:IBook,   name:'MoneySpeak',      desc:'500 terms, Nigerian stories'},
                {Icon:IGrad,   name:'Stock School',    desc:'Zero to confident investor'},
                {Icon:IChart,  name:'Equity Terminal', desc:'Analyse any stock yourself'},
                {Icon:ILedger, name:'TraDaq',          desc:'Know your real profit'},
              ].map(p => (
                <div className="mini-tile" key={p.name} onClick={() => showPage('products')}>
                  <p.Icon s={20}/>
                  <div>
                    <div className="mini-tile-nm">{p.name}</div>
                    <div className="mini-tile-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="what-sec">
          <div className="what-hdr">
            <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow center>What we built</Eyebrow></div>
            <h2 className="what-tagline reveal d1">
              Meridian is the<br/><em>older sibling</em> you needed<br/>to explain all of this.
            </h2>
            <p className="lead reveal d2">
              We built four tools that take <strong>every financial concept</strong> — the terms, the analysis, the investing, the business tracking — and translate them using real Nigerian examples you will actually recognise.
            </p>
          </div>
          <div className="pillars">
            {[
              {n:'01', t:'No big grammar',      d:"Every explanation uses examples from the market, the street, and everyday Nigerian life. If it doesn't make sense without a finance degree, we rewrite it."},
              {n:'02', t:'You stay in control', d:'We never tell you what to buy. We give you the tools and knowledge to make your own informed decisions. Your money, your judgment.'},
              {n:'03', t:'Built for Nigeria',   d:'NGX-specific examples, Naira-based pricing, and real context around CBN decisions, inflation, and the local market realities that actually affect your money.'},
            ].map((p, i) => (
              <div className={`pillar reveal${i > 0 ? ' d' + i : ''}`} key={p.n}>
                <div className="pillar-num">{p.n}</div>
                <h3 className="pillar-title">{p.t}</h3>
                <p className="pillar-desc">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pain">
          <div className="pain-grid">
            <div>
              <div className="reveal" style={{marginBottom:'24px'}}><Eyebrow light>The honest truth</Eyebrow></div>
              <h2 className="pain-hl reveal d1">The financial system was never designed<br/><em>to explain itself to you.</em></h2>
              <p className="pain-body reveal d2">Banks, advisors, and textbooks all speak a language designed to make you <strong>dependent on them.</strong> The more confused you are, the more money they make from your confusion.</p>
              <p className="pain-body reveal d3">This is not about your intelligence. It is about access. Meridian gives you the access.</p>
            </div>
            <div>
              {[
                {tag:'The family gathering', txt:"Your uncle talks about 'diversifying his portfolio' and everyone nods respectfully. You're nodding too — but inside you're wondering if portfolio is something you eat with egusi."},
                {tag:'Your business',        txt:"You made ₦400,000 in sales this month. After everything, you don't know if you actually made profit — or just moved money from one pocket to another."},
                {tag:'The WhatsApp group',   txt:"Someone drops a hot investment tip. 40 fire emojis. You want to ask what it means, but you don't want to look like you don't know."},
                {tag:'The stock market',     txt:"You've heard 'buy Dangote shares' three times this year. You have the money. But you don't know how to check if it's actually worth buying at today's price."},
              ].map((s, i) => (
                <div className={`scene reveal${i > 0 ? ' d' + i : ''}`} key={s.tag}>
                  <div className="scene-tag">{s.tag}</div>
                  <div className="scene-txt">{s.txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ba">
          <div className="ba-hdr">
            <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow center>What changes</Eyebrow></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'16px'}}>Before Meridian.<br/>After Meridian.</h2>
            <p className="lead reveal d2">This is not about becoming a finance expert. It is about never being fooled again.</p>
          </div>
          <div className="ba-grid wrap-md">
            <div className="ba-col bef">
              <div className="ba-lbl">Before Meridian</div>
              {[
                '"I hear people talk about stocks but I just avoid it. Too complicated."',
                '"I made good sales but my account is empty. I don\'t understand."',
                '"My uncle is telling me to invest ₦500k. I can\'t ask questions — he\'ll think I\'m dumb."',
                '"Someone is promising 30% monthly returns. It sounds too good, but everyone is doing it."',
                '"I want to grow my money but I don\'t know where to start without getting scammed."',
              ].map((t, i) => (
                <div className={`ba-item reveal${i > 0 ? ' d' + i : ''}`} key={i}>{t}</div>
              ))}
            </div>
            <div className="ba-mid">
              <div className="ba-line"/>
              <div className="ba-arrow"><IArrow s={18}/></div>
              <div className="ba-line"/>
            </div>
            <div className="ba-col aft">
              <div className="ba-lbl">After Meridian</div>
              {[
                '"I now understand what to look for in a company before I invest. I use the Equity Terminal."',
                '"TraDaq showed me my actual profit is ₦45k, not the ₦400k I was celebrating. I fixed my pricing."',
                '"I asked my uncle what the ROIC was. He looked at me differently."',
                '"I can explain exactly why 30% monthly return is impossible for a legitimate business. I didn\'t invest."',
                '"I started with MoneySpeak. Now I\'m building a real portfolio on the NGX."',
              ].map((t, i) => (
                <div className={`ba-item reveal${i > 0 ? ' d' + i : ''}`} key={i}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="prod-sec">
          <div className="prod-hdr">
            <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow center>Four tools. One purpose.</Eyebrow></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'16px'}}>Chase Sapa for good.</h2>
            <p className="lead reveal d2">Each product solves a specific Nigerian financial problem. Click a product below to explore it — or scroll to read all of them.</p>
          </div>

          <div className="prod-tabs reveal">
            {[
              {Icon:IBook,   name:'MoneySpeak',      price:'₦4,500'},
              {Icon:IGrad,   name:'Stock School',    price:'₦18,000'},
              {Icon:IChart,  name:'Equity Terminal', price:'₦15,000'},
              {Icon:ILedger, name:'TraDaq',          price:'₦9,000/yr'},
            ].map((p, i) => (
              <div key={p.name} className={`prod-tab${activeProd === i ? ' act' : ''}`} onClick={() => { setActiveProd(i); document.getElementById('prod-row-' + i)?.scrollIntoView({ behavior:'smooth', block:'start' }) }}>
                <span className="ptab-icon"><p.Icon s={18}/></span>
                <span>{p.name}</span>
                <span className="ptab-price">{p.price}</span>
              </div>
            ))}
          </div>

          <div className="prod-rows" style={{marginTop:'2px'}}>

            <div className="prod-row reveal" id="prod-row-0">
              <div className="prod-row-text">
                <div className="prod-badge"><IBook s={12}/>&nbsp;MoneySpeak Dictionary</div>
                <h3 className="prod-name">Stop pretending you understand.</h3>
                <p className="prod-tagline">500 financial terms. Every single one explained with a Nigerian story.</p>
                <blockquote className="prod-story">&ldquo;EBITDA — the loud, raw money entering the shop before life and government start chopping it.&rdquo; That is what we mean by plain English.</blockquote>
                <ul className="prod-benefits">
                  {[
                    'Every term comes with a real Nigerian story, not a textbook definition',
                    'Word of the Day keeps you learning passively, every single day',
                    'Searchable — when you hear a confusing term, look it up in 10 seconds',
                    'Categories from investing to business to personal finance',
                  ].map(b => (
                    <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>
                  ))}
                </ul>
                <div className="prod-price-line">₦4,500 · One-time payment · Lifetime access</div>
                <div className="prod-row-footer">
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Get MoneySpeak →</a>
                  <span style={{fontSize:'12px',color:'var(--muted)'}}>Instant access after payment</span>
                </div>
              </div>
              <div className="prod-row-vis">
                <div className="dict-demo">
                  <div style={{fontFamily:'var(--mono)',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'14px'}}>Sample terms from MoneySpeak</div>
                  <div className="dict-term-block">
                    <div className="dict-term-word">Dividend</div>
                    <div className="dict-term-exp">You bought Zenith Bank shares. At year end, the bank made ₦500B profit. They share <em>thank you money</em> with owners. You get a credit alert for ₦5,000 — you did nothing. That is a dividend.</div>
                  </div>
                  <div className="dict-term-block">
                    <div className="dict-term-word">Bull Market</div>
                    <div className="dict-term-exp">This is <em>Detty December</em> in the stock market. Prices are rising, portfolios are green, everyone thinks they are a genius. Even your barber is giving stock tips.</div>
                  </div>
                  <div className="dict-term-block">
                    <div className="dict-term-word">Compounding</div>
                    <div className="dict-term-exp">One male goat + one female goat. They give birth. You don&apos;t slaughter the kids for pepper soup. Before you know it, <em>your backyard has 50 goats from just 2.</em></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prod-row rev reveal" id="prod-row-1">
              <div className="prod-row-text">
                <div className="prod-badge"><IGrad s={12}/>&nbsp;Stock School</div>
                <h3 className="prod-name">From &ldquo;I don&apos;t even know where to start&rdquo; to confident investor.</h3>
                <p className="prod-tagline">11 phases. Zero assumed knowledge. Complete beginner welcome.</p>
                <blockquote className="prod-story">This is not a YouTube playlist. It is a structured journey that takes you from &ldquo;what is a share?&rdquo; to building and analysing a real portfolio — with NGX examples throughout.</blockquote>
                <ul className="prod-benefits">
                  {[
                    'What shares actually are and why companies issue them',
                    'How to read an Annual Report — the one from NGX, not Wall Street',
                    "How to evaluate if a stock is cheap or expensive at today's price",
                    'How real wealth is built — slowly, deliberately, not through tips',
                  ].map(b => (
                    <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>
                  ))}
                </ul>
                <div className="prod-price-line">₦18,000 · One-time · Lifetime access to all 11 phases</div>
                <div className="prod-row-footer">
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Enrol in Stock School →</a>
                </div>
              </div>
              <div className="prod-row-vis">
                <div className="course-modules">
                  <div style={{fontFamily:'var(--mono)',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'14px'}}>11 Phases · Your Progress</div>
                  {[
                    {n:'01', t:'What is a share? What is the stock market?',  d:true},
                    {n:'02', t:"How to read a company's annual report",        d:true},
                    {n:'03', t:'How to find stocks on the NGX',               d:true},
                    {n:'04', t:'How to evaluate if a stock is cheap',         d:false},
                    {n:'05', t:'Understanding risk — and your tolerance',     d:false},
                    {n:'06', t:'Building a real portfolio strategy',          d:false},
                    {n:'07', t:'Thinking like a long-term investor',          d:false},
                    {n:'⋯',  t:'4 more phases →',                            d:false},
                  ].map(m => (
                    <div key={m.n} className={`module-item${m.d ? ' done' : ''}`}>
                      <div className="module-num">{m.n}</div>
                      <div className="module-title">{m.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="prod-row reveal" id="prod-row-2">
              <div className="prod-row-text">
                <div className="prod-badge"><IChart s={12}/>&nbsp;Equity Terminal</div>
                <h3 className="prod-name">Stop following hype. Check the actual numbers.</h3>
                <p className="prod-tagline">Enter financials from any company&apos;s annual report. Get a plain-English verdict.</p>
                <blockquote className="prod-story">A stock going up is not the same as a stock being good. Dangote Cement could be rising because of hype — or it could be genuinely undervalued. The Terminal shows you which. You input the data. You make the decision.</blockquote>
                <ul className="prod-benefits">
                  {[
                    'Owner Earnings analysis — the real cash the business makes for owners',
                    'Quick Mode: directional answers with just 4 inputs',
                    'Multi-year tracking — see if quality is improving or declining',
                    'NGN, USD, and other African currencies supported',
                  ].map(b => (
                    <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>
                  ))}
                </ul>
                <div className="prod-price-line">₦15,000 · One-time · Lifetime V2 access</div>
                <div className="prod-row-footer">
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Get Equity Terminal →</a>
                </div>
              </div>
              <div className="prod-row-vis">
                <div className="analyzer-demo">
                  <div style={{fontFamily:'var(--mono)',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'14px'}}>Example: Dangote Cement · FY 2024</div>
                  <div className="az-grid">
                    {[
                      {l:'Revenue',            v:'₦1.02T'},
                      {l:'Net Income (PAT)',   v:'₦146B'},
                      {l:'Share Price',        v:'₦612'},
                      {l:'Shares Outstanding', v:'17.04B'},
                    ].map(f => (
                      <div className="az-field" key={f.l}>
                        <div className="az-lbl">{f.l}</div>
                        <div className="az-val">{f.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="az-result">
                    <div className="az-rlbl">Quality Score</div>
                    <div className="az-verdict">74 / 100 · STRONG</div>
                    <div className="az-sub">ROIC 22.4% · Implied Growth 3.1% · Conservative debt</div>
                  </div>
                  <div style={{fontSize:'12px',color:'var(--muted)',lineHeight:1.6,marginTop:'12px'}}>ⓘ Sample output. Scores reflect your input data — not financial advice.</div>
                </div>
              </div>
            </div>

            <div className="prod-row rev reveal" id="prod-row-3">
              <div className="prod-row-text">
                <div className="prod-badge"><ILedger s={12}/>&nbsp;TraDaq · Coming Soon</div>
                <h3 className="prod-name">You&apos;re making sales. But are you actually making profit?</h3>
                <p className="prod-tagline">Track your business money daily. Know the truth about your hustle.</p>
                <blockquote className="prod-story">Many small business owners in Nigeria are working hard and going nowhere — because they are selling without knowing their actual profit. Revenue is not profit. TraDaq shows you the difference, in plain language.</blockquote>
                <ul className="prod-benefits">
                  {[
                    'Track money in and money out — 30 seconds per entry',
                    'See your actual profit, not just your sales number',
                    '"For every ₦100 you make, ₦23 is real profit"',
                    'No accountant needed. No spreadsheet. Just your phone.',
                  ].map(b => (
                    <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>
                  ))}
                </ul>
                <div className="prod-price-line">₦9,000 / year · Coming soon — early access pricing</div>
                <div className="prod-row-footer">
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-o btn-md">Join waitlist →</a>
                </div>
              </div>
              <div className="prod-row-vis">
                <div className="tq-demo">
                  <div style={{fontFamily:'var(--mono)',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'14px'}}>Your business · This month</div>
                  <div className="tq-stats">
                    <div className="tq-stat inc"><div className="tq-num">₦412k</div><div className="tq-lbl">Money In</div></div>
                    <div className="tq-stat exp"><div className="tq-num">₦317k</div><div className="tq-lbl">Money Out</div></div>
                    <div className="tq-stat profit"><div className="tq-num">₦95k</div><div className="tq-lbl">Your Profit</div></div>
                  </div>
                  <div className="tq-insight"><strong>What this means:</strong> For every ₦100 your business makes, ₦23 is real profit. Your biggest cost is Stock/Supplies at 48% of expenses. Reduce that by 10% and your profit jumps by ₦31k.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testi">
          <div className="wrap-md" style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow center>Real results</Eyebrow></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'16px'}}>What Nigerians are saying.</h2>
            <p className="lead reveal d2">From investors, traders, and business owners who use Meridian every day.</p>
          </div>
          <div className="testi-grid wrap">
            {[
              {q:<>&ldquo;The Equity Terminal showed me I had been buying overvalued stocks for two years. <strong>Within a month, my thinking changed completely.</strong> I now know exactly what I am buying and why.&rdquo;</>,        i:'C', bg:'var(--forest)',    n:'Chinedu O.', r:'Trader · Lagos',          p:'Equity Terminal'},
              {q:<>&ldquo;TraDaq showed me my actual profit margin was 18%, not 40% like I thought. <strong>I repriced everything and my real income jumped by ₦60,000 in the next month.</strong>&rdquo;</>,                          i:'A', bg:'var(--forest-mid)', n:'Adaeze N.',  r:'Business owner · Ibadan', p:'TraDaq'},
              {q:<>&ldquo;Stock School started from literally zero. I did not know what a share was. Now I have a real portfolio. <strong>My father asked me to explain his investments to him.</strong>&rdquo;</>,                      i:'T', bg:'var(--forest-lt)',  n:'Tunde F.',   r:'Graduate · Abuja',        p:'Stock School'},
            ].map((t, i) => (
              <div className={`testi-card reveal${i > 0 ? ' d' + i : ''}`} key={i}>
                <div className="testi-quote">{t.q}</div>
                <div className="testi-person">
                  <div className="testi-av" style={{background:t.bg}}>{t.i}</div>
                  <div>
                    <div className="testi-name">{t.n}</div>
                    <div className="testi-role">{t.r}</div>
                    <div className="testi-prod">{t.p}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="how" id="how-steps">
          <div className="how-hdr">
            <div className="reveal" style={{marginBottom:'20px',display:'flex',justifyContent:'center'}}><Eyebrow center light>Simple process</Eyebrow></div>
            <h2 className="disp disp-md on-f reveal d1" style={{textAlign:'center',marginBottom:'16px'}}>From visitor to <em>informed</em><br/>in three steps.</h2>
            <p className="lead lead-lt reveal d2" style={{textAlign:'center',maxWidth:'560px',margin:'0 auto'}}>No technical knowledge required. No confusing setup. Just you, your money questions, and Meridian.</p>
          </div>
          <div className="how-track">
            <div className="ball-wrap"><div className="ball"/></div>
            {[
              {n:'1', cls:'s1', t:'Create your free account',         d:'Go to meridianng.com/login and create a free account in under a minute. Your account is where all your products live — one login, everything in one place. Creating an account costs nothing.'},
              {n:'2', cls:'s2', t:'Pick your product and pay on Selar', d:'Browse our products and choose what fits your need right now. Pay once in Naira on Selar — our trusted payment partner. You receive your personal access key by email instantly after payment.'},
              {n:'3', cls:'s3', t:'Paste your key and unlock everything', d:'Sign in to your Meridian account, go to the Activate page, and paste your key. Your products unlock immediately. No separate apps. No extra logins. Everything is right there in your dashboard.'},
            ].map((s, i) => (
              <div className={`how-step reveal${i > 0 ? ' d' + i : ''}`} key={s.n}>
                <div className={`step-num ${s.cls}`}>{s.n}</div>
                <h3 className="step-title">{s.t}</h3>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing">
          <div style={{textAlign:'center',maxWidth:'600px',margin:'0 auto 56px'}}>
            <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow center>Transparent pricing</Eyebrow></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'16px'}}>Pay once.<br/><em>Learn forever.</em></h2>
            <p className="lead reveal d2">No subscriptions. No monthly fees. Pay once in Naira, keep access forever.</p>
          </div>
          <div className="pricing-grid wrap">
            {[
              {Icon:IBook,   n:'MoneySpeak',     pitch:'500 financial terms in plain Nigerian English. The dictionary you should have had from day one.',  amt:'₦4,500',  type:'One-time', feats:['All 500 terms, fully explained','Word of the Day, free forever','Searchable anytime','Lifetime access'],           cta:'Get access', url:'https://selar.com/m/meridian_ng', feat:false, dis:false},
              {Icon:IGrad,   n:'Stock School',   pitch:'The complete journey from zero investing knowledge to analysing stocks with confidence.',            amt:'₦18,000', type:'One-time', feats:['All 11 phases unlocked','NGX-specific examples','Practical frameworks','Lifetime access'],               cta:'Enrol now',  url:'https://selar.com/m/meridian_ng', feat:true,  dis:false},
              {Icon:IChart,  n:'Equity Terminal',pitch:"Analyse any company's financials using the same framework serious investors use.",                  amt:'₦15,000', type:'One-time', feats:['Full analysis engine','Portfolio tracking','Multi-year comparison','Lifetime V2 access'],             cta:'Get access', url:'https://selar.com/m/meridian_ng', feat:false, dis:false},
              {Icon:ILedger, n:'TraDaq',         pitch:'Simple business money tracking for market traders, IG sellers, and small business owners.',         amt:'₦9,000',  type:'Per year', feats:['Track income & expenses','Real profit calculation','Plain-English insights','Coming soon'],             cta:'Waitlist',   url:'https://selar.com/m/meridian_ng', feat:false, dis:true},
            ].map((p, i) => (
              <div key={p.n} className={`price-card reveal${i > 0 ? ' d' + i : ''}${p.feat ? ' feat' : ''}`}>
                {p.feat && <div className="feat-badge">Most popular</div>}
                <div className="price-icon"><p.Icon s={20}/></div>
                <div className="price-name">{p.n}</div>
                <div className="price-pitch">{p.pitch}</div>
                <div className="price-amt">{p.amt}</div>
                <div className="price-type">{p.type}</div>
                <ul className="price-feats">
                  {p.feats.map(f => (
                    <li key={f} className="price-feat"><span className="price-feat-ck"><ICheck s={12}/></span>{f}</li>
                  ))}
                </ul>
                {p.dis
                  ? <button className="btn-gh" style={{width:'100%',justifyContent:'center',opacity:.55,cursor:'default'}}>{p.cta}</button>
                  : p.feat
                    ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-g" style={{width:'100%',justifyContent:'center'}}>{p.cta} →</a>
                    : <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-gh" style={{width:'100%'}}>{p.cta} →</a>
                }
              </div>
            ))}
          </div>

          <div className="bundle-outer">
            <div className="bundle reveal">
              <div className="bundle-ey">Best value</div>
              <h3 className="bundle-title">Get everything.<br/><em>Save ₦11,500.</em></h3>
              <p className="bundle-desc">All four Meridian products under one access — every tool we build now and in the future, included. One payment. One key. Everything unlocked.</p>
              <p className="bundle-note">✓ MoneySpeak · Stock School · Equity Terminal available now &nbsp;·&nbsp; TraDaq unlocks at launch — included free</p>
              <div className="bundle-price">₦35,000</div>
              <div className="bundle-save">You save ₦11,500 vs buying separately</div>
              <div className="bundle-acts">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-lg">Get Meridian Access →</a>
                <button className="btn btn-cr btn-md" onClick={() => showPage('products')}>See individual products →</button>
              </div>
            </div>
          </div>
        </section>

        <section className="trust">
          <div className="wrap-md" style={{marginBottom:'48px'}}>
            <div className="reveal" style={{marginBottom:'20px',display:'flex',justifyContent:'center'}}><Eyebrow center>Why we built this</Eyebrow></div>
            <h2 className="disp disp-md reveal d1" style={{textAlign:'center'}}>Trust is earned with honesty,<br/>not <em>fancy words.</em></h2>
          </div>
          <div className="trust-grid" style={{maxWidth:'1160px',margin:'0 auto'}}>
            <div className="founder reveal">
              <p className="founder-body">&ldquo;Finance in Nigeria is not actually complicated. It just gets explained by people who benefit from your confusion — or by textbooks written for completely different realities. We built Meridian because when you understand what is happening to your money, <strong>nobody can mislead you.</strong>&rdquo;</p>
              <div className="founder-sig">
                <div className="founder-av">M</div>
                <div>
                  <div className="founder-name">Meridian Team</div>
                  <div className="founder-title">hello@meridianng.com</div>
                </div>
              </div>
            </div>
            <div className="trust-pts">
              {[
                {Icon:ILock, t:'We never tell you what to buy',      d:'Every Meridian tool puts the decision firmly in your hands. We give you understanding, frameworks, and analysis. The choice is always yours.'},
                {Icon:IFlag, t:'Built for Nigerian realities',        d:'NGX stocks. Naira pricing. CBN decisions. Inflation, devaluation, and the real economic conditions that affect your money — not Wall Street theory.'},
                {Icon:IMail, t:'We respond — WhatsApp and email',    d:'Access issue? Question about a product? WhatsApp us or email hello@meridianng.com. We respond within a few hours, every time.'},
                {Icon:ICard, t:'One-time Naira payments, no tricks', d:'Pay once through Selar. Keep access forever. No monthly subscriptions. No hidden fees. Your price today is your price always.'},
              ].map((p, i) => (
                <div className={`trust-pt reveal${i > 0 ? ' d' + i : ''}`} key={p.t}>
                  <div className="trust-icon"><p.Icon s={18}/></div>
                  <div>
                    <div className="trust-pt-title">{p.t}</div>
                    <div className="trust-pt-desc">{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="scam reveal" style={{maxWidth:'1160px',margin:'48px auto 0'}}>
            <div className="scam-title">⚠ Red flags you should now recognise</div>
            <div className="scam-items">
              {[
                '"Guaranteed 30% monthly return" — no legitimate investment offers guaranteed returns. This is always a scam.',
                '"Just send your money and we invest for you" — if you don\'t understand what they\'re doing, don\'t send it.',
                '"Join our signal group for ₦5,000" — trading signals are not education. Someone benefits from your confusion.',
                '"Limited time offer — invest today or miss out" — real investments don\'t expire. Urgency is a manipulation tactic.',
                '"Crypto will 10x in 2 months" — crypto is volatile. Anyone promising specific returns in a specific timeframe is lying.',
                '"My uncle works at CBN and says…" — insider information claims are almost always false. Acting on real insider info is illegal.',
              ].map((s, i) => (
                <div className="scam-item" key={i}>{s}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-sec">
          <div className="reveal" style={{marginBottom:'32px',display:'flex',justifyContent:'center'}}><Eyebrow center light>Your next step</Eyebrow></div>
          <h2 className="cta-hl reveal d1">Knowledge is expensive.<br/><em>Confusion costs more.</em></h2>
          <p className="lead lead-lt reveal d2" style={{maxWidth:'520px',margin:'0 auto 48px',textAlign:'center',position:'relative',zIndex:1}}>Every year you spend confused about money is a year someone else is profiting from that confusion. Start today.</p>

          <div className="cta-pills reveal d3">
            {[
              {Icon:IBook,  n:'MoneySpeak',          a:'₦4,500',                    feat:false},
              {Icon:IGrad,  n:'Stock School',         a:'₦18,000',                   feat:false},
              {Icon:IChart, n:'Equity Terminal',      a:'₦15,000',                   feat:false},
              {Icon:null,   n:'Meridian Access (All)',a:'₦35,000 — saves ₦11,500',   feat:true},
            ].map((p, i) => {
              const PillIcon = p.Icon
              return (
                <div className={`pill${p.feat ? ' feat-p' : ''}`} key={i}>
                  {PillIcon && <span style={{color:'rgba(248,244,236,0.6)'}}><PillIcon s={15}/></span>}
                  <span className="pill-name">{p.n}</span>
                  <span className="pill-amt">{p.a}</span>
                </div>
              )
            })}
          </div>

          <div className="cta-acts reveal d4">
            <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-xl">Start understanding money →</a>
            <a href="/login" className="btn btn-cr btn-lg">Sign in to dashboard</a>
          </div>
          <div className="cta-note reveal">One-time Naira payments via Selar · Instant access after purchase · No subscriptions</div>
        </section>
      </div>

      {/* ══════════════════════════ ABOUT ══════════════════════════ */}
      <div className={`page pt${page === 'about' ? ' active' : ''}`}>
        <section className="sec" style={{background:'var(--forest)',paddingBottom:0}}>
          <div className="wrap-md" style={{textAlign:'center',paddingBottom:'80px'}}>
            <div className="reveal" style={{marginBottom:'24px'}}><Eyebrow center light>Our story</Eyebrow></div>
            <h1 className="disp disp-lg on-f reveal d1" style={{marginBottom:'24px'}}>We built the teacher<br/><em>we wished we had.</em></h1>
            <p className="lead lead-lt reveal d2">Finance in Nigeria is not complicated. It just gets explained badly — by people who benefit from your confusion, or by textbooks written for completely different realities.</p>
          </div>
        </section>
        <section className="about-sec">
          <div className="about-grid">
            <div>
              {[
                'The Naira depreciating. CBN raising rates. Inflation eating savings quietly. Investing on the NGX. Running a business in a market with unpredictable infrastructure. None of these have simple answers.',
                'But they all deserve honest, clear explanations — in language that respects your intelligence rather than exploiting your unfamiliarity.',
                'Meridian was built because we believe that when you understand what is happening to your money — really understand it, not just nod along — you make better decisions. You are harder to mislead. You are harder to cheat.',
              ].map((t, i) => (
                <p key={i} className={`about-body reveal${i ? ' d' + i : ''}`}>{t}</p>
              ))}
              <p className="about-body reveal d3" style={{marginBottom:'32px'}}>We are not a bank. We are not a broker. We do not manage your money. <strong style={{color:'var(--charcoal)'}}>We just explain things properly.</strong></p>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md reveal d4">See our products</a>
            </div>
            <div className="about-vis reveal">
              <div className="about-vis-title">What we believe</div>
              <ul className="about-vis-list">
                {[
                  "The person who needs financial education the most is the market woman trying to grow her business, the fresh graduate wondering where to put her savings, and the parent trying to invest for school fees — not just the portfolio manager in VI.",
                  "Explaining finance in 'big grammar' is a choice. We chose differently.",
                  "You are not bad with money. The system just never spoke to you.",
                  "When you understand what you're doing, nobody can easily mislead you.",
                  "Simple does not mean shallow. You can explain complex things simply if you care enough to try.",
                ].map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        </section>
        <section className="mission-sec">
          <div className="reveal" style={{marginBottom:'32px',display:'flex',justifyContent:'center'}}><Eyebrow center light>Our mission</Eyebrow></div>
          <blockquote className="mission-quote reveal d1">&ldquo;Finance should never feel like<br/><em>it wasn&apos;t made for you.&rdquo;</em></blockquote>
          <p className="mission-sub reveal d2">We exist to close the gap between what finance actually is and what it feels like — to anyone who was not given the right language for it. That is the whole mission. Nothing more, nothing less.</p>
        </section>
        <section className="sec" style={{background:'var(--cream-2)'}}>
          <div className="reveal" style={{marginBottom:'48px',display:'flex',justifyContent:'center'}}><Eyebrow center>What guides us</Eyebrow></div>
          <div className="vals-grid">
            {[
              {Icon:ITarget,  t:'Radical clarity',          d:'If a 16-year-old cannot understand our explanation of a financial concept, we have failed. We rewrite until it is clear — not simple-minded, but genuinely accessible.'},
              {Icon:IUsers,   t:'Respect for the user',     d:"We never talk down. We never assume ignorance. We assume you are intelligent and just haven't had access to the right explanation. There is a big difference."},
              {Icon:ILock,    t:'Honest by design',         d:"Meridian is not a 'buy this stock' service. It is not financial advice. We build tools that put the analysis and decisions firmly in your hands, not ours."},
              {Icon:IFlag,    t:'Nigeria first',             d:'Our examples are from Mile 12, Aba, Kano, and Lagos Island. Our currency is Naira. Our context is the NGX, the CBN, and real Nigerian economic realities.'},
              {Icon:IZap,     t:'Built for today',           d:'Mobile-first, data-light, fast. We know the realities of Nigerian internet. Our tools are built to work on your phone, in your data conditions, in your context.'},
              {Icon:ICompass, t:'Outcomes over impressions', d:'We do not measure success by how complex our platform looks. We measure it by whether you understood something today that you did not understand yesterday.'},
            ].map((v, i) => (
              <div key={v.t} className={`val-card reveal${i > 0 ? ' d' + (i % 3 + 1) : ''}`}>
                <div className="val-icon"><v.Icon s={20}/></div>
                <h3 className="val-title">{v.t}</h3>
                <p className="val-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════════════════════ PRODUCTS ══════════════════════════ */}
      <div className={`page pt${page === 'products' ? ' active' : ''}`}>
        <section className="pp-hero">
          <div className="pp-hero-inner">
            <div className="reveal" style={{marginBottom:'24px'}}><Eyebrow center light>The full Meridian system</Eyebrow></div>
            <h1 className="disp disp-lg on-f reveal d1" style={{marginBottom:'20px'}}>Four tools.<br/><em>One goal.</em></h1>
            <p className="lead lead-lt reveal d2">Each product solves a specific, real problem. Buy what you need. Pay once. Use forever.</p>
          </div>
        </section>
        <section className="sec">
          <div className="wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            {[
              {acc:'',                                                      name:'MoneySpeak — Investment Dictionary', badge:<><IBook s={12}/>&nbsp;MoneySpeak</>,            bg:'rgba(10,59,31,0.08)',    fc:'var(--forest-mid)', tag:'500 terms. Nigerian stories. Your front door to financial clarity.',                    price:'₦4,500',  note:'One-time · Lifetime',     story:"You have been nodding along when people say 'liquidity,' 'portfolio diversification,' and 'bull run.' MoneySpeak is for the moment you decide to stop nodding and actually understand. Every term comes with a plain definition, a Nigerian story that makes it real, and a reality check.",                                          feats:['500 terms covering investing, business, and personal finance','Every term explained with a Nigerian story, not a textbook definition','Word of the Day — free, forever, no payment needed','Searchable interface — find any term in under 5 seconds','Organised by category: investing, business, crypto, personal finance','Reality check on every term — how it actually affects your decisions'],                       url:'https://selar.com/m/meridian_ng', cta:'Get MoneySpeak — ₦4,500 →',           btn:'btn-f'},
              {acc:'linear-gradient(90deg,#B8922A,#D4A83C)',               name:'Stock School — Investing Mastery',   badge:<><IGrad s={12}/>&nbsp;Stock School</>,          bg:'rgba(184,146,42,0.1)',   fc:'var(--gold)',       tag:'From complete beginner to confident, independent investor.',                            price:'₦18,000', note:'One-time · 11 Phases',    story:'Most investing content in Nigeria teaches you to follow tips and signals. Stock School teaches you something different: how to think. How to evaluate a company, understand why it is priced the way it is, and decide independently whether it belongs in your portfolio.',                                               feats:['11 structured phases from "what is a share?" to portfolio construction','NGX examples throughout — not Wall Street',"How to read and understand a company's annual report",'Valuation frameworks — is a stock cheap or expensive right now?','Risk thinking calibrated to Nigerian market realities','Works directly with Equity Terminal for hands-on practice'],                url:'https://selar.com/m/meridian_ng', cta:'Enrol in Stock School — ₦18,000 →',   btn:'btn-g'},
              {acc:'linear-gradient(90deg,#145C31,#1E8048)',               name:'Equity Terminal — Stock Analyser',   badge:<><IChart s={12}/>&nbsp;Equity Terminal</>,      bg:'rgba(10,59,31,0.08)',    fc:'var(--forest-mid)', tag:'The analysis tool for investors who want to think, not follow.',                        price:'₦15,000', note:'One-time · Lifetime V2',  story:"A stock going up is not the same as a stock being good. The Equity Terminal applies a proven Owner Earnings framework to data you enter from any company's annual report. You put in the numbers. It shows you what the maths says. You decide what to do.",                                                                   feats:['Owner Earnings analysis — the real cash the business makes for owners','Quick Mode: directional results from just 4 inputs — beginner-friendly','Multi-year tracking — see if quality is improving or declining','Calibrated for Nigeria (15% default hurdle rate for NGN)','Plain-English verdict with detailed supporting analysis','NGN, USD, GBP, EUR, ZAR, KES, GHS and more'],    url:'https://selar.com/m/meridian_ng', cta:'Get Equity Terminal — ₦15,000 →',     btn:'btn-f'},
              {acc:'linear-gradient(90deg,#C17A2A,#E4993A)',               name:'TraDaq — Business Money Tracker',    badge:<><ILedger s={12}/>&nbsp;TraDaq · Coming Soon</>,bg:'rgba(193,122,42,0.1)',   fc:'#8B5A18',          tag:'For traders, IG sellers, and anyone running a business without an accountant.',         price:'₦9,000',  note:'Per year · Early access', story:"Many small business owners in Nigeria are working 12 hours a day and ending the month confused about where the money went. 'I made good sales' is not the same as 'I made profit.' TraDaq shows you the exact difference.",                                                                                                  feats:['Track every sale and every cost — 30 seconds per entry','See your actual profit — not revenue, not "what\'s in the account"','Categorised expenses: stock, rent, transport, salary, marketing','"For every ₦100 you make, ₦23 is real profit"','Phone-first — no laptop, no spreadsheet, no accountant needed','Your data stays on your device — not shared with anyone'], url:'https://selar.com/m/meridian_ng', cta:'Join the TraDaq waitlist →',           btn:'btn-f'},
            ].map(p => (
              <div className="pdeep reveal" key={p.name}>
                <div className="pdeep-acc" style={p.acc ? {background: p.acc} : {}}/>
                <div className="pdeep-body">
                  <div className="pdeep-hdr">
                    <div>
                      <div className="prod-badge" style={{background:p.bg, color:p.fc}}>{p.badge}</div>
                      <div className="pdeep-name">{p.name}</div>
                      <div className="pdeep-tag">{p.tag}</div>
                    </div>
                    <div>
                      <div className="pdeep-price">{p.price}</div>
                      <div className="pdeep-pnote">{p.note}</div>
                    </div>
                  </div>
                  <div className="pdeep-story">{p.story}</div>
                  <div className="pdeep-feats">
                    {p.feats.map(f => (
                      <div className="pfeat" key={f}><div className="pfeat-ck"><ICheck s={9}/></div>{f}</div>
                    ))}
                  </div>
                  <div className="pdeep-note"><ILock s={13}/>Digital product — instant access after purchase. Any issue? Email hello@meridianng.com — resolved within the hour.</div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`btn ${p.btn} btn-md`}>{p.cta}</a>
                </div>
              </div>
            ))}
            <div className="bundle reveal">
              <div className="bundle-ey">Best value — everything included</div>
              <h3 className="bundle-title">Meridian Access.<br/><em>All four products. One payment.</em></h3>
              <p className="bundle-desc">MoneySpeak, Stock School, Equity Terminal, and TraDaq — all under one access. Every future product Meridian builds, included.</p>
              <p className="bundle-note">✓ MoneySpeak · Stock School · Equity Terminal available now &nbsp;·&nbsp; TraDaq unlocks at launch — included free</p>
              <div className="bundle-price">₦35,000</div>
              <div className="bundle-save">You save ₦11,500 vs buying separately</div>
              <div className="bundle-acts">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-xl">Get Meridian Access — ₦35,000 →</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════ CONTACT ══════════════════════════ */}
      <div className={`page pt${page === 'contact' ? ' active' : ''}`}>
        <section className="sec">
          <div className="contact-grid wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            <div>
              <div className="reveal" style={{marginBottom:'20px'}}><Eyebrow>Talk to us</Eyebrow></div>
              <h1 className="disp disp-md reveal d1" style={{marginBottom:'20px'}}>We actually<br/><em>respond.</em></h1>
              <p className="lead reveal d2" style={{marginBottom:'40px'}}>A question about a product. A term you want in MoneySpeak. An issue with your access. Feedback. Ideas. We read everything.</p>
              <div className="trust-pts">
                {[
                  {Icon:IMail, t:'WhatsApp (fastest)', d:'wa.me/2348148818179 — usually within the hour.'},
                  {Icon:IMail, t:'Email',              d:'hello@meridianng.com — we respond within a few hours'},
                ].map((c, i) => (
                  <div className={`trust-pt reveal${i ? ' d1' : ''}`} key={c.t}>
                    <div className="trust-icon"><c.Icon s={18}/></div>
                    <div>
                      <div className="trust-pt-title">{c.t}</div>
                      <div className="trust-pt-desc">{c.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{background:'white',borderRadius:'10px',padding:'48px',border:'1px solid var(--border)',boxShadow:'0 4px 32px rgba(10,59,31,0.07)'}} className="reveal d1">
              <h2 style={{fontFamily:'var(--serif)',fontSize:'30px',fontWeight:700,color:'var(--forest)',marginBottom:'8px',letterSpacing:'-.015em'}}>Send a message</h2>
              <p style={{fontSize:'16px',color:'var(--muted)',marginBottom:'32px',lineHeight:1.6}}>Tell us what you need. We will get back to you promptly.</p>
              {[
                {l:'Your name',     t:'text',  p:'e.g. Chinedu Okafor', v:cName,  s:setCName},
                {l:'Email address', t:'email', p:'you@example.com',      v:cEmail, s:setCEmail},
              ].map(f => (
                <div style={{marginBottom:'22px'}} key={f.l}>
                  <label className="form-lbl">{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={f.v} onChange={e => f.s(e.target.value)} className="form-inp"/>
                </div>
              ))}
              <div style={{marginBottom:'22px'}}>
                <label className="form-lbl">Subject</label>
                <select value={cSubject} onChange={e => setCSubject(e.target.value)} className="form-inp" style={{cursor:'pointer'}}>
                  {['General question','Access key issue','Product feedback','Term request for MoneySpeak','Business / Partnership'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{marginBottom:'28px'}}>
                <label className="form-lbl">Your message</label>
                <textarea placeholder="Tell us what you need..." rows={5} value={cMsg} onChange={e => setCMsg(e.target.value)} className="form-inp" style={{resize:'vertical',lineHeight:1.6}}/>
              </div>
              <button className="btn btn-f btn-md" style={{width:'100%',justifyContent:'center'}} onClick={sendContact} disabled={contactLoading}>
                {contactLoading ? 'Sending…' : 'Send message →'}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════ FOOTER ══════════════════════════ */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="logo-wrap" onClick={() => showPage('home')} style={{cursor:'pointer'}}>
                <MeridianLogo variant="full" theme="dark" width={148}/>
              </div>
              <p className="footer-brand-desc">Finance in plain Nigerian English — for investors, business owners, and anyone who has ever felt left out of the conversation.</p>
            </div>
            {[
              {title:'Products', links:[['MoneySpeak Dictionary','products'],['Stock School','products'],['Equity Terminal','products'],['TraDaq','products'],['Meridian Access (Bundle)','products']]},
              {title:'Company',  links:[['About Meridian','about'],['Contact','contact'],['Buy on Selar','https://selar.com/m/meridian_ng'],['Dashboard login','/login']]},
              {title:'Find us',  links:[['Instagram — @meridianng_','https://instagram.com/meridianng_'],['YouTube — @MeridianNG','https://youtube.com'],['WhatsApp','https://wa.me/2348148818179'],['Email us','mailto:hello@meridianng.com']]},
            ].map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      {(href.startsWith('http') || href.startsWith('/') || href.startsWith('mailto'))
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{label}</a>
                        : <a onClick={() => showPage(href)}>{label}</a>
                      }
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bot">
            <div className="footer-legal">© 2025 Meridian · <a onClick={() => setTermsOpen(true)}>Terms of Use</a><span>·</span><a onClick={() => setTermsOpen(true)}>Privacy Policy</a></div>
            <div className="footer-disc">Meridian is not a licensed financial advisor. All tools perform analytical calculations based on data you provide. Nothing on this platform constitutes financial advice. Always conduct your own research before making investment decisions.</div>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════ TERMS MODAL ══════════════════════════ */}
      <div className={`modal-bg${termsOpen ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) setTermsOpen(false) }}>
        <div className="modal-box">
          <div className="modal-close" onClick={() => setTermsOpen(false)}>✕</div>
          <h2 style={{fontFamily:'var(--serif)',fontSize:'34px',fontWeight:700,color:'var(--forest)',marginBottom:'32px',letterSpacing:'-.015em'}}>Terms of Use &amp; Privacy</h2>
          {[
            {h:'What Meridian is',        p:'Meridian is a financial education and analysis platform. Our products help you understand financial concepts, learn about investing, analyse company financials using data you input, and track your business finances. We are not a bank, broker, investment advisor, or licensed financial institution.'},
            {h:'Not financial advice',    p:'Nothing on Meridian constitutes financial advice. The terms "STRONG," "NEUTRAL," and "WEAK" in the Equity Terminal describe the output of a mathematical model based on data you entered — not a recommendation to buy, sell, or hold any security. You are solely responsible for all decisions you make.'},
            {h:'Your data and privacy',   p:'Your financial data entered in Meridian tools is stored in a private account accessible only to you. We do not sell your personal data to third parties. You can request deletion of your account at any time by emailing hello@meridianng.com.'},
            {h:'Payments and refunds',    p:'All purchases are processed through Selar. Due to the digital nature of our products, we generally do not offer refunds. If you experience a technical issue preventing access, contact hello@meridianng.com and we will resolve it promptly.'},
            {h:'Contact',                 p:'For any questions, email hello@meridianng.com. We respond within 24 hours.'},
          ].map(s => (
            <div className="modal-sec" key={s.h}><h3>{s.h}</h3><p>{s.p}</p></div>
          ))}
        </div>
      </div>

      <div className={`toast${toastShow ? ' show' : ''}`}>{toast}</div>
    </>
  )
}
