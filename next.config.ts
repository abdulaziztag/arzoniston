import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  }
  /* config options here */
};

export default withNextIntl(nextConfig);
