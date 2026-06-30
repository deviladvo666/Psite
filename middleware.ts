import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  locales: Array.from(locales),
  defaultLocale
});

export const config = {
  matcher: [
    '/((?!_next|.*\\.\
    (?:png|jpg|jpeg|gif|svg|webp|ico)|api|studio|admin).*)'
  ]
};
