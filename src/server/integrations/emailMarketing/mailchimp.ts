export type MailchimpInput = {
  email: string;
  name?: string;
  tags?: string[];
};

export async function mailchimpSubscribe(input: MailchimpInput) {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !audienceId) return { ok: false, skipped: true } as const;

  const datacenter = apiKey.split('-')[1];
  const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `apikey ${apiKey}`
    },
    body: JSON.stringify({
      email_address: input.email,
      status: 'subscribed',
      merge_fields: { FNAME: input.name || '' },
      tags: input.tags || []
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailchimp error: ${res.status} ${text}`);
  }

  return { ok: true } as const;
}
