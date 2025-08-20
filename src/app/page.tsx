// src/app/page.tsx
import Link from 'next/link';
import { getHome } from '@/lib/content-api';

export const revalidate = 60;

export async function generateMetadata() {
  const h = await getHome();
  return {
    title: h?.hero_title || 'Home',
    description: h?.hero_subtitle || undefined,
  };
}

export default async function HomePage() {
  const h = await getHome();

  return (
    <div className="grid" style={{ gap: 16 }}>
      {/* Hero */}
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{h?.hero_title ?? 'خانه'}</h1>
        {h?.hero_subtitle && <p>{h.hero_subtitle}</p>}
        {!!(h?.hero_features?.length) && (
          <ul style={{ paddingInlineStart: 18 }}>
            {h!.hero_features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}
        {h?.hero_cta_label && h?.hero_cta_url && (
          <p><a className="btn btnPrimary" href={h.hero_cta_url}>{h.hero_cta_label}</a></p>
        )}
      </div>

      {/* Services highlight */}
      {!!(h?.services?.length) && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>خدمات منتخب</h2>
          <ul style={{ paddingInlineStart: 18 }}>
            {h!.services.map(s => (
              <li key={s.id} style={{ marginBottom: 8 }}>
                <Link href={`/services/${s.slug}`} className="link">{s.title}</Link>
                {s.summary ? <div style={{ color: '#666' }}>{s.summary}</div> : null}
                {s.price_from ? <small>شروع قیمت: {s.price_from}</small> : null}
              </li>
            ))}
          </ul>
          <p><Link className="link" href="/services">مشاهده همه خدمات →</Link></p>
        </div>
      )}

      {/* Pricing highlight */}
      {!!(h?.pricing?.length) && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>پلن‌ها</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
            {h!.pricing.map(p => (
              <div key={p.id} className="card" style={{ border: p.is_recommended ? '2px solid #0aa' : '1px solid #ddd' }}>
                <h3 style={{ marginTop: 0 }}>{p.name}{p.is_recommended ? ' ⭐' : ''}</h3>
                <p>ماهانه: {p.price_monthly ?? '-'}</p>
                <p>سالانه: {p.price_yearly ?? '-'}</p>
              </div>
            ))}
          </div>
          <p><Link className="link" href="/pricing">مشاهده جزئیات قیمت‌گذاری →</Link></p>
        </div>
      )}

      {/* Testimonials */}
      {!!(h?.testimonials?.length) && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>نظرات مشتریان</h2>
          {h!.testimonials.map(t => (
            <blockquote key={t.id} style={{ borderRight: '3px solid #ddd', paddingRight: 12, margin: '8px 0' }}>
              <p>{t.body}</p>
              <small>— {t.author_name}{t.author_title ? `، ${t.author_title}` : ''}{t.rating ? ` (${t.rating}/5)` : ''}</small>
            </blockquote>
          ))}
          <p><Link className="link" href="/testimonials">بیشتر بخوانید →</Link></p>
        </div>
      )}

      {/* FAQs */}
      {!!(h?.faqs?.length) && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>سوالات متداول</h2>
          {h!.faqs.map(f => (
            <details key={f.id} style={{ marginBottom: 8 }}>
              <summary><strong>{f.question}</strong></summary>
              <div dangerouslySetInnerHTML={{ __html: f.answer }} />
            </details>
          ))}
          <p><Link className="link" href="/faqs">مشاهده همه سوالات →</Link></p>
        </div>
      )}
    </div>
  );
}
