/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/adriatik-isufi.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/adriatik-isufi.github.io/' : '',
}

export default nextConfig