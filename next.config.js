/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icecokel-blog-dev.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/images/*",
      },
    ],
  },
};

module.exports = nextConfig;
