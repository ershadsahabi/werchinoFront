
// src/app/testimonials/page.tsx
import { getTestimonials } from '@/lib/server-api';
export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>نظرات مشتریان</h1>
      {(items ?? []).map((t: any) => (
        <blockquote key={t.id} style={{ borderRight: '3px solid #ddd', paddingRight: 12, margin: '8px 0' }}>
          <p>{t.body}</p>
          <small>— {t.author_name}{t.author_title ? `، ${t.author_title}` : ''}</small>
        </blockquote>
      ))}
    </div>
  );
}

