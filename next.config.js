/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Make API keys available to client-side code if needed
    // Be careful not to expose sensitive keys to the client
  },
  // Include environment variables that should be accessible to server components and API routes
  serverRuntimeConfig: {
    // Server-only config (not exposed to the browser)
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC: process.env.ANTHROPIC,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
