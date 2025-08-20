// src/lib/content-api.ts
import { endpoints } from './api';
import { cookies } from 'next/headers';
import type {
  HomeDTO, PageDTO, ServiceDTO, PricingPlanDTO, FAQDTO, TestimonialDTO
} from './types';

/** برای محتوای عمومی، نیازی به کوکی نیست؛ اما سازگار گذاشتیم */
async function fetchJSON<T>(url: string, opts: RequestInit = {}): Promise<T | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
  const res = await fetch(url, {
    headers: { Cookie: cookieHeader, ...(opts.headers || {}) },
    // محتوای مارکتینگ تغییرش کم است؛ Revalidate سبک می‌گذاریم
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

/** اپ جدید Home */
export const getHome = () => fetchJSON<HomeDTO>(endpoints.home);

/** در صورت نیاز به صفحات/سرویس‌ها در جای دیگر پروژه */
export const getPage = (slug: string) => fetchJSON<PageDTO>(endpoints.page(slug));
export const getServices = () => fetchJSON<ServiceDTO[]>(endpoints.services);
export const getPricing = () => fetchJSON<PricingPlanDTO[]>(endpoints.pricing);
export const getFaqs = () => fetchJSON<FAQDTO[]>(endpoints.faqs);
export const getTestimonials = () => fetchJSON<TestimonialDTO[]>(endpoints.testimonials);
