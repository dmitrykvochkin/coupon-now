import Link from "next/link";
import type { Metadata } from "next";
import { CouponCard } from "@/components/CouponCard";
import { SearchBar } from "@/components/SearchBar";
import { searchCoupons } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q = "" } = await searchParams;
  const query = q.trim();

  if (!query) {
    return buildPageMetadata({
      title: "Search Coupons — Coupon Now",
      description: "Search merchants and coupon codes to find active promo deals.",
      path: "/search",
    });
  }

  return buildPageMetadata({
    title: `${query} Coupons — Coupon Now`,
    description: `Search results for ${query} coupon codes and merchant promotions.`,
    path: `/search?q=${encodeURIComponent(query)}`,
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? await searchCoupons(query) : { merchants: [], coupons: [] };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold text-zinc-900">Search coupons</h1>
        <p className="mt-2 text-zinc-600">Find merchants and active promo codes.</p>
        <div className="mt-6">
          <SearchBar defaultValue={query} />
        </div>
      </section>

      {!query ? (
        <p className="mt-10 text-zinc-600">Enter a merchant name or coupon code to search.</p>
      ) : (
        <div className="mt-10 space-y-10">
          <section aria-labelledby="merchant-results-heading">
            <h2 id="merchant-results-heading" className="text-2xl font-semibold text-zinc-900">
              Merchants
            </h2>
            {results.merchants.length === 0 ? (
              <p className="mt-4 text-zinc-600">No merchants matched your search.</p>
            ) : (
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {results.merchants.map((merchant) => (
                  <li key={merchant.slug}>
                    <Link
                      href={`/merchant/${merchant.slug}`}
                      className="block rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
                    >
                      <p className="font-semibold text-zinc-900">{merchant.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">{merchant.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="coupon-results-heading">
            <h2 id="coupon-results-heading" className="text-2xl font-semibold text-zinc-900">
              Coupons
            </h2>
            {results.coupons.length === 0 ? (
              <p className="mt-4 text-zinc-600">No active coupons matched your search.</p>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {results.coupons.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
