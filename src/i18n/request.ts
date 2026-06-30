import { notFound } from 'next/navigation';
import { defaultLocale, locales, type Locale } from './config';

export function ensureLocale(param?: string | string[]): Locale {
  if (!param) return defaultLocale;
  const value = Array.isArray(param) ? param[0] : param;
  if (locales.includes(value as Locale)) return value as Locale;
  return notFound();
}
