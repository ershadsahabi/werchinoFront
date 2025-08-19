// src/lib/api.ts
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000').replace(/\/$/, '');

export const endpoints = {
  csrf: `${API_BASE}/api/accounts/csrf/`,
  register: `${API_BASE}/api/accounts/register/`,
  login: `${API_BASE}/api/accounts/login/`,
  logout: `${API_BASE}/api/accounts/logout/`,
  me: `${API_BASE}/api/accounts/me/`,

  // محتوا
  page: (slug: string) => `${API_BASE}/api/site/pages/${slug}/`,
  services: `${API_BASE}/api/site/services/`,
  pricing: `${API_BASE}/api/site/pricing/`,
  faqs: `${API_BASE}/api/site/faqs/`,
  testimonials: `${API_BASE}/api/site/testimonials/`,

  // فرم تماس
  contact: `${API_BASE}/api/leads/contact/`,
};
