import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    qualities: [30, 60, 90, 100],
    formats: ['image/webp', 'image/avif'],
  },
};

export default withNextIntl(nextConfig);
