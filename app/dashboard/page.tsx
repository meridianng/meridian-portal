import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CopyButton } from '@/components/CopyButton'
import type { Profile, ProductId } from '@/lib/types'

// ── SVG Icons (replaces emojis — no emoji anywhere in the portal) ──
const Icons = {
  Book: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  ChartBar: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
      <line x1="2"  y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Ledger: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <line x1="8" y1="3" x2="8" y2="21"/>
      <line x1="2" y1="9"  x2="8"  y2="9"/>
      <line x1="2" y1="15" x2="8"  y2="15"/>
    </svg>
  ),
  Key: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="M21 2l-9.6 9.6"/>
      <path d="M15.5 7.5l3 3L22 7l-3-3"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Lock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Compass: () => (
    <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.25"/>
      <line x1="32" y1="4"  x2="32" y2="9"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="60" y1="32" x2="55" y2="32" stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.4"/>
      <line x1="32" y1="60" x2="32" y2="55" stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.4"/>
      <line x1="4"  y1="32" x2="9"  y2="32" stroke="currentColor" strokeWidth="1"   strokeLinecap="round" opacity="0.4"/>
      <polygon points="32,8 29.2,32 32,30 34.8,32" fill="#C9A84C"/>
      <polygon points="32,56 29.2,32 32,34 34.8,32" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.7"/>
      <circle cx="32" cy="32" r="1.5" fill="#C9A84C"/>
    </svg>
  ),
}

// ── Products ──────────────────────────────────────────────────
const PRODUCTS = [
  {
    id:       'dictionary' as ProductId,
    name:     'MoneySpeak',
    tagline:  '500 financial terms in plain Nigerian English',
    desc:     'Every term that has ever confused you — explained with Nigerian stories, street examples, and zero big grammar. Search any word. Understand it instantly.',
    Icon:     Icons.Book,
    url:      '/dictionary',
    selar:    process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isLive:   false,          // set true when dictionary page is ready
    price:    '₦4,500',
    accent:   '#C9A84C',
  },
  {
    id:       'course' as ProductId,
    name:     'Stock School',
    tagline:  'Investing from scratch — 11 phases',
    desc:     'From "what is a share?" to building a real portfolio. Nigerian Exchange Group examples throughout. No jargon. No textbook English.',
    Icon:     Icons.GraduationCap,
    url:      process.env.NEXT_PUBLIC_COURSE_URL || 'https://learn.meridianng.com',
    selar:    process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isLive:   true,
    price:    '₦18,000',
    accent:   '#C9A84C',
  },
  {
    id:       'terminal' as ProductId,
    name:     'Equity Terminal',
    tagline:  'Analyse any company like a professional',
    desc:     'Enter numbers from any annual report. Get a plain-English verdict. Uses the Owner Earnings framework — the method serious long-term investors use.',
    Icon:     Icons.ChartBar,
    url:      process.env.NEXT_PUBLIC_TERMINAL_URL || 'https://app.meridianng.com',
    selar:    process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isLive:   true,
    price:    '₦15,000',
    accent:   '#00D084',
  },
  {
    id:       'tradaq' as ProductId,
    name:     'TraDaq',
    tagline:  'Know your real profit — not just your sales',
    desc:     'Business money tracking for market traders, IG sellers, and small business owners. 30 seconds a day. No spreadsheet. No accountant.',
    Icon:     Icons.Ledger,
    url:      '/tradaq',
    selar:    process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isLive:   false,
    price:    '₦9,000/yr',
    accent:   '#F59E0B',
  },
]

