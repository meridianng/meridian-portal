'use client'

/**
 * MERIDIAN LOGO — The Meridian Needle
 *
 * Concept: A vertical line with a gold circle at its tip — this IS a
 * meridian (a vertical reference line) with the zenith marker above it.
 * Below: MERIDIAN in tracked Cormorant serif.
 * Gold horizontal rule (the meridian line concept extended).
 * FINANCIAL INTELLIGENCE in DM Mono.
 *
 * No image files. No broken PNG references. Pure SVG — works at any size,
 * on any background, forever.
 *
 * Variants:
 *   full  — needle + MERIDIAN + rule + FINANCIAL INTELLIGENCE
 *   mark  — compact square symbol (icon, favicon, app contexts)
 *
 * Themes:
 *   light — forest green on transparent (cream/white backgrounds)
 *   dark  — cream/gold on transparent (forest/charcoal backgrounds)
 */

type Variant = 'full' | 'mark'
type Theme   = 'light' | 'dark'

interface Props {
  variant?:   Variant
  theme?:     Theme
  width?:     number
  className?: string
  priority?:  boolean  // kept for API compatibility
}

export function MeridianLogo({
  variant   = 'full',
  theme     = 'light',
  width     = 160,
  className = '',
}: Props) {
  const forest  = theme === 'light' ? '#0A3B1F' : '#F8F4EC'
  const gold    = theme === 'light' ? '#B8922A' : '#D4A83C'
  const goldDim = theme === 'light' ? 'rgba(184,146,42,0.5)' : 'rgba(212,168,60,0.5)'

  // ── MARK VARIANT ──────────────────────────────────────────────────────────
  // A compact 40×40 symbol: vertical needle with gold circle, over an M.
  // Use for favicons, app icons, small avatar contexts.
  if (variant === 'mark') {
    const sz  = width ?? 36
    const bg  = theme === 'light' ? '#0A3B1F' : 'rgba(248,244,236,0.1)'
    const fg  = theme === 'light' ? '#F8F4EC' : '#F8F4EC'
    const gd  = theme === 'light' ? '#B8922A' : '#D4A83C'

    return (
      <svg
        width={sz} height={sz}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img" aria-label="Meridian"
      >
        {/* Background square */}
        <rect width="40" height="40" rx="7" fill={bg}/>
        {/* Meridian needle — vertical line */}
        <line x1="20" y1="7" x2="20" y2="16" stroke={gd} strokeWidth="1.5" strokeLinecap="round"/>
        {/* Zenith circle */}
        <circle cx="20" cy="5.5" r="2.5" fill={gd}/>
        {/* M letterform */}
        <text
          x="20" y="30"
          textAnchor="middle"
          fontFamily="'Cormorant','Cormorant Garamond',Georgia,serif"
          fontSize="18"
          fontWeight="700"
          fill={fg}
          letterSpacing="1"
        >M</text>
        {/* Gold meridian rule under M */}
        <line x1="9" y1="33" x2="31" y2="33" stroke={gd} strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
      </svg>
    )
  }

  // ── FULL WORDMARK ──────────────────────────────────────────────────────────
  // Designed at 200px width base; scales proportionally.
  const W    = width ?? 200
  const H    = Math.round(W * 0.34)   // ~68px at 200px width
  const cx   = W / 2

  // Proportional sizes
  const needleTop  = Math.round(H * 0.04)
  const circleY    = Math.round(H * 0.04)
  const circleR    = Math.max(2, Math.round(W * 0.015))
  const needleBot  = Math.round(H * 0.22)
  const textY      = Math.round(H * 0.62)
  const ruleY      = Math.round(H * 0.72)
  const subY       = Math.round(H * 0.92)
  const fontSize   = Math.round(W * 0.165)
  const subSize    = Math.max(5, Math.round(W * 0.038))
  const tracking   = Math.round(W * 0.022)

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meridian — Financial Intelligence"
    >
      {/* ── Meridian needle ── */}
      <line
        x1={cx} y1={needleTop + circleR * 2}
        x2={cx} y2={needleBot}
        stroke={gold} strokeWidth={Math.max(0.9, W * 0.007)} strokeLinecap="round"
      />
      {/* ── Zenith circle (the north point of the meridian) ── */}
      <circle cx={cx} cy={circleY + circleR} r={circleR} fill={gold}/>

      {/* ── MERIDIAN wordmark ── */}
      <text
        x={cx} y={textY}
        textAnchor="middle"
        fontFamily="'Cormorant','Cormorant Garamond','Playfair Display',Georgia,serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing={tracking}
        fill={forest}
      >MERIDIAN</text>

      {/* ── Gold meridian rule ── */}
      <line
        x1={Math.round(W * 0.03)} y1={ruleY}
        x2={Math.round(W * 0.97)} y2={ruleY}
        stroke={goldDim}
        strokeWidth={Math.max(0.6, W * 0.005)}
      />

      {/* ── FINANCIAL INTELLIGENCE tagline ── */}
      <text
        x={cx} y={subY}
        textAnchor="middle"
        fontFamily="'DM Mono','Courier New',monospace"
        fontSize={subSize}
        letterSpacing={Math.round(W * 0.018)}
        fill={gold}
        fontWeight="400"
        opacity="0.85"
      >FINANCIAL INTELLIGENCE</text>
    </svg>
  )
}

export default MeridianLogo
