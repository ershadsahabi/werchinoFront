'use client';
import { useState } from 'react';
import { postWithCsrf } from '@/lib/client-csrf';
import { endpoints } from '@/lib/api';
import form from './Form.module.css';
import { useRouter } from 'next/navigation';

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const r = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await postWithCsrf(endpoints.login, { identifier, password });
      onSuccess?.();
      r.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className={form.form}>
      <input className="input" placeholder="Email or username" value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
      <input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      {error && <p className={form.error}>{error}</p>}
      <button className="btn btnPrimary" disabled={loading}>{loading ? '...' : 'Login'}</button>
    </form>
  );
}