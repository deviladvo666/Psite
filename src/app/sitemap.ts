import { locales } from '@/i18n/config';

export default async function sitemap() {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date().toISOString();
  const entries = locales.map((l) => ({ url: `${host}/${l}`, lastModified: now }));
  return entries;
}
