/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true
  },
  reactStrictMode: true,
  images: {
    remotePatterns: []
  }
};

export default nextConfig;
