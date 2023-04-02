/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHANNEL_PRIVATE_KEY:
      "b96a862c2e75a28326cb308ee1326ef166c7efe99508c051fc2656b48afcacb9",
    // BACKEND_ENDPOINT: "https://cognizance-bit-bots-backend.vercel.app",
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ipfs.io", port: "" }],
  },
};

module.exports = nextConfig;
