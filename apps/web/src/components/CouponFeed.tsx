import type { Coupon } from "@/lib/data/types";
import { CouponCard } from "./CouponCard";

interface CouponFeedProps {
  coupons: Coupon[];
  title?: string;
}

export function CouponFeed({ coupons, title = "Latest coupons" }: CouponFeedProps) {
  if (coupons.length === 0) {
    return (
      <section aria-labelledby="coupon-feed-heading">
        <h2 id="coupon-feed-heading" className="text-2xl font-semibold text-zinc-900">
          {title}
        </h2>
        <p className="mt-4 text-zinc-600">No active coupons available right now.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="coupon-feed-heading">
      <h2 id="coupon-feed-heading" className="text-2xl font-semibold text-zinc-900">
        {title}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </section>
  );
}
