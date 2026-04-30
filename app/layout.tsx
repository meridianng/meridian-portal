import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  // ── Primary SEO ──────────────────────────────────────────────
  title: 'Meridian — Financial Intelligence in Plain Nigerian English',
  description:
    'Finance in plain Nigerian English. 500 financial terms with Nigerian stories. Stock market masterclass. Business profit tracker. Pay once, use forever.',
  keywords: [
    'financial education Nigeria',
    'Nigerian investment dictionary',
    'stock market Nigeria beginners',
    'NGX investing',
    'financial terms Nigeria',
    'MoneySpeak',
    'Meridian financial',
  ],

  // ── Canonical & Locale ────────────────────────────────────────
  metadataBase: new URL('https://meridianng.com'),
  alternates: { canonical: '/' },

  // ── Open Graph — controls WhatsApp, Facebook, LinkedIn previews ──
  // IMPORTANT: Create a 1200×630px image and place at /public/og-image.jpg
  // It should show your logo on the cream background with the tagline.
  // Until then, the text title/description will show.
  openGraph: {
    title: 'Meridian — Finance in Plain Nigerian English',
    description:
      'Understand your money — in language that fits your reality. 500 financial terms with Nigerian stories. Stock market masterclass. Business profit tracker.',
    url: 'https://meridianng.com',
    siteName: 'Meridian',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',      // ← create this file: 1200×630px
        width: 1200,
        height: 630,
        alt: 'Meridian — Financial Intelligence',
      },
    ],
  },

  // ── Twitter / X card ─────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',   // changed from 'summary' → shows big image
    title: 'Meridian — Finance in Plain Nigerian English',
    description:
      'Understand your money — in language that fits your reality. Built for Nigerian investors, traders, and business owners.',
    images: ['/og-image.jpg'],
  },

  // ── Robots ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  // ── Favicon ──────────────────────────────────────────────────
  // REPLACE with your actual favicon once you have it as /public/favicon.ico
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◈</text></svg>",
    apple: '/apple-touch-icon.png', // optional — create 180×180px version
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Instrument+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
