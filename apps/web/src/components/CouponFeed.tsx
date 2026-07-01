import type { Coupon } from "@/lib/data/types";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CouponCard } from "./CouponCard";

interface CouponFeedProps {
  coupons: Coupon[];
  title?: string;
}

export function CouponFeed({ coupons, title = "Latest coupons" }: CouponFeedProps) {
  if (coupons.length === 0) {
    return (
      <section aria-labelledby="coupon-feed-heading">
        <h2 id="coupon-feed-heading" className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <Card className="mt-4 p-6 text-muted-foreground">
          No active coupons available right now.
        </Card>
      </section>
    );
  }

  return (
    <section aria-labelledby="coupon-feed-heading">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="uppercase tracking-wide">
          Recently refreshed
        </Badge>
        <h2 id="coupon-feed-heading" className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Browse active promo codes with merchant names, expiry dates, and clear next steps.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </section>
  );
}
