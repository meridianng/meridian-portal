/**
 * MERIDIAN LOGO — Image-based component
 *
 * Uses the original designer's embossed logo image (transparent PNG)
 * instead of SVG path recreation. Two variants:
 *   full  — stacked lockup: symbol + MERIDIAN + FINANCIAL INTELLIGENCE
 *   mark  — square crop for avatars/favicons
 *
 * SETUP:
 *   1. Place `meridian-logo-transparent.png` in your /public/images/ folder
 *   2. Place `meridian-logo-dark.png` in /public/images/ (for dark backgrounds)
 *   3. Import and use: <MeridianLogo variant="full" theme="light" />
 *
 * NOTE: For the best results on dark backgrounds (forest green),
 *   you'll need a light-colored version of the logo. The current
 *   image is dark green on transparent — it won't be visible on dark.
 *   Options:
 *     a) Get a light version from your designer
 *     b) Use the SVG fallback (included below) for dark theme
 *     c) Use CSS filter to invert (quick fix, less precise)
 */

import Image from "next/image";

type Variant = "full" | "mark";
type Theme = "light" | "dark";

interface Props {
  variant?: Variant;
  theme?: Theme;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // set true if logo is above the fold
}

export function MeridianLogo({
  variant = "full",
  theme = "light",
  width,
  height,
  className = "",
  priority = false,
}: Props) {
  // ── IMAGE-BASED LOGO (preferred) ──────────────────────────────

  if (variant === "mark") {
    // Square mark — for nav icons, favicons, avatars
    const size = width ?? 40;
    return (
      <Image
        src={
          theme === "dark"
            ? "/images/meridian-logo-dark.png"   // light-on-dark version
            : "/images/meridian-logo-transparent.png"
        }
        alt="Meridian"
        width={size}
        height={Math.round(size * 0.62)} // maintain aspect ratio (1045:645)
        className={className}
        priority={priority}
        style={{ objectFit: "contain" }}
      />
    );
  }

  // ── FULL LOCKUP ─────────────────────────────────────────────
  const w = width ?? 200;
  const h = height ?? Math.round(w * 0.62); // maintain ~1045:645 ratio

  // For dark theme without a dedicated dark image, use CSS filter
  const darkFilter =
    theme === "dark"
      ? "brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(500%) hue-rotate(20deg)"
      : undefined;

  return (
    <Image
      src="/images/meridian-logo-transparent.png"
      alt="Meridian — Financial Intelligence"
      width={w}
      height={h}
      className={className}
      priority={priority}
      style={{
        objectFit: "contain",
        filter: darkFilter,
      }}
    />
  );
}

export default MeridianLogo;


/**
 * ─── SVG FALLBACK ─────────────────────────────────────────────
 *
 * If you ever need the vector version (for dark theme, or as a
 * fallback while the image loads), here it is. You can use this
 * by importing { MeridianLogoSVG } instead.
 */

export function MeridianLogoSVG({
  theme = "light",
  width,
  className = "",
}: {
  theme?: Theme;
  width?: number;
  className?: string;
}) {
  const green = theme === "light" ? "#0A3B1F" : "#F8F4EC";
  const gold  = theme === "light" ? "#B8922A" : "#D4A83C";

  return (
    <svg
      width={width ?? 200}
      viewBox="0 0 400 218"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Meridian — Financial Intelligence"
    >
      {/* Arc (horizon crescent) */}
      <path
        d="M 48,94 C 84,78 146,59 200,56 C 254,59 316,78 352,94
           C 320,89 258,73 200,70 C 142,73 80,89 48,94 Z"
        fill={green}
      />

      {/* Needle (kite → I stroke) */}
      <path
        d="M 200,12 C 200.4,24 203.8,66 204,92
           L 201.8,166 L 198.2,166 L 196,92
           C 196.2,66 199.6,24 200,12 Z"
        fill={green}
      />

      {/* MER */}
      <text
        x="194" y="166"
        textAnchor="end"
        fontFamily="Cormorant, Georgia, serif"
        fontSize="66" fontWeight="700"
        fill={green} letterSpacing="-0.5"
      >MER</text>

      {/* DIAN */}
      <text
        x="206" y="166"
        textAnchor="start"
        fontFamily="Cormorant, Georgia, serif"
        fontSize="66" fontWeight="700"
        fill={green} letterSpacing="-0.5"
      >DIAN</text>

      {/* FINANCIAL INTELLIGENCE */}
      <text
        x="200" y="202"
        textAnchor="middle"
        fontFamily="DM Mono, monospace"
        fontSize="11.5" fontWeight="400"
        fill={gold} letterSpacing="3.8"
      >FINANCIAL INTELLIGENCE</text>
    </svg>
  );
}
