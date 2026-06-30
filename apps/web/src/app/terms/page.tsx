import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service — Coupon Now",
  description: "Terms of Service for using the Coupon Now coupon search platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Terms of Service</h1>
      <p className="mt-4 text-sm text-zinc-500">Last updated: June 30, 2026</p>

      <section className="mt-8 space-y-4 text-zinc-600">
        <p>
          By using Coupon Now, you agree to these terms. If you do not agree, please do not use the
          site.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Service description</h2>
        <p>
          Coupon Now provides coupon and promotion information for informational purposes. We do not
          guarantee that every code will work for every order.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Affiliate relationships</h2>
        <p>
          We may earn commissions when you click links and complete qualifying purchases. See our
          Affiliate Disclosure for details.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Limitation of liability</h2>
        <p>
          Coupon Now is provided &quot;as is&quot; without warranties. We are not responsible for
          merchant pricing changes, expired promotions, or checkout issues on third-party sites.
        </p>
      </section>
    </article>
  );
}
