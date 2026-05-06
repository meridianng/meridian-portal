'use client'

import { useState, useEffect, useRef } from 'react'
import { MeridianLogo } from '@/components/MeridianLogo'
import './LandingPage.css'

/* ── ICONS ── */
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
const IWA     =()=><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
const IChevUp =()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>

/* ── WORD OF THE DAY DATA ── */
const DAILY_WORDS = [
  {
    term:'Liquidity', ph:'lik · wid · i · tee · noun',
    def:'How quickly you can turn what you own into cash when you actually need it.',
    story:'A woman has saved ₦800,000 in a plot of land behind her village. Thursday night, her child gets sick and she needs ₦60,000 by 6am Friday. She cannot call anyone at 3am to buy land. That money is hers, it is even gaining value — but right now, when she needs it, it cannot help her.',
    rule:'"Always check the liquidity of an investment before you commit your money."',
    reality:'Before you put money anywhere, ask one question: if something happens tonight, can I get this money back in seven days? If the answer is no, that investment is illiquid. Keep at least three months of expenses somewhere you can reach overnight.'
  },
  {
    term:'Inflation', ph:'in · flay · shun · noun',
    def:'The quiet process that makes your money buy less every year — even when you do nothing wrong.',
    story:'In 2015, your ₦500 was a bodybuilder. It carried jollof rice, two pieces of meat, and a cold Malt with change left. Today that same ₦500 is a lanky secondary school boy. Same paper. Same number. The buying power has traveled.',
    rule:'"If your savings pays 8% and inflation is 22%, you are getting poorer while saving."',
    reality:'Keeping all your money in a regular savings account in Nigeria is a costly mistake. If your money is not growing faster than inflation, you are losing real value every single year — even with a full balance.'
  },
  {
    term:'Compounding', ph:'kom · pown · ding · noun',
    def:'When your money earns a return, and instead of spending that return, you leave it so it starts earning its own returns too.',
    story:'Imagine you buy one he-goat and one she-goat and you keep them in your backyard. The secret is that you do not slaughter them for Isiewu the moment you have a small celebration. You let them give birth. Those small ones grow up and they too start giving birth. Before you know it, your backyard is waving with 50 goats that all came from just two. You did not struggle to buy 50 goats one by one — the goats were building each other while you were going about your business. Your only job was to give them time and resist the urge to chop the seed.',
    rule:'"Start early and leave it alone. Even a small amount will grow into something serious if you give it enough years."',
    reality:'In the Nigerian Stock Market, this is exactly how real wealth is built. When a company like Zenith or GTCO pays you dividends, you have two choices: collect the alert and enjoy it, or use that same money to buy more shares. If you keep reinvesting those alerts, you are turning your profit into new pikin goats that will produce their own returns next year. Compounding does not need you to be a millionaire from day one — it just needs you to start early and not slaughter the seed.'
  },
  {
    term:'Dividend', ph:'div · ih · dend · noun',
    def:"A share of a company's profits paid directly to shareholders — simply for owning the shares.",
    story:"You bought 500 shares of Zenith Bank. You did not go into work. At year end, the board says: 'We made good profit, let us share thank-you money with our owners.' You get a credit alert while eating suya at a roadside spot. Money entered your account while you were chewing. You did absolutely nothing. That alert is your dividend.",
    rule:'"A company that pays consistent dividends for 10 or more years is usually stable and trustworthy."',
    reality:'Dividend-paying stocks like Zenith Bank, GTCO, and MTNN are worth understanding for investors who want regular income. Always check a company\'s dividend history before you buy.'
  },
  {
    term:'Equity', ph:'ek · wi · tee · noun',
    def:'What you actually own — the value that is truly yours after all debts are removed.',
    story:"Uncle Emeka bought a house in Lekki for ₦25 million. He paid ₦5 million cash and took a ₦20 million mortgage. His equity is not ₦25 million. It is only ₦5 million — because the bank owns ₦20 million of that house. Every month he pays down the mortgage, his equity grows.",
    rule:'"Before celebrating an asset\'s value, subtract what you owe. What remains is your equity."',
    reality:'A business with ₦10 million in assets but ₦9 million in debts has only ₦1 million in equity. Understanding equity stops you from being impressed by big numbers that are mostly borrowed.'
  },
  {
    term:'ROIC', ph:'ar · oh · eye · see · noun',
    def:"How much profit a business generates for every naira invested back into it — a measure of how efficiently the company uses money.",
    story:"If you gave Mama Chinedu ₦100,000 to invest in her business and she returned ₦118,000 at year end, her ROIC is 18%. The question is whether that return is higher than what a bank would give her for the same ₦100,000 in a fixed deposit. If yes, the business is worth investing in. If no, she should have left the money in the bank.",
    rule:'"A company with consistently high ROIC has a real competitive advantage. Protect it."',
    reality:'This is one of the most important numbers the Equity Terminal calculates. Companies that consistently earn above their cost of capital are the ones that build real wealth for shareholders over time.'
  },
  {
    term:'Bull Market', ph:'bool mar · ket · noun',
    def:'A period when prices in the stock market are broadly rising and investor confidence is high.',
    story:"December vibes in the stock market. Everywhere you turn, people are talking about making money from stocks. Your barber is recommending shares. The Uber driver has three investment apps. Your auntie who never mentioned the NGX is asking how to buy Dangote shares. Prices are going up and everyone is happy. That is a bull market.",
    rule:'"A bull market is when to be careful, not when to abandon caution."',
    reality:'The dangerous thing about bull markets is that they make everyone look like a genius. When prices go up, almost every decision feels right. This is exactly when poor investments hide behind rising tides. Bull markets always end.'
  },
]


