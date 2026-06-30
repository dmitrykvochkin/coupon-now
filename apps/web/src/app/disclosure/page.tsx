import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Affiliate Disclosure — Coupon Now",
  description:
    "Affiliate Disclosure for Coupon Now, including how we earn commissions from merchant links.",
  path: "/disclosure",
});

export default function DisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Affiliate Disclosure</h1>
      <p className="mt-4 text-sm text-zinc-500">Last updated: June 30, 2026</p>

      <section className="mt-8 space-y-4 text-zinc-600">
        <p>
          Coupon Now participates in affiliate marketing programs. Some links on this website are
          affiliate links, which means we may earn a commission when you click a link and make a
          qualifying purchase.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">What this means for you</h2>
        <p>
          Affiliate commissions help support Coupon Now at no additional cost to you. We aim to
          recommend relevant merchants and current promotions based on search intent and data
          freshness.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Editorial independence</h2>
        <p>
          Affiliate relationships do not determine search ranking by themselves. We prioritize
          useful, active offers and transparent merchant information.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Questions</h2>
        <p>
          For disclosure or compliance questions, contact{" "}
          <a href="mailto:compliance@couponnow.example" className="text-emerald-700 hover:underline">
            compliance@couponnow.example
          </a>
          .
        </p>
      </section>
    </article>
  );
}
