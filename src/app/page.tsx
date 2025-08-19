// src/app/page.tsx
import { getPage } from '@/lib/server-api';
import ContactForm from '@/components/ContactForm';

export default async function Page() {
  const page = await getPage('home'); // در ادمین یک Page با slug=home بساز
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{page?.title ?? 'خانه'}</h1>
        {/* اگر بدنه HTML ذخیره می‌کنی، مطمئن شو از ادمین محتوای امن قرار می‌گیرد */}
        {page?.body
          ? <div dangerouslySetInnerHTML={{ __html: page.body }} />
          : <p>سلام! اینجا ویترین کارهای من است. 👋</p>}
      </div>
      <ContactForm />
    </div>
  );
}
