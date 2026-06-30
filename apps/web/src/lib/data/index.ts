import categoriesData from "@/fixtures/categories.json";
import couponsData from "@/fixtures/coupons.json";
import merchantsData from "@/fixtures/merchants.json";
import {
  filterActiveCoupons,
  searchFixtures,
  sortCouponsByRecency,
} from "./search";
import type {
  Category,
  Coupon,
  Merchant,
  MerchantWithCoupons,
  SearchResult,
} from "./types";

// Future FastAPI mapping:
// GET /search?q=          -> searchCoupons
// GET /merchants/{slug}   -> getMerchant
// GET /coupons/latest     -> getLatestCoupons
// GET /categories         -> getCategories

const merchants = merchantsData as Merchant[];
const coupons = couponsData as Coupon[];
const categories = categoriesData as Category[];

const merchantBySlug = new Map(merchants.map((merchant) => [merchant.slug, merchant]));

function enrichCoupons(activeCoupons: Coupon[]): Coupon[] {
  return activeCoupons.map((coupon) => ({
    ...coupon,
    affiliateUrl:
      coupon.affiliateUrl ||
      merchantBySlug.get(coupon.merchantSlug)?.affiliateUrl ||
      "#",
  }));
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getAllMerchantSlugs(): Promise<string[]> {
  return merchants.map((merchant) => merchant.slug);
}

export async function getMerchant(slug: string): Promise<MerchantWithCoupons | null> {
  const merchant = merchantBySlug.get(slug);
  if (!merchant) {
    return null;
  }

  const merchantCoupons = enrichCoupons(
    filterActiveCoupons(coupons.filter((coupon) => coupon.merchantSlug === slug)),
  );

  return {
    ...merchant,
    coupons: sortCouponsByRecency(merchantCoupons),
  };
}

export async function getLatestCoupons(limit = 24): Promise<Coupon[]> {
  const active = enrichCoupons(filterActiveCoupons(coupons));
  return sortCouponsByRecency(active).slice(0, limit);
}

export async function searchCoupons(query: string): Promise<SearchResult> {
  const result = searchFixtures(query, merchants, coupons);
  return {
    merchants: result.merchants,
    coupons: enrichCoupons(result.coupons),
  };
}

export async function getMerchantName(slug: string): Promise<string | null> {
  return merchantBySlug.get(slug)?.name ?? null;
}

export function getMerchantSync(slug: string): Merchant | undefined {
  return merchantBySlug.get(slug);
}
