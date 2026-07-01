'use server';

import * as demoStore from '@/server/data/demoStore';

async function markHandled(id: string, handled: boolean) {
  'use server';
  await demoStore.update(id, { handled });
}

async function remove(id: string) {
  'use server';
  await demoStore.remove(id);
}

export default async function AdminHome() {
  const items = await demoStore.getAll();
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Demo Requests</h2>
      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="px-3 py-2 text-left">When</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Company</th>
              <th className="px-3 py-2 text-left">Message</th>
              <th className="px-3 py-2 text-left">Handled</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-neutral-800">
                <td className="px-3 py-2 align-top text-neutral-400">{new Date(it.createdAt).toLocaleString()}</td>
                <td className="px-3 py-2 align-top">{it.name}</td>
                <td className="px-3 py-2 align-top">{it.email}</td>
                <td className="px-3 py-2 align-top">{it.company || '-'}</td>
                <td className="px-3 py-2 align-top max-w-[320px] whitespace-pre-wrap">{it.message}</td>
                <td className="px-3 py-2 align-top">{it.handled ? 'Yes' : 'No'}</td>
                <td className="px-3 py-2 align-top">
                  <form className="inline" action={async () => { await markHandled(it.id, !it.handled); }}>
                    <button className="mr-2 rounded-md border border-neutral-700 px-2 py-1 hover:bg-neutral-900">
                      {it.handled ? 'Unmark' : 'Mark handled'}
                    </button>
                  </form>
                  <form className="inline" action={async () => { await remove(it.id); }}>
                    <button className="rounded-md border border-red-700 px-2 py-1 text-red-300 hover:bg-red-900/20">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
