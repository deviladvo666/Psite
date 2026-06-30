import '@/styles/globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { localeMetadata, type Locale } from '@/i18n/config';
import Header from '@/modules/shell/Header';
import Footer from '@/modules/shell/Footer';
import { LenisProvider } from '@/lib/lenis/LenisProvider';
import { Analytics } from '@vercel/analytics/react';

export const dynamic = 'force-static';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Premium Personal Site',
    template: '%s | Premium Personal Site'
  },
  description: 'Cinematic, premium personal website powered by Next.js, Sanity and Supabase'
};

async function getMessages(locale: Locale) {
  try {
    const messages = (await import(`../../../messages/${locale}.json`)).default;
    return messages;
  } catch (e) {
    return notFound();
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const meta = localeMetadata[locale];
  if (!meta) return notFound();
  const messages = await getMessages(locale);
  const enableAnalytics = true;
  return (
    <html lang={meta.lang} dir={meta.dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Header />
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
        {enableAnalytics ? <Analytics /> : null}
      </body>
    </html>
  );
}
