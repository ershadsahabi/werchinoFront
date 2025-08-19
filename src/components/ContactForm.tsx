// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { endpoints } from '@/lib/api';
import { ensureCsrf, postWithCsrf } from '@/lib/client-csrf';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true); setOk(null); setErr(null);
    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      source_url: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      await ensureCsrf();
      await postWithCsrf(endpoints.contact, body);
      setOk('پیام شما با موفقیت ارسال شد.');
      form.reset();
    } catch (e: any) {
      setErr(e?.message || 'ارسال ناموفق بود.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{ gap: 12 }}>
      <h2 style={{ marginTop: 0 }}>فرم تماس</h2>
      <input name="name" placeholder="نام" className="input" required />
      <input type="email" name="email" placeholder="ایمیل" className="input" required />
      <textarea name="message" placeholder="پیام شما..." className="input" rows={5} required />
      <button className="btn btnPrimary" disabled={submitting}>{submitting ? 'در حال ارسال...' : 'ارسال'}</button>
      {ok && <p className="success">{ok}</p>}
      {err && <p className="error">{err}</p>}
    </form>
  );
}
