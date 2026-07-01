import Section from '@/components/ui/Section';
import { H2 } from '@/components/ui/Typography';
import DemoForm from '@/modules/demo-request/DemoForm';
import { useTranslations } from 'next-intl';

export default function DemoCTA() {
  const t = useTranslations('demoForm');
  return (
    <Section id="demo" className="bg-neutral-900/40">
      <div className="mx-auto max-w-2xl">
        <H2 className="text-center">{t('title')}</H2>
        <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
          <DemoForm />
        </div>
      </div>
    </Section>
  );
}

