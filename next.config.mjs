/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['192.168.100.55'],
  distDir: '.next-build',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
