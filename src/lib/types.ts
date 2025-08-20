// src/lib/types.ts
export interface PageDTO {
  id: string; slug: string; title: string; body?: string;
  template?: string; seo_title?: string; seo_description?: string;
  is_published: boolean; updated_at?: string;
}

export interface ServiceDTO {
  id: string; slug: string; title: string;
  summary?: string; description?: string;
  price_from?: string | null; is_featured: boolean; sort_order: number;
}

export interface PricingPlanDTO {
  id: string; slug: string; name: string;
  price_monthly?: string | null; price_yearly?: string | null;
  features: string[]; is_recommended: boolean; sort_order: number;
}

export interface FAQDTO {
  id: string; question: string; answer: string;
  sort_order: number; is_published: boolean;
}

export interface TestimonialDTO {
  id: string; author_name: string; author_title?: string;
  body: string; rating?: number | null; sort_order: number; is_published: boolean;
}

/** پاسخ /api/home/ */
export interface HomeDTO {
  hero_title: string;
  hero_subtitle?: string;
  hero_cta_label?: string;
  hero_cta_url?: string;
  hero_features: string[];
  services: ServiceDTO[];
  pricing: PricingPlanDTO[];
  testimonials: TestimonialDTO[];
  faqs: FAQDTO[];
  updated_at?: string | null;
}
