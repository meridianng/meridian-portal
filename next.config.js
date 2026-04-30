/** @type {import('next').NextConfig} */
const nextConfig = {

  // ── Image domains ────────────────────────────────────────────
  // Add any external image hostnames you use here.
  // Your Supabase storage URL follows the pattern: xxxx.supabase.co
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',   // covers all Supabase storage URLs
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Add more if you use external image sources, e.g. Unsplash, Cloudinary
    ],
  },

  // ── Security headers ─────────────────────────────────────────
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
