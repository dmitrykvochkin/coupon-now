import type { Merchant } from "@/lib/data/types";
import { formatDate } from "@/lib/utils";

interface MerchantHeaderProps {
  merchant: Merchant;
  couponCount: number;
}

export function MerchantHeader({ merchant, couponCount }: MerchantHeaderProps) {
  return (
    <header className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            Merchant
          </p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 md:text-4xl">{merchant.name}</h1>
          <p className="mt-4 text-lg text-zinc-700">{merchant.summary}</p>
          <p className="mt-3 text-sm text-zinc-500">
            {couponCount} active coupon{couponCount === 1 ? "" : "s"} · Last updated{" "}
            {formatDate(merchant.updatedAt)}
          </p>
        </div>
        <a
          href={merchant.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Visit {merchant.name}
        </a>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-zinc-600">{merchant.description}</p>
    </header>
  );
}
