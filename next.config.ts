/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'example.com',
      'encrypted-tbn0.gstatic.com',
      'shared.fastly.steamstatic.com',
      'image.api.playstation.com'
    ],
  },
};

module.exports = nextConfig;
