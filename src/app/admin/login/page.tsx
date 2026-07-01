'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function login(formData: FormData) {
  'use server';
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const envUser = process.env.ADMIN_USERNAME || 'admin';
  const envPass = process.env.ADMIN_PASSWORD || 'password';
  if (username === envUser && password === envPass) {
    cookies().set('admin_auth', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 // 1 hour
    });
    redirect('/admin');
  }
  return { error: 'Invalid credentials' };
}

export default function LoginPage() {
  return (
    <html>
      <body className="bg-neutral-950 text-neutral-100">
        <div className="mx-auto max-w-md p-6">
          <h1 className="mb-4 text-xl font-semibold">Admin Login</h1>
          <form action={login} className="grid gap-4">
            <div className="grid gap-1">
              <label htmlFor="username" className="text-sm text-neutral-300">Username</label>
              <input id="username" name="username" className="h-10 rounded-md border border-neutral-700 bg-neutral-950 px-3" />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password" className="text-sm text-neutral-300">Password</label>
              <input id="password" name="password" type="password" className="h-10 rounded-md border border-neutral-700 bg-neutral-950 px-3" />
            </div>
            <button formAction={login} className="rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20">Login</button>
          </form>
        </div>
      </body>
    </html>
  );
}

