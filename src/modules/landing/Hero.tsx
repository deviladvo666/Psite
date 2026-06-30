'use client';
import { H1, Muted } from '@/components/ui/Typography';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(120,120,120,0.15),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-4xl text-center"
      >
        <H1>{t('title')}</H1>
        <Muted className="mt-6 text-lg">{t('subtitle')}</Muted>
        <Button className="mt-10" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
          {t('cta')}
        </Button>
      </motion.div>
      <div className="mt-16 flex items-center justify-center">{children}</div>
    </Section>
  );
}
