import { promises as fs } from 'fs';
import path from 'path';

export type DemoRequestRecord = {
  id: string;
  createdAt: string;
  handled: boolean;
  name: string;
  email: string;
  company?: string;
  message: string;
  locale?: string;
};

const DATA_DIR = path.resolve(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'demo-requests.json');

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

async function readAll(): Promise<DemoRequestRecord[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeAll(items: DemoRequestRecord[]) {
  await ensureFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

export async function getAll(): Promise<DemoRequestRecord[]> {
  const items = await readAll();
  // latest first
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function add(input: Omit<DemoRequestRecord, 'id' | 'createdAt' | 'handled'>): Promise<DemoRequestRecord> {
  const items = await readAll();
  const record: DemoRequestRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    handled: false,
    ...input
  };
  items.push(record);
  await writeAll(items);
  return record;
}

export async function update(id: string, patch: Partial<Omit<DemoRequestRecord, 'id' | 'createdAt'>>): Promise<DemoRequestRecord | null> {
  const items = await readAll();
  const idx = items.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch };
  await writeAll(items);
  return items[idx];
}

export async function remove(id: string): Promise<boolean> {
  const items = await readAll();
  const next = items.filter((r) => r.id !== id);
  const changed = next.length !== items.length;
  if (changed) await writeAll(next);
  return changed;
}
