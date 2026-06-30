import type { Coupon, Merchant } from "@/lib/data/types";
import { getSiteUrl } from "@/lib/utils";

export function buildStoreJsonLd(merchant: Merchant) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: merchant.name,
    description: merchant.summary,
    url: `${getSiteUrl()}/merchant/${merchant.slug}`,
    sameAs: merchant.websiteUrl,
    image: merchant.logoUrl,
  };
}

export function buildOfferJsonLd(merchant: Merchant, coupon: Coupon) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: coupon.title,
    description: coupon.description,
    url: `${getSiteUrl()}/merchant/${merchant.slug}`,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validThrough: coupon.expiresAt,
    seller: {
      "@type": "Organization",
      name: merchant.name,
    },
  };
}

export function buildFaqJsonLd(merchant: Merchant) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: merchant.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
