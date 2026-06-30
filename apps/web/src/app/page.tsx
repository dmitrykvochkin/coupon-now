import { CouponFeed } from "@/components/CouponFeed";
import { SearchBar } from "@/components/SearchBar";
import { getLatestCoupons } from "@/lib/data";

export default async function HomePage() {
  const coupons = await getLatestCoupons(12);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <section className="rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-zinc-50 px-6 py-12 text-center md:px-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Coupon discovery built for shoppers
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
          Find verified coupon codes in seconds
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          Search merchants, copy promo codes, and visit stores with affiliate-supported links.
        </p>
        <div className="mx-auto mt-8 max-w-2xl">
          <SearchBar variant="hero" />
        </div>
      </section>

      <div className="mt-12">
        <CouponFeed coupons={coupons} title="Latest coupon feed" />
      </div>
    </div>
  );
}