function getPlanLabel(plan: string) {
  const map: Record<string, string> = {
    'v2_tool':            'Equity Terminal',
    'v2_course':          'Stock School',
    'v2_dictionary':      'MoneySpeak',
    'v2_tradaq':          'TraDaq',
    'v2_meridian access': 'Meridian Access',
    'v2_combo':           'Meridian Access',
    'full':               'Full Access',
  }
  return map[plan] || plan
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

async function signOut() {
  'use server'
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = createClient()
  await supabase.auth.signOut()
  const { redirect } = await import('next/navigation')
  redirect('/login')
}

// ── Page ──────────────────────────────────────────────────────
export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: accessRows }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single<Profile>(),
    supabase.from('product_access').select('product').eq('user_id', user.id),
  ])

  const accessSet  = new Set<string>((accessRows || []).map((r: { product: string }) => r.product))
  const firstName  = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const hasKey     = !!profile?.meridian_key
  const planLabel  = profile?.plan ? getPlanLabel(profile.plan) : null
  const termKey    = profile?.meridian_key || ''

  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <header className="dash-header">
        <Link href="/" className="dash-brand">
          <span className="dash-brand-compass">
            <Icons.Compass />
          </span>
          <div className="dash-brand-text">
            <span className="dash-brand-name">MERIDIAN</span>
            <span className="dash-brand-sub">Financial Intelligence</span>
          </div>
        </Link>

        <div className="dash-header-right">
          <div className="dash-user-pill">
            <span className="dash-user-dot" />
            <span className="dash-user-email">{user.email}</span>
            {planLabel && (
              <span className="dash-plan-badge">{planLabel}</span>
            )}
          </div>
          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">Sign out</button>
          </form>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="dash-body">

        {/* Hero — editorial, not template */}
        <div className="dash-hero">
          <div className="dash-hero-eyebrow">
            <span className="dash-hero-dot" />
            {getGreeting()}
          </div>
          <h1 className="dash-greeting">
            {firstName}.<br />
            <span className="dash-greeting-sub">
              {accessSet.size > 0
                ? `${accessSet.size} product${accessSet.size > 1 ? 's' : ''} ready for you.`
                : 'Activate your key to unlock your products.'}
            </span>
          </h1>
        </div>

        {/* Key display */}
        {hasKey && (
          <div className="key-display">
            <div className="key-display-icon">
              <Icons.Key />
            </div>
            <div className="key-display-body">
              <div className="key-display-label">Your Meridian access key</div>
              <div className="key-display-value">{profile!.meridian_key}</div>
              {planLabel && (
                <div className="key-plan-badge">
                  <span style={{ color: 'var(--green)' }}>
                    <Icons.Check />
                  </span>
                  {planLabel} — activated
                </div>
              )}
            </div>
            <CopyButton text={profile!.meridian_key!} />
          </div>
        )}

        {/* Activate banner */}
        {!hasKey && (
          <Link href="/activate" className="activate-banner">
            <span className="activate-banner-icon">
              <Icons.Key />
            </span>
            <div className="activate-banner-text">
              <div className="activate-banner-title">Activate your access key</div>
              <div className="activate-banner-desc">
                Bought a Meridian product? Paste your key to unlock it instantly. 
                Your key was emailed to you after your Selar purchase.
              </div>
            </div>
            <span className="activate-banner-arrow">→</span>
          </Link>
        )}

        {/* Products */}
        <div className="dash-section-label">Your products</div>

        <div className="products-grid">
          {PRODUCTS.map(product => {
            const hasAccess = accessSet.has(product.id)
            const isComingSoon = !product.isLive

            // Build the correct launch URL
            // For Equity Terminal: append the key so it auto-authenticates
            let launchUrl = product.url
            if (hasAccess && product.id === 'terminal' && termKey) {
              launchUrl = `${product.url}?k=${termKey}`
            }

            return (
              <div
                key={product.id}
                className={`product-card ${hasAccess ? 'product-card--unlocked' : 'product-card--locked'} ${isComingSoon ? 'product-card--soon' : ''}`}
                style={{ '--accent': product.accent } as React.CSSProperties}
              >
                {/* Status bar */}
                <div className="product-card-bar" />

                {/* Icon + status */}
                <div className="product-card-top">
                  <div className="product-card-icon">
                    <product.Icon />
                  </div>
                  <div className={`product-status-badge ${
                    isComingSoon ? 'status--soon' :
                    hasAccess    ? 'status--active' : 'status--locked'
                  }`}>
                    {isComingSoon
                      ? <><Icons.Clock /> Coming soon</>
                      : hasAccess
                      ? <><Icons.Check /> Active</>
                      : <><Icons.Lock /> Locked</>
                    }
                  </div>
                </div>

                <div className="product-card-name">{product.name}</div>
                <div className="product-card-tagline">{product.tagline}</div>
                <div className="product-card-desc">{product.desc}</div>

                <div className="product-card-footer">
                  {isComingSoon ? (
                    <div className="product-card-price">{product.price}</div>
                  ) : hasAccess ? (
                    <a
                      href={launchUrl}
                      target={product.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Open {product.name}
                      <Icons.ExternalLink />
                    </a>
                  ) : (
                    <div className="product-card-locked-row">
                      <div className="product-card-price">{product.price}</div>
                      <a
                        href={product.selar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        Get access
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Need help */}
        <div className="dash-help">
          <div className="dash-help-text">
            <div className="dash-help-title">Need help?</div>
            <div className="dash-help-sub">
              Key not working · Wrong products unlocked · Didn&apos;t receive your key
            </div>
          </div>
          <a href="mailto:hello@meridianng.com" className="btn btn-ghost">
            Email us →
          </a>
        </div>

      </main>
    </div>
  )
}
