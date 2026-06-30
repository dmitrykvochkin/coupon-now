import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — Coupon Now",
  description: "Contact Coupon Now for support, partnerships, and merchant listing questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Contact</h1>
      <p className="mt-4 text-zinc-600">
        Have a question about a coupon, merchant listing, or partnership opportunity? Reach out and
        we will get back to you.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-sm font-medium text-zinc-900">Email</p>
        <a href="mailto:hello@couponnow.example" className="mt-2 inline-block text-emerald-700 hover:underline">
          hello@couponnow.example
        </a>
        <p className="mt-6 text-sm text-zinc-600">
          For affiliate network or compliance questions, include your company name and website URL.
        </p>
      </div>
    </article>
  );
}
