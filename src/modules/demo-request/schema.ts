export type DemoRequestInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  locale?: string;
};

function isEmail(v: string) {
  return /.+@.+\..+/.test(v);
}

export const demoRequestSchema = {
  parse(input: any): DemoRequestInput {
    const errors: Record<string, string> = {};
    const name = String(input?.name ?? '').trim();
    const email = String(input?.email ?? '').trim();
    const companyRaw = input?.company;
    const message = String(input?.message ?? '').trim();
    const locale = input?.locale ? String(input.locale) : undefined;

    if (name.length < 2) errors.name = 'Name is required';
    if (!isEmail(email)) errors.email = 'Invalid email';
    if (message.length < 10) errors.message = 'Message is too short';

    if (Object.keys(errors).length) {
      const err: any = new Error('Validation error');
      err.issues = Object.entries(errors).map(([key, message]) => ({ path: [key], message }));
      throw err;
    }

    const company = companyRaw === '' || companyRaw == null ? undefined : String(companyRaw);

    return { name, email, company, message, locale };
  },
  safeParse(input: any): { success: true; data: DemoRequestInput } | { success: false; error: { issues: { path: (string | number)[]; message: string }[] } } {
    try {
      const data = this.parse(input);
      return { success: true, data };
    } catch (e: any) {
      return { success: false, error: { issues: e.issues ?? [] } };
    }
  }
};

