import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', async () => {
  return {
    notFound: () => {
      throw new Error('NOT_FOUND');
    }
  };
});

import { ensureLocale } from '../src/i18n/request';

describe('ensureLocale', () => {
  it('returns default when missing', () => {
    expect(ensureLocale(undefined)).toBe('fa');
  });
  it('accepts known locale', () => {
    expect(ensureLocale('en')).toBe('en');
  });
  it('throws notFound for unknown', () => {
    expect(() => ensureLocale('de')).toThrowError('NOT_FOUND');
  });
});
