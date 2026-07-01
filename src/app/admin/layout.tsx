import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const auth = cookieStore.get('admin_auth')?.value;
  if (auth !== '1') {
    redirect('/admin/login');
  }
  return (
    <html>
      <body className="bg-neutral-950 text-neutral-100">
        <div className="mx-auto max-w-5xl p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin</h1>
            <form action="/admin/login" method="post">
              <button
                formAction={async () => {
                  'use server';
                  const ck = cookies();
                  ck.set('admin_auth', '', { httpOnly: true, maxAge: 0, path: '/' });
                  redirect('/admin/login');
                }}
                className="rounded-md border border-neutral-700 px-3 py-1 text-sm text-neutral-300 hover:bg-neutral-900"
              >
                Logout
              </button>
            </form>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
