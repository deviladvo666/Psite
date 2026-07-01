'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLocale, useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const switchLocale = locale === 'fa' ? 'en' : 'fa';
  const switchHref = (() => {
    if (!pathname) return `/${switchLocale}`;
    const parts = pathname.split('/');
    if (parts.length > 1) {
      parts[1] = switchLocale;
      return parts.join('/') || `/${switchLocale}`;
    }
    return `/${switchLocale}`;
  })();
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800/60 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="font-semibold text-white">
          ✦ Premium
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link className="text-neutral-300 hover:text-white" href={`/${locale}`}>{t('home')}</Link>
          <a className="text-neutral-300 hover:text-white" href="#products">{t('products')}</a>
          <a className="text-neutral-300 hover:text-white" href="#demo">{t('demo')}</a>
        </nav>
        <Link href={switchHref} className="text-neutral-400 hover:text-white text-sm">
          {locale === 'fa' ? 'EN' : 'FA'}
        </Link>
      </Container>
    </header>
  );
}
