/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/survival/' : '',
};
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/survival/' : '',
  basePath: isProd ? '/survival' : '',
  output: 'export'
};

export default nextConfig;
