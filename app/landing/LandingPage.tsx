'use client'

import { useState, useEffect } from 'react'
import { MeridianLogo } from '@/components/MeridianLogo'

export default function LandingPage({ isSignedIn }: { isSignedIn?: boolean }) {
  const [page, setPage] = useState<'home'|'about'|'products'|'contact'>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [toastShow, setToastShow] = useState(false)

  function showPage(name: string) {
    setPage(name as any)
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }

  function showToast(msg: string) {
    setToast(msg)
    setToastShow(true)
    setTimeout(() => setToastShow(false), 3500)
  }

  function scrollToHow(e: React.MouseEvent) {
    e.preventDefault()
    const el = document.getElementById('how-steps-section')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target) } })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal:not(.in)').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [page])

  const Logo = () => <MeridianLogo variant="full" theme="light" width={180} />

    const FooterLogo = () => <MeridianLogo variant="full" theme="dark" width={160} />


  return (
    <>
      {/* Inline all CSS from the v2 HTML */}
      <style>{`
        :root {
          --forest:#0A3B1F; --forest-mid:#145C31; --forest-light:#1E8048;
          --cream:#F8F4EC; --cream-2:#EDE8DE; --cream-3:#E4DDCF;
          --gold:#B8922A; --gold-light:#D4A83C; --gold-pale:#F0D896;
          --charcoal:#181818; --ink:#2D2D2D; --muted:#6E6860;
          --border:rgba(10,59,31,0.12); --border-gold:rgba(184,146,42,0.3);
          --serif:'Cormorant',Georgia,serif; --sans:'Instrument Sans',system-ui,sans-serif; --mono:'DM Mono',monospace;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:var(--sans);background:var(--cream);color:var(--charcoal);line-height:1.65;overflow-x:hidden;font-size:17px}
        body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:9998;mix-blend-mode:multiply}
        a{color:inherit;text-decoration:none}
        button{cursor:pointer;border:none;background:none;font-family:var(--sans)}
        .page{display:none} .page.active{display:block}
        nav{position:fixed;top:0;left:0;right:0;height:68px;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;background:rgba(248,244,236,0.94);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border);transition:background 0.3s}
        .logo{display:flex;align-items:center;gap:11px;cursor:pointer;flex-shrink:0}
        .logo-svg{width:36px;height:36px}
        .logo-wordmark{font-family:var(--mono);font-size:14px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:var(--forest);line-height:1}
        .logo-wordmark small{display:block;font-size:8px;letter-spacing:0.28em;color:var(--gold);margin-top:3px;font-weight:400}
        .nav-links{display:flex;align-items:center;gap:32px;list-style:none}
        .nav-links a{font-size:14px;font-weight:500;color:var(--muted);letter-spacing:0.02em;cursor:pointer;transition:color 0.2s;position:relative}
        .nav-links a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--forest);transform:scaleX(0);transform-origin:left;transition:transform 0.25s}
        .nav-links a:hover,.nav-links a.active{color:var(--forest)}
        .nav-links a:hover::after,.nav-links a.active::after{transform:scaleX(1)}
        .nav-actions{display:flex;align-items:center;gap:10px}
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--sans);font-weight:600;letter-spacing:0.01em;cursor:pointer;transition:all 0.22s;border-radius:2px;white-space:nowrap}
        .btn-sm{padding:9px 18px;font-size:13px} .btn-md{padding:13px 28px;font-size:15px} .btn-lg{padding:18px 44px;font-size:17px} .btn-xl{padding:22px 56px;font-size:18px}
        .btn-forest{background:var(--forest);color:var(--cream);border:2px solid var(--forest)}
        .btn-forest:hover{background:var(--forest-mid);border-color:var(--forest-mid);transform:translateY(-2px);box-shadow:0 12px 32px rgba(10,59,31,0.22)}
        .btn-outline{background:transparent;color:var(--forest);border:2px solid var(--forest)}
        .btn-outline:hover{background:var(--forest);color:var(--cream)}
        .btn-gold{background:var(--gold);color:white;border:2px solid var(--gold)}
        .btn-gold:hover{background:var(--gold-light);border-color:var(--gold-light);transform:translateY(-2px);box-shadow:0 12px 32px rgba(184,146,42,0.3)}
        .btn-cream{background:var(--cream);color:var(--forest);border:2px solid rgba(10,59,31,0.25)}
        .btn-cream:hover{background:white;border-color:var(--forest)}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px}
        .hamburger span{width:22px;height:1.5px;background:var(--forest);display:block;transition:all 0.3s}
        .mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:var(--cream);border-bottom:1px solid var(--border);padding:24px 5vw 32px;z-index:490;flex-direction:column;gap:4px}
        .mobile-menu.open{display:flex}
        .mobile-menu a{padding:14px 0;font-size:18px;font-weight:500;color:var(--ink);cursor:pointer;border-bottom:1px solid var(--border)}
        .mobile-menu a:last-child{border-bottom:none}
        .pt-nav{padding-top:68px}
        .wrap{max-width:1160px;margin:0 auto;padding:0 5vw}
        .wrap-sm{max-width:720px;margin:0 auto;padding:0 5vw}
        .wrap-md{max-width:960px;margin:0 auto;padding:0 5vw}
        .sec{padding:96px 5vw} .sec-sm{padding:64px 5vw}
        .sec-forest{background:var(--forest)} .sec-cream2{background:var(--cream-2)} .sec-cream3{background:var(--cream-3)}
        .eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold)}
        .eyebrow::before{content:'';display:block;width:28px;height:1px;background:var(--gold);flex-shrink:0}
        .eyebrow-center{justify-content:center}
        .eyebrow-light{color:rgba(240,216,150,0.7)}
        .eyebrow-light::before{background:rgba(240,216,150,0.5)}
        .display{font-family:var(--serif);font-weight:700;line-height:1.05;letter-spacing:-0.01em;color:var(--forest)}
        .display-xl{font-size:clamp(52px,7vw,96px)} .display-lg{font-size:clamp(42px,5.5vw,76px)}
        .display-md{font-size:clamp(34px,4vw,58px)} .display-sm{font-size:clamp(26px,3vw,42px)}
        .display em{font-style:italic;color:var(--gold)}
        .on-forest{color:var(--cream)!important} .on-forest em{color:var(--gold-pale)!important}
        .lead{font-size:clamp(18px,2vw,22px);font-weight:400;line-height:1.75;color:var(--muted)}
        .lead strong{color:var(--ink);font-weight:600}
        .lead-light{color:rgba(248,244,236,0.68)} .lead-light strong{color:var(--cream)}
        .body-text{font-size:17px;line-height:1.8;color:var(--muted)}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity 0.65s ease,transform 0.65s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
        .reveal-d1{transition-delay:0.1s} .reveal-d2{transition-delay:0.2s} .reveal-d3{transition-delay:0.3s} .reveal-d4{transition-delay:0.4s}
        .hero{min-height:calc(100vh - 68px);display:grid;grid-template-columns:1fr 1fr;gap:0;position:relative;overflow:hidden}
        .hero-left{padding:80px 6vw 80px 5vw;display:flex;flex-direction:column;justify-content:center;position:relative;z-index:2}
        .hero-left::before{content:'';position:absolute;top:0;bottom:0;right:-1px;width:1px;background:linear-gradient(to bottom,transparent,var(--border),var(--border),transparent)}
        .hero-headline{font-family:var(--serif);font-size:clamp(46px,5.5vw,82px);font-weight:700;line-height:1.04;letter-spacing:-0.015em;color:var(--forest);margin-bottom:28px}
        .hero-headline em{font-style:italic;color:var(--gold);display:block}
        .hero-sub{font-size:clamp(18px,1.8vw,21px);line-height:1.75;color:var(--muted);font-weight:400;margin-bottom:44px;max-width:480px}
        .hero-sub strong{color:var(--ink);font-weight:600}
        .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}
        .hero-trust{display:flex;align-items:center;gap:14px}
        .trust-dots{display:flex}
        .trust-dots span{width:34px;height:34px;border-radius:50%;border:2px solid var(--cream);background:var(--forest);color:var(--gold-pale);font-family:var(--serif);font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-left:-8px}
        .trust-dots span:first-child{margin-left:0;background:var(--forest-mid)}
        .trust-dots span:nth-child(2){background:var(--forest-light)}
        .trust-text{font-size:13px;color:var(--muted);line-height:1.45}
        .trust-text strong{color:var(--charcoal);font-weight:600}
        .hero-right{padding:60px 5vw 60px 6vw;display:flex;flex-direction:column;justify-content:center;gap:16px;background:linear-gradient(135deg,rgba(10,59,31,0.03) 0%,transparent 60%);position:relative;z-index:2}
        .wod-card{background:white;border-radius:8px;padding:28px 32px;box-shadow:0 4px 32px rgba(10,59,31,0.09),0 1px 4px rgba(10,59,31,0.06);border:1px solid rgba(10,59,31,0.07);position:relative;overflow:hidden}
        .wod-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--forest),var(--gold))}
        .wod-label{font-family:var(--mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .wod-label::after{content:'';flex:1;height:1px;background:var(--border-gold)}
        .wod-term{font-family:var(--serif);font-size:36px;font-weight:700;color:var(--forest);margin-bottom:6px;letter-spacing:-0.01em}
        .wod-phonetic{font-family:var(--mono);font-size:12px;color:var(--muted);margin-bottom:16px}
        .wod-definition{font-size:15px;color:var(--ink);line-height:1.7;margin-bottom:16px;font-weight:500}
        .wod-divider{height:1px;background:var(--border);margin:16px 0}
        .wod-story-label{font-family:var(--mono);font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
        .wod-story{font-size:15px;color:var(--muted);line-height:1.75;font-style:italic}
        .wod-story strong{font-style:normal;color:var(--ink);font-weight:600}
        .wod-reality{margin-top:14px;padding:14px 16px;background:rgba(10,59,31,0.05);border-radius:4px;font-size:13px;color:var(--forest-mid);line-height:1.65}
        .hero-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .mini-tile{background:white;border-radius:6px;padding:16px 18px;border:1px solid var(--border);display:flex;align-items:flex-start;gap:12px;transition:box-shadow 0.2s,transform 0.2s;cursor:pointer}
        .mini-tile:hover{box-shadow:0 6px 20px rgba(10,59,31,0.1);transform:translateY(-2px)}
        .mini-tile-icon{font-size:20px;flex-shrink:0;margin-top:1px}
        .mini-tile-name{font-size:13px;font-weight:600;color:var(--forest);margin-bottom:3px}
        .mini-tile-desc{font-size:12px;color:var(--muted);line-height:1.5}
        .pain-sec{background:var(--forest);padding:100px 5vw;position:relative;overflow:hidden}
        .pain-sec::before{content:'❝';position:absolute;top:-30px;right:4vw;font-size:240px;color:rgba(255,255,255,0.04);font-family:var(--serif);pointer-events:none;line-height:1}
        .pain-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:80px;align-items:start;max-width:1160px;margin:0 auto}
        .pain-heading{font-family:var(--serif);font-size:clamp(38px,5vw,70px);font-weight:700;color:var(--cream);line-height:1.08;letter-spacing:-0.015em;margin-bottom:28px}
        .pain-heading em{font-style:italic;color:var(--gold-pale)}
        .pain-body{font-size:18px;color:rgba(248,244,236,0.68);line-height:1.8;margin-bottom:14px}
        .pain-body strong{color:var(--cream)}
        .pain-scenes{display:flex;flex-direction:column;gap:16px}
        .scene{background:rgba(248,244,236,0.05);border:1px solid rgba(248,244,236,0.1);border-left:3px solid var(--gold-pale);border-radius:0 6px 6px 0;padding:22px 24px}
        .scene-tag{font-family:var(--mono);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold-pale);opacity:0.7;margin-bottom:10px}
        .scene-text{font-size:16px;color:rgba(248,244,236,0.82);line-height:1.7}
        .scene-text strong{color:var(--cream);font-weight:600}
        .ba-sec{padding:96px 5vw;background:var(--cream-2);position:relative}
        .ba-header{text-align:center;max-width:680px;margin:0 auto 64px}
        .ba-grid{display:grid;grid-template-columns:1fr auto 1fr;gap:28px;align-items:stretch;max-width:1000px;margin:0 auto}
        .ba-col{display:flex;flex-direction:column;gap:16px}
        .ba-col-label{font-family:var(--mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:6px 14px;border-radius:100px;display:inline-block;width:fit-content;margin-bottom:8px}
        .ba-col.before .ba-col-label{background:rgba(180,60,60,0.1);color:#8B2020}
        .ba-col.after .ba-col-label{background:rgba(10,59,31,0.1);color:var(--forest)}
        .ba-item{padding:18px 20px;border-radius:6px;font-size:15px;line-height:1.6}
        .ba-col.before .ba-item{background:rgba(180,60,60,0.06);border:1px solid rgba(180,60,60,0.12);color:#6B2020}
        .ba-col.after .ba-item{background:rgba(10,59,31,0.07);border:1px solid rgba(10,59,31,0.12);color:var(--forest-mid);font-weight:500}
        .ba-divider{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding-top:52px}
        .ba-arrow{width:44px;height:44px;background:var(--forest);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-pale);font-size:18px;flex-shrink:0}
        .ba-arrow-line{width:1px;flex:1;background:linear-gradient(to bottom,var(--border),transparent)}
        .dict-lead{padding:96px 5vw;background:var(--cream)}
        .dict-lead-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1160px;margin:0 auto}
        .dict-terms-stack{display:flex;flex-direction:column;gap:14px}
        .dict-term-card{background:white;border-radius:8px;padding:22px 26px;border:1px solid var(--border);position:relative;overflow:hidden;transition:transform 0.25s,box-shadow 0.25s}
        .dict-term-card:hover{transform:translateX(6px);box-shadow:0 8px 28px rgba(10,59,31,0.09)}
        .dict-term-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--gold)}
        .dict-term-word{font-family:var(--serif);font-size:22px;font-weight:700;color:var(--forest);margin-bottom:6px}
        .dict-term-plain{font-size:14px;color:var(--muted);line-height:1.65}
        .dict-term-plain strong{color:var(--ink);font-weight:600}
        .dict-see-more{text-align:center;margin-top:8px;font-size:14px;color:var(--gold);font-weight:600;cursor:pointer;transition:color 0.2s}
        .dict-see-more:hover{color:var(--gold-light)}
        .products-overview{padding:64px 5vw 96px;background:var(--cream-3)}
        .products-header{text-align:center;max-width:700px;margin:0 auto 56px}
        .products-4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1160px;margin:0 auto 40px}
        .product-tile{background:white;border-radius:8px;padding:32px 26px;border:1px solid var(--border);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform 0.25s,box-shadow 0.25s;cursor:pointer}
        .product-tile:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(10,59,31,0.12)}
        .product-tile::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--forest),var(--gold));transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
        .product-tile:hover::before{transform:scaleX(1)}
        .tile-icon{font-size:26px;margin-bottom:16px}
        .tile-name{font-family:var(--serif);font-size:22px;font-weight:700;color:var(--forest);margin-bottom:8px;line-height:1.15}
        .tile-pitch{font-size:14px;color:var(--muted);line-height:1.65;flex:1;margin-bottom:20px}
        .tile-price{font-family:var(--mono);font-size:11px;letter-spacing:0.1em;color:var(--gold);margin-bottom:14px}
        .tile-cta{font-size:13px;font-weight:600;color:var(--forest);display:flex;align-items:center;gap:6px}
        .tile-cta::after{content:'→';transition:transform 0.2s}
        .product-tile:hover .tile-cta::after{transform:translateX(4px)}
        .sapa-banner{background:var(--forest);border-radius:8px;padding:48px;display:flex;align-items:center;justify-content:space-between;gap:40px;max-width:1160px;margin:0 auto;flex-wrap:wrap}
        .sapa-text .eyebrow{margin-bottom:16px}
        .sapa-headline{font-family:var(--serif);font-size:clamp(30px,3.5vw,48px);font-weight:700;color:var(--cream);line-height:1.1;letter-spacing:-0.015em;margin-bottom:12px}
        .sapa-headline em{font-style:italic;color:var(--gold-pale)}
        .sapa-sub{font-size:16px;color:rgba(248,244,236,0.65);line-height:1.7;max-width:560px}
        .how-section{background:var(--forest);padding:100px 5vw}
        .how-header{text-align:center;margin-bottom:70px}
        .how-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:1100px;margin:0 auto;position:relative}
        .how-steps::before{content:'';position:absolute;top:28px;left:0;right:0;height:1px;background:rgba(248,244,236,0.12)}
        .how-step{position:relative;z-index:1}
        .how-step-num{width:56px;height:56px;border-radius:50%;background:rgba(248,244,236,0.1);border:1.5px solid rgba(248,244,236,0.2);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:20px;font-weight:500;color:var(--gold-pale);margin-bottom:24px}
        .how-step-title{font-family:var(--serif);font-size:24px;font-weight:700;color:var(--cream);margin-bottom:14px;letter-spacing:-0.01em;line-height:1.2}
        .how-step-desc{font-size:15px;color:rgba(248,244,236,0.62);line-height:1.75}
        .trust-sec{padding:96px 5vw;background:var(--cream)}
        .trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1160px;margin:0 auto}
        .founder-note{background:white;border-radius:8px;padding:40px;border:1px solid var(--border);position:relative}
        .founder-note::before{content:'❝';font-family:var(--serif);font-size:80px;color:rgba(10,59,31,0.07);position:absolute;top:16px;left:24px;line-height:1}
        .founder-body{font-family:var(--serif);font-size:20px;font-style:italic;color:var(--ink);line-height:1.75;margin-bottom:24px;position:relative;z-index:1}
        .founder-sig{display:flex;align-items:center;gap:14px}
        .founder-avatar{width:44px;height:44px;border-radius:50%;background:var(--forest);color:var(--gold-pale);font-family:var(--serif);font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .founder-name{font-weight:600;color:var(--charcoal);font-size:15px}
        .founder-title{font-size:13px;color:var(--muted)}
        .trust-signals{display:flex;flex-direction:column;gap:20px}
        .trust-point{display:flex;gap:18px;align-items:flex-start}
        .trust-icon{width:44px;height:44px;border-radius:8px;background:rgba(10,59,31,0.07);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
        .trust-point-title{font-size:16px;font-weight:600;color:var(--forest);margin-bottom:5px}
        .trust-point-desc{font-size:14px;color:var(--muted);line-height:1.65}
        .scam-alert{background:rgba(180,60,60,0.05);border:1px solid rgba(180,60,60,0.15);border-radius:8px;padding:28px 32px;max-width:1160px;margin:40px auto 0}
        .scam-title{font-family:var(--mono);font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8B2020;margin-bottom:16px;display:flex;align-items:center;gap:8px}
        .scam-items{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .scam-item{padding:12px 16px;background:rgba(180,60,60,0.07);border-radius:4px;font-size:14px;color:#7A2020;line-height:1.5;display:flex;align-items:flex-start;gap:8px}
        .scam-item::before{content:'✕';font-weight:700;flex-shrink:0;margin-top:1px}
        .cta-final{background:var(--forest);padding:120px 5vw;text-align:center;position:relative;overflow:hidden}
        .cta-final::before{content:'M';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--serif);font-size:600px;font-weight:700;color:rgba(255,255,255,0.022);user-select:none;pointer-events:none;line-height:1}
        .cta-headline{font-family:var(--serif);font-size:clamp(40px,6vw,82px);font-weight:700;color:var(--cream);line-height:1.06;letter-spacing:-0.015em;max-width:900px;margin:0 auto 24px}
        .cta-headline em{font-style:italic;color:var(--gold-pale)}
        .cta-sub{font-size:20px;color:rgba(248,244,236,0.62);max-width:560px;margin:0 auto 56px;line-height:1.75}
        .cta-pricing{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:48px}
        .price-pill{display:flex;align-items:center;gap:10px;background:rgba(248,244,236,0.08);border:1px solid rgba(248,244,236,0.15);border-radius:100px;padding:10px 20px}
        .price-pill-icon{font-size:16px}
        .price-pill-name{font-size:14px;color:var(--cream);font-weight:500}
        .price-pill-amount{font-family:var(--mono);font-size:13px;color:var(--gold-pale)}
        .price-pill.featured{background:rgba(184,146,42,0.2);border-color:rgba(184,146,42,0.35)}
        .cta-actions{display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:28px}
        .cta-footnote{font-family:var(--mono);font-size:12px;color:rgba(248,244,236,0.3);letter-spacing:0.08em}
        .products-page-hero{background:var(--forest);padding:96px 5vw 80px}
        .products-page-hero-inner{max-width:760px;margin:0 auto;text-align:center}
        .product-deep-card{background:white;border-radius:10px;overflow:hidden;border:1px solid var(--border);margin-bottom:24px}
        .product-deep-accent{height:5px;background:linear-gradient(90deg,var(--forest),var(--gold))}
        .product-deep-body{padding:48px 44px}
        .product-deep-header{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;margin-bottom:24px;flex-wrap:wrap}
        .product-deep-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(10,59,31,0.08);color:var(--forest-mid);padding:5px 12px;border-radius:100px;font-family:var(--mono);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:12px}
        .product-deep-name{font-family:var(--serif);font-size:clamp(28px,3.5vw,44px);font-weight:700;color:var(--forest);letter-spacing:-0.015em;margin-bottom:6px}
        .product-deep-tagline{font-size:18px;color:var(--muted);font-weight:400}
        .product-price-block{text-align:right;flex-shrink:0}
        .product-price-main{font-family:var(--serif);font-size:42px;font-weight:700;color:var(--forest);letter-spacing:-0.02em;line-height:1;margin-bottom:4px}
        .product-price-note{font-family:var(--mono);font-size:10px;color:var(--muted);letter-spacing:0.12em;text-transform:uppercase}
        .product-story-block{background:rgba(10,59,31,0.04);border-left:3px solid var(--gold);padding:22px 26px;border-radius:0 6px 6px 0;margin-bottom:28px;font-size:17px;color:var(--ink);line-height:1.8;font-style:italic}
        .product-story-block strong{font-style:normal;font-weight:600}
        .product-features{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:36px}
        .feature{display:flex;align-items:flex-start;gap:10px;font-size:15px;color:var(--ink);line-height:1.55}
        .feature-check{width:20px;height:20px;min-width:20px;background:var(--forest);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:700;margin-top:2px}
        footer{background:var(--charcoal);padding:64px 5vw 40px;color:rgba(248,244,236,0.6)}
        .footer-inner{max-width:1160px;margin:0 auto}
        .footer-top{display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr;gap:40px;padding-bottom:48px;border-bottom:1px solid rgba(248,244,236,0.08);margin-bottom:36px}
        .footer-brand-desc{font-size:14px;line-height:1.75;margin-top:18px;max-width:260px}
        .footer-col-title{font-family:var(--mono);font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold-light);margin-bottom:20px}
        .footer-links{list-style:none;display:flex;flex-direction:column;gap:12px}
        .footer-links a{font-size:14px;color:rgba(248,244,236,0.55);cursor:pointer;transition:color 0.2s}
        .footer-links a:hover{color:var(--cream)}
        .footer-bottom{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .footer-legal{font-size:13px}
        .footer-legal a{color:rgba(248,244,236,0.45);cursor:pointer;transition:color 0.2s}
        .footer-legal a:hover{color:var(--cream)}
        .footer-legal span{margin:0 8px;opacity:0.4}
        .footer-disclaimer{font-size:12px;max-width:520px;text-align:right;opacity:0.35;line-height:1.65}
        .modal-bg{position:fixed;inset:0;background:rgba(10,59,31,0.55);backdrop-filter:blur(8px);z-index:9000;display:none;align-items:center;justify-content:center;padding:20px}
        .modal-bg.open{display:flex}
        .modal-box{background:var(--cream);border-radius:10px;padding:56px 52px;max-width:720px;width:100%;max-height:88vh;overflow-y:auto;position:relative;box-shadow:0 40px 100px rgba(0,0,0,0.25)}
        .modal-close{position:absolute;top:20px;right:20px;width:36px;height:36px;background:rgba(10,59,31,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--forest);font-size:16px;cursor:pointer;transition:background 0.2s}
        .modal-close:hover{background:rgba(10,59,31,0.15)}
        .modal-title{font-family:var(--serif);font-size:34px;font-weight:700;color:var(--forest);margin-bottom:32px;letter-spacing:-0.015em}
        .modal-section{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid var(--border)}
        .modal-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
        .modal-section h3{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--forest);margin-bottom:12px}
        .modal-section p{font-size:16px;color:var(--muted);line-height:1.8}
        .toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(72px);background:var(--forest);color:var(--cream);padding:12px 28px;border-radius:100px;font-size:15px;font-weight:500;z-index:9999;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);white-space:nowrap;box-shadow:0 8px 32px rgba(10,59,31,0.28)}
        .toast.show{transform:translateX(-50%) translateY(0)}
        @media(max-width:1024px){.products-4{grid-template-columns:1fr 1fr}.footer-top{grid-template-columns:1fr 1fr}}
        @media(max-width:768px){
          .nav-links,.nav-actions{display:none} .hamburger{display:flex}
          .hero{grid-template-columns:1fr;min-height:auto} .hero-left{padding:60px 5vw 40px} .hero-left::before{display:none} .hero-right{padding:0 5vw 60px}
          .hero-mini-grid{grid-template-columns:1fr 1fr}
          .pain-grid{grid-template-columns:1fr;gap:48px}
          .ba-grid{grid-template-columns:1fr} .ba-divider{flex-direction:row;padding-top:0} .ba-arrow-line{display:none}
          .dict-lead-inner{grid-template-columns:1fr;gap:40px}
          .products-4{grid-template-columns:1fr}
          .how-steps{grid-template-columns:1fr} .how-steps::before{display:none}
          .trust-grid{grid-template-columns:1fr;gap:40px}
          .scam-items{grid-template-columns:1fr}
          .cta-pricing{flex-direction:column;align-items:center}
          .product-deep-header{flex-direction:column} .product-price-block{text-align:left}
          .product-features{grid-template-columns:1fr}
          .footer-top{grid-template-columns:1fr} .footer-bottom{flex-direction:column} .footer-disclaimer{text-align:left}
          .sapa-banner{flex-direction:column;text-align:center}
          .modal-box{padding:40px 24px}
        }
      `}</style>

      {/* NAV */}
      <nav id="main-nav">
        <div className="logo" onClick={() => showPage('home')}>
          <MeridianLogo variant="full" theme="light" width={180} />
        </div>
        <ul className="nav-links">
          <li><a className={page==='home'?'active':''} onClick={()=>showPage('home')}>Home</a></li>
          <li><a className={page==='about'?'active':''} onClick={()=>showPage('about')}>About</a></li>
          <li><a className={page==='products'?'active':''} onClick={()=>showPage('products')}>Products</a></li>
          <li><a className={page==='contact'?'active':''} onClick={()=>showPage('contact')}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/login" className="btn btn-outline btn-sm">Sign in</a>
          <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-forest btn-sm">Get started →</a>
        </div>
        <div className="hamburger" onClick={()=>setMenuOpen(m=>!m)} aria-label="Menu">
          <span/><span/><span/>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen?' open':''}`}>
        <a onClick={()=>showPage('home')}>Home</a>
        <a onClick={()=>showPage('about')}>About</a>
        <a onClick={()=>showPage('products')}>Products</a>
        <a onClick={()=>showPage('contact')}>Contact</a>
        <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" style={{color:'var(--forest)',fontWeight:600,borderBottom:'none'}}>Get started →</a>
      </div>

      {/* ════ HOME ════ */}
      <div className={`page pt-nav${page==='home'?' active':''}`}>

        <section className="hero">
          <div className="hero-left">
            <div className="eyebrow reveal" style={{marginBottom:'24px'}}>Finance in plain Nigerian English</div>
            <h1 className="hero-headline reveal reveal-d1">
              Stop guessing<br/>with your money.
              <em>Confusion is expensive.</em>
            </h1>
            <p className="hero-sub reveal reveal-d2">
              Every wrong financial decision costs real money. Meridian exists so you understand <strong>exactly what you&apos;re doing</strong> before you invest, buy, or spend — in language that actually makes sense to you.
            </p>
            <div className="hero-actions reveal reveal-d3">
              <a href="#how-steps-section" className="btn btn-forest btn-lg" onClick={scrollToHow}>Get started →</a>
              <button className="btn btn-outline btn-lg" onClick={()=>showPage('products')}>See our products</button>
            </div>
            <div className="hero-trust reveal reveal-d4">
              <div className="trust-dots"><span>K</span><span>A</span><span>T</span><span>F</span></div>
              <div className="trust-text"><strong>Growing community</strong> of Nigerians<br/>making smarter money decisions</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="wod-card reveal">
              <div className="wod-label">◈ MoneySpeak — Word of the Day — Always Free</div>
              <div className="wod-term">Liquidity</div>
              <div className="wod-phonetic">lik · wid · i · tee  ·  noun</div>
              <div className="wod-definition">How quickly you can turn what you own into cash when you actually need it.</div>
              <div className="wod-divider"/>
              <div className="wod-story-label">The Nigerian story</div>
              <div className="wod-story">
                A woman has saved ₦800,000 — all of it in a plot of land behind her village. One Thursday night, her child gets sick. Fever. She needs ₦60,000 by 6am Friday. She cannot call Oloriebi at 3am to buy land. She cannot package sand and carry it to the pharmacy. That ₦800,000 is hers, it is even gaining value, but <strong>right now when she needs it — it is completely useless to her.</strong> That is what illiquid means.
              </div>
              <div className="wod-reality">
                <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'8px'}}>The rule you walk away using</div>
                <div style={{fontStyle:'italic',color:'var(--forest-mid)',fontWeight:600,marginBottom:'8px'}}>&ldquo;Always check the liquidity of an investment before you commit your money.&rdquo;</div>
                <div>Before you put money anywhere, ask one question: <strong>&ldquo;If something happens and I need this back in seven days — can I get it out?&rdquo;</strong> If the answer is no, the investment is illiquid. Not automatically bad — land and long-term shares are supposed to be illiquid. The mistake is locking away your only money there. Keep at least three months of your expenses somewhere you can reach overnight. The woman did not make a bad investment. She made the mistake of having <strong>no liquid money at all.</strong></div>
                <div style={{marginTop:'12px',fontSize:'13px',color:'var(--gold)',fontWeight:600,cursor:'pointer'}} onClick={()=>showPage('products')}>See all 500 terms in MoneySpeak →</div>
              </div>
            </div>
            <div className="hero-mini-grid reveal reveal-d1">
              {[{icon:'📖',name:'MoneySpeak',desc:'500 terms, Nigerian stories'},{icon:'🎓',name:'Stock School',desc:'Zero to confident investor'},{icon:'📊',name:'Equity Terminal',desc:'Analyse any stock yourself'},{icon:'📒',name:'TraDaq',desc:'Know your real profit'}].map(p=>(
                <div className="mini-tile" key={p.name} onClick={()=>showPage('products')}>
                  <div className="mini-tile-icon">{p.icon}</div>
                  <div><div className="mini-tile-name">{p.name}</div><div className="mini-tile-desc">{p.desc}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pain-sec">
          <div className="pain-grid">
            <div>
              <div className="eyebrow eyebrow-light reveal" style={{marginBottom:'24px'}}>The honest truth</div>
              <h2 className="pain-heading reveal reveal-d1">The financial system was never designed<br/><em>to explain itself to you.</em></h2>
              <p className="pain-body reveal reveal-d2">Banks, advisors, and textbooks all speak a language designed to make you <strong>dependent on them.</strong> The more confused you are, the more money they make from your confusion.</p>
              <p className="pain-body reveal reveal-d3">This is not about your intelligence. It is about access. Meridian gives you the access.</p>
            </div>
            <div className="pain-scenes">
              {[
                {tag:'The family gathering',txt:'Your uncle talks about "diversifying his portfolio" and everyone nods respectfully. You\'re nodding too — but inside you\'re wondering if portfolio is something you eat with egusi.'},
                {tag:'Your business',txt:'You made ₦400,000 in sales this month. After everything, you don\'t know if you actually made profit — or just moved money from one pocket to another.'},
                {tag:'The WhatsApp group',txt:'Someone drops a hot investment tip. 40 fire emojis. You want to ask what it means, but you don\'t want to look like you don\'t know.'},
                {tag:'The stock market',txt:'You\'ve heard "buy Dangote shares" three times this year. You have the money. But you don\'t know how to check if it\'s actually worth buying at today\'s price.'},
              ].map((s,i)=>(
                <div className={`scene reveal${i>0?' reveal-d'+i:''}`} key={s.tag}>
                  <div className="scene-tag">{s.tag}</div>
                  <div className="scene-text">{s.txt}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ba-sec">
          <div className="ba-header">
            <div className="eyebrow eyebrow-center reveal" style={{marginBottom:'20px'}}>What changes</div>
            <h2 className="display display-md reveal reveal-d1" style={{marginBottom:'16px'}}>Before Meridian.<br/>After Meridian.</h2>
            <p className="lead reveal reveal-d2">This is not about becoming a finance expert. It is about never being fooled again.</p>
          </div>
          <div className="ba-grid wrap-md">
            <div className="ba-col before">
              <div className="ba-col-label">Before Meridian</div>
              {['"I hear people talk about stocks but I just avoid it. Too complicated for me."','"I made good sales this month but my account is empty. I don\'t understand."','"My uncle is telling me to invest ₦500k. I can\'t ask questions — he\'ll think I\'m dumb."','"Someone is promising 30% monthly returns. It sounds too good, but everyone is doing it."','"I want to grow my money but I don\'t know where to start without getting scammed."'].map((t,i)=>(
                <div className={`ba-item reveal${i>0?' reveal-d'+i:''}`} key={i}>{t}</div>
              ))}
            </div>
            <div className="ba-divider"><div className="ba-arrow-line"/><div className="ba-arrow">→</div><div className="ba-arrow-line"/></div>
            <div className="ba-col after">
              <div className="ba-col-label">After Meridian</div>
              {['"I now understand what to look for in a company before I invest. I use the Equity Terminal."','"TraDaq showed me my actual profit is ₦45k, not the ₦400k I was celebrating. I fixed my pricing."','"I asked my uncle what the ROIC was. He looked at me differently. I already knew the answer."','"I can now explain exactly why 30% monthly return is impossible for a legitimate business. I didn\'t invest."','"I started with the MoneySpeak Dictionary. Now I\'m building a real portfolio on the NGX."'].map((t,i)=>(
                <div className={`ba-item reveal${i>0?' reveal-d'+i:''}`} key={i}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="dict-lead">
          <div className="dict-lead-inner">
            <div>
              <div className="eyebrow reveal" style={{marginBottom:'24px'}}>Start here — always free to try</div>
              <h2 className="display display-md reveal reveal-d1" style={{marginBottom:'20px'}}>The dictionary you should have had<br/><em>from the beginning.</em></h2>
              <p className="lead reveal reveal-d2" style={{marginBottom:'32px'}}>500 financial terms. Every one explained with a Nigerian story, a practical reality check, and zero big grammar. MoneySpeak is your front door to financial clarity.</p>
              <p className="body-text reveal reveal-d3" style={{marginBottom:'36px'}}>The Word of the Day on this page? That is MoneySpeak. Every day, one new term — free, no payment needed. The full 500 terms, searchable anytime, unlock for ₦4,500.</p>
              <div className="reveal reveal-d4" style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-forest btn-md">Get MoneySpeak — ₦4,500</a>
                <button className="btn btn-outline btn-md" onClick={()=>showPage('products')}>See all products</button>
              </div>
            </div>
            <div className="dict-terms-stack">
              {[
                {w:'EBITDA',p:<>The <strong>loud, raw money</strong> entering a business before life and government start chopping it. A businessman in Aba tells you &quot;we made ₦100 million!&quot; He hasn&apos;t paid his bank loan interest, his FIRS tax, or his delivery truck maintenance yet.</>},
                {w:'Dividend',p:<>You bought Zenith Bank shares. At year end, the CEO says <strong>&quot;let us share thank-you money with our owners.&quot;</strong> You get a credit alert while eating suya. You did absolutely nothing. That is a dividend.</>},
                {w:'Compounding',p:<>One male goat, one female goat. They give birth. You don&apos;t kill the kids for pepper soup. The kids have more kids. <strong>Before you know it, your backyard has 50 goats from just 2.</strong> That is compounding.</>},
                {w:'Inflation',p:<>In 2015, your ₦500 was a bodybuilder — carried jollof, 2 meats, cold Malt. Today? <strong>It is a lanky boy.</strong> Same paper. The spirit of the money has traveled. That ghost is inflation.</>},
              ].map((d,i)=>(
                <div className={`dict-term-card reveal${i>0?' reveal-d'+i:''}`} key={d.w}>
                  <div className="dict-term-word">{d.w}</div>
                  <div className="dict-term-plain">{d.p}</div>
                </div>
              ))}
              <div className="dict-see-more reveal reveal-d4" onClick={()=>showPage('products')}>+ 496 more terms in MoneySpeak →</div>
            </div>
          </div>
        </section>

        <section className="products-overview">
          <div className="products-header wrap-md">
            <div className="eyebrow eyebrow-center reveal" style={{marginBottom:'20px'}}>Four tools. One purpose.</div>
            <h2 className="display display-md reveal reveal-d1" style={{marginBottom:'16px'}}>Chase Sapa for good.</h2>
            <p className="lead reveal reveal-d2">Every product Meridian builds is designed to close the gap between what finance is and what it has been made to feel like — for people who were never given the right language.</p>
          </div>
          <div className="products-4 wrap">
            {[
              {icon:'📖',name:'MoneySpeak',pitch:'500 financial terms in plain Nigerian English. Your front door to understanding money — explained like your older sibling would.',price:'₦4,500 · One-time',cta:'Get started'},
              {icon:'🎓',name:'Stock School',pitch:'From "I don\'t know anything" to building a real portfolio. 11 structured phases using NGX examples, no foreign theory.',price:'₦18,000 · One-time',cta:'Enrol now'},
              {icon:'📊',name:'Equity Terminal',pitch:'Don\'t follow hype. Analyse any company using the same framework serious investors use. You input the data. You get the truth.',price:'₦15,000 · One-time',cta:'Get access'},
              {icon:'📒',name:'TraDaq',pitch:'You made sales. But did you make profit? Track your business money in 30 seconds a day. Know your real numbers.',price:'₦9,000 / year · Coming soon',cta:'Join waitlist'},
            ].map((p,i)=>(
              <div className={`product-tile reveal${i>0?' reveal-d'+i:''}`} key={p.name} onClick={()=>showPage('products')}>
                <div className="tile-icon">{p.icon}</div>
                <div className="tile-name">{p.name}</div>
                <div className="tile-pitch">{p.pitch}</div>
                <div className="tile-price">{p.price}</div>
                <div className="tile-cta">{p.cta}</div>
              </div>
            ))}
          </div>
          <div className="sapa-banner reveal">
            <div className="sapa-text">
              <div className="eyebrow eyebrow-light" style={{marginBottom:'16px'}}>The Meridian Access bundle</div>
              <h3 className="sapa-headline">Get everything.<br/><em>Save ₦11,500.</em></h3>
              <p className="sapa-sub">All four Meridian products under one access — ₦35,000. Every tool we build now and in the future, included. One payment. One key. Everything unlocked.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px',flexShrink:0}}>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">Get Meridian Access — ₦35,000</a>
              <button className="btn btn-cream btn-md" onClick={()=>showPage('products')}>See individual products →</button>
            </div>
          </div>
        </section>

        <section className="how-section" id="how-steps-section">
          <div className="how-header">
            <div className="eyebrow eyebrow-center eyebrow-light reveal" style={{marginBottom:'20px',justifyContent:'center'}}>Simple process</div>
            <h2 className="display display-md on-forest reveal reveal-d1" style={{textAlign:'center',marginBottom:'16px'}}>From visitor to <em>informed</em><br/>in three steps.</h2>
            <p className="lead lead-light reveal reveal-d2" style={{textAlign:'center',maxWidth:'600px',margin:'0 auto'}}>No technical knowledge required. No confusing setup. Just you, your money questions, and Meridian.</p>
          </div>
          <div className="how-steps">
            {[
              {n:'1',t:'Pick your starting point',d:'Not sure where to begin? Start with MoneySpeak — look up the terms you have been pretending to understand. Or jump straight into Stock School if you want to learn investing from scratch.'},
              {n:'2',t:'Pay once. Access forever.',d:'One-time Naira payment through Selar. You receive your access key by email within minutes. No monthly fees. No subscription traps. No hidden charges. Your access is lifetime.'},
              {n:'3',t:'Create your account and activate.',d:'Go to meridianng.com, create a free account, and paste your key. Your products unlock immediately. One key opens everything in your plan — no separate logins, no separate apps.'},
            ].map((s,i)=>(
              <div className={`how-step reveal${i>0?' reveal-d'+i:''}`} key={s.n}>
                <div className="how-step-num">{s.n}</div>
                <h3 className="how-step-title">{s.t}</h3>
                <p className="how-step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="trust-sec">
          <div className="wrap-md" style={{marginBottom:'48px'}}>
            <div className="eyebrow eyebrow-center reveal" style={{marginBottom:'20px'}}>Why we built this</div>
            <h2 className="display display-md reveal reveal-d1" style={{textAlign:'center',marginBottom:0}}>Trust is earned with honesty,<br/>not <em>fancy words.</em></h2>
          </div>
          <div className="trust-grid" style={{maxWidth:'1160px',margin:'0 auto'}}>
            <div className="founder-note reveal">
              <p className="founder-body">&ldquo;Finance in Nigeria is not actually complicated. It just gets explained by people who benefit from your confusion — or by textbooks written for completely different realities. We built Meridian because we believe that when you understand what is happening to your money, <strong>nobody can mislead you.</strong>&rdquo;</p>
              <div className="founder-sig">
                <div className="founder-avatar">M</div>
                <div><div className="founder-name">Meridian Team</div><div className="founder-title">hello@meridianng.com</div></div>
              </div>
            </div>
            <div className="trust-signals">
              {[
                {icon:'🔒',t:'We never tell you what to buy',d:'Every Meridian tool puts the decision firmly in your hands. We give you understanding, frameworks, and analysis. The choice is always yours.'},
                {icon:'🇳🇬',t:'Built for Nigerian realities',d:'NGX stocks. Naira pricing. CBN decisions. Inflation, devaluation, and the real economic conditions that affect your money — not Wall Street theory.'},
                {icon:'✉',t:'We actually respond',d:'Access issue? Question about a product? Email hello@meridianng.com. We respond within a few hours, every time.'},
                {icon:'💳',t:'One-time Naira payments, no tricks',d:'Pay once through Selar. Keep access forever. No monthly subscriptions. No hidden fees. Your price today is your price always.'},
              ].map((p,i)=>(
                <div className={`trust-point reveal${i>0?' reveal-d'+i:''}`} key={p.t}>
                  <div className="trust-icon">{p.icon}</div>
                  <div><div className="trust-point-title">{p.t}</div><div className="trust-point-desc">{p.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="scam-alert reveal" style={{maxWidth:'1160px',margin:'48px auto 0'}}>
            <div className="scam-title">⚠ Red flags you should now recognise</div>
            <div className="scam-items">
              {['"Guaranteed 30% monthly return" — no legitimate investment offers guaranteed returns. This is always a scam.','"Just send your money and we invest for you" — if you don\'t understand what they\'re doing with your money, don\'t send it.','"Join our signal group for ₦5,000" — trading signals are not financial education. Someone benefits from your confusion.','"Limited time offer — invest today or miss out" — real investments don\'t expire. Urgency is a manipulation tactic.','"Crypto will 10x in 2 months" — crypto is volatile. Anyone promising specific returns in a specific timeframe is lying.','"My uncle works at CBN and says…" — insider information claims are almost always false, and acting on real insider info is illegal.'].map((s,i)=>(
                <div className="scam-item" key={i}>{s}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final">
          <div className="eyebrow eyebrow-center eyebrow-light reveal" style={{marginBottom:'32px'}}>Your next step</div>
          <h2 className="cta-headline reveal reveal-d1">Knowledge is expensive.<br/><em>Confusion costs more.</em></h2>
          <p className="cta-sub reveal reveal-d2">Every year you spend confused about money is a year someone else profits from that confusion. Start with whatever makes sense for you — today.</p>
          <div className="cta-pricing reveal reveal-d3">
            {[{icon:'📖',name:'MoneySpeak',amt:'₦4,500'},{icon:'🎓',name:'Stock School',amt:'₦18,000'},{icon:'📊',name:'Equity Terminal',amt:'₦15,000'},{icon:'✦',name:'Meridian Access (All)',amt:'₦35,000 — saves ₦11,500',f:true}].map(p=>(
              <div className={`price-pill${p.f?' featured':''}`} key={p.name}>
                <span className="price-pill-icon">{p.icon}</span>
                <span className="price-pill-name">{p.name}</span>
                <span className="price-pill-amount">{p.amt}</span>
              </div>
            ))}
          </div>
          <div className="cta-actions reveal reveal-d4">
            <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-xl">Start understanding money →</a>
            <a href="/login" className="btn btn-cream btn-lg">Sign in to dashboard</a>
          </div>
          <div className="cta-footnote reveal">One-time Naira payments via Selar · Instant access after purchase · No subscriptions</div>
        </section>
      </div>

      {/* ════ ABOUT ════ */}
      <div className={`page pt-nav${page==='about'?' active':''}`}>
        <section className="sec sec-forest" style={{paddingBottom:0}}>
          <div className="wrap-md" style={{textAlign:'center',paddingBottom:'80px'}}>
            <div className="eyebrow eyebrow-center eyebrow-light reveal" style={{marginBottom:'24px'}}>Our story</div>
            <h1 className="display display-lg on-forest reveal reveal-d1" style={{marginBottom:'24px'}}>We built the teacher<br/><em>we wished we had.</em></h1>
            <p className="lead lead-light reveal reveal-d2">Finance in Nigeria is not complicated. It just gets explained badly — by people who benefit from your confusion, or by textbooks written for completely different realities.</p>
          </div>
        </section>
        <section className="sec">
          <div className="trust-grid wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            <div>
              <p className="body-text reveal" style={{marginBottom:'20px'}}>The Naira depreciating. CBN raising rates. Inflation eating savings quietly. Investing on the NGX. Running a business in a market with unpredictable infrastructure. None of these have simple answers.</p>
              <p className="body-text reveal reveal-d1" style={{marginBottom:'20px'}}>But they all deserve honest, clear explanations — in language that respects your intelligence rather than exploiting your unfamiliarity.</p>
              <p className="body-text reveal reveal-d2" style={{marginBottom:'20px'}}>Meridian was built because we believe that when you understand what is happening to your money — really understand it, not just nod along — you make better decisions. You are harder to mislead. You are harder to cheat.</p>
              <p className="body-text reveal reveal-d3" style={{marginBottom:'32px'}}>We are not a bank. We are not a broker. We do not manage your money or tell you what to buy. <strong style={{color:'var(--charcoal)'}}>We just explain things properly.</strong> That is the whole mission.</p>
              <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-forest btn-md reveal reveal-d4">See our products</a>
            </div>
            <div className="founder-note reveal" style={{background:'var(--cream-2)'}}>
              <p className="founder-body" style={{marginBottom:'20px'}}>&ldquo;Finance should never feel like it wasn&apos;t made for you. The market woman trying to grow her business, the fresh graduate wondering where to put her first salary, the trader with no clear sense of profit — <strong>these are the people Meridian is built for.</strong>&rdquo;</p>
              <div style={{padding:'20px',background:'white',borderRadius:'6px',border:'1px solid var(--border)'}}>
                <div style={{fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--gold)',marginBottom:'12px'}}>Our three commitments</div>
                {['Explain every concept so clearly that a 16-year-old can understand it','Never tell you what to buy — put the decision firmly in your hands','Build for Nigerian realities, not Wall Street theory'].map((c,i)=>(
                  <div style={{fontSize:'15px',color:'var(--ink)',display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'10px'}} key={i}>
                    <span style={{color:'var(--gold)',fontWeight:700,flexShrink:0}}>0{i+1}</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ════ PRODUCTS ════ */}
      <div className={`page pt-nav${page==='products'?' active':''}`}>
        <section className="products-page-hero">
          <div className="products-page-hero-inner">
            <div className="eyebrow eyebrow-center eyebrow-light reveal" style={{marginBottom:'24px'}}>The full Meridian system</div>
            <h1 className="display display-lg on-forest reveal reveal-d1" style={{marginBottom:'20px'}}>Four tools.<br/><em>One goal.</em></h1>
            <p className="lead lead-light reveal reveal-d2">Each product solves a specific, real problem Nigerian investors and business owners face. Buy what you need. Pay once. Use forever.</p>
          </div>
        </section>
        <section className="sec">
          <div className="wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            {[
              {accent:'',name:'MoneySpeak — Investment Dictionary',badge:'📖 MoneySpeak',badgeStyle:{},tag:'500 terms. Nigerian stories. Your front door to financial clarity.',price:'₦4,500',note:'One-time · Lifetime',story:'You have been nodding along when people say "liquidity," "portfolio diversification," and "bull run." MoneySpeak is for the moment you decide to stop nodding and actually understand. Every term comes with a plain definition, a Nigerian story that makes it real, and a reality check so you know how to use it.',feats:['500 terms covering investing, business, and personal finance','Every term explained with a Nigerian story, not a textbook definition','Word of the Day — free, forever, no payment needed','Searchable interface — find any term in under 5 seconds','Organised by category: investing, business, crypto, personal finance','Reality check on every term — how it actually affects your decisions'],cta:'Get MoneySpeak — ₦4,500 →',btnClass:'btn-forest'},
              {accent:'background:linear-gradient(90deg,#B8922A,#D4A83C)',name:'Stock School — Investing Mastery',badge:'🎓 Stock School',badgeStyle:{background:'rgba(184,146,42,0.1)',color:'var(--gold)'},tag:'From complete beginner to confident, independent investor.',price:'₦18,000',note:'One-time · 11 Phases',story:'Most investing content in Nigeria teaches you to follow tips and signals. Stock School teaches you something different: how to think. How to evaluate a company, understand why it is priced the way it is, and decide independently whether it belongs in your portfolio. No tips. No signals. Just your own judgment — properly informed.',feats:['11 structured phases from "what is a share?" to portfolio construction','Nigerian Exchange Group (NGX) examples throughout — not Wall Street','How to read and understand a company\'s annual report','Valuation frameworks — is a stock cheap or expensive right now?','Risk thinking calibrated to Nigerian market realities','Works directly with Equity Terminal for hands-on practice'],cta:'Enrol in Stock School — ₦18,000 →',btnClass:'btn-gold'},
              {accent:'background:linear-gradient(90deg,#145C31,#1E8048)',name:'Equity Terminal — Stock Analyser',badge:'📊 Equity Terminal',badgeStyle:{},tag:'The analysis tool for investors who want to think, not follow.',price:'₦15,000',note:'One-time · Lifetime V2',story:'A stock going up is not the same as a stock being good. The Equity Terminal is a calculator that applies a proven Owner Earnings framework to data you enter from any company\'s annual report. You put in the numbers. It shows you what the maths says. You decide what to do. This is how serious investors think — not by following tips.',feats:['Owner Earnings analysis — the framework serious long-term investors use','Quick Mode: directional results from just 4 inputs — beginner-friendly','Multi-year tracking — see if a company\'s quality is improving or declining','Calibrated for Nigeria (15% default hurdle rate for NGN investments)','Plain-English verdict with detailed supporting analysis','NGN, USD, GBP, EUR, ZAR, KES, GHS and more'],cta:'Get Equity Terminal — ₦15,000 →',btnClass:'btn-forest'},
              {accent:'background:linear-gradient(90deg,#C17A2A,#E4993A)',name:'TraDaq — Business Money Tracker',badge:'📒 TraDaq — Coming Soon',badgeStyle:{background:'rgba(193,122,42,0.1)',color:'#8B5A18'},tag:'For traders, IG sellers, and anyone running a business without an accountant.',price:'₦9,000',note:'Per year · Early access',story:'Many small business owners in Nigeria are working 12 hours a day and ending the month confused about where the money went. "I made good sales" is not the same as "I made profit." TraDaq shows you the exact difference — in plain language, from your phone, in 30 seconds a day.',feats:['Track every sale and every cost — 30 seconds per entry','See your actual profit — not revenue, not "what\'s in the account"','Categorised expenses: stock, rent, transport, salary, marketing, and more','Plain-English insights: "For every ₦100 you make, ₦23 is real profit"','Phone-first — no laptop, no spreadsheet, no accountant needed','Your data stays on your device — not shared with anyone'],cta:'Join the TraDaq waitlist →',btnClass:'btn-forest'},
            ].map(p=>(
              <div className="product-deep-card reveal" key={p.name}>
                <div className="product-deep-accent" style={p.accent?{background:p.accent.replace('background:','')}:{}}/>
                <div className="product-deep-body">
                  <div className="product-deep-header">
                    <div>
                      <div className="product-deep-badge" style={p.badgeStyle}>{p.badge}</div>
                      <div className="product-deep-name">{p.name}</div>
                      <div className="product-deep-tagline">{p.tag}</div>
                    </div>
                    <div className="product-price-block">
                      <div className="product-price-main">{p.price}</div>
                      <div className="product-price-note">{p.note}</div>
                    </div>
                  </div>
                  <div className="product-story-block">{p.story}</div>
                  <div className="product-features">
                    {p.feats.map(f=><div className="feature" key={f}><div className="feature-check">✓</div>{f}</div>)}
                  </div>
                  <a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className={`btn ${p.btnClass} btn-md`}>{p.cta}</a>
                </div>
              </div>
            ))}
            <div className="sapa-banner reveal">
              <div className="sapa-text">
                <div className="eyebrow eyebrow-light" style={{marginBottom:'16px'}}>Best value — everything included</div>
                <h3 className="sapa-headline">Meridian Access.<br/><em>All four products. One payment.</em></h3>
                <p className="sapa-sub">MoneySpeak, Stock School, Equity Terminal, and TraDaq — all under one access. ₦35,000 total. You save ₦11,500. Every future product Meridian builds is included.</p>
              </div>
              <div style={{flexShrink:0}}><a href="https://selar.com/m/meridian_ng" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-xl">Get Meridian Access — ₦35,000 →</a></div>
            </div>
          </div>
        </section>
      </div>

      {/* ════ CONTACT ════ */}
      <div className={`page pt-nav${page==='contact'?' active':''}`}>
        <section className="sec">
          <div className="trust-grid wrap" style={{maxWidth:'1100px',margin:'0 auto'}}>
            <div>
              <div className="eyebrow reveal" style={{marginBottom:'20px'}}>Talk to us</div>
              <h1 className="display display-md reveal reveal-d1" style={{marginBottom:'20px'}}>We actually<br/><em>respond.</em></h1>
              <p className="lead reveal reveal-d2" style={{marginBottom:'40px'}}>A question about a product. A term you want added to MoneySpeak. An issue with your access. Feedback. Ideas. We read everything.</p>
              <div className="trust-signals">
                {[{icon:'✉',t:'Email',d:'hello@meridianng.com — we respond within a few hours'},{icon:'📷',t:'Instagram',d:'@meridianng_ — DMs open'},{icon:'🔗',t:'LinkedIn',d:'linkedin.com/company/meridianng'},{icon:'▶',t:'YouTube',d:'@MeridianNG'}].map((c,i)=>(
                  <div className={`trust-point reveal${i>0?' reveal-d'+i:''}`} key={c.t}>
                    <div className="trust-icon">{c.icon}</div>
                    <div><div className="trust-point-title">{c.t}</div><div className="trust-point-desc">{c.d}</div></div>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'32px',padding:'22px 24px',background:'var(--cream-2)',borderRadius:'6px',border:'1px solid var(--border)'}} className="reveal">
                <div style={{fontWeight:600,color:'var(--forest)',marginBottom:'8px',fontSize:'15px'}}>Access key issue?</div>
                <div style={{fontSize:'15px',color:'var(--muted)',lineHeight:1.7}}>If your key is not working or you did not receive your email after purchase, email us at <strong style={{color:'var(--charcoal)'}}>hello@meridianng.com</strong> with your payment reference number. We will sort it within the hour.</div>
              </div>
            </div>
            <div style={{background:'white',borderRadius:'10px',padding:'48px',border:'1px solid var(--border)',boxShadow:'0 4px 32px rgba(10,59,31,0.07)'}} className="reveal reveal-d1">
              <h2 style={{fontFamily:'var(--serif)',fontSize:'30px',fontWeight:700,color:'var(--forest)',marginBottom:'8px',letterSpacing:'-0.015em'}}>Send a message</h2>
              <p style={{fontSize:'16px',color:'var(--muted)',marginBottom:'32px',lineHeight:1.6}}>Tell us what you need. We will get back to you promptly.</p>
              {[{l:'Your name',t:'text',p:'e.g. Chinedu Okafor'},{l:'Email address',t:'email',p:'you@example.com'}].map(f=>(
                <div style={{marginBottom:'22px'}} key={f.l}>
                  <label style={{display:'block',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'8px'}}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} style={{width:'100%',padding:'14px 18px',background:'var(--cream)',border:'1px solid var(--border)',borderRadius:'4px',fontFamily:'var(--sans)',fontSize:'16px',color:'var(--charcoal)',outline:'none'}}/>
                </div>
              ))}
              <div style={{marginBottom:'22px'}}>
                <label style={{display:'block',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'8px'}}>Subject</label>
                <select style={{width:'100%',padding:'14px 18px',background:'var(--cream)',border:'1px solid var(--border)',borderRadius:'4px',fontFamily:'var(--sans)',fontSize:'16px',color:'var(--charcoal)',outline:'none',cursor:'pointer'}}>
                  <option>General question</option><option>Access key issue</option><option>Product feedback</option><option>Term request for MoneySpeak</option><option>Business / Partnership</option>
                </select>
              </div>
              <div style={{marginBottom:'28px'}}>
                <label style={{display:'block',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'8px'}}>Your message</label>
                <textarea placeholder="Tell us what you need..." rows={5} style={{width:'100%',padding:'14px 18px',background:'var(--cream)',border:'1px solid var(--border)',borderRadius:'4px',fontFamily:'var(--sans)',fontSize:'16px',color:'var(--charcoal)',outline:'none',resize:'vertical',lineHeight:1.6}}/>
              </div>
              <button className="btn btn-forest btn-md" style={{width:'100%',justifyContent:'center'}} onClick={()=>showToast('Message sent ✓  We\'ll reply within a few hours.')}>Send message →</button>
            </div>
          </div>
        </section>
      </div>

      {/* ════ FOOTER ════ */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="logo" onClick={()=>showPage('home')} style={{marginBottom:0}}>
                <FooterLogo />
              </div>
              <p className="footer-brand-desc">Finance in plain Nigerian English — for investors, business owners, and anyone who has ever felt left out of the conversation.</p>
            </div>
            {[
              {title:'Products',links:[['MoneySpeak Dictionary','products'],['Stock School','products'],['Equity Terminal','products'],['TraDaq','products'],['Meridian Access (Bundle)','products']]},
              {title:'Company',links:[['About Meridian','about'],['Contact','contact'],['Buy on Selar','https://selar.com/m/meridian_ng'],['Dashboard login','/login']]},
              {title:'Follow us',links:[['Instagram','https://instagram.com/meridianng_'],['LinkedIn','https://linkedin.com/company/meridianng'],['YouTube','https://youtube.com/@MeridianNG'],['Email us','mailto:hello@meridianng.com']]},
            ].map(col=>(
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(([label,href])=>(
                    <li key={label}>{href.startsWith('http')||href.startsWith('/')||href.startsWith('mailto')
                      ? <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer">{label}</a>
                      : <a onClick={()=>showPage(href)}>{label}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">© 2025 Meridian · <a onClick={()=>setTermsOpen(true)}>Terms of Use</a><span>·</span><a onClick={()=>setTermsOpen(true)}>Privacy Policy</a></div>
            <div className="footer-disclaimer">Meridian is not a licensed financial advisor. All tools perform analytical calculations based on data you provide. Nothing on this platform constitutes financial advice. Always conduct your own research.</div>
          </div>
        </div>
      </footer>

      {/* ════ TERMS MODAL ════ */}
      <div className={`modal-bg${termsOpen?' open':''}`} onClick={e=>{if(e.target===e.currentTarget)setTermsOpen(false)}}>
        <div className="modal-box">
          <div className="modal-close" onClick={()=>setTermsOpen(false)}>✕</div>
          <h2 className="modal-title">Terms of Use &amp; Privacy</h2>
          {[{h:'What Meridian is',p:'Meridian is a financial education and analysis platform. Our products help you understand financial concepts, learn about investing, analyse company financials using data you input, and track your business finances. We are not a bank, broker, investment advisor, or licensed financial institution.'},{h:'Not financial advice',p:'Nothing on Meridian constitutes financial advice. The terms "STRONG," "NEUTRAL," and "WEAK" in the Equity Terminal describe the output of a mathematical model based on data you entered — not a recommendation to buy, sell, or hold any security. You are solely responsible for all decisions you make.'},{h:'Your data and privacy',p:'Your financial data entered in Meridian tools is stored in a private account accessible only to you. We do not sell your personal data to third parties. You can request deletion of your account at any time by emailing hello@meridianng.com.'},{h:'Payments and refunds',p:'All purchases are processed through Selar. Due to the digital nature of our products, we generally do not offer refunds. If you experience a technical issue preventing access, contact hello@meridianng.com and we will resolve it promptly.'},{h:'Contact',p:'For any questions, email hello@meridianng.com. We respond within 24 hours.'}].map(s=>(
            <div className="modal-section" key={s.h}><h3>{s.h}</h3><p>{s.p}</p></div>
          ))}
        </div>
      </div>

      <div className={`toast${toastShow?' show':''}`}>{toast}</div>
    </>
  )
}
