/**
 * MERIDIAN LOGO — SVG recreation of the final approved mark
 *
 * The symbol: a vertical meridian needle (tapering kite) that pierces
 * through a wide, flat horizon-arc crescent. The needle descends and
 * becomes the letter I in MERIDIAN — so the word reads MER[needle]DIAN.
 * The arc acts as the visual crossbar of the I.
 *
 * Two variants:
 *   full  — stacked lockup: symbol + MERIDIAN + FINANCIAL INTELLIGENCE
 *   mark  — avatar/icon: circle + M + needle+arc above
 */

type Variant = 'full' | 'mark'
type Theme   = 'light' | 'dark'   // light = on cream bg, dark = on forest bg

interface Props {
  variant?: Variant
  theme?:   Theme
  width?:   number
  className?: string
}

export function MeridianLogo({ variant = 'full', theme = 'light', width, className }: Props) {
  const green = theme === 'light' ? '#0A3B1F' : '#F8F4EC'
  const gold  = theme === 'light' ? '#B8922A' : '#D4A83C'
  const bg    = theme === 'light' ? '#F8F4EC' : '#0A3B1F'

  if (variant === 'mark') {
    return (
      <svg
        width={width ?? 40}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Meridian mark"
      >
        {/* Circle */}
        <circle cx="100" cy="100" r="95" fill={bg} stroke={green} strokeWidth="1.5" strokeOpacity="0.2"/>

        {/* M letterform — large serif, sits in lower 60% */}
        <text
          x="100" y="176"
          textAnchor="middle"
          fontFamily="Cormorant, Georgia, serif"
          fontSize="128"
          fontWeight="700"
          fill={green}
        >M</text>

        {/* Arc crescent — horizon line above M */}
        <path
          d="M 24,90 C 40,74 66,58 100,55 C 134,58 160,74 176,90 C 158,86 133,72 100,70 C 67,72 42,86 24,90 Z"
          fill={green}
        />

        {/* Needle — from top spike, through arc, into M valley */}
        <path
          d="M 100,16
             C 100.3,26 102.5,56 103,72
             L 101.5,104
             L 98.5,104
             L 97,72
             C 97.5,56 99.7,26 100,16
             Z"
          fill={green}
        />
      </svg>
    )
  }

  // ── FULL STACKED LOCKUP ───────────────────────────────────────
  // viewBox: 400 × 218
  //   Symbol (needle + arc): y 12 – 96
  //   MERIDIAN text:         y 166 (baseline)
  //   FINANCIAL INTELLIGENCE: y 200
  //
  // Needle:  centered at x=200, widens from tip (y=12) to arc crossing (y=90),
  //           then continues as the I stroke to the text baseline (y=166)
  //
  // Arc:     outer edge peaks at y=57, inner at y=71, tips at x≈48 and x≈352

  return (
    <svg
      width={width ?? 200}
      viewBox="0 0 400 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Meridian — Financial Intelligence"
    >
      {/* ── ARC (horizon crescent) ── */}
      {/* Outer edge: sweeps from left tip through apex (200,57) to right tip */}
      {/* Inner edge: slightly flatter curve, 14px below at center */}
      <path
        d="
          M 48,94
          C 84,78 146,59 200,56
          C 254,59 316,78 352,94
          C 320,89 258,73 200,70
          C 142,73 80,89 48,94
          Z
        "
        fill={green}
      />

      {/* ── NEEDLE ── */}
      {/* A kite shape: sharp tip at top, widens to arc crossing, */}
      {/* then continues as a thin stroke (the I) to the text baseline */}
      <path
        d="
          M 200,12
          C 200.4,24 203.8,66 204,92
          L 201.8,166
          L 198.2,166
          L 196,92
          C 196.2,66 199.6,24 200,12
          Z
        "
        fill={green}
      />

      {/* ── MER (right-aligned to x=194, leaving gap for I/needle) ── */}
      <text
        x="194"
        y="166"
        textAnchor="end"
        fontFamily="Cormorant, Georgia, serif"
        fontSize="66"
        fontWeight="700"
        fill={green}
        letterSpacing="-0.5"
      >MER</text>

      {/* ── DIAN (left-aligned from x=206, starting after the I gap) ── */}
      <text
        x="206"
        y="166"
        textAnchor="start"
        fontFamily="Cormorant, Georgia, serif"
        fontSize="66"
        fontWeight="700"
        fill={green}
        letterSpacing="-0.5"
      >DIAN</text>

      {/* ── FINANCIAL INTELLIGENCE ── */}
      <text
        x="200"
        y="202"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="11.5"
        fontWeight="400"
        fill={gold}
        letterSpacing="3.8"
      >FINANCIAL INTELLIGENCE</text>
    </svg>
  )
}

export default MeridianLogo
