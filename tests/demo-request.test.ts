import { describe, it, expect, beforeEach, vi } from 'vitest';
import { demoRequestSchema } from '../src/modules/demo-request/schema';
import * as store from '../src/server/data/demoStore';

// Isolate file IO by mocking fs/promises used inside the store
import { promises as fs } from 'fs';
import path from 'path';

vi.mock('fs', async () => {
  const real = await vi.importActual<typeof import('fs')>('fs');
  return { ...real, promises: { ...real.promises } };
});

const TMP_DIR = path.resolve(process.cwd(), '.data-test');
const DATA_FILE = path.join(TMP_DIR, 'demo-requests.json');

// Monkey-patch paths inside the module by re-importing with mocked process.cwd
vi.mock('path', async () => {
  const real = await vi.importActual<typeof import('path')>('path');
  return {
    ...real,
    resolve: (...args: any[]) => {
      if (args[0] === process.cwd()) return TMP_DIR;
      return (real.resolve as any)(...args);
    }
  } as typeof import('path');
});

describe('demoRequestSchema', () => {
  it('accepts valid input', () => {
    const parsed = demoRequestSchema.parse({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello this is a message with enough length'
    });
    expect(parsed.name).toBe('John Doe');
  });
  it('rejects invalid email', () => {
    const result = demoRequestSchema.safeParse({ name: 'J', email: 'nope', message: 'hello world more than 10' });
    expect(result.success).toBe(false);
  });
});

describe('demoStore', () => {
  beforeEach(async () => {
    await fs.rm(TMP_DIR, { recursive: true, force: true });
  });

  it('adds and lists records', async () => {
    const rec = await store.add({ name: 'A', email: 'a@b.com', message: 'hello world 12345' });
    const all = await store.getAll();
    expect(all.length).toBe(1);
    expect(all[0].id).toBe(rec.id);
  });

  it('updates and removes records', async () => {
    const rec = await store.add({ name: 'B', email: 'b@b.com', message: 'hello world 12345' });
    await store.update(rec.id, { handled: true });
    const updated = (await store.getAll())[0];
    expect(updated.handled).toBe(true);
    const ok = await store.remove(rec.id);
    expect(ok).toBe(true);
    const all = await store.getAll();
    expect(all.length).toBe(0);
  });
});
