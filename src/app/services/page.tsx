// src/app/services/page.tsx
import { getServices } from '@/lib/content-api';
import Link from 'next/link';

export const metadata = { title: 'خدمات' };

export default async function ServicesPage() {
  const items = await getServices() || [];
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>خدمات</h1>
      <ul style={{ paddingInlineStart: 18 }}>
        {items.map(s => (
          <li key={s.id} style={{ marginBottom: 8 }}>
            <Link href={`/services/${s.slug}`} className="link">{s.title}</Link>
            {s.summary ? <div style={{ color: '#666' }}>{s.summary}</div> : null}
            {s.price_from ? <small>شروع قیمت: {s.price_from}</small> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
