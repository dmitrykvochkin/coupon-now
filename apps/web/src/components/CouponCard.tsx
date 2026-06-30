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
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            <Link href={`/merchant/${coupon.merchantSlug}`} className="hover:underline">
              {merchant?.name ?? coupon.merchantSlug}
            </Link>
          </p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-900">{coupon.title}</h3>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {coupon.discountText}
        </span>
      </div>

      <p className="mt-3 text-sm text-zinc-600">{coupon.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <code className="rounded-md bg-zinc-100 px-3 py-1.5 font-mono text-sm font-semibold text-zinc-900">
          {coupon.code}
        </code>
        <CopyCodeButton code={coupon.code} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4">
        <p className="text-xs text-zinc-500">Expires {formatDate(coupon.expiresAt)}</p>
        <a
          href={coupon.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Visit store
        </a>
      </div>
    </article>
  );
}
