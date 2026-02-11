/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable Static Export
  output: 'export',

  // 2. Fix Image Handling for Cloudflare
  images: {
    unoptimized: true,
  },

  // 3. (Optional) Helpful for SEO/Bento-Grid layouts
  reactStrictMode: true,
  
  // 4. Ensures links like /about don't result in 404s on static hosts
  trailingSlash: true, 
};

export default nextConfig;