'use client';
import React, { useState, useTransition } from 'react';
import Button from '@/components/ui/Button';
import { useTranslations, useLocale } from 'next-intl';
import { submitDemoRequest } from './actions';

export default function DemoForm() {
  const t = useTranslations('demoForm');
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const result = await submitDemoRequest({ ...payload, locale });
      if (!result.ok) {
        const first = Object.values(result.errors)[0] as string | undefined;
        throw new Error(first || 'Validation failed');
      }
      setSuccess(t('success'));
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm text-neutral-300">{t('name')}</label>
        <input id="name" name="name" required className="h-11 rounded-md border border-neutral-700 bg-neutral-950 px-3" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm text-neutral-300">{t('email')}</label>
        <input id="email" name="email" type="email" required className="h-11 rounded-md border border-neutral-700 bg-neutral-950 px-3" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="company" className="text-sm text-neutral-300">{t('company')}</label>
        <input id="company" name="company" className="h-11 rounded-md border border-neutral-700 bg-neutral-950 px-3" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm text-neutral-300">{t('message')}</label>
        <textarea id="message" name="message" required rows={4} className="rounded-md border border-neutral-700 bg-neutral-950 p-3" />
      </div>
      <Button disabled={loading} type="submit">{loading ? '...' : t('submit')}</Button>
      {success && <p className="text-emerald-400 text-sm">{success}</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
