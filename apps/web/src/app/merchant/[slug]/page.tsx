import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CouponFeed } from "@/components/CouponFeed";
import { JsonLd } from "@/components/JsonLd";
import { MerchantFAQ } from "@/components/MerchantFAQ";
import { MerchantHeader } from "@/components/MerchantHeader";
import { getMerchant } from "@/lib/data";
import { buildFaqJsonLd, buildOfferJsonLd, buildStoreJsonLd } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface MerchantPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MerchantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const merchant = await getMerchant(slug);

  if (!merchant) {
    return buildPageMetadata({
      title: "Merchant Not Found — Coupon Now",
      description: "The requested merchant page could not be found.",
      path: `/merchant/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${merchant.name} Coupons & Promo Codes — Coupon Now`,
    description: merchant.summary,
    path: `/merchant/${merchant.slug}`,
  });
}

export default async function MerchantPage({ params }: MerchantPageProps) {
  const { slug } = await params;
  const merchant = await getMerchant(slug);

  if (!merchant) {
    notFound();
  }

  const jsonLd = [
    buildStoreJsonLd(merchant),
    buildFaqJsonLd(merchant),
    ...merchant.coupons.slice(0, 5).map((coupon) => buildOfferJsonLd(merchant, coupon)),
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <JsonLd data={jsonLd} />
      <MerchantHeader merchant={merchant} couponCount={merchant.coupons.length} />
      <CouponFeed coupons={merchant.coupons} title={`Active ${merchant.name} coupons`} />
      <MerchantFAQ merchantName={merchant.name} faq={merchant.faq} />
    </div>
  );
}
