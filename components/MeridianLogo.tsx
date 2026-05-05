'use client'

/**
 * MERIDIAN LOGO — The Meridian Mark
 *
 * The mark: a horizon arc at the base, a vertical meridian line rising
 * from it, and a gold circle at the peak — the exact moment the sun
 * reaches its highest point. Maximum light. Nothing hidden.
 *
 * Variants:
 *   full  — mark + MERIDIAN wordmark + FINANCIAL INTELLIGENCE tagline
 *   mark  — standalone mark only, works at any size
 *
 * Themes:
 *   light — forest green on transparent (cream/white backgrounds)
 *   dark  — cream on transparent (forest/charcoal backgrounds)
 *
 * Gold is always #C4912A regardless of theme.
 */

type Variant = 'full' | 'mark'
type Theme   = 'light' | 'dark'

interface Props {
  variant?:   Variant
  theme?:     Theme
  width?:     number
  className?: string
  priority?:  boolean
}

export function MeridianLogo({
  variant   = 'full',
  theme     = 'light',
  width     = 180,
  className = '',
}: Props) {
  const forest = theme === 'light' ? '#0A3B1F' : '#F8F4EC'
  const gold   = '#C4912A'

  // ── MARK ONLY ─────────────────────────────────────────────────────────────
  if (variant === 'mark') {
    const sz = width ?? 40
    return (
      <svg
        width={sz}
        height={sz}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Meridian"
      >
        <path d="M 10 52 A 22 22 0 0 1 54 52" stroke={forest} strokeWidth="5.5" strokeLinecap="round" fill="none"/>
        <line x1="32" y1="50" x2="32" y2="22" stroke={forest} strokeWidth="4.5" strokeLinecap="round"/>
        <circle cx="32" cy="14" r="8.5" fill={gold}/>
      </svg>
    )
  }

  // ── FULL WORDMARK ──────────────────────────────────────────────────────────
  const W       = width ?? 180
  const H       = Math.round(W * 0.27)
  const mSz     = Math.round(H * 0.88)
  const mY      = Math.round((H - mSz) / 2)
  const s       = mSz / 64
  const tX      = mSz + Math.round(W * 0.064)
  const sw1     = Math.max(2,   Math.round(5.5 * s * 10) / 10)
  const sw2     = Math.max(1.5, Math.round(4.5 * s * 10) / 10)
  const cR      = Math.max(3,   Math.round(8.5 * s * 10) / 10)
  const wordSz  = Math.round(W * 0.148)
  const tagSz   = Math.max(6,   Math.round(W * 0.048))
  const wordY   = Math.round(H * 0.62)
  const tagY    = Math.round(H * 0.93)

  // Arc scaled from 64x64 viewbox: M 10 52 A 22 22 0 0 1 54 52
  const ax1 = Math.round((10 * s) * 10) / 10
  const ay1 = Math.round((52 * s + mY) * 10) / 10
  const ax2 = Math.round((54 * s) * 10) / 10
  const ar  = Math.round((22 * s) * 10) / 10
  const lx  = Math.round(32 * s)
  const ly1 = Math.round(50 * s + mY)
  const ly2 = Math.round(22 * s + mY)
  const cx  = Math.round(32 * s)
  const cy  = Math.round(14 * s + mY)

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meridian — Financial Intelligence"
    >
      {/* Horizon arc */}
      <path d={`M ${ax1} ${ay1} A ${ar} ${ar} 0 0 1 ${ax2} ${ay1}`} stroke={forest} strokeWidth={sw1} strokeLinecap="round" fill="none"/>
      {/* Meridian line */}
      <line x1={lx} y1={ly1} x2={lx} y2={ly2} stroke={forest} strokeWidth={sw2} strokeLinecap="round"/>
      {/* Zenith */}
      <circle cx={cx} cy={cy} r={cR} fill={gold}/>
      {/* MERIDIAN */}
      <text x={tX} y={wordY} fontFamily="'Lora',Georgia,serif" fontSize={wordSz} fontWeight="700" letterSpacing={Math.round(W * 0.008)} fill={forest}>MERIDIAN</text>
      {/* FINANCIAL INTELLIGENCE */}
      <text x={tX} y={tagY} fontFamily="'Plus Jakarta Sans',system-ui,sans-serif" fontSize={tagSz} fontWeight="500" letterSpacing={Math.round(W * 0.016)} fill={gold} opacity="0.9">FINANCIAL INTELLIGENCE</text>
    </svg>
  )
}

export default MeridianLogo
