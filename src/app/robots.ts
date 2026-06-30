import { defaultLocale, locales } from '@/i18n/config';

export default function robots() {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const sitemaps = locales.map((l) => `${host}/${l}/sitemap.xml`);
  return {
    rules: [{ userAgent: '*' }],
    sitemap: sitemaps
  };
}
