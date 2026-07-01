'use server';

import { demoRequestSchema } from './schema';
import * as demoStore from '@/server/data/demoStore';

export type ActionResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

export async function submitDemoRequest(form: FormData | Record<string, unknown>): Promise<ActionResult> {
  const obj = form instanceof FormData ? Object.fromEntries(form.entries()) : form;
  const parsed = demoRequestSchema.safeParse(obj);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0]?.toString() || 'form';
      if (!errors[path]) errors[path] = issue.message;
    }
    return { ok: false, errors };
  }
  await demoStore.add(parsed.data);
  return { ok: true };
}
