'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'


export default function LandingPage() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const howRef  = useRef<HTMLElement>(null)

  function scrollToHow() {
    howRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ═══════════════════════════════
          NAVIGATION
      ═══════════════════════════════ */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,height:68,zIndex:500,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'0 5vw',
        background:'rgba(249,246,239,0.94)',
        backdropFilter:'blur(16px)',
        WebkitBackdropFilter:'blur(16px)',
        borderBottom:'1px solid rgba(10,61,34,0.1)',
      }}>
        {/* Logo */}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none',flexShrink:0}}>
          <div style={{
            width:36,height:36,borderRadius:'50%',
            background:'rgba(10,61,34,0.08)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:'var(--font-serif)',fontSize:17,fontWeight:900,color:'var(--gold)',
          }}>M</div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <span style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'var(--forest)',letterSpacing:'-0.01em',lineHeight:1}}>Meridian</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:8,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--muted-light)',marginTop:3}}>Finance in plain Nigerian English</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{display:'flex',alignItems:'center',gap:32}} className="nav-desktop">
          <button onClick={scrollToHow} style={{background:'none',border:'none',cursor:'pointer',fontFamily:'var(--font)',fontSize:14,fontWeight:500,color:'var(--muted)',letterSpacing:'0.01em'}}>How it works</button>
          <a href="#products" style={{fontFamily:'var(--font)',fontSize:14,fontWeight:500,color:'var(--muted)',textDecoration:'none'}}>Products</a>
          <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{fontFamily:'var(--font)',fontSize:14,fontWeight:500,color:'var(--muted)',textDecoration:'none'}}>Buy</a>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Link href="/login" style={{padding:'9px 18px',borderRadius:6,fontFamily:'var(--font)',fontSize:14,fontWeight:600,color:'var(--forest)',border:'1.5px solid rgba(10,61,34,0.2)',textDecoration:'none',transition:'all .2s'}}>Sign in</Link>
          <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{padding:'9px 20px',borderRadius:6,fontFamily:'var(--font)',fontSize:14,fontWeight:600,background:'var(--forest)',color:'var(--cream)',textDecoration:'none'}}>Get started →</a>
        </div>
      </nav>

      <main style={{paddingTop:68}}>

        {/* ═══════════════════════════════
            HERO
        ═══════════════════════════════ */}
        <section style={{
          display:'grid',gridTemplateColumns:'1fr 1fr',minHeight:'calc(100vh - 68px)',
          position:'relative',overflow:'hidden',
        }} className="hero-grid">

          {/* Left */}
          <div style={{padding:'80px 6vw 80px 5vw',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative',zIndex:2}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:24,display:'flex',alignItems:'center',gap:10}}>
              <span style={{display:'block',width:28,height:1,background:'var(--gold)',flexShrink:0}}/>
              Finance in plain Nigerian English
            </div>

            <h1 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(46px,5.5vw,80px)',fontWeight:900,lineHeight:1.04,letterSpacing:'-0.02em',color:'var(--forest)',marginBottom:28}}>
              Stop guessing<br/>with your money.
              <em style={{fontStyle:'italic',color:'var(--gold)',display:'block'}}>Confusion is expensive.</em>
            </h1>

            <p style={{fontSize:'clamp(17px,1.8vw,20px)',lineHeight:1.8,color:'var(--muted)',fontWeight:400,marginBottom:44,maxWidth:480}}>
              Every wrong financial decision costs real money.
              Meridian exists so you understand <strong style={{color:'var(--ink)'}}>exactly what you are doing</strong> before
              you invest, buy, or spend — in language your older sibling would use over suya.
            </p>

            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:48}}>
              <button
                onClick={scrollToHow}
                style={{padding:'16px 36px',borderRadius:6,fontFamily:'var(--font)',fontSize:16,fontWeight:600,background:'var(--forest)',color:'var(--cream)',border:'2px solid var(--forest)',cursor:'pointer'}}
              >
                Get started →
              </button>
              <a
                href="#products"
                style={{padding:'16px 28px',borderRadius:6,fontFamily:'var(--font)',fontSize:16,fontWeight:600,background:'transparent',color:'var(--forest)',border:'2px solid rgba(10,61,34,0.2)',textDecoration:'none'}}
              >
                See our products
              </a>
            </div>

            {/* Trust dots */}
            <div style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{display:'flex'}}>
                {['K','A','T','F'].map((l,i) => (
                  <div key={l} style={{
                    width:34,height:34,borderRadius:'50%',
                    border:'2px solid var(--cream)',
                    background:i===0?'var(--forest-mid)':i===1?'var(--forest-light)':'var(--forest)',
                    color:'var(--gold-pale)',
                    fontFamily:'var(--font-serif)',fontSize:13,fontWeight:700,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    marginLeft:i===0?0:-8,zIndex:4-i,position:'relative',
                  }}>{l}</div>
                ))}
              </div>
              <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.5}}>
                <strong style={{color:'var(--charcoal)'}}>Growing community</strong> of Nigerians<br/>making smarter money decisions
              </div>
            </div>
          </div>

          {/* Right — WOD card */}
          <div style={{padding:'60px 5vw 60px 4vw',display:'flex',flexDirection:'column',justifyContent:'center',gap:16,position:'relative',zIndex:2}}>

            {/* WOD card */}
            <div style={{background:'white',borderRadius:10,padding:'28px 32px',boxShadow:'0 4px 32px rgba(10,61,34,0.09)',border:'1px solid rgba(10,61,34,0.07)',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--forest),var(--gold))'}}/>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:16,display:'flex',alignItems:'center',gap:8}}>
                ◈ MoneySpeak — Word of the Day — Always Free
                <span style={{flex:1,height:1,background:'rgba(200,151,42,0.3)'}}/>
              </div>
              <div style={{fontFamily:'var(--font-serif)',fontSize:36,fontWeight:800,color:'var(--forest)',marginBottom:6,letterSpacing:'-0.01em'}}>Liquidity</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted)',marginBottom:16}}>lik · wid · i · tee  ·  noun</div>
              <div style={{fontSize:15,color:'var(--ink)',lineHeight:1.7,marginBottom:14,fontWeight:500}}>
                How quickly you can turn what you own into cash when you actually need it.
              </div>
              <div style={{height:1,background:'rgba(10,61,34,0.08)',margin:'14px 0'}}/>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--gold)',marginBottom:10}}>The Nigerian story</div>
              <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.75,fontStyle:'italic',marginBottom:14}}>
                A woman has saved ₦800,000 — all of it in a plot of land. One Thursday night, her child wakes with terrible fever. She needs ₦60,000 for the hospital at 2am. She cannot call Oloriebi to buy land at that hour. <strong style={{fontStyle:'normal',color:'var(--ink)'}}>That ₦800,000 is hers, it is even gaining value, but right now it is completely useless to her.</strong>
              </div>
              <div style={{background:'rgba(10,61,34,0.05)',border:'1px solid rgba(200,151,42,0.25)',borderRadius:6,padding:'12px 14px'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--gold)',marginBottom:8}}>The rule you walk away using</div>
                <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.72}}>
                  Before you put money anywhere, ask one question: <strong style={{color:'var(--ink)'}}>"If something happens tonight, can I get this money back in seven days?"</strong> If the answer is no, that investment is illiquid. Keep at least three months of expenses somewhere you can reach overnight. The rest can be invested.
                </div>
              </div>
            </div>

            {/* Mini product tiles */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {icon:'📖',name:'MoneySpeak',desc:'500 terms, Nigerian stories'},
                {icon:'🎓',name:'Stock School',desc:'Zero to confident investor'},
                {icon:'📊',name:'Equity Terminal',desc:'Analyse any stock yourself'},
                {icon:'📒',name:'TraDaq',desc:'Know your real profit'},
              ].map(p => (
                <a key={p.name} href="#products" style={{background:'white',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(10,61,34,0.08)',display:'flex',alignItems:'flex-start',gap:10,textDecoration:'none',transition:'box-shadow .2s,transform .2s'}}>
                  <span style={{fontSize:18,flexShrink:0,marginTop:1}}>{p.icon}</span>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--forest)',marginBottom:2}}>{p.name}</div>
                    <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.5}}>{p.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            HOW IT WORKS — 3 steps
            (this is what "Get started" scrolls to)
        ═══════════════════════════════ */}
        <section ref={howRef} id="how" style={{padding:'96px 5vw',background:'var(--cream-dark)'}}>
          <div style={{maxWidth:680,margin:'0 auto 64px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
              Getting started
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
            </div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(34px,4vw,56px)',fontWeight:800,color:'var(--forest)',letterSpacing:'-0.02em',lineHeight:1.06,marginBottom:16}}>
              Three steps.<br/>
              <em style={{fontStyle:'italic',color:'var(--gold)'}}>That is all it takes.</em>
            </h2>
            <p style={{fontSize:18,color:'var(--muted)',lineHeight:1.75}}>No subscription. No complicated onboarding. Pay once, access forever.</p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24,maxWidth:960,margin:'0 auto 64px'}} className="steps-grid">
            {[
              {num:'01',title:'Pick your starting point',body:'Dictionary if you want to understand the language. Course if you are ready to invest. Terminal if you already invest and want to analyse properly. TraDaq if you run a business.'},
              {num:'02',title:'Pay once on Selar',body:'All prices in Naira. One-time payment. No monthly fees. No hidden charges. Your access key arrives in your email within minutes of payment.'},
              {num:'03',title:'Create an account and activate',body:'Go to meridianng.com, create a free account, paste your key from the email. Your products unlock immediately. One key. Everything included in your plan.'},
            ].map(s => (
              <div key={s.num} style={{background:'white',borderRadius:10,padding:'36px 32px',border:'1px solid rgba(10,61,34,0.09)'}}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',color:'var(--gold)',marginBottom:18}}>{s.num}</div>
                <h3 style={{fontFamily:'var(--font-serif)',fontSize:24,fontWeight:700,color:'var(--forest)',letterSpacing:'-0.01em',marginBottom:14,lineHeight:1.2}}>{s.title}</h3>
                <p style={{fontSize:15,color:'var(--muted)',lineHeight:1.75}}>{s.body}</p>
              </div>
            ))}
          </div>

          {/* Pricing pills + buy CTA */}
          <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
            <div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap',marginBottom:36}}>
              {[
                {icon:'📖',name:'MoneySpeak',price:'₦4,500'},
                {icon:'🎓',name:'Stock School',price:'₦18,000'},
                {icon:'📊',name:'Equity Terminal',price:'₦15,000'},
                {icon:'✦',name:'Meridian Access (All)',price:'₦35,000 — saves ₦11,500',featured:true},
              ].map(p => (
                <div key={p.name} style={{
                  display:'flex',alignItems:'center',gap:10,
                  background:p.featured?'rgba(200,151,42,0.15)':'rgba(10,61,34,0.05)',
                  border:`1px solid ${p.featured?'rgba(200,151,42,0.35)':'rgba(10,61,34,0.1)'}`,
                  borderRadius:100,padding:'10px 20px',
                }}>
                  <span>{p.icon}</span>
                  <span style={{fontSize:14,color:'var(--forest)',fontWeight:500}}>{p.name}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--gold)'}}>{p.price}</span>
                </div>
              ))}
            </div>
            <a
              href="https://selar.com/m/meridian_ng"
              target="_blank" rel="noopener noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:8,padding:'18px 52px',borderRadius:6,fontFamily:'var(--font)',fontSize:18,fontWeight:600,background:'var(--gold)',color:'white',textDecoration:'none'}}
            >
              Start understanding money →
            </a>
            <div style={{marginTop:16,fontFamily:'var(--font-mono)',fontSize:12,color:'var(--muted-light)',letterSpacing:'0.08em'}}>
              One-time Naira payments via Selar · Instant access · No subscriptions
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            PAIN SECTION
        ═══════════════════════════════ */}
        <section style={{background:'var(--forest)',padding:'100px 5vw',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-30,right:'4vw',fontFamily:'var(--font-serif)',fontSize:240,color:'rgba(255,255,255,0.04)',pointerEvents:'none',lineHeight:1,userSelect:'none'}}>❝</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:80,alignItems:'start',maxWidth:1100,margin:'0 auto'}} className="pain-grid">
            <div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(228,185,74,0.65)',marginBottom:24,display:'flex',alignItems:'center',gap:10}}>
                <span style={{display:'block',width:28,height:1,background:'rgba(228,185,74,0.45)',flexShrink:0}}/>
                The honest truth
              </div>
              <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(38px,5vw,68px)',fontWeight:800,color:'var(--cream)',lineHeight:1.07,letterSpacing:'-0.02em',marginBottom:28}}>
                The financial system was never designed to
                <em style={{fontStyle:'italic',color:'var(--gold-light)'}}> explain itself to you.</em>
              </h2>
              <p style={{fontSize:18,color:'rgba(249,246,239,0.62)',lineHeight:1.8,marginBottom:14,fontWeight:300}}>
                Banks, advisors, and textbooks all speak a language designed to make you <strong style={{color:'var(--cream)'}}>dependent on them.</strong> The more confused you are, the more money they make from your confusion.
              </p>
              <p style={{fontSize:18,color:'rgba(249,246,239,0.62)',lineHeight:1.8,fontWeight:300}}>
                This is not about your intelligence. It is about access. Meridian gives you the access.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {[
                {tag:'The family gathering',text:'Your uncle talks about "diversifying his portfolio" and everyone nods respectfully. You are nodding too — but inside you are wondering if portfolio is something you eat with egusi.'},
                {tag:'Your business',text:'You made ₦400,000 in sales this month. After everything, you do not know if you actually made profit — or just moved money from one pocket to another.'},
                {tag:'The WhatsApp group',text:'Someone drops a hot investment tip. 40 fire emojis. You want to ask what it means, but you do not want to look like you do not know.'},
                {tag:'The stock market',text:'You have heard "buy Dangote shares" three times this year. You have the money. But you do not know how to check if it is actually worth buying at today\'s price.'},
              ].map(s => (
                <div key={s.tag} style={{background:'rgba(249,246,239,0.05)',border:'1px solid rgba(249,246,239,0.1)',borderLeft:'3px solid rgba(240,216,150,0.6)',borderRadius:'0 6px 6px 0',padding:'20px 22px'}}>
                  <div style={{fontFamily:'var(--font-mono)',fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(240,216,150,0.6)',marginBottom:10}}>{s.tag}</div>
                  <div style={{fontSize:15,color:'rgba(249,246,239,0.78)',lineHeight:1.72}}>{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            BEFORE / AFTER
        ═══════════════════════════════ */}
        <section style={{padding:'96px 5vw',background:'var(--cream-3)'}}>
          <div style={{maxWidth:680,margin:'0 auto 56px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
              What changes
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
            </div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(34px,4vw,54px)',fontWeight:800,color:'var(--forest)',letterSpacing:'-0.02em',lineHeight:1.06,marginBottom:16}}>Before Meridian.<br/><em style={{fontStyle:'italic',color:'var(--gold)'}}>After Meridian.</em></h2>
            <p style={{fontSize:18,color:'var(--muted)',lineHeight:1.75}}>Not about becoming an expert. About never being fooled again.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:24,alignItems:'stretch',maxWidth:960,margin:'0 auto'}} className="ba-grid">
            <div>
              <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',padding:'5px 14px',background:'rgba(180,60,60,0.1)',color:'#8B2020',borderRadius:100,display:'inline-block',marginBottom:18}}>Before Meridian</span>
              {[
                '"I hear people talk about stocks but I just avoid it. Too complicated for me."',
                '"I made good sales this month but my account is empty. I do not understand."',
                '"Someone is promising 30% monthly returns. It sounds off but everyone is doing it."',
                '"I want to grow my money but I do not know where to start without getting scammed."',
              ].map(t => (
                <div key={t} style={{padding:'16px 20px',borderRadius:6,background:'rgba(180,60,60,0.06)',border:'1px solid rgba(180,60,60,0.12)',fontSize:14,color:'#6B2020',lineHeight:1.65,marginBottom:12}}>{t}</div>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 0 0'}} className="ba-arrow-col">
              <div style={{width:44,height:44,background:'var(--forest)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--gold-pale)',fontSize:18,flexShrink:0}}>→</div>
            </div>
            <div>
              <span style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',padding:'5px 14px',background:'rgba(10,61,34,0.1)',color:'var(--forest)',borderRadius:100,display:'inline-block',marginBottom:18}}>After Meridian</span>
              {[
                '"I now understand what to look for in a company before I invest."',
                '"TraDaq showed me my real profit was ₦45k, not the ₦400k I was celebrating. I fixed my pricing."',
                '"I can explain exactly why 30% monthly is impossible for a legitimate business. I did not invest."',
                '"I started with MoneySpeak. Now I am building a real portfolio on the NGX."',
              ].map(t => (
                <div key={t} style={{padding:'16px 20px',borderRadius:6,background:'rgba(10,61,34,0.07)',border:'1px solid rgba(10,61,34,0.12)',fontSize:14,color:'var(--forest-mid)',fontWeight:500,lineHeight:1.65,marginBottom:12}}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            PRODUCTS
        ═══════════════════════════════ */}
        <section id="products" style={{padding:'96px 5vw',background:'var(--cream)'}}>
          <div style={{maxWidth:700,margin:'0 auto 56px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--gold)',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
              Four tools. One purpose.
              <span style={{display:'block',width:24,height:1,background:'var(--gold)'}}/>
            </div>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(34px,4vw,56px)',fontWeight:800,color:'var(--forest)',letterSpacing:'-0.02em',lineHeight:1.06,marginBottom:14}}>
              Chase Sapa for good.
            </h2>
            <p style={{fontSize:18,color:'var(--muted)',lineHeight:1.75,maxWidth:580,margin:'0 auto'}}>
              Every product Meridian builds closes the gap between what finance is and what it has been made to feel like — for people who were never given the right language.
            </p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,maxWidth:1100,margin:'0 auto 40px'}} className="products-4">
            {[
              {icon:'📖',name:'MoneySpeak',pitch:'500 financial terms in plain Nigerian English. The front door to financial clarity.',price:'₦4,500 · One-time'},
              {icon:'🎓',name:'Stock School',pitch:'From "what is a share?" to building a real portfolio. 11 phases. NGX examples throughout.',price:'₦18,000 · One-time'},
              {icon:'📊',name:'Equity Terminal',pitch:"Don't follow hype. Analyse any company using the same framework serious investors use.",price:'₦15,000 · One-time'},
              {icon:'📒',name:'TraDaq',pitch:'You made sales. But did you make profit? Track your real numbers in 30 seconds a day.',price:'₦9,000/yr · Coming soon'},
            ].map(p => (
              <div key={p.name} style={{background:'white',borderRadius:10,padding:'28px 24px',border:'1px solid rgba(10,61,34,0.09)',display:'flex',flexDirection:'column'}}>
                <div style={{fontSize:24,marginBottom:14}}>{p.icon}</div>
                <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,color:'var(--forest)',marginBottom:8,letterSpacing:'-0.01em'}}>{p.name}</div>
                <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65,flex:1,marginBottom:18}}>{p.pitch}</div>
                <div style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--gold)',letterSpacing:'0.06em'}}>{p.price}</div>
              </div>
            ))}
          </div>

          {/* Bundle banner */}
          <div style={{background:'var(--forest)',borderRadius:10,padding:'48px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,maxWidth:1100,margin:'0 auto',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',right:-60,top:'50%',transform:'translateY(-50%)',fontFamily:'var(--font-serif)',fontSize:300,fontWeight:900,color:'rgba(255,255,255,0.025)',pointerEvents:'none',lineHeight:1,userSelect:'none'}}>M</div>
            <div style={{position:'relative',zIndex:1}}>
              <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(228,185,74,0.65)',marginBottom:16}}>The Meridian Access bundle</div>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(28px,3.5vw,44px)',fontWeight:800,color:'var(--cream)',lineHeight:1.1,letterSpacing:'-0.015em',marginBottom:12}}>
                Get everything.<br/><em style={{fontStyle:'italic',color:'var(--gold-light)'}}>Save ₦11,500.</em>
              </h3>
              <p style={{fontSize:16,color:'rgba(249,246,239,0.6)',lineHeight:1.7,maxWidth:520,fontWeight:300}}>
                All four Meridian products under one access — ₦35,000. Every tool we build now and in the future, included. One payment. One key. Everything unlocked.
              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12,flexShrink:0,position:'relative',zIndex:1}}>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{padding:'18px 44px',borderRadius:6,fontFamily:'var(--font)',fontSize:17,fontWeight:600,background:'var(--gold)',color:'white',textDecoration:'none'}}>
                Get Meridian Access — ₦35,000
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            TRUST — Founder note + scam alert
        ═══════════════════════════════ */}
        <section style={{padding:'96px 5vw',background:'var(--cream-dark)'}}>
          <div style={{maxWidth:700,margin:'0 auto 56px',textAlign:'center'}}>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(32px,4vw,52px)',fontWeight:800,color:'var(--forest)',letterSpacing:'-0.02em',lineHeight:1.06,marginBottom:0}}>
              Trust is earned with honesty,<br/><em style={{fontStyle:'italic',color:'var(--gold)'}}>not fancy words.</em>
            </h2>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'start',maxWidth:1100,margin:'0 auto'}} className="trust-grid">
            {/* Founder note */}
            <div style={{background:'white',borderRadius:10,padding:'40px',border:'1px solid rgba(10,61,34,0.09)',position:'relative'}}>
              <div style={{fontFamily:'var(--font-serif)',fontSize:80,color:'rgba(10,61,34,0.06)',position:'absolute',top:12,left:22,lineHeight:1,pointerEvents:'none'}}>❝</div>
              <p style={{fontFamily:'var(--font-serif)',fontSize:20,fontStyle:'italic',color:'var(--ink)',lineHeight:1.8,marginBottom:24,position:'relative',zIndex:1}}>
                "Finance in Nigeria is not actually complicated. It just gets explained by people who benefit from your confusion — or by textbooks written for completely different realities. We built Meridian because <strong style={{fontStyle:'normal'}}>when you understand what is happening to your money, nobody can mislead you.</strong>"
              </p>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:44,height:44,borderRadius:'50%',background:'var(--forest)',color:'var(--gold-pale)',fontFamily:'var(--font-serif)',fontSize:18,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>M</div>
                <div>
                  <div style={{fontWeight:600,color:'var(--charcoal)',fontSize:15}}>Meridian Team</div>
                  <div style={{fontSize:13,color:'var(--muted)'}}>hello@meridianng.com</div>
                </div>
              </div>
            </div>

            {/* Trust points */}
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {[
                {icon:'🔒',title:'We never tell you what to buy',desc:'Every Meridian tool puts the decision in your hands. We give understanding, frameworks, and analysis. The choice is always yours.'},
                {icon:'🇳🇬',title:'Built for Nigerian realities',desc:'NGX stocks. Naira pricing. CBN decisions. Inflation, devaluation, and the real conditions that affect your money — not Wall Street theory.'},
                {icon:'✉',title:'We actually respond',desc:'Access issue? Question? Email hello@meridianng.com. We respond within a few hours, every time.'},
                {icon:'💳',title:'One-time Naira payments, no tricks',desc:'Pay once through Selar. Keep access forever. No monthly subscriptions. No hidden fees.'},
              ].map(t => (
                <div key={t.title} style={{display:'flex',gap:18,alignItems:'flex-start'}}>
                  <div style={{width:44,height:44,borderRadius:8,background:'rgba(10,61,34,0.07)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{t.icon}</div>
                  <div>
                    <div style={{fontSize:16,fontWeight:600,color:'var(--forest)',marginBottom:4}}>{t.title}</div>
                    <div style={{fontSize:14,color:'var(--muted)',lineHeight:1.65}}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scam alert */}
          <div style={{background:'rgba(180,60,60,0.05)',border:'1px solid rgba(180,60,60,0.14)',borderRadius:8,padding:'28px 32px',maxWidth:1100,margin:'48px auto 0'}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'#8B2020',marginBottom:16}}>⚠ Red flags you should now recognise</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}} className="scam-grid">
              {[
                '"Guaranteed 30% monthly return" — no legitimate investment offers guaranteed returns. Always a scam.',
                '"Just send your money and we invest for you" — if you cannot verify what they do, do not send it.',
                '"Join our signal group for ₦5,000" — trading signals are not education. Someone profits from your confusion.',
                '"Limited time — invest today or miss out" — real investments do not expire. Urgency is manipulation.',
                '"Crypto will 10x in 2 months" — anyone promising specific returns on a specific date is lying.',
                '"My uncle at CBN says…" — insider claims are almost always false, and acting on real ones is illegal.',
              ].map(s => (
                <div key={s} style={{padding:'12px 14px',background:'rgba(180,60,60,0.07)',borderRadius:4,fontSize:14,color:'#7A2020',lineHeight:1.55,display:'flex',alignItems:'flex-start',gap:8}}>
                  <span style={{fontWeight:700,flexShrink:0}}>✕</span>{s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════
            FINAL CTA
        ═══════════════════════════════ */}
        <section style={{background:'var(--forest)',padding:'120px 5vw',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontFamily:'var(--font-serif)',fontSize:600,fontWeight:900,color:'rgba(255,255,255,0.022)',userSelect:'none',pointerEvents:'none',lineHeight:1}}>M</div>
          <div style={{position:'relative',zIndex:1}}>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(40px,6vw,80px)',fontWeight:900,color:'var(--cream)',lineHeight:1.05,letterSpacing:'-0.02em',maxWidth:900,margin:'0 auto 24px'}}>
              Knowledge is expensive.<br/><em style={{fontStyle:'italic',color:'var(--gold-light)'}}>Confusion costs more.</em>
            </h2>
            <p style={{fontSize:20,color:'rgba(249,246,239,0.58)',maxWidth:540,margin:'0 auto 52px',lineHeight:1.75,fontWeight:300}}>
              Every year you spend confused about money is a year someone else profits from that confusion. Start today.
            </p>

            {/* Pricing pills */}
            <div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap',marginBottom:48}}>
              {[
                {icon:'📖',name:'MoneySpeak',price:'₦4,500'},
                {icon:'🎓',name:'Stock School',price:'₦18,000'},
                {icon:'📊',name:'Equity Terminal',price:'₦15,000'},
                {icon:'✦',name:'Meridian Access (All)',price:'₦35,000',featured:true},
              ].map(p => (
                <div key={p.name} style={{display:'flex',alignItems:'center',gap:10,background:p.featured?'rgba(200,151,42,0.2)':'rgba(249,246,239,0.08)',border:`1px solid ${p.featured?'rgba(200,151,42,0.35)':'rgba(249,246,239,0.14)'}`,borderRadius:100,padding:'10px 20px'}}>
                  <span>{p.icon}</span>
                  <span style={{fontSize:14,color:'var(--cream)',fontWeight:500}}>{p.name}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--gold-light)'}}>{p.price}</span>
                </div>
              ))}
            </div>

            <div style={{display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap',marginBottom:24}}>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{padding:'20px 56px',borderRadius:6,fontFamily:'var(--font)',fontSize:18,fontWeight:600,background:'var(--gold)',color:'white',textDecoration:'none'}}>
                Start understanding money →
              </a>
              <Link href="/login" style={{padding:'20px 32px',borderRadius:6,fontFamily:'var(--font)',fontSize:18,fontWeight:600,background:'rgba(249,246,239,0.1)',color:'var(--cream)',textDecoration:'none',border:'2px solid rgba(249,246,239,0.25)'}}>
                Sign in to dashboard
              </Link>
            </div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'rgba(249,246,239,0.28)',letterSpacing:'0.08em'}}>
              One-time Naira payments via Selar · Instant access · No subscriptions
            </div>
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════
          FOOTER
      ═══════════════════════════════ */}
      <footer style={{background:'var(--charcoal)',padding:'64px 5vw 40px',color:'rgba(249,246,239,0.55)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'1.8fr 1fr 1fr 1fr',gap:40,paddingBottom:48,borderBottom:'1px solid rgba(249,246,239,0.08)',marginBottom:32}} className="footer-grid">
            <div>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(249,246,239,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-serif)',fontSize:15,fontWeight:900,color:'var(--gold-light)'}}>M</div>
                <span style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'var(--cream)',letterSpacing:'-0.01em'}}>Meridian</span>
              </div>
              <p style={{fontSize:14,lineHeight:1.75,maxWidth:260}}>Finance in plain Nigerian English — for investors, business owners, and anyone who has ever felt left out of the conversation.</p>
            </div>
            {[
              {title:'Products',links:[['MoneySpeak','#products'],['Stock School','#products'],['Equity Terminal','#products'],['TraDaq','#products'],['Meridian Access','#products']]},
              {title:'Company',links:[['About Meridian','#'],['Contact','mailto:hello@meridianng.com'],['Buy on Selar','https://selar.com/m/meridian_ng'],['Dashboard login','/login']]},
              {title:'Follow us',links:[['Instagram','https://instagram.com/meridianng_'],['LinkedIn','https://linkedin.com/company/meridianng'],['YouTube','https://youtube.com/@MeridianNG'],['Email us','mailto:hello@meridianng.com']]},
            ].map(col => (
              <div key={col.title}>
                <div style={{fontFamily:'var(--font-mono)',fontSize:10,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold-light)',marginBottom:20}}>{col.title}</div>
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {col.links.map(([label,href]) => (
                    <a key={label} href={href} style={{fontSize:14,color:'rgba(249,246,239,0.5)',textDecoration:'none'}}>{label}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
            <div style={{fontSize:13}}>
              © 2025 Meridian ·{' '}
              <button onClick={() => setTermsOpen(true)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(249,246,239,0.45)',fontSize:13,padding:0,fontFamily:'var(--font)'}}>Terms of Use</button>
              {' '}·{' '}
              <button onClick={() => setTermsOpen(true)} style={{background:'none',border:'none',cursor:'pointer',color:'rgba(249,246,239,0.45)',fontSize:13,padding:0,fontFamily:'var(--font)'}}>Privacy Policy</button>
            </div>
            <div style={{fontSize:12,maxWidth:520,textAlign:'right',opacity:.35,lineHeight:1.65}}>
              Meridian is not a licensed financial advisor. All tools perform analytical calculations based on data you provide. Nothing constitutes financial advice.
            </div>
          </div>
        </div>
      </footer>

      {/* Terms Modal */}
      {termsOpen && (
        <div
          onClick={() => setTermsOpen(false)}
          style={{position:'fixed',inset:0,background:'rgba(10,61,34,0.55)',backdropFilter:'blur(8px)',zIndex:9000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
        >
          <div onClick={e => e.stopPropagation()} style={{background:'var(--cream)',borderRadius:10,padding:'52px 48px',maxWidth:680,width:'100%',maxHeight:'88vh',overflowY:'auto',position:'relative'}}>
            <button onClick={() => setTermsOpen(false)} style={{position:'absolute',top:18,right:18,width:34,height:34,borderRadius:'50%',background:'rgba(10,61,34,0.08)',border:'none',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--forest)',fontFamily:'var(--font)'}}>✕</button>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:32,fontWeight:800,color:'var(--forest)',marginBottom:28,letterSpacing:'-0.015em'}}>Terms of Use & Privacy</h2>
            {[
              {title:'What Meridian is',body:'Meridian is a financial education and analysis platform. Our products help you understand financial concepts, learn about investing, analyse company financials, and track your business finances. We are not a bank, broker, investment advisor, or licensed financial institution.'},
              {title:'Not financial advice',body:"Nothing on Meridian constitutes financial advice. The tools describe mathematical outputs based on data you entered — not a recommendation to buy, sell, or hold any security. You are solely responsible for all decisions you make."},
              {title:'Your data and privacy',body:'Your financial data entered in Meridian tools is stored in a private account accessible only to you. We do not sell your personal data to third parties. You can request deletion of your account at any time by emailing hello@meridianng.com.'},
              {title:'Payments and refunds',body:'All purchases are processed through Selar in Nigerian Naira. Due to the digital nature of our products which provide immediate access upon purchase, we generally do not offer refunds. If you experience a technical issue preventing access, email us and we will resolve it promptly.'},
              {title:'Contact',body:'For any questions, email hello@meridianng.com. We respond within 24 hours.'},
            ].map((s,i,arr) => (
              <div key={s.title} style={{marginBottom:i<arr.length-1?28:0,paddingBottom:i<arr.length-1?28:0,borderBottom:i<arr.length-1?'1px solid rgba(10,61,34,0.1)':'none'}}>
                <h3 style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:700,color:'var(--forest)',marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:16,color:'var(--muted)',lineHeight:1.8}}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) { .products-4 { grid-template-columns: repeat(2,1fr) !important; } .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .pain-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ba-grid { grid-template-columns: 1fr !important; }
          .ba-arrow-col { display: none !important; }
          .trust-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .scam-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .products-4 { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
