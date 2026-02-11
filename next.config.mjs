/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',           // <-- enable static export
  images: {
    unoptimized: true,        // needed for static export if you use <Image>
  },
};

export default nextConfig;