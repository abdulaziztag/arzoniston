import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const url = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    remotePatterns: [
      {
        protocol: url.split(':')[0] as 'http' | 'https',
        hostname: url.split('/')[2].split(':')[0],
        port: url.split(':')[2].split('/')[0],
      },
    ],
  },
  /* config options here */
};

export default withNextIntl(nextConfig);
