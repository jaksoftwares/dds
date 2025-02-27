/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
