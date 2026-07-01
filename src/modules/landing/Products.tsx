import Section from '@/components/ui/Section';
import { H2, Muted } from '@/components/ui/Typography';
import { useTranslations } from 'next-intl';

export default function Products() {
  const t = useTranslations('products');
  return (
    <Section id="products">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="col-span-3 text-center">
          <H2>{t('title')}</H2>
          <Muted className="mt-3">{t('subtitle')}</Muted>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <div className="h-36 rounded-md bg-neutral-800" />
            <h3 className="mt-4 text-lg font-semibold">{t('itemTitle', { index: i })}</h3>
            <p className="mt-2 text-sm text-neutral-400">{t('itemDesc', { index: i })}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

