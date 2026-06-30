import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy — Coupon Now",
  description: "Privacy Policy for Coupon Now coupon search platform.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>
      <p className="mt-4 text-sm text-zinc-500">Last updated: June 30, 2026</p>

      <section className="mt-8 space-y-4 text-zinc-600">
        <p>
          Coupon Now (&quot;we&quot;, &quot;us&quot;) operates a coupon discovery website. This policy
          explains what information we collect and how we use it.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Information we collect</h2>
        <p>
          We may collect basic usage analytics, search queries, device/browser data, and referral
          information when you click outbound merchant links.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">How we use information</h2>
        <p>
          We use collected data to improve search relevance, monitor site performance, prevent abuse,
          and measure affiliate attribution.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Third-party services</h2>
        <p>
          Merchant websites and affiliate networks may collect information under their own privacy
          policies when you leave Coupon Now.
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">Contact</h2>
        <p>
          Privacy questions can be sent to{" "}
          <a href="mailto:privacy@couponnow.example" className="text-emerald-700 hover:underline">
            privacy@couponnow.example
          </a>
          .
        </p>
      </section>
    </article>
  );
}
