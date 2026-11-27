

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
      },
      {
        protocol: 'https',
        hostname: '**.stripe.com',
      },
      {
        protocol: 'https',
        hostname: 'stripe-camo.global.ssl.fastly.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
