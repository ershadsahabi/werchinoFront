// src/app/services/page.tsx
import { getServices } from '@/lib/server-api';
export default async function ServicesPage() {
  const items = await getServices();
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>خدمات</h1>
      <ul>{(items ?? []).map((s: any) => (
        <li key={s.id}><strong>{s.title}</strong>{s.summary ? ` — ${s.summary}` : ''}</li>
      ))}</ul>
    </div>
  );
}