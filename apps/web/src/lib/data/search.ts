import type { Coupon, Merchant, SearchResult } from "./types";
import { isExpired } from "../utils";

function normalizeQuery(query: string): string {
  return query.trim().toLowerCase();
}

function matchesMerchant(merchant: Merchant, query: string): boolean {
  const haystack = [
    merchant.name,
    merchant.slug,
    merchant.summary,
    merchant.description,
    ...merchant.categorySlugs,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function matchesCoupon(coupon: Coupon, merchant: Merchant | undefined, query: string): boolean {
  const haystack = [
    coupon.code,
    coupon.title,
    coupon.description,
    coupon.discountText,
    merchant?.name ?? "",
    coupon.merchantSlug,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function filterActiveCoupons(coupons: Coupon[]): Coupon[] {
  return coupons.filter((coupon) => !isExpired(coupon.expiresAt));
}

export function searchFixtures(
  query: string,
  merchants: Merchant[],
  coupons: Coupon[],
): SearchResult {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return { merchants: [], coupons: [] };
  }

  const merchantBySlug = new Map(merchants.map((merchant) => [merchant.slug, merchant]));
  const matchedMerchants = merchants.filter((merchant) => matchesMerchant(merchant, normalized));

  const activeCoupons = filterActiveCoupons(coupons);
  const matchedCoupons = activeCoupons.filter((coupon) => {
    const merchant = merchantBySlug.get(coupon.merchantSlug);
    return matchesCoupon(coupon, merchant, normalized);
  });

  const merchantSlugsFromCoupons = new Set(matchedCoupons.map((coupon) => coupon.merchantSlug));
  const merchantsFromCoupons = merchants.filter(
    (merchant) =>
      merchantSlugsFromCoupons.has(merchant.slug) &&
      !matchedMerchants.some((m) => m.slug === merchant.slug),
  );

  return {
    merchants: [...matchedMerchants, ...merchantsFromCoupons].slice(0, 20),
    coupons: matchedCoupons.slice(0, 50),
  };
}

export function sortCouponsByRecency(coupons: Coupon[]): Coupon[] {
  return [...coupons].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}
