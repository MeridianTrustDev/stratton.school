/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "cms.stratton.school",
      },
      {
        protocol: "https",
        hostname: "meridianimages.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
