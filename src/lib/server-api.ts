// src/lib/server-api.ts
import { cookies } from 'next/headers';
import { endpoints } from './api';

async function fetchWithCookies(url: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(({ name, value }) => `${name}=${value}`).join('; ');
  const res = await fetch(url, {
    cache: 'no-store',
    headers: { Cookie: cookieHeader, ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) return null;
  try { return await res.json(); } catch { return null; }
}

export async function getMe() { return fetchWithCookies(endpoints.me); }
export async function getPage(slug: string) { return fetchWithCookies(endpoints.page(slug)); }
export async function getServices() { return fetchWithCookies(endpoints.services); }
export async function getPricing() { return fetchWithCookies(endpoints.pricing); }
export async function getFaqs() { return fetchWithCookies(endpoints.faqs); }
export async function getTestimonials() { return fetchWithCookies(endpoints.testimonials); }
