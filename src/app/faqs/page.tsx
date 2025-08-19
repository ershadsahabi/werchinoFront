
// src/app/faqs/page.tsx
import { getFaqs } from '@/lib/server-api';
export default async function FaqsPage() {
  const items = await getFaqs();
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>سوالات متداول</h1>
      {(items ?? []).map((f: any) => (
        <details key={f.id} style={{ marginBottom: 8 }}>
          <summary><strong>{f.question}</strong></summary>
          <div dangerouslySetInnerHTML={{ __html: f.answer }} />
        </details>
      ))}
    </div>
  );
}
