'use client';
import { useState } from 'react';
import { postWithCsrf } from '@/lib/client-csrf';
import { endpoints } from '@/lib/api';
import form from './Form.module.css';
import { useRouter } from 'next/navigation';

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const r = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await postWithCsrf(endpoints.register, {
        email,
        password,
        username: username || undefined,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      });
      setDone(true);
      onSuccess?.(); // بستن مودال
      // استراتژی: بعد از ثبت‌نام، کاربر هنوز وارد نیست؛ هدر مهمان می‌ماند.
      // اگر بخواهی auto-login کنیم، می‌توانیم بلافاصله endpoints.login را هم صدا بزنیم.
      r.refresh();
    } catch (err: any) {
      setError(err.message || 'Register failed');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} className={form.form}>
      <input className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <div className={form.grid}>
        <input className="input" placeholder="Username (optional)" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className={form.grid}>
        <input className="input" placeholder="First name (optional)" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
        <input className="input" placeholder="Last name (optional)" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
      </div>
      {error && <p className={form.error}>{error}</p>}
      <button className="btn btnPrimary" disabled={loading}>{loading ? '...' : 'Create account'}</button>
    </form>
  );
}