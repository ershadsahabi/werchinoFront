
// src/app/pricing/page.tsx
import { getPricing } from '@/lib/server-api';
export default async function PricingPage() {
  const plans = await getPricing();
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>قیمت‌گذاری</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        {(plans ?? []).map((p: any) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>ماهانه: {p.price_monthly ?? '-'} | سالانه: {p.price_yearly ?? '-'}</p>
            {Array.isArray(p.features) && <ul>{p.features.map((f: string, i: number) => <li key={i}>{f}</li>)}</ul>}
          </div>
        ))}
      </div>
    </div>
  );
}