export default function LandingPage({ isSignedIn }: { isSignedIn?: boolean }) {
  const [page,           setPage]           = useState<'home'|'about'|'products'|'contact'>('home')
  const [productModal,   setProductModal]   = useState<'moneyspeak'|'stockschool'|'terminal'|'tradaq'|null>(null)
  const [menuOpen,       setMenuOpen]       = useState(false)
  const [termsOpen,      setTermsOpen]      = useState(false)
  const [navHidden,      setNavHidden]      = useState(false)
  const [showBackTop,    setShowBackTop]    = useState(false)
  const [wodExpanded,    setWodExpanded]    = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [cName,          setCName]          = useState('')
  const [cEmail,         setCEmail]         = useState('')
  const [cSubject,       setCSubject]       = useState('General question')
  const [cMsg,           setCMsg]           = useState('')
  const [toast,          setToast]          = useState('')
  const [toastShow,      setToastShow]      = useState(false)
  const lastY = useRef(0)
  const todayWord = DAILY_WORDS[new Date().getDay()]

  /* ── scroll listeners ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setNavHidden(y > lastY.current && y > 100)
      setShowBackTop(y > 400)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── reveal on scroll ── */
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
    }), { threshold: 0.07 })
    document.querySelectorAll('.reveal:not(.in)').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [page])

  /* ── flip cards on scroll ── */
  useEffect(() => {
    if (page !== 'home') return
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('flipped'), 600)
        obs.unobserve(e.target)
      }
    }), { threshold: 0.5 })
    document.querySelectorAll('.flip-card').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [page])

  /* ── page navigation ── */
  const showPage = (p: string) => {
    setPage(p as 'home'|'about'|'products'|'contact')
    setMenuOpen(false)
    // iOS-compatible scroll to top
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const scrollToSection = (id: string) => {
    if (page !== 'home') {
      setPage('home')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toast_ = (msg: string) => {
    setToast(msg); setToastShow(true)
    setTimeout(() => setToastShow(false), 3500)
  }

  async function sendContact(e: React.MouseEvent) {
    e.preventDefault()
    if (!cName.trim() || !cEmail.trim() || !cMsg.trim()) { toast_('Please fill in name, email, and message.'); return }
    setContactLoading(true)
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name:cName, email:cEmail, subject:cSubject, message:cMsg }) })
      if (r.ok) { toast_("Message sent. We will reply within a few hours."); setCName(''); setCEmail(''); setCMsg('') }
      else toast_('Something went wrong. Email us: hello@meridianng.com')
    } catch { toast_('Connection error. Email: hello@meridianng.com') }
    finally  { setContactLoading(false) }
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`mn${navHidden ? ' hidden' : ''}`}>
        <div className="logo-wrap" onClick={() => showPage('home')}>
          <MeridianLogo variant="full" theme="light" width={148}/>
        </div>
        <ul className="nav-links">
          <li><button className={page==='home'    ? 'act':''} onClick={() => showPage('home')}>Home</button></li>
          <li><button className={page==='about'   ? 'act':''} onClick={() => showPage('about')}>About</button></li>
          <li><button className={page==='products'? 'act':''} onClick={() => showPage('products')}>Products</button></li>
          <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
          <li><button className={page==='contact' ? 'act':''} onClick={() => showPage('contact')}>Contact</button></li>
        </ul>
        <div className="nav-actions">
          {isSignedIn
            ? <a href="/dashboard" className="btn btn-f btn-sm">My Dashboard →</a>
            : <>
                <a href="/login"    className="btn btn-o btn-sm">Sign in</a>
                <button onClick={() => scrollToSection('how-steps')} className="btn btn-f btn-sm">Get started →</button>
              </>
          }
        </div>
        <div className="hbg" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span/><span/><span/>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      {menuOpen && (
        <div
          style={{position:'fixed',inset:0,zIndex:488,background:'transparent'}}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* ── MOBILE MENU ── */}
      <div className={`mmenu${menuOpen ? ' open':''}`}>
        <button onClick={() => showPage('home')} className={page==='home'?'mm-act':''}>
          <span className="mm-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
          Home
        </button>
        <button onClick={() => showPage('about')} className={page==='about'?'mm-act':''}>
          <span className="mm-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></span>
          About
        </button>
        <button onClick={() => showPage('products')} className={page==='products'?'mm-act':''}>
          <span className="mm-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg></span>
          Products
        </button>
        <button onClick={() => scrollToSection('pricing')}>
          <span className="mm-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
          Pricing
        </button>
        <button onClick={() => showPage('contact')} className={page==='contact'?'mm-act':''}>
          <span className="mm-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
          Contact
        </button>
        <div className="mm-actions">
          {isSignedIn
            ? <a href="/dashboard" className="btn btn-f">My Dashboard →</a>
            : <>
                <a href="/login"   className="btn btn-o" style={{color:'var(--forest)'}}>Sign in</a>
                <button onClick={() => scrollToSection('how-steps')} className="btn btn-f" style={{color:'var(--cream)'}}>Get started →</button>
              </>
          }
        </div>
      </div>

      {/* ── WHATSAPP FLOAT ── */}
      <div className="wa-float">
        <div className="wa-lbl">Chat on WhatsApp</div>
        <a href="https://wa.me/2348148818179?text=Hi%2C%20I%20have%20a%20question%20about%20Meridian" target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp"><IWA/></a>
      </div>

      {/* ── BACK TO TOP ── */}
      <button className={`back-top${showBackTop ? ' visible':''}`} onClick={backToTop} aria-label="Back to top"><IChevUp/></button>

      {/* ── TOAST ── */}
      {toastShow && (
        <div style={{position:'fixed',bottom:80,left:'50%',transform:'translateX(-50%)',background:'#0A3B1F',color:'#F8F4EC',padding:'12px 24px',borderRadius:'100px',fontSize:'14px',fontFamily:'var(--sans)',zIndex:900,boxShadow:'0 8px 32px rgba(10,59,31,0.25)',whiteSpace:'nowrap'}}>
          {toast}
        </div>
      )}


      {/* ══════════ HOME ══════════ */}
      <div className={`page pt${page==='home' ? ' active':''}`}>

        {/* HERO */}
        <section className="hero">
          <div className="hero-l">
            <div className="reveal" style={{marginBottom:'20px'}}>
              <span className="eyebrow">Finance in plain Nigerian English</span>
            </div>
            <h1 className="hero-hl reveal d1">
              The day you understand your money<br/>
              <em>is the day everything changes.</em>
            </h1>
            <p className="hero-sub reveal d2">
              Meridian is where <strong>Nigerians who are tired of nodding along</strong> come to finally understand what is happening to their money — in language that fits their reality, not someone else's textbook.
            </p>
            <div className="hero-acts reveal d3">
              <button onClick={() => showPage('products')} className="btn btn-f btn-lg">See what we built →</button>
              <a href="/login" className="btn btn-o btn-lg">Sign in</a>
            </div>
            <div className="hero-trust reveal d4">
              <div className="trust-dots">
                <span>K</span><span>A</span><span>T</span><span>F</span>
              </div>
              <div className="trust-txt">
                <strong>500+ Nigerians</strong> already making smarter money decisions
              </div>
            </div>
          </div>
          <div className="hero-r">
            {/* WOD CARD */}
            <div className="wod reveal">
              <div className="wod-label">MoneySpeak · Word of the Day · Always Free</div>
              <div className="wod-term">{todayWord.term}</div>
              <div className="wod-ph">{todayWord.ph}</div>
              <div className="wod-def">{todayWord.def}</div>
              <div className="wod-div"/>
              <div className="wod-story-lbl">The Nigerian story</div>
              <div className="wod-story">{todayWord.story}</div>
              {!wodExpanded && (
                <button className="wod-read-more" onClick={() => setWodExpanded(true)}>
                  Read the full lesson →
                </button>
              )}
              {wodExpanded && (
                <div className="wod-full">
                  <div className="wod-rule">&ldquo;{todayWord.rule}&rdquo;</div>
                  <div className="wod-reality">{todayWord.reality}</div>
                  <div style={{marginTop:'12px',fontSize:'13px',color:'var(--gold)',fontWeight:600,cursor:'pointer',fontFamily:'var(--sans)'}} onClick={() => showPage('products')}>
                    See all 500 terms in MoneySpeak →
                  </div>
                </div>
              )}
            </div>
            <div className="mini-grid reveal d1">
              {[
                {Icon:IBook,   name:'MoneySpeak',      desc:'500 terms, Nigerian stories'},
                {Icon:IGrad,   name:'Stock School',    desc:'Zero to confident investor'},
                {Icon:IChart,  name:'Equity Terminal', desc:'Analyse any stock yourself'},
                {Icon:ILedger, name:'TraDaq',          desc:'Know your real profit daily'},
              ].map(p => (
                <div className="mini-tile" key={p.name} onClick={() => showPage('products')}>
                  <p.Icon s={18}/>
                  <div>
                    <div className="mini-tile-nm">{p.name}</div>
                    <div className="mini-tile-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT MERIDIAN IS */}
        <section className="what-sec">
          <div className="what-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}>
              <span className="eyebrow center">What we built</span>
            </div>
            <h2 className="what-tagline reveal d1">
              Meridian is the <em>older sibling</em> you needed to explain all of this.
            </h2>
            <p className="lead reveal d2">
              We built four tools that take every financial concept — the terms, the analysis, the investing, the business tracking — and translate them using real Nigerian examples you will actually recognise.
            </p>
          </div>
          <div className="pillars">
            {[
              {n:'01', t:'No big grammar',      d:"Every explanation uses examples from the market, the street, and everyday Nigerian life. If it doesn't make sense without a finance degree, we rewrite it until it does."},
              {n:'02', t:'You stay in control', d:'We never tell you what to buy. We give you the tools and knowledge to make your own informed decisions. Your money, your judgment, your outcome.'},
              {n:'03', t:'Built for Nigeria',   d:'NGX stocks. Naira pricing. CBN decisions. Real context around inflation, devaluation, and the economic realities that actually affect your money every day.'},
            ].map((p, i) => (
              <div className={`pillar reveal${i>0?' d'+i:''}`} key={p.n}>
                <div className="pillar-num">{p.n}</div>
                <h3 className="pillar-title">{p.t}</h3>
                <p className="pillar-desc">{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PAIN SECTION */}
        <section className="pain">
          <div className="pain-grid">
            <div>
              <div className="reveal" style={{marginBottom:'20px'}}>
                <span className="eyebrow light">The honest truth</span>
              </div>
              <h2 className="pain-hl reveal d1">
                The financial system was never designed <em>to explain itself to you.</em>
              </h2>
              <p className="pain-body reveal d2">
                Banks, advisors, and textbooks all speak a language designed to keep you <strong>coming back to ask for help.</strong> The more confused you are, the more dependent you become on people who profit from that confusion.
              </p>
              <p className="pain-body reveal d3">
                This is not about your intelligence. It is about access. Meridian gives you the access.
              </p>
            </div>
            <div>
              {[
                {tag:'The family gathering',  txt:"Your uncle talks about 'diversifying his portfolio' and everyone nods respectfully. You're nodding too — but inside you're wondering if portfolio is something you eat with egusi."},
                {tag:'Your business',         txt:"You made ₦400,000 in sales this month. After everything, you don't know if you actually made profit — or just moved money from one pocket to another."},
                {tag:'The WhatsApp group',    txt:"Someone drops a hot investment tip. Forty fire emojis. You want to ask what it means but you don't want to look like you don't know. So you go quiet."},
                {tag:'The stock market',      txt:"You've heard 'buy shares' three times this year. You have the money. But you don't know how to check if a company is actually worth buying at today's price."},
              ].map((s,i) => (
                <div className={`scene reveal${i>0?' d'+i:''}`} key={s.tag}>
                  <div className="scene-tag">{s.tag}</div>
                  <div className="scene-txt">{s.txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREE ALTERNATIVES */}
        <section style={{background:'var(--sage)',padding:'96px 5vw'}}>
          <div style={{maxWidth:'960px',margin:'0 auto'}}>
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">The context problem</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'20px',textAlign:'center'}}>
              Information is everywhere.<br/><em>Context is rare.</em>
            </h2>
            <p className="lead reveal d2" style={{textAlign:'center',maxWidth:'680px',margin:'0 auto 48px'}}>
              Your friend said "just search online" or "ask the internet." And you tried. But here is what they did not tell you: most of that information was not written for a Nigerian living in today's reality.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}} className="reveal d2">
              {[
                {icon:'🌍', title:'Global information, no local context', body:"You can search for how to analyse Dangote Cement and get a very confident answer — the problem is that it does not understand the NGX, the Naira, how CBN decisions affect valuations, or what the actual numbers inside a Nigerian annual report mean."},
                {icon:'📺', title:'YouTube finance, wrong country', body:"The American man explaining stocks is genuinely helpful — for American stocks. But you are investing in Nigeria. The brokers, the tax rules, the exchange mechanics, the economic forces — none of them map to your reality. You need someone who has actually walked this ground."},
                {icon:'📱', title:'Instagram gurus, no accountability', body:"They tell you to buy. It goes up and they screenshot their wins. It goes down and they go quiet. There is no framework, no reasoning, and no accountability. And when it does not work, your money absorbs the mistake, not theirs."},
                {icon:'💬', title:'WhatsApp tips, collective confidence', body:"The group is confident. The tips are flowing. Everyone seems to know something. But collective confidence is not the same as individual understanding. When the signal is wrong, forty people lose money together — and nobody warned anyone."},
              ].map((p,i) => (
                <div key={p.title} className={`reveal${i>0?' d'+(i%2+1):''}`} style={{background:'white',borderRadius:'10px',padding:'24px',border:'1px solid var(--border)'}}>
                  <div style={{fontSize:'24px',marginBottom:'12px'}}>{p.icon}</div>
                  <div style={{fontFamily:'var(--serif)',fontSize:'17px',fontWeight:700,color:'var(--forest)',marginBottom:'8px'}}>{p.title}</div>
                  <div style={{fontSize:'14px',color:'var(--muted)',lineHeight:1.75}}>{p.body}</div>
                </div>
              ))}
            </div>
            <div className="reveal d3" style={{background:'var(--forest)',borderRadius:'12px',padding:'32px 36px',marginTop:'32px',textAlign:'center'}}>
              <p style={{fontFamily:'var(--serif)',fontSize:'clamp(18px,2vw,24px)',fontStyle:'italic',color:'var(--cream)',lineHeight:1.65,marginBottom:'20px'}}>
                &ldquo;Meridian was built because when you understand what is happening to your money — really understand it, not just nod along — nobody can easily mislead you again. That is the whole idea.&rdquo;
              </p>
              <button onClick={() => showPage('about')} className="btn btn-cr btn-md">Read our story →</button>
            </div>
          </div>
        </section>

        {/* CHASE SAPA FOR GOOD */}
        <section className="sapa-sec">
          <div className="sapa-inner">
            <div className="sapa-l">
              <div className="reveal" style={{marginBottom:'20px'}}>
                <span className="eyebrow">The transformation</span>
              </div>
              <h2 className="disp reveal d1" style={{fontSize:'clamp(36px,4.5vw,66px)',marginBottom:'20px'}}>
                Chase sapa for good.<br/><em>Here is what that actually means.</em>
              </h2>
              <p style={{fontSize:'17px',lineHeight:1.85,color:'var(--muted)',marginBottom:'16px'}} className="reveal d2">
                In this country, the real sapa is not just the absence of money. It is the confusion that keeps you from growing the little you already have. It is the fear that makes you leave your savings somewhere inflation is quietly chopping it every year, simply because you do not know where else to turn. It is the silence in the WhatsApp group when you want to ask what something means but you do not want to look like you do not know.
              </p>
              <p style={{fontSize:'17px',lineHeight:1.85,color:'var(--muted)'}} className="reveal d3">
                Moving from that confusion to genuine confidence is the greatest investment you will ever make. Imagine a life where you do not just hope your money is safe — <strong style={{color:'var(--ink)'}}>you actually know it is working.</strong> Once you have the right understanding, you start to see opportunities where others only see "economy hard."
              </p>
            </div>
            <div className="sapa-outcomes">
              {[
                {
                  svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="7" x2="16" y2="7"/><line x1="12" y1="11" x2="16" y2="11"/></svg>,
                  title: 'You finally understand the words',
                  body: 'EBITDA. Yield. Equity. Liquidity. When people say these in a meeting — or in the news — you will not just nod. You will understand what it means for your pocket.',
                },
                {
                  svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                  title: 'You check before you invest',
                  body: 'Someone drops a hot stock tip in the group. Before, you would have followed. Now you open the annual report, run the numbers, and decide for yourself. You know what you are buying.',
                },
                {
                  svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
                  title: 'Your business stops lying to you',
                  body: 'Big sales. Small account. You have felt this confusion. When you understand your real numbers — cost, margin, actual profit — December no longer steals what January was supposed to keep.',
                },
                {
                  svg: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  title: 'Nobody can easily deceive you again',
                  body: '"Guaranteed 30% monthly return." "Send your money to invest." You will hear these and know exactly what they are — before you lose a single kobo to them.',
                },
              ].map((o,i) => (
                <div className={`sapa-outcome reveal${i>0?' d'+i:''}`} key={o.title}>
                  <span className="sapa-outcome-icon">{o.svg}</span>
                  <div className="sapa-outcome-text">
                    <strong>{o.title}</strong>
                    <span>{o.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="prod-sec">
          <div className="prod-sec-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">Four tools. One purpose.</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px'}}>Each product solves one real problem.</h2>
            <p className="lead reveal d2">Read the story behind each one. By the time you finish, you will already know which one you need first.</p>
          </div>

          {/* MONEYSPEAK */}
          <div className="prod-row reveal" id="prod-moneyspeak">
            <div className="prod-row-text">
              <div className="prod-badge"><IBook s={11}/>&nbsp;MoneySpeak Dictionary</div>
              <h3 className="prod-name">You have been nodding for too long.</h3>
              <div className="prod-story-block">
                &ldquo;EBITDA.&rdquo; The man at the investment seminar says it with complete confidence and half the room nods. You nod too. But later, alone in your car, you search for it on your phone and the definition you find is just as confusing as the word itself. MoneySpeak was built for that car moment — and for every conversation before it.
              </div>
              <ul className="prod-benefits">
                {[
                  '500 financial terms — every single one explained with a Nigerian story, not a textbook definition',
                  'Word of the Day is always free — you are reading one right now, no payment needed',
                  'Searchable — hear a term you don\'t understand, look it up in ten seconds',
                  'Covers investing, business, personal finance, and the crypto terms everyone is using',
                ].map(b => <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>)}
              </ul>
              <div className="prod-row-footer">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Get MoneySpeak →</a>
                <button className="prod-overview-link" onClick={() => setProductModal('moneyspeak')}>What is inside? ↗</button>
              </div>
            </div>
            <div className="prod-row-vis">
              <div className="module-demo-label">Sample terms from MoneySpeak</div>
              <div className="dict-term-block">
                <div className="dict-term-word">Dividend</div>
                <div className="dict-term-exp">You bought Zenith Bank shares. At year end, the bank made billions in profit. They share <em>thank-you money</em> with owners. You get a credit alert while eating suya. You did nothing. That is a dividend.</div>
              </div>
              <div className="dict-term-block">
                <div className="dict-term-word">Bull Market</div>
                <div className="dict-term-exp">This is <em>Detty December</em> in the stock market. Prices are rising, portfolios are green, everyone thinks they are a genius. Even your barber is giving stock tips.</div>
              </div>
              <div className="dict-term-block">
                <div className="dict-term-word">Compounding</div>
                <div className="dict-term-exp">One male goat + one female goat. They give birth. You don&apos;t slaughter the kids for pepper soup. <em>Before you know it, your backyard has 50 goats from just 2.</em></div>
              </div>
            </div>
          </div>

          {/* STOCK SCHOOL */}
          <div className="prod-row rev reveal" id="prod-stockschool">
            <div className="prod-row-text">
              <div className="prod-badge"><IGrad s={11}/>&nbsp;Stock School</div>
              <h3 className="prod-name">From &ldquo;I don&apos;t even know where to start&rdquo; to building a real portfolio.</h3>
              <div className="prod-story-block">
                The problem with most investing content in Nigeria is that it teaches you to follow. Follow the tips. Follow the signals. Follow the group. Stock School teaches you something completely different — how to think. By the end, you are not following anyone.
              </div>
              <ul className="prod-benefits">
                {[
                  '11 structured phases from "what is a share?" to building your first real portfolio',
                  'Built entirely around the Nigerian Exchange Group — not Wall Street examples',
                  'How to read an annual report — the one from NGX, not some American company',
                  'How to decide whether a stock is cheap or expensive at today\'s price',
                ].map(b => <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>)}
              </ul>
              <div className="prod-row-footer">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Enrol in Stock School →</a>
                <button className="prod-overview-link" onClick={() => setProductModal('stockschool')}>See all 11 phases ↗</button>
              </div>
            </div>
            <div className="prod-row-vis">
              <div className="module-demo-label">11 Phases · Your learning path</div>
              <div className="course-modules">
                {[
                  {n:'01', t:'What is a share? What is the stock market?', d:true},
                  {n:'02', t:"How to read a company's annual report",       d:true},
                  {n:'03', t:'How to find and evaluate stocks on the NGX', d:true},
                  {n:'04', t:'How to tell if a stock is cheap or expensive',d:false},
                  {n:'05', t:'Understanding risk and your actual tolerance',d:false},
                  {n:'06', t:'Building your real portfolio strategy',       d:false},
                  {n:'07', t:'Thinking like a long-term investor',          d:false},
                  {n:'⋯',  t:'4 more phases →',                            d:false},
                ].map(m => (
                  <div key={m.n} className={`module-item${m.d?' done':''}`}>
                    <div className="module-num">{m.n}</div>
                    <div className="module-title">{m.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EQUITY TERMINAL */}
          <div className="prod-row reveal" id="prod-terminal">
            <div className="prod-row-text">
              <div className="prod-badge"><IChart s={11}/>&nbsp;Equity Terminal</div>
              <h3 className="prod-name">Every company will tell you they made profit last year.</h3>
              <div className="prod-story-block">
                The newspapers quote the number. Your colleague hears it and tells you to buy their shares. But a company can post billions in profit while quietly borrowing more than it will ever repay, burning through cash it does not have, and paying dividends from money it borrowed somewhere else. Equity Terminal shows you the numbers behind the numbers — the cash that actually stayed inside the business.
              </div>
              <ul className="prod-benefits">
                {[
                  'Owner Earnings analysis — the real cash the business keeps after everything it needs to survive',
                  'Quick Mode: directional results from just 4 inputs if you are a complete beginner',
                  'Multi-year tracking — watch whether a company\'s quality improves or declines over time',
                  'Works for NGX stocks, US stocks, and companies across Africa',
                ].map(b => <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>)}
              </ul>
              <div className="prod-row-footer">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md">Get Equity Terminal →</a>
                <button className="prod-overview-link" onClick={() => setProductModal('terminal')}>See a sample analysis ↗</button>
              </div>
            </div>
            <div className="prod-row-vis">
              <div className="module-demo-label">Example: Dangote Cement · FY 2024</div>
              <div className="az-demo">
                <div className="az-grid">
                  {[
                    {l:'Revenue',           v:'₦1.02T'},
                    {l:'Net Income (PAT)',  v:'₦146B'},
                    {l:'Share Price',       v:'₦612'},
                    {l:'Shares Outstanding',v:'17.04B'},
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
                <div style={{fontSize:'12px',color:'rgba(248,244,236,0.35)',lineHeight:1.5,marginTop:'10px',fontFamily:'var(--sans)'}}>Sample output only. Not financial advice.</div>
              </div>
            </div>
          </div>

          {/* TRADAQ */}
          <div className="prod-row rev reveal" id="prod-tradaq">
            <div className="prod-row-text">
              <div className="prod-badge"><ILedger s={11}/>&nbsp;TraDaq · Coming Soon</div>
              <h3 className="prod-name">You made good sales this month. But did you make profit?</h3>
              <div className="prod-story-block">
                Mama Bukola sells fashion on Instagram. Every week she moves stock. Every month the account looks active. But at the end of three months, she realises her business has grown in size and shrunk in profit — because she has been celebrating revenue while her actual margin silently disappears. TraDaq shows you the truth in 30 seconds a day.
              </div>
              <ul className="prod-benefits">
                {[
                  'Track money in and money out — 30 seconds per entry, no accountant needed',
                  'See your actual profit — not revenue, not what is in the account, the real number',
                  '"For every ₦100 you make, ₦23 is real profit" — that kind of clarity, daily',
                  'Built for market traders, Instagram sellers, and small business owners',
                ].map(b => <li className="prod-benefit" key={b}><span className="prod-bcheck"><ICheck s={9}/></span>{b}</li>)}
              </ul>
              <div className="prod-row-footer">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-o btn-md">Join the TraDaq waitlist →</a>
                <button className="prod-overview-link" onClick={() => setProductModal('tradaq')}>What is TraDaq? ↗</button>
              </div>
            </div>
            <div className="prod-row-vis">
              <div className="module-demo-label">Your business · This month</div>
              <div className="tq-demo">
                <div className="tq-stats">
                  <div className="tq-stat inc"><div className="tq-num">₦412k</div><div className="tq-lbl">Money In</div></div>
                  <div className="tq-stat exp"><div className="tq-num">₦317k</div><div className="tq-lbl">Money Out</div></div>
                  <div className="tq-stat profit"><div className="tq-num">₦95k</div><div className="tq-lbl">Real Profit</div></div>
                </div>
                <div className="tq-insight"><strong>What this means:</strong> For every ₦100 your business makes, ₦23 is real profit. Your biggest cost is stock and supplies at 48% of expenses. Reduce that by 10% and your profit jumps by ₦31,000.</div>
              </div>
            </div>
          </div>
        </section>

        {/* FLIP CARDS — Before / After */}
        <section className="flip-sec">
          <div className="flip-sec-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">Real stories</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px',color:'var(--forest)'}}>What actually changes.</h2>
            <p className="lead reveal d2">Scroll through and see what Meridian looks like in a real person's life — before and after.</p>
          </div>
          <div className="flip-grid">
            {[
              {
                product:'TraDaq',
                before:{ name:'Chioma · Onitsha', quote:"I have been selling grade lace in the main market for over ten years. Every December my shop is full and money is entering, so I feel like I'm hammering. But every January I'm scratching my head wondering where that money went. I work hard but I cannot tell if I am making profit or just moving money from one pocket to another." },
                after:{  name:'Chioma · Onitsha', quote:"TraDaq showed me my real margin was 22%, not the 45% I was assuming in my head. I saw exactly which expenses were quietly chopping my profit. I repriced my lace, dropped the goods that were wasting my time, and January no longer scares me. I finally know the truth about my own hustle." }
              },
              {
                product:'Stock School + Equity Terminal',
                before:{ name:'Tunde · Lagos', quote:"I just finished NYSC and I am determined to survive this economy. I hear stocks everywhere so I join WhatsApp signal groups. I am always nodding when colleagues talk about the NGX but deep down I am terrified of losing the little I saved. I once sent ₦50k to a hot tip I saw online. Three months later, the money had vanished." },
                after:{  name:'Tunde · Lagos', quote:"I stopped following gurus and went through Stock School. Now when someone drops a hot tip in the group, I don't jump. I open Equity Terminal, run the actual numbers, and see the truth myself. I even sat my father down to explain why the shares he has been holding since 2005 are underperforming. I am not just investing anymore — I am in control." }
              },
              {
                product:'MoneySpeak',
                before:{ name:'Adaeze · Ibadan', quote:"My boss kept saying 'we need to improve our EBITDA' in every single meeting. Everyone would nod. I would nod too. I went home and Googled it three times. Every definition I found was just as confusing as the word itself." },
                after:{  name:'Adaeze · Ibadan', quote:"MoneySpeak explained EBITDA as the loud raw money entering the shop before government and life start chopping it. I read it once and never forgot it again. Now I am the one explaining terms in the team meeting. My boss looked surprised the first time." }
              },
            ].map((c, i) => (
              <div className="flip-card reveal" key={i}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="flip-card-face-lbl">Before Meridian</div>
                    <div className="flip-card-product">{c.product}</div>
                    <div className="flip-card-quote">&ldquo;{c.before.quote}&rdquo;</div>
                    <div className="flip-card-name">{c.before.name}</div>
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-face-lbl">After Meridian</div>
                    <div className="flip-card-product">{c.product}</div>
                    <div className="flip-card-quote">&ldquo;{c.after.quote}&rdquo;</div>
                    <div className="flip-card-name">{c.after.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flip-hint">Cards flip automatically as you scroll · Tap any card to flip it back</div>
        </section>

        {/* PROTECTION — You will never be scammed again */}
        <section className="protect-sec">
          <div className="protect-inner">
            <div className="reveal" style={{marginBottom:'20px'}}><span className="eyebrow light">The protection</span></div>
            <h2 className="protect-hl reveal d1">
              You will never be <em>easily scammed again.</em>
            </h2>
            <p className="protect-body reveal d2">
              Someone told you they would grow your money by 300% in two months through crypto, forex, or whatever financial trend was popular that week. They were very confident. Very convincing. You almost did it. With Meridian, you now have something they cannot take from you: <strong>the ability to ask the right questions and know when the answers do not add up.</strong>
            </p>
            <p className="protect-body reveal d3" style={{marginBottom:'48px'}}>
              This was not built with sophistication to confuse you — it was built to bring you closer to the truth. Because knowledge is expensive, but confusion costs more.
            </p>
            <div className="protect-grid">
              {[
                {icon:'⚠️', title:'"Guaranteed 30% monthly"',        text:"No legitimate investment offers guaranteed returns. Every single time someone guarantees a specific percentage, they are either lying or running a scheme. Now you know to ask: where exactly is this money coming from?"},
                {icon:'🚨', title:'"Just send us your money"',        text:"If you do not understand what they are doing with your money, that is not an opportunity — that is exposure. Meridian teaches you to evaluate what you are actually buying, not just how much you might make."},
                {icon:'⏰', title:'"Invest today or miss out"',        text:"Real investments do not expire overnight. Urgency is a manipulation tactic — it stops you from thinking clearly. When someone creates artificial time pressure around your money, that pressure is the red flag."},
                {icon:'📱', title:'"My insider says to buy this"',    text:"Insider tips are either false, illegal, or both. People who genuinely have accurate non-public information cannot legally share it. Acting on real insider information is a crime. Now you know what to say when someone offers you 'inside knowledge.'"},
                {icon:'🔄', title:'"Join our signal group"',          text:"Trading signals are not education. Someone benefits from your confusion every time you follow a signal you do not understand. The goal of Meridian is to make you the person who generates the signal, not the one who follows it blindly."},
                {icon:'📈', title:'"This will 10x in two months"',    text:"Any investment promising specific large returns in a specific short timeframe is not making a prediction — it is making a promise that cannot be kept. Understanding how valuations actually work makes this immediately visible."},
              ].map((c, i) => (
                <div className={`protect-card reveal${i>0?' d'+(i%3+1):''}`} key={c.title}>
                  <span className="protect-card-icon">{c.icon}</span>
                  <h4 className="protect-card-title">{c.title}</h4>
                  <p className="protect-card-text">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testi">
          <div className="wrap-md" style={{textAlign:'center',marginBottom:'48px'}}>
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">In their own words</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px'}}>What Nigerians are saying.</h2>
            <p className="lead reveal d2">From investors, traders, and business owners who use Meridian.</p>
          </div>
          <div className="testi-grid wrap">
            {[
              {
                quote:"I am a fresh graduate and I have been looking for how to survive in this economy. I was hearing stocks and buy shares everywhere and a friend introduced me to Meridian. I was skeptical but decided to start with MoneySpeak. Now I understand every term I see online and I can even explain things to people. I am going to buy Stock School next.",
                i:'F', bg:'var(--forest)', n:'Funmi A.', r:'Fresh Graduate · Lagos', p:'MoneySpeak'
              },
              {
                quote:"The Equity Terminal showed me I had been buying overvalued stocks for almost two years. I thought I was investing because I was following all the right people online. After running a few companies through the terminal, I realised I was just following hype. My thinking changed completely.",
                i:'C', bg:'var(--forest-mid)', n:'Chinedu O.', r:'Investor · Lagos', p:'Equity Terminal'
              },
              {
                quote:"I run a fashion business on Instagram. I was making good sales every month but I never really knew if I was making profit or just moving money. TraDaq showed me my actual margin was less than half of what I thought. I repriced three product lines and my real income jumped the next month.",
                i:'A', bg:'var(--forest-lt)', n:'Adaeze N.', r:'Business Owner · Ibadan', p:'TraDaq'
              },
            ].map((t,i) => (
              <div className={`testi-card reveal${i>0?' d'+i:''}`} key={i}>
                <div className="testi-quote">{t.quote}</div>
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
          <div className="testi-more-wrap" style={{display:'flex',justifyContent:'center',marginTop:'32px'}}>
            <button className="btn btn-o btn-md" onClick={() => showPage('about')}>Read more stories →</button>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how" id="how-steps">
          <div className="how-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow light center">Simple process</span></div>
            <h2 className="disp disp-md on-f reveal d1" style={{textAlign:'center',marginBottom:'14px'}}>From visitor to <em>informed</em> in three steps.</h2>
            <p className="lead lead-lt reveal d2" style={{textAlign:'center',maxWidth:'520px',margin:'0 auto'}}>No technical knowledge needed. No confusing setup. Just you, your money questions, and Meridian.</p>
          </div>
          <div className="how-track">
            {[
              {n:'1',cls:'s1',t:'Create a free account',     d:'Go to meridianng.com and sign up. Free. Takes one minute. No card needed. This is where everything you buy will live.'},
              {n:'2',cls:'s2',t:'Choose one product and pay',d:'Pick what solves your biggest money problem today. Pay once in Naira on Selar. Your personal access key arrives in your email within two minutes.'},
              {n:'3',cls:'s3',t:'Paste your key, start now', d:'Go to your dashboard, click Activate Key, paste it in. Everything unlocks immediately. No waiting. No app download. Open it on your phone right now.'},
            ].map((s,i) => (
              <div className={`how-step reveal${i>0?' d'+i:''}`} key={s.n}>
                <div className={`step-num ${s.cls}`}>{s.n}</div>
                <h3 className="step-title">{s.t}</h3>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'52px'}}>
            <a href="/login" className="btn btn-f btn-lg reveal d3" style={{display:'inline-flex'}}>Create your free account →</a>
            <p style={{marginTop:'12px',fontSize:'13px',color:'rgba(248,244,236,0.4)',fontFamily:'var(--sans)'}}>Free to create · Pay only when you choose a product</p>
          </div>
        </section>

        {/* WHAT GUIDES US */}
        <section className="guides-sec">
          <div className="guides-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">What guides us</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px'}}>Trust is earned with honesty, <em>not fancy words.</em></h2>
            <p className="lead reveal d2">Six things we will never compromise on — no matter how big Meridian gets.</p>
          </div>
          <div className="vals-grid">
            {[
              {Icon:ITarget,  t:'No big grammar',          d:'If a 16-year-old cannot understand our explanation of a financial concept, we have failed. We rewrite it until it is genuinely clear — not dumbed down, just properly explained.'},
              {Icon:IUsers,   t:'You stay in control',     d:"Meridian is not a 'buy this stock' service. We do not manage your money or tell you what to do with it. Every tool we build puts the analysis and the decision firmly in your hands, where it belongs."},
              {Icon:ILock,    t:'Results over vibe',       d:"We do not care about looking sophisticated. We care about whether you understood something today that you did not understand yesterday. That is the only measure of success we track."},
              {Icon:IFlag,    t:'Nigeria first',            d:'Our examples are from Mile 12, Aba, Kano, and Lagos Island. Our currency is Naira. Our context is the NGX, the CBN, and the real economic conditions that actually affect your money every day.'},
              {Icon:IZap,     t:'Built for your phone',    d:'Mobile-first, data-light, fast. We know the realities of Nigerian internet. Our tools work on your phone, in your actual data conditions, not in an ideal world with perfect WiFi.'},
              {Icon:ICompass, t:'Honest by design',        d:'Finance in Nigeria is not actually complicated. It just gets explained badly by people who benefit from your confusion. We chose to explain it properly instead.'},
            ].map((v,i) => (
              <div key={v.t} className={`val-card reveal${i>0?' d'+(i%3+1):''}`}>
                <span className="val-icon"><v.Icon s={20}/></span>
                <h3 className="val-title">{v.t}</h3>
                <p className="val-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing" id="pricing">
          <div className="pricing-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">Pricing</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px'}}>Start with one.<br/><em>Come back for the rest.</em></h2>
            <p className="lead reveal d2">Every product works on its own. Pay once in Naira. Keep it forever. No subscriptions.</p>
          </div>
          <div className="pricing-grid wrap">
            {[
              {Icon:IBook,   n:'MoneySpeak',      pitch:'500 financial terms in plain Nigerian English. The vocabulary you should have had from day one.',        amt:'₦4,500',  type:'One-time payment',      feats:['All 500 terms, fully explained','Word of the Day, free forever','Searchable anytime, on any device','Lifetime access — pay once'],                        cta:'Get MoneySpeak →',      url:'https://selar.com/m/meridian_ng',feat:false,dis:false,modal:'moneyspeak'},
              {Icon:IGrad,   n:'Stock School',    pitch:'The complete journey from zero investing knowledge to building and analysing a real portfolio.',          amt:'₦18,000', type:'One-time payment',      feats:['All 11 phases, unlocked immediately','NGX-specific examples throughout','Practical frameworks, not just theory','Lifetime access'],                    cta:'Enrol in Stock School →',url:'https://selar.com/m/meridian_ng',feat:true, dis:false,modal:'stockschool'},
              {Icon:IChart,  n:'Equity Terminal', pitch:"Analyse any company's financial report using the same framework that serious investors use.",             amt:'₦15,000', type:'One-time payment',      feats:['Full Owner Earnings analysis engine','Portfolio tracking across time','Multi-year comparison view','Lifetime V2 access'],                              cta:'Get Equity Terminal →', url:'https://selar.com/m/meridian_ng',feat:false,dis:false,modal:'terminal'},
              {Icon:ILedger, n:'TraDaq',          pitch:'Simple daily money tracking for market traders, IG sellers, and anyone running a business in Nigeria.',  amt:'₦9,000',  type:'Per year · Coming soon',feats:['Track income and expenses daily','Real profit calculation','Plain-English daily insights','Coming soon — join the waitlist'],                  cta:'Join waitlist →',       url:'https://selar.com/m/meridian_ng',feat:false,dis:true, modal:'tradaq'},
            ].map((p,i) => (
              <div key={p.n} className={`price-card reveal${i>0?' d'+i:''}${p.feat?' feat':''}`}>
                {p.feat && <div className="feat-badge">Most popular</div>}
                <div className="price-icon"><p.Icon s={22}/></div>
                <div className="price-name">{p.n}</div>
                <div className="price-pitch">{p.pitch}</div>
                <div className="price-amt">{p.amt}</div>
                <div className="price-type">{p.type}</div>
                <ul className="price-feats">
                  {p.feats.map(f => <li className="price-feat" key={f}><span className="price-feat-ck"><ICheck s={9}/></span>{f}</li>)}
                </ul>
                {p.dis
                  ? <button className="btn-ghost" style={{width:'100%',justifyContent:'center',opacity:.5,cursor:'default'}}>{p.cta}</button>
                  : p.feat
                    ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-g" style={{width:'100%',justifyContent:'center'}}>{p.cta}</a>
                    : <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{width:'100%'}}>{p.cta}</a>
                }
                <button className="prod-overview-link" onClick={() => setProductModal(p.modal as 'moneyspeak'|'stockschool'|'terminal'|'tradaq')}>What is inside? ↗</button>
              </div>
            ))}
          </div>
          <div className="bundle-outer">
            <div className="bundle reveal">
              <div className="bundle-ey">Best value — everything included</div>
              <h3 className="bundle-title">Meridian Access.<br/><em>All four products. One payment.</em></h3>
              <p className="bundle-desc">MoneySpeak, Stock School, Equity Terminal, and TraDaq — all under one access key. Every product Meridian builds going forward, included automatically.</p>
              <p className="bundle-note">MoneySpeak, Stock School, and Equity Terminal available now · TraDaq unlocks at launch — included free</p>
              <div className="bundle-price">₦35,000</div>
              <div className="bundle-save">You save ₦11,500 compared to buying each separately</div>
              <div className="bundle-acts">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-lg">Get Meridian Access →</a>
                <button className="btn btn-cr btn-md" onClick={() => showPage('products')}>See individual products →</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-sec">
          <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow light center">Your next step</span></div>
          <h2 className="cta-hl reveal d1">Knowledge is expensive.<br/><em>Confusion costs more.</em></h2>
          <p className="cta-sub reveal d2">Every year you spend confused about money is a year someone else is profiting from that confusion. The good news is you can change that today.</p>
          <div className="cta-acts reveal d3">
            <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-xl">Start understanding money →</a>
            <a href="/login" className="btn btn-cr btn-lg">Sign in to my dashboard</a>
          </div>
        </section>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <div className={`page pt${page==='about'?' active':''}`}>
        <section style={{background:'var(--forest)',padding:'80px 5vw 0'}}>
          <div className="wrap-md" style={{textAlign:'center',paddingBottom:'80px'}}>
            <div className="reveal" style={{marginBottom:'20px'}}><span className="eyebrow light center">Our story</span></div>
            <h1 className="disp disp-lg on-f reveal d1" style={{marginBottom:'20px'}}>We built the teacher <em>we wished we had.</em></h1>
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
              ].map((t,i) => <p key={i} className={`about-body reveal${i?' d'+i:''}`}>{t}</p>)}
              <p className="about-body reveal d3" style={{marginBottom:'28px'}}>We are not a bank. We are not a broker. We do not manage your money. <strong style={{color:'var(--charcoal)'}}>We just explain things properly.</strong></p>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-md reveal d4">See our products</a>
            </div>
            <div className="about-vis reveal">
              <div className="about-vis-title">What we believe</div>
              <ul className="about-vis-list">
                {[
                  "The person who needs financial education the most is the market woman trying to grow her business, the fresh graduate wondering where to put her savings, and the parent investing for school fees.",
                  "Explaining finance in big grammar is a choice. We chose differently.",
                  "You are not bad with money. The system just never spoke to you.",
                  "When you understand what you're doing, nobody can easily mislead you.",
                  "Simple does not mean shallow. You can explain complex things simply if you care enough to try.",
                ].map((b,i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>
        </section>
        <section className="mission-sec">
          <div className="reveal" style={{marginBottom:'24px',display:'flex',justifyContent:'center'}}><span className="eyebrow light center">Our mission</span></div>
          <blockquote className="mission-quote reveal d1">&ldquo;Finance should never feel like <em>it wasn&apos;t made for you.&rdquo;</em></blockquote>
          <p className="mission-sub reveal d2">We exist to close the gap between what finance actually is and what it feels like to someone who was never given the right language for it.</p>
        </section>
        <section className="guides-sec">
          <div className="guides-hdr">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow center">What guides us</span></div>
            <h2 className="disp disp-md reveal d1" style={{marginBottom:'14px'}}>Six things we will never compromise on.</h2>
          </div>
          <div className="vals-grid">
            {[
              {Icon:ITarget,  t:'No big grammar',       d:'If a 16-year-old cannot understand our explanation of a financial concept, we have failed. We rewrite until it is genuinely clear — not dumbed down, just properly explained.'},
              {Icon:IUsers,   t:'You stay in control',  d:"Meridian is not a buy-this-stock service. We do not manage your money or tell you what to do. Every tool we build puts the analysis and the decision firmly in your hands."},
              {Icon:ILock,    t:'Honest by design',     d:'We never dress up our products as more than they are. They are tools that perform calculations based on your inputs. The decision is always yours.'},
              {Icon:IFlag,    t:'Nigeria first',         d:'Our examples are from Mile 12, Aba, Kano, and Lagos Island. Our currency is Naira. Our context is the NGX and Nigerian economic reality.'},
              {Icon:IZap,     t:'Built for your phone', d:'Mobile-first, data-light, fast. We know the realities of Nigerian internet. Our tools work on your phone, in your actual conditions.'},
              {Icon:ICompass, t:'Results over vibe',    d:"We don't care about looking sophisticated. We care about whether you understood something today that you didn't understand yesterday. That is the only measure."},
            ].map((v,i) => (
              <div key={v.t} className={`val-card reveal${i>0?' d'+(i%3+1):''}`}>
                <span className="val-icon"><v.Icon s={20}/></span>
                <h3 className="val-title">{v.t}</h3>
                <p className="val-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ══════════ PRODUCTS PAGE ══════════ */}
      <div className={`page pt${page==='products'?' active':''}`}>
        <section className="pp-hero">
          <div className="pp-hero-inner">
            <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow light center">The full Meridian system</span></div>
            <h1 className="disp disp-lg on-f reveal d1" style={{marginBottom:'16px'}}>Four tools.<br/><em>One goal.</em></h1>
            <p className="lead lead-lt reveal d2">Each product solves a specific, real Nigerian problem. Buy what you need. Pay once. Use forever.</p>
          </div>
        </section>
        <section className="sec">
          <div className="wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            {[
              {acc:'linear-gradient(90deg,#0A3B1F,#145C31)',name:'MoneySpeak — Investment Dictionary',badge:<><IBook s={12}/>&nbsp;MoneySpeak</>,bg:'rgba(10,59,31,0.08)',fc:'var(--forest-mid)',tag:'500 terms. Nigerian stories. Your front door to financial clarity.',price:'₦4,500',note:'One-time · Lifetime',story:"You have been nodding along when people say 'liquidity,' 'portfolio diversification,' and 'bull run.' MoneySpeak is for the moment you decide to stop nodding and actually understand. Every term comes with a plain definition, a Nigerian story that makes it real, and a reality check for how it affects your money.",feats:['500 terms covering investing, business, and personal finance','Every term explained with a Nigerian story — not a textbook definition','Word of the Day — free, forever, no payment needed','Searchable — find any term in under five seconds','Reality check on every term showing how it actually affects your decisions'],url:'https://selar.com/m/meridian_ng',cta:'Get MoneySpeak →',btn:'btn-f',modal:'moneyspeak'},
              {acc:'linear-gradient(90deg,#B8922A,#D4A83C)',name:'Stock School — Investing Mastery',badge:<><IGrad s={12}/>&nbsp;Stock School</>,bg:'rgba(184,146,42,0.1)',fc:'var(--gold)',tag:'From complete beginner to confident, independent investor.',price:'₦18,000',note:'One-time · 11 Phases',story:'Most investing content in Nigeria teaches you to follow tips and signals. Stock School teaches you something different: how to think. How to evaluate a company, understand why it is priced the way it is, and decide independently whether it belongs in your portfolio. NGX examples throughout.',feats:['11 structured phases from "what is a share?" to portfolio construction','NGX examples throughout — not Wall Street','How to read and understand a company\'s annual report','Valuation frameworks — is a stock cheap or expensive right now?','Risk thinking calibrated to Nigerian market realities'],url:'https://selar.com/m/meridian_ng',cta:'Enrol in Stock School →',btn:'btn-g',modal:'stockschool'},
              {acc:'linear-gradient(90deg,#145C31,#1E8048)',name:'Equity Terminal — Stock Analyser',badge:<><IChart s={12}/>&nbsp;Equity Terminal</>,bg:'rgba(10,59,31,0.08)',fc:'var(--forest-mid)',tag:'The analysis tool for investors who want to think, not follow.',price:'₦15,000',note:'One-time · Lifetime V2',story:"A stock going up is not the same as a stock being good. The Equity Terminal applies a proven Owner Earnings framework to data you enter from any company's annual report. You put in the numbers. It shows you what the maths says. You decide what to do.",feats:['Owner Earnings analysis — the real cash the business makes for owners','Quick Mode: directional results from just 4 inputs — beginner friendly','Multi-year tracking — see if quality is improving or declining','Plain-English verdict with detailed supporting analysis','NGN, USD, GBP, EUR, ZAR, KES, GHS and more'],url:'https://selar.com/m/meridian_ng',cta:'Get Equity Terminal →',btn:'btn-f',modal:'terminal'},
              {acc:'linear-gradient(90deg,#C17A2A,#E4993A)',name:'TraDaq — Business Money Tracker',badge:<><ILedger s={12}/>&nbsp;TraDaq · Coming Soon</>,bg:'rgba(193,122,42,0.1)',fc:'#8B5A18',tag:'For traders, IG sellers, and anyone running a business without an accountant.',price:'₦9,000',note:'Per year · Early access',story:"Many small business owners in Nigeria are working 12 hours a day and ending the month confused about where the money went. 'I made good sales' is not the same as 'I made profit.' TraDaq shows you the exact difference, in plain language, every single day.",feats:['Track every sale and every cost — 30 seconds per entry','See your actual profit — not revenue, not what\'s in the account','Categorised expenses: stock, rent, transport, salary, marketing','Phone-first — no laptop, no spreadsheet, no accountant needed'],url:'https://selar.com/m/meridian_ng',cta:'Join the waitlist →',btn:'btn-f',modal:'tradaq'},
            ].map(p => (
              <div className="pdeep reveal" key={p.name}>
                <div className="pdeep-acc" style={{background:p.acc}}/>
                <div className="pdeep-body">
                  <div className="pdeep-hdr">
                    <div>
                      <div className="prod-badge" style={{background:p.bg,color:p.fc}}>{p.badge}</div>
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
                    {p.feats.map(f => <div className="pfeat" key={f}><div className="pfeat-ck"><ICheck s={9}/></div>{f}</div>)}
                  </div>
                  <div className="pdeep-note"><ILock s={13}/>Digital product — instant access after purchase. Any issue? Email hello@meridianng.com — resolved within the hour.</div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`btn ${p.btn} btn-md`}>{p.cta}</a>
                </div>
              </div>
            ))}
            <div className="bundle reveal">
              <div className="bundle-ey">Best value — everything included</div>
              <h3 className="bundle-title">Meridian Access.<br/><em>All four products. One payment.</em></h3>
              <p className="bundle-desc">MoneySpeak, Stock School, Equity Terminal, and TraDaq — all under one access. Every future product Meridian builds, included automatically.</p>
              <p className="bundle-note">MoneySpeak, Stock School, and Equity Terminal available now · TraDaq unlocks at launch — included free</p>
              <div className="bundle-price">₦35,000</div>
              <div className="bundle-save">You save ₦11,500 compared to buying each separately</div>
              <div className="bundle-acts">
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-g btn-xl">Get Meridian Access →</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════ CONTACT ══════════ */}
      <div className={`page pt${page==='contact'?' active':''}`}>
        <section className="sec">
          <div className="contact-grid wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            <div>
              <div className="reveal" style={{marginBottom:'16px'}}><span className="eyebrow">Talk to us</span></div>
              <h1 className="disp disp-md reveal d1" style={{marginBottom:'16px'}}>We actually <em>respond.</em></h1>
              <p className="lead reveal d2" style={{marginBottom:'36px'}}>A question about a product. A term you want in MoneySpeak. An issue with your access. Feedback. Ideas. We read everything.</p>
              <div className="trust-pt reveal d1">
                <div className="trust-icon"><IWA/></div>
                <div><div className="trust-pt-title">WhatsApp (fastest)</div><div className="trust-pt-desc"><a href="https://wa.me/2348148818179" target="_blank" rel="noopener noreferrer" style={{color:'var(--forest)'}}>wa.me/2348148818179</a> — usually within the hour.</div></div>
              </div>
              <div className="trust-pt reveal d2" style={{marginTop:'16px'}}>
                <div className="trust-icon"><IMail s={18}/></div>
                <div><div className="trust-pt-title">Email</div><div className="trust-pt-desc"><a href="mailto:hello@meridianng.com" style={{color:'var(--forest)'}}>hello@meridianng.com</a> — we respond within a few hours</div></div>
              </div>
            </div>
            <div style={{background:'white',borderRadius:'12px',padding:'44px 40px',border:'1px solid var(--border)',boxShadow:'0 4px 32px rgba(10,59,31,0.07)'}} className="reveal d1">
              <h2 style={{fontFamily:'var(--serif)',fontSize:'28px',fontWeight:700,color:'var(--forest)',marginBottom:'8px',letterSpacing:'-.015em'}}>Send a message</h2>
              <p style={{fontSize:'15px',color:'var(--muted)',marginBottom:'28px',lineHeight:1.6}}>Tell us what you need. We will get back to you promptly.</p>
              {[
                {l:'Your name',     t:'text', p:'e.g. Chinedu Okafor',v:cName, s:setCName},
                {l:'Email address', t:'email',p:'you@example.com',     v:cEmail,s:setCEmail},
              ].map(f => (
                <div style={{marginBottom:'20px'}} key={f.l}>
                  <label className="form-lbl">{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={f.v} onChange={e => f.s(e.target.value)} className="form-inp"/>
                </div>
              ))}
              <div style={{marginBottom:'20px'}}>
                <label className="form-lbl">Subject</label>
                <select value={cSubject} onChange={e => setCSubject(e.target.value)} className="form-inp" style={{cursor:'pointer'}}>
                  {['General question','Access key issue','Product feedback','Term request for MoneySpeak','Business / Partnership'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{marginBottom:'24px'}}>
                <label className="form-lbl">Your message</label>
                <textarea placeholder="Tell us what you need..." rows={5} value={cMsg} onChange={e => setCMsg(e.target.value)} className="form-inp" style={{resize:'vertical',lineHeight:1.6}}/>
              </div>
              <button className="btn btn-f btn-md" style={{width:'100%',justifyContent:'center'}} onClick={sendContact} disabled={contactLoading}>
                {contactLoading ? 'Sending…':'Send message →'}
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════ FOOTER ══════════ */}
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
              {title:'Products', links:[
                {l:'MoneySpeak Dictionary',     fn:()=>{ showPage('products'); setTimeout(()=>document.getElementById('prod-moneyspeak')?.scrollIntoView({behavior:'smooth'}),150) }},
                {l:'Stock School',              fn:()=>{ showPage('products'); setTimeout(()=>document.getElementById('prod-stockschool')?.scrollIntoView({behavior:'smooth'}),150) }},
                {l:'Equity Terminal',           fn:()=>{ showPage('products'); setTimeout(()=>document.getElementById('prod-terminal')?.scrollIntoView({behavior:'smooth'}),150) }},
                {l:'TraDaq',                    fn:()=>{ showPage('products'); setTimeout(()=>document.getElementById('prod-tradaq')?.scrollIntoView({behavior:'smooth'}),150) }},
                {l:'Meridian Access (Bundle)',  fn:()=>{ showPage('products') }},
              ]},
              {title:'Company', links:[
                {l:'About Meridian',   fn:()=>showPage('about')},
                {l:'Pricing',         fn:()=>scrollToSection('pricing')},
                {l:'Contact',         fn:()=>showPage('contact')},
                {l:'Buy on Selar',    fn:()=>window.open('https://selar.com/m/meridian_ng','_blank')},
                {l:'Dashboard login', fn:()=>window.location.href='/login'},
              ]},
              {title:'Find us', links:[
                {l:'Instagram — @meridianng_', fn:()=>window.open('https://instagram.com/meridianng_','_blank')},
                {l:'WhatsApp',                 fn:()=>window.open('https://wa.me/2348148818179','_blank')},
                {l:'Email us',                 fn:()=>window.location.href='mailto:hello@meridianng.com'},
              ]},
            ].map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(({l,fn}) => <li key={l}><button onClick={fn}>{l}</button></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bot">
            <div className="footer-legal">
              © 2025 Meridian
              <span>·</span>
              <button onClick={() => setTermsOpen(true)}>Terms of Use</button>
              <span>·</span>
              <button onClick={() => setTermsOpen(true)}>Privacy Policy</button>
            </div>
            <div className="footer-disc">Meridian is not a licensed financial advisor. All tools perform analytical calculations based on data you provide. Nothing on this platform constitutes financial advice. Always do your own research before making any investment decision.</div>
          </div>
        </div>
      </footer>

      {/* ══════════ MODALS ══════════ */}
      {productModal && (
        <div className="prod-modal-bg" onClick={() => setProductModal(null)}>
          <div className="prod-modal-box" onClick={e => e.stopPropagation()}>
            <button className="prod-modal-close" onClick={() => setProductModal(null)}>✕</button>
            {productModal === 'moneyspeak' && (
              <div className="prod-modal-inner">
                <div className="prod-modal-eyebrow">MoneySpeak · Financial Dictionary</div>
                <h2 className="prod-modal-hl">The financial vocabulary <em>nobody taught you.</em></h2>
                <p className="prod-modal-sub">You have sat in a meeting, a family gathering, or a WhatsApp group and nodded along to a word you did not understand. MoneySpeak explains 500 financial terms the way your most knowledgeable friend would — with a Nigerian story, a reality check, and a rule you can actually use.</p>
                <div className="prod-modal-for">
                  <div className="prod-modal-for-title">This is for you if:</div>
                  <div className="prod-modal-for-item">You hear terms like &ldquo;liquidity,&rdquo; &ldquo;yield,&rdquo; or &ldquo;equity&rdquo; and nod without knowing what they mean</div>
                  <div className="prod-modal-for-item">You want to understand what happens to your money when the CBN raises rates or inflation rises</div>
                  <div className="prod-modal-for-item">You are tired of being the person who cannot follow the financial conversation</div>
                </div>
                <div className="prod-modal-sample-title">What an entry looks like:</div>
                <div className="prod-modal-sample">
                  <div className="prod-modal-sample-term">Compounding</div>
                  <div className="prod-modal-sample-ph">kom · pown · ding · noun</div>
                  <div className="prod-modal-sample-def">When your money earns returns — and then those returns start earning returns too.</div>
                  <div className="prod-modal-sample-story"><strong>The Nigerian story:</strong> One male goat. One female goat. You keep them and they have kids. You do not kill the kids for pepper soup. Before you know it, your backyard has 50 goats from just two. The goats built each other.</div>
                </div>
                <div className="prod-modal-feats">
                  {['500 terms covering investing, business, crypto, and personal finance','Every term explained with a Nigerian story — not a textbook definition','Word of the Day is always free — no payment needed','Searchable interface — find any term in five seconds','Reality check on every entry: how it actually affects your money decisions'].map(f => <div className="prod-modal-feat" key={f}><span className="prod-modal-feat-ck">✓</span>{f}</div>)}
                </div>
                <div className="prod-modal-outcome">After MoneySpeak, you will never nod along again. You will be the person who actually understands what is being discussed — and what it means for your money.</div>
                <div className="prod-modal-footer">
                  <div className="prod-modal-price">₦4,500 <span>· One-time · Lifetime access</span></div>
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-lg prod-modal-cta">I am done nodding along — get MoneySpeak →</a>
                  <div className="prod-modal-guarantee">One-time Naira payment via Selar · Instant access · No subscriptions ever</div>
                </div>
              </div>
            )}
            {productModal === 'stockschool' && (
              <div className="prod-modal-inner">
                <div className="prod-modal-eyebrow">Stock School · Investing Course</div>
                <h2 className="prod-modal-hl">From &ldquo;what is a share?&rdquo; <em>to building a real portfolio.</em></h2>
                <p className="prod-modal-sub">Eleven structured phases, built entirely around the Nigerian Exchange Group, starting from absolute zero. No assumed knowledge. No big grammar. No Wall Street examples that mean nothing in Nigerian context.</p>
                <div className="prod-modal-for">
                  <div className="prod-modal-for-title">This is for you if:</div>
                  <div className="prod-modal-for-item">You have heard &ldquo;buy shares&rdquo; multiple times but do not know how to check if the price is actually fair</div>
                  <div className="prod-modal-for-item">You want to invest but you are scared of making an expensive mistake because nobody taught you the fundamentals</div>
                  <div className="prod-modal-for-item">You are tired of relying on other people&apos;s opinions about what to do with your own money</div>
                </div>
                <div className="prod-modal-phases-title">The 11 phases:</div>
                <div className="prod-modal-phases">
                  {[
                    {n:'01',t:'What is a share? What is the stock market?',out:'You will explain exactly how share ownership works'},
                    {n:'02',t:"How to read a company's annual report",out:'You will find the numbers that matter in under 10 minutes'},
                    {n:'03',t:'How to find stocks on the NGX',out:'You will navigate the exchange and understand what you are looking at'},
                    {n:'04',t:'How to evaluate if a stock is cheap or expensive',out:'You will never buy a stock just because it is going up'},
                    {n:'05',t:'Understanding risk and your tolerance',out:'You will know exactly how much risk you are actually taking on'},
                    {n:'06',t:'Building a real portfolio strategy',out:'You will have a written investment framework that belongs to you'},
                    {n:'07',t:'Thinking like a long-term investor',out:'You will stop checking prices daily and start thinking in years'},
                    {n:'08',t:'Using the Equity Terminal with real data',out:'You will analyse your first company yourself'},
                    {n:'09',t:'Reading management quality and track record',out:'You will know what good capital allocation looks like'},
                    {n:'10',t:'How dividends work and how to evaluate them',out:'You will build a simple dividend watchlist on the NGX'},
                    {n:'11',t:'Your first real portfolio — building and reviewing',out:'You finish with an actual portfolio, built on your own analysis'},
                  ].map(p => (
                    <div className="prod-modal-phase" key={p.n}>
                      <div className="prod-modal-phase-n">{p.n}</div>
                      <div><div className="prod-modal-phase-t">{p.t}</div><div className="prod-modal-phase-out">After this: {p.out}</div></div>
                    </div>
                  ))}
                </div>
                <div className="prod-modal-outcome">By the end of Stock School, your family members will be asking you to explain their investments to them.</div>
                <div className="prod-modal-footer">
                  <div className="prod-modal-price">₦18,000 <span>· One-time · Lifetime access to all 11 phases</span></div>
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-lg prod-modal-cta">Enrol in Stock School →</a>
                  <div className="prod-modal-guarantee">One-time Naira payment via Selar · Instant access · No subscriptions ever</div>
                </div>
              </div>
            )}
            {productModal === 'terminal' && (
              <div className="prod-modal-inner">
                <div className="prod-modal-eyebrow">Equity Terminal · Stock Analysis Tool</div>
                <h2 className="prod-modal-hl">Stop following hype. <em>Check the actual numbers.</em></h2>
                <p className="prod-modal-sub">A stock going up is not the same as a stock being good. The Equity Terminal applies a proven Owner Earnings framework to data you enter from any company&apos;s annual report. You put in the numbers. It shows you what the maths says. You decide.</p>
                <div className="prod-modal-for">
                  <div className="prod-modal-for-title">This is for you if:</div>
                  <div className="prod-modal-for-item">You want to check a company yourself before investing instead of relying on someone else&apos;s opinion</div>
                  <div className="prod-modal-for-item">You have heard of ROIC, Owner Earnings, and implied growth but want a tool that actually calculates them</div>
                  <div className="prod-modal-for-item">You want to track how a company&apos;s quality changes over multiple years, not just look at one snapshot</div>
                </div>
                <div className="prod-modal-feats">
                  {['Owner Earnings analysis — the real cash the business generates for its owners','Quick Mode: directional results from just 4 inputs for beginners','Multi-year tracking — see if quality is improving or declining','STRONG / NEUTRAL / WEAK verdict in plain English with explanation','Calibrated for Nigerian market — 15% default hurdle rate for NGN','NGN, USD, GBP, EUR, ZAR, KES, GHS, and more supported'].map(f => <div className="prod-modal-feat" key={f}><span className="prod-modal-feat-ck">✓</span>{f}</div>)}
                </div>
                <div className="prod-modal-outcome">After Equity Terminal, no hype, no tip, and no confident-sounding claim can move you without evidence. You will simply run the numbers first.</div>
                <div className="prod-modal-footer">
                  <div className="prod-modal-price">₦15,000 <span>· One-time · Lifetime V2 access</span></div>
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-lg prod-modal-cta">Get Equity Terminal →</a>
                  <div className="prod-modal-guarantee">One-time Naira payment via Selar · Instant access · No subscriptions ever</div>
                </div>
              </div>
            )}
            {productModal === 'tradaq' && (
              <div className="prod-modal-inner">
                <div className="prod-modal-eyebrow">TraDaq · Business Money Tracker · Coming Soon</div>
                <h2 className="prod-modal-hl">Know your real profit. <em>Every single day.</em></h2>
                <p className="prod-modal-sub">Many small business owners in Nigeria are working hard and going nowhere — because they are selling without knowing their actual profit. Revenue is not profit. TraDaq shows you the real number, in plain language, in 30 seconds a day.</p>
                <div className="prod-modal-for">
                  <div className="prod-modal-for-title">This is for you if:</div>
                  <div className="prod-modal-for-item">You run a business — market trader, Instagram seller, small shop — and you cannot clearly answer how much profit you made this month</div>
                  <div className="prod-modal-for-item">You are always busy but never sure if the business is actually growing or just moving money around</div>
                  <div className="prod-modal-for-item">You want the simplicity of just picking up your phone and knowing the truth in under a minute</div>
                </div>
                <div className="prod-modal-feats">
                  {['Track every sale and every cost — 30 seconds per entry','See your actual profit — not revenue, not what is in the account','Categorised expenses: stock, rent, transport, salary, marketing','Plain-English daily insights: "your biggest cost is stock at 48%"','Phone-first — no laptop, no spreadsheet, no accountant needed','Your data stays with you — not shared with anyone'].map(f => <div className="prod-modal-feat" key={f}><span className="prod-modal-feat-ck">✓</span>{f}</div>)}
                </div>
                <div className="prod-modal-outcome">After TraDaq, you will stop celebrating sales and start celebrating profit. Those are two very different numbers.</div>
                <div className="prod-modal-footer">
                  <div className="prod-modal-price">₦9,000 / year <span>· Early access pricing · Coming soon</span></div>
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-f btn-lg prod-modal-cta">Join the TraDaq waitlist →</a>
                  <div className="prod-modal-guarantee">Join now and be the first to access when it launches · No payment required to join</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TERMS MODAL */}
      {termsOpen && (
        <div className="terms-bg" onClick={() => setTermsOpen(false)}>
          <div className="terms-box" onClick={e => e.stopPropagation()}>
            <button className="terms-close" onClick={() => setTermsOpen(false)}>✕</button>
            <h3 className="terms-title">Terms of Use & Privacy</h3>
            <div className="terms-body">
              <p><strong>What this is:</strong> Meridian is a financial education platform. Our tools perform calculations based on data you enter and return mathematical outputs. We are not a licensed financial adviser, a broker, or a securities analyst.</p>
              <p><strong>What this is not:</strong> Nothing produced by any Meridian product constitutes a recommendation to buy, sell, or hold any financial instrument. The terms STRONG, NEUTRAL, and WEAK describe the output of a mathematical scoring model — they are not investment advice.</p>
              <p><strong>Your responsibility:</strong> You are solely responsible for all investment decisions you make. The quality of any output depends entirely on the accuracy of the data you enter. Always verify figures from official sources.</p>
              <p><strong>Data & privacy:</strong> We use Supabase for authentication. Your email address is used solely for account access. Your portfolio data in the Equity Terminal is stored in a private Google Sheet accessible only to your account. We do not sell data to third parties.</p>
              <p><strong>Payments:</strong> All payments are processed by Selar. We do not store payment card information.</p>
              <p style={{fontSize:'13px',color:'var(--muted)',borderTop:'1px solid var(--border)',paddingTop:'12px',marginTop:'4px'}}>By using any Meridian product, you confirm you have read and understood these terms. Last updated: 2025.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
