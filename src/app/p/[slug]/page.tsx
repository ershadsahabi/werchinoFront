// src/app/p/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/content-api';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) return { title: 'Page' };
  return {
    title: page.seo_title || page.title,
    description: page.seo_description,
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) notFound();
  return (
    <div className="card">
      <h1 style={{ marginTop: 0 }}>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.body || '' }} />
    </div>
  );
}
