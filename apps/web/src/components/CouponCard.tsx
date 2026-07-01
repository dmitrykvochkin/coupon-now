import Link from "next/link";
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
    <article className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] transition hover:border-[var(--accent)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            <Link href={`/merchant/${coupon.merchantSlug}`} className="hover:underline">
              {merchant?.name ?? coupon.merchantSlug}
            </Link>
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--foreground)]">{coupon.title}</h3>
        </div>
        <span className="rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-medium text-[var(--secondary-foreground)]">
          {coupon.discountText}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{coupon.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <code className="rounded-md bg-[var(--muted)] px-3 py-1.5 font-mono text-sm font-semibold text-[var(--foreground)]">
          {coupon.code}
        </code>
        <CopyCodeButton code={coupon.code} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
        <p className="text-xs text-[var(--muted-foreground)]">
          Expires {formatDate(coupon.expiresAt)}
        </p>
        <a
          href={coupon.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="min-h-11 rounded-md bg-[var(--foreground)] px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        >
          Visit store
        </a>
      </div>
    </article>
  );
}
