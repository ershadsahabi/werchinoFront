// src/app/dashboard/page.tsx
import { getMe } from '@/lib/server-api';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const me = await getMe();
  if (!me) redirect('/'); // اگر لاگین نیست، بفرست صفحه اصلی

  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>داشبورد</h1>
      <p>سلام {me.email} 👋</p>
      <p>اینجا بعدها می‌تونی پیام‌های تماس، وضعیت سفارش‌ها و ... را ببینی.</p>
    </div>
  );
}
