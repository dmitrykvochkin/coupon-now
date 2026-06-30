export interface FAQ {
  question: string;
  answer: string;
}

export interface Category {
  slug: string;
  name: string;
}

export interface Merchant {
  slug: string;
  name: string;
  summary: string;
  description: string;
  websiteUrl: string;
  affiliateUrl: string;
  logoUrl: string;
  categorySlugs: string[];
  faq: FAQ[];
  updatedAt: string;
}

export interface Coupon {
  id: string;
  merchantSlug: string;
  code: string;
  title: string;
  description: string;
  discountText: string;
  expiresAt: string;
  affiliateUrl: string;
  updatedAt: string;
}

export interface MerchantWithCoupons extends Merchant {
  coupons: Coupon[];
}

export interface SearchResult {
  merchants: Merchant[];
  coupons: Coupon[];
}
