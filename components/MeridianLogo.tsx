'use client'

/**
 * MERIDIAN LOGO — The Meridian Mark
 *
 * Mark: horizon arc + meridian line + gold zenith circle
 * Full: mark + MERIDIAN (Lora 700) + FINANCIAL INTELLIGENCE (Plus Jakarta Sans 500)
 *
 * IMPORTANT: Uses a fixed internal viewBox (260×52 for full, 64×64 for mark)
 * and scales via the SVG width/height attributes. This prevents text clipping
 * regardless of the width prop passed in.
 *
 * Themes: light (forest on cream/white) | dark (cream on forest/charcoal)
 * Gold is always #C4912A.
 */

type Variant = 'full' | 'mark'
type Theme   = 'light' | 'dark'

interface Props {
  variant?:   Variant
  theme?:     Theme
  width?:     number
  className?: string
}

export function MeridianLogo({
  variant   = 'full',
  theme     = 'light',
  width     = 180,
  className = '',
}: Props) {
  const forest = theme === 'light' ? '#0A3B1F' : '#F8F4EC'
  const gold   = '#C4912A'

  // ── MARK ONLY ──────────────────────────────────────────────────────────────
  // Fixed 64×64 viewBox. Scale via width/height attributes only.
  if (variant === 'mark') {
    const sz = width ?? 40
    const aspect = sz  // square
    return (
      <svg
        width={sz}
        height={aspect}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Meridian"
      >
        <path
          d="M 10 52 A 22 22 0 0 1 54 52"
          stroke={forest}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <line x1="32" y1="50" x2="32" y2="22" stroke={forest} strokeWidth="4.5" strokeLinecap="round"/>
        <circle cx="32" cy="14" r="8.5" fill={gold}/>
      </svg>
    )
  }

  // ── FULL WORDMARK ───────────────────────────────────────────────────────────
  // Internal canvas is always 260×52. We scale it to the requested width.
  // This means text never clips — the SVG engine handles the scaling.
  const VW     = 260   // fixed internal width
  const VH     = 52    // fixed internal height
  const W      = width ?? 180
  const H      = Math.round(W * (VH / VW))   // preserve aspect ratio

  // Mark geometry — scaled to fit inside the 52px tall canvas
  // Mark is 38px tall inside 52px canvas, vertically centred
  const markH  = 38
  const markW  = 38
  const mY     = Math.round((VH - markH) / 2) + 2  // slight optical lift
  const s      = markW / 64

  // Arc: M 10 52 A 22 22 0 0 1 54 52  scaled and offset
  const ax1    = Math.round(10  * s * 10) / 10
  const ax2    = Math.round(54  * s * 10) / 10
  const ay     = Math.round((52 * s) + mY)
  const ar     = Math.round(22  * s * 10) / 10
  const lx     = Math.round(32  * s)
  const ly1    = Math.round((50 * s) + mY)
  const ly2    = Math.round((22 * s) + mY)
  const cx     = Math.round(32  * s)
  const cy     = Math.round((14 * s) + mY)
  const cr     = Math.max(3, Math.round(8.5 * s * 10) / 10)
  const sw1    = Math.max(2,   Math.round(5.5 * s * 10) / 10)
  const sw2    = Math.max(1.5, Math.round(4.5 * s * 10) / 10)

  // Text starts right of the mark with a gap
  const gap    = 10
  const tX     = markW + gap

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${VW} ${VH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Meridian — Financial Intelligence"
    >
      {/* Horizon arc */}
      <path
        d={`M ${ax1} ${ay} A ${ar} ${ar} 0 0 1 ${ax2} ${ay}`}
        stroke={forest}
        strokeWidth={sw1}
        strokeLinecap="round"
      />
      {/* Meridian line */}
      <line x1={lx} y1={ly1} x2={lx} y2={ly2} stroke={forest} strokeWidth={sw2} strokeLinecap="round"/>
      {/* Zenith */}
      <circle cx={cx} cy={cy} r={cr} fill={gold}/>

      {/* MERIDIAN — Lora Bold 28px, vertically at 60% of canvas height */}
      <text
        x={tX}
        y={Math.round(VH * 0.60)}
        fontFamily="'Lora', Georgia, serif"
        fontSize="28"
        fontWeight="700"
        letterSpacing="2"
        fill={forest}
      >
        MERIDIAN
      </text>

      {/* FINANCIAL INTELLIGENCE — Plus Jakarta Sans 500 9px */}
      <text
        x={tX}
        y={Math.round(VH * 0.92)}
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="9"
        fontWeight="500"
        letterSpacing="2.2"
        fill={gold}
        opacity="0.85"
      >
        FINANCIAL INTELLIGENCE
      </text>
    </svg>
  )
}

export default MeridianLogo
