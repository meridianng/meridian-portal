import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CopyButton } from '@/components/CopyButton'
import type { Profile, ProductId } from '@/lib/types'

// ── Product definitions ──────────────────────────────────────
const PRODUCTS = [
  {
    id: 'terminal' as ProductId,
    name: 'Equity Terminal',
    icon: '◈',
    tagline: 'Analyse any company like a pro',
    description:
      'Enter the numbers from any company\'s annual report. Get a plain-English verdict — is this stock good value, overpriced, or a financial trap? Built for NGX and global markets.',
    url: process.env.NEXT_PUBLIC_TERMINAL_URL || 'https://app.meridianng.com',
    selarUrl: process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isBuilt: true,
    price: '₦15,000',
  },
  {
    id: 'course' as ProductId,
    name: 'Stock School',
    icon: '◎',
    tagline: 'Investing from scratch — in real Nigerian English',
    description:
      '11 phases. From "what is a share?" all the way to building a real portfolio. No jargon. No textbook English. Just honest explanations with examples you will actually recognise.',
    url: process.env.NEXT_PUBLIC_COURSE_URL || 'https://learn.meridianng.com',
    selarUrl: process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isBuilt: true,
    price: '₦18,000',
  },
  {
    id: 'dictionary' as ProductId,
    name: 'MoneySpeak',
    icon: '◱',
    tagline: '500 financial terms in plain Nigerian English',
    description:
      'Every financial term that has ever confused you — explained with Nigerian stories, street examples, and zero big grammar. Searchable. Clear. Built for your younger sister to get it too.',
    url: '/dictionary',
    selarUrl: process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isBuilt: false,
    comingSoonLabel: 'Launching soon',
    price: '₦4,500',
  },
  {
    id: 'bizbooks' as ProductId,
    name: 'BizBooks',
    icon: '⊞',
    tagline: 'Simple accounting for your business — no jargon',
    description:
      'Track money in, money out, and actual profit. Built for market traders, IG sellers, and small business owners. No accounting degree, no spreadsheet stress, no confusion.',
    url: '/bizbooks',
    selarUrl: process.env.NEXT_PUBLIC_SELAR_URL || 'https://selar.com/m/meridian_ng',
    isBuilt: false,
    comingSoonLabel: 'In development',
    price: '₦9,000/yr',
  },
]

// ── Helpers ───────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getPlanLabel(plan: string) {
  const map: Record<string, string> = {
    v2_tool:   'Equity Terminal',
    v2_course: 'Stock School',
    v2_combo:  'Terminal + Course',
    full:      'Full Access',
  }
  return map[plan] || null
}

// ── Sign out form action ──────────────────────────────────────
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

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch profile + product access in parallel
  const [{ data: profile }, { data: accessRows }] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single<Profile>(),
    supabase
      .from('product_access')
      .select('product')
      .eq('user_id', user.id),
  ])

  const accessSet = new Set<string>(
    (accessRows || []).map((r: { product: string }) => r.product)
  )

  const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const hasKey    = !!profile?.meridian_key
  const planLabel = profile?.plan ? getPlanLabel(profile.plan) : null

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="dash-logo-mark">◈</span>
          <span className="dash-logo-name">MERIDIAN</span>
        </div>

        <div className="dash-header-right">
          <div className="dash-user-pill">
            <span className="dash-user-dot" />
            <span className="dash-user-email">{user.email}</span>
          </div>

          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="dash-body">

        {/* Hero */}
        <div className="dash-hero">
          <h1 className="dash-greeting">
            {getGreeting()},{' '}
            <span>{firstName}.</span>
          </h1>
          <p className="dash-tagline">
            {accessSet.size > 0
              ? `You have access to ${accessSet.size} Meridian product${accessSet.size > 1 ? 's' : ''}. Pick up where you left off.`
              : 'Your Meridian dashboard. Activate your key below to unlock your products.'}
          </p>
        </div>

        {/* Key display (if activated) */}
        {hasKey && (
          <div className="key-display">
            <span className="key-display-label">Your Meridian key</span>
            <span className="key-display-value">{profile!.meridian_key}</span>
            {planLabel && (
              <span className="key-plan-badge">
                ✓ {planLabel}
              </span>
            )}
            <CopyButton text={profile!.meridian_key!} />
          </div>
        )}

        {/* Activate banner (if no key yet) */}
        {!hasKey && (
          <div className="activate-banner">
            <span className="activate-banner-icon">⚿</span>
            <div className="activate-banner-text">
              <div className="activate-banner-title">Activate your access</div>
              <div className="activate-banner-desc">
                Bought a Meridian product? Drop your key here to unlock it instantly.
                Check your purchase email — the key was sent with your receipt.
              </div>
            </div>
            <Link href="/activate" className="btn btn-secondary" style={{ flexShrink: 0 }}>
              Enter key →
            </Link>
          </div>
        )}

        {/* Product grid */}
        <div className="section-label">Your products</div>

        <div className="product-grid">
          {PRODUCTS.map((product) => {
            const isUnlocked    = accessSet.has(product.id)
            const canPurchase   = product.isBuilt
            const isComingSoon  = !product.isBuilt

            let cardClass = 'product-card'
            if (isUnlocked)   cardClass += ' unlocked'
            else if (isComingSoon) cardClass += ' coming-soon'
            else               cardClass += ' locked'

            return (
              <div key={product.id} className={cardClass}>
                {/* Icon */}
                <div className="card-icon">{product.icon}</div>

                {/* Status badge */}
                <div className="card-status-row">
                  {isUnlocked ? (
                    <span className="card-status-badge badge-active">
                      <span className="badge-dot" />
                      Active
                    </span>
                  ) : isComingSoon ? (
                    <span className="card-status-badge badge-soon">
                      {product.comingSoonLabel || 'Coming soon'}
                    </span>
                  ) : (
                    <span className="card-status-badge badge-locked">
                      {product.price}
                    </span>
                  )}
                </div>

                {/* Name + tagline */}
                <h2 className="card-name">{product.name}</h2>
                <div className="card-tagline">{product.tagline}</div>

                {/* Description */}
                <p className="card-desc">{product.description}</p>

                {/* CTA */}
                <div className="card-cta">
                  {isUnlocked ? (
                    <a
                      href={product.url}
                      target={product.isBuilt ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="btn-open"
                    >
                      Open {product.name} →
                    </a>
                  ) : isComingSoon ? (
                    <span className="btn-coming-soon">Coming Soon</span>
                  ) : (
                    <a
                      href={product.selarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-get-access"
                    >
                      Get Access — {product.price} →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Activate link at bottom if user has key but wants to update */}
        {hasKey && (
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <Link
              href="/activate"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--text-3)',
                letterSpacing: '0.1em',
              }}
            >
              Update or re-enter your key →
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dash-footer">
        <span className="dash-footer-text">© {new Date().getFullYear()} Meridian · meridianng.com</span>
        <span className="dash-footer-text">
          Questions? Email{' '}
          <a
            href="mailto:hello@meridianng.com"
            style={{ color: 'var(--text-3)' }}
          >
            hello@meridianng.com
          </a>
        </span>
      </footer>
    </div>
  )
}
