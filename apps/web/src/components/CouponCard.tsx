import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Coupon } from "@/lib/data/types";
import { getMerchantSync } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { CopyCodeButton } from "./CopyCodeButton";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const merchant = getMerchantSync(coupon.merchantSlug);

  return (
    <Card asChild className="h-full transition hover:ring-accent">
      <article>
        <CardHeader>
          <p className="text-sm font-medium text-primary">
            <Link href={`/merchant/${coupon.merchantSlug}`} className="hover:underline">
              {merchant?.name ?? coupon.merchantSlug}
            </Link>
          </p>
          <CardTitle asChild>
            <h3>{coupon.title}</h3>
          </CardTitle>
          <CardAction>
            <Badge variant="secondary">{coupon.discountText}</Badge>
          </CardAction>
        </CardHeader>

        <CardContent className="grid flex-1 gap-4">
          <p className="text-sm leading-6 text-muted-foreground">{coupon.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <code className="rounded-md bg-muted px-3 py-1.5 font-mono text-sm font-semibold text-foreground">
              {coupon.code}
            </code>
            <CopyCodeButton code={coupon.code} />
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Expires {formatDate(coupon.expiresAt)}
          </p>
          <Button asChild variant="outline" className="min-h-11 px-4 py-3">
            <a href={coupon.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored">
              Visit store
            </a>
          </Button>
        </CardFooter>
      </article>
    </Card>
  );
}
