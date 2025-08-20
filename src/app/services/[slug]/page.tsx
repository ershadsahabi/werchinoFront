import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServices } from '@/lib/content-api';

// params الان Promise است → باید await شود
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const items = await getServices() || [];
  const service = items.find(s => s.slug === slug);
  return { title: service ? service.title : 'Service' };
}

export default async function ServiceDetail(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const items = await getServices() || [];
  const service = items.find(s => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="card">
      <Link href="/services" className="link">← بازگشت به خدمات</Link>
      <h1 style={{ marginTop: 8 }}>{service.title}</h1>
      {service.description
        ? <div dangerouslySetInnerHTML={{ __html: service.description }} />
        : (service.summary ? <p>{service.summary}</p> : <p>توضیحاتی برای این سرویس ثبت نشده.</p>)}
      {service.price_from && <p><strong>شروع قیمت:</strong> {service.price_from}</p>}
    </div>
  );
}
