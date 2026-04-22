import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meridian — Financial Understanding & Control',
  description: 'Finance in plain Nigerian English. Invest smarter. Build real wealth.',
  metadataBase: new URL('https://meridianng.com'),
  openGraph: {
    title: 'Meridian',
    description: 'Finance in plain Nigerian English.',
    url: 'https://meridianng.com',
    siteName: 'Meridian',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meridian',
    description: 'Finance in plain Nigerian English.',
  },
  icons: {
    // Add a favicon later — for now we use the ◈ symbol
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◈</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
