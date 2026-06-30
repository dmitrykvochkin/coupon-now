import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About — Coupon Now",
  description:
    "Learn how Coupon Now helps shoppers discover verified coupon codes and merchant promotions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 prose prose-zinc">
      <h1 className="text-3xl font-bold text-zinc-900">About Coupon Now</h1>
      <p className="mt-4 text-zinc-600">
        Coupon Now is a coupon search platform built to help shoppers find verified promo codes
        quickly. Our goal is simple: make coupon discovery as easy as searching the web.
      </p>
      <h2 className="mt-8 text-2xl font-semibold text-zinc-900">How it works</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-600">
        <li>Search for a merchant or coupon keyword.</li>
        <li>Browse active offers with clear expiry dates and terms.</li>
        <li>Copy a code and visit the store through our affiliate-supported links.</li>
      </ol>
      <p className="mt-6 text-zinc-600">
        We focus on clarity, freshness, and useful merchant pages so you can save time before
        checkout.
      </p>
    </article>
  );
}
